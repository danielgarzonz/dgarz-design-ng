# Continuidad de la migración de dgarz design

Última actualización: **2026-11-02 01:27:52, America/Mexico_City (UTC−06:00)**.
Referencia UTC: **2026-11-02 07:27:52 UTC**.

Este archivo permite retomar el trabajo sin el historial del chat. Complementa a [ARCHITECTURE.md](./ARCHITECTURE.md): la arquitectura define el contrato; este documento registra avances, correcciones, evidencia y pendientes.

## Instrucciones para la siguiente IA

1. Lee este archivo, `ARCHITECTURE.md`, `CONTRIBUTING.md` y el estado de Git antes de editar.
2. **Stencil.js es la elección explícita del usuario. No volver a Lit.** La mención inicial «Stencil.js (o Lit)» fue aclarada posteriormente.
3. El usuario autorizó continuar la migración después de la primera etapa. Trabajar por pasos verificables, dejando el estado de cada fase registrado; no confundir autorización para continuar con fases ya implementadas.
4. Hay cambios locales modificados y archivos nuevos sin commit. Presérvalos; no reinicies la migración ni descartes archivos por no estar versionados todavía.
5. No se ha publicado en npm. La versión local es `2.0.0-alpha.0` y el paquete principal continúa siendo `dgarz-design`.
6. Actualiza este documento al terminar cada intervención: fecha/hora con zona, cambios, comandos ejecutados, resultados, problemas y próximo paso concreto. Distingue siempre lo implementado de lo validado.

## Ancho mínimo de botones — activo, 2026-11-02 00:59:15 (UTC−06:00)

Solicitud: botones con ancho mínimo. Se aplican 6rem default (96px), 5rem sm (80px), 7rem lg (112px), personalizables por tokens. Botones de solo icono mantienen mínimo 0 para conservar proporción. Se retira el mínimo duplicado del footer modal para heredar el tamaño correspondiente y se añade 6rem al botón Stencil con token --dgarz-button-min-width. Pendiente documentación, build y verificación geométrica/SSR.

## Secciones de botones — cerrado el 2026-11-02 00:58:16 (UTC−06:00)

Solicitud: separar sólidos, sutiles, outline, tamaños, ancho móvil y otros ejemplos. Inicio registrado: 00:53:15.

- `docs/src/pages/componentes/buttons.astro` reorganizada como HTML Astro explícito, con 17 secciones, encabezados h2, anchors e índice: default primero, sólidos, sutiles, sutiles con borde, outline, ghost, tamaños, ancho completo, ancho solo móvil, icono/texto, solo icono, carga, deshabilitados, hover, grupos, reordenables y enlaces.
- Se conserva la muestra de reordenamiento y su evento. Cada sección tiene demo y código copiable; los bloques pre usan `is:raw` para mostrar fragmentos HTML/JS sin interpretarlos como expresiones Astro.
- Nuevo modificador `dg-btn-block-mobile` para un botón con base/variante: display flex y width 100% hasta 991px (breakpoint existente de utilidades móviles); desde 992px conserva ancho natural. `dg-btn-block` continúa a ancho completo siempre. Se documenta como ancho del contenedor, no 100vw.
- Verificador de clases amplía cobertura a 390/991/992/1280px; pasó junto con las 18 variantes y 152 pares existentes. Chromium en la página construida validó 17 secciones/links de índice, default primero, anchors, anchos responsivos y reordenamiento, sin errores de navegador.
- Build legado aprobado; assets copiados y Astro aprobado: 77 páginas a las 00:56:26. `git diff --check` de los archivos del ajuste sin errores. No hubo cambios en API Stencil ni publicación.

## Bordes de color sutiles — cerrado el 2026-11-02 00:50:35 (UTC−06:00)

Solicitud: botones sutiles con bordes de color. Inicio registrado: 00:47:49.

- Nuevas variantes autónomas `dg-btn-subtle-primary`, `dg-btn-subtle-success`, `dg-btn-subtle-warning`, `dg-btn-subtle-danger`, `dg-btn-subtle-info`. Comparten superficie suave y texto de contraste; borde sólido de 1px usa el token semántico correspondiente. La sutil neutra recibe borde neutro.
- Selectores explícitos Sass/JS incluyen las cinco clases. `$subtle-selector` agrupa el estilo sutil, hover/foco y spinner. Footer de modal excluye toda esta familia de su recoloración para iconos sólidos.
- **Corrección necesaria:** `_flat.scss` eliminaba el borde con `!important`. Se agregó excepción explícita para esta familia en el reset de bordes; no usar sombras para simularlos ni quitar globalmente la presentación flat.
- Chromium aprobó `verify:button-classes`: 18 variantes autónomas, 152 pares de estilos en claro/oscuro, estados y reordenamiento. Comprobaciones específicas de los cinco tonos: borderStyle solid, ancho 1px, color igual al token, texto/fondo/spinner/icono de modal con tokens correctos.
- Build legado y documentación aprobados (77 páginas a las 00:50:15). Demos/código en «Sutiles con borde de color» antes de Tamaños; README raíz, README del paquete y CHANGELOG actualizados.
- `dg-btn` sigue siendo sólido primary mediano. Se admiten modificadores de tamaño sin `dg-btn` adicional. Sin publicación ni cambios de API Stencil.

## Variante sutil — cerrada el 2026-11-02 00:47:08 (UTC−06:00)

Decisión explícita del usuario: **mantener default sólido y añadir una variante sutil**. Inicio registrado: 00:45:15. No cambiar `dg-btn` a gris como default.

- Nueva clase autónoma `dg-btn-subtle`: fondo `--dg-surface-3`, texto `--dg-text`, hover/foco con `--dg-border`, estados disabled preservados. En claro es gris claro/texto negro; en oscuro se adaptan ambos tokens.
- Spinner sutil usa color de texto para conservar contraste. Los iconos sutiles del footer de modal se excluyen de la regla que fuerza color de los botones sólidos.
- Variante incluida en el selector explícito Sass y en `button-selector.js`; tamaños y grupos funcionan sin clase base adicional.
- `verify:button-classes` aprobó en Chromium: **13 variantes / 112 pares**, temas claro/oscuro, estados, grupos, enlaces/inputs y reordenamiento. Comprobaciones específicas de subtle: superficie distinta del default, texto y spinner con tokens correctos, icono de modal con contraste.
- Build legado aprobado, assets copiados a documentación y Astro aprobado (77 páginas a las 00:47:02). README raíz, README del paquete, CHANGELOG y demos/código de botones actualizados. Valores por defecto se conserva antes de Variantes.
- `dg-btn` sigue siendo primary sólido/mediano; `dg-btn-subtle dg-btn-sm` es la forma corta para sutil pequeño. No hubo publicación ni cambios en API Stencil.

## Orden de documentación de botones — 2026-11-02 00:43:19 (UTC−06:00)

