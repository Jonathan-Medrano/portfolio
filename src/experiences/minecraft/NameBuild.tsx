import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SteveCharacter } from "./realSprites";
import WoolName, { woolRows } from "./WoolName";
import { useWorldBlock } from "./worldScale";

// The hero centerpiece: Steve pillars UP on a column of dirt (placing a block
// under his feet and hopping onto it, the real Minecraft way — never floating),
// lays his name in wool from the centre outward, then the dirt drops away and he
// falls back to the ground to gaze up at his work. The role kicker and tagline
// fade in once it's done.

// --- Tunable geometry (px) -------------------------------------------------
const BLOCK_MAX = 22; // wool block size on a roomy screen
const BLOCK_MIN = 9; // below this the letters stop reading as letters
const SIDE_PADDING = 32; // the Overworld section's px-6 plus a little breathing room
const PILLAR_BLOCKS = 4; // how high Steve climbs
const NAME_GAP = 8; // gap between Steve's head (at the top) and the name's base

// --- Timing (ms) -----------------------------------------------------------
const START_MS = 450;
const HOP_MS = 160; // per dirt block climbed
const PLACE_MS = 42; // per wool column laid (fast)
const BREAK_MS = 110; // per dirt block broken on the way down

type Phase = "rise" | "build" | "drop" | "done";

/** Largest wool block size that still fits `cols` columns across the viewport. */
function fitBlock(cols: number): number {
  if (cols === 0 || typeof window === "undefined") return BLOCK_MAX;
  const available = window.innerWidth - SIDE_PADDING;
  return Math.max(BLOCK_MIN, Math.min(BLOCK_MAX, Math.floor(available / cols)));
}

