import type { Skill } from "./types";

// Technologies you've actually worked with — at least once, for real.
// No percentages: it's a binary "I've touched this", which is honest and
// verifiable. Add or remove freely; `icon` must exist in skillIcons.tsx.
export const skills: Skill[] = [
  { name: "JavaScript", category: "language", icon: "javascript" },
  { name: "TypeScript", category: "language", icon: "typescript" },
  { name: "C#", category: "language", icon: "csharp" },
  { name: "Python", category: "language", icon: "python" },
  { name: "Java", category: "language", icon: "java" },

  { name: "React", category: "frontend", icon: "react" },
  { name: "Next.js", category: "frontend", icon: "nextdotjs" },
  { name: "Redux", category: "frontend", icon: "redux" },
  { name: "MUI", category: "frontend", icon: "mui" },
  { name: "Three.js", category: "frontend", icon: "threedotjs" },
  { name: "HTML", category: "frontend", icon: "html5" },
  { name: "CSS", category: "frontend", icon: "css" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },

  { name: "Node.js", category: "backend", icon: "nodedotjs" },
  { name: "Express", category: "backend", icon: "express" },
  { name: "NestJS", category: "backend", icon: "nestjs" },
  { name: "ASP.NET Core", category: "backend", icon: "dotnet" },
  { name: "Prisma", category: "backend", icon: "prisma" },
  { name: "PostgreSQL", category: "backend", icon: "postgresql" },
  { name: "MariaDB", category: "backend", icon: "mariadb" },

  { name: "Claude y MCP", category: "ai", icon: "claude" },
  { name: "WhatsApp (Evolution API)", category: "integration", icon: "whatsapp" },
  { name: "Telegram Bot API", category: "integration", icon: "telegram" },
  { name: "Mercado Pago", category: "integration", icon: "mercadopago" },

  { name: "Git", category: "tooling", icon: "git" },
  { name: "Azure DevOps", category: "tooling", icon: "azuredevops" },
  { name: "Vite", category: "tooling", icon: "vite" },
  { name: "Vitest", category: "tooling", icon: "vitest" },
  { name: "Turborepo", category: "tooling", icon: "turborepo" },
  { name: "Gradle", category: "tooling", icon: "gradle" },
  { name: "Capacitor", category: "tooling", icon: "capacitor" },
  { name: "FFmpeg", category: "tooling", icon: "ffmpeg" },
];
