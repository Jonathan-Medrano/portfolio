import { motion, type Variants } from "motion/react";
import { skills } from "@/data";
import { cn } from "@/lib/utils";
import { skillIcons } from "./skillIcons";

type Variant = "pro" | "mc";

// Staggered reveal: the container orchestrates, each card animates in turn.
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const card: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
};

export default function SkillsGrid({ variant = "pro" }: { variant?: Variant }) {
  const isMc = variant === "mc";

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
    >
      {skills.map((skill) => {
        const entry = skillIcons[skill.icon];
        const Icon = entry?.Icon;

        return (
          <motion.li
            key={skill.name}
            variants={card}
            whileHover={isMc ? { y: -2 } : { y: -4 }}
            className={cn(
              "flex flex-col items-center gap-2 p-4 text-center transition-colors",
              isMc
                ? "mc-slot"
                : "rounded-lg border border-border bg-card hover:border-foreground/30",
            )}
          >
            {Icon ? (
              <Icon
                className="size-8"
                style={{ color: entry.color }}
                aria-hidden
              />
            ) : (
              <span className="grid size-8 place-items-center text-lg font-bold">
                {skill.name.charAt(0)}
              </span>
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isMc
                  ? "text-[#f5f5f5] [text-shadow:1px_1px_0_rgba(0,0,0,0.6)]"
                  : "text-foreground",
              )}
            >
              {skill.name}
            </span>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
