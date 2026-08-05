# Portfolio — Jonathan Medrano

Portfolio personal con **dos experiencias sobre una misma capa de datos**: un
modo profesional y un viaje inmersivo estilo Minecraft.

## La decisión de diseño

El contenido vive en `src/data/` y es agnóstico de la presentación. Ninguna de
las dos experiencias tiene su propia copia de los proyectos, la experiencia
laboral o el stack — las dos leen del mismo lugar y deciden cómo renderizarlo.

```
src/data/            ← fuente única de verdad (tipos + contenido)
  types.ts             contratos: Project, Experience, Skill, Profile
  profile.ts           datos personales
  experience.ts        trabajo pago
  projects.ts          productos propios
  skills.ts            tecnologías usadas
  learning.ts          qué estoy estudiando ahora

src/experiences/
  professional/      ← renderer 1: scroll único, tipografía editorial
  minecraft/         ← renderer 2: Overworld → Cuevas → Nether
```

Cambiar un proyecto en `projects.ts` lo actualiza en los dos mundos a la vez.
Agregar un tercer renderer no requeriría tocar el contenido.

El modo activo se maneja como el toggle de light/dark: `ModeContext` lo
persiste en `localStorage` y lo refleja en `<html data-mode>`. Arranca en
**profesional** a propósito — el Minecraft es un easter egg, no la puerta.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

## Stack

React 19 · TypeScript · Vite · Tailwind CSS 4 · shadcn/ui · Motion · React Router

## Pendientes

- [ ] Perfil de GitHub: hoy los 5 repos públicos son ejercicios viejos (ToDo,
      CRUD) y no respaldan lo que dice este portfolio. Poner bio, pinned repos
      y al menos un proyecto real público antes de que alguien haga click
- [ ] Imagen Open Graph (`og:image`) para las previews en LinkedIn/WhatsApp
- [ ] Actualizar el CV de `../../CV/`: dice "~2 años" y no menciona Trizap
- [ ] Poner el proyecto bajo control de versiones (hoy no tiene `.git` propio)
- [ ] Deploy

## Escala del mundo Minecraft

Todo el Overworld se mide en **bloques**, no en píxeles: el suelo son 3 bloques,
Steve es 1 de ancho por 2 de alto, los árboles se dimensionan a partir de eso.
El tamaño del bloque sale de `useWorldBlock()` (`worldScale.ts`) y depende del
viewport. Si agregás algo a la escena, dimensionalo con ese hook — un `80`
hardcodeado se ve bien en desktop y rompe la proporción en el celular.

El nombre en lana usa `profile.shortName`, no `profile.name`: la fuente de lana
gasta 5 bloques por letra, así que "Jonathan Medrano" son 95 columnas y no entra
en ninguna pantalla a un tamaño legible.
