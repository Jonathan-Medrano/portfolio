import { useEffect, useState } from "react";

/**
 * The size of one world block, in px.
 *
 * Everything in the Overworld is measured in blocks: the ground is three blocks
 * deep, Steve is one block wide and two tall, the trees are sized off it. That
 * only holds together if a single number drives all of them — hardcoding 80
 * everywhere meant the scene kept desktop proportions on a phone, where a
 * two-block-tall Steve ate a third of the screen and covered his own name.
 *
 * Clamped: never so small the pixel art turns to mush, never bigger than the
 * 80px the scene was composed at.
 */
export const BLOCK_DESKTOP = 80;
const BLOCK_MIN = 44;

function measure(): number {
  if (typeof window === "undefined") return BLOCK_DESKTOP;
  // ~8 blocks across the viewport keeps the framing the desktop scene has.
  const fromWidth = Math.round(window.innerWidth / 8);
  return Math.max(BLOCK_MIN, Math.min(BLOCK_DESKTOP, fromWidth));
}

export function useWorldBlock(): number {
  const [block, setBlock] = useState(measure);

  useEffect(() => {
    const update = () => setBlock(measure());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return block;
}
