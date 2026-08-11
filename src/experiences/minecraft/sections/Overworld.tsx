import type { CSSProperties } from "react";
import { ChevronsDown } from "lucide-react";
import { profile } from "@/data";
import Clouds from "../Clouds";
import Mountains from "../Mountains";
import NameBuild, { heroBase } from "../NameBuild";
import { useActiveRef, stillProps } from "../active";
import {
  OakTree,
  OAK_COLS,
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
import { useViewport, BLOCK_DESKTOP } from "../worldScale";
import type { Tier } from "../worldScale";

// The ground is three blocks deep (grass over dirt over stone), so the surface
// sits three blocks up from the section bottom. Derived from the world block —
// see worldScale.ts for why this can't be a constant.
const GROUND_BLOCKS = 3;

/**
 * The grove framing the sides — one oak per edge.
 *
 * This is a spec rather than hardcoded positions because the grove used to be
 * four trees at fixed percentages with fixed block sizes, and four 460px-wide
 * canopies on a 1440px screen is not a grove framing a scene: it is a solid wall
 * of leaves that hid the entire snow-capped range behind it, at every viewport.
 * On a phone the same four trees merged into one green slab behind Steve.
 *
 * Trees are anchored BY THEIR TRUNK, not by their bounding box. Anchoring the box
 * and letting it overhang pushed the trunk off screen on a phone, so what was
 * left in frame was a floating slab of leaves — a canopy with nothing holding it
 * up. Pin the trunk just inside the edge and let the outer canopy crop instead:
 * that reads as standing at the edge of a forest, which is the point.
 *
 * The size is a share of the VIEWPORT, not a multiple of the world block, because
 * the world block stops growing at 80px: every screen from 640px up gets the same
 * one, so sizing off it handed a 768px tablet desktop-sized furniture — two 360px
 * canopies leaving 260px of open middle for an 80px Steve.
 */
/** A tree may be at most this share of the viewport wide. */
const TREE_WIDTH_SHARE = 0.32;
/** Trunk position, as a share of the viewport width in from its edge. */
const TRUNK_INSET = 0.05;
/** Column the trunk occupies in the 5-wide oak shapes. */
const OAK_TRUNK_COL = 2;

/**
 * The two mountain ranges, per screen size.
 *
 * `blockPx` can't simply be constant across viewports. The silhouette comes from
 * a sine sum evaluated per column, so a fixed block size on a 390px screen yields
 * only ~22 columns — under two full cycles — and the "épic snow-capped peaks"
 * flatten into one broad grey plateau filling two-thirds of the screen. Smaller
 * blocks on a narrow screen buy back the columns the silhouette needs, and a
 * shorter band keeps the range from swallowing the sky.
 */
const RANGES: Record<Tier, { far: [number, number]; near: [number, number] }> = {
  //                 far: [blockPx, bandVh]   near: [blockPx, bandVh]
  phone: { far: [11, 0.42], near: [16, 0.34] },
  tablet: { far: [15, 0.56], near: [21, 0.4] },
  desktop: { far: [18, 0.68], near: [25, 0.44] },
};

// Ground-level flora: real flowers scattered along the plains. A phone shows a
// prefix of this list — eight flowers across 390px is a flowerbed, not plains.
const FLORA: { x: string; el: FlowerKind }[] = [
  { x: "12%", el: "poppy" },
  { x: "38%", el: "azure_bluet" },
  { x: "71%", el: "red_tulip" },
  { x: "91%", el: "blue_orchid" },
  { x: "24%", el: "dandelion" },
  { x: "63%", el: "allium" },
  { x: "47%", el: "cornflower" },
  { x: "80%", el: "oxeye_daisy" },
];

interface MobSlot {
  kind: "sheep" | "pig" | "chicken";
  /** Which edge `at` is measured from. */
  side: "left" | "right";
  /** Distance from that edge, as a share of the viewport width. */
  at: number;
  /** How far it grazes, in vw. */
  range: number;
  duration: number;
  delay: number;
  /** Sprite pixel size, in desktop-scale px. */
  px: number;
}

/**
 * Who is grazing the plains, per screen size.
 *
 * The roster is tiered rather than fixed because all four animals used to be
 * placed at fixed percentages with wander ranges in fixed pixels: on a phone a
 * 140px beat is a third of the screen, so the sheep, the pig and the chicken all
 * converged on Steve and shuffled through each other in a 100px band.
 */
const MOBS: Record<Tier, MobSlot[]> = {
  phone: [
    { kind: "sheep", side: "left", at: 0.05, range: 11, duration: 16, delay: 0, px: 6 },
    { kind: "chicken", side: "right", at: 0.14, range: 9, duration: 11, delay: 0.5, px: 6 },
  ],
  tablet: [
    { kind: "sheep", side: "left", at: 0.09, range: 9, duration: 16, delay: 0, px: 7 },
    { kind: "pig", side: "left", at: 0.26, range: 6, duration: 13, delay: 1, px: 6 },
    { kind: "chicken", side: "right", at: 0.09, range: 8, duration: 11, delay: 0.5, px: 6 },
  ],
  desktop: [
    { kind: "sheep", side: "left", at: 0.14, range: 10, duration: 16, delay: 0, px: 7 },
    { kind: "pig", side: "left", at: 0.3, range: 6, duration: 13, delay: 1, px: 7 },
    { kind: "sheep", side: "right", at: 0.14, range: 10, duration: 17, delay: 2, px: 7 },
    { kind: "chicken", side: "right", at: 0.3, range: 6, duration: 11, delay: 0.5, px: 7 },
  ],
};

// Ambient particle counts. A phone gets fewer of everything: the flecks are 2-8px
// and the screen is a fifth of the area, so the density reads the same.
const AMBIENCE: Record<Tier, { flowers: number; leaves: number; snow: number }> = {
  phone: { flowers: 4, leaves: 6, snow: 8 },
  tablet: { flowers: 6, leaves: 10, snow: 12 },
  desktop: { flowers: 8, leaves: 14, snow: 18 },
};

// Spawn point: hero + identity, under a bright blocky sky over a living plains
// biome — rolling hills, oak trees, flowers, a grazing sheep and a passing bee —
// where Steve builds his name in wool by pillaring up on dirt.
export default function Overworld() {
  const [ref, active] = useActiveRef();
  const { w, block: BLOCK, tier } = useViewport();
  const SURFACE = GROUND_BLOCKS * BLOCK;

  // Mob sprites carry their own pixel size; scale it by the same ratio so a
  // sheep stays sheep-sized relative to the ground it grazes on.
  const mob = (px: number) => (px * BLOCK) / BLOCK_DESKTOP;

  // The grove. Phones get the 4-row shape: less canopy, more headroom.
  const treeShape = tier === "phone" ? "sm" : "lg";
  const treeRows = treeShape === "sm" ? 4 : 5;
  const treeBlock = Math.min(
    BLOCK * 1.15,
    (w * TREE_WIDTH_SHARE) / OAK_COLS,
    // Safety net: the canopy must stay under the wool name, whatever the width.
    (heroBase(BLOCK) - BLOCK * 0.2) / treeRows,
  );
  const treeInset = TRUNK_INSET * w - OAK_TRUNK_COL * treeBlock;

  // The hero corridor: everything between the two canopies. Derived from where
  // the trees actually landed rather than declared separately, so the scenery
  // behind them can never disagree with the scenery in front.
  const corridor = (treeInset + treeBlock * OAK_COLS) / w;

  const ranges = RANGES[tier];
  const ambience = AMBIENCE[tier];

  return (
    <section
      ref={ref}
      {...stillProps(active)}
      className="cv-section relative min-h-dvh overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 px-6"
    >
      {/* Pixel sun: the plains' bright yellow sun.
          Above the clouds (z-[2], not z-0) — a cloud drifting across a sun that
          sits behind it clipped the square into a shape that read as a render
          glitch rather than a sun. */}
      <div
        className="pixelated absolute top-10 left-8 z-[2] size-14 bg-[#ffe14d] sm:top-16 sm:left-16 sm:size-20"
        style={{
          boxShadow:
            "0 0 0 8px rgba(255,236,120,0.35), 0 0 0 18px rgba(255,236,120,0.15)",
        }}
      />

      {/* Depth: tall, épic snow-capped peaks (hazy blue) behind a nearer biome
          range, filling the sky between the title and the ground. Sized in blocks
          of a fixed pixel size, so a phone shows fewer peaks at the same scale
          instead of the same peaks shrunk into noise. */}
      <Mountains
        snowy
        trees={false}
        blockPx={ranges.far[0]}
        bandVh={ranges.far[1]}
        haze={0.42}
        bottom={SURFACE - BLOCK * 1.44}
      />
      <Mountains
        blockPx={ranges.near[0]}
        bandVh={ranges.near[1]}
        haze={0.2}
        bottom={SURFACE - BLOCK * 1.69}
        // The same corridor the foreground grove leaves open. This range plants
        // its own little oaks, and one of them grew straight out of Steve's head.
        treeClear={[corridor, 1 - corridor]}
      />

      {/* Snow drifting off the peaks, and a flock of birds crossing the sky. */}
      <SnowFall
        count={ambience.snow}
        className="pointer-events-none absolute inset-x-0 top-[20%] z-[1] h-[36%] overflow-hidden"
      />
      <Birds className="absolute top-[13%] left-0 z-[1]" />

      <Clouds />

      {/* The grove framing the sides: one oak per margin, hanging off the edge.
          The middle is left open on purpose — that is where the mountains, the
          title and Steve live. */}
      <div className="absolute z-[6]" style={{ bottom: SURFACE, left: treeInset }}>
        <OakTree size={treeShape} block={treeBlock} />
      </div>
      <div className="absolute z-[6]" style={{ bottom: SURFACE, right: treeInset }}>
        <OakTree size={treeShape} block={treeBlock * 0.96} />
      </div>

      {/* Flat 2D ground: a row of grass blocks (side texture — green top + dirt,
          like the iconic block) over a dirt body over stone. No 3D bevel. */}
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
      {FLORA.slice(0, ambience.flowers).map((f, i) => (
        <Flower
          key={f.el}
          kind={f.el}
          size={mob(34)}
          delay={i * 0.18}
          className="absolute z-[3]"
          style={{ left: f.x, bottom: SURFACE - 4 }}
        />
      ))}

      {/* Passive mobs wandering the plains, flanking Steve — each with a soft
          contact shadow so it sits on the ground. */}
      {MOBS[tier].map((slot, i) => {
        const Animal = slot.kind === "sheep" ? Sheep : slot.kind === "pig" ? Pig : Chicken;
        const shadow = slot.kind === "chicken" ? 48 : slot.kind === "pig" ? 80 : 64;
        return (
          <div
            key={`${slot.kind}-${slot.side}-${i}`}
            className="absolute z-[3]"
            style={{ [slot.side]: `${slot.at * 100}%`, bottom: SURFACE - 2 }}
          >
            {/* Animals always graze INWARD. The walk is a single translate, so a
                right-anchored animal given a positive beat walked off the edge of
                the screen and came back — the chicken spent half its cycle
                cropped against the frame. */}
            <Wander
              range={`${slot.side === "right" ? -slot.range : slot.range}vw`}
              duration={slot.duration}
              delay={slot.delay}
            >
              <div className="relative">
                <GroundShadow
                  w={mob(shadow)}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2"
                />
                <Animal block={mob(slot.px)} />
              </div>
            </Wander>
          </div>
        );
      })}

      {/* A bee working the flowers near the trees. */}
      <div
        className="absolute z-[4]"
        style={{ left: `${corridor * 100 + 4}%`, bottom: SURFACE + BLOCK * 0.6 }}
      >
        <Bee reach={mob(60)} />
      </div>

      {/* Leaves drifting on the wind across the scene. */}
      <Leaves count={ambience.leaves} className="pointer-events-none absolute inset-0 z-[7]" />

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

      {/* Scroll invitation — the main action of this scroll-driven page.
          Two elements, not one: the ambient keyframes animate `transform`
          wholesale, so anything that also needs a static transform (here, the
          -translate-x-1/2 that centres it) has to own its own element or the
          animation wipes it and the hint jumps to the left edge. */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div
          className="mc-nudge flex flex-col items-center gap-2"
          style={{ "--mc-dur": "1.6s" } as CSSProperties}
        >
          <span className="font-mc rounded-sm border-2 border-black/40 bg-black/35 px-3 py-1.5 text-[9px] tracking-widest text-amber-100 uppercase shadow-[0_3px_0_rgba(0,0,0,0.45)] sm:text-[10px]">
            Bajá a explorar mi mundo
          </span>
          <ChevronsDown className="size-7 text-amber-100 drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    </section>
  );
}