function useResponsiveBlock(cols: number): number {
  const [block, setBlock] = useState(() => fitBlock(cols));

  useEffect(() => {
    const update = () => setBlock(fitBlock(cols));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [cols]);

  return block;
}

export default function NameBuild({
  name,
  role,
  tagline,
}: {
  name: string;
  role: string;
  tagline: string;
}) {
  const reduce = useReducedMotion();
  const rows = useMemo(() => woolRows(name), [name]);
  const cols = rows[0]?.length ?? 0;

  // The name is laid out in fixed-size blocks, so its width is cols * BLOCK —
  // "JONA" is 23 columns, which at 22px is 506px and blew straight through a
  // 390px phone. The section clips overflow, so it failed silently: the visitor
  // just read "TON". Size the block to the viewport instead of hoping it fits.
  const block = useResponsiveBlock(cols);

  // Steve and his dirt pillar are measured in world blocks, not px, so they
  // shrink with the rest of the scene instead of towering over the title.
  // A Minecraft skin is 16 units wide and 32 tall = one block wide, two tall.
  const DIRT = useWorldBlock();
  const UNIT = DIRT / 16;
  const STEVE_W = DIRT;
  const STEVE_H = DIRT * 2;
  const RISE_TOP = PILLAR_BLOCKS * DIRT; // Steve's feet height at the top

  // Reveal order: centre column first, spreading outward.
  const rank = useMemo(() => {
    const center = (cols - 1) / 2;
    const order = [...Array(cols).keys()].sort(
      (a, b) => Math.abs(a - center) - Math.abs(b - center),
    );
    const m = new Map<number, number>();
    order.forEach((c, i) => m.set(c, i));
    return m;
  }, [cols]);

  const [phase, setPhase] = useState<Phase>("rise");
  const [risen, setRisen] = useState(0);
  const [placed, setPlaced] = useState(0);

  // Reduced motion: skip straight to the finished state.
  useEffect(() => {
    if (reduce) {
      setRisen(0);
      setPlaced(cols);
      setPhase("done");
    }
  }, [reduce, cols]);

  useEffect(() => {
    if (reduce) return;
    if (phase === "rise") {
      if (risen >= PILLAR_BLOCKS) {
        setPhase("build");
        return;
      }
      const t = setTimeout(() => setRisen((r) => r + 1), risen === 0 ? START_MS : HOP_MS);
      return () => clearTimeout(t);
    }
    if (phase === "build") {
      if (placed >= cols) {
        setPhase("drop");
        return;
      }
      const t = setTimeout(() => setPlaced((p) => p + 1), PLACE_MS);
      return () => clearTimeout(t);
    }
    if (phase === "drop") {
      // Break one block at a time, top-down; Steve steps down onto each.
      if (risen <= 0) {
        setPhase("done");
        return;
      }
      const t = setTimeout(() => setRisen((r) => r - 1), BREAK_MS);
      return () => clearTimeout(t);
    }
  }, [phase, risen, placed, reduce, cols]);

  const done = phase === "done";
  const building = phase === "build";
  // Height of the dirt pillar / Steve's feet right now (drives both).
  const rise = risen * DIRT;

  const nameW = cols * block;
  const nameH = rows.length * block;
  const nameBase = RISE_TOP + STEVE_H + NAME_GAP; // bottom px of the name
  const stageH = nameBase + nameH + 64; // room for the role above

  return (
    <div
      className="pointer-events-none relative"
      // maxWidth against the viewport, not the parent: this stage sits inside an
      // absolutely-positioned wrapper with no width of its own, so that wrapper
      // shrink-to-fits the content and `max-w-full` would measure against the
      // overflow itself — clamping nothing.
      style={{ width: Math.max(nameW, 320), maxWidth: "100vw", height: stageH }}
    >
      {/* Role kicker, above the name. */}
      <motion.p
        className="font-mc absolute inset-x-0 mx-auto w-max text-center text-[10px] tracking-[0.3em] whitespace-nowrap text-sky-950 uppercase sm:text-xs"
        style={{ bottom: nameBase + nameH + 22 }}
        initial={false}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 8 }}
        transition={{ duration: 0.5, delay: done ? 0.15 : 0 }}
      >
        {role}
      </motion.p>

      {/* The name (h1), laid in wool from the centre outward. */}
      <h1
        aria-label={name}
        className="absolute inset-x-0 flex justify-center"
        style={{ bottom: nameBase }}
      >
        <WoolName
          rows={rows}
          placedCols={placed}
          colShown={(c) => (rank.get(c) ?? 0) < placed}
          block={block}
          className="drop-shadow-[4px_5px_0_rgba(0,0,0,0.45)]"
        />
      </h1>

      {/* Tagline, below the name (anchored by its top so it grows downward). */}
      <motion.p
        // White with a hard pixel shadow: depending on the viewport this line
        // lands either on open sky or on a tree canopy, and dark-on-green was
        // unreadable. This reads on both.
        className="absolute inset-x-0 mx-auto max-w-md px-4 text-center text-sm text-balance text-white [text-shadow:2px_2px_0_rgba(0,0,0,0.6)]"
        style={{ top: stageH - nameBase + 18 }}
        initial={false}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
        transition={{ duration: 0.5, delay: done ? 0.35 : 0 }}
      >
        {tagline}
      </motion.p>

      {/* Dirt pillar: discrete blocks. They pop in one-per-jump on the way up,
          and Steve mines them one-per-step on the way down. */}
      {risen > 0 &&
        Array.from({ length: risen }, (_, i) => (
          <motion.div
            key={i}
            className="pixelated absolute"
            style={{
              left: "50%",
              bottom: i * DIRT,
              width: DIRT,
              height: DIRT,
              x: "-50%",
              backgroundImage: "url(/textures/mc/dirt.png)",
              backgroundSize: `${DIRT}px ${DIRT}px`,
              boxShadow: "inset 0 0 0 2px rgba(0,0,0,0.22)",
            }}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 600, damping: 24 }}
          />
        ))}

      {/* Dust kicked up when Steve places a block under his feet (on the way up). */}
      {phase === "rise" && risen > 0 && (
        <div
          key={`place-${risen}`}
          className="absolute"
          style={{ left: "50%", bottom: (risen - 1) * DIRT + DIRT / 2, transform: "translateX(-50%)" }}
        >
          {[-1.1, -0.55, 0.55, 1.1].map((d, i) => (
            <motion.span
              key={i}
              className="pixelated absolute size-2 bg-[#a98a5c]"
              initial={{ x: 0, y: 0, opacity: 0.9, scale: 1 }}
              animate={{ x: d * 26, y: -14, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Debris flying out where Steve just mined a block (on the way down). */}
      {phase === "drop" && (
        <div
          key={`brk-${risen}`}
          className="absolute"
          style={{ left: "50%", bottom: risen * DIRT + DIRT / 2, transform: "translateX(-50%)" }}
        >
          {[-1.1, -0.5, 0, 0.5, 1.1].map((d, i) => (
            <motion.span
              key={i}
              className="pixelated absolute size-2 bg-[#8a6a44]"
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: d * 32, y: 18, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Steve: jumps up onto each block, builds, then mines back down. */}
      <motion.div
        className="absolute"
        style={{ left: "50%", bottom: 0, width: STEVE_W, x: "-50%" }}
        animate={{ y: -rise }}
        transition={
          phase === "rise"
            ? { type: "spring", stiffness: 300, damping: 12 } // bouncy = a hop
            : phase === "drop"
              ? { duration: 0 } // snap onto each block as it's mined — never floats
              : { duration: 0.2 }
        }
      >
        <SteveCharacter
          unit={UNIT}
          // Rise & drop: arm points down — placing a block under his feet as he
          // jumps, then mining it out on the way down (same gesture). Build: arm
          // raised overhead placing the wool. Staying non-zero through every
          // sweep keeps the z-sandwich on, so the arm never flickers.
          armAngle={
            phase === "build"
              ? Math.floor(placed / 2) % 2 === 0
                ? 132
                : 152
              : (phase === "rise" || phase === "drop") && risen > 0
                ? risen % 2 === 0
                  ? 14
                  : 40
                : 0
          }
          // Watch the blocks while building and when admiring.
          lookUp={building || done}
        />
      </motion.div>
    </div>
  );
}
