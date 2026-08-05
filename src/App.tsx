import { AnimatePresence, motion } from "motion/react";
import { useMode } from "@/context/ModeContext";
import ProfessionalExperience from "@/experiences/professional/ProfessionalExperience";
import MinecraftExperience from "@/experiences/minecraft/MinecraftExperience";

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
          <MinecraftExperience />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
