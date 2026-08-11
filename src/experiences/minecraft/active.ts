import { useRef } from "react";
import { useInView } from "motion/react";

/**
 * Attaches a chapter to the viewport: returns a ref for the section element and
 * whether it is currently on screen.
 *
 * Chapters spread the answer to their children through a `data-mc-still`
 * attribute rather than through React context. The ambient animations are CSS
 * (see the "Ambient world motion" block in index.css), so one attribute on the
 * section parks every animal, cloud and leaf inside it — no context, no
 * re-render of the scene tree, no prop threaded through six components.
 */
export function useActiveRef(amount = 0.04) {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { amount });
  return [ref, active] as const;
}

/**
 * Spread onto a chapter's root element. Present only when the chapter is away,
 * so the CSS selector is a plain attribute check.
 */
export function stillProps(active: boolean) {
  return active ? undefined : { "data-mc-still": "" };
}