Por solicitud del usuario, el bloque «Valores por defecto» con la demo y código de `dg-btn` se movió inmediatamente antes de «Variantes de estilo» en `docs/src/pages/componentes/buttons.astro`. Se conservó un único bloque y su contenido. Verificado el orden en la fuente y los espacios de los archivos editados; no cambió CSS ni comportamiento.

## Contrato default de botón — cerrado el 2026-11-02 00:42:41 (UTC−06:00)

Aclaración del usuario: `dg-btn` solo debe dar un botón completo con apariencia primary y tamaño mediano por defecto.

- El CSS ya aplica los mismos colores y medidas a `dg-btn` y `dg-btn-primary`; no fue necesario cambiar esos estilos. Se documentó explícitamente en comentarios y ejemplos.
- Se corrigió la descripción previa de «neutro» en README raíz, README del paquete y página de botones. Ejemplo mínimo: `<button class="dg-btn">Guardar</button>`; las clases adicionales solo cambian opciones.
- `verify-button-classes` incluye ahora una comparación explícita default vs primary en claro y oscuro: **104 pares aprobados**, junto con variantes, estados, contenedores y reordenamiento.
- Astro: 77 páginas compiladas a las 00:42:31. Sin publicación; se preservan las APIs de Stencil.

## Clases de botones simplificadas — cerrado el 2026-11-02 00:39:52 (UTC−06:00)

Solicitud: reducir `dg-btn dg-btn-primary dg-btn-sm`; hacer innecesaria la clase base cuando ya hay variante. Inicio registrado: 00:35:38.

- Las 12 variantes CSS incluyen ahora la base. Ejemplo canónico: `<button class="dg-btn-primary dg-btn-sm">Guardar</button>`. `dg-btn` sigue disponible como neutro y el marcado anterior continúa funcionando. Tamaños, ancho, iconos y efectos siguen siendo modificadores; solos no sustituyen una variante.
- Selector explícito `:is(...)` centralizado en `core/src/scss/abstracts/_buttons.scss`, reutilizado en botones, grupos, loading, formularios, modales, drawer y presentación flat. No se usa un selector de prefijo que pudiera estilizar contenedores `dg-btn-group` por accidente.
- `core/src/js/button-selector.js` y `reorder.js` reconocen variantes autónomas para reordenamiento; mantener la lista explícita JS alineada con Sass al agregar variantes.
- `core/scripts/verify-button-classes.mjs` y comando raíz `npm run verify:button-classes`: 103 pares de estilos antigua/nueva sintaxis, 12 variantes, claro/oscuro, hover, disabled/is-disabled, loading, tamaños, enlaces, inputs, grupos y contenedores; reordenamiento por teclado sin clase base. **Aprobado en Chromium**.
- Build legado CSS/JS/iconos aprobado; copia actualizada para Astro y build de documentación aprobado (77 páginas, 00:38:19).
- Documentación de botones muestra la sintaxis corta y explica los modificadores. README raíz, README del paquete y CHANGELOG actualizados. Otros ejemplos antiguos siguen siendo compatibles; no se hizo una sustitución masiva de sus clases.
- Cambio de la API CSS heredada; los Web Components Stencil y sus adaptadores conservan su API. Se preservan los avances de fase 5 y `dgarz-input` ya presentes.
- La prueba en Node puede mostrar MODULE_TYPELESS_PACKAGE_JSON al importar el selector ESM de `src/js`; no cambia el resultado. No convertir todo `core/package.json` a type=module para silenciarlo, porque el paquete conserva artefactos UMD heredados.
- Comprobación de espacios de los archivos de este ajuste aprobada; `package-lock.json` no fue modificado en esta intervención.

## Alineación izquierda — cerrada el 2026-11-02 00:34:16 (UTC−06:00)

Se retomó la solicitud de aplicar el mismo límite visible al lado izquierdo. Inicio registrado: 00:32:07.

- La caja de la marca empezaba en la tangente, pero Newsreader deja un pequeño espacio interno antes del trazo de la «d». En móvil se compensa con `.pub-nav .pub-brand { margin-inline-start: -.035em; }` en `docs/src/styles/site-header.css`.
- Ajuste limitado al header: no se mueve la marca del footer ni se cambia el escritorio. Se conserva el criterio A (inset = radio de 55px), los controles circulares, iconos de 12px y compensación derecha de −9px.
- Astro: 77 páginas compiladas a las 00:33:47. Chromium sobre portada y `/comenzar/install/`, a 320/390/768/860px, con menú abierto/cerrado: borde izquierdo del glifo medido con la fuente cargada y borde derecho del path/stroke SVG coinciden con sus tangentes (desviación <0.6px). Margen del logo en escritorio = 0px; sin errores de página.
- `git diff --check` sobre los archivos del ajuste no reportó errores. La comprobación global señala un espacio final preexistente en `package-lock.json:1646`, archivo no modificado en esta intervención.
- Prueba temporal: `/private/tmp/dgarz-check-both-edges.mjs`. Si se cambia la tipografía/peso de la marca, revisar de nuevo su compensación óptica.
- Regla de ambos extremos reflejada en `ARCHITECTURE.md` y `docs/README.md`. Los avances posteriores de fase 5 y los cambios de modal/controles ya existentes se preservaron.

## `dg-btn-group` como footer flotante — 2026-11-02 01:27:52 (UTC−06:00)

- `.dg-btn-group` deja de unir botones a ras; ahora es cápsula flotante (blur, borde, radius xl, gap) alineada con `.dg-modal-footer`.
- Botones conservan pill individual + hover scale del footer.

## Docs botones + `dg-btn-text` — 2026-11-02 01:20:05 (UTC−06:00)

- Docs: quitadas secciones Ghost y Ancho completo; añadida «Solo texto».
- Nueva familia `dg-btn-text` / `dg-btn-text-{primary,success,warning,danger,info}`: sin relleno, borde inferior sólido, tipografía tipo enlace. Exenta en `_flat.scss`.
- `button-selector.js` alineado con abstracts (incluye outline + text).

## Tokens semánticos más vivos — 2026-11-02 01:12:15 (UTC−06:00)

Solicitud: sólidos menos apagados / más coloridos.

- `_tokens.scss` light: success `#16a34a`, warning `#d97706`, danger `#dc2626`, info `#2563eb` (+ subtle/light/dark alineados).
- Dark: success `#22c55e`, warning `#f59e0b`, danger `#ef4444`, info `#3b82f6`.
- Primary sigue monochrome (`--dg-solid`). CSS legacy reconstruido.

## Botones sutiles y outline — 2026-11-02 01:08:52 (UTC−06:00)

Solicitud del usuario: sutiles como sólidos pero crema/claros; outline con borde sólido, sin fondo, relleno sutil en hover.

