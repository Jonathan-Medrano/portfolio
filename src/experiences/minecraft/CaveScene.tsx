import type { CSSProperties } from "react";
import BlockWorld from "./BlockWorld";
import MiningSteve from "./MiningSteve";
import { TorchSprite } from "./realSprites";

// A 2D Minecraft cross-section. Solid blocks form the terrain; the carved-out
// air in the middle is the cave, where Steve stands on a cobblestone ledge and
// mines. Lava and an amethyst geode glow in the deeper pocket below.
//
// 28 columns wide, and every row MUST be exactly that. BlockWorld sizes the
// grid off the longest row, so a row one character short renders a column of
// transparent air at the end — which showed up as a black stripe down the right
// edge for months. BlockWorld now throws in dev if the rows disagree.
// ' ' = air (cave). See BlockWorld LEGEND for the rest.
const CAVE_MAP = [
  "ssssssssssssssssssssssssssss",
  "ssssssssssssssssssssssssssss",
  "ssssssssssssssssssssssssssss",
  "sssCsssssssssssssssIssssssss",
  "ssssssss    s       ssRsooss",
  "sDssssss            ssssssss",
  "sssssss              ssussss",
  "ssssss                ssssss",
  "sssss                 ssssss",
  "ssscccccccccccccccccccccssss",
  "pppppppppppppppppppppppppppp",
  "ppCpppppppoppppppppppppRpppp",
  "ppppppppp          ppppppppp",
  "ppWppppp  AAAA  pp   VVVV pp",
  "ppWpppppp AAAA pppp  VVVV pp",
  "bbbbbbbbbbbbbbbbbbbbbbbbbbbb",
];

// Torch mounted on a cave wall, with a flickering warm light pool.
function WallTorch({ style }: { style?: CSSProperties }) {
  return (
    <div className="pointer-events-none absolute" style={style}>
      <div
        className="mc-gutter absolute -inset-10 rounded-full bg-orange-400/30 blur-2xl"
        style={{ "--mc-dur": "700ms" } as CSSProperties}
      />
      <TorchSprite size={32} className="relative" />
    </div>
  );
}

// Dust hanging in the torchlight. Rises rather than falls, hence the negative
// travel — same keyframe as the snow up on the peaks.
const MOTES = [0, 1, 2, 3, 4, 5].map((i) => ({
  left: `${18 + i * 12}%`,
  top: `${30 + (i % 3) * 12}%`,
  dur: 4000 + i * 1000,
  delay: i * 600,
}));

export default function CaveScene() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Dark cave air showing behind the carved-out blocks. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,#1b1b24_0%,#0a0a10_60%,#050507_100%)]" />

      {/* The block terrain.
          Blocks are square, so a full-width grid shrinks with the viewport: at
          390px each block is 13px and the whole cave collapses into a 215px
          strip that Steve (a fixed 256px tall) then overflows, landing on top
          of the title. Minecraft doesn't scale blocks down on a small screen —
          it shows fewer of them. So we floor the grid width and let the parent
          crop the edges, keeping the blocks readable and the scene tall. */}
      <div className="relative z-10 flex justify-center">
        <BlockWorld map={CAVE_MAP} className="w-[max(100%,760px)] shrink-0" />
      </div>

      {/* Descent fade: the stone emerges out of darkness at the top, so the
          jump from the surface reads as going underground rather than a hard cut. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-44 bg-gradient-to-b from-[#050507] via-[#050507]/85 to-transparent" />

      {/* Warm light pooling around Steve from the torches. */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_46%,rgba(255,170,80,0.16)_0%,transparent_38%)]" />

      {/* Torches flanking the cavern. */}
      <WallTorch style={{ left: "24%", bottom: "50%", zIndex: 20 }} />
      <WallTorch style={{ right: "25%", bottom: "52%", zIndex: 20 }} />

      {/* Floating dust motes for atmosphere. */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="mc-fall pointer-events-none absolute z-20 size-1 rounded-full bg-amber-200/50"
          style={{
            left: m.left,
            top: m.top,
            "--mc-fall": "-14px",
            "--mc-peak": 0.7,
            "--mc-dur": `${m.dur}ms`,
            "--mc-delay": `${m.delay}ms`,
          } as CSSProperties}
        />
      ))}

      {/* Steve mining on the cobblestone ledge inside the cave.
          MiningSteve is a fixed 256px tall while the scene around it is sized
          in blocks, so on a narrow screen he outgrew the cave and his pickaxe
          landed on the title. Scale him with the scene (origin at his feet, so
          he stays planted on the ledge) until there's room for full size. */}
      <div className="absolute bottom-[44%] left-1/2 z-30 w-full max-w-xl origin-bottom -translate-x-1/2 scale-[0.62] lg:scale-100">
        <MiningSteve />
      </div>

      {/* Title. */}
      <div className="absolute inset-x-0 top-6 z-30 text-center">
        <h2 className="font-mc mc-title text-lg leading-relaxed sm:text-2xl">
          Las Cuevas
        </h2>
        <p className="mt-3 text-xs tracking-widest text-amber-200/70 uppercase">
          Cavando entre la roca
        </p>
      </div>
    </div>
  );
}
