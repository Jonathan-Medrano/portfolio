import { profile } from "@/data";
import SkillsGrid from "@/components/skills/SkillsGrid";
import Section from "../Section";

export default function StackSection() {
  return (
    <Section id="stack" eyebrow="Sobre mí" title="Cómo trabajo">
      <div className="flex flex-col gap-12">
        <p className="max-w-3xl text-lg leading-relaxed text-pretty text-muted-foreground">
          {profile.bio}
        </p>

        <SkillsGrid />

        <p className="max-w-3xl border-l-2 border-border pl-4 text-pretty text-muted-foreground">
          En constante aprendizaje y mejora: cada proyecto y cada problema
          nuevo es una oportunidad para entender algo mejor y hacerlo mejor la
          próxima vez.
        </p>
      </div>
    </Section>
  );
}