- `_buttons.scss`: `.dg-btn-subtle*` usa `--dg-*-subtle` / `--dg-on-*-subtle`. `.dg-btn-outline*` usa borde `1.5px solid` del tono, fondo transparente y fill sutil solo en `:hover`/`:focus-visible`. Nuevas clases `dg-btn-outline-{primary,success,warning,danger,info}`.
- **Fix:** `_flat.scss` quitaba TODOS los bordes con `border: none !important` y solo exceptuaba sutiles; por eso los outline no mostraban borde. Ahora también exceptúa `#{button.$outline-selector}`.
- Docs `/componentes/buttons` actualizadas; sección «Sutiles con borde» absorbida por Outline.
- `npm run build:legacy` y docs reconstruidos.

## Criterio A del límite curvo — cerrado el 2026-11-02 00:05:37 (UTC−06:00)

Decisión explícita del usuario: **opción A**, restaurar la tangente. Sustituye el conflicto abierto de las 15:33:31 del 2026-11-01. Validado a las **00:07** (UTC−06:00).

- `docs/src/styles/site-header.css`: `--pub-nav-inset: var(--pub-nav-radius)` (55px). Compensación óptica `margin-inline-end: -9px` para icono 12px en caja 30px.
- `core/src/scss/components/_modal.scss`: `--dg-modal-header-inset` = `max(48px, safe-area)`. Cierre/resize con `right: calc(inset - 9px)`.
- `ARCHITECTURE.md` y `docs/README.md` actualizados con geometría actual y la prohibición de volver a 32px sin nueva decisión.
- No confundir con el círculo visible de 22px: el límite es el **trazo del icono**.
- `npm run build:legacy` y `npm run build:docs` aprobados (76 páginas).
- Chromium sobre `docs/dist`: portada y `/comenzar/install/` a 320/390/768/860px; borde del path SVG vs tangente con |delta| &lt; 0.001px; inset = radius = 55. Modal full `#mdFull` a 390px: `right: 39px` (= 48−9) y borde esperado del icono vs tangente con delta ≈ 0.

## Fase 5 paso 1 — hydrate DSD del piloto — 2026-11-02 00:12:00 (UTC−06:00)

- Output `dist-hydrate-script` en `core/stencil.config.ts` → `dist/hydrate`.
- Export público `dgarz-design/hydrate` (solo servidor; `import` → `index.mjs`, `require` → `index.js`). Limpieza en `build-components --clean`.
- `core/scripts/verify-hydrate.mjs` + `npm run verify:hydrate`: `renderToString` con `serializeShadowRoot: 'declarative-shadow-dom'`, 4 componentes, template `shadowrootmode="open"`, hidratación Chromium sin duplicar «Continuar», un solo `button` nativo, `dgarz-click` una vez, disabled/loading sin clics extra.
- **Aprobado.**

## Fase 5 paso 2 — Astro estático con DSD — cerrado 2026-11-02 00:14:58 (UTC−06:00)

- Página `/comenzar/core` y componente `docs/src/components/DgarzCoreDemo.astro`: SSR con `dgarz-design/hydrate` en el build de Astro; cliente registra Custom Elements desde `/dist/index.mjs`.
- `docs/astro.config.mjs`: `ssr.external` para hydrate; middleware de dev sirve `.mjs`.
- Nav, intro y frameworks enlazan la demo. `npm run build:docs` → **77 páginas**.
- `npm run verify:hydrate --workspace=docs` / `npm run verify:astro-hydrate`: HTML con `shadowrootmode="open"`, hidratación Chromium sin duplicar etiqueta, un clic en Continuar, disabled/loading sin clics extra.
- **Aprobado.**

## Fase 5 paso 3 — Next.js App Router — cerrado 2026-11-02 00:18:42 (UTC−06:00)

- `scripts/verify-next-hydrate.mjs` + `npm run verify:next-hydrate`: consumidor temporal App Router 15.5, `renderToString` + DSD en Server Component, cliente con `defineCustomElements`, `serverExternalPackages: ['dgarz-design']`.
- Chromium: respuesta cruda con `shadowrootmode="open"`, sombra viva, un solo botón nativo, un `dgarz-click`, disabled/loading sin clics extra.
- **Aprobado** para el puente Core hydrate en Next. El adaptador `dgarz-design-react` no declara SSR propio (sin `hydrateModule` en el output target instalado).

## Fase 6 paso 1 — `dgarz-input` — cerrado 2026-11-02 00:30:30 (UTC−06:00)

- Nuevo `core/src/components/input/`: texto nativo en Shadow DOM; props `type`, `value`, `label`, `placeholder`, `name`, `disabled`, `readonly`, `required`, `invalid`, `autocomplete`; eventos `dgarz-input` y `dgarz-change` con `detail` string.
- Tokens de campo en `tokens.css`: `--dgarz-color-field-*`, `--dgarz-color-danger`, `--dgarz-color-text-muted`, `--dgarz-radius-field`.
- Etiqueta envuelta en `<label>` (sin ids aleatorios) para SSR/hidratación estables.
- 5 pruebas Vitest + historias Storybook. Typecheck, `npm test` (12), `verify:wrappers`, `verify:hydrate` (5 CE) y `verify:astro-hydrate` aprobados.
- Demo `/comenzar/core` incluye el campo. FACE / envío nativo de formularios **no** implementados en esta etapa.
- `build:storybook` falló aquí por `EPERM` al escanear `~/Downloads` (host); las stories existen y pasan typecheck. Reintentar Storybook fuera de ese bloqueo.
- Próximo: migrar otro componente (p. ej. textarea/select o card) o confirmar el grupo reordenable.

## Grupo de botones reordenable — 2026-11-01 15:54:44 (UTC−06:00)

- `core/src/js/reorder.js` y `data-dg-reorder` en `.dg-btn-group`, solo en la capa heredada; `dgarz-button` no cambia. Es una incorporación al catálogo por migrar en la fase 6.
- Interpretación: el usuario pidió «botones múltiples»; ese componente no existe y se aplicó a «Grupo de botones». Pendiente de confirmar.

## Breadcrumb fijo y header oculto en documentación — 2026-11-01 15:48:10 (UTC−06:00)

Solicitud explícita del usuario; **sustituye** los criterios de «Scroll del breadcrumb» y «ocultamiento solo en la portada» registrados abajo.

- `.doc-breadcrumb` es sticky. `--doc-header-offset` (60px, o 0 con `.pub-nav.is-hidden`) mueve breadcrumb y sidebar con la misma transición del header.
- `DocsLayout` activa `hideOnScroll`. El script de `SiteHeader` ya no sale antes de tiempo sin botón principal; no oculta el header con el índice móvil abierto.
- `theme-color` usa `--dg-paper` con el header visible y el fondo de la página con el header oculto.

## Ajustes visuales y revisión de la migración — 2026-11-01 15:33:31 (UTC−06:00)

