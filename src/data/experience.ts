import type { Experience } from "./types";

// Paid work. For a job search this outweighs any side project: someone else
// signed off on it. Most recent first.
//
// Rule for `highlights`: every bullet has to be checkable. "Propongo mejoras
// constantemente" is unfalsifiable and reads as filler — the migration count
// says the same thing and can be defended for twenty minutes.
//
// Two things are deliberate here. First, the numbers: 28 of ~65 modules gives
// both scale and proportion, and neither works alone. Second, the 44 fixes are
// attributed to the *flow*, never to the person — they come from the task
// runner's history, so they measure the tool's track record, not two years of
// output. Saying "I fixed 44 bugs" would be both weaker and false.
export const experience: Experience[] = [
  {
    id: "trizap",
    role: "Desarrollador Full Stack",
    company: "Trizap",
    context:
      "Sistema FIDEL: ERP y facturación electrónica (AFIP/ARCA) para empresas argentinas, sobre una arquitectura de 5 repositorios.",
    period: "Enero 2025 — Actualidad",
    startDate: "2025-01",
    location: "San Francisco, Córdoba · Presencial",
    current: true,
    highlights: [
      "Migré 28 de los ~65 módulos del ERP —más del 40% del sistema— de ASP.NET MVC 5 (Razor) a React 18 + TypeScript: ventas, compras, clientes, contabilidad, caja y stock, replicando el comportamiento exacto del legacy sobre un sistema en producción y sin cortar el servicio. Participé además en la migración de otros 10.",
      "Desarrollo los endpoints REST en la API .NET (Web API 2 + Entity Framework, patrón controller → service → repository) cuando el front necesita datos que el legacy resolvía internamente, y después los consumo desde React. También implemento funcionalidades que no existían en la API y optimizo consultas SQL.",
      "Diseñé el flujo de verificación de correcciones que usa el equipo: de los 44 fixes que pasaron por él, ninguno volvió por regresión.",
      "Construí un simulador de contexto de cuenta que reproduce cualquier combinación de 22 permisos de rol y 124 configuraciones sin tocar la base de datos ni el panel de administración. Simular solo por caché no alcanzaba —los sitios que refrescan el userInfo la pisaban—, así que resuelve en dos capas: parche de caché e interceptación de la respuesta HTTP.",
      "Construí las herramientas internas del flujo de trabajo: un runner de tests E2E con Playwright y launcher web que el equipo de QA opera sin escribir código, un tablero de work items de Azure DevOps para el PM, un analizador diario de logs de la API con triage asistido, y un orquestador que automatiza el ciclo bug → worktree git → fix → tests → pull request.",
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
  },
];
