import { motion } from "motion/react";
import { projects } from "@/data";
import SkillsGrid from "@/components/skills/SkillsGrid";
import Cavern from "../Cavern";
import CaveScene from "../CaveScene";
import CraftingTable from "../CraftingTable";

// Underground: a living cavern. The CaveScene hero sets the stage (Steve mining
// inside a real cave), then the content panels — crafting, projects, inventory —
// sit on the same rock backdrop below.
export default function Caves() {
  return (
    <Cavern>
      <CaveScene />

      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 pt-12 pb-24">
        <CraftingTable />

        {/* Projects, as signs hammered into the rock. */}
        <div className="flex flex-col gap-6">
        <h3 className="font-mc text-center text-base leading-relaxed mc-title sm:text-lg">
          Proyectos
        </h3>
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="mc-panel flex flex-col gap-3 p-5"
            >
              <h4 className="font-mc text-xs leading-relaxed text-[#2f2f2f]">
                {project.title}
              </h4>
              <p className="text-sm text-[#3f3f3f]">{project.summary}</p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="mc-slot px-2 py-0.5 text-[11px] text-[#f0f0f0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Inventory of tech. */}
      <div className="flex flex-col gap-6">
        <h3 className="font-mc text-center text-base leading-relaxed mc-title sm:text-lg">
          Inventario — Tecnologías
        </h3>
        <div className="mc-panel p-5">
          <SkillsGrid variant="mc" />
        </div>
        </div>
      </div>
    </Cavern>
  );
}
