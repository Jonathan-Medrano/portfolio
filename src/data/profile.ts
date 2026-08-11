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
  bio: "Desarrollador full stack con foco en front-end. Entré a Trizap en enero de 2025 y desde entonces migré 28 de los ~65 módulos de un ERP de facturación electrónica desde ASP.NET MVC 5 hacia React + TypeScript, desarrollando también los endpoints .NET que esa migración necesita. Construí las herramientas internas que usa el equipo: un runner de tests E2E que QA opera sin escribir código y un tablero de work items para el PM. En paralelo desarrollo mis propios SaaS: uno está en producción con un cliente, cobrando con Mercado Pago. Me obsesionan las bases —arquitectura en capas, validación en servidor, contratos tipados— y uso IA como herramienta de ingeniería sin delegarle el entendimiento del código.",
  location: "San Francisco, Córdoba, Argentina",
  availability: "Trabajando · abierto a oportunidades remotas",
  // TODO(bloqueante): exportar el CV v2 a PDF y dejarlo acá. Apunta al v2 a
  // propósito: el v1 que estaba publicado tiene marcadores [COMPLETAR] adentro,
  // y servir un CV con placeholders es peor que no ofrecer descarga.
  cvUrl: "/CV-Jonathan-Medrano-v2.pdf",
  socials: [
    // GitHub queda afuera hasta que el repo del portfolio sea público: hoy el
    // perfil muestra un solo repo público (API-Crud, de marzo). Un GitHub vacío
    // resta más de lo que suma.
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
