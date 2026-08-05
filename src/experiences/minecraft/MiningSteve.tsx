import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { RotateCcw } from "lucide-react";
import PixelArt from "./PixelArt";
import Block from "./Block";
import { SteveCharacter, CreeperRender, PickaxeSprite } from "./realSprites";
import { skills } from "../../data/skills";
import { skillIcons } from "../../components/skills/skillIcons";

// The items Steve drops on death: only the core programming languages.
const LANGUAGES = skills.filter((s) => s.category === "language");

// Horizontal slots (px from center) where the dropped items come to rest.
// Derived from the language count so it stays centered if the list changes.
const SLOTS = LANGUAGES.map(
  (_, i) => (i - (LANGUAGES.length - 1) / 2) * 92,
);

const SWING = 0.55; // seconds per pickaxe swing
const BLOCK = 56;
const BOOM_AT = 3400; // ms from mount until the creeper detonates

// Stone chips falling as Steve picks at the wall above him.
const chips = [
  { x: -18, y: 34 },
  { x: -6, y: 44 },
  { x: 8, y: 42 },
  { x: 20, y: 32 },
];

const crackRows = [
  "......",
  "..K...",
  ".KK.K.",
  "..KKK.",
  "...K..",
  "......",
];

// One-shot explosion debris: creeper guts + grey rubble, flung radially.
const DEBRIS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const dist = 60 + (i % 3) * 26;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 18,
    size: 5 + (i % 3) * 3,
    color: i % 3 === 0 ? "#7a7a82" : i % 2 ? "#3a8a36" : "#2e5e2c",
  };
});

const SMOKE = Array.from({ length: 5 }, (_, i) => ({
  x: Math.cos((i / 5) * Math.PI * 2) * 26,
  y: -24 - (i % 3) * 12,
}));

