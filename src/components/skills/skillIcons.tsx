import type { IconType } from "react-icons";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiDotnet,
  SiSharp,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiGit,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiExpress,
  SiPython,
  SiCplusplus,
  SiC,
  SiVite,
  SiReactrouter,
  SiFramer,
  SiDocker,
} from "react-icons/si";

interface IconEntry {
  Icon: IconType;
  /** Official brand color, used in the professional cards. */
  color: string;
}

// Maps a skill's `icon` slug to its brand glyph + color.
// Note: C# is SiSharp and CSS is SiCss in current simple-icons.
export const skillIcons: Record<string, IconEntry> = {
  react: { Icon: SiReact, color: "#61DAFB" },
  typescript: { Icon: SiTypescript, color: "#3178C6" },
  javascript: { Icon: SiJavascript, color: "#F7DF1E" },
  nodedotjs: { Icon: SiNodedotjs, color: "#5FA04E" },
  dotnet: { Icon: SiDotnet, color: "#512BD4" },
  csharp: { Icon: SiSharp, color: "#9B4F96" },
  html5: { Icon: SiHtml5, color: "#E34F26" },
  css: { Icon: SiCss, color: "#663399" },
  tailwindcss: { Icon: SiTailwindcss, color: "#06B6D4" },
  git: { Icon: SiGit, color: "#F05032" },
  postgresql: { Icon: SiPostgresql, color: "#4169E1" },
  mysql: { Icon: SiMysql, color: "#4479A1" },
  sqlite: { Icon: SiSqlite, color: "#003B57" },
  express: { Icon: SiExpress, color: "#000000" },
  python: { Icon: SiPython, color: "#3776AB" },
  cplusplus: { Icon: SiCplusplus, color: "#00599C" },
  c: { Icon: SiC, color: "#A8B9CC" },
  vite: { Icon: SiVite, color: "#646CFF" },
  reactrouter: { Icon: SiReactrouter, color: "#CA4245" },
  framer: { Icon: SiFramer, color: "#0055FF" },
  docker: { Icon: SiDocker, color: "#2496ED" },
};
