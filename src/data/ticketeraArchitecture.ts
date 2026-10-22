// How Ticketera works inside. Every step below was checked against the code
// (routes/tenant.ts, routes/escanear.ts, jobs/expiredCheckoutCleanupJob.ts) —
// a diagram that overstates what the system does is worse than no diagram.

export type NodeId = "browser" | "bff" | "api" | "db" | "mp";

export interface ArchNode {
  id: NodeId;
  label: string;
  detail: string;
  x: number;
  y: number;
}

export interface ArchEdge {
  from: NodeId;
  to: NodeId;
  /** Webhooks and other server-initiated calls are drawn dashed. */
  dashed?: boolean;
}

export interface ArchFlow {
  id: string;
  label: string;
  /** What this flow protects, in one line. */
  guarantee: string;
  nodes: NodeId[];
  edges: Array<[NodeId, NodeId]>;
  steps: string[];
}

export const archNodes: ArchNode[] = [
  { id: "browser", label: "Navegador", detail: "React 19", x: 20, y: 110 },
  { id: "bff", label: "Next.js (BFF)", detail: "App Router", x: 250, y: 110 },
  { id: "api", label: "API Express", detail: "capas + Prisma", x: 480, y: 110 },
  { id: "db", label: "PostgreSQL", detail: "stock, entradas", x: 710, y: 20 },
  { id: "mp", label: "Mercado Pago", detail: "cuenta de la productora", x: 710, y: 200 },
];

export const archEdges: ArchEdge[] = [
  { from: "browser", to: "bff" },
  { from: "bff", to: "api" },
  { from: "api", to: "db" },
  { from: "api", to: "mp" },
  { from: "mp", to: "api", dashed: true },
];

export const archFlows: ArchFlow[] = [
  {
    id: "compra",
    label: "Compra sin sobreventa",
    guarantee: "Nunca se venden más entradas que el stock, ni con mil compradores a la vez.",
    nodes: ["browser", "bff", "api", "db"],
    edges: [
      ["browser", "bff"],
      ["bff", "api"],
      ["api", "db"],
    ],
    steps: [
      "El navegador le pide el checkout a Next.js; nunca habla directo con la API.",
      "El BFF agrega headers firmados de servidor a servidor y reenvía a Express.",
      "La API abre una transacción serializable, bloquea la fila de la categoría, descuenta el stock y crea una reserva con vencimiento. Si dos compras chocan, la transacción se reintenta.",
      "Devuelve el link de pago. Mientras tanto, el stock queda reservado y no se puede vender dos veces.",
      "Si el comprador no paga, un job cada 30 segundos libera las reservas vencidas.",
    ],
  },
  {
    id: "cobro",
    label: "Cobro y reconciliación",
    guarantee: "La plata va directo a la productora y un pago nunca se procesa dos veces.",
    nodes: ["api", "mp", "db"],
    edges: [
      ["api", "mp"],
      ["mp", "api"],
      ["api", "db"],
    ],
    steps: [
      "La productora conecta su cuenta de Mercado Pago por OAuth. Los tokens se guardan cifrados con AES-256-GCM y el estado del OAuth va firmado con HMAC.",
      "El checkout se crea con las credenciales de esa productora: la plata se acredita en su cuenta, y la plataforma cobra su comisión.",
      "Mercado Pago avisa por webhook. La API valida la firma (timestamp + HMAC-SHA256) antes de creer nada.",
      "Cada notificación se registra en una tabla de webhooks procesados: si llega repetida, se ignora. Reprocesar es seguro.",
      "Recién entonces se confirman las entradas y se generan los QR. Los reembolsos quedan auditados caso por caso.",
    ],
  },
  {
    id: "acceso",
    label: "Control de acceso por QR",
    guarantee: "Una entrada entra una sola vez, aunque dos puertas la escaneen al mismo tiempo.",
    nodes: ["browser", "bff", "api", "db"],
    edges: [
      ["browser", "bff"],
      ["bff", "api"],
      ["api", "db"],
    ],
    steps: [
      "El personal escanea el QR con la cámara del navegador, o escribe la clave corta si falla la cámara.",
      "La API valida y marca la entrada en un único UPDATE atómico: el WHERE exige estado = 'valida'.",
      "Si dos escáneres leen la misma entrada a la vez, solo uno modifica una fila. El otro recibe «ya usada».",
      "Queda registrado quién la usó y cuándo, para auditar. Sin transacciones largas ni locks prolongados.",
    ],
  },
];
