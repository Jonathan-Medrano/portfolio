import type { LabProject, Project } from "./types";

// Order matters: best first. `highlights` is the part that gets you the
// interview — each bullet is a technical decision you can defend, not a feature.
//
// Only four make it here. A fifth card doesn't add 20% more evidence: it takes
// attention away from VIKUPASS, which is the only one with a paying client and
// is worth more than the rest combined. Everything else lives in `lab` below.
//
// Hard rule: no link that does not open. A dead link actively proves the claim
// isn't true, which is worse than showing no link at all.
export const projects: Project[] = [
  {
    id: "vikupass",
    title: "VIKUPASS",
    summary:
      "Ticketera SaaS multi-tenant para productoras de eventos. En producción.",
    description:
      "Plataforma white-label para productoras: venta de entradas, barra/POS, control de acceso por QR, revendedores y reportería. Cada productora vende en su propio subdominio, con su logo y su paleta, y cobra directo en su cuenta de Mercado Pago. En producción, con un cliente usándola.",
    highlights: [
      "Stock a prueba de sobreventa: transacción serializable con bloqueo de fila y reserva temporal durante el checkout, liberada automáticamente al expirar.",
      "Cobros con Mercado Pago marketplace vía OAuth: la plata va directo a la cuenta del organizador, con reconciliación por webhook y reembolsos auditados.",
      "Arquitectura BFF: el navegador nunca habla con la API. Next.js proxea al Express agregando headers firmados de servidor a servidor.",
      "Check-in por QR desde el navegador, con detección atómica de duplicados.",
      "RBAC con roles granulares y protección explícita contra escalación de permisos.",
      "Seguridad: tokens cifrados con AES-256-GCM, estado OAuth firmado con HMAC y rate limiting en las rutas sensibles.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "Mercado Pago",
    ],
    status: "live",
    kind: "product",
    featured: true,
    links: [{ label: "Ver en vivo", url: "https://vikupass.com" }],
  },
  {
    id: "motor-video-ia",
    title: "Motor de video con IA",
    summary:
      "Genera y publica lyric-videos en YouTube sin intervención humana.",
    description:
      "Pipeline propio que toma una canción y devuelve el video publicado: genera el arte con modelos de difusión, alinea la letra con el audio y renderiza el video final. Alimenta un canal real de YouTube que sigue publicando.",
    highlights: [
      "Forced alignment entre letra y audio para que cada línea aparezca en su tiempo exacto, en vez de subtítulos calculados a ojo.",
      "Render con filtergraphs de FFmpeg: ecualizador de barras, scroll de letra y color de acento extraído de la propia imagen generada.",
      "Publicación vía YouTube Data API v3 con un job programado e idempotente: si se corre dos veces, no sube el video dos veces.",
    ],
    stack: ["Node.js", "Python", "PyTorch", "FFmpeg", "YouTube Data API"],
    status: "live",
    kind: "tool",
    links: [],
  },
  {
    id: "mecanicos",
    title: "MecánicOS",
    summary:
      "SaaS con IA para talleres mecánicos, operado desde WhatsApp por voz.",
    description:
      "Gestión para talleres de barrio, pensada para competir contra el cuaderno, el Excel y el WhatsApp suelto. El mecánico no se sienta frente a una pantalla: manda un audio y el sistema ejecuta la acción.",
    highlights: [
      "WhatsApp como interfaz principal: el audio se transcribe, se interpreta con IA y dispara la acción — cargar una orden, cambiar un estado, responderle al cliente.",
      "Asistente técnico con RAG sobre pgvector: responde citando el manual cargado en vez de inventar procedimientos.",
      "Monorepo Turborepo con API, web y un paquete de tipos compartido, para que el contrato entre front y back no se desincronice.",
      "Webhooks firmados con HMAC, validación por esquema y gating de features por plan.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "NestJS 11",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "pgvector",
      "Gemini",
      "Turborepo",
    ],
    status: "beta",
    kind: "product",
    links: [],
  },
  {
    id: "quant-research",
    title: "Investigación de trading cuantitativo",
    summary:
      "Backtesting sistemático de hipótesis de mercado. Cerrado a propósito.",
    description:
      "Motor de backtesting para falsificar estrategias de trading contra datos históricos. Probé ocho hipótesis candidatas y ninguna sostuvo un edge neto después de costos, así que cerré el proyecto en vez de seguir ajustando parámetros hasta que los números dieran.",
    highlights: [
      "Validación contra datos out-of-sample: una estrategia que solo funciona sobre los datos con los que se la construyó no está midiendo nada.",
      "Costos de transacción y slippage dentro del modelo desde el principio — sin eso, casi cualquier estrategia parece rentable.",
      "Ocho hipótesis falsificadas y proyecto cerrado con la conclusión escrita. Saber cuándo matar algo propio también es una decisión de ingeniería.",
    ],
    stack: ["Python", "pandas", "scikit-learn", "SQLite"],
    status: "archived",
    kind: "tool",
    links: [],
  },
];

// The lab. One line each, no status badges, no links.
//
// These are experiments, not products, and the framing matters: an experiment
// that ended isn't an abandoned commitment. Shown as full cards with `wip`
// badges they'd read as a graveyard; shown as a compact list they do what
// they're actually good for — showing range across very different domains.
export const lab: LabProject[] = [
  {
    id: "clipeditor",
    title: "ClipEditor",
    summary:
      "Editor de video con voz por IA y subtítulos palabra por palabra. Acá aprendí a sacar el trabajo pesado del request: colas y workers en vez de hacer esperar al usuario.",
    stack: ["React", "Fastify", "BullMQ", "Redis", "Python", "FFmpeg"],
  },
  {
    id: "bajo-el-precio",
    title: "Bajó el Precio",
    summary:
      "Scraper de precios de Mercado Libre que distingue una baja real de un descuento inflado sobre precio remarcado. Sin serie temporal persistida, esa diferencia no se puede calcular.",
    stack: ["Node.js", "TypeScript", "Scraping", "Fly.io"],
  },
  {
    id: "motor-assets",
    title: "Motor de assets para juegos",
    summary:
      "Generación de personajes y fondos con modelos de difusión, con un pipeline que mantiene el estilo consistente entre imágenes.",
    stack: ["Python", "Difusión", "Node.js"],
  },
  {
    id: "mensajeria",
    title: "Integraciones de mensajería",
    summary:
      "Respuestas automáticas sobre WhatsApp y Telegram: webhooks, manejo de estado por conversación y reintentos ante fallos de entrega.",
    stack: ["Node.js", "Evolution API", "Telegram Bot API"],
  },
  {
    id: "motor-reels",
    title: "Motor de reels",
    summary:
      "Generación y publicación automatizada de video vertical, con las APIs de IA de terceros (voz y texto) detrás de una capa propia para poder cambiar de proveedor.",
    stack: ["Node.js", "FFmpeg", "ElevenLabs"],
  },
  {
    id: "monedita",
    title: "Monedita",
    summary:
      "Sistema de finanzas personales operado desde WhatsApp: registro de movimientos, carteras y seguimiento de la canasta argentina.",
    stack: ["TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "gestion-financiera",
    title: "Gestión financiera personal",
    summary:
      "App fullstack de ingresos y gastos con importación desde Mercado Pago. Primera vez que usé migraciones versionadas en lugar de tocar la base a mano.",
    stack: ["React", "TypeScript", "Express", "MariaDB"],
  },
];
