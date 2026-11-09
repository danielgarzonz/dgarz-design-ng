// Hero designs for Studio › Heroes, built only with existing dgarz design
// classes. Shared by the gallery (/studio/heroes) and the full-screen view
// (/studio/heroes/[id]); the html is also the code shown to copy.
// Added in chronological order; the gallery lists them newest first.
export interface Hero {
  id: string;
  title: string;
  summary: string;
  desc: string;
  html: string;
  /** Page background behind the hero in the full-screen view. */
  pageBg?: string;
}

// Every hero is built only with existing dgarz design classes (layout,
// composition utilities, dg-fade-in-* + dg-delay-* for motion), no style.

// Framework sprite icon (two-line menu); the page must include dgarz-icons.svg.
const burger = `<svg class="dg-icon dg-icon-lg dg-text-xl" aria-hidden="true"><use href="#dg-menu-2"/></svg>`;

export const heroes: Hero[] = [
  {
    id: "poster",
    summary: "Nombre de borde a borde con la foto encima, a pantalla completa.",
    title: "Póster",
    desc: "Solo clases del framework. dg-bg-sand da la superficie crema y el color del texto; dg-min-h-screen, dg-flex dg-flex-col y dg-grow lo llevan a toda la pantalla. El nombre usa dg-font-condensed (carga Anton con el link) y dg-fit-7 dentro de un contenedor dg-cq, así llena el ancho exacto; dg-overlap-40 hace que la foto (dg-relative dg-z-10) suba sobre la base de las letras. En escritorio la foto crece hasta el borde (dg-flex-1, dg-rounded-t-xl); en móvil (dg-hidden-desktop) es cuadrada y aparece una segunda franja dg-bg-sand-deep.",
    html: `<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<section class="dg-bg-sand dg-min-h-screen dg-flex dg-flex-col dg-overflow-hidden">
  <div class="dg-cq dg-flex dg-flex-col dg-items-center dg-grow dg-px-5 dg-pt-5">
    <nav class="dg-flex dg-justify-between dg-items-center dg-gap-2 dg-w-full dg-mb-4 dg-uppercase dg-fw-bold dg-text-sm dg-tracking-wide dg-fade-in-down" aria-label="Secciones">
      <a class="dg-no-underline dg-no-wrap" href="#">● Galería</a>
      <a class="dg-no-underline dg-no-wrap" href="#">Cine</a>
      <a class="dg-no-underline dg-no-wrap" href="#">Prensa</a>
      <a class="dg-no-underline dg-no-wrap" href="#">Bio</a>
    </nav>
    <h1 class="dg-font-condensed dg-fit-7 dg-leading-display dg-overlap-40 dg-text-center dg-w-full dg-mb-0 dg-fade-in-up dg-delay-1">SOLENNE</h1>
    <!-- Escritorio: la foto crece hasta el borde inferior de la pantalla -->
    <img class="dg-hidden-mobile dg-relative dg-z-10 dg-w-50p dg-flex-1 dg-min-h-240 dg-object-cover dg-rounded-t-xl dg-fade-in-up dg-delay-2" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&w=1200" alt="Retrato de una modelo de cabello largo sobre fondo oscuro" loading="lazy">
    <!-- Móvil: foto más angosta con las cuatro esquinas redondeadas -->
    <img class="dg-hidden-desktop dg-relative dg-z-10 dg-w-70p dg-aspect-square dg-object-cover dg-rounded-xl dg-fade-in-up dg-delay-2" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&w=800" alt="Retrato de una modelo de cabello largo sobre fondo oscuro" loading="lazy">
  </div>
  <!-- Móvil: segunda franja, un tono más oscuro, con otra foto -->
  <div class="dg-hidden-desktop dg-bg-sand-deep dg-grow dg-py-6 dg-mt-6">
    <img class="dg-w-70p dg-aspect-square dg-object-cover dg-rounded-xl dg-mx-auto dg-fade-in-up dg-delay-3" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sesión editorial de moda en interior" loading="lazy">
  </div>
</section>`,
    pageBg: "#ebe5d9",
  },
  {
    id: "estudio",
    summary: "Tres fotos escalonadas y el nombre en rojo de borde a borde.",
    title: "Estudio creativo",
    desc: "Solo clases del framework. dg-bg-cream da la superficie y dg-ink-danger pone en rojo todo el texto, incluidos el título y dg-link. Tres fotos en dg-grid dg-grid-3 dg-items-end con alturas de ventana (dg-h-25vh, dg-h-50vh) para caber en una pantalla y márgenes inferiores (dg-mb-8, dg-mb-7) para escalonarlas; las laterales se ocultan en móvil (dg-hidden-xs dg-hidden-sm). El nombre usa dg-font-condensed y dg-fit-8 dg-fit-cap-40 (6 letras más el TM) en un contenedor dg-cq (llena el ancho sin pasar del 45% del alto); dg-mt-n4 lo sube bajo la foto central (dg-relative dg-z-10). El TM es dg-vertical dg-em-25.",
    html: `<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<section class="dg-bg-cream dg-ink-danger dg-min-h-screen dg-flex dg-flex-col dg-overflow-hidden">
  <header class="dg-flex dg-wrap dg-justify-between dg-items-start dg-gap-5 dg-px-5 dg-pt-5 dg-uppercase dg-fw-medium dg-text-sm dg-tracking-wide dg-fade-in-down">
    <p class="dg-max-w-440 dg-mb-0">Estudio creativo multidisciplinario especializado en identidad de marca y publicidad.</p>
    <nav class="dg-flex dg-wrap dg-gap-5" aria-label="Secciones">
      <a class="dg-no-underline" href="#">Proyectos</a>
      <a class="dg-no-underline" href="#">Estudio</a>
      <a class="dg-no-underline" href="#">Premios</a>
      <a class="dg-link" href="#">Contacto</a>
    </nav>
  </header>
  <div class="dg-grid dg-grid-3 dg-items-end dg-gap-5 dg-px-5 dg-mt-6 dg-grow">
    <img class="dg-hidden-xs dg-hidden-sm dg-h-25vh dg-aspect-2-3 dg-object-cover dg-mx-auto dg-mb-8 dg-fade-in-up dg-delay-2" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Interior minimalista con tonos suaves" loading="lazy">
    <img class="dg-relative dg-z-10 dg-h-50vh dg-aspect-3-4 dg-object-cover dg-mx-auto dg-fade-in-up dg-delay-1" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=1000" alt="Sesión editorial de moda en interior" loading="lazy">
    <img class="dg-hidden-xs dg-hidden-sm dg-h-25vh dg-aspect-2-3 dg-object-cover dg-mx-auto dg-mb-7 dg-fade-in-up dg-delay-3" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Frascos de cosmética sobre piedras y madera" loading="lazy">
  </div>
  <div class="dg-cq dg-px-5">
    <h1 class="dg-font-condensed dg-fit-8 dg-fit-cap-40 dg-leading-display dg-mt-n4 dg-mb-0 dg-fade-in-up dg-delay-4">MAREVO<span class="dg-vertical dg-em-25 dg-align-top dg-leading-none dg-ml-2">TM</span></h1>
  </div>
</section>`,
    pageBg: "#f8e9cf",
  },
  {
    id: "agencia",
    title: "Agencia de estilistas",
    summary: "Tres columnas: panel oscuro con el nombre gigante, retrato y contacto.",
    desc: "Solo clases del framework. Tres columnas pegadas con dg-row dg-g-0 y dg-col-12 dg-col-lg-4 / 5 / 3 (en móvil se apilan); dg-bg-graphite da el panel oscuro y pone el texto en blanco. «ODE» usa dg-font-condensed dg-fit-6 dg-fit-cap-40 respecto a la sección (dg-cq) y desborda sobre el retrato con dg-relative dg-z-10. La franja con líneas finas (dg-h-px dg-bg-current dg-opacity-25) y el círculo «Buscar» (dg-rounded-full dg-ring) se ubican con dg-absolute dg-top-50p / dg-left-75p y se ocultan en móvil. El menú es el ícono #dg-menu-2 del set del framework (dg-icon dg-icon-lg); aparece junto al logo en móvil y sobre el primer plano en escritorio.",
    html: `<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<section class="dg-row dg-g-0 dg-cq dg-relative dg-overflow-hidden dg-bg-graphite dg-min-h-screen">
  <!-- Columna 1: panel oscuro -->
  <div class="dg-col-12 dg-col-lg-4 dg-relative dg-z-10 dg-flex dg-flex-col dg-p-5">
    <div class="dg-flex dg-justify-between dg-items-center dg-fade-in-down">
      <p class="dg-fw-bold dg-text-sm dg-uppercase dg-tracking-wide dg-mb-0">Ode ag</p>
      <!-- Móvil: el menú va arriba, junto al logo -->
      <a class="dg-hidden-desktop dg-inline-flex" href="#" aria-label="Abrir menú">${burger}</a>
    </div>
    <h1 class="dg-font-condensed dg-fit-6 dg-fit-cap-40 dg-leading-none dg-mb-0 dg-fade-in-up dg-delay-1">ODE</h1>
    <a class="dg-hidden-desktop dg-no-underline dg-text-xs dg-uppercase dg-tracking-wide dg-mt-4" href="#">Ver artistas +</a>
    <div class="dg-grow"></div>
    <p class="dg-font-condensed dg-text-lg dg-muted dg-mb-0 dg-mt-6 dg-fade-in-up dg-delay-3">CONOCE A</p>
    <p class="dg-font-condensed dg-text-4xl dg-leading-none dg-mb-0 dg-fade-in-up dg-delay-4">INÉS<br>MAREN</p>
  </div>
  <!-- Columna 2: retrato -->
  <div class="dg-col-12 dg-col-lg-5 dg-cq dg-relative dg-overflow-hidden dg-min-h-75vh">
    <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-fade-in-up" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&w=1200" alt="Retrato de una modelo de cabello largo sobre fondo oscuro" loading="lazy">
    <nav class="dg-absolute dg-top-0 dg-flex dg-justify-between dg-w-full dg-px-5 dg-pt-5 dg-text-xs dg-uppercase dg-tracking-wide dg-fade-in-down dg-delay-2" aria-label="Secciones">
      <a class="dg-no-underline" href="#">Sobre las fundadoras</a>
      <a class="dg-no-underline" href="#">Nuestra idea</a>
    </nav>
    <p class="dg-absolute dg-left-5 dg-bottom-5 dg-font-condensed dg-fit-12 dg-leading-none dg-mb-0 dg-fade-in-up dg-delay-3"><span class="dg-em-75 dg-align-top">*</span>ESTILISTA</p>
  </div>
  <!-- Columna 3: primer plano y contacto -->
  <div class="dg-col-12 dg-col-lg-3 dg-cq dg-flex dg-flex-col">
    <div class="dg-grow dg-relative dg-overflow-hidden dg-min-h-50vh">
      <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-top dg-scale-200 dg-origin-top dg-fade-in-left dg-delay-2" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&w=900" alt="Primer plano del rostro de la modelo" loading="lazy">
      <!-- Escritorio: el menú arriba a la derecha, sobre el primer plano -->
      <a class="dg-hidden-mobile dg-absolute dg-top-4 dg-right-4 dg-inline-flex dg-p-3" href="#" aria-label="Abrir menú">${burger}</a>
    </div>
    <a class="dg-flex dg-items-center dg-justify-center dg-h-25vh dg-min-h-180 dg-no-underline dg-bg-white dg-ink-black dg-font-condensed dg-fit-9 dg-fade-in-up dg-delay-4" href="#">CONTACTO</a>
  </div>
  <!-- Franja con líneas finas que cruza las tres columnas (escritorio) -->
  <div class="dg-hidden-mobile dg-absolute dg-left-0 dg-top-50p dg-w-full dg-h-64 dg-z-20 dg-flex dg-justify-between dg-items-center dg-px-5 dg-text-xs dg-uppercase dg-tracking-wide dg-fade-in-up dg-delay-5">
    <span class="dg-absolute dg-top-0 dg-left-0 dg-w-full dg-h-px dg-bg-current dg-opacity-25" aria-hidden="true"></span>
    <a class="dg-no-underline" href="#">Ver artistas &nbsp;+</a>
    <a class="dg-no-underline" href="#">Ver todos sus trabajos</a>
    <span class="dg-absolute dg-bottom-0 dg-left-0 dg-w-full dg-h-px dg-bg-current dg-opacity-25" aria-hidden="true"></span>
  </div>
  <!-- Círculo «Buscar» sobre el borde entre retrato y primer plano (escritorio) -->
  <a class="dg-hidden-mobile dg-absolute dg-left-75p dg-top-25p dg-w-160 dg-h-160 dg-rounded-full dg-ring dg-flex dg-items-center dg-justify-center dg-no-underline dg-text-xs dg-uppercase dg-tracking-wide dg-z-20 dg-pop-in dg-delay-5" href="#">Buscar</a>
</section>`,
    pageBg: "#2a2a2a",
  },
  {
    id: "vano",
    title: "Estudio con foto central",
    summary: "Foto en blanco y negro, nombre rojo que la cruza y bloque rojo hasta el borde.",
    desc: "Solo clases del framework. dg-layers apila la foto y el nombre en la misma celda: la foto (dg-col-12 dg-col-md-8, dg-max-h-50vh para caber en pantallas bajas, dg-grayscale) queda centrada y el nombre (dg-self-center dg-justify-self-center) la cruza por la mitad. El nombre usa dg-fit-10 respecto a la sección (dg-cq), un poco más ancho que la pantalla para que se corte en los bordes, como en el original. El bloque dg-bg-danger dg-ink-black sube sobre la base de la foto con dg-mt-n8 dg-relative dg-z-10 y crece hasta el borde inferior con dg-grow; «Fund. 2023» se coloca a su lado con dg-absolute dg-left-100p. El menú usa dg-font-mono.",
    html: `<section class="dg-cq dg-bg-paper dg-ink-black dg-min-h-screen dg-flex dg-flex-col dg-items-center dg-overflow-hidden">
  <nav class="dg-flex dg-wrap dg-justify-center dg-gap-3 dg-pt-5 dg-px-5 dg-font-mono dg-text-xs dg-uppercase dg-fade-in-down" aria-label="Secciones">
    <a class="dg-no-underline" href="#">Inicio</a>
    <a class="dg-no-underline" href="#">Trabajo</a>
    <a class="dg-no-underline" href="#">Estudio</a>
    <a class="dg-no-underline" href="#">Diario</a>
    <a class="dg-no-underline" href="#">Contacto</a>
  </nav>
  <div class="dg-layers dg-w-full dg-mt-8">
    <img class="dg-col-12 dg-col-md-8 dg-mx-auto dg-aspect-16-10 dg-max-h-50vh dg-object-cover dg-object-center dg-grayscale dg-fade-in-up" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&w=1400" alt="Retrato en blanco y negro de una modelo" loading="lazy">
    <h1 class="dg-self-center dg-justify-self-center dg-relative dg-z-10 dg-font-sans dg-fw-normal dg-tracking-tight dg-leading-none dg-text-danger dg-fit-10 dg-mb-0 dg-fade-in-up dg-delay-1">VANO STUDIO*</h1>
  </div>
  <div class="dg-relative dg-z-10 dg-col-10 dg-col-md-3 dg-mt-n8 dg-grow dg-bg-danger dg-ink-black dg-flex dg-flex-col dg-gap-5 dg-p-5 dg-fade-in-up dg-delay-2">
    <span class="dg-hidden-xs dg-absolute dg-top-4 dg-left-100p dg-pl-3 dg-font-mono dg-text-xs dg-uppercase dg-text-white dg-no-wrap">Fund. 2023</span>
    <p class="dg-text-sm dg-mb-0">Un estudio creativo dedicado al diseño mínimo y atemporal, que une la estética editorial con experiencias digitales modernas. Un espacio donde las ideas se vuelven identidades y sitios claros.</p>
    <a class="dg-mt-auto dg-font-mono dg-text-sm dg-no-underline" href="#">Conocer más</a>
  </div>
</section>`,
    pageBg: "#ffffff",
  },
  {
    id: "lumo",
    title: "Estudio con tira de fotos",
    summary: "Marca centrada en blanco y una tira de fotos en arco que se desplaza sola.",
    desc: "Solo clases del framework. La marca usa dg-font-sans dg-fw-bold dg-tracking-tight con dg-fit-10 dg-fit-cap-30 dentro de la sección dg-cq, y el ® es dg-em-25 dg-align-top. A los lados, un texto vertical que se lee de abajo arriba (dg-vertical-up) y los enlaces sociales en dg-font-mono, colocados con dg-absolute dentro del bloque central (dg-relative) para quedar sobre la tira, ocultos en móvil. La tira es un dg-marquee (se desplaza en bucle, se pausa al pasar el cursor y queda quieta con reducir movimiento) con dg-mask-fade-x para desvanecer los bordes; cada foto alterna el arco con dg-rounded-tl-full y dg-rounded-tr-full. Las fotos se repiten una vez (aria-hidden) para que el bucle sea continuo.",
    html: `<section class="dg-cq dg-relative dg-bg-paper dg-ink-black dg-min-h-screen dg-flex dg-flex-col dg-overflow-hidden">
  <header class="dg-flex dg-justify-between dg-items-center dg-px-5 dg-pt-5 dg-fade-in-down">
    <a class="dg-fw-bold dg-text-lg dg-leading-none dg-no-underline" href="#" aria-label="Lumo, inicio">lu</a>
    <a class="dg-inline-flex dg-no-underline" href="#" aria-label="Abrir menú"><svg class="dg-icon dg-icon-lg" aria-hidden="true"><use href="#dg-plus"/></svg></a>
  </header>
  <div class="dg-grow dg-relative dg-flex dg-flex-col dg-items-center dg-justify-center dg-gap-4 dg-px-5 dg-py-6 dg-text-center">
    <h1 class="dg-font-sans dg-fw-bold dg-tracking-tight dg-leading-none dg-fit-10 dg-fit-cap-30 dg-mb-0 dg-fade-in-up dg-delay-1">Lumo<span class="dg-em-25 dg-align-top">®</span></h1>
    <p class="dg-text-lg dg-mb-0 dg-fade-in-up dg-delay-2">Estudio creativo con sede en Ciudad de México.</p>
    <span class="dg-hidden-mobile dg-absolute dg-left-5 dg-bottom-4 dg-vertical-up dg-font-mono dg-text-xs dg-uppercase dg-fade-in-left dg-delay-3">( Correo · CDMX )</span>
    <nav class="dg-hidden-mobile dg-absolute dg-right-5 dg-bottom-4 dg-flex dg-gap-2 dg-font-mono dg-text-xs dg-uppercase dg-fade-in-right dg-delay-3" aria-label="Redes">
      <a class="dg-no-underline" href="#">Be</a><span aria-hidden="true">/</span><a class="dg-no-underline" href="#">Dr</a><span aria-hidden="true">/</span><a class="dg-no-underline" href="#">X</a>
    </nav>
  </div>
  <div class="dg-marquee dg-mask-fade-x dg-fade-in-up dg-delay-3">
    <div class="dg-marquee-track">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Retrato de una modelo" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Frascos de cosmética sobre piedras" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Sesión editorial de moda" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Interior minimalista" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Escritorio con laptop" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Manos con un teléfono" loading="lazy">
      <!-- Las mismas fotos otra vez, para que el bucle sea continuo -->
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tl-full" src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
      <img class="dg-w-160 dg-h-50vh dg-shrink-0 dg-object-cover dg-rounded-tr-full" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=500" alt="" aria-hidden="true" loading="lazy">
    </div>
  </div>
</section>`,
    pageBg: "#ffffff",
  },
  {
    id: "velaro",
    title: "Estudio en panel",
    summary: "Barra con menú en pastilla, panel blanco con la marca y un slider automático de fotos.",
    desc: "Solo clases del framework. Fondo dg-bg-surface-2 con una barra superior (logo, pastilla negra «Menú» con dg-btn dg-btn-primary y el ícono #dg-menu-2 en un círculo dg-bg-graphite, y «Contáctanos») y un panel dg-bg-paper dg-rounded-xl que crece hasta el borde (dg-grow). La marca usa dg-font-sans dg-fw-bold con dg-fit-7 dg-fit-cap-30 en el panel (dg-cq). Al centro, un slider automático (dg-carousel dg-carousel-focus dg-focus-sm con data-dg-carousel-autoplay): la foto activa al centro y más grande, las demás más pequeñas hacia los lados. Abajo, el ícono #dg-globe con la frase y una lista de servicios en dg-badge que se desplaza en vertical con dg-marquee dg-marquee-y y se desvanece con dg-mask-fade-y. «Con sede en México» va en vertical con dg-vertical.",
    html: `<section class="dg-bg-surface-2 dg-ink-black dg-min-h-screen dg-flex dg-flex-col">
  <header class="dg-flex dg-justify-between dg-items-center dg-gap-3 dg-px-5 dg-py-3 dg-fade-in-down">
    <a class="dg-fw-bold dg-text-xl dg-tracking-tight dg-no-underline" href="#" aria-label="Velaro, inicio">V//</a>
    <a class="dg-btn dg-btn-primary dg-justify-start dg-gap-3 dg-w-200 dg-p-2" href="#">
      <span class="dg-inline-flex dg-p-2 dg-rounded-full dg-bg-graphite" aria-hidden="true"><svg class="dg-icon dg-icon-sm"><use href="#dg-menu-2"/></svg></span>
      Menú
    </a>
    <a class="dg-no-underline dg-fw-medium" href="#">Contáctanos</a>
  </header>
  <div class="dg-cq dg-relative dg-grow dg-flex dg-flex-col dg-bg-paper dg-rounded-xl dg-mx-3 dg-mb-3 dg-px-5 dg-pt-4 dg-pb-5 dg-overflow-hidden">
    <h1 class="dg-font-sans dg-fw-bold dg-tracking-tight dg-leading-none dg-fit-7 dg-fit-cap-30 dg-mb-0 dg-fade-in-up dg-delay-1">VELARO</h1>
    <p class="dg-text-2xl dg-fw-medium dg-mb-0 dg-fade-in-up dg-delay-2">@ 2019 – 26</p>
    <div class="dg-grow dg-flex dg-items-center dg-py-4 dg-fade-in-up dg-delay-2">
      <div class="dg-carousel dg-carousel-focus dg-focus-sm dg-w-90p dg-mx-auto" data-dg-carousel data-dg-carousel-autoplay="3000" aria-label="Proyectos">
        <div class="dg-carousel-inner">
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-top" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Retrato de una modelo"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Sesión editorial de moda"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Frascos de cosmética sobre piedras"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Interior minimalista"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Escritorio con laptop"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Manos con un teléfono"></div>
        <div class="dg-carousel-item dg-rounded-lg"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-grayscale dg-object-top" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Retrato en blanco y negro"></div>
        </div>
      </div>
    </div>
    <span class="dg-hidden-mobile dg-absolute dg-right-5 dg-top-50p dg-vertical dg-text-xs">Con sede en México</span>
    <div class="dg-flex dg-wrap dg-justify-between dg-items-end dg-gap-5">
      <div class="dg-stack dg-gap-3 dg-max-w-xs dg-fade-in-up dg-delay-4">
        <svg class="dg-icon dg-text-4xl" aria-hidden="true"><use href="#dg-globe"/></svg>
        <p class="dg-fw-medium dg-mb-0">Soluciones creativas e innovación a la medida <span class="dg-muted">de empresas que miran hacia adelante.</span></p>
      </div>
      <div class="dg-marquee dg-marquee-y dg-mask-fade-y dg-h-140 dg-fade-in-up dg-delay-5">
        <div class="dg-marquee-track dg-items-end">
        <span class="dg-badge dg-text-sm">Motion</span>
        <span class="dg-badge dg-text-sm">Estrategia de campaña</span>
        <span class="dg-badge dg-text-sm">Identidad de marca</span>
        <span class="dg-badge dg-text-sm">Diseño web</span>
        <span class="dg-badge dg-text-sm">Dirección de arte</span>
        <span class="dg-badge dg-text-sm">Fotografía</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Motion</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Estrategia de campaña</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Identidad de marca</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Diseño web</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Dirección de arte</span>
        <span class="dg-badge dg-text-sm" aria-hidden="true">Fotografía</span>
        </div>
      </div>
    </div>
  </div>
</section>`,
    pageBg: "#f6f6f7",
  },
  {
    id: "orla",
    title: "Mosaico de fotos",
    summary: "Tres tiras de fotos que se deslizan en sentidos alternos, con la marca abajo.",
    desc: "Solo clases del framework. La sección es dg-bg-black dg-h-screen dg-flex dg-flex-col y cada fila es una tira dg-marquee que se desliza sola: la de arriba y la de abajo hacia la izquierda, la del centro hacia la derecha (dg-marquee-reverse), lentas (dg-marquee-slow) y con separación fina (dg-marquee-gap-2). Cada foto es una celda dg-relative dg-overflow-hidden dg-rounded-lg con ancho de ventana (dg-w-50vw; al centro alternan dg-w-25vw y dg-w-50vw) y la foto la llena con dg-absolute dg-inset-0 dg-object-cover; las tiras bajo el texto llevan dg-brightness-75. Las fotos de cada tira se repiten una vez (aria-hidden) para que el bucle sea continuo. Encima, la marca pequeña y el menú arriba y la marca grande abajo (dg-fit-12 con una línea dg-flex-1 dg-h-px dg-bg-current).",
    html: `<section class="dg-cq dg-relative dg-bg-black dg-h-screen dg-flex dg-flex-col dg-gap-2 dg-overflow-hidden">
  <div class="dg-marquee dg-marquee-slow dg-marquee-gap-2 dg-h-25vh dg-shrink-0 dg-mt-n8 dg-fade-in-down">
    <div class="dg-marquee-track dg-h-full">
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Frascos de cosmética sobre piedras" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Manos con un teléfono" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Sesión editorial de moda" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Interior minimalista" loading="lazy"></div>
          <!-- Las mismas fotos otra vez, para que el bucle sea continuo -->
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
    </div>
  </div>
  <div class="dg-marquee dg-marquee-slow dg-marquee-gap-2 dg-marquee-reverse dg-flex-1 dg-fade-in-up dg-delay-1">
    <div class="dg-marquee-track dg-h-full">
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-25vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-top" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Retrato de una modelo" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Sesión editorial de moda" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-25vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Interior minimalista" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Escritorio con laptop" loading="lazy"></div>
          <!-- Las mismas fotos otra vez, para que el bucle sea continuo -->
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-25vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-top" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-25vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
    </div>
  </div>
  <div class="dg-marquee dg-marquee-slow dg-marquee-gap-2 dg-h-25vh dg-shrink-0 dg-fade-in-up dg-delay-2">
    <div class="dg-marquee-track dg-h-full">
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Escritorio con laptop" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-bottom dg-brightness-75" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Retrato de una modelo, detalle" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Frascos de cosmética" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Manos con un teléfono" loading="lazy"></div>
          <!-- Las mismas fotos otra vez, para que el bucle sea continuo -->
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-bottom dg-brightness-75" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
          <div class="dg-relative dg-overflow-hidden dg-rounded-lg dg-shrink-0 dg-h-full dg-w-50vw"><img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-brightness-75" src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=900" alt="" aria-hidden="true" loading="lazy"></div>
    </div>
  </div>
  <a class="dg-absolute dg-top-4 dg-left-5 dg-z-20 dg-fw-medium dg-text-sm dg-no-underline dg-fade-in-down dg-delay-3" href="#">Estudio Orla®</a>
  <nav class="dg-absolute dg-top-4 dg-right-5 dg-z-20 dg-flex dg-gap-5 dg-text-sm dg-fade-in-down dg-delay-3" aria-label="Secciones">
    <a class="dg-no-underline" href="#">Trabajo</a>
    <a class="dg-no-underline" href="#">Nosotros</a>
    <a class="dg-hidden-xs dg-no-underline" href="#">Noticias</a>
    <a class="dg-no-underline" href="#">Contacto</a>
  </nav>
  <h1 class="dg-absolute dg-left-0 dg-bottom-5 dg-z-20 dg-w-full dg-px-5 dg-flex dg-justify-between dg-items-center dg-gap-5 dg-font-sans dg-fw-medium dg-tracking-tight dg-leading-none dg-fit-12 dg-mb-0 dg-fade-in-up dg-delay-4">
    <span>Estudio</span>
    <span class="dg-flex-1 dg-h-px dg-bg-current dg-opacity-75" aria-hidden="true"></span>
    <span>Orla<span class="dg-em-50 dg-align-top">®</span></span>
  </h1>
</section>`,
    pageBg: "#0b0b0c",
  },
  {
    id: "atelier",
    title: "Slider de fotos con letras",
    summary: "Slider automático delante de un título grande; la foto activa al centro y más grande.",
    desc: "Solo clases del framework. El slider es el carrusel con la variante dg-carousel-focus y data-dg-carousel-autoplay: la foto activa queda al centro a tamaño completo y las demás se achican según su distancia (70%, 50%, 40%), con transición de .9 s; avanza sola, se pausa al pasar el cursor o con su botón y respeta reducir movimiento. Las siete fotos deletrean ATELIER: cada letra es un dg-absolute dg-inset-0 dg-flex centrado sobre la foto, en blanco o negro según la imagen. Arriba la marca y el menú. El título, una sola palabra, es enorme (dg-fit-7 dg-fit-cap-40 respecto a dg-cq) y con dg-overlap-20 el carrusel (dg-relative dg-z-10) sube sobre su parte baja: se ve el 80% superior de la palabra y las fotos pasan por delante del resto. Abajo, un párrafo centrado. La entrada es lenta y escalonada: las fotos del carrusel salen juntas del centro y se abren hacia los lados (comportamiento de dg-carousel-focus), y dg-anim-slow / dg-anim-slower alargan los dg-fade-in-* del resto (1.2 s y 1.8 s) con dg-delay entre cada pieza. Fondo dg-bg-surface-3 y alto completo con dg-min-h-screen.",
    html: `<section class="dg-bg-surface-3 dg-ink-black dg-min-h-screen dg-flex dg-flex-col dg-overflow-hidden">
  <header class="dg-flex dg-justify-between dg-items-center dg-gap-5 dg-px-5 dg-pt-5 dg-fade-in-down dg-anim-slow">
    <a class="dg-fw-bold dg-text-sm dg-tracking-widest dg-no-underline" href="#">ATELIER</a>
    <nav class="dg-flex dg-gap-5 dg-text-sm" aria-label="Secciones">
      <a class="dg-no-underline" href="#">Trabajo</a>
      <a class="dg-no-underline" href="#">Estudio</a>
      <a class="dg-hidden-xs dg-no-underline" href="#">Diario</a>
      <a class="dg-no-underline" href="#">Contacto</a>
    </nav>
  </header>
  <!-- El carrusel sube sobre el título (dg-overlap-20): se ve el 80% superior de la palabra -->
  <div class="dg-cq dg-grow dg-flex dg-flex-col dg-justify-center dg-pt-3">
    <h1 class="dg-text-center dg-fit-7 dg-fit-cap-40 dg-leading-none dg-tracking-tight dg-overlap-20 dg-mb-0 dg-fade-in-up dg-anim-slower dg-delay-2">Imagen</h1>
    <div class="dg-carousel dg-carousel-focus dg-relative dg-z-10 dg-w-full" data-dg-carousel data-dg-carousel-autoplay="3000" aria-label="Trabajo reciente">
      <div class="dg-carousel-inner">
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-grayscale" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Retrato en blanco y negro">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-text-white" aria-hidden="true">A</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Sesión editorial de moda">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-text-white" aria-hidden="true">T</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Frascos de cosmética sobre piedras">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-ink-black" aria-hidden="true">E</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Escritorio con laptop">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-text-white" aria-hidden="true">L</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Interior minimalista">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-ink-black" aria-hidden="true">I</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover " src="https://images.pexels.com/photos/5053841/pexels-photo-5053841.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Manos con un teléfono">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-text-white" aria-hidden="true">E</span>
      </div>
      <div class="dg-carousel-item">
        <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-top" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Retrato de una modelo">
        <span class="dg-absolute dg-inset-0 dg-flex dg-items-center dg-justify-center dg-font-sans dg-fw-normal dg-text-5xl dg-text-white" aria-hidden="true">R</span>
      </div>
      </div>
    </div>
  </div>
  <div class="dg-flex dg-justify-center dg-px-5 dg-pb-5">
    <p class="dg-muted dg-text-center dg-max-w-md dg-mb-0 dg-fade-in-up dg-anim-slow dg-delay-9">Atelier de dirección de arte, fotografía y video. Creamos campañas, retratos e identidades con una mirada editorial.</p>
  </div>
</section>`,
    pageBg: "#ececee",
  },
  {
    id: "butaca",
    title: "Fotos con parallax",
    summary: "Fotos repartidas que se mueven a distintas velocidades al hacer scroll, con el título fijo al centro.",
    desc: "Solo clases del framework. La sección es más alta que la pantalla (dg-min-h-150vh) para tener recorrido de scroll; las fotos están ubicadas con dg-absolute y offsets (dg-top-25p, dg-left-50p…) y medidas en vw/vh, y cada una se desplaza a su propia velocidad con dg-parallax-slow, -mid o -fast (parallax solo con CSS, atado al scroll; sin soporte quedan quietas y con reducir movimiento se desactiva). El título y el menú van en un bloque dg-sticky dg-top-0 dg-h-screen, así quedan fijos al centro mientras las fotos pasan; la sección recorta con dg-overflow-clip (con overflow hidden el sticky no funcionaría). Título en dg-font-condensed con dg-fit-20 y un ícono del set (#dg-star) debajo.",
    html: `<link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">
<section class="dg-cq dg-relative dg-bg-black dg-min-h-150vh dg-overflow-clip">
  <div class="dg-absolute dg-left-0 dg-top-0 dg-ml-6 dg-w-25vw dg-h-25vh dg-parallax-mid">
    <img class="dg-w-full dg-h-full dg-object-cover dg-object-top dg-fade-in-up dg-delay-1" src="https://images.pexels.com/photos/16245933/pexels-photo-16245933.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Retrato de una modelo">
  </div>
  <div class="dg-absolute dg-left-0 dg-top-25p dg-ml-6 dg-w-25vw dg-h-25vh dg-parallax-fast dg-hidden-xs">
    <img class="dg-w-full dg-h-full dg-object-cover  dg-fade-in-up dg-delay-3" src="https://images.pexels.com/photos/6615804/pexels-photo-6615804.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Interior minimalista">
  </div>
  <div class="dg-absolute dg-left-0 dg-top-75p dg-w-25vw dg-h-50vh dg-parallax-slow">
    <img class="dg-w-full dg-h-full dg-object-cover  dg-fade-in-up dg-delay-2" src="https://images.pexels.com/photos/34426766/pexels-photo-34426766.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Sesión editorial de moda">
  </div>
  <div class="dg-absolute dg-left-50p dg-top-0 dg-w-50vw dg-h-50vh dg-parallax-slow">
    <img class="dg-w-full dg-h-full dg-object-cover  dg-fade-in-up dg-delay-1" src="https://images.pexels.com/photos/8167156/pexels-photo-8167156.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Frascos de cosmética sobre piedras">
  </div>
  <div class="dg-absolute dg-left-75p dg-top-50p dg-w-25vw dg-h-50vh dg-parallax-fast dg-hidden-xs">
    <img class="dg-w-full dg-h-full dg-object-cover  dg-fade-in-up dg-delay-4" src="https://images.pexels.com/photos/34147402/pexels-photo-34147402.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Escritorio con laptop">
  </div>
  <div class="dg-sticky dg-top-0 dg-h-screen dg-z-10 dg-flex dg-flex-col">
    <header class="dg-flex dg-justify-between dg-items-center dg-gap-5 dg-px-5 dg-pt-5 dg-fade-in-down">
      <a class="dg-font-condensed dg-text-xl dg-uppercase dg-no-underline" href="#">Butaca</a>
      <nav class="dg-flex dg-gap-5 dg-text-sm" aria-label="Secciones">
        <a class="dg-no-underline" href="#">Cartelera</a>
        <a class="dg-no-underline" href="#">Artistas</a>
        <a class="dg-hidden-xs dg-no-underline" href="#">Sesiones</a>
        <a class="dg-no-underline" href="#">Boletos</a>
      </nav>
    </header>
    <div class="dg-grow dg-flex dg-flex-col dg-items-center dg-justify-center dg-gap-5">
      <h1 class="dg-font-condensed dg-fit-20 dg-leading-display dg-text-center dg-mb-0 dg-fade-in-up dg-anim-slow dg-delay-2">DONDE<br>EL CINE<br>SE VUELVE<br>MÚSICA</h1>
      <svg class="dg-icon dg-text-4xl dg-fade-in-up dg-delay-5" aria-hidden="true"><use href="#dg-star"/></svg>
    </div>
  </div>
</section>`,
    pageBg: "#0b0b0c",
  },
  {
    id: "halden",
    title: "Título con foto a sangre",
    summary: "Marca, menú y un título grande y ligero arriba; abajo una foto que llena el resto de la pantalla.",
    desc: "Solo clases del framework. La sección es una columna de pantalla completa (dg-flex dg-flex-col dg-min-h-screen): cabecera, bloque de título y una foto con dg-flex-1 que ocupa todo el alto que queda, sin medidas fijas. El título va en dg-font-sans dg-fw-normal con dg-fit-8 dentro de una columna dg-cq, así llena su ancho en cualquier pantalla; el texto chico de arriba es dg-text-3xl. El enlace activo del menú lleva dg-underline y el carrito es un dg-btn dg-btn-subtle dg-bg-paper dg-rounded-pill (relleno blanco sobre el gris, sin borde). En móvil el menú se cambia por el ícono de dos líneas.",
    html: `<section class="dg-flex dg-flex-col dg-min-h-screen dg-bg-surface-3">
  <header class="dg-flex dg-justify-between dg-items-center dg-gap-5 dg-px-5 dg-pt-5 dg-fade-in-down">
    <a class="dg-flex-1 dg-font-serif dg-text-sm dg-uppercase dg-tracking-wide dg-no-underline" href="#">Halden</a>
    <nav class="dg-hidden-mobile dg-flex dg-gap-5 dg-text-sm" aria-label="Secciones">
      <a class="dg-no-underline" href="#">Lookbook</a>
      <a class="dg-no-underline" href="#">Hombre</a>
      <a class="dg-underline" href="#" aria-current="page">Mujer</a>
      <a class="dg-no-underline" href="#">Nosotros</a>
      <a class="dg-no-underline" href="#">Contacto</a>
    </nav>
    <div class="dg-flex-1 dg-flex dg-justify-end dg-items-center dg-gap-3">
      <a class="dg-btn dg-btn-subtle dg-bg-paper dg-rounded-pill" href="#">Carrito (1)</a>
      <a class="dg-hidden-desktop dg-inline-flex" href="#" aria-label="Abrir menú">${burger}</a>
    </div>
  </header>
  <div class="dg-row dg-justify-between dg-items-end dg-px-5 dg-pt-6 dg-pb-6">
    <div class="dg-col-12 dg-col-lg-6 dg-cq">
      <p class="dg-text-3xl dg-tracking-tight dg-leading-none dg-mb-2 dg-fade-in-up dg-delay-1">la nueva</p>
      <h1 class="dg-font-sans dg-fw-normal dg-tracking-tight dg-leading-none dg-uppercase dg-fit-8 dg-fit-cap-20 dg-mb-0 dg-fade-in-up dg-anim-slow dg-delay-2">Secuela</h1>
    </div>
    <p class="dg-col-12 dg-col-lg-3 dg-text-sm dg-mb-0 dg-fade-in-up dg-delay-3">Prendas esenciales en tonos neutros, cortadas para durar más de una temporada. Una colección pequeña que vuelve sobre lo que ya funcionaba.</p>
  </div>
  <div class="dg-flex-1 dg-relative dg-overflow-hidden dg-min-h-50vh">
    <img class="dg-absolute dg-inset-0 dg-w-full dg-h-full dg-object-cover dg-object-center dg-fade-in-up dg-anim-slower dg-delay-3" src="https://images.pexels.com/photos/5120185/pexels-photo-5120185.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Dos mujeres con gabardina beige contra un cielo gris">
  </div>
</section>`,
  },
  {
    id: "altera",
    title: "Constructora con collage",
    summary: "Título serif en dos líneas, un collage de tres fotos encimadas y una lista de proyectos con flechas.",
    desc: "Solo clases del framework. Fondo dg-bg-sand y todo dentro de un dg-container en columna de pantalla completa. Cabecera con dos menús dg-flex-1 a los lados, así la marca queda al centro exacto (en móvil, marca y menú de dos líneas). El título usa dg-font-serif con dg-fit-12 dentro de una columna dg-cq; la segunda línea va en dg-italic dg-text-muted. El collage es un bloque dg-relative: la foto principal al 80% del ancho y dg-h-50vh, y dos fotos de dg-h-25vh dg-absolute encima (arriba a la derecha con dg-top-5 dg-right-0, abajo con dg-top-75p dg-left-50p). La lista de proyectos son enlaces dg-flex dg-justify-between con líneas dg-h-px dg-bg-current dg-opacity-25 (el reset del framework quita los bordes). El collage se oculta en móvil y tablet (dg-hidden-mobile); dg-grow (no dg-flex-1) deja crecer la fila si el contenido es más alto que la pantalla, y dg-content-center junta las filas al centro cuando las columnas se apilan en móvil.",
    html: `<section class="dg-bg-sand">
  <div class="dg-container dg-flex dg-flex-col dg-min-h-screen">
    <header class="dg-flex dg-justify-between dg-items-center dg-gap-5 dg-pt-5 dg-text-xs dg-uppercase dg-tracking-widest dg-fw-medium dg-fade-in-down">
      <nav class="dg-hidden-mobile dg-flex-1 dg-flex dg-gap-6" aria-label="Contacto">
        <a class="dg-no-underline" href="#">Contacto</a>
        <a class="dg-no-underline" href="#">Idioma</a>
      </nav>
      <a class="dg-text-3xl dg-fw-bold dg-tracking-tight dg-leading-none dg-no-underline" href="#">Altera<sup class="dg-em-50 dg-fw-normal">®</sup></a>
      <nav class="dg-hidden-mobile dg-flex-1 dg-flex dg-justify-end dg-gap-6" aria-label="Secciones">
        <a class="dg-no-underline" href="#">Nosotros</a>
        <a class="dg-no-underline" href="#">Proyectos</a>
      </nav>
      <a class="dg-hidden-desktop dg-inline-flex" href="#" aria-label="Abrir menú">${burger}</a>
    </header>
    <div class="dg-grow dg-row dg-items-center dg-content-center dg-py-6">
      <div class="dg-col-12 dg-col-lg-6 dg-cq dg-mb-6">
        <h1 class="dg-font-serif dg-fw-medium dg-tracking-tight dg-leading-none dg-fit-12 dg-mb-0 dg-fade-in-up dg-anim-slow dg-delay-1">Construcciones<br><span class="dg-italic dg-text-muted">Integrales</span></h1>
        <p class="dg-text-xs dg-uppercase dg-tracking-widest dg-fw-medium dg-mt-6 dg-mb-0 dg-fade-in-up dg-delay-3">Altera S.A. de C.V.</p>
      </div>
      <div class="dg-hidden-mobile dg-col-12 dg-col-lg-3">
        <div class="dg-relative dg-mb-8">
          <img class="dg-w-80p dg-h-50vh dg-object-cover dg-fade-in-up dg-delay-2" src="https://images.pexels.com/photos/8251914/pexels-photo-8251914.jpeg?auto=compress&cs=tinysrgb&w=700" alt="Recámara blanca con luz natural">
          <img class="dg-absolute dg-top-5 dg-right-0 dg-w-40p dg-h-25vh dg-object-cover dg-fade-in-down dg-delay-3" src="https://images.pexels.com/photos/31728406/pexels-photo-31728406.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Habitación con muro de madera">
          <img class="dg-absolute dg-top-75p dg-left-50p dg-w-50p dg-h-25vh dg-object-cover dg-fade-in-up dg-delay-4" src="https://images.pexels.com/photos/7078717/pexels-photo-7078717.jpeg?auto=compress&cs=tinysrgb&w=500" alt="Fachada blanca curva">
        </div>
      </div>
      <div class="dg-col-12 dg-col-lg-3 dg-fade-in-up dg-delay-4">
        <p class="dg-text-xs dg-uppercase dg-tracking-widest dg-fw-medium dg-mb-5">Últimas<br>construcciones</p>
        <a class="dg-flex dg-justify-between dg-items-center dg-gap-4 dg-py-4 dg-no-underline" href="#">Lote 5 · Punta Arena<svg class="dg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>
        <div class="dg-h-px dg-bg-current dg-opacity-25"></div>
        <a class="dg-flex dg-justify-between dg-items-center dg-gap-4 dg-py-4 dg-no-underline" href="#">Colinas del Mar · Lote 4<svg class="dg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>
        <div class="dg-h-px dg-bg-current dg-opacity-25"></div>
        <a class="dg-flex dg-justify-between dg-items-center dg-gap-4 dg-py-4 dg-no-underline" href="#">Residencias Alto Sereno<svg class="dg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg></a>
        <div class="dg-h-px dg-bg-current dg-opacity-25"></div>
      </div>
    </div>
  </div>
</section>`,
  },
];

/** Gallery order: newest first, each with its number in order of addition. */
export const heroesNewestFirst = heroes.map((hero, index) => ({ hero, number: index + 1 })).reverse();
