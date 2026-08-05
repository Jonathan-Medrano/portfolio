import { motion } from "motion/react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile, projects, experience } from "@/data";
import { Button } from "@/components/ui/button";

/**
 * Years of experience, counted from the earliest job's start date.
 *
 * Derived rather than hardcoded so this figure can never contradict the dates
 * printed in the Experiencia section below — anyone who checks the arithmetic
 * lands on the same number, and it stays right without anyone remembering to
 * update it.
 */
function yearsOfExperience(): string {
  const starts = experience
    .map((job) => job.startDate)
    .filter(Boolean)
    .sort();
  if (starts.length === 0) return "—";

  const [year, month] = starts[0].split("-").map(Number);
  const now = new Date();
  const months =
    (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);

  if (months < 12) return `${months} meses`;

  const wholeYears = Math.floor(months / 12);
  const remainder = months % 12;

  // Round to the nearest half-year: "1,5 años" is honest, "~2 años" at 19
  // months is the kind of rounding a recruiter catches.
  if (remainder >= 9) return `casi ${wholeYears + 1} años`;
  if (remainder >= 3) return `${wholeYears},5 años`;
  return wholeYears === 1 ? "1 año" : `${wholeYears} años`;
}

// Above the fold. A recruiter decides here whether to keep scrolling, so this
// has to answer three questions without a click: who are you, what do you do,
// and is there proof.
export default function Hero() {
  const shipped = projects.filter((p) => p.status === "live").length;

  return (
    <section
      id="inicio"
      className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center gap-8 py-16"
    >
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
          <span
            className="hidden h-3 w-px bg-border sm:block"
            aria-hidden
          />
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className="size-1.5 rounded-full bg-emerald-500"
              aria-hidden
            />
            {profile.availability}
          </p>
        </div>

        <h1 className="font-heading text-5xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>

        <p className="max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
          {profile.tagline}
        </p>

        <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden />
          {profile.location}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.12 }}
        className="flex flex-wrap gap-3"
      >
        <Button asChild size="lg">
          <a href="#proyectos">Ver proyectos</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={profile.cvUrl} download>
            <Download aria-hidden />
            Descargar CV
          </a>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <a href="#contacto">Contacto</a>
        </Button>
      </motion.div>

      {/* Proof, not adjectives: numbers a reader can go and verify below. */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.24 }}
        className="flex flex-wrap gap-x-10 gap-y-4 border-t border-border pt-8"
      >
        <div className="flex flex-col gap-1">
          <dt className="text-xs tracking-wider text-muted-foreground uppercase">
            Experiencia
          </dt>
          <dd className="font-heading text-2xl font-bold">
            {yearsOfExperience()}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs tracking-wider text-muted-foreground uppercase">
            Productos propios
          </dt>
          <dd className="font-heading text-2xl font-bold">{projects.length}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-xs tracking-wider text-muted-foreground uppercase">
            En producción
          </dt>
          <dd className="font-heading text-2xl font-bold">{shipped}</dd>
        </div>
      </motion.dl>

      <motion.a
        href="#experiencia"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-4 animate-bounce" aria-hidden />
        Seguí bajando
      </motion.a>
    </section>
  );
}
