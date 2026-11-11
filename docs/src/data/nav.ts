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
  { label: "Inicio", href: "/" },
];

export const NAV: NavGroup[] = [
  {
    title: "Comenzar",
    color: "#6366f1",
    items: [
      { label: "Introducción",     href: "/getting-started/intro" },
      { label: "Instalación",      href: "/getting-started/install" },
      { label: "Frameworks (Stencil)", href: "/getting-started/frameworks" },
      { label: "Core SSR",         href: "/getting-started/core" },
      { label: "JavaScript",       href: "/getting-started/js" },
      { label: "Changelog",        href: "/getting-started/changelog" },
    ],
  },
  {
    title: "Fundamentos",
    color: "#ec4899",
    items: [
      { label: "Color",            href: "/foundations/color" },
      { label: "Tipografía",       href: "/foundations/typography" },
      { label: "Efectos de texto", href: "/foundations/text-effects" },
      { label: "Tokens",           href: "/foundations/tokens" },
      { label: "Espaciado",        href: "/foundations/spacing" },
      { label: "Sombras",          href: "/foundations/shadows" },
      { label: "Animaciones",      href: "/foundations/animations" },
      { label: "Superficies",      href: "/foundations/surfaces" },
      { label: "Composición",      href: "/foundations/composition" },
      { label: "Escalas",          href: "/foundations/scales" },
      { label: "Grid & Layout",    href: "/foundations/grid" },
      { label: "Display",          href: "/foundations/display" },
      { label: "Flex",             href: "/foundations/flex" },
      { label: "Bordes & Tamaño",  href: "/foundations/borders" },
      { label: "Visibilidad",      href: "/foundations/visibility" },
      { label: "Interacción",      href: "/foundations/interaction" },
      { label: "HTML semántico",   href: "/foundations/semantic-html" },
    ],
  },
  {
    title: "Formularios",
    color: "#3b82f6",
    items: [
      { label: "Controles base",   href: "/forms/controls" },
      { label: "Variantes",        href: "/forms/variants" },
      { label: "Floating labels",  href: "/forms/floating-labels" },
    ],
  },
  {
    title: "Componentes",
    color: "#06b6d4",
    items: [
      { label: "Botones",          href: "/components/buttons" },
      { label: "Cards",            href: "/components/cards" },
      { label: "Badges",           href: "/components/badges" },
      { label: "Alerts",           href: "/components/alerts" },
      { label: "Callouts",         href: "/components/callouts" },
      { label: "Toasts",           href: "/components/toasts" },
      { label: "Tablas",           href: "/components/tables" },
      { label: "Navegación",       href: "/components/nav" },
      { label: "Overlays",         href: "/components/overlays" },
      { label: "Dropdown",         href: "/components/dropdown" },
      { label: "Drawer",           href: "/components/drawer" },
      { label: "Modales",          href: "/components/modals" },
      { label: "Avatar · Progress", href: "/components/misc" },
      { label: "Chips",            href: "/components/chips" },
      { label: "Collapse",         href: "/components/collapse" },
      { label: "Carruseles",       href: "/components/carousel" },

      { label: "Popover",          href: "/components/popover" },
      { label: "Figures",          href: "/components/figures" },
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
    title: "Studio",
    color: "#ef4444",
    items: [
      { label: "Galería", href: "/examples" },
      { label: "Portadas", href: "/studio/heroes" },
      { label: "Sitios reales", href: "/studio/sites" },
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
