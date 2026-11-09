# Arquitectura de dgarz design

## Contrato

`dgarz-design` es el punto de entrada del Core agnóstico. Stencil.js es la base oficial del Core: genera Custom Elements con Shadow DOM y permite escribir CSS estándar sin un preprocesador en los componentes. La lógica y la accesibilidad viven en el Core; los futuros adaptadores no deben duplicarlas.

Los tokens públicos utilizan el prefijo `--dgarz-` y se distribuyen en `dgarz-design/tokens`. El Core ofrece valores de respaldo para funcionar sin una hoja global. Los consumidores pueden sobrescribir los tokens por tema o por contenedor.

## Primera etapa implementada

- Core: `core/src/components/`, TypeScript, declaraciones de tipos y módulos ESM.
- Identidad: `core/src/tokens/tokens.css`, CSS nativo sin reset global.
- Componentes Core: `dgarz-button` (primary/secondary, disabled/loading, slot, `dgarz-click`) y `dgarz-input` (tipos de texto, label, disabled/readonly/required/invalid, `dgarz-input`/`dgarz-change`).
- Calidad: Vitest con jsdom y Testing Library; botón nativo, estados, eventos y semántica básica. Esto no sustituye auditorías con tecnologías de asistencia ni pruebas de navegador.
- Catálogo: `core/.storybook/` e historias `.stories.tsx` con Controls y estados.
- Distribución heredada: SCSS y comportamiento global siguen compilándose para las aplicaciones y la documentación existentes.
- Adaptadores: workspaces `packages/react`, `packages/vue` y `packages/angular`, con los generadores oficiales de Stencil, dependencias de framework fuera del Core y tipos/eventos comprobados en consumidores instalados.
- Contrato generado: `dgarz-design/component-docs.json` contiene metadatos Stencil normalizados; no se presenta como CEM estándar.
- Distribución validada: `npm run verify:package` compara builds aislados, instala un tarball en un consumidor limpio y verifica exports, tipos y comportamiento en Chromium. El paquete no se publica durante esta comprobación.

## Siguientes etapas

1. Ampliar las pruebas de los adaptadores a Next.js y otras versiones de framework. Mantener `@stencil/angular-output-target` fijado en 1.1.0 hasta verificar una actualización que conserve los eventos. Un CEM estándar sigue siendo una mejora pendiente; ya hay metadatos Stencil.
2. Incorporar SSR con el hydrate output target de Stencil y Declarative Shadow DOM; implementar la hidratación del cliente y validar HTML estático, Astro y Next.js por separado. El piloto ya cubre `dgarz-design/hydrate`, Astro `/comenzar/core` y Next App Router (`verify:hydrate`, `verify:astro-hydrate`, `verify:next-hydrate`). Ampliar la misma prueba al migrar cada componente. Importar el paquete raíz en Node no equivale a SSR funcional. No introducir acceso a document/window en el nivel superior del Core.
3. Migrar el inventario heredado componente por componente, con pruebas, historias, documentación, auditorías de accesibilidad y pruebas reales de teclado/navegador.
4. Migrar Astro a ejemplos del nuevo Core y medir tamaños, tiempos de interacción y ausencia de duplicación del runtime de Stencil en las aplicaciones.

## Publicación y compatibilidad

En 1.2.0 el Core de componentes se publica en `dgarz-design/core` y la raíz del paquete conserva el JS clásico de 1.1.0 (`import` y `require`), así que actualizar no rompe a nadie; sus tipos son solo de tipos (`dist/root.d.mts`). Cambiar la raíz al Core requiere una versión mayor (2.0). `dgarz-design/legacy` permite migrar el comportamiento anterior de forma explícita. Los artefactos CSS y UMD anteriores conservan sus rutas.

El punto de entrada raíz registra los Custom Elements compilados por Stencil y debe conservarse como efecto secundario en bundlers. El runtime de Stencil se incluye en la salida (`externalRuntime: false`).

## Referencias técnicas

- [Distribución de Custom Elements de Stencil](https://stenciljs.com/docs/custom-elements)
- [SSR de Stencil](https://stenciljs.com/docs/hydrate-app)
- [Storybook para HTML y Vite](https://storybook.js.org/docs/9/get-started/frameworks/html-vite)
- [Entornos de Vitest](https://vitest.dev/guide/environment)

## Límites de los adaptadores actuales

React usa el runtime oficial del output target, cuyo puente de integración incluye `@lit/react`; el Core continúa siendo Stencil. Vue declara Vue Router como peer para satisfacer los tipos del runtime oficial. Angular usa APF/compilación parcial, standalone y bindings booleanos explícitos. El Core expone `dgarz-design/hydrate` para SSR/DSD del piloto (HTML, Astro y Next App Router verificados). Los adaptadores de framework no anuncian todavía soporte SSR/DSD propio.

## Composición de encabezados con curvas

Por aclaración explícita del usuario (criterio A, 2026-11-02), el borde visible del último icono se alinea con la tangente interior donde empieza la curva. Es una alineación óptica del trazo, no de la caja del botón: la zona pulsable puede extenderse dentro del header para compensar el espacio vacío alrededor del SVG. El header móvil usa `--pub-nav-inset: var(--pub-nav-radius)` (55px) con áreas seguras; el modal completo usa inset y radio de 48px. Con botones 30×36px e iconos de 12px, la compensación es −9px. Mantener esta regla al migrar o rediseñar; el header de escritorio sin curvas se alinea con el shell. No volver a fijar el inset en 32px (`--dg-space-6`) sin una nueva decisión del usuario. La misma alineación óptica se aplica a la izquierda: el trazo inicial de la marca coincide con la tangente izquierda, compensando el espacio interno de la fuente; no basta con alinear su caja.
