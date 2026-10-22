import { motion, type Variants } from "motion/react";
import { skills, type SkillCategory } from "@/data";
import { skillIcons } from "./skillIcons";

// Two tiers on purpose. A wall of 30 equal cards reads as "touched everything,
// knows little"; a short main stack, then the rest in a lower register, reads
// as depth first and range second.

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

const GROUPS: Array<{ label: string; categories: SkillCategory[] }> = [
  { label: "Lenguajes", categories: ["language"] },
  { label: "Frontend", categories: ["frontend"] },
  { label: "Backend y datos", categories: ["backend"] },
  { label: "IA e integraciones", categories: ["ai", "integration"] },
  { label: "Herramientas", categories: ["tooling"] },
];

export default function SkillsGrid() {
  const core = skills.filter((skill) => skill.core);
  const extra = skills.filter((skill) => !skill.core);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h4 className="font-heading text-lg font-semibold">Stack principal</h4>
        <p className="-mt-2 max-w-xl text-sm text-pretty text-muted-foreground">
          Lo que uso todos los días, en el trabajo y en mis proyectos.
        </p>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {core.map((skill) => {
            const entry = skillIcons[skill.icon];
            const Icon = entry?.Icon;
            return (
              <motion.li
                key={skill.name}
                variants={card}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-2.5 rounded-lg border border-border bg-card p-5 text-center transition-colors hover:border-foreground/30"
              >
                {Icon ? (
                  <Icon
                    className="size-9"
                    style={{ color: entry.color }}
                    aria-hidden
                  />
                ) : (
                  <span className="grid size-9 place-items-center text-lg font-bold">
                    {skill.name.charAt(0)}
                  </span>
                )}
                <span className="text-sm font-medium text-foreground">
                  {skill.name}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      <div className="flex flex-col gap-5 border-t border-border pt-8">
        <div className="flex flex-col gap-1">
          <h4 className="font-heading text-lg font-semibold">
            También usé, sobre todo en proyectos propios
          </h4>
          <p className="max-w-xl text-sm text-pretty text-muted-foreground">
            Herramientas que elegí para cada proyecto o experimento, no mi
            stack del día a día.
          </p>
        </div>
        <dl className="flex flex-col gap-3">
          {GROUPS.map((group) => {
            const items = extra.filter((skill) =>
              group.categories.includes(skill.category),
            );
            if (items.length === 0) return null;
            return (
              <div
                key={group.label}
                className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4"
              >
                <dt className="w-40 shrink-0 text-xs tracking-wider text-muted-foreground uppercase">
                  {group.label}
                </dt>
                <dd>
                  <ul className="flex flex-wrap gap-1.5">
                    {items.map((skill) => (
                      <li
                        key={skill.name}
                        className="rounded-md border border-border px-2.5 py-1 text-sm text-muted-foreground"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
