import { cn } from "@/lib/utils";

// Renders a Minecraft-style 2D cross-section: a grid of textured blocks built
// from a text map. Every character is one block; spaces/dots are air (the cave),
// left transparent so the dark backdrop shows through. Hard square edges only —
// that blocky grid is what makes it read as Minecraft, not a smooth drawing.
//
// Textures are the real (HD) Minecraft block PNGs under /public/textures/mc.

interface BlockDef {
  tex?: string;
  cls?: string;
  /** Animated texture stored as a vertical frame strip; show the first frame. */
  strip?: boolean;
  /**
   * Biome tint multiplied over the (grayscale) texture, the way Minecraft
   * colorizes grass and leaves per biome. Without this they render gray.
   */
  tint?: string;
  /** Solid-color block with no texture (e.g. snow). */
  color?: string;
}

// Single-character legend → block texture (+ optional emissive class).
export const LEGEND: Record<string, BlockDef> = {
  g: { tex: "grass" },
  d: { tex: "dirt" },
  l: { tex: "log" },
  T: { tex: "leaves", tint: "#69a531" },
  s: { tex: "stone" },
  p: { tex: "deepslate" },
  c: { tex: "cobblestone" },
  b: { tex: "bedrock" },
  m: { tex: "mossy" },
  C: { tex: "ore_coal" },
  I: { tex: "ore_iron" },
  o: { tex: "ore_gold" },
  D: { tex: "ore_diamond" },
  R: { tex: "ore_redstone" },
  L: { tex: "ore_lapis" },
  E: { tex: "ore_emerald" },
  u: { tex: "ore_copper" },
  V: { tex: "lava", cls: "blk-lava", strip: true },
  A: { tex: "amethyst", cls: "blk-amethyst" },
  W: { tex: "water", cls: "blk-water", strip: true },
  N: { color: "#eef4f8" },
};

const SEAM = "inset 0 0 0 1px rgba(0,0,0,0.22)";

export default function BlockWorld({
  map,
  className,
  seam = true,
}: {
  map: string[];
  className?: string;
  /** Draw the thin per-block edge. Off to match the seamless overworld ground. */
  seam?: boolean;
}) {
  const cols = map.reduce((max, row) => Math.max(max, row.length), 0);

  // A short row is not a drawing choice, it's a typo: the grid is sized off the
  // longest row, so the missing characters become transparent air blocks at the
  // end of the row. On a dark backdrop that reads as a stripe of nothing, and
  // it's nearly invisible in a diff. Fail loudly in dev instead.
  if (import.meta.env.DEV) {
    const ragged = map
      .map((row, y) => ({ y, len: row.length }))
      .filter((row) => row.len !== cols);

    if (ragged.length > 0) {
      throw new Error(
        `BlockWorld: el mapa tiene filas de largo distinto (esperado ${cols}). ` +
          ragged.map((r) => `fila ${r.y} = ${r.len}`).join(", "),
      );
    }
  }

  return (
    <div
      className={cn("grid w-full", className)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {map.flatMap((row, y) =>
        Array.from({ length: cols }, (_, x) => {
          const ch = row[x] ?? " ";
          const def = LEGEND[ch];
          if (!def) return <div key={`${x}-${y}`} className="aspect-square" />;
          return (
            <div
              key={`${x}-${y}`}
              className={cn("aspect-square", def.cls)}
              style={{
                backgroundImage: def.tex ? `url(/textures/mc/${def.tex}.png)` : undefined,
                backgroundSize: def.tex ? (def.strip ? "100% auto" : "100% 100%") : undefined,
                backgroundPosition: def.strip ? "top" : "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: def.color ?? def.tint,
                backgroundBlendMode: def.tint && def.tex ? "multiply" : undefined,
                boxShadow: !seam || def.cls ? undefined : SEAM,
              }}
            />
          );
        }),
      )}
    </div>
  );
}
