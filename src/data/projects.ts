import type { Project } from "./types";

// Order matters: best first. `highlights` is the part that gets you the
// interview — each bullet is a technical decision you can defend, not a feature.
export const projects: Project[] = [
  {
    id: "vikupass",
    title: "VIKUPASS",
    summary:
      "Ticketera SaaS multi-tenant para productoras de eventos. En producción.",
    description:
      "Plataforma white-label para productoras: venta de entradas, barra/POS, control de acceso por QR, revendedores y reportería. Cada productora vende en su propio subdominio, con su logo y su paleta, y cobra directo en su cuenta de Mercado Pago.",
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
    id: "clipeditor",
    title: "ClipEditor",
    summary:
      "SaaS de edición de video con IA: voz, subtítulos karaoke y editor visual.",
    description:
      "Se sube un video y vuelve con voz generada por IA, subtítulos sincronizados palabra por palabra y estilo editable desde un editor visual con vista previa en vivo. Producto completo, no demo: planes, afiliados, librería y métricas de uso.",
    highlights: [
      "Pipeline de media asíncrono: la API encola en BullMQ sobre Redis y los workers de Python hacen el trabajo pesado, así el request no espera al render.",
      "Transcripción con faster-whisper para alinear el texto palabra por palabra: eso es lo que habilita el efecto karaoke.",
      "Render final con FFmpeg parametrizado desde el editor, para que lo que se ve en la vista previa sea lo que sale en el MP4.",
      "Tiers reales: watermark en el plan free, templates y sistema de afiliados en los pagos.",
    ],
    stack: [
      "React",
      "Vite",
      "Tailwind",
      "Node.js",
      "Fastify",
      "BullMQ",
      "Redis",
      "Python",
      "FFmpeg",
    ],
    status: "wip",
    kind: "product",
    links: [],
  },
  {
    id: "motor-video-ia",
    title: "Motor de video con IA",
    summary:
      "Genera y publica lyric-videos en YouTube sin intervención humana.",
    description:
      "Pipeline propio que toma una canción y devuelve el video publicado: genera el arte con modelos de difusión, alinea la letra con el audio y renderiza el video final. Alimenta un canal real de YouTube.",
    highlights: [
      "Forced alignment entre letra y audio para que cada línea aparezca en su tiempo exacto, en vez de subtítulos a ojo.",
      "Render con filtergraphs de FFmpeg: ecualizador de barras, scroll de letra y color de acento extraído de la propia imagen generada.",
      "Publicación vía YouTube Data API v3 con un job programado e idempotente: si se corre dos veces, no sube el video dos veces.",
    ],
    stack: ["Node.js", "Python", "PyTorch", "FFmpeg", "YouTube Data API"],
    status: "live",
    kind: "tool",
    links: [],
  },
  {
    id: "bajo-el-precio",
    title: "Bajó el Precio",
    summary:
      "Bot de histórico de precios que detecta bajas reales y las publica.",
    description:
      "Scraper que sigue el precio de productos en el tiempo, distingue una baja real de un descuento inflado sobre precio remarcado, y publica la oferta automáticamente.",
    highlights: [
      "Histórico persistido por producto: sin serie temporal no se puede distinguir una oferta real de una fabricada.",
      "Publicación automatizada en redes con control de frecuencia para no quemar la cuenta.",
    ],
    stack: ["Node.js", "TypeScript", "Scraping", "Fly.io"],
    status: "wip",
    kind: "tool",
    links: [],
  },
  {
    id: "gestion-financiera",
    title: "Gestión financiera personal",
    summary:
      "App fullstack de finanzas con integración de Mercado Pago.",
    description:
      "Aplicación de gestión de ingresos y gastos con importación de movimientos desde Mercado Pago y migraciones de esquema versionadas.",
    highlights: [
      "Migraciones de esquema versionadas en vez de tocar la base a mano: el estado de la DB es reproducible.",
      "Integración con la API de Mercado Pago para conciliar movimientos reales contra los cargados a mano.",
    ],
    stack: ["React", "TypeScript", "Express", "MariaDB", "Mercado Pago"],
    status: "archived",
    kind: "tool",
    links: [],
  },
];
