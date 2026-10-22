import type { LabProject, Project } from "./types";
import { ticketeraGallery } from "./ticketeraGallery";
import { bajoElPrecioGallery, mecanicosGallery } from "./projectGalleries";

// Order matters: best first. `highlights` is the part that gets you the
// interview — each bullet is a technical decision you can defend, not a feature.
//
// Four, and the number is the point. A fifth card doesn't add 20% more
// evidence: it takes attention away from Ticketera, the deepest one. Each of the four also has
// to prove something the other three don't — otherwise it's repetition wearing
// a different logo.
//
// Hard rule: no link that does not open. A dead link actively proves the claim
// isn't true, which is worse than showing no link at all.
export const projects: Project[] = [
  {
    id: "ticketera",
    title: "Ticketera",
    summary:
      "Plataforma multi-tenant de venta de entradas para productoras de eventos.",
    description:
      "Plataforma white-label: cada productora vende en su propio sitio, con su logo y su plantilla, y cobra directo en su cuenta de Mercado Pago. Incluye venta de entradas y consumibles con QR, control de acceso, punto de venta, revendedores, marketing y una consola para el dueño de la plataforma. Es un proyecto de portfolio: lo construí de punta a punta para practicar un sistema real con dinero de por medio. Las capturas son de la app corriendo con datos simulados.",
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
      "Mercado Pago",
    ],
    status: "showcase",
    kind: "product",
    featured: true,
    gallery: ticketeraGallery,
    architecture: true,
    links: [],
  },
  {
    id: "bajo-el-precio",
    title: "Bajó el Precio",
    summary:
      "Historial de precios de Mercado Libre: distingue una baja real de un descuento inflado.",
    description:
      "Una publicación que dice «40% OFF» no dice nada: el precio pudo haber subido antes para que el descuento parezca más grande. Sin la serie histórica no hay forma de saberlo, y esa serie hay que construirla día a día porque nadie la publica.",
    highlights: [
      "La alerta se dispara solo ante un mínimo histórico real: compara el precio nuevo contra toda la serie acumulada, no contra el de ayer, y exige un mínimo de historia antes de avisar para no gritar con dos datos.",
      "El scraper lee el precio real del catálogo, no el primero que aparece: Mercado Libre muestra varios en la misma página, y los centavos vienen en un nodo aparte del DOM.",
      "Los links de Mercado Libre tienen cuatro formatos que apuntan al mismo producto; sin normalizarlos, la serie de precios se parte en varias.",
      "Dos canales de aviso: broadcast al canal público de Telegram, y mensaje directo a cada usuario según el precio objetivo que haya fijado. El bot solo envía, nunca hace polling, para no competir por getUpdates con otro bot que comparte el mismo token.",
      "Cada mínimo histórico se publica también en Twitter de forma automática, replicando el aviso del canal.",
    ],
    stack: [
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Playwright",
      "Telegram Bot API",
      "Twitter",
      "Mercado Pago",
      "Fly.io",
    ],
    demo: "price-history",
    gallery: bajoElPrecioGallery,
    status: "archived",
    kind: "product",
    links: [
      {
        label: "Ver código",
        url: "https://github.com/Jonathan-Medrano/bajo-el-precio",
      },
    ],
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
    gallery: mecanicosGallery,
    status: "showcase",
    kind: "product",
    links: [],
  },
];

// The lab. One line each, no status badges.
//
// These are experiments, not products, and the framing matters: an experiment
// that ended isn't an abandoned commitment. Shown as full cards with `wip`
// badges they'd read as a graveyard; shown as a compact list they do what
// they're actually good for — showing range across very different domains.
//
// Nothing here is a module of something already listed above. Splitting one
// project into three entries inflates the count and the reader notices.
export const lab: LabProject[] = [
  {
    id: "quant-research",
    title: "Investigación de trading cuantitativo",
    summary:
      "Backtester event-driven para falsificar estrategias de mercado. Probé ocho hipótesis contra datos out-of-sample, ninguna sostuvo un edge neto después de costos, y cerré el proyecto en vez de seguir ajustando parámetros hasta que los números dieran.",
    stack: ["Python", "pandas", "scikit-learn"],
    url: "https://github.com/Jonathan-Medrano/bot_trading",
  },
  {
    id: "motor-video-ia",
    title: "Motor de video con IA",
    summary:
      "Genera y publica lyric-videos en un canal real de YouTube sin intervención: forced alignment entre letra y audio para que cada línea caiga en su tiempo exacto, render con filtergraphs de FFmpeg y publicación programada e idempotente.",
    stack: ["Node.js", "Python", "PyTorch", "FFmpeg", "YouTube Data API"],
  },
  {
    id: "motor-assets",
    title: "Motor de assets para juegos",
    summary:
      "Pipeline de generación de personajes y fondos con IA para juegos idle y tower defense, con contratos versionados para que el estilo se mantenga consistente entre imágenes.",
    stack: ["Node.js", "Blender", "Modelos de difusión"],
  },
  {
    id: "asistente-financiero",
    title: "Asistente financiero con Claude e IOL",
    summary:
      "Bot de WhatsApp, armado con Evolution API, conectado a Claude y al MCP de IOL para controlar mis finanzas desde el celular: consulta las carteras de inversión, lleva gastos, deudas y resúmenes de tarjeta. Los números los calcula código con tests, nunca el modelo, y cualquier operación en IOL pide mi confirmación antes de ejecutarse.",
    stack: ["Claude", "MCP", "Evolution API", "WhatsApp", "Node.js", "TypeScript"],
  },
  {
    id: "juegos",
    title: "Juegos propios y una fábrica de juegos",
    summary:
      "Desarrollé varios juegos web y mobile sobre un kit propio con plantillas reutilizables (defensa de torre, clicker idle, runner, minijuegos). Holdout, un tower defense 3D, llegó a prueba interna en Google Play; también hice Heroes Voxel (un clicker), Cazador Runner y Golpazo (un idle de boxeo). Lo que más me dejó fue pensar el kit una vez para reusarlo en cada juego.",
    stack: ["TypeScript", "Three.js", "HTML5", "Capacitor"],
  },
  {
    id: "plugins-minecraft",
    title: "Plugins de Minecraft para jugar con amigos",
    summary:
      "Varios plugins para Paper que armé para jugar con amigos, con retos del estilo «Me paso Minecraft pero…»: drops únicos, cofres al salir minando, magia, reglas que cambian cada pocos minutos, minijuegos y un mapa de reinos enfrentados. Son experimentos de uso personal; me sirvieron para aprender modding y diseño de reglas de juego, y cada uno tiene su documento de diseño.",
    stack: ["Java", "Gradle", "Paper"],
  },
  {
    id: "editor-clips",
    title: "Editor automático de clips",
    summary:
      "Le das una grabación —de cualquier origen, material de terceros— y genera los clips solo: transcribe el audio con Whisper, detecta los momentos destacados y los recorta, sin editar a mano. Está en desarrollo.",
    stack: ["Node.js", "Whisper"],
  },
  {
    id: "monedita",
    title: "Monedita",
    summary:
      "Sistema de finanzas personales operado desde WhatsApp con Evolution API: registro de movimientos, carteras y seguimiento de la canasta argentina.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "Turborepo"],
  },
  {
    id: "gestion-financiera",
    title: "Gestión financiera personal",
    summary:
      "App fullstack de ingresos y gastos con importación desde Mercado Pago. Primera vez que usé migraciones versionadas en lugar de tocar la base a mano.",
    stack: ["React", "TypeScript", "Express", "MariaDB"],
  },
];
