import type { CSSProperties, ReactNode } from "react";
import PixelArt from "./PixelArt";
import BlockWorld from "./BlockWorld";
import { cn } from "@/lib/utils";

// Block-built oak trees (real log + leaves textures) and small pixel critters
// that bring the Overworld plains to life: flowers, tall grass, a sheep, a bee.
//
// Every loop in here is CSS (see "Ambient world motion" in index.css). It used to
// be Motion: a couple of dozen JS-driven infinite animations, and — worse — the
// walk cycles ran a setInterval that flipped React state every 160-240ms, which
// re-rendered and rebuilt a whole sprite SVG per step, per animal, forever. The
// compositor does all of this on its own thread for nothing, and one
// `data-mc-still` on the chapter parks the lot when it scrolls away.

/**
 * Duration and delay for one ambient loop. Always set both: custom properties
 * inherit, so a `Wander` wrapper's timing would otherwise silently become the
 * timing of the animal's legs inside it.
 */
const anim = (durationMs: number, delayMs = 0) =>
  ({ "--mc-dur": `${durationMs}ms`, "--mc-delay": `${delayMs}ms` }) as CSSProperties;

// Real Minecraft oak proportions: a compact 5-wide canopy of 3 leaf rows over a
// short trunk (1–2 logs). Trimmed top + no bottom leaf row → light and round.
const OAK_SMALL = [
  ".TTT.",
  "TTTTT",
  "TTTTT",
  "..l..",
];

const OAK_LARGE = [
  ".TTT.",
  "TTTTT",
  "TTTTT",
  "..l..",
  "..l..",
];

const OAK_TALL = [
  ".TTT.",
  "TTTTT",
  "TTTTT",
  "..l..",
  "..l..",
];

const OAK_SHAPES = { sm: OAK_SMALL, lg: OAK_LARGE, xl: OAK_TALL };

/** Columns wide, so a caller can keep a tree clear of the scene's centre. */
export const OAK_COLS = 5;

// An oak tree that sways gently at its base, like wind through the canopy.
export function OakTree({
  block = 20,
  size = "sm",
  className,
}: {
  block?: number;
  size?: keyof typeof OAK_SHAPES;
  className?: string;
}) {
  const map = OAK_SHAPES[size];
  return (
    <div
      className={cn("mc-sway", className)}
      style={{
        width: map[0].length * block,
        "--mc-sway": "1deg",
        ...anim(size === "sm" ? 4500 : 6000),
      } as CSSProperties}
    >
      <BlockWorld map={map} seam={false} />
    </div>
  );
}

// Soft elliptical contact shadow to ground an element on the surface.
export function GroundShadow({
  w = 60,
  className,
  style,
}: {
  w?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        width: w,
        height: w * 0.26,
        borderRadius: "50%",
        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%)",
        ...style,
      }}
    />
  );
}

// Flat sprite from a real pack texture (transparent plant on no background).
function texStyle(tex: string): CSSProperties {
  return {
    backgroundImage: `url(/textures/mc/${tex}.png)`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
  };
}

export type FlowerKind =
  | "poppy"
  | "dandelion"
  | "cornflower"
  | "oxeye_daisy"
  | "allium"
  | "blue_orchid"
  | "azure_bluet"
  | "red_tulip"
  | "lily_of_the_valley";

// A real flower texture, swaying in the breeze.
export function Flower({
  kind = "poppy",
  size = 34,
  delay = 0,
  className,
  style,
}: {
  kind?: FlowerKind;
  size?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("mc-sway", className)}
      style={{ "--mc-sway": "6deg", ...anim(3400, delay * 1000), ...style } as CSSProperties}
    >
      <div className="pixelated" style={{ width: size, height: size, ...texStyle(kind) }} />
    </div>
  );
}

