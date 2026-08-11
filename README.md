# Portfolio — Jonathan Medrano

Mi portfolio personal. **[jonathanmedrano.vercel.app](https://jonathanmedrano.vercel.app)**

React 19 · TypeScript · Vite · Tailwind 4 · Motion

---

## Por qué está hecho así

**Una sola página, un solo scroll.** No hay rutas. Un recruiter escanea, no
navega: cada click es un lugar donde lo perdés, y el contenido entra cómodo en
una sola lectura.

**Los datos viven separados de la presentación.** Todo el contenido está en
[`src/data/`](src/data/) como objetos tipados, y las secciones sólo deciden cómo
mostrarlo. Actualizar el portfolio es editar un archivo de datos, no tocar JSX.

**Los proyectos van en dos niveles, a propósito.** Cuatro destacados con sus
decisiones técnicas, y el resto en un "Laboratorio" de una línea cada uno.
Diez tarjetas iguales hacen que no se lea ninguna, y una pared de proyectos a
medio terminar se lee como *"empieza cosas y las deja"*. El laboratorio los
enmarca por lo que son: experimentos que terminaron.
→ [`src/data/types.ts`](src/data/types.ts)

**Cada bullet de un proyecto es una decisión, no una feature.** *"Transacciones
serializables con bloqueo de fila"* se puede defender veinte minutos en una
entrevista; *"sistema de venta de entradas"* no dice nada. Es la regla que
gobierna todo el contenido.

**La fecha de inicio es un dato, no un texto.** Los años de experiencia se
derivan de `startDate` en vez de escribirse a mano, así el número del hero nunca
puede contradecir a las fechas de abajo.
→ [`src/data/types.ts`](src/data/types.ts)

---

## Estructura

```
src/
  data/                 la fuente de verdad: perfil, experiencia, proyectos, stack
  experiences/
    professional/       las secciones de la página
  components/           UI reutilizable (shadcn)
```

## Correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción
```

---

## Nota

Hubo un segundo modo —un mundo navegable estilo Minecraft— que quedó afuera:
estaba sin terminar, y un visitante paga el costo de un modo a medias antes de
llegar al trabajo. Vive en la rama [`minecraft-backup`](../../tree/minecraft-backup)
por si algún día se retoma.

Sacar algo que costó trabajo también es una decisión de producto.
