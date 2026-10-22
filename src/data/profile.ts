import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jonathan Medrano",
  // "con foco en Front-end" is not modesty, it's aim. Selling an even
  // full-stack profile invites a backend systems-design round that the
  // frontend work doesn't back up yet — and it still matches every
  // full-stack search.
  role: "Desarrollador Full Stack con foco en Front-end",
  tagline:
    "Construyo productos web de punta a punta: del esquema de la base al pixel del front.",
  // Numbers over adjectives, and no claim that a reference check could
  // contradict: the migration is led in practice, not on an org chart, so what
  // is stated is what was actually done and reviewed.
  bio: "Desarrollador full stack con foco en front-end. Entré a Trizap en enero de 2025 y desde entonces lidero la migración de un ERP de facturación electrónica desde ASP.NET MVC 5 hacia React + TypeScript, desarrollando también los endpoints .NET que esa migración necesita. Desarrollo distintos sistemas con ayuda de inteligencia artificial para agilizar el trabajo y mejorar el rendimiento del equipo, y construí las herramientas internas que usa: un runner de tests E2E que QA opera sin escribir código y un tablero de work items para el PM. En paralelo construyo mis propios proyectos de portfolio de punta a punta —uno con cobros por Mercado Pago, stock a prueba de sobreventa y control de acceso por QR— para practicar sistemas reales. Me obsesionan las bases —arquitectura en capas, validación en servidor, contratos tipados— y uso la IA como herramienta de ingeniería, sin delegarle el entendimiento del código.",
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
