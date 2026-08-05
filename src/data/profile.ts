import type { Profile } from "./types";

export const profile: Profile = {
  name: "Jonathan Medrano",
  // The Minecraft hero builds this out of wool blocks — keep it short or it
  // does not fit on a phone.
  shortName: "JONA",
  role: "Desarrollador Full Stack",
  tagline:
    "Construyo productos web de punta a punta: del esquema de la base al pixel del front.",
  bio: "Desarrollador full stack. Entré a Trizap en enero de 2025 como parte del equipo y hoy lidero la migración de un ERP de facturación electrónica de ASP.NET MVC 5 a React + TypeScript, tocando tanto el front como los backends .NET que lo alimentan. En paralelo construyo mis propios SaaS: uno ya está en producción cobrando con Mercado Pago. Me obsesionan las bases —arquitectura en capas, validación en servidor, contratos tipados— y uso IA como herramienta de ingeniería sin delegarle el entendimiento del código.",
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
