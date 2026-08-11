import type { CSSProperties } from "react";
import PixelArt from "./PixelArt";
import { useViewport } from "./worldScale";

// Minecraft clouds: flat white slabs with hard edges, a flat bottom and a faint
// shaded underside — not round puffs. W = white top, S = shaded bottom face.
const palette = { W: "rgba(255,255,255,0.95)", S: "rgba(208,220,232,0.9)" };

const shapes = [
  [
    "...WWWWWWWWW...",
    ".WWWWWWWWWWWWW.",
    "WWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSS",
  ],
  ["..WWWWWWWW..", "WWWWWWWWWWWW", "WWWWWWWWWWWW", "SSSSSSSSSSSS"],
  ["WWWWWWWWWWWWWWWWWW", "WWWWWWWWWWWWWWWWWW", "SSSSSSSSSSSSSSSSSS"],
];

// left is in vw within one copy (0–100); the field is duplicated and scrolled as
// a seamless marquee so every cloud drifts at the same speed with no popping.
// Ordered so the first few still read as a full sky on their own — a phone shows
// a prefix of this list, because eight clouds on a 390px sky is overcast.
const clouds = [
  { shape: 0, top: "6%", left: 8, pixel: 13 },
  { shape: 2, top: "19%", left: 40, pixel: 10 },
  { shape: 1, top: "12%", left: 66, pixel: 11 },
  { shape: 0, top: "30%", left: 88, pixel: 9 },
  { shape: 1, top: "4%", left: 52, pixel: 12 },
  { shape: 2, top: "34%", left: 22, pixel: 8 },
  { shape: 0, top: "16%", left: 96, pixel: 11 },
  { shape: 1, top: "25%", left: 6, pixel: 9 },
];

const COUNT: Record<string, number> = { phone: 4, tablet: 6, desktop: 8 };

export default function Clouds() {
  const { tier } = useViewport();
  const field = clouds.slice(0, COUNT[tier]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* One CSS marquee for the whole sky: a single compositor-owned transform,
          where this used to be a JS-driven animation on a 200vw layer. */}
      <div
        className="mc-marquee absolute top-0 left-0 h-full"
        style={{ width: "200vw", "--mc-dur": "90s" } as CSSProperties}
      >
        {[0, 1].map((copy) =>
          field.map((c, i) => (
            <div
              key={`${copy}-${i}`}
              className="absolute"
              style={{ top: c.top, left: `${c.left + copy * 100}vw` }}
            >
              <PixelArt rows={shapes[c.shape]} palette={palette} pixel={c.pixel} className="pixelated" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}
