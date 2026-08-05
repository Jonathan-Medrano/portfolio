import { profile, learning } from "@/data";
import SkillsGrid from "@/components/skills/SkillsGrid";
import Section from "../Section";

export default function StackSection() {
  return (
    <Section id="stack" eyebrow="Sobre mí" title="Cómo trabajo">
      <div className="flex flex-col gap-12">
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {profile.bio}
        </p>

        <div className="flex flex-col gap-5">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Tecnologías con las que trabajé
          </h3>
          <SkillsGrid variant="pro" />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Estudiando ahora
          </h3>
          <ul className="flex flex-wrap gap-2">
            {learning.map((topic) => (
              <li
                key={topic}
                className="rounded-md border border-dashed border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
