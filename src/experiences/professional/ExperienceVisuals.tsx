import {
  ArrowRight,
  ArrowRightLeft,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import type { ExperienceVisuals as Visuals } from "@/data";

/**
 * What the bullets say, drawn. No figures: the claim is what the work is and
 * how it's done, in a form a reader takes in at a glance.
 */
export default function ExperienceVisuals({ visuals }: { visuals: Visuals }) {
  const { migration, ai, systems } = visuals;

  return (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <section
        aria-label="Migración del ERP"
        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
      >
        <h4 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <ArrowRightLeft className="size-3.5" aria-hidden />
          Migración del ERP
        </h4>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-heading text-lg font-semibold">
          <span>{migration.from}</span>
          <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
          <span>{migration.to}</span>
        </p>
        <ul className="flex flex-wrap gap-1.5">
          {migration.areas.map((area) => (
            <li
              key={area}
              className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {area}
            </li>
          ))}
        </ul>
        <p className="text-sm text-pretty text-muted-foreground">
          {migration.note}
        </p>
      </section>

      <section
        aria-label="Desarrollo con inteligencia artificial"
        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5"
      >
        <h4 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <Sparkles className="size-3.5" aria-hidden />
          {ai.title}
        </h4>
        <ul className="flex flex-col gap-2">
          {ai.items.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm">
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground"
                aria-hidden
              />
              <span className="text-pretty">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-pretty text-muted-foreground">{ai.note}</p>
      </section>

      <section
        aria-label="Sistemas propios"
        className="flex flex-col gap-4 rounded-lg border border-border bg-card p-5 md:col-span-2"
      >
        <h4 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <LayoutDashboard className="size-3.5" aria-hidden />
          {systems.title}
        </h4>
        <p className="text-sm text-muted-foreground">Por ejemplo:</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {systems.examples.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-3 rounded-md border border-border bg-muted/40 px-4 py-3"
            >
              <span className="font-heading text-base font-semibold">
                {item.name}
              </span>
              <span className="text-sm text-pretty text-muted-foreground">
                {item.what}
              </span>
              {item.steps && (
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                  {item.steps.map((step, index) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium">
                        {step}
                      </span>
                      {index < item.steps!.length - 1 && (
                        <ArrowRight
                          className="size-3 text-muted-foreground"
                          aria-hidden
                        />
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
