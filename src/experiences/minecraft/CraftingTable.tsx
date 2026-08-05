import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { skills, learning } from "@/data";
import { skillIcons } from "@/components/skills/skillIcons";
import PixelArt from "./PixelArt";
import { EnchantedBook } from "./sprites";

// Nine known skills go into the 3x3 grid; the result is "something new" you're
// learning. The metaphor: I'm always combining what I know to craft what's next.
const gridSkills = skills.slice(0, 9);

const arrowRows = ["..K..", "..KK.", "KKKKK", "..KK.", "..K.."];

export default function CraftingTable() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % learning.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      <h3 className="font-mc text-center text-base leading-relaxed mc-title sm:text-lg">
        Mesa de Crafteo — Siempre aprendiendo
      </h3>

      <div className="mc-panel flex flex-wrap items-center justify-center gap-5 p-6">
        {/* 3x3 ingredients: what I already know. */}
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, idx) => {
            const skill = gridSkills[idx];
            const Icon = skill ? skillIcons[skill.icon]?.Icon : undefined;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="mc-slot grid size-12 place-items-center"
              >
                {Icon && (
                  <Icon
                    className="size-6"
                    style={{ color: skillIcons[skill!.icon].color }}
                    aria-hidden
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Arrow. */}
        <PixelArt
          rows={arrowRows}
          palette={{ K: "#d8d8d8" }}
          pixel={6}
          className="pixelated"
        />

        {/* Result: a glowing enchanted book = new knowledge. */}
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="mc-slot grid size-16 place-items-center"
            animate={{
              boxShadow: [
                "0 0 0px rgba(170,120,255,0.0)",
                "0 0 18px rgba(170,120,255,0.8)",
                "0 0 0px rgba(170,120,255,0.0)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.6 }}
            >
              <EnchantedBook pixel={6} />
            </motion.div>
          </motion.div>

          <div className="h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={learning[i]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="block text-xs font-semibold text-purple-200"
              >
                {learning[i]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
