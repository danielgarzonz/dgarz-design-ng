export type ExampleDevice = "Desktop" | "Mobile";
export type ExampleSkin = "cool" | "neutral" | "warm" | "aurora" | "dark";

export interface ExampleItem {
  slug: string;
  title: string;
  tag: ExampleDevice;
  skin: ExampleSkin;
  desc: string;
  focus: string;
  components: string[];
}

export const desktopExamples: ExampleItem[] = [
  { slug: "desktop-social-profile", title: "Perfil social", tag: "Desktop", skin: "cool", desc: "Portada, avatar, bio, seguidores y posts fijados.", focus: "Ideal para productos de creator economy, comunidades o membresías.", components: ["hero", "profile card", "stats", "feed"] },
  { slug: "desktop-calendar-booking", title: "Calendario de citas", tag: "Desktop", skin: "neutral", desc: "Agenda con próximos slots, filtros y vista semanal.", focus: "Funciona bien para salud, consultoría o reservas de servicios.", components: ["calendar", "sidebar", "filters", "table"] },
  { slug: "desktop-calculator", title: "Calculadora", tag: "Desktop", skin: "dark", desc: "Calculadora elegante con panel, histórico y atajos.", focus: "Útil para fintech, dashboards operativos o herramientas de productividad.", components: ["display", "keypad", "history", "summary"] },
  { slug: "desktop-hero-landing", title: "Hero landing", tag: "Desktop", skin: "warm", desc: "Portada de sitio con headline, CTA y mockup.", focus: "Pensada para marketing pages y homepages de producto.", components: ["hero", "cta", "mockup", "metrics"] },
  { slug: "desktop-slider-editorial", title: "Slider editorial", tag: "Desktop", skin: "aurora", desc: "Carrusel de contenido premium con navegación y CTA.", focus: "Sirve para cursos, medios o plataformas de descubrimiento.", components: ["carousel", "hero", "actions", "badges"] },
  { slug: "desktop-order-confirmation", title: "Confirmación de pedido", tag: "Desktop", skin: "cool", desc: "Resumen de compra, dirección, tracking y pago.", focus: "Especialmente fuerte para ecommerce o flows post-checkout.", components: ["receipt", "status", "summary", "timeline"] },
  { slug: "desktop-chat-view", title: "Vista de chat", tag: "Desktop", skin: "neutral", desc: "Mensajería con lista lateral y conversación activa.", focus: "Buena para soporte, CRMs o herramientas colaborativas.", components: ["sidebar", "chat list", "composer", "thread"] },
  { slug: "desktop-gallery", title: "Galería visual", tag: "Desktop", skin: "warm", desc: "Grid de imágenes, filtros y detalle seleccionado.", focus: "Encaja con portafolios, ecommerce visual o catálogos.", components: ["grid", "filters", "preview", "toolbar"] },
  { slug: "desktop-event-modal", title: "Modal de evento", tag: "Desktop", skin: "aurora", desc: "Registro a evento con speakers, fecha y asiento.", focus: "Muy útil para conferencias, webinars y ticketing.", components: ["modal", "speaker list", "chips", "cta"] },
  { slug: "desktop-pricing", title: "Planes de precios", tag: "Desktop", skin: "cool", desc: "Tres tiers, comparativa y CTA principal.", focus: "Pensado para SaaS o productos con pricing claro.", components: ["pricing cards", "toggle", "comparison", "cta"] },
];

export const mobileExamples: ExampleItem[] = [
  { slug: "mobile-login", title: "Login móvil", tag: "Mobile", skin: "cool", desc: "Acceso con CTA principal, social sign-in y microcopy.", focus: "Una base clara para onboarding o autenticación de apps.", components: ["hero", "form", "social buttons", "help text"] },
  { slug: "mobile-menu", title: "Menú app", tag: "Mobile", skin: "neutral", desc: "Menú lateral compacto con avatar y accesos rápidos.", focus: "Buena referencia para navegación compacta en apps móviles.", components: ["drawer", "profile", "nav list", "footer actions"] },
  { slug: "mobile-wallet", title: "Wallet", tag: "Mobile", skin: "aurora", desc: "Balance, cards, pagos y movimientos recientes.", focus: "Pensada para fintech o money management.", components: ["balance", "cards", "list", "bottom nav"] },
  { slug: "mobile-notification", title: "Notificación", tag: "Mobile", skin: "warm", desc: "Toast/alerta rica para entrega, reserva o pago.", focus: "Ayuda a diseñar microinteracciones con identidad visual.", components: ["toast", "icon", "cta", "status"] },
  { slug: "mobile-checkout", title: "Checkout", tag: "Mobile", skin: "cool", desc: "Carrito, dirección, método de pago y resumen.", focus: "Perfecta para flows móviles de compra.", components: ["cart", "summary", "payment", "cta"] },
  { slug: "mobile-social-profile", title: "Perfil social", tag: "Mobile", skin: "neutral", desc: "Bio, seguidores, stories y grid de posts.", focus: "Inspiración para redes, comunidades o creators.", components: ["cover", "avatar", "stats", "grid"] },
  { slug: "mobile-calendar", title: "Calendario", tag: "Mobile", skin: "cool", desc: "Agenda diaria con tarjetas de citas y acciones.", focus: "Pensada para reserva de sesiones y gestión diaria.", components: ["day header", "cards", "chips", "cta"] },
  { slug: "mobile-chat", title: "Chat", tag: "Mobile", skin: "dark", desc: "Inbox y conversación con composer fijo.", focus: "Referencia para mensajería y soporte móvil.", components: ["thread", "bubbles", "composer", "header"] },
  { slug: "mobile-event", title: "Evento", tag: "Mobile", skin: "warm", desc: "Detalle de evento con mapa, speakers y botón RSVP.", focus: "Sirve para páginas de evento y registro desde mobile.", components: ["hero", "chips", "speaker list", "cta"] },
  { slug: "mobile-pricing", title: "Pricing / plans", tag: "Mobile", skin: "aurora", desc: "Comparador vertical con highlight del plan recomendado.", focus: "Buena base para paywalls y upgrades móviles.", components: ["pricing cards", "badges", "feature list", "cta"] },
];

export const allExamples = [...desktopExamples, ...mobileExamples];