**Conflicto resuelto el 2026-11-02 (criterio A):** el límite volvió a la tangente. El cambio a 32px de esta entrada queda invalidado; ver el bloque «Criterio A del límite curvo» arriba.

- `_modal.scss`: `--dg-modal-header-inset` de 32px en `.dg-modal-full`, con áreas seguras; título sin solaparse con los botones. Medido a 390/768/1280px.
- `site-header.css`: `--pub-nav-inset` de 32px bajo 861px; header sólido `--dg-paper` en todos los anchos.
- `SiteHeader.astro`: `theme-color` sincronizado con `--dg-paper` en portada y documentación; se quitó la sincronización de `DocsLayout`. Validado el valor en Chromium, no en un teléfono real.
- Botones del header: círculo de 22px, icono de 12px, caja de 30×36px (con 42px el header crecía a 66px), compensación de -4px. Sustituye los 36px, 20px y -8px descritos abajo. Tema con el tinte de `.dg-btn-outline` y menú con `--dg-solid`.
- Revisión de la migración: **no terminada**. `npm test` aprobó 7 pruebas. No se ejecutó `npm run typecheck` porque reconstruye `core/dist/components` con el watch de Stencil activo. Fases 5 a 8 sin cambios: pendientes.
- Próximo paso: resolver el conflicto del límite y seguir con la fase 5.

## Alineación óptica — cerrada el 2026-11-01 14:42:47 (UTC−06:00)

Respuesta explícita del usuario: **el borde visible del último icono del header debe terminar en la línea roja**, es decir, en la tangente interior de la curva. No se alinea la caja del botón ni se añade un borde dibujado.

- `SiteHeader.astro` usa un grupo propio `.pub-actions` en lugar de depender de utilidades para su posición. Botones de 36px, iconos de 20px y compensación móvil de -8px para el espacio vacío interior.
- Menú y cierre usan SVG con viewBox `3 3 18 18`, trazo redondeado y límites de dibujo equivalentes. `DocsLayout` usa los mismos límites al cambiar el path de hamburguesa a cierre.
- **Hallazgo del servidor real:** la plantilla nueva ya llegaba al navegador, pero las reglas `.pub-actions` no estaban en sus stylesheets; el grupo aparecía como bloque y sin margen automático. Se extrajo todo el CSS compartido a `docs/src/styles/site-header.css` y se importa desde el componente. Esto resolvió la discrepancia; no bastaba con validar el build estático.
- Validación sobre `http://192.168.100.6:4321`: Chromium midió el borde del path SVG incluyendo el stroke frente a la tangente. Diferencia menor a 0.6px, tanto hamburguesa como cierre, en portada y documentación a 320/390/768/860px. Áreas pulsables de 36px conservadas; sin errores de página.
- Astro generó 76 páginas a las 14:42:22. Capturas revisadas en `/private/tmp/dgarz-optical-home.png` y `/private/tmp/dgarz-optical-docs.png`; prueba temporal `/private/tmp/dgarz-check-optical-header.mjs`.
- `ARCHITECTURE.md` y `docs/README.md` reflejan la aclaración: el trazo visible se alinea; la zona pulsable puede extenderse dentro del header. Esto sustituye el criterio anterior de mantener la caja completa antes de la tangente.
- Fase 5 continúa pendiente; no hubo cambios de migración en este ajuste visual.

## Aclaración anterior del límite — 2026-11-01, revisión posterior al cierre de scroll

El usuario sigue sin ver el límite esperado y adjuntó nueva captura. Se inspeccionó el servidor real `http://192.168.100.6:4321/comenzar/install` en Chromium a 390px: header 390x60, padding lateral 55px y radio 55px; la regla está servida, no es solamente un cambio sin cargar.

Se pidió aclarar si la línea roja marca el borde visible del último icono o también el borde del contenido de la página. **Resuelto posteriormente:** el usuario eligió el borde visible del último icono. No dibujar una línea en la interfaz. No se modificó CSS en esta revisión. La prueba anterior solo comprobaba que el área de los botones quedara dentro del límite, no que el trazo visible del último icono se alineara exactamente con él.

## Scroll del breadcrumb — cerrado el 2026-11-01 14:07:46 (UTC−06:00)

Solicitud: el contenedor de la ruta debe pasar detrás del header. Inicio registrado: 14:07:05.

- En `DocsLayout.astro`, `.doc-breadcrumb` deja de usar `position: sticky`, `top: 60px` y z-index propio. Ahora permanece en el flujo con posición relativa y se desplaza junto al contenido bajo el header fijo.
- No reintroducir una segunda franja fijada debajo del header; conservarla en la ubicación inicial de la página y permitir que desaparezca al hacer scroll.
- Astro: 76 páginas compiladas a las 14:07:15. Chromium a 1280px y 390px confirmó que el breadcrumb sube al hacer scroll mientras el header permanece en y=0 y lo cubre (comprobado mediante hit testing).
- `git diff --check` sin errores. La fase 5 sigue pendiente.

## Límite de contenido en curvas — cerrado el 2026-11-01 14:06:16 (UTC−06:00)

Referencia visual del usuario: iconos y contenido deben terminar antes de la curva, en su tangente interior. Inicio registrado: 14:05:05.

- El padding móvil de 16px invadía esa zona con radio de 55px. `SiteHeader.astro` vincula ahora padding-left/right a `max(--pub-nav-radius, safe-area-inset correspondiente)`.
- Criterio aplicado entonces: límite de toda el área pulsable. **Sustituido por la aclaración del usuario de las 14:38:06:** alinear el borde visible del icono; la caja pulsable puede extenderse dentro del header. El escritorio sin curvas conserva su alineación con el shell.
- Regla registrada en `docs/README.md` y `ARCHITECTURE.md`; no volver a reducir el inset por debajo del inicio de la curva para ganar espacio.
- Build Astro aprobado: 76 páginas a las 14:05:36. Chromium aprobó límites geométricos de marca y botones a 320/390/768/860px en portada y documentación, menú único, apertura/cierre, enlaces y tema, sin errores de navegador.
- La fase 5 de migración continúa pendiente.

## Menú móvil unificado — cerrado el 2026-11-01 14:04:29 (UTC−06:00)

Solicitud: eliminar la confusión de dos hamburguesas. Inicio registrado: 14:03:16.

- La documentación tenía el botón principal compartido y otro para el índice. `SiteHeader` ahora acepta `showMainMenu` (true por defecto); `DocsLayout` lo desactiva y conserva solo su control del panel lateral.
- Inicio y Changelog se incluyen en la parte superior del panel lateral móvil junto con todas las secciones. La portada conserva su único menú principal.
- El script del header tolera que no exista su botón principal. Se mantienen el tema, Escape, aria-expanded/aria-controls y la entrada `/comenzar/intro`.
- Build Astro aprobado: 76 páginas a las 14:03:47. Chromium aprobó exactamente un botón de menú visible por página en móvil, enlaces principales dentro del índice, abrir/cerrar con Escape, tema y enlaces de escritorio, sin errores de navegador.
- Este cierre reemplaza el diseño anterior de dos controles en móvil; no reintroducir un segundo botón al compartir el header. La fase 5 continúa pendiente.

