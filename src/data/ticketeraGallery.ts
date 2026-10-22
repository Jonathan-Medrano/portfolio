import type { ProjectGalleryGroup } from "./types";

const shot = (file: string, alt: string, caption: string) => ({
  src: `/projects/ticketera/${file}.webp`,
  alt,
  caption,
});

// Every screenshot is real: taken from the running app against simulated data
// (no client data, no credentials). The card says so, because a reader who
// suspects a mockup stops trusting everything else on the page.
export const ticketeraGallery: ProjectGalleryGroup[] = [
  {
    id: "sitio",
    label: "Sitio de venta",
    layout: "screen",
    shots: [
      shot(
        "sitio-premium",
        "Sitio de venta con la plantilla Premium",
        "Cada productora vende en su propio sitio. Plantilla Premium: tipografía serif y botones en contorno.",
      ),
      shot(
        "sitio-vibrante",
        "Sitio de venta con la plantilla Vibrante",
        "Misma estructura, otra identidad: la plantilla cambia colores, fuentes, bordes y botones sin tocar código.",
      ),
      shot(
        "sitio-clara",
        "Sitio de venta con la plantilla Clara",
        "Plantilla Clara, para marcas que prefieren fondo claro.",
      ),
      shot(
        "sitio-urbano",
        "Sitio de venta con la plantilla Urbano",
        "Ocho plantillas base; cada productora además puede guardar las suyas.",
      ),
      shot(
        "panel-editor",
        "Editor del sitio de venta con vista previa en vivo",
        "El editor muestra la vista previa en vivo sin guardar: lo que ve la productora es lo que verá el público.",
      ),
    ],
  },
  {
    id: "compra",
    label: "Compra",
    layout: "screen",
    shots: [
      shot(
        "compra-seleccion",
        "Selección de entradas de un evento",
        "Elegir entradas: el stock disponible se muestra en vivo y lo agotado ofrece lista de espera.",
      ),
      shot(
        "compra-checkout",
        "Checkout con carrito y datos por entrada",
        "Checkout: datos por entrada, código de descuento y resumen. El pago se hace en Mercado Pago.",
      ),
      shot(
        "compra-mis-tickets",
        "Pantalla Mis tickets",
        "Mis tickets: entradas válidas, usadas y reembolsadas.",
      ),
      shot(
        "compra-qr",
        "Entrada con código QR",
        "El QR de acceso y una clave corta de respaldo, por si falla la cámara en la puerta.",
      ),
    ],
  },
  {
    id: "panel",
    label: "Panel de la productora",
    layout: "screen",
    shots: [
      shot(
        "panel-dashboard",
        "Dashboard de la productora",
        "Dashboard: ventas, neto acreditado, ocupación y actividad reciente.",
      ),
      shot(
        "panel-eventos",
        "Listado de eventos con métricas",
        "Eventos con recaudación, ocupación y ritmo de ventas de los últimos 7 días.",
      ),
      shot(
        "panel-ventas",
        "Ventas de entradas con gráfico",
        "Ventas con gráfico diario, filtros y exportación.",
      ),
      shot(
        "panel-cobros",
        "Conexión de Mercado Pago",
        "Cobros: la productora conecta su cuenta de Mercado Pago por OAuth y la plata va directo a ella.",
      ),
      shot(
        "panel-escaner",
        "Escáner de QR para control de acceso",
        "Escáner de acceso por cámara o con código escrito, para entradas y consumibles.",
      ),
      shot(
        "panel-barra",
        "Ventas de consumibles de la barra",
        "Barra y consumibles: cada venta genera su propio QR para canjear.",
      ),
      shot(
        "panel-marketing",
        "Campañas de email con métricas",
        "Marketing: campañas por segmento, con envíos y aperturas.",
      ),
      shot(
        "panel-revendedores",
        "Revendedores con comisión",
        "Revendedores con comisión propia y ventas atribuidas.",
      ),
    ],
  },
  {
    id: "plataforma",
    label: "Consola de plataforma",
    layout: "screen",
    shots: [
      shot(
        "super-dashboard",
        "Dashboard de la consola de plataforma",
        "El dueño de la plataforma ve ganancias por día, estado de la red y reparto de comisiones.",
      ),
      shot(
        "super-empresas",
        "Listado de empresas de la plataforma",
        "Empresas de la red, con su estado de cobro y comisiones propias.",
      ),
      shot(
        "super-fee-tiers",
        "Comisión por volumen",
        "Comisión por tramos de volumen: baja sola cuando una productora vende más.",
      ),
    ],
  },
  {
    id: "movil",
    label: "En el celular",
    layout: "phone",
    shots: [
      shot(
        "movil-home",
        "Sitio de venta en el celular",
        "El sitio de cada productora, en el celular.",
      ),
      shot(
        "movil-seleccion",
        "Selección de entradas en el celular",
        "Elegir entradas y sumarlas al carrito desde el teléfono.",
      ),
      shot(
        "movil-tickets",
        "Mis tickets en el celular",
        "Las entradas del comprador, siempre a mano.",
      ),
      shot(
        "movil-qr",
        "Entrada con QR en el celular",
        "El QR de acceso, listo para mostrar en la puerta.",
      ),
    ],
  },
];
