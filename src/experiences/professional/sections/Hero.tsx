import { motion } from "motion/react";
import { Download, MapPin } from "lucide-react";
import {
  profile,
  experience,
  skills,
} from "@/data";
import { skillIcons } from "@/components/skills/skillIcons";
import { Button } from "@/components/ui/button";

// Above the fold. A recruiter decides here whether to keep scrolling, so this
// has to answer three questions without a click: who are you, what do you do,
// and is there proof.
//
// Beside the text, on wide screens, sits a "Hoy" card: what you're working on,
// what you're studying, and the stack. It answers "what
// is this person doing right now?" without making any single project the
// face of the page. Skipped on phones, where it would push the name and the
// buttons below the fold.
const HERO_STACK = ["React", "TypeScript", "Node.js", "C#", "SQL", "Git"];

export default function Hero() {
  const current = experience.find((job) => job.current) ?? experience[0];
  const stackIcons = HERO_STACK.flatMap((name) => {
    const skill = skills.find((item) => item.name === name);
    const entry = skill ? skillIcons[skill.icon] : undefined;
    return entry ? [{ name, Icon: entry.Icon, color: entry.color }] : [];
  });


  return (
    <section
      id="inicio"
      className="grid items-center gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:py-14"
    >
      <div className="flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              {profile.role}
            </p>
            <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className="size-1.5 rounded-full bg-emerald-500"
                aria-hidden
              />
              {profile.availability}
            </p>
          </div>

          <h1 className="font-heading text-5xl leading-[1.05] font-bold text-balance sm:text-6xl xl:text-7xl">
            {profile.name}
          </h1>

          <p className="max-w-xl text-lg text-pretty text-muted-foreground sm:text-xl">
            {profile.tagline}
          </p>

          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5" aria-hidden />
            {profile.location}
          </p>
        </motion.div>

        {/* Stacked and full width on phones so the three buttons line up;
            side by side from `sm`. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#proyectos">Ver proyectos</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
          >
            <a href={profile.cvUrl} download>
              <Download aria-hidden />
              Descargar CV
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="w-full sm:w-auto"
          >
            <a href="#contacto">Contacto</a>
          </Button>
        </motion.div>
      </div>

      <motion.aside
        aria-label="Qué hago hoy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden flex-col gap-6 rounded-xl border border-border bg-card p-7 shadow-sm lg:flex"
      >
        <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Hoy
        </h2>

        <dl className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <dt className="text-xs tracking-wider text-muted-foreground uppercase">
              Trabajo en
            </dt>
            <dd className="text-pretty">
              La migración de un ERP de facturación de{" "}
              <span className="font-medium">.NET legacy a React</span>, en{" "}
              {current.company}.
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Con qué trabajo
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {stackIcons.map(({ name, Icon, color }) => (
              <li key={name} className="flex items-center gap-2 text-sm">
                <Icon className="size-5" style={{ color }} aria-hidden />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </section>
  );
}
