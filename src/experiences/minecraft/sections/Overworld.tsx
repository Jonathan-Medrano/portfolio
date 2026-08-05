import { motion } from "motion/react";
import { ChevronsDown } from "lucide-react";
import { profile } from "@/data";
import Clouds from "../Clouds";
import Mountains from "../Mountains";
import NameBuild from "../NameBuild";
import { ActiveContext, useActiveRef } from "../active";
import {
  OakTree,
  Flower,
  Sheep,
  Pig,
  Chicken,
  Bee,
  Wander,
  Leaves,
  GroundShadow,
  Birds,
  SnowFall,
} from "../Flora";
import type { FlowerKind } from "../Flora";
import { useWorldBlock, BLOCK_DESKTOP } from "../worldScale";

// The ground is three blocks deep (grass over dirt over stone), so the surface
// sits three blocks up from the section bottom. Derived from the world block —
// see worldScale.ts for why this can't be a constant.
const GROUND_BLOCKS = 3;

// Ground-level flora: just real flowers scattered along the plains.
const FLORA: { x: string; el: FlowerKind }[] = [
  { x: "12%", el: "poppy" },
  { x: "24%", el: "dandelion" },
  { x: "38%", el: "azure_bluet" },
  { x: "47%", el: "cornflower" },
  { x: "63%", el: "allium" },
  { x: "71%", el: "red_tulip" },
  { x: "80%", el: "oxeye_daisy" },
  { x: "91%", el: "blue_orchid" },
];