## Ajuste de escritorio — cerrado el 2026-11-01 14:01:35 (UTC−06:00)

Solicitud: mejorar el aspecto en PC según captura del encabezado de documentación sobre código. Inicio registrado: 14:00:33.

- `SiteHeader.astro` usa ahora, desde 861px, una barra a ancho completo, fondo sólido `--dg-paper`, sin blur/backdrop-filter ni esquinas de cápsula. El padding alinea su contenido con el shell de 1320px de documentación.
- La portada y documentación siguen usando el mismo componente y enlaces. Por debajo de 861px se conserva el diseño móvil anterior.
- Se evita que código u otros fondos se vean a través de la cabecera o por sus huecos laterales.
- Astro: 76 páginas compiladas a las 14:01:03. Chromium: ancho completo, radio cero, fondo opaco, ausencia de backdrop-filter, tema y navegación/índice móvil aprobados sin errores de navegador.
- Captura revisada: `/private/tmp/dgarz-desktop-header-after.png` en la página de instalación; recurso temporal. `git diff --check` sin errores.
- La fase 5 sigue pendiente; este ajuste es exclusivamente de presentación de la documentación y portada.

## Corrección del título — cerrada el 2026-11-01 13:58:23 (UTC−06:00)

Reporte del usuario: trazos incompletos en «design» en Safari. Inicio registrado: 13:55:56.

- Se quitó el `clip-path` de `.pub-word` en `docs/src/pages/index.astro` y se dejó overflow visible. Cada letra animada tiene padding inline de `.18em` y margen negativo equivalente para dar espacio a los trazos cursivos sin cambiar los avances de texto.
- Se conservaron la animación escalonada, tipografía Newsreader, colores, tamaño y soporte de movimiento reducido.
- Build Astro aprobado: 76 páginas a las 13:56:53.
- Comprobación visual y de CSS en Chromium aprobada a 1680px y 390px: fuente Newsreader cargada, texto «design» completo, sin máscara de recorte, sin desbordamiento horizontal y sin errores de navegador. Capturas revisadas en `/private/tmp/dgarz-title-desktop.png` y `/private/tmp/dgarz-title-mobile.png` (temporales).
- **Límite:** se descargó WebKit de Playwright, pero su ejecutable sufrió un fallo nativo (segmentation fault) antes de crear la página. No se pudo verificar Safari/WebKit aquí; no declarar esa comprobación aprobada. Si el recorte persiste en Safari real, revisar también los límites de pintura de los spans transformados, usando la captura del usuario como referencia.
- La fase 5 de migración sigue pendiente; este paso solo corrigió la portada.

## Ajuste de navegación — cerrado el 2026-11-01 13:55:17 (UTC−06:00)

Solicitud: mismo menú en index y documentación. Inicio registrado: 13:52:20.

- Menú de portada extraído a `docs/src/components/SiteHeader.astro`; portada y `DocsLayout` consumen el mismo componente, enlaces, CSS, tema y menú móvil.
- La entrada del logo, «Inicio» y «Documentación» sigue en `/comenzar/intro`. El enlace activo usa `currentHref` de cada página.
- Documentación conserva como acción adicional su botón móvil del índice; se ajustaron offsets de sidebar/contenido al header de 60px. El ocultamiento al bajar sigue activado únicamente en la portada para mantener estable el índice de documentación.
- Build Astro aprobado: 76 páginas a las 13:52:59. Comprobación manual automatizada en Chromium aprobó igualdad de enlaces/dimensiones/radio del menú de escritorio, tema en ambas páginas, abrir/cerrar con Escape en móvil e índice de documentación, sin errores de navegador.
- Se eliminaron el marcado, estilos y script duplicados de las páginas consumidoras. La comprobación de navegador se ejecutó con `/private/tmp/dgarz-check-header.mjs`; es un recurso temporal y puede caducar.
- No se inició fase 5: el siguiente paso de migración sigue siendo SSR/DSD e hidratación.

## Última intervención — fase 4 cerrada el 2026-11-01 a las 13:50:58 (UTC−06:00)

Inicio registrado: **13:42:11**. Solicitud: continuar con lo demás de la migración. **Resultado:** adaptadores cliente del piloto generados, empaquetados y validados para los tres frameworks; no hay corrección de este paso a medias.

- Nuevos workspaces `packages/react`, `packages/vue`, `packages/angular`: paquetes `dgarz-design-react`, `dgarz-design-vue` y `dgarz-design-angular`, todos locales `2.0.0-alpha.0`, sin publicar.
- Output targets oficiales de Stencil: React 1.7.0, Vue 0.14.7 y Angular **1.1.0 fijado exactamente**. No escribir a mano la lógica de los wrappers.
- Core cambia a `single-export-module`; mantiene registro automático raíz y `defineCustomElements`, y expone `components`, los submódulos por componente y `component-docs.json`.
- Metadatos Stencil normalizados sin timestamp para reproducibilidad; no son un CEM estándar. El verificador compara ahora también los fuentes de wrappers generados entre dos builds aislados.
- `npm run build` compila Core, legado y los tres wrappers. React/Vue usan TypeScript; Angular usa ng-packagr con APF/compilación parcial y componentes standalone.
- `scripts/verify-wrappers.mjs` y `tests/consumers/` verificaron los tarballs instalados en un consumidor limpio: TypeScript **sin skipLibCheck**, tipos negativos, plantillas Angular estrictas y Chromium para React/Vue/Angular (variante, disabled/loading, evento, restauración y teclado).
- `verify:package` volvió a aprobar: builds aislados reproducibles, generación reproducible de wrappers, tarball del Core, Node, tipos y Chromium. Typecheck, 7 tests del Core, Storybook y Astro (76 páginas) aprobaron.
- Guía nueva: `http://192.168.100.6:4321/comenzar/frameworks`, enlazada desde el catálogo; la entrada continúa en `/comenzar/intro`. La introducción distingue ahora el nuevo Core de su referencia heredada.
- **Siguiente fase: 5, SSR/DSD e hidratación**. Next.js específico, SSR, CEM estándar, otros componentes y auditorías siguen pendientes; no confundir adaptador React cliente con compatibilidad SSR de Next.js ya probada.

### Correcciones específicas que deben preservarse

