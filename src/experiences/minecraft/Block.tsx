// A single textured Minecraft block face, with a cube-edge bevel
// (light top-left, dark bottom-right) so it reads as 3D.
export default function Block({
  tex,
  size = 48,
  className,
}: {
  tex: string;
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(/textures/mc/${tex}.png)`,
        backgroundSize: `${size}px ${size}px`,
        boxShadow:
          "inset 2px 2px 0 rgba(255,255,255,0.12), inset -3px -3px 0 rgba(0,0,0,0.35)",
      }}
    />
  );
}
