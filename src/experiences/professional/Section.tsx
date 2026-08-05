import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  /** Small uppercase label above the title — the scannable anchor. */
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/**
 * One band of the single-page scroll. Owns the vertical rhythm and the
 * heading pattern so every section reads the same and the page has one voice.
 *
 * `scroll-mt` keeps the heading clear of the sticky navbar when you land here
 * from an anchor link.
 */
export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-t border-border py-16 sm:py-24",
        className,
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-10"
      >
        <header className="flex flex-col gap-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
        </header>

        {children}
      </motion.div>
    </section>
  );
}
