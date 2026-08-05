import { motion } from "motion/react";
import PixelArt from "./PixelArt";

// Clean, modern Steve palette.
const palette: Record<string, string> = {
  H: "#4a3525", // hair
  S: "#d3a07c", // skin
  W: "#ffffff", // eye white
  I: "#5a4fcf", // eye iris
  M: "#7a4a32", // mustache
  B: "#14b8c4", // shirt (cyan)
  L: "#3f4cc0", // pants
  F: "#5a5a66", // shoes
};

// Front-facing Steve, 8 px wide. Two separate eyes, a small mustache,
// a taller torso and legs so he reads as a person, not a block.
const steve = [
  "HHHHHHHH", // hair
  "HHHHHHHH",
  "HSSSSSSH", // brow
  "SWISSIWS", // eyes: white+iris  ·  iris+white
  "SSSSSSSS", // cheeks / nose
  "SSMMMMSS", // mustache
  "SSSSSSSS", // jaw
  ".SSSSSS.", // chin / neck
  "SBBBBBBS", // shoulders (arms = skin edges, shirt center)
  "SBBBBBBS",
  "SBBBBBBS",
  "SBBBBBBS",
  "SBBBBBBS",
  "SBBBBBBS",
  ".LL..LL.", // legs
  ".LL..LL.",
  ".LL..LL.",
  ".FF..FF.", // shoes
];

export default function PixelSteve({ pixel = 10 }: { pixel?: number }) {
  return (
    <motion.div
      // Gentle idle bob, like he's standing in the breeze.
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      className="drop-shadow-[4px_6px_0_rgba(0,0,0,0.25)]"
    >
      <PixelArt rows={steve} palette={palette} pixel={pixel} className="pixelated" />
    </motion.div>
  );
}
