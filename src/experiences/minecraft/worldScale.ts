import { useSyncExternalStore } from "react";

/**
 * The world's single source of truth for viewport size.
 *
 * Everything in the Overworld is measured in blocks: the ground is three blocks
 * deep, Steve is one block wide and two tall, the trees are sized off it. That
 * only holds together if a single number drives all of them — hardcoding 80
 * everywhere meant the scene kept desktop proportions on a phone, where a
 * two-block-tall Steve ate a third of the screen and covered his own name.
 *
 * It's one store rather than a hook per component because it used to be the
 * latter: every consumer registered its own `resize` listener and re-rendered on
 * every event of a drag. With a few thousand block divs mounted, that was the
 * jankiest thing on the page. Now there is one listener, coalesced to a frame,
 * and it only publishes when a number it reports actually moved.
 */

/** Block size the scene was composed at. */
export const BLOCK_DESKTOP = 80;
/** Below this the pixel art turns to mush. */
const BLOCK_MIN = 44;

/**
 * How much of the world fits across the screen. Minecraft doesn't shrink its
 * blocks on a small screen — it shows fewer of them, and so do we.
 */
const BLOCKS_ACROSS = 8;

/**
 * Layout tiers. These are the scene's own breakpoints, and they line up with
 * Tailwind's `sm` and `lg` so a CSS class and a JS decision never disagree about
 * which screen they're on.
 */
export type Tier = "phone" | "tablet" | "desktop";

export interface Viewport {
  /** Viewport width, px. */
  w: number;
  /** Viewport height, px. */
  h: number;
  /** Size of one world block, px. */
  block: number;
  tier: Tier;
}

// Server/first-paint fallback: the composition the scene was designed at.
const FALLBACK: Viewport = {
  w: 1440,
  h: 900,
  block: BLOCK_DESKTOP,
  tier: "desktop",
};

function tierFor(w: number): Tier {
  if (w < 640) return "phone";
  if (w < 1024) return "tablet";
  return "desktop";
}

function read(): Viewport {
  const w = window.innerWidth;
  return {
    w,
    h: window.innerHeight,
    block: Math.max(BLOCK_MIN, Math.min(BLOCK_DESKTOP, Math.round(w / BLOCKS_ACROSS))),
    tier: tierFor(w),
  };
}

let snapshot: Viewport = typeof window === "undefined" ? FALLBACK : read();
const listeners = new Set<() => void>();
let frame = 0;

function publish() {
  frame = 0;
  const next = read();
  // The snapshot's identity is the cache key for every consumer's useMemo — and
  // for the generated terrain maps, which are the expensive ones. Hand out a new
  // object only when a number actually changed.
  if (next.w === snapshot.w && next.h === snapshot.h) return;
  snapshot = next;
  for (const notify of listeners) notify();
}

function onResize() {
  if (frame) return;
  frame = requestAnimationFrame(publish);
}

function subscribe(onStoreChange: () => void) {
  if (listeners.size === 0) window.addEventListener("resize", onResize);
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener("resize", onResize);
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => FALLBACK;

export function useViewport(): Viewport {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Just the block size, for the many callers that need nothing else. */
export function useWorldBlock(): number {
  return useViewport().block;
}