// Tall grass / fern tuft (real texture), swaying.
export function GrassTuft({
  size = 42,
  delay = 0,
  tex = "short_grass",
  className,
  style,
}: {
  size?: number;
  delay?: number;
  tex?: "short_grass" | "fern";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn("mc-sway", className)}
      style={{ "--mc-sway": "7deg", ...anim(2800, delay * 1000), ...style } as CSSProperties}
    >
      <div className="pixelated" style={{ width: size, height: size, ...texStyle(tex) }} />
    </div>
  );
}

/**
 * Walks an animal back and forth, flipping to face the way it's heading.
 *
 * `range` is a CSS length, and callers pass it in `vw`: it used to be a pixel
 * number, so a sheep given a 140px beat wandered a third of the way across a
 * phone and walked straight through Steve.
 */
export function Wander({
  range = "12vw",
  duration = 14,
  delay = 0,
  className,
  children,
}: {
  range?: string;
  duration?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("mc-wander", className)}
      style={{ "--mc-range": range, ...anim(duration * 1000, delay * 1000) } as CSSProperties}
    >
      {children}
    </div>
  );
}

// --- Mob sprites (higher-res, all facing right; flip handled by <Wander>) ---

/**
 * An animal: a static body over a two-frame leg flip-book, bobbing as it walks.
 *
 * The legs are the only part that changes between steps, so they are the only
 * part rendered twice. The top frame blinks out to reveal the one under it — a
 * hard cut, no interpolation, which is what makes it read as footfalls.
 */
function Mob({
  body,
  legs,
  palette,
  block,
  bob,
  bobMs,
  stepMs,
  className,
}: {
  body: string[];
  legs: [string[], string[]];
  palette: Record<string, string>;
  block: number;
  /** Body lift at mid-stride, px. */
  bob: number;
  bobMs: number;
  /** Time one leg pose is held, ms. */
  stepMs: number;
  className?: string;
}) {
  return (
    <div
      className={cn("mc-bob", className)}
      style={{ "--mc-bob": `${bob}px`, ...anim(bobMs) } as CSSProperties}
    >
      <PixelArt rows={body} palette={palette} pixel={block} className="pixelated block" />
      <div className="relative">
        <PixelArt rows={legs[1]} palette={palette} pixel={block} className="pixelated block" />
        <PixelArt
          rows={legs[0]}
          palette={palette}
          pixel={block}
          className="mc-flip pixelated absolute top-0 left-0"
          style={anim(stepMs * 2)}
        />
      </div>
    </div>
  );
}

// Sheep (facing right): rounded woolly body, with the head poking out the front
// lower-down (tan face + eye), and four legs.
const SHEEP_BODY = [
  "...WWWWWWWW....",
  "..WWWWWWWWWW...",
  ".WWWWWWWWWWWW..",
  ".WWWWWWWWWWWW..",
  ".WWWWWWWWWWWHHH",
  ".WWWWWWWWWWWHEH",
  ".WWWWWWWWWWWHHH",
  ".WWWWWWWWWWWW..",
];
const SHEEP_LEGS: [string[], string[]] = [
  ["..LL......LL...", "..LL......LL..."],
  [".LL........LL..", ".LL........LL.."],
];
const SHEEP_PALETTE = { W: "#eeece1", H: "#d7b59c", E: "#2e2622", L: "#b29a86" };

export function Sheep({ block = 7, className }: { block?: number; className?: string }) {
  return (
    <Mob
      body={SHEEP_BODY}
      legs={SHEEP_LEGS}
      palette={SHEEP_PALETTE}
      block={block}
      bob={2}
      bobMs={550}
      stepMs={220}
      className={className}
    />
  );
}

// Pig (facing right): long pink body on the left, head grouped on the right —
// ears on top, eye, and a snout with nostril sticking out the front.
const PIG_BODY = [
  "...........EE...",
  "..ppppppppPPPP..",
  ".PPPPPPPPPPPPPP.",
  ".PPPPPPPPPPePPP.",
  ".PPPPPPPPPPPPPSS",
  "tPPPPPPPPPPPPPnS",
  ".PPPPPPPPPPPPPSS",
  ".PPPPPPPPPPPPPP.",
];
const PIG_LEGS: [string[], string[]] = [
  ["..HH.....HH.....", "..HH.....HH....."],
  [".HH.......HH....", ".HH.......HH...."],
];
const PIG_PALETTE = {
  P: "#e89aa0",
  p: "#d98a90",
  E: "#d07f86",
  t: "#d98a90",
  S: "#cf7f86",
  n: "#9e5a60",
  e: "#33272a",
  H: "#7a5256",
};