- La última versión del generador Angular probada generaba emitters sin enlazarlos al evento del Web Component y un helper booleano que no compilaba. Se fijó 1.1.0, se regeneró y se validaron eventos y booleanos explícitos. Actualizar solo con los consumidores completos pasando.
- El índice de declaraciones emitido por Stencil apuntaba a `../types/button/button`, una ruta no emitida. El postbuild reexporta constructores DOM desde las declaraciones adyacentes al JS y agrega extensiones `.js` a imports relativos para NodeNext. No editar `dist` a mano ni ocultar el problema con `skipLibCheck`.
- Los tipos del runtime oficial Vue referencian Vue Router; `dgarz-design-vue` lo declara como peer. Esto no añade un framework al runtime del Core.
- El runtime oficial React usa `@lit/react` como puente de propiedades/eventos. El Core sigue implementado con Stencil; no usa LitElement y no depende de React como runtime.
- Se normalizó la carpeta temporal con `realpath` en el verificador de wrappers por el alias `/var`/`/private/var` de macOS. Sin ello Vite fallaba al emitir HTML.
- La verificación del Core resuelve ahora tanto dependencias hoisted como dependencias locales de `core/node_modules` en su snapshot aislado; fue necesario al fijar el generador Angular.

## Ajuste de entrada de documentación — 2026-11-01 13:40:32 (UTC−06:00)

- El usuario fijó como entrada `http://192.168.100.6:4321/comenzar/intro`. Usar esta URL al compartir la documentación local.
- La ruta interna es `/comenzar/intro`: logo e «Inicio» del catálogo y «Empezar» de la portada apuntan allí. Los accesos «Documentación» ya usaban esa ruta.
- README raíz, README del paquete y README de docs incluyen la entrada. Se conserva la portada `/`; no se cambió el dominio de producción por una IP privada.
- Astro ya escuchaba en `0.0.0.0:4321`; se añadió `vite.server.strictPort` para evitar que cambie silenciosamente de puerto.
- Validación: `npm exec --workspace=docs -- astro build` aprobó y generó 75 páginas a las 13:40:32. No se verificó conectividad desde otro dispositivo de la LAN.
- La fase 3 continúa cerrada; la siguiente fase de migración sigue siendo la 4 (wrappers).

## Intervención anterior — cerrada el 2026-11-01 a las 13:39:39 (UTC−06:00)

**Solicitud:** continuar la migración por pasos verificables. **Resultado:** fase 3 validada para el Core piloto; no hay corrección de este paso a medias.

- Nuevo `core/scripts/verify-package.mjs` y comando raíz `npm run verify:package`.
- Dos builds de producción en una copia aislada resultaron idénticos; el tarball se instaló offline como único paquete del consumidor temporal.
- Exports, import Node, tipos válidos/inválidos y registro/comportamiento del paquete instalado aprobados en Chromium 156.0.8078.4.
- Build explícito `--prod`, limpieza de tipos generados y reconstrucción mediante `prepack`.
- `npm run typecheck`, las 7 pruebas de `npm test` y `git diff --check` aprobados después de los cambios.
- Siguiente paso: fase 4, generación de wrappers desde Stencil. Leer el bloque «Próximo paso recomendado» antes de continuar.

## Estado actual en una lectura

La implementación heredada era SCSS con JavaScript global y tokens `--dg-*`. Se añadió un Core independiente con **Stencil.js y TypeScript**, componentes con Shadow DOM, CSS estándar y tokens `--dgarz-*`. Solo está migrado el piloto **`dgarz-button`**.

El import raíz registra los Custom Elements compilados. La API de comportamiento anterior se conserva en `dgarz-design/legacy`; los subpaths y artefactos CSS/JS anteriores siguen disponibles. El cambio de la API raíz es incompatible y requiere una versión mayor antes de publicar.

Los wrappers cliente para React 19, Vue 3.5 y Angular 20.3 están implementados y probados. El Core incluye **`dgarz-button`** y **`dgarz-input`**, con **`dgarz-design/hydrate` DSD** verificado en HTML/Node, Astro (`/comenzar/core`) y Next.js App Router. El catálogo heredado restante sigue en fase 6. La documentación Astro conserva mayormente la referencia 1.x y ya incluye frameworks + Core SSR.

## Fases y criterios de terminación

| Fase | Estado | Entregado o trabajo pendiente | Criterio para terminar |
| --- | --- | --- | --- |
| 0. Contrato arquitectónico | Definido | Stencil.js oficial; `dgarz-design`; Shadow DOM; CSS puro; tokens `--dgarz-*`; wrappers generados; objetivo SSR/DSD | Mantener estas decisiones en configuración, código y documentación |
| 1. Base y componente piloto | Implementada | Compilador Stencil, distribución ESM, tipos, tokens claro/oscuro y `dgarz-button` | Build del Core y comportamiento del piloto verificados; logrado en esta sesión |
| 2. Catálogo y calidad inicial | Implementada con límites | Storybook con Controls y cinco historias; Vitest + jsdom + Testing Library; 7 pruebas | Tipos, pruebas y catálogo compilan; Chromium del paquete instalado ya verificado; faltan auditoría de accesibilidad y otros navegadores |
| 3. Distribución y compatibilidad | Validada para el piloto | Tarball instalado en consumidor limpio; exports/tipos/Node y Chromium aprobados; dos builds aislados idénticos | Logrado con `verify:package`; ampliar la verificación al incorporar wrappers y nuevos componentes |
| 4. Wrappers multitecnología | Validada para el piloto cliente | React 19, Vue 3.5 y Angular 20.3 generados oficialmente; metadatos Stencil | Generación reproducible, paquetes instalados, tipos, plantillas, propiedades, booleanos, eventos y teclado aprobados; Next.js se verifica en fase 5 |
| 5. SSR, DSD e hidratación | Cerrada para el piloto | Hydrate Core + Astro + Next App Router verificados | Ampliar a nuevos componentes al migrarlos; Vue/Angular SSR no cubiertos |
| 6. Migración del catálogo | En curso | `dgarz-input` migrado además de `dgarz-button` | Cada componente migrado tiene contrato, CSS encapsulado, tokens, pruebas, stories y documentación |
| 7. Documentación, accesibilidad y rendimiento | Pendiente | Ejemplos Astro del Core, guía de migración, auditorías y mediciones | Ejemplos funcionales, navegación por teclado/tecnologías de asistencia verificadas y métricas con criterios explícitos |
| 8. Preparación de lanzamiento | Pendiente | CI, revisión de compatibilidad, contenido del paquete y notas de versión | Checks reproducibles y revisión de la versión; publicación únicamente cuando el usuario la solicite |

## Bitácora de correcciones

Fecha de todos los eventos de esta tabla: **2026-11-01**, zona **America/Mexico_City (UTC−06:00)**.
Las horas indicadas como evidencia provienen de la salida de herramientas. Cuando no existe una hora individual fiable, se consigna la hora de registro de este documento; no representa el momento exacto de la edición.

