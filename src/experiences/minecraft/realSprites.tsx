// Real Minecraft sprites built from the texture pack: front-facing characters
// composited from skin UVs, plus item/block sprites used as-is.

type UV = [x: number, y: number, w: number, h: number];
interface Part {
  uv: UV;
  pos: [left: number, top: number];
  /** Optional rotation (deg) — e.g. tilt the head or swing an arm. */
  rotate?: number;
  /** transform-origin for the rotation. Defaults to "center bottom". */
  origin?: string;
  /** Rotation transition duration in ms. Defaults to 500. */
  transitionMs?: number;
  /** Stacking order (higher = in front). */
  z?: number;
}

// Generic skin compositor. UVs are in logical 64-wide skin units, so it works
// regardless of the source PNG resolution (the pack is HD/256px).
function SkinSprite({
  src,
  sheet,
  figure,
  parts,
  unit,
  className,
}: {
  src: string;
  sheet: [number, number];
  figure: [number, number];
  parts: Part[];
  unit: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{ position: "relative", width: figure[0] * unit, height: figure[1] * unit }}
    >
      {parts.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.pos[0] * unit,
            top: p.pos[1] * unit,
            width: p.uv[2] * unit,
            height: p.uv[3] * unit,
            backgroundImage: `url(${src})`,
            backgroundSize: `${sheet[0] * unit}px ${sheet[1] * unit}px`,
            backgroundPosition: `${-p.uv[0] * unit}px ${-p.uv[1] * unit}px`,
            backgroundRepeat: "no-repeat",
            imageRendering: "pixelated",
            transform: p.rotate ? `rotate(${p.rotate}deg)` : undefined,
            transformOrigin: p.origin ?? "center bottom",
            transition: `transform ${p.transitionMs ?? 500}ms ease-out`,
            zIndex: p.z,
          }}
        />
      ))}
    </div>
  );
}

// Front view of a wide player skin (head, body, both arms, both legs + hat).
const PLAYER_PARTS_FRONT: Part[] = [
  { uv: [44, 20, 4, 12], pos: [0, 8] }, // right arm
  { uv: [36, 52, 4, 12], pos: [12, 8] }, // left arm
  { uv: [4, 20, 4, 12], pos: [4, 20] }, // right leg
  { uv: [20, 52, 4, 12], pos: [8, 20] }, // left leg
  { uv: [20, 20, 8, 12], pos: [4, 8] }, // body
  { uv: [8, 8, 8, 8], pos: [4, 0] }, // head
  { uv: [40, 8, 8, 8], pos: [4, 0] }, // hat overlay
];

// Back view: rear UVs of each part, and left/right placements swapped so the
// figure reads as facing away from us (the miner's perspective).
const PLAYER_PARTS_BACK: Part[] = [
  { uv: [52, 20, 4, 12], pos: [12, 8] }, // right arm (now on viewer's right)
  { uv: [44, 52, 4, 12], pos: [0, 8] }, // left arm
  { uv: [12, 20, 4, 12], pos: [8, 20] }, // right leg
  { uv: [28, 52, 4, 12], pos: [4, 20] }, // left leg
  { uv: [32, 20, 8, 12], pos: [4, 8] }, // body (back)
  { uv: [24, 8, 8, 8], pos: [4, 0] }, // head (back of skull)
  { uv: [56, 8, 8, 8], pos: [4, 0] }, // hat overlay (back)
];

export function SteveCharacter({
  unit = 4,
  facing = "front",
  lookUp = false,
  armAngle = 0,
  className,
}: {
  unit?: number;
  facing?: "front" | "back";
  /** Tilt the head back, as if gazing upward. */
  lookUp?: boolean;
  /** Right-arm rotation in degrees (0 = resting down, ~140 = raised overhead). */
  armAngle?: number;
  className?: string;
}) {
  const base = facing === "back" ? PLAYER_PARTS_BACK : PLAYER_PARTS_FRONT;
  // Index 0 is the right arm; head/hat sit at the top (pos.top === 0); the body
  // is the 8-wide part at the torso.
  const parts = base.map((p, idx) => {
    let np = p;
    const isHead = p.pos[1] === 0;
    const isBody = p.uv[2] === 8 && p.pos[1] === 8;
    if (lookUp && isHead) np = { ...np, rotate: -18 };
    if (armAngle) {
      // Raise the right arm overhead, pivoting at the shoulder. Sandwich the z:
      // arm IN FRONT of the torso (so it stays attached) but BEHIND the head
      // (so it never covers the face).
      if (idx === 0) np = { ...np, rotate: armAngle, origin: "100% 0%", transitionMs: 150, z: 2 };
      else if (isBody) np = { ...np, z: 1 };
      else if (isHead) np = { ...np, z: 3 };
    }
    return np;
  });

  return (
    <SkinSprite
      src="/textures/mc/steve.png"
      sheet={[64, 64]}
      figure={[16, 32]}
      parts={parts}
      unit={unit}
      className={className}
    />
  );
}

// Front view of a creeper (head, body, two front legs).
const CREEPER_PARTS: Part[] = [
  { uv: [4, 18, 4, 6], pos: [4, 20] }, // front-left leg
  { uv: [4, 18, 4, 6], pos: [8, 20] }, // front-right leg
  { uv: [20, 20, 8, 12], pos: [4, 8] }, // body
  { uv: [8, 8, 8, 8], pos: [4, 0] }, // head (face)
];

export function CreeperCharacter({
  unit = 4,
  className,
}: {
  unit?: number;
  className?: string;
}) {
  return (
    <SkinSprite
      src="/textures/mc/creeper.png"
      sheet={[64, 32]}
      figure={[16, 26]}
      parts={CREEPER_PARTS}
      unit={unit}
      className={className}
    />
  );
}

// Ready-made 3/4 creeper render (PNG/WebP with transparency).
export function CreeperRender({
  height = 170,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <img
      src="/textures/mc/creeper_render.webp"
      alt=""
      draggable={false}
      className={className}
      style={{ height, width: "auto", imageRendering: "pixelated" }}
    />
  );
}

// A flat texture sprite (item or block icon) shown as-is, crisp.
function TextureSprite({
  src,
  size,
  className,
}: {
  src: string;
  size: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        imageRendering: "pixelated",
      }}
    />
  );
}

export function PickaxeSprite({ size = 44, className }: { size?: number; className?: string }) {
  return <TextureSprite src="/textures/mc/pickaxe.png" size={size} className={className} />;
}

export function TorchSprite({ size = 30, className }: { size?: number; className?: string }) {
  return <TextureSprite src="/textures/mc/torch.png" size={size} className={className} />;
}
