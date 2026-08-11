import type { LabProject, Project } from "./types";

// Order matters: best first. `highlights` is the part that gets you the
// interview — each bullet is a technical decision you can defend, not a feature.
//
// Four, and the number is the point. A fifth card doesn't add 20% more
// evidence: it takes attention away from VIKUPASS, the only one with a paying
// client, which is worth more than the rest combined. Each of the four also has
// to prove something the other three don't — otherwise it's repetition wearing
// a different logo.
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
    id: "clip-editor",
    title: "ClipEditor",
    summary:
      "Producción de video automatizada: guion, voz, animación, render y publicación.",
    description:
      "Empezó como un editor de subtítulos para Shorts y terminó siendo un pipeline completo. Incluye un motor de escena propio —mundo, cámara, escenario, reparto y ciclo de caminata— que reemplazó a Remotion, y un piloto automático que produce, publica y lee la analítica para decidir el próximo video.",
    highlights: [
      "El trabajo pesado nunca está en el request: Fastify encola en BullMQ sobre Redis y los workers de Python lo consumen aparte. Renderizar tarda minutos; si el usuario espera, la conexión se cae y no hay reintento.",
      "Once estilos de subtítulo sincronizado —karaoke, neón, glitch, máquina de escribir— cada uno como proceso aislado: un cambio en el timing de uno no puede romper a los otros.",
      "La escena se valida antes de renderizar: si un personaje quedó fuera de cuadro, falla ahí y no después de gastar minutos de CPU.",
      "Los proveedores externos (ElevenLabs, Gemini, fal.ai, Pexels) entran por adaptadores, así cambiar de proveedor de voz no obliga a tocar el pipeline.",
    ],
    stack: [
      "Node.js",
      "Fastify",
      "BullMQ",
      "Redis",
      "Python",
      "FFmpeg",
      "React",
      "Cloudflare R2",
    ],
    status: "wip",
    kind: "product",
    links: [
      {
        label: "Ver código",
        url: "https://github.com/Jonathan-Medrano/clip-editor",
      },
    ],
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
    status: "beta",
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
    id: "monedita",
    title: "Monedita",
    summary:
      "Sistema de finanzas personales operado desde WhatsApp: registro de movimientos, carteras y seguimiento de la canasta argentina.",
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
