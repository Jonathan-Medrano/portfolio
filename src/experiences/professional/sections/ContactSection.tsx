import { Download } from "lucide-react";
import { profile } from "@/data";
import { Button } from "@/components/ui/button";
import Section from "../Section";
import { socialIcons } from "../socialIcons";

export default function ContactSection() {
  return (
    <Section id="contacto" eyebrow="Hablemos" title="Contacto">
      <div className="flex flex-col gap-8">
        <p className="max-w-2xl text-lg text-pretty text-muted-foreground">
          Estoy abierto a oportunidades remotas. Si tenés una posición, un
          proyecto o una consulta técnica, escribime — respondo todos los
          mensajes.
        </p>

        <div className="flex flex-wrap gap-3">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.kind];
            return (
              <Button key={social.kind} asChild size="lg" variant="outline">
                <a
                  href={social.url}
                  target={social.kind === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                >
                  <Icon aria-hidden />
                  {social.label}
                </a>
              </Button>
            );
          })}
          <Button asChild size="lg" variant="ghost">
            <a href={profile.cvUrl} download>
              <Download aria-hidden />
              Descargar CV
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