// A single language icon resting on the ground: idle-bobs, lifts on hover and
// reveals its name in a scaling pixel tooltip.
function DroppedItem({
  skill,
  xOffset,
  index,
}: {
  skill: (typeof LANGUAGES)[number];
  xOffset: number;
  index: number;
}) {
  const entry = skillIcons[skill.icon];
  const Icon = entry.Icon;
  return (
    // Outer: bursts out of Steve, arcs to its ground slot with a bounce.
    <motion.div
      className="absolute bottom-3"
      style={{ left: `calc(50% + ${xOffset}px)` }}
      initial={{ x: -xOffset, y: -70, opacity: 0, scale: 0.3, rotate: -120 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 13,
        delay: 0.2 + index * 0.12,
      }}
    >
      {/* Middle: perpetual idle bob, like a dropped Minecraft item. */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
      >
        {/* Inner: hover group — lifts the slot and pops the name tooltip. */}
        <div className="group relative -translate-x-1/2 cursor-pointer">
          <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 scale-75 opacity-0 transition duration-150 group-hover:scale-100 group-hover:opacity-100">
            <span
              className="font-mc block whitespace-nowrap rounded-sm border-2 border-black/60 bg-[#1d1d24] px-2 py-1 text-[10px] shadow-[0_2px_0_rgba(0,0,0,0.6)]"
              style={{ color: entry.color }}
            >
              {skill.name}
            </span>
          </div>

          <div className="grid size-11 place-items-center rounded-sm border-2 border-black/50 bg-[#2b2b33]/80 shadow-[0_3px_0_rgba(0,0,0,0.5)] transition group-hover:-translate-y-1 group-hover:border-white/50">
            <Icon size={24} color={entry.color} />
          </div>

          <div className="mx-auto mt-1 h-1 w-7 rounded-[50%] bg-black/40 blur-[1px]" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function MiningSteve() {
  // Cinematic plays once: Steve mines -> creeper detonates -> Steve dies and
  // drops his languages, which then stay on the ground to be explored.
  const [phase, setPhase] = useState<"alive" | "boom">("alive");
  const [runId, setRunId] = useState(0); // bump to replay the whole sequence

  // The scene lives one screen below the fold. Starting the countdown on mount
  // meant the creeper detonated while the visitor was still up in the Overworld,
  // so by the time they scrolled down the whole story was over and all that was
  // left was the aftermath. Wait until it's actually on screen.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!seen) return;
    setPhase("alive");
    const t = setTimeout(() => setPhase("boom"), BOOM_AT);
    return () => clearTimeout(t);
  }, [runId, seen]);

  const dead = phase === "boom";

  return (
    <div
      ref={ref}
      data-testid="mining"
      className="relative mx-auto h-64 w-full max-w-xl select-none"
    >
      {/* The wall Steve is breaking, just above his head. */}
      {!dead && (
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 150, width: BLOCK, height: BLOCK }}
        >
          <Block tex="cobblestone" size={BLOCK} />

          {/* Cracks deepen and reset as the block "breaks". */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0, 0.4, 0.8, 1, 0] }}
            transition={{ repeat: Infinity, duration: SWING * 4, times: [0, 0.3, 0.6, 0.9, 1] }}
          >
            <PixelArt
              rows={crackRows}
              palette={{ K: "rgba(0,0,0,0.55)" }}
              pixel={BLOCK / 6}
              className="pixelated"
            />
          </motion.div>

          {/* Chips spraying downward on each hit. */}
          {chips.map((c, i) => (
            <motion.span
              key={i}
              className="pixelated absolute bottom-0 left-1/2 size-1.5 bg-[#7a7a82]"
              animate={{ x: [0, c.x], y: [0, c.y], opacity: [1, 0], scale: [1, 0.4] }}
              transition={{ repeat: Infinity, duration: SWING, ease: "easeOut", delay: i * 0.05 }}
            />
          ))}
        </div>
      )}

      {/* Steve, seen from behind, swinging up at the wall. He tips over on death. */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2">
        <motion.div
          className="relative origin-bottom"
          animate={dead ? { rotate: 80, y: 12, opacity: [1, 1, 0] } : { rotate: 0, y: 0, opacity: 1 }}
          transition={dead ? { duration: 0.9, ease: "easeIn", times: [0, 0.55, 1] } : { duration: 0.2 }}
        >
          <SteveCharacter facing="back" unit={5} />

          {/* Damage flash: the classic red death tint. */}
          {dead && (
            <motion.div
              className="absolute inset-0 bg-red-600 mix-blend-multiply"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0, 0.6, 0] }}
              transition={{ duration: 0.9 }}
            />
          )}

          {/* Pickaxe swinging at the wall (only while alive). */}
          {!dead && (
            <motion.div
              className="absolute -top-10 left-1/2 origin-bottom-left"
              animate={{ rotate: [-40, 18, -40] }}
              transition={{ repeat: Infinity, duration: SWING, ease: "easeInOut" }}
            >
              <PickaxeSprite size={48} />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Creeper: slides in, lurks, hisses, then is replaced by the blast. */}
      {!dead ? (
        <div className="absolute bottom-6 left-[64%]">
          <motion.div
            initial={{ x: 90, opacity: 0 }}
            animate={{
              x: [90, 0, 0, 0],
              opacity: [0, 1, 1, 1],
              filter: ["brightness(1)", "brightness(1)", "brightness(1.8)", "brightness(3)"],
              scale: [1, 1, 1.1, 1.35],
            }}
            transition={{
              duration: BOOM_AT / 1000,
              times: [0, 0.4, 0.82, 1],
              ease: "easeInOut",
            }}
          >
            <CreeperRender height={110} />
          </motion.div>
        </div>
      ) : (
        // The blast, at the creeper's former spot. One-shot, restrained.
        <div className="pointer-events-none absolute bottom-12 left-[68%]">
          {/* Hot flash core. */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 8,
              height: 8,
              background:
                "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,214,120,0.9) 40%, rgba(255,120,40,0) 72%)",
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 22, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          {/* Shockwave ring. */}
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-100/70"
            style={{ width: 20, height: 20 }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 9, opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          {/* Radial debris. */}
          {DEBRIS.map((d, i) => (
            <motion.span
              key={`d${i}`}
              className="pixelated absolute"
              style={{ width: d.size, height: d.size, background: d.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{ x: d.x, y: d.y, opacity: [1, 1, 0], scale: 0.5, rotate: i % 2 ? 180 : -180 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            />
          ))}

          {/* Lingering smoke. */}
          {SMOKE.map((s, i) => (
            <motion.span
              key={`s${i}`}
              className="absolute size-4 rounded-full bg-[#4a4a4a]"
              initial={{ x: 0, y: 0, opacity: 0.5, scale: 0.4 }}
              animate={{ x: s.x, y: s.y, opacity: 0, scale: 2 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      {/* Dropped languages — only after the blast. They stay, hover-explorable. */}
      {dead &&
        LANGUAGES.map((skill, i) => (
          <DroppedItem key={skill.name} skill={skill} xOffset={SLOTS[i]} index={i} />
        ))}

      {/* Replay the whole scene. */}
      {dead && (
        // Labelled, not just an icon: whoever lands here after the scene has
        // played needs to know there IS a scene to play.
        <motion.button
          type="button"
          onClick={() => setRunId((n) => n + 1)}
          className="font-mc absolute right-1 bottom-1 inline-flex items-center gap-1.5 rounded-sm border border-white/15 bg-black/50 px-2 py-1.5 text-[8px] tracking-widest text-amber-100/70 uppercase transition hover:border-white/40 hover:text-amber-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <RotateCcw size={12} aria-hidden />
          Repetir
        </motion.button>
      )}
    </div>
  );
}
