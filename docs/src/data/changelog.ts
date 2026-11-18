export interface ChangelogRelease {
  version: string;
  date: string; // YYYY-MM-DD — vacío mientras la versión no esté publicada
  unreleased?: boolean;
  summary: string;
  highlights: string[];
}

// Mantén esto sincronizado con /CHANGELOG.md en la raíz del repo —
// esa es la fuente que lee npm; esta es la que lee la web.
export const CHANGELOG: ChangelogRelease[] = [
  {
    version: "1.3.0",
    date: "2026-11-18",
    summary: "Formularios completos, un solo estilo de esquinas para todo el sistema, tipografía suiza y bordes sutiles por defecto, alertas de estado y color accesible.",
    highlights: [
      "Formularios: rango de fechas, selector de hora, número con − / +, opciones en tarjeta, código de verificación, contador, área de texto que crece, etiquetas libres y valoración con estrellas",
      "Estructura de formularios: grupos con título, obligatorio y opcional, etiqueta a la izquierda",
      "Estilo de esquinas general: semi por defecto (10px), redondeado o recto con data-radius, igual en todos los componentes, y un botón para cambiarlo como el modo oscuro (data-dg-radius-toggle, dgarz.setRadius)",
      "Alertas de estado al estilo SweetAlert con dgAlert, dgConfirm y dgPrompt, con el pie integrado en el modal",
      "Switch, checkbox y radio rediseñados, que toman el fondo sobre el que están (--dg-control-bg)",
      "Tipografía suiza (Geist) en títulos, bordes sutiles, tablas rectas y acento azul acero",
      "Contraste WCAG AA en todos los pares de color, sin zoom al enfocar un campo en iPhone",
      "Clases duplicadas marcadas como obsoletas, con su reemplazo en dist/deprecated-classes.json",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-11-09",
    summary: "Capas de cascada, escalas completas con versiones responsivas y el nuevo core de componentes, sin romper nada de 1.1.0.",
    highlights: [
      "Capas de cascada (@layer): tu CSS siempre gana sin !important, y las utilidades siempre ganan a los componentes",
      "Escalas completas: margen, padding, tamaños, posición y grid en todos sus pasos, con versiones dg-md-, dg-lg- y dg-xl- (2 836 clases)",
      "Core de componentes Stencil en dgarz-design/core; la raíz del paquete sigue entregando el JS clásico, así que actualizar no rompe nada",
      "Formularios: datepicker, combobox con búsqueda y tags, dropzone de archivos, máscaras de input y toggle de contraseña",
      "Bloques: pricing, features, testimonios, timeline, FAQ con búsqueda y galería con lightbox",
      "Glass opcional, dock flotante, drawers superior e inferior, carrusel con foco y modales con revelado circular y glow",
      "Corregido: el tooltip solo con CSS ya no muestra una segunda burbuja",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-06-24",
    summary: "Actualizaciones de modales y fondos.",
    highlights: [
      "Fondo glass en modales (blur + saturación) con variante sólida .is-solid",
      "Posicionamiento de modales: top, bottom, left, right, con animaciones de entrada y salida direccionales",
      "Nuevos tamaños de modal (sm, lg, xl, full) y modal tipo barra/snackbar",
      "Modal de confirmación centrado con icono (dgConfirm / dgAlert / dgPrompt)",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-06-05",
    summary: "Lanzamiento inicial: todo lo necesario para construir una web completa.",
    highlights: [
      "Core: tokens de diseño, reset, tipografía editorial, grid de 12 columnas, utilidades",
      "Más de 20 componentes: botones, forms, cards, badges, alerts, tablas, navbar, tabs, dropdown, modal, tooltip…",
      "App Pack: sidebar, drawer, accordion, steps, skeleton, empty states, stat cards",
      "Capa de comportamiento dgarz.js — accesible, sin dependencias — y theming claro/oscuro nativo",
    ],
  },
];
