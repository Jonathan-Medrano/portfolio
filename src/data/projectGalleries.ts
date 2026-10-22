import type { ProjectGalleryGroup } from "./types";

// Screens that explain what each project does. Every caption says what the
// person is looking at AND what the product does with it — a screenshot with
// no sentence next to it is decoration.

const shot = (src: string, alt: string, caption: string) => ({
  src,
  alt,
  caption,
});

export const bajoElPrecioGallery: ProjectGalleryGroup[] = [
  {
    id: "producto",
    label: "Cómo se ve",
    layout: "screen",
    shots: [
      shot(
        "/projects/bajo-el-precio/explorador.webp",
        "Explorador de productos con su historial y la baja respecto del máximo",
        "El explorador muestra cada producto con su historial en miniatura y cuánto bajó respecto de su máximo, con filtros por categoría, precio y baja mínima. Capturas con datos de muestra.",
      ),
      shot(
        "/projects/bajo-el-precio/falsa-oferta.webp",
        "Detalle de un producto cuya oferta no es el mejor precio",
        "Parece una oferta fuerte, pero el precio ya había estado más bajo semanas atrás. El veredicto lo avisa y recomienda no confiarse del descuento: es la regla central del proyecto.",
      ),
      shot(
        "/projects/bajo-el-precio/baja-real.webp",
        "Detalle de un producto en su precio más bajo registrado",
        "Cuando el precio de hoy es el más bajo de toda la serie acumulada, el veredicto lo confirma y deja pedir un aviso si vuelve a bajar.",
      ),
    ],
  },
];

export const mecanicosGallery: ProjectGalleryGroup[] = [
  {
    id: "landing",
    label: "Qué hace",
    layout: "screen",
    shots: [
      shot(
        "/projects/mecanicos/landing.webp",
        "Página principal de MecánicOS",
        "Es el sitio público de MecánicOS. Presenta las órdenes de trabajo digitales, el bot de WhatsApp para mecánicos y los avisos automáticos a los clientes.",
      ),
      shot(
        "/projects/mecanicos/funciones.webp",
        "Las seis funciones principales del sistema",
        "Lo que resuelve: órdenes de trabajo con presupuestos, un bot de WhatsApp donde el mecánico actualiza órdenes por voz o texto, avisos automáticos al cliente, un asistente técnico con IA, un dashboard y el control de cobros.",
      ),
      shot(
        "/projects/mecanicos/talleres.webp",
        "Ventajas pensadas para talleres reales",
        "Pensado para talleres de barrio: corre en el navegador, tiene usuarios con permisos por rol, historial de cada vehículo, presupuesto en PDF y funciona desde el celular.",
      ),
    ],
  },
  {
    id: "panel",
    label: "El panel (datos de muestra)",
    layout: "screen",
    shots: [
      shot(
        "/projects/mecanicos/panel-ordenes.webp",
        "Lista de órdenes de trabajo",
        "Las órdenes del taller con su estado, el cliente, la patente, el monto y si falta cobrar. Se filtran por estado y el estado se cambia desde la misma fila. Los datos son de muestra.",
      ),
      shot(
        "/projects/mecanicos/panel-calendario.webp",
        "Calendario semanal del taller",
        "La semana del taller: qué auto entra cada día, en qué estado está y qué mecánico lo tiene. Los datos son de muestra.",
      ),
      shot(
        "/projects/mecanicos/panel-inventario.webp",
        "Inventario de repuestos",
        "Stock de cada repuesto con costo y precio de venta, y una alerta cuando el stock llega al mínimo que definió el taller. Los datos son de muestra.",
      ),
    ],
  },
  {
    id: "movil",
    label: "En el celular",
    layout: "phone",
    shots: [
      shot(
        "/projects/mecanicos/movil-landing.webp",
        "Página principal de MecánicOS en el celular",
        "El sitio se adapta al celular, que es desde donde trabaja un taller.",
      ),
      shot(
        "/projects/mecanicos/movil-funciones.webp",
        "Funciones de MecánicOS en el celular",
        "Las mismas funciones, pensadas para usarse desde el teléfono.",
      ),
    ],
  },
];
