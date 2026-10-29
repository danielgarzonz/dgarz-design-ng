export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  title: string;
  color: string; // tailwind-like dot color for sidebar
  items: NavItem[];
}

export const TOP_NAV: NavItem[] = [
  { label: "Temas", href: "/studio/themes" },
  { label: "Alertas", href: "/studio/alerts" },
  { label: "Galería", href: "/examples" },
  { label: "Animaciones", href: "/studio/animations" },
  { label: "Changelog", href: "/comenzar/changelog" },
];

export const NAV: NavGroup[] = [
  {
    title: "Comenzar",
    color: "#6366f1",
    items: [
      { label: "Introducción",     href: "/comenzar/intro" },
      { label: "Instalación",      href: "/comenzar/install" },
      { label: "JavaScript",       href: "/comenzar/js" },
      { label: "Changelog",        href: "/comenzar/changelog" },
    ],
  },
  {
    title: "Fundamentos",
    color: "#ec4899",
    items: [
      { label: "Color",            href: "/fundamentos/color" },
      { label: "Tipografía",       href: "/fundamentos/typography" },
      { label: "Tokens",           href: "/fundamentos/tokens" },
      { label: "Espaciado",        href: "/fundamentos/espaciado" },
      { label: "Sombras",          href: "/fundamentos/sombras" },
      { label: "Animaciones",      href: "/fundamentos/animaciones" },
      { label: "Superficies",      href: "/fundamentos/superficies" },
      { label: "Grid & Layout",    href: "/fundamentos/grid" },
      { label: "Display",          href: "/fundamentos/display" },
      { label: "Flex",             href: "/fundamentos/flex" },
      { label: "Bordes & Tamaño",  href: "/fundamentos/bordes" },
      { label: "Visibilidad",      href: "/fundamentos/visibilidad" },
      { label: "Interacción",      href: "/fundamentos/interaccion" },
      { label: "HTML semántico",   href: "/fundamentos/auto" },
    ],
  },
  {
    title: "Formularios",
    color: "#3b82f6",
    items: [
      { label: "Controles base",   href: "/formularios/forms" },
      { label: "Variantes",        href: "/formularios/variants" },
      { label: "Floating labels",  href: "/formularios/floating-labels" },
    ],
  },
  {
    title: "Componentes",
    color: "#06b6d4",
    items: [
      { label: "Botones",          href: "/componentes/buttons" },
      { label: "Cards",            href: "/componentes/cards" },
      { label: "Badges",           href: "/componentes/badges" },
      { label: "Alerts",           href: "/componentes/alerts" },
      { label: "Callouts",         href: "/componentes/callouts" },
      { label: "Toasts",           href: "/componentes/toasts" },
      { label: "Tablas",           href: "/componentes/tables" },
      { label: "Navegación",       href: "/componentes/nav" },
      { label: "Overlays",         href: "/componentes/overlays" },
      { label: "Dropdown",         href: "/componentes/dropdown" },
      { label: "Drawer",           href: "/componentes/drawer" },
      { label: "Modales",          href: "/componentes/modales" },
      { label: "Avatar · Progress", href: "/componentes/misc" },
      { label: "Chips",            href: "/componentes/chips" },
      { label: "Collapse",         href: "/componentes/collapse" },
      { label: "Carousel",         href: "/componentes/carousel" },
      { label: "Popover",          href: "/componentes/popover" },
      { label: "Figures",          href: "/componentes/figures" },
    ],
  },
  {
    title: "App Pack",
    color: "#22c55e",
    items: [
      { label: "App Shell",        href: "/app-pack/shell" },
      { label: "Accordion",        href: "/app-pack/accordion" },
      { label: "Breadcrumbs",      href: "/app-pack/breadcrumbs" },
      { label: "Steps",            href: "/app-pack/steps" },
      { label: "List Group",       href: "/app-pack/listgroup" },
      { label: "Stat Cards",       href: "/app-pack/stats" },
      { label: "Skeleton & Empty", href: "/app-pack/feedback" },
    ],
  },
  {
    title: "Ejemplos",
    color: "#a855f7",
    items: [
      { label: "Galería",           href: "/examples" },
      { label: "Series visuales",   href: "/examples/series" },
      { label: "Dashboard",         href: "/examples/dashboard.html" },
      { label: "Workspace PC",      href: "/examples/desktop.html" },
      { label: "Wallet móvil",      href: "/examples/mobile.html" },
    ],
  },
  {
    title: "Studio",
    color: "#ef4444",
    items: [
      { label: "Alertas",           href: "/studio/alerts" },
      { label: "Temas",             href: "/studio/themes" },
      { label: "Animaciones",       href: "/studio/animations" },
    ],
  },
];

// Flatten for prev/next navigation
export const ALL_PAGES: NavItem[] = NAV.flatMap((g) => g.items);

export function getPrevNext(href: string) {
  const idx = ALL_PAGES.findIndex((p) => p.href === href);
  return {
    prev: idx > 0 ? ALL_PAGES[idx - 1] : null,
    next: idx < ALL_PAGES.length - 1 ? ALL_PAGES[idx + 1] : null,
  };
}