export function Pig({ block = 7, className }: { block?: number; className?: string }) {
  return (
    <Mob
      body={PIG_BODY}
      legs={PIG_LEGS}
      palette={PIG_PALETTE}
      block={block}
      bob={1.5}
      bobMs={600}
      stepMs={240}
      className={className}
    />
  );
}

// Chicken (facing right): white body, head up front with red comb, orange beak
// and red wattle, tail at the back, two thin legs.
const CHK_BODY = [
  ".......R....",
  "......RRR...",
  "......WWWW..",
  "......WWeWb.",
  "....WWWWWWw.",
  "..tWWWWWWW..",
  ".ttWWWWWWW..",
  "..tWWWWWWW..",
  "...WWWWWW...",
];
const CHK_LEGS: [string[], string[]] = [
  ["....y.y.....", "...y...y...."],
  ["...y.y......", "..y...y....."],
];
const CHK_PALETTE = {
  W: "#f4f4f4",
  R: "#d6402f",
  w: "#c0392b",
  b: "#f0a92e",
  t: "#dcdcdc",
  y: "#e0902a",
  e: "#2e2622",
};

export function Chicken({ block = 7, className }: { block?: number; className?: string }) {
  return (
    <Mob
      body={CHK_BODY}
      legs={CHK_LEGS}
      palette={CHK_PALETTE}
      block={block}
      bob={1.5}
      bobMs={380}
      stepMs={160}
      className={className}
    />
  );
}

// A bee buzzing along a looping path across the sky.
const BEE_ROWS = ["w...w", ".yby.", "w...w"];
const BEE_PALETTE = { w: "#ffffff", y: "#f4c20d", b: "#1a1a1a" };

export function Bee({ reach = 60, className }: { reach?: number; className?: string }) {
  return (
    <div
      className={cn("mc-buzz", className)}
      style={{ "--mc-x": `${reach}px`, ...anim(9000) } as CSSProperties}
    >
      <div className="mc-bob" style={{ "--mc-bob": "3px", ...anim(500) } as CSSProperties}>
        <PixelArt rows={BEE_ROWS} palette={BEE_PALETTE} pixel={3} className="pixelated" />
      </div>
    </div>
  );
}

// Leaves carried on the wind: little oak-green flecks drifting across the sky,
// fluttering and spinning, for ambient life. Fixed params (no randomness).
const LEAF_COLORS = ["#6aa531", "#5b9329", "#7bb83e"];
const LEAVES = Array.from({ length: 14 }, (_, i) => ({
  top: 8 + ((i * 9) % 52),
  left: (i * 17) % 95,
  size: 6 + (i % 3) * 2,
  dur: 7000 + (i % 5) * 1500,
  delay: (i % 7) * 1100,
  drift: 160 + (i % 4) * 80,
  spin: (i % 2 ? 1 : -1) * 400,
  color: LEAF_COLORS[i % 3],
}));

