export interface ChangelogRelease {
  version: string;
  date: string; // YYYY-MM-DD
  summary: string;
  highlights: string[];
}

// Mantén esto sincronizado con /CHANGELOG.md en la raíz del repo —
// esa es la fuente que lee npm; esta es la que lee la web.
export const CHANGELOG: ChangelogRelease[] = [
  {
    version: "1.2.0",
    date: "2026-09-20",
    summary: "Más estilo en los modales, sobre todo en los de estado (alertas).",
    highlights: [
      "Modales con acento de estado (success / warning / danger / info) heredado del sistema de alerts",
      "Efecto glow opcional: halo pulsante o anillo giratorio alrededor del modal según su estado",
      "Hero de icono grande + status tag para modales de resultado (confirmación, error, éxito)",
      "Modal de onboarding con pasos y dots de progreso",
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
