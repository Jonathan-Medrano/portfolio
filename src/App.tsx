import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useMode } from "@/context/ModeContext";
import ProfessionalExperience from "@/experiences/professional/ProfessionalExperience";

// The Minecraft world is the bigger of the two — sprite maps, terrain generators,
// the whole block system — and it's the one a visitor opts into. Loading it
// eagerly meant every recruiter who only ever saw the professional CV still paid
// to download the caves. It arrives on the mode switch instead.
const MinecraftExperience = lazy(
  () => import("@/experiences/minecraft/MinecraftExperience"),
);

// App is just the switch between worlds. Each experience owns its own
// chrome (navbar / world) and reads from the shared data layer.
function App() {
  const { mode } = useMode();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {mode === "professional" ? (
          <ProfessionalExperience />
        ) : (
          // The cross-fade is already covering the swap, so the fallback only has
          // to hold the viewport open and not flash white against the caves.
          <Suspense fallback={<div className="min-h-dvh bg-[#050507]" />}>
            <MinecraftExperience />
          </Suspense>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