export function Leaves({ count = LEAVES.length, className }: { count?: number; className?: string }) {
  return (
    <div className={className} aria-hidden>
      {LEAVES.slice(0, count).map((l, i) => (
        <span
          key={i}
          className="mc-leaf pixelated absolute"
          style={{
            top: `${l.top}%`,
            left: `${l.left}%`,
            width: l.size,
            height: l.size,
            background: l.color,
            "--mc-drift": `${l.drift}px`,
            "--mc-spin": `${l.spin}deg`,
            ...anim(l.dur, l.delay),
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

// --- Foreground props (real pack textures) ----------------------------------

function TexProp({
  tex,
  size,
  className,
  style,
}: {
  tex: string;
  size: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{ width: size, height: size, ...texStyle(tex), ...style }}
    />
  );
}

// A pumpkin (plain or carved).
export function Pumpkin({
  size = 72,
  carved = false,
  className,
  style,
}: {
  size?: number;
  carved?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <TexProp tex={carved ? "carved_pumpkin" : "pumpkin_side"} size={size} className={className} style={style} />
  );
}

// A melon.
export function Melon({ size = 72, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return <TexProp tex="melon_side" size={size} className={className} style={style} />;
}

// A leafy bush (real texture), swaying gently.
export function Bush({ size = 72, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      className={cn("mc-sway", className)}
      style={{ "--mc-sway": "2deg", ...anim(4000), ...style } as CSSProperties}
    >
      <TexProp tex="bush" size={size} />
    </div>
  );
}

// A sweet berry bush.
export function BerryBush({ size = 64, className, style }: { size?: number; className?: string; style?: CSSProperties }) {
  return <TexProp tex="sweet_berry_bush_stage3" size={size} className={className} style={style} />;
}

// A mushroom (red or brown).
export function Mushroom({
  size = 30,
  red = true,
  className,
  style,
}: {
  size?: number;
  red?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return <TexProp tex={red ? "red_mushroom" : "brown_mushroom"} size={size} className={className} style={style} />;
}

// A small mossy boulder (cobblestone blocks).
const ROCK_MAP = [".cc.", "cccc", "cccc"];
export function Rock({ block = 13, className, style }: { block?: number; className?: string; style?: CSSProperties }) {
  return (
    <div className={className} style={{ width: 4 * block, ...style }}>
      <BlockWorld map={ROCK_MAP} seam={false} />
    </div>
  );
}

// --- Sky life ---------------------------------------------------------------

// A flock of distant birds in a V, flapping as it drifts across the sky.
const FLOCK = [
  { x: 0, y: 0 },
  { x: -18, y: 9 },
  { x: 18, y: 9 },
  { x: -36, y: 18 },
  { x: 36, y: 18 },
];
const BIRD_FRAMES: [string[], string[]] = [
  ["w...w", ".w.w."],
  [".w.w.", "..w.."],
];
const BIRD_PALETTE = { w: "#46535e" };

export function Birds({ className }: { className?: string }) {
  return (
    <div
      className={cn("mc-cross", className)}
      style={anim(38000)}
      aria-hidden
    >
      {FLOCK.map((b, i) => (
        <div key={i} className="absolute" style={{ left: b.x, top: b.y }}>
          {/* Wings: the same two-frame flip-book the animals use. */}
          <PixelArt rows={BIRD_FRAMES[1]} palette={BIRD_PALETTE} pixel={3} className="pixelated block" />
          <PixelArt
            rows={BIRD_FRAMES[0]}
            palette={BIRD_PALETTE}
            pixel={3}
            className="mc-flip pixelated absolute top-0 left-0"
            style={anim(400)}
          />
        </div>
      ))}
    </div>
  );
}

// Snow drifting down off the peaks — faint white flecks.
const SNOW = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 13 + 6) % 100,
  size: 2 + (i % 2),
  dur: 6000 + (i % 5) * 1000,
  delay: (i % 6) * 800,
  drift: ((i % 3) - 1) * 22,
}));

export function SnowFall({ count = SNOW.length, className }: { count?: number; className?: string }) {
  return (
    <div className={className} aria-hidden>
      {SNOW.slice(0, count).map((s, i) => (
        <span
          key={i}
          className="mc-fall absolute rounded-full bg-white/80"
          style={{
            left: `${s.left}%`,
            top: 0,
            width: s.size,
            height: s.size,
            // Relative to the viewport, not a hardcoded 170px: this band is sized
            // as a share of the screen, and on a phone the flakes used to fall
            // clean through the bottom of it.
            "--mc-fall": "22vh",
            "--mc-drift": `${s.drift}px`,
            ...anim(s.dur, s.delay),
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