| Hora o referencia | Corrección / avance | Resultado |
| --- | --- | --- |
| Hora individual no registrada; asentado a las 13:32:53 | Se detectó que el repositorio era un framework de SCSS/JS global, sin Web Components, Storybook ni pruebas del nuevo Core | Se acordó migración por etapas conservando la implementación heredada |
| 13:29:03, evidencia de ejecución de pruebas | Primera base realizada inicialmente con Lit; se corrigió un import usado solo como tipo que no registraba el componente durante las pruebas | 7 pruebas pasaron en esa implementación inicial. **Esta implementación fue sustituida; no retomarla** |
| Hora individual no registrada; asentado a las 13:32:53 | Se corrigió la conservación de módulos con registro de Custom Elements frente al tree shaking | Se declararon los efectos secundarios relevantes para evitar que el catálogo eliminara el registro |
| Corrección solicitada explícitamente por el usuario; asentada a las 13:32:53 | Se sustituyó Lit por Stencil.js | Componente TSX con `@Component`, `@Prop`, `@Event`; estilos en `button.css`; compilación `dist-custom-elements` |
| 13:31:27, evidencia de ejecución de pruebas | Se adaptaron las pruebas para importar la salida compilada de Stencil y esperar actualizaciones asíncronas | 7 pruebas aprobadas con Stencil, incluyendo activación por teclado |
| 13:31:48–13:31:51, evidencia de builds | Se ajustaron tipos/configuración y Storybook al renderizador HTML, eliminando la dependencia de Lit | Typecheck aprobado y catálogo compilado con Custom Elements de Stencil |
| 13:32:14, evidencia del build de Astro | Se verificó que la nueva compilación pudiera coexistir con la documentación y los artefactos heredados | Build completo del Core y de Astro; 75 páginas generadas |
| Hora individual no registrada; asentado a las 13:32:53 | Se detectó en un dry run que faltaba `dist/components` en el contenido npm; se cambió `files` a `dist/**/*` | Dry run posterior incluyó JS, declaraciones y `package.json` ESM de los componentes |
| Hora individual no registrada; asentado a las 13:32:53 | Se verificó el import público en Node y el consumo aislado de las declaraciones de tipos | `defineCustomElements` disponible; tipos del elemento, variante y evento compilados en una prueba temporal |
| 13:32:53, hora de registro | Se documentaron las fases, límites y pendientes para continuidad entre agentes | Este archivo; no se ejecutaron nuevamente los builds solo por agregar documentación |
| 13:36:52, inicio registrado | Se reanudó la fase 3 y se guardó el paso activo antes de editar | Continuidad documentada desde el comienzo |
| 13:38:57, checkpoint | Verificador aislado, producción reproducible, instalación y tipos aprobados; puerto local bloqueado por sandbox en el primer intento | Se solicitó ejecución con acceso para servidor local y Chromium; el reintento fue autorizado |
| Antes del cierre de las 13:39:39 | Verificación completa del tarball en Chromium 156.0.8078.4 | Etiqueta, teclado, eventos, carga, tokens, Shadow DOM y API legacy aprobados |
| 13:39:27, ejecución de pruebas | Se comprobaron de nuevo tipos y pruebas del Core tras ajustar el build | Typecheck aprobado y 7 tests aprobados |
| 13:39:39, cierre registrado | Se cerró fase 3 y se documentó el próximo paso | Sin publicación ni commits; fase 4 pendiente |
| 13:42:11, inicio registrado | Se inició la fase 4 con checkpoint antes de modificar código | Paquetes separados para mantener agnóstico el Core |
| Durante fase 4; registrado a las 13:50:58 | Se corrigieron generador Angular/eventos, tipos públicos de Stencil y peer Vue Router; se normalizaron rutas temporales de macOS | Consumidor sin skipLibCheck y plantillas Angular estrictas aprobados |
| 13:49:13, ejecución de tests | Se verificó de nuevo el Core después de habilitar adaptadores | Typecheck y 7 tests aprobados |
| 13:50:48, build de documentación | Se añadió la guía de frameworks y se aclaró el estado del Core en la introducción | 76 páginas Astro generadas |
| 13:50:58, cierre registrado | Se cerró fase 4 para el piloto cliente | Tres consumidores Chromium aprobados; Core y fuentes generados reproducibles; sin publicar |

## Archivos que concentran la implementación

| Ruta | Función |
| --- | --- |
| `core/stencil.config.ts` | Namespace `dgarz`, fuente `src/components`, salida `dist-custom-elements`, exportación `single-export-module`, runtime incluido y tipos generados |
| `core/src/components/button/button.tsx` | Componente Stencil con Shadow DOM; variantes primary/secondary; disabled/loading; evento `dgarz-click` |
| `core/src/components/button/button.css` | CSS estándar encapsulado, foco visible y reducción de movimiento |
| `core/src/components/button/button.test.ts` | Pruebas del Custom Element compilado mediante Testing Library y Vitest |
| `core/src/components/button/button.stories.tsx` | Historias Primary, Secondary, Disabled, Loading y Dark; renderizado con DOM nativo |
| `core/src/components/components.d.ts` | Declaraciones generadas por Stencil; no editar manualmente |
| `core/src/tokens/tokens.css` | API de identidad `--dgarz-*`; temas claro y oscuro |
| `core/scripts/build-components.mjs` | Limpieza de componentes y tipos del Core; creación de entrada ESM, entrada de tipos y copia de tokens |
| `core/scripts/verify-package.mjs` | Copia aislada del Core, comparación de dist y wrappers generados, tarball, consumidor limpio, tipos y Chromium |
| `packages/react`, `packages/vue`, `packages/angular` | Paquetes de adaptadores; `src/generated` se ignora en Git y se regenera con Stencil |
| `scripts/verify-wrappers.mjs`, `tests/consumers` | Instalación de los cuatro tarballs en consumidor limpio, tipos y navegador para los tres frameworks |
| `docs/src/pages/comenzar/frameworks.astro` | Guía de integración de los adaptadores, accesible desde la introducción |
| `docs/src/components/SiteHeader.astro` | Menú compartido entre portada y documentación; enlaces, tema y comportamiento móvil |
| `docs/src/styles/site-header.css` | Estilos globales compartidos y alineación óptica del último icono; importados desde el componente |
| `core/tsconfig.components.json` | TypeScript/TSX y decoradores de Stencil |
| `core/tsconfig.check.json` | Comprobación adicional de componentes, historias, tests y configuración |
| `core/vitest.config.mts` | jsdom con entorno visual y selección de pruebas del Core |
| `core/.storybook/main.ts`, `preview.ts` | Storybook HTML + Vite y carga de tokens |
| `core/package.json` | Versión alpha, exports, efectos secundarios, archivos distribuibles y scripts |
| `package.json`, `package-lock.json` | Comandos del monorepositorio y resolución de dependencias |
| `core/src/scss/`, `core/src/js/`, `core/vite.config.js` | Implementación heredada que aún se conserva y compila |
| `README.md`, `core/README.md`, `CONTRIBUTING.md`, `ARCHITECTURE.md`, `CHANGELOG.md` | Contrato y documentación actualizados para Stencil |

