import type { ReactNode } from "react";
import { useActiveRef, stillProps } from "./active";

// Section shell for the underground chapter. The cinematic depth lives in
// CaveScene (the hero); this just provides the dark rock backdrop the hero and
// the content panels (crafting, projects, inventory) sit on, so everything reads
// as one continuous cavern.
export default function Cavern({ children }: { children: ReactNode }) {
  // The cavern is the one chapter that can't use `.cv-section`: its height is
  // content-driven, so there is no honest intrinsic size to promise and a wrong
  // guess makes the scrollbar jump. It parks its animations instead — the lava
  // pool and the amethyst geode are 16 blocks running `filter: brightness` loops
  // forever, and those kept burning while the visitor was reading the Nether.
  const [ref, active] = useActiveRef();

  return (
    <section ref={ref} {...stillProps(active)} className="relative overflow-hidden">
      {/* Deep rock backdrop behind the whole chapter. */}
      <div
        className="tex absolute inset-0"
        style={{ backgroundImage: "url(/textures/mc/deepslate.png)", backgroundSize: "56px 56px" }}
      />
      <div className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,rgba(3,4,10,0.45)_0%,rgba(3,4,10,0.88)_70%,rgba(3,4,10,0.95)_100%)]" />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
