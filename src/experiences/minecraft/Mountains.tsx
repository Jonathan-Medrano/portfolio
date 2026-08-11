import { useMemo } from "react";
import BlockWorld from "./BlockWorld";
import { useViewport } from "./worldScale";

// Layered blocky terrain backdrop for depth. Each instance is one range:
//  - near  → biome hills (grass/forest/rocky) with little oaks, lightly hazed.
//  - far   → tall snow-capped peaks, no trees, heavily hazed blue (atmospheric
//            perspective) so they read as huge distant mountains.
// Generated column by column from a fixed sine sum (no randomness).
//
// The grid is sized in BLOCKS OF A FIXED PIXEL SIZE, not in a fixed column count.
// A fixed count meant the range always spanned the viewport in the same number of
// columns, so on a phone each block shrank to ~5px: the peaks turned to noise, and
// the phone still paid for all 2720 divs it couldn't resolve. Minecraft's own
// answer is the right one — keep the blocks the same size and show fewer of them.

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Sanity rails on the generated grid: enough columns to read as a range even on a
// narrow phone, few enough that an ultrawide doesn't mount thousands of divs.
const MIN_COLS = 14;
const MAX_COLS = 110;
const MIN_ROWS = 8;

type Biome = "snow" | "hills" | "forest" | "rocky";
function biomeAt(c: number, cols: number): Biome {
  const f = c / cols;
  if (f < 0.26) return "snow";
  if (f < 0.52) return "hills";
  if (f < 0.76) return "forest";
  return "rocky";
}

function buildMap(
  cols: number,
  rows: number,
  snowy: boolean,
  trees: boolean,
  treeClear: [number, number] | null,
) {
  const heightAt = (c: number) => {
    // Peak heights are fractions of the band, not absolute row counts: the band
    // gets shorter on a short viewport, and a hardcoded "10 rows tall" would then
    // punch straight through the top of it.
    const biome = biomeAt(c, cols);
    const base = snowy
      ? rows * 0.5
      : biome === "snow" || biome === "rocky"
        ? rows * 0.62
        : rows * 0.28;
    const amp = snowy ? 1.9 : 1;
    const h =
      base +
      amp * (3.2 * Math.sin(c * 0.5) + 2.2 * Math.sin(c * 0.21 + 1) + 1.5 * Math.sin(c * 0.9 + 0.4));
    return clamp(Math.round(h), 2, rows - 1);
  };

  const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill(" "));
  const surf = (c: number) => rows - heightAt(c);
  // A summit high enough to hold snow, as a share of the band.
  const snowLine = rows * (snowy ? 0.18 : 0.56);

  for (let c = 0; c < cols; c++) {
    const s = surf(c);
    const b = biomeAt(c, cols);
    const tall = rows - s >= snowLine;
    for (let r = s; r < rows; r++) {
      if (r === s) {
        grid[r][c] = snowy || b === "snow" || tall ? "N" : b === "rocky" ? "s" : "g";
      } else {
        grid[r][c] = !snowy && (b === "hills" || b === "forest") && r <= s + 2 ? "d" : "s";
      }
    }
  }

  if (trees) {
    const plantOak = (c: number) => {
      const s = surf(c);
      if (s - 4 < 0 || c - 2 < 0 || c + 2 >= cols) return;
      grid[s - 1][c] = "l";
      for (let dx = -2; dx <= 2; dx++) {
        grid[s - 2][c + dx] = "T";
        grid[s - 3][c + dx] = "T";
      }
      for (let dx = -1; dx <= 1; dx++) grid[s - 4][c + dx] = "T";
    };
    for (let c = 2; c < cols - 2; c++) {
      // Leave the hero's band of the horizon bare. The forest biome sits at 52-76%
      // of the range, which is exactly where Steve stands: a generated oak landed
      // behind him and his head came out of the middle of a leaf block.
      if (treeClear) {
        const f = c / cols;
        if (f > treeClear[0] && f < treeClear[1]) continue;
      }
      const b = biomeAt(c, cols);
      if (b === "forest" && c % 4 === 1) plantOak(c);
      else if (b === "hills" && c % 8 === 4) plantOak(c);
    }
  }

  return grid.map((row) => row.join(""));
}

export default function Mountains({
  bottom = 130,
  blockPx = 25,
  bandVh = 0.44,
  snowy = false,
  trees = true,
  treeClear,
  haze = 0.18,
}: {
  /** Distance from the section's bottom edge, px. */
  bottom?: number;
  /** Rendered size of one block in this range, px. Farther range → smaller. */
  blockPx?: number;
  /** Band height as a share of the viewport height. */
  bandVh?: number;
  snowy?: boolean;
  trees?: boolean;
  /** Horizontal span (as fractions of the width) to leave clear of trees. */
  treeClear?: [number, number];
  haze?: number;
}) {
  const { w, h } = useViewport();

  const cols = clamp(Math.ceil(w / blockPx), MIN_COLS, MAX_COLS);
  const rows = Math.max(MIN_ROWS, Math.round((h * bandVh) / blockPx));
  // Destructured so the memo keys on the numbers, not on a fresh array literal.
  const [clearFrom, clearTo] = treeClear ?? [0, 0];
  const map = useMemo(
    () => buildMap(cols, rows, snowy, trees, clearTo > clearFrom ? [clearFrom, clearTo] : null),
    [cols, rows, snowy, trees, clearFrom, clearTo],
  );

  return (
    <div className="pointer-events-none absolute inset-x-0 z-0" style={{ bottom }}>
      <BlockWorld map={map} seam={false} />
      {/* Atmospheric haze — heavier for far ranges so they recede into the sky. */}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(135,196,235,${haze})` }} />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, rgba(170,212,240,${haze * 1.6}), transparent 65%)`,
        }}
      />
    </div>
  );
}
