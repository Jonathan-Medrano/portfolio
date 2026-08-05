import PixelArt from "./PixelArt";

// Reusable Minecraft pixel sprites. Each is just rows + palette fed to PixelArt.

const pickaxe = [
  "DD...DD",
  "DDD.DDD",
  ".DDDDD.",
  "...H...",
  "...H...",
  "...H...",
  "...H...",
];
const pickaxePalette = { D: "#3fe0d0", H: "#6b4a2a" };

export function Pickaxe({ pixel = 7 }: { pixel?: number }) {
  return (
    <PixelArt
      rows={pickaxe}
      palette={pickaxePalette}
      pixel={pixel}
      className="pixelated"
    />
  );
}

const creeper = [
  "GGGGGGGG",
  "GXXGGXXG",
  "GXXGGXXG",
  "GGGXXGGG",
  "GGXXXXGG",
  "GGXXXXGG",
  "GGXGGXGG",
  "GGGGGGGG",
  "DGGGGGGD",
  "DGGGGGGD",
  "DGGGGGGD",
  ".GG..GG.",
];
const creeperPalette = { G: "#5fa733", D: "#4a8327", X: "#16240f" };

export function Creeper({ pixel = 8 }: { pixel?: number }) {
  return (
    <PixelArt
      rows={creeper}
      palette={creeperPalette}
      pixel={pixel}
      className="pixelated"
    />
  );
}

const torch = ["FFF", "FOF", ".F.", ".H.", ".H.", ".H."];
const torchPalette = { F: "#ffd23f", O: "#ff8a1e", H: "#5a3a1e" };

export function Torch({ pixel = 6 }: { pixel?: number }) {
  return (
    <PixelArt
      rows={torch}
      palette={torchPalette}
      pixel={pixel}
      className="pixelated"
    />
  );
}

const oreRows = [
  "SSSSSS",
  "SOSSOS",
  "SSSOSS",
  "SOSSSS",
  "SSSSOS",
  "SSSSSS",
];

export function OreBlock({
  ore,
  pixel = 8,
}: {
  ore: string;
  pixel?: number;
}) {
  return (
    <PixelArt
      rows={oreRows}
      palette={{ S: "#5a5a62", O: ore }}
      pixel={pixel}
      className="pixelated"
    />
  );
}

const stoneRows = [
  "SSSSSS",
  "SsSSsS",
  "SSSsSS",
  "SsSSSS",
  "SSSSsS",
  "SSSSSS",
];

export function StoneBlock({ pixel = 8 }: { pixel?: number }) {
  return (
    <PixelArt
      rows={stoneRows}
      palette={{ S: "#6e6e76", s: "#5a5a62" }}
      pixel={pixel}
      className="pixelated"
    />
  );
}

const book = ["MMMMMM", "MPPPPM", "MPAAPM", "MPAAPM", "MPPPPM", "MMMMMM"];
const bookPalette = { M: "#caa64a", P: "#7b3fb5", A: "#f3ead0" };

export function EnchantedBook({ pixel = 8 }: { pixel?: number }) {
  return (
    <PixelArt
      rows={book}
      palette={bookPalette}
      pixel={pixel}
      className="pixelated"
    />
  );
}
