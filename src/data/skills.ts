import type { Skill } from "./types";

// Technologies you've actually worked with — at least once, for real. `core`
// marks the few used day to day; everything else is shown, but quieter.
// No percentages: it's a binary "I've touched this", which is honest and
// verifiable. Add or remove freely; `icon` must exist in skillIcons.tsx.
export const skills: Skill[] = [
  { name: "JavaScript", category: "language", icon: "javascript", core: true },
  { name: "TypeScript", category: "language", icon: "typescript", core: true },
  { name: "C#", category: "language", icon: "csharp", core: true },
  { name: "Python", category: "language", icon: "python" },
  { name: "Java", category: "language", icon: "java" },

  { name: "React", category: "frontend", icon: "react", core: true },
  { name: "Next.js", category: "frontend", icon: "nextdotjs", core: true },
  { name: "Redux", category: "frontend", icon: "redux" },
  { name: "MUI", category: "frontend", icon: "mui" },
  { name: "Three.js", category: "frontend", icon: "threedotjs" },
  { name: "HTML", category: "frontend", icon: "html5" },
  { name: "CSS", category: "frontend", icon: "css" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },

  { name: "Node.js", category: "backend", icon: "nodedotjs", core: true },
  { name: "Express", category: "backend", icon: "express" },
  { name: "NestJS", category: "backend", icon: "nestjs" },
  { name: "ASP.NET Core", category: "backend", icon: "dotnet", core: true },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "SQL", category: "backend", icon: "postgresql", core: true },
  { name: "MariaDB", category: "backend", icon: "mariadb" },

  { name: "Claude y MCP", category: "ai", icon: "claude" },
  { name: "WhatsApp (Evolution API)", category: "integration", icon: "whatsapp" },
  { name: "Telegram Bot API", category: "integration", icon: "telegram" },
  { name: "Mercado Pago", category: "integration", icon: "mercadopago" },

  { name: "Git", category: "tooling", icon: "git" },
  { name: "Azure DevOps", category: "tooling", icon: "azuredevops" },
  { name: "Docker", category: "tooling", icon: "docker" },
  { name: "Vite", category: "tooling", icon: "vite" },
  { name: "Vitest", category: "tooling", icon: "vitest" },
  { name: "Turborepo", category: "tooling", icon: "turborepo" },
  { name: "Gradle", category: "tooling", icon: "gradle" },
  { name: "Capacitor", category: "tooling", icon: "capacitor" },
  { name: "FFmpeg", category: "tooling", icon: "ffmpeg" },
];
