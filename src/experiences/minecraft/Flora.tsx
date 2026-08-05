import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import PixelArt from "./PixelArt";
import BlockWorld from "./BlockWorld";
import { useActive } from "./active";

// Block-built oak trees (real log + leaves textures) and small pixel critters
// that bring the Overworld plains to life: flowers, tall grass, a sheep, a bee.

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
  const cols = map[0].length;
  const active = useActive();
  return (
    <motion.div
      className={className}
      style={{ width: cols * block, transformOrigin: "bottom center" }}
      animate={active ? { rotate: [-1, 1, -1] } : false}
      transition={{ repeat: Infinity, duration: size === "sm" ? 4.5 : 6, ease: "easeInOut" }}
    >
      <BlockWorld map={map} seam={false} />
    </motion.div>
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
  const active = useActive();
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "bottom center", ...style }}
      animate={active ? { rotate: [-6, 6, -6] } : false}
      transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay }}
    >
      <div className="pixelated" style={{ width: size, height: size, ...texStyle(kind) }} />
    </motion.div>
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
  const active = useActive();
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "bottom center", ...style }}
      animate={active ? { rotate: [-7, 7, -7] } : false}
      transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay }}
    >
      <div className="pixelated" style={{ width: size, height: size, ...texStyle(tex) }} />
    </motion.div>
  );
}

// Alternates a boolean on an interval — drives a two-frame leg walk cycle.
// Stops the interval when the section is off screen.
function useStep(ms: number, active = true) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setOn((v) => !v), ms);
    return () => clearInterval(id);
  }, [ms, active]);
  return on;
}

