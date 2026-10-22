import { experience } from "@/data";
import Section from "../Section";
import ExperienceVisuals from "../ExperienceVisuals";

// Paid work. This section exists because a side project and a job are read
// very differently: someone else signed off on this one.
export default function ExperienceSection() {
  return (
    <Section id="experiencia" eyebrow="Trayectoria" title="Experiencia">
      <ol className="flex flex-col gap-12">
        {experience.map((job) => (
          <li
            key={job.id}
            className="relative flex flex-col gap-5 border-l border-border pl-6 sm:pl-8"
          >
            {/* Timeline node. Filled when it's the current role. */}
            <span
              className={
                job.current
                  ? "absolute top-1.5 -left-[5px] size-2.5 rounded-full bg-foreground"
                  : "absolute top-1.5 -left-[5px] size-2.5 rounded-full border border-border bg-background"
              }
              aria-hidden
            />

            <header className="flex flex-col gap-1.5">
              {/* The separator lives inside the company span so it can never
                  wrap onto a line of its own and dangle there. */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                  {job.role}
                </h3>
                <span className="text-lg text-muted-foreground">
                  <span className="hidden sm:inline">· </span>
                  {job.company}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.period} · {job.location}
              </p>
              <p className="max-w-2xl pt-2 text-pretty text-muted-foreground">
                {job.context}
              </p>
            </header>

            {job.visuals && <ExperienceVisuals visuals={job.visuals} />}

            <ul className="flex max-w-3xl flex-col gap-3">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3 text-pretty">
                  <span
                    className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                    aria-hidden
                  />
                  <span className="text-sm leading-relaxed sm:text-base">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>

            <ul className="flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
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
      </ol>
    </Section>
  );
}
