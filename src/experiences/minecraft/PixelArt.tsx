import { memo, useMemo } from "react";
import type { CSSProperties } from "react";

// Renders pixel art declaratively: each row is a string, each character maps
// to a color in `palette` (a space or "." means a transparent pixel).
// The SVG uses crispEdges so it stays blocky at any scale.
export interface PixelArtProps {
  rows: string[];
  palette: Record<string, string>;
  /** Rendered size of one pixel, in CSS px. */
  pixel?: number;
  className?: string;
  /** Carries the ambient-animation custom properties (--mc-dur and friends). */
  style?: CSSProperties;
}

interface Run {
  x: number;
  y: number;
  w: number;
  fill: string;
}

/**
 * Collapses each row into horizontal runs of one colour.
 *
 * A rect per pixel is the obvious reading of the row strings and it was costing
 * a lot: a sheep is 150 nodes, a cloud field 1200, and the world was carrying
 * ~1300 SVG rects before a single one of them moved. A sheep's back is eight
 * identical pixels in a row — that is one rect, and the render is identical.
 */
function toRuns(rows: string[], palette: Record<string, string>): Run[] {
  const runs: Run[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const fill = palette[row[x]];
      // Unmapped characters ('.', ' ') are transparent: no rect at all.
      if (!fill) {
        x++;
        continue;
      }
      let w = 1;
      // Two different characters resolving to the same colour merge too — that
      // is a shared fill, and one rect renders it.
      while (x + w < row.length && palette[row[x + w]] === fill) w++;
      runs.push({ x, y, w, fill });
      x += w;
    }
  });

  return runs;
}

function PixelArt({ rows, palette, pixel = 8, className, style }: PixelArtProps) {
  const height = rows.length;
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const runs = useMemo(() => toRuns(rows, palette), [rows, palette]);

  return (
    <svg
      width={width * pixel}
      height={height * pixel}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      aria-hidden
    >
      {runs.map((r) => (
        <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}

// Sprites are static data: the rows and palette are module constants at nearly
// every call site, so memoising skips the whole subtree when a parent re-renders
// because the viewport changed.
export default memo(PixelArt);
