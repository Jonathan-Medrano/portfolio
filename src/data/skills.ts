import type { Skill } from "./types";

// Technologies you've actually worked with — at least once, for real.
// No percentages: it's a binary "I've touched this", which is honest and
// verifiable. Add or remove freely; `icon` must exist in skillIcons.tsx.
export const skills: Skill[] = [
  { name: "JavaScript", category: "language", icon: "javascript" },
  { name: "TypeScript", category: "language", icon: "typescript" },
  { name: "C#", category: "language", icon: "csharp" },
  { name: "Python", category: "language", icon: "python" },

  { name: "React", category: "frontend", icon: "react" },
  { name: "HTML", category: "frontend", icon: "html5" },
  { name: "CSS", category: "frontend", icon: "css" },
  { name: "Tailwind CSS", category: "frontend", icon: "tailwindcss" },

  { name: "Node.js", category: "backend", icon: "nodedotjs" },
  { name: "Express", category: "backend", icon: "express" },
  { name: "ASP.NET Core", category: "backend", icon: "dotnet" },
  { name: "SQL", category: "backend", icon: "postgresql" },

  { name: "Git", category: "tooling", icon: "git" },
  { name: "Vite", category: "tooling", icon: "vite" },
];
