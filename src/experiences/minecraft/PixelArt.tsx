// Renders pixel art declaratively: each row is a string, each character maps
// to a color in `palette` (a space or "." means a transparent pixel).
// The SVG uses crispEdges so it stays blocky at any scale.
export interface PixelArtProps {
  rows: string[];
  palette: Record<string, string>;
  /** Rendered size of one pixel, in CSS px. */
  pixel?: number;
  className?: string;
}

export default function PixelArt({
  rows,
  palette,
  pixel = 8,
  className,
}: PixelArtProps) {
  const height = rows.length;
  const width = rows.reduce((max, row) => Math.max(max, row.length), 0);

  return (
    <svg
      width={width * pixel}
      height={height * pixel}
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {rows.map((row, y) =>
        [...row].map((ch, x) => {
          const fill = palette[ch];
          if (!fill) return null;
          return (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
          );
        }),
      )}
    </svg>
  );
}
