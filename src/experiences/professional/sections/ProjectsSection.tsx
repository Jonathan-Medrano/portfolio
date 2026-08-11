import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { lab, projects, type Project } from "@/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Section from "../Section";
import StatusBadge from "../StatusBadge";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const featured = project.featured === true;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: Math.min(index, 3) * 0.08 }}
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/25",
        featured && "sm:col-span-2 sm:p-8",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3
          className={cn(
            "font-heading font-semibold",
            featured ? "text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {project.title}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-pretty text-muted-foreground">{project.description}</p>

      {/* The decisions. This is the part that survives an interview. */}
      <ul
        className={cn(
          "flex flex-col gap-2.5 border-t border-border pt-4",
          featured && "sm:grid sm:grid-cols-2 sm:gap-x-8",
        )}
      >
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5">
            <span
              className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
              aria-hidden
            />
            <span className="text-sm leading-relaxed text-pretty">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {project.links.map((link) => (
            <Button key={link.url} asChild size="sm" variant="outline">
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
                <ArrowUpRight aria-hidden />
              </a>
            </Button>
          ))}
        </div>
      )}
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <Section
      id="proyectos"
      eyebrow="Lo que construí"
      title="Proyectos propios"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* The lab. Deliberately quieter than the cards above: same page, less
          weight. The heading does the framing — these are experiments that
          ended, not products that stalled. */}
      <div className="mt-14 border-t border-border pt-10">
        <h3 className="font-heading text-xl font-semibold">Laboratorio</h3>
        <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
          Cosas que construí para entender cómo funcionan por dentro. No son
          productos: son experimentos terminados, y cada uno dejó algo.
        </p>

        <ul className="mt-8 flex flex-col gap-6">
          {lab.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 border-l-2 border-border pl-4"
            >
              <h4 className="font-heading font-semibold">{item.title}</h4>
              <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                {item.summary}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {item.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