// Spawn point: hero + identity, under a bright blocky sky over a living plains
// biome — rolling hills, oak trees, flowers, a grazing sheep and a passing bee —
// where Steve builds his name in wool by pillaring up on dirt.
export default function Overworld() {
  const [ref, active] = useActiveRef();
  const BLOCK = useWorldBlock();
  const SURFACE = GROUND_BLOCKS * BLOCK;
  // Mob sprites carry their own pixel size; scale it by the same ratio so a
  // sheep stays sheep-sized relative to the ground it grazes on.
  const mob = (px: number) => (px * BLOCK) / BLOCK_DESKTOP;
  return (
    <section
      ref={ref}
      className="cv-section relative min-h-dvh overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 px-6"
    >
      <ActiveContext.Provider value={active}>
      {/* Pixel sun: the plains' bright yellow sun.
          Above the clouds (z-[2], not z-0) — a cloud drifting across a sun that
          sits behind it clipped the square into a shape that read as a render
          glitch rather than a sun. */}
      <div
        className="pixelated absolute top-16 left-16 z-[2] size-20 bg-[#ffe14d]"
        style={{
          boxShadow:
            "0 0 0 8px rgba(255,236,120,0.35), 0 0 0 18px rgba(255,236,120,0.15)",
        }}
      />

      {/* Depth: tall, épic snow-capped peaks (hazy blue) behind a nearer biome
          range, filling the sky between the title and the ground. */}
      <Mountains snowy trees={false} cols={80} rows={34} haze={0.42} bottom={SURFACE - BLOCK * 1.44} />
      <Mountains cols={58} rows={16} haze={0.2} bottom={SURFACE - BLOCK * 1.69} />

      {/* Snow drifting off the peaks, and a flock of birds crossing the sky. */}
      <SnowFall className="pointer-events-none absolute inset-x-0 top-[20%] z-[1] h-[36%] overflow-hidden" />
      <Birds className="absolute top-[13%] left-0 z-[1]" />

      <Clouds />

      {/* A grove of oaks framing the sides — varied shape and size so each reads
          as its own tree (authentic 5-wide Minecraft canopies). */}
      <div className="absolute -left-[4%] z-[6]" style={{ bottom: SURFACE }}>
        <OakTree size="lg" block={BLOCK * 1.15} />
      </div>
      <div className="absolute left-[18%] z-[6]" style={{ bottom: SURFACE }}>
        <OakTree size="sm" block={BLOCK} />
      </div>
      <div className="absolute -right-[3%] z-[6]" style={{ bottom: SURFACE }}>
        <OakTree size="xl" block={BLOCK * 1.1} />
      </div>
      <div className="absolute right-[18%] z-[6]" style={{ bottom: SURFACE }}>
        <OakTree size="sm" block={BLOCK * 0.98} />
      </div>

      {/* Flat 2D ground: a row of grass blocks (side texture — green top + dirt,
          like the iconic block) over a dirt body over stone. No 3D bevel.
          One block = 80px so it matches Steve and the trees. */}
      <div className="absolute inset-x-0 bottom-0 z-[2]">
        {(["grass", "dirt", "stone"] as const).map((tex) => (
          <div
            key={tex}
            style={{
              height: BLOCK,
              backgroundImage: `url(/textures/mc/${tex}.png)`,
              backgroundSize: `${BLOCK}px ${BLOCK}px`,
              backgroundRepeat: "repeat-x",
            }}
          />
        ))}
      </div>

      {/* Flowers along the surface (real textures). */}
      {FLORA.map((f, i) => (
        <Flower
          key={i}
          kind={f.el}
          delay={i * 0.18}
          className="absolute z-[3]"
          style={{ left: f.x, bottom: SURFACE - 4 }}
        />
      ))}

      {/* Passive mobs wandering the plains, flanking Steve — each with a soft
          contact shadow so it sits on the ground. */}
      <div className="absolute left-[16%] z-[3]" style={{ bottom: SURFACE - 2 }}>
        <Wander range={140} duration={16}>
          <div className="relative">
            <GroundShadow w={mob(64)} className="absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <Sheep block={mob(7)} />
          </div>
        </Wander>
      </div>
      <div className="absolute left-[33%] z-[3]" style={{ bottom: SURFACE - 2 }}>
        <Wander range={90} duration={13} delay={1}>
          <div className="relative">
            <GroundShadow w={mob(80)} className="absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <Pig block={mob(7)} />
          </div>
        </Wander>
      </div>
      <div className="absolute right-[16%] z-[3]" style={{ bottom: SURFACE - 2 }}>
        <Wander range={140} duration={17} delay={2}>
          <div className="relative">
            <GroundShadow w={mob(64)} className="absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <Sheep block={mob(7)} />
          </div>
        </Wander>
      </div>
      <div className="absolute right-[34%] z-[3]" style={{ bottom: SURFACE - 1 }}>
        <Wander range={90} duration={11} delay={0.5}>
          <div className="relative">
            <GroundShadow w={mob(48)} className="absolute -bottom-1 left-1/2 -translate-x-1/2" />
            <Chicken block={mob(7)} />
          </div>
        </Wander>
      </div>

      {/* A bee buzzing near the trees. */}
      <div
        className="absolute left-[34%] z-[4]"
        style={{ bottom: SURFACE + BLOCK * 0.6 }}
      >
        <Bee />
      </div>

      {/* Leaves drifting on the wind across the scene. */}
      <Leaves className="pointer-events-none absolute inset-0 z-[7]" />

      {/* Steve's ground shadow + the build stage where he writes the title. */}
      <GroundShadow
        w={mob(130)}
        className="absolute left-1/2 z-[2] -translate-x-1/2"
        style={{ bottom: SURFACE - 8 }}
      />
      <div className="absolute left-1/2 z-10 -translate-x-1/2" style={{ bottom: SURFACE }}>
        {/* shortName, not name: the wool font is 5 blocks per letter, so
            "Jonathan Medrano" is 95 columns wide and cannot fit on any phone
            at a legible block size. The full name lives in the professional
            experience; here it's the four-letter build. */}
        <NameBuild
          name={profile.shortName}
          role={profile.role}
          tagline={profile.tagline}
        />
      </div>

      {/* The dirt sinks into darkness at the bottom: the light fades as the
          ground gives way to the underground below. Pairs with the cave's top fade. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-b from-transparent via-[#050507]/40 to-[#050507]" />

      {/* Scroll invitation — the main action of this scroll-driven page. */}
      <motion.div
        animate={active ? { y: [0, 9, 0] } : false}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mc rounded-sm border-2 border-black/40 bg-black/35 px-3 py-1.5 text-[9px] tracking-widest text-amber-100 uppercase shadow-[0_3px_0_rgba(0,0,0,0.45)] sm:text-[10px]">
          Bajá a explorar mi mundo
        </span>
        <ChevronsDown className="size-7 text-amber-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" />
      </motion.div>
      </ActiveContext.Provider>
    </section>
  );
}
