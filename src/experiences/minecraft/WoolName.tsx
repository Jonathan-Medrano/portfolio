import { motion } from "motion/react";

// A 5x5 block font (A-Z). Each glyph is 5 rows; '#' = a wool block, '.' = empty.
// The name is assembled into one grid and revealed column by column, as if Steve
// were placing the wool blocks one stack at a time.
const FONT: Record<string, string[]> = {
  A: [".###.", "#...#", "#####", "#...#", "#...#"],
  B: ["####.", "#...#", "####.", "#...#", "####."],
  C: [".####", "#....", "#....", "#....", ".####"],
  D: ["####.", "#...#", "#...#", "#...#", "####."],
  E: ["#####", "#....", "####.", "#....", "#####"],
  F: ["#####", "#....", "####.", "#....", "#...."],
  G: [".####", "#....", "#..##", "#...#", ".####"],
  H: ["#...#", "#...#", "#####", "#...#", "#...#"],
  I: ["#####", "..#..", "..#..", "..#..", "#####"],
  J: ["..###", "...#.", "...#.", "#..#.", ".##.."],
  K: ["#...#", "#..#.", "###..", "#..#.", "#...#"],
  L: ["#....", "#....", "#....", "#....", "#####"],
  M: ["#...#", "##.##", "#.#.#", "#...#", "#...#"],
  N: ["#...#", "##..#", "#.#.#", "#..##", "#...#"],
  O: [".###.", "#...#", "#...#", "#...#", ".###."],
  P: ["####.", "#...#", "####.", "#....", "#...."],
  Q: [".###.", "#...#", "#...#", "#..#.", ".##.#"],
  R: ["####.", "#...#", "####.", "#..#.", "#...#"],
  S: [".####", "#....", ".###.", "....#", "####."],
  T: ["#####", "..#..", "..#..", "..#..", "..#.."],
  U: ["#...#", "#...#", "#...#", "#...#", ".###."],
  V: ["#...#", "#...#", "#...#", ".#.#.", "..#.."],
  W: ["#...#", "#...#", "#.#.#", "##.##", "#...#"],
  X: ["#...#", ".#.#.", "..#..", ".#.#.", "#...#"],
  Y: ["#...#", ".#.#.", "..#..", "..#..", "..#.."],
  Z: ["#####", "...#.", "..#..", ".#...", "#####"],
  " ": ["...", "...", "...", "...", "..."],
};

// Assemble a word into 5 rows of '#'/'.' with a one-column gap between letters.
export function woolRows(text: string): string[] {
  const glyphs = [...text.toUpperCase()].map((ch) => FONT[ch] ?? FONT[" "]);
  return [0, 1, 2, 3, 4].map((r) => glyphs.map((g) => g[r]).join("."));
}

// Warm amber accent — pops against the blue sky (complementary) and ties into
// the portfolio's warm-neutral palette.
const WOOL = "#f0a52e";
// Subtle block depth: light top, shaded bottom, dark outline for contrast.
const WOOL_SHADOW =
  "inset 0 3px 0 rgba(255,255,255,0.32), inset 0 -5px 0 rgba(0,0,0,0.24), inset 0 0 0 2px rgba(0,0,0,0.32)";

export default function WoolName({
  rows,
  placedCols,
  colShown,
  block = 13,
  className,
}: {
  rows: string[];
  /** Number of columns revealed so far (left to right). */
  placedCols: number;
  /** Optional custom reveal predicate per column (overrides placedCols). */
  colShown?: (col: number) => boolean;
  block?: number;
  className?: string;
}) {
  const cols = rows[0]?.length ?? 0;
  const shown = colShown ?? ((c: number) => c < placedCols);

  return (
    <div
      aria-hidden
      className={className}
      style={{ position: "relative", width: cols * block, height: rows.length * block }}
    >
      {rows.flatMap((row, r) =>
        [...row].map((ch, c) => {
          if (ch !== "#" || !shown(c)) return null;
          return (
            <motion.div
              key={`${r}-${c}`}
              initial={{ scale: 0.3, opacity: 0, y: -26 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 560, damping: 18 }}
              style={{
                position: "absolute",
                left: c * block,
                top: r * block,
                width: block,
                height: block,
                background: WOOL,
                boxShadow: WOOL_SHADOW,
                imageRendering: "pixelated",
              }}
            />
          );
        }),
      )}
    </div>
  );
}