// Walks an animal back and forth, flipping to face the way it's heading.
export function Wander({
  range = 120,
  duration = 14,
  delay = 0,
  className,
  children,
}: {
  range?: number;
  duration?: number;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const active = useActive();
  return (
    <motion.div
      className={className}
      animate={active ? { x: [0, range, range, 0, 0], scaleX: [1, 1, -1, -1, 1] } : false}
      transition={{
        duration,
        times: [0, 0.46, 0.5, 0.96, 1],
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

// --- Mob sprites (higher-res, all facing right; flip handled by <Wander>) ---

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
const SHEEP_LEGS = [
  ["..LL......LL...", "..LL......LL..."],
  [".LL........LL..", ".LL........LL.."],
];

export function Sheep({ block = 7, className }: { block?: number; className?: string }) {
  const active = useActive();
  const step = useStep(220, active);
  return (
    <motion.div
      className={className}
      animate={active ? { y: [0, -2, 0] } : false}
      transition={{ repeat: Infinity, duration: 0.55, ease: "easeInOut" }}
    >
      <PixelArt
        rows={[...SHEEP_BODY, ...SHEEP_LEGS[step ? 1 : 0]]}
        palette={{ W: "#eeece1", H: "#d7b59c", E: "#2e2622", L: "#b29a86" }}
        pixel={block}
        className="pixelated"
      />
    </motion.div>
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
const PIG_LEGS = [
  ["..HH.....HH.....", "..HH.....HH....."],
  [".HH.......HH....", ".HH.......HH...."],
];

export function Pig({ block = 7, className }: { block?: number; className?: string }) {
  const active = useActive();
  const step = useStep(240, active);
  return (
    <motion.div
      className={className}
      animate={active ? { y: [0, -1.5, 0] } : false}
      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
    >
      <PixelArt
        rows={[...PIG_BODY, ...PIG_LEGS[step ? 1 : 0]]}
        palette={{
          P: "#e89aa0",
          p: "#d98a90",
          E: "#d07f86",
          t: "#d98a90",
          S: "#cf7f86",
          n: "#9e5a60",
          e: "#33272a",
          H: "#7a5256",
        }}
        pixel={block}
        className="pixelated"
      />
    </motion.div>
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
const CHK_LEGS = [
  ["....y.y.....", "...y...y...."],
  ["...y.y......", "..y...y....."],
];

export function Chicken({ block = 7, className }: { block?: number; className?: string }) {
  const active = useActive();
  const step = useStep(160, active);
  return (
    <motion.div
      className={className}
      animate={active ? { y: [0, -1.5, 0] } : false}
      transition={{ repeat: Infinity, duration: 0.38, ease: "easeInOut" }}
    >
      <PixelArt
        rows={[...CHK_BODY, ...CHK_LEGS[step ? 1 : 0]]}
        palette={{ W: "#f4f4f4", R: "#d6402f", w: "#c0392b", b: "#f0a92e", t: "#dcdcdc", y: "#e0902a", e: "#2e2622" }}
        pixel={block}
        className="pixelated"
      />
    </motion.div>
  );
}

// A bee buzzing along a looping path across the sky.
export function Bee({ className }: { className?: string }) {
  const active = useActive();
  return (
    <motion.div
      className={className}
      animate={active ? { x: [0, 60, 20, 90, 0], y: [0, -18, 8, -10, 0] } : false}
      transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
    >
      <motion.div
        animate={active ? { y: [0, -3, 0] } : false}
        transition={{ repeat: Infinity, duration: 0.5, ease: "easeInOut" }}
      >
        <PixelArt
          rows={["w...w", ".yby.", "w...w"]}
          palette={{ w: "#ffffff", y: "#f4c20d", b: "#1a1a1a" }}
          pixel={3}
          className="pixelated"
        />
      </motion.div>
    </motion.div>
  );
}

// Leaves carried on the wind: little oak-green flecks drifting across the sky,
// fluttering and spinning, for ambient life. Fixed params (no randomness).
const LEAF_COLORS = ["#6aa531", "#5b9329", "#7bb83e"];
const LEAVES = Array.from({ length: 14 }, (_, i) => ({
  top: 8 + ((i * 9) % 52),
  left: (i * 17) % 95,
  size: 6 + (i % 3) * 2,
  dur: 7 + (i % 5) * 1.5,
  delay: (i % 7) * 1.1,
  drift: 160 + (i % 4) * 80,
  dir: i % 2 ? 1 : -1,
  color: LEAF_COLORS[i % 3],
}));

export function Leaves({ className }: { className?: string }) {
  const active = useActive();
  return (
    <div className={className} aria-hidden>
      {LEAVES.map((l, i) => (
        <motion.span
          key={i}
          className="pixelated absolute"
          style={{ top: `${l.top}%`, left: `${l.left}%`, width: l.size, height: l.size, background: l.color }}
          animate={
            active
              ? {
                  x: [0, l.drift * 0.3, l.drift * 0.7, l.drift],
                  y: [0, 16, 6, 42],
                  rotate: [0, l.dir * 140, l.dir * 280, l.dir * 400],
                  opacity: [0, 1, 1, 0],
                }
              : false
          }
          transition={{
            duration: l.dur,
            times: [0, 0.15, 0.7, 1],
            repeat: Infinity,
            delay: l.delay,
            ease: "easeInOut",
          }}
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
    <motion.div
      className={className}
      style={{ transformOrigin: "bottom center", ...style }}
      animate={{ rotate: [-2, 2, -2] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
    >
      <TexProp tex="bush" size={size} />
    </motion.div>
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
export function Birds({ className }: { className?: string }) {
  const active = useActive();
  const step = useStep(200, active);
  const rows = step ? ["w...w", ".w.w."] : [".w.w.", "..w.."];
  return (
    <motion.div
      className={className}
      animate={active ? { x: ["-12vw", "112vw"] } : false}
      transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
      aria-hidden
    >
      {FLOCK.map((b, i) => (
        <div key={i} className="absolute" style={{ left: b.x, top: b.y }}>
          <PixelArt rows={rows} palette={{ w: "#46535e" }} pixel={3} className="pixelated" />
        </div>
      ))}
    </motion.div>
  );
}

// Snow drifting down off the peaks — faint white flecks.
const SNOW = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 13 + 6) % 100,
  size: 2 + (i % 2),
  dur: 6 + (i % 5),
  delay: (i % 6) * 0.8,
  drift: (i % 3) - 1,
}));
export function SnowFall({ className }: { className?: string }) {
  const active = useActive();
  return (
    <div className={className} aria-hidden>
      {SNOW.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-white/80"
          style={{ left: `${s.left}%`, top: 0, width: s.size, height: s.size }}
          animate={active ? { y: [0, 170], x: [0, s.drift * 22], opacity: [0, 0.85, 0] } : false}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}