`core/dist/`, `core/.stencil/`, `core/storybook-static/`, `packages/*/dist/`, `packages/*/src/generated/` y las salidas de Astro son generadas y se ignoran en Git. No utilizar un cambio manual de estas salidas como solución permanente.

## Validación realizada y sus límites

| Comprobación | Resultado observado |
| --- | --- |
| `npm test` | 7 pruebas aprobadas sobre la salida de Stencil |
| `npm run typecheck` | Aprobado, incluyendo historias y configuración |
| `npm run build:storybook` | Aprobado; se generó el catálogo estático |
| `npm run build:docs` | Aprobado; reconstruye primero Core y legado, después genera 75 páginas Astro |
| Import de `dgarz-design` desde Node | Aprobado; exporta la función `defineCustomElements` sin exigir DOM para importar |
| TypeScript sobre un consumidor temporal de `dist/index.mjs` | Aprobado para el tipo global del elemento, la variante y el evento |
| `npm pack --workspace=core --dry-run --ignore-scripts` | Incluyó los componentes después de corregir `files` |
| `npm ls lit @stencil/core --all` | Stencil 4.45.2 presente; Lit ausente |
| `git diff --check` | Sin errores de espacios observados |
| `node scripts/verify-wrappers.mjs` después del build | Aprobado: consumidor limpio, TypeScript estricto sin skipLibCheck, tipos negativos, ngc strictTemplates y Chromium para los tres frameworks |
| `npm exec --workspace=docs -- astro build` (fase 4) | Aprobado: 76 páginas, incluyendo `/comenzar/frameworks` |
| `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/dgarz-playwright-browsers npm run verify:package` | Aprobado con ejecución habilitada para servidor local/Chromium; dos builds idénticos, instalación offline, exports, tipos y navegador real |

El import en Node **no demuestra SSR** por sí solo; `verify:hydrate`, `verify:astro-hydrate` y `verify:next-hydrate` sí cubren DSD + hidratación del piloto. Las pruebas jsdom **no demuestran accesibilidad WCAG completa ni comportamiento de todos los navegadores**. El tarball y los wrappers cliente ya se validaron. Siguen pendientes otros navegadores y una auditoría WCAG completa.

## Puntos de atención para retomar

- Se había observado una salida compartida con `isDev: true`; su causa original sigue sin confirmarse. La verificación ahora construye desde fuentes en una copia temporal aislada, fuerza `--prod` y rechaza marcadores de desarrollo. El paquete verificado pasó. Si se empaqueta manualmente fuera del verificador, evitar watchers concurrentes; no detener procesos del usuario sin identificar su función.
- Los builds limpian y escriben `core/dist/components`. No ejecutar en paralelo dos builds que compartan esa salida, ni un consumidor/import/pack mientras otro comando la reconstruye. Se observó un import fallido transitorio por esa carrera; al terminar el build el import pasó.
- `empty: false` en el output de Stencil conserva los metadatos ESM durante watch. El script `--clean` limpia la salida de componentes antes de un build completo. También se limpian los tipos de `dist/types` antes de un build completo desde esta intervención.
- El import raíz registra los componentes, conserva `defineCustomElements` y exporta los constructores DOM de Stencil (incluido `DgarzButton`). No son las clases autoras de la implementación anterior. Los wrappers importan submódulos por componente.
- Los tokens `--dg-*` y `--dgarz-*` son APIs diferentes; no hay un mapeo automático entre ambas.
- `dgarz-button` es un botón de acción (`type="button"`); envío de formularios y asociación de formularios no están implementados.
- Las historias usan la salida compilada. Para desarrollo conjunto, mantener el watch de Stencil en otra terminal; las pruebas en watch no transpilan por sí solas el componente fuente.
- La copia de tokens a `dist/tokens.css` ocurre en el script de build; verificar actualización durante watch si se trabaja en tokens.
- Storybook terminó el build con avisos no bloqueantes: permisos para su configuración global fuera del workspace y tamaño de chunks. No se modificó la configuración global del usuario para silenciarlos.
- La instalación inicial de dependencias necesitó acceso de red fuera del sandbox. No confundir un fallo de resolución de npm con un fallo del código.

## Próximo paso recomendado

**Fase 6 (continuación):** `dgarz-input` cerrado. Elegir el siguiente:

1. `dgarz-textarea` / `dgarz-select`, o un contenedor (`dgarz-card`) según prioridad de producto.
2. Mantener contrato Stencil + tokens + pruebas + stories + `verify:hydrate` / Astro al añadir cada pieza.
3. Confirmar si `data-dg-reorder` era lo pedido con «botones múltiples».
4. Entrada docs: `http://192.168.100.6:4321/comenzar/intro`; demo SSR: `/comenzar/core`.

Los verificadores requieren Chromium de Playwright. En esta máquina se descargó en `/private/tmp/dgarz-playwright-browsers`; usar `PLAYWRIGHT_BROWSERS_PATH=/private/tmp/dgarz-playwright-browsers` si sigue disponible. Esa carpeta temporal puede desaparecer; en otra máquina instalar el navegador de nuevo.

`verify:wrappers` reutiliza preferentemente la caché de npm y puede necesitar red para dependencias transitivas. Usar `DGARZ_OFFLINE=1` solo con una caché completa. En esta sesión se usó `npm_config_cache=/private/tmp/dgarz-npm-cache`. Los temporales de verificaciones fallidas se conservan; los de ejecuciones aprobadas se eliminan salvo `DGARZ_KEEP_PACKAGE_CHECK=1`.

El consumidor Angular de navegador importa su compilador JIT para probar la biblioteca APF parcial fuera de Angular CLI. Su tamaño no representa una medición de producción ni un presupuesto de rendimiento del CDS. Los avisos de Vite sobre `use client` en el consumidor SPA no invalidan la directiva conservada en los archivos publicados para Next.js. ng-packagr avisa que sustituye los exports de su manifest APF interno; el tarball probado usa los exports del package.json raíz del workspace.

## Comandos de referencia

Desde la raíz; requisitos declarados: Node.js >=22.12 y npm >=10.

```bash
npm install
npm run typecheck
npm test
npm run build
npm run build:storybook
npm run build:docs
npm pack --workspace=core --dry-run --ignore-scripts
# Requiere instalar el navegador una vez y permitir servidor local/Chromium:
# npx playwright install chromium --only-shell
npm run verify:package
npm run verify:wrappers
npm run verify:hydrate
npm run verify:astro-hydrate
npm run verify:next-hydrate
git diff --check
git status --short
```

Desarrollo, en terminales independientes:

```bash
npm run dev:core
npm run storybook
npm run dev:docs
```

Para observar el SCSS heredado: `npm run dev:legacy --workspace=core`.

No hay commits ni publicación realizados por el agente en esta migración. Revisa Git al retomar, porque este estado puede cambiar después de este registro.
