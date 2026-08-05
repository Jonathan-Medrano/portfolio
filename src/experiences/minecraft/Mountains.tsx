import { useMemo } from "react";
import BlockWorld from "./BlockWorld";

// Layered blocky terrain backdrop for depth. Each instance is one range:
//  - near  → biome hills (grass/forest/rocky) with little oaks, lightly hazed.
//  - far   → tall snow-capped peaks, no trees, heavily hazed blue (atmospheric
//            perspective) so they read as huge distant mountains.
// Generated column by column from a fixed sine sum (no randomness).

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

type Biome = "snow" | "hills" | "forest" | "rocky";
function biomeAt(c: number, cols: number): Biome {
  const f = c / cols;
  if (f < 0.26) return "snow";
  if (f < 0.52) return "hills";
  if (f < 0.76) return "forest";
  return "rocky";
}

function buildMap(cols: number, rows: number, snowy: boolean, trees: boolean) {
  const heightAt = (c: number) => {
    const base = snowy
      ? rows * 0.5
      : biomeAt(c, cols) === "snow" || biomeAt(c, cols) === "rocky"
        ? 10
        : 4.5;
    const amp = snowy ? 1.9 : 1;
    const h =
      base +
      amp * (3.2 * Math.sin(c * 0.5) + 2.2 * Math.sin(c * 0.21 + 1) + 1.5 * Math.sin(c * 0.9 + 0.4));
    return clamp(Math.round(h), 2, rows - 1);
  };

  const grid: string[][] = Array.from({ length: rows }, () => Array(cols).fill(" "));
  const surf = (c: number) => rows - heightAt(c);

  for (let c = 0; c < cols; c++) {
    const s = surf(c);
    const b = biomeAt(c, cols);
    const tall = rows - s >= (snowy ? 6 : 9);
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
      const b = biomeAt(c, cols);
      if (b === "forest" && c % 4 === 1) plantOak(c);
      else if (b === "hills" && c % 8 === 4) plantOak(c);
    }
  }

  return grid.map((row) => row.join(""));
}

export default function Mountains({
  bottom = 130,
  cols = 42,
  rows = 13,
  snowy = false,
  trees = true,
  haze = 0.18,
}: {
  bottom?: number;
  cols?: number;
  rows?: number;
  snowy?: boolean;
  trees?: boolean;
  haze?: number;
}) {
  const map = useMemo(() => buildMap(cols, rows, snowy, trees), [cols, rows, snowy, trees]);
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
