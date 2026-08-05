// Generates procedural 16x16 Minecraft-style block textures as SVG tiles.
// Pure noise per pixel around a base color, with optional ore clusters.
// Run: node scripts/gen-textures.mjs  -> writes public/textures/*.svg
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../public/textures");
mkdirSync(OUT, { recursive: true });

// Deterministic PRNG so textures are stable across runs.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n) => Math.max(0, Math.min(255, Math.round(n)));
const hex = (r, g, b) =>
  "#" + [r, g, b].map((c) => clamp(c).toString(16).padStart(2, "0")).join("");

// base: [r,g,b], amp: noise amplitude, dark: chance of a darker speck.
function noiseTile(seed, base, amp, darkChance = 0.1, darkAmt = 34) {
  const rng = mulberry32(seed);
  const px = [];
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      const d = (rng() - 0.5) * 2 * amp;
      let [r, g, b] = base.map((c) => c + d);
      if (rng() < darkChance) {
        r -= darkAmt;
        g -= darkAmt;
        b -= darkAmt;
      }
      px.push({ x, y, fill: hex(r, g, b) });
    }
  }
  return px;
}

function stampOre(px, seed, oreRgb) {
  const rng = mulberry32(seed * 7 + 13);
  const clusters = 4 + Math.floor(rng() * 3);
  for (let c = 0; c < clusters; c++) {
    const cx = 2 + Math.floor(rng() * 12);
    const cy = 2 + Math.floor(rng() * 12);
    const blob = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ];
    for (const [dx, dy] of blob) {
      if (rng() < 0.35) continue;
      const x = cx + dx;
      const y = cy + dy;
      if (x > 15 || y > 15) continue;
      const v = (rng() - 0.5) * 30;
      const fill = hex(oreRgb[0] + v, oreRgb[1] + v, oreRgb[2] + v);
      const i = px.findIndex((p) => p.x === x && p.y === y);
      if (i >= 0) px[i].fill = fill;
    }
  }
  return px;
}

function toSvg(px) {
  const rects = px
    .map((p) => `<rect x="${p.x}" y="${p.y}" width="1" height="1" fill="${p.fill}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges">${rects}</svg>`;
}

const tiles = {
  stone: noiseTile(1, [127, 127, 130], 18, 0.08),
  deepslate: noiseTile(2, [74, 74, 84], 14, 0.12, 24),
  cobblestone: noiseTile(3, [120, 120, 124], 34, 0.22, 40),
  dirt: noiseTile(4, [110, 76, 48], 18, 0.14, 28),
  grass: noiseTile(5, [95, 167, 51], 16, 0.1, 26),
  netherrack: noiseTile(6, [97, 38, 38], 22, 0.16, 30),
  planks: noiseTile(7, [160, 124, 74], 14, 0.06, 22),
  lava: noiseTile(8, [230, 96, 24], 26, 0.18, 70),
  amethyst: noiseTile(9, [150, 86, 205], 30, 0.18, 40),
  water: noiseTile(10, [48, 96, 206], 16, 0.06, 24),
  bedrock: noiseTile(11, [42, 42, 48], 30, 0.28, 30),
  mossy: noiseTile(12, [86, 120, 64], 22, 0.18, 30),
};

const ores = {
  coal: [26, 26, 26],
  iron: [216, 175, 147],
  gold: [252, 222, 71],
  diamond: [74, 237, 217],
  redstone: [224, 42, 42],
  lapis: [43, 83, 196],
  copper: [224, 115, 77],
  emerald: [46, 204, 113],
};
for (const [name, rgb] of Object.entries(ores)) {
  tiles[`ore_${name}`] = stampOre(noiseTile(20 + name.length, [127, 127, 130], 16, 0.08), 30 + name.length, rgb);
}

let count = 0;
for (const [name, px] of Object.entries(tiles)) {
  writeFileSync(resolve(OUT, `${name}.svg`), toSvg(px));
  count++;
}
console.log(`wrote ${count} textures to public/textures`);
