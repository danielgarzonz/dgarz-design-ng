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
    version: "1.2.0",
    date: "",
    unreleased: true,
    summary: "Nuevos componentes de formulario y bloques de contenido, utilidades completas y modales con glow.",
    highlights: [
      "Formularios: datepicker, combobox con búsqueda y tags, dropzone de archivos, máscaras de input y toggle de contraseña",
      "Bloques: pricing, features, testimonios, timeline, FAQ con búsqueda y galería con lightbox",
      "Tablas: filas como cards en móvil, edición inline y selección de todas las filas",
      "Utilidades completas: flexbox, escala de espaciado en todos los ejes, sombras, transiciones y scroll-snap",
      "Modales con efecto glow (halo pulsante o anillo giratorio) y helpers dgConfirm / dgAlert / dgPrompt",
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
