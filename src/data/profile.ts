import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jonathan Medrano",
  role: "Desarrollador Full Stack",
  tagline:
    "Construyo productos web de punta a punta: del esquema de la base al pixel del front.",
  // Numbers over adjectives, and no claim that a reference check could
  // contradict: the migration is led in practice, not on an org chart, so what
  // is stated is what was actually done and reviewed.
  bio: "Desarrollador full stack. Desde enero de 2025 lidero en Trizap la migración de un ERP de facturación electrónica desde ASP.NET MVC 5 hacia React + TypeScript, y desarrollo también los endpoints .NET que esa migración necesita. Desarrollo sistemas con ayuda de IA para agilizar el trabajo y el rendimiento del equipo, como el Task Runner y el Control de scripts. En paralelo construyo mis propios proyectos de punta a punta, como Ticketera, con cobros por Mercado Pago, stock a prueba de sobreventa y control de acceso por QR. Me importan las bases —arquitectura en capas, validación en servidor, contratos tipados— y uso la IA como herramienta de ingeniería, sin delegarle el entendimiento del código.",
  location: "San Francisco, Córdoba, Argentina",
  availability: "Trabajando · abierto a oportunidades remotas",
  cvUrl: "/CV-Jonathan-Medrano.pdf",
  socials: [
    {
      kind: "github",
      label: "GitHub",
      url: "https://github.com/Jonathan-Medrano",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jonathan-medrano-705a882b8/",
    },
    {
      kind: "email",
      label: "jonathanmedranoo41@gmail.com",
      url: "mailto:jonathanmedranoo41@gmail.com",
    },
  ],
};
