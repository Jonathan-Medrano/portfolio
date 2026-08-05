import type { Experience } from "./types";

// Paid work. For a job search this outweighs any side project: someone else
// signed off on it. Most recent first.
//
// Rule for `highlights`: every bullet has to be checkable. "Propongo mejoras
// constantemente" is unfalsifiable and reads as filler — the chatbot bullet
// says the same thing and can be defended for twenty minutes.
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
      "Entré como parte del equipo y hoy lidero la migración de legacy a React: porto módulos completos de ASP.NET MVC 5 (Razor) a React 18 + TypeScript replicando el comportamiento exacto del sistema viejo — ventas, compras, clientes, contabilidad, caja y stock.",
      "Propuse y diseñé un asistente interno sobre base de conocimiento y palabras clave: además de responder dudas del sistema, muestra tutoriales visuales, edita formularios en tiempo real y los abre con los datos ya cargados.",
      "Construí dashboards y herramientas internas que usa el resto del equipo para resolver sus tareas repetitivas, y skills de IA especializadas en el dominio del sistema.",
      "Full stack real: cuando el front necesita un dato que el legacy resolvía con Entity Framework interno, desarrollo el endpoint en la API .NET (controller → service → repository) y después lo consumo desde React.",
      "Aislamiento multi-tenant obligatorio en cada consulta y autenticación JWT con claims.",
      "Capa de servicios sobre axios con interceptores, refresh de token y respuestas tipadas.",
      "Tests E2E con Playwright contra ambientes reales, verificación de tipos previa al PR y revisión de diffs antes del merge.",
      "Construí un orquestador de agentes IA que cierra el ciclo bug → worktree git → fix → tests E2E → pull request en Azure DevOps.",
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
