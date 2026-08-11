import ProNavbar from "./ProNavbar";
import Hero from "./sections/Hero";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import StackSection from "./sections/StackSection";
import ContactSection from "./sections/ContactSection";
import { profile } from "@/data";

// The clean, professional portfolio: a single vertical scroll.
//
// Why one page instead of four routes: a recruiter scans, they don't browse.
// Every click is a place to lose them, and the content here fits comfortably
// in one read.
export default function ProfessionalExperience() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ProNavbar />

      <main className="mx-auto max-w-5xl px-6">
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <StackSection />
        <ContactSection />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-8 text-sm text-muted-foreground">
          <p>
            {profile.name} · {profile.location}
          </p>
          <p>Hecho con React, TypeScript y Tailwind.</p>
        </div>
      </footer>
    </div>
  );
}
