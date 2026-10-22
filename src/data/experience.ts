import type { Experience } from "./types";

// Paid work. For a job search this outweighs any side project: someone else
// signed off on it. Most recent first.
//
// Rule for `highlights`: say what you do and what the tool is for, in words you
// can defend for twenty minutes. No figure goes in unless it can be checked by
// someone else — an invented or stale number is the one thing a reference call
// can contradict. So this is deliberately qualitative.

export const experience: Experience[] = [
  {
    id: "trizap",
    role: "Desarrollador Full Stack",
    company: "Trizap",
    context:
      "Sistema FIDEL: ERP y facturación electrónica (AFIP/ARCA) para empresas argentinas.",
    period: "Enero 2025 — Actualidad",
    startDate: "2025-01",
    location: "San Francisco, Córdoba · Presencial",
    current: true,
    highlights: [
      "Lidero la migración del ERP desde un stack legacy (ASP.NET MVC 5 con Razor) a React + TypeScript: ventas, compras, clientes, contabilidad, caja y stock, replicando el comportamiento del legacy sobre un sistema en producción y sin cortar el servicio.",
      "Desarrollo distintos sistemas y herramientas con ayuda de inteligencia artificial para agilizar el trabajo y mejorar el rendimiento del equipo, sin delegarle el entendimiento del código: la IA acelera, yo decido y reviso. Con frecuencia aporto ideas y la dirección me consulta por cambios, mejoras, opiniones y automatizaciones o procesos con IA.",
      "Desarrollo sistemas propios para mejorar el trabajo y el rendimiento, el mío y el del equipo. Por ejemplo: Task Runner, un dashboard donde controlo mis tareas de Azure DevOps y las tomo con un botón, que automatiza el ciclo bug → worktree git → fix → tests → pull request; y Control de scripts, que registra qué scripts van en cada subida a producción y acelera los pull requests de ambiente a ambiente.",
      "Desarrollo los endpoints REST en la API .NET (Web API 2 + Entity Framework, patrón controller → service → repository) cuando el front necesita datos que el legacy resolvía internamente, y después los consumo desde React. También implemento funcionalidades que no existían en la API y optimizo consultas SQL.",
      "Construí las herramientas internas del flujo de trabajo: un runner de tests E2E con Playwright y launcher web que el equipo de QA opera sin escribir código, un tablero de work items de Azure DevOps para el PM y un analizador diario de logs de la API con triage asistido.",
      "Diseñé el flujo de verificación de correcciones que usa el equipo, y un simulador de contexto de cuenta que reproduce combinaciones de permisos de rol y configuraciones sin tocar la base de datos ni el panel de administración. Simular solo por caché no alcanzaba —los sitios que refrescan el userInfo la pisaban—, así que resuelve en dos capas: parche de caché e interceptación de la respuesta HTTP.",
      "Reviso pull requests del equipo de migración y de otras áreas, y formé al desarrollador que se sumó al frente, tanto en el sistema como en el uso de herramientas de IA.",
      "Aislamiento multi-tenant obligatorio en cada consulta y autenticación JWT con claims: en un ERP de facturación, un tenant leyendo datos de otro no es un bug, es un incidente.",
      "Capa de servicios sobre axios con interceptores, refresh de token y respuestas tipadas. Proceso sobre Azure DevOps: ramas por work item, PRs vinculados y pipelines por ambiente.",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Redux",
      "MUI",
      "C#",
      ".NET Framework 4.8",
      ".NET 6",
      "Entity Framework",
      "SQL Server",
      "Playwright",
      "Azure DevOps",
    ],
    visuals: {
      migration: {
        from: "ASP.NET MVC 5 (Razor)",
        to: "React + TypeScript",
        areas: ["Ventas", "Compras", "Clientes", "Contabilidad", "Caja", "Stock"],
        note: "Sobre un sistema en producción, sin cortar el servicio.",
      },
      ai: {
        title: "Desarrollo con IA para ir más rápido",
        items: [
          "Task Runner: lleva un bug hasta el pull request",
          "Analizador de logs con triage asistido",
          "Herramientas internas para QA y PM",
          "Formación del equipo en el uso de IA",
          "Consultas de la dirección sobre automatización y procesos con IA",
        ],
        note: "La IA acelera; el criterio y la revisión son míos.",
      },
      systems: {
        title: "Sistemas propios para mejorar el trabajo y el rendimiento",
        examples: [
          {
            name: "Task Runner",
            what: "Dashboard donde controlo mis tareas cargadas en Azure DevOps: con un botón tomo cada una y automatiza el ciclo hasta el pull request.",
            steps: ["Bug", "Worktree git", "Fix", "Tests", "Pull request"],
          },
          {
            name: "Control de scripts",
            what: "Registra qué scripts van en cada subida a producción y acelera los pull requests de ambiente a ambiente.",
          },
        ],
      },
    },
  },
];
