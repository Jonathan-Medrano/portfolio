import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme";
import { profile } from "@/data";
import { useActiveSection } from "./useActiveSection";

const links = [
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "stack", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

const SECTION_IDS = ["inicio", ...links.map((link) => link.id)];

export default function ProNavbar() {
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
        <a
          href="#inicio"
          className="font-heading text-base font-bold whitespace-nowrap sm:text-lg"
        >
          {profile.name}
        </a>

        {/* Hidden below md: at 390px these four links do not fit next to the
            name. The page is one scroll — the links are a shortcut, not the
            only way to reach a section. */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-current={active === link.id ? "true" : undefined}
                className={cn(
                  "text-sm text-muted-foreground transition-colors hover:text-foreground",
                  active === link.id && "font-medium text-foreground",
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={toggle}
          aria-label={
            theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
          }
          className="grid size-9 shrink-0 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun className="size-4" aria-hidden />
          ) : (
            <Moon className="size-4" aria-hidden />
          )}
        </button>
      </nav>
    </header>
  );
}
