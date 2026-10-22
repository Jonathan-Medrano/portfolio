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
        "/projects/bajo-el-precio/historial.webp",
        "Historial de precios de un celular con su veredicto",
        "Pegás el link de un producto y ves cómo se movió su precio. Debajo del gráfico, un veredicto compara el precio de hoy contra el promedio y el mínimo de toda la serie acumulada.",
      ),
      shot(
        "/projects/bajo-el-precio/explorador.webp",
        "Explorador de productos con los que más bajaron",
        "El explorador muestra los productos que más bajaron y los más buscados, con filtros por categoría, condición y rango de precio.",
      ),
      shot(
        "/projects/bajo-el-precio/veredicto.webp",
        "Detalle de un producto que está en su precio más bajo registrado",
        "El detalle dice si el precio de hoy es el más bajo que se registró y deja pedir un aviso si baja. Es la misma regla que dispara las alertas de Telegram.",
      ),
      shot(
        "/projects/bajo-el-precio/producto.webp",
        "Página pública de un producto con su historial",
        "Cada producto tiene su propia página pública con el historial, pensada para que los buscadores la encuentren.",
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
        "Es el sitio público de MecánicOS (la landing todavía muestra el nombre anterior, TallerOS). Presenta las órdenes de trabajo digitales, el bot de WhatsApp para mecánicos y los avisos automáticos a los clientes.",
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
];
