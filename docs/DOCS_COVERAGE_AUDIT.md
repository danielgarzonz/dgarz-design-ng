# Docs Coverage Audit

Fecha: 2026-06-06

## Estado general

No, el core no está documentado por completo todavía.

La documentación sí cubre muchas áreas principales del sistema, pero hoy la cobertura es desigual:

- Hay módulos con página dedicada y demos claras.
- Hay módulos que solo aparecen mezclados dentro de otra página.
- Hay clases nuevas del core que solo viven en ejemplos y no en documentación API.
- Hay utilidades y patrones semánticos recientes que todavía no tienen explicación explícita.

## Inventario alto nivel

Referencia usada para el audit:

- `core/src/scss/dgarz.scss`
- `core/src/scss/components/*`
- `core/src/scss/base/*`
- `core/src/scss/layout/*`
- `docs/src/pages/*`
- `docs/src/data/nav.ts`

Observación:

- El inventario de clases del core ronda las `632` clases `dg-*` en SCSS.
- Ese número incluye utilidades, grid responsivo y app-pack.
- Tener una clase mencionada en `docs/src` no significa que esté verdaderamente documentada; a veces solo está usada en el layout o en un ejemplo.

## Bien cubierto

Estas áreas sí tienen una presencia razonablemente clara en la docs:

- `buttons`
- `forms`
- `cards`
- `badges`
- `alerts`
- `toasts`
- `navbar/nav`
- `tables`
- `modals`
- `misc`
- `collapse`
- `carousel`
- `popover`
- `grid`
- `tokens`
- `typography`
- `utilities`
- `app-pack` principal:
  - `shell`
  - `accordion`
  - `breadcrumbs`
  - `steps`
  - `listgroup`
  - `stats`
  - `feedback`
  - `icons`

## Parcial

Estas áreas sí aparecen, pero no con el nivel de documentación que ya ameritan:

- `dropdown`
  - ya tiene página dedicada en `componentes/dropdown`
  - todavía conviene limpiar ejemplos viejos donde se sigue mostrando con `style` inline heredado

- `tabs`
  - aparece en `comenzar/js`
  - no tiene página dedicada en `componentes`

- `glass`
  - parte del lenguaje visual está en `fundamentos/superficies`
  - pero no existe aún una página API clara para las clases de superficies opt-in

- `patterns`
  - hoy se explica sobre todo a través de `/examples`
  - faltan docs explícitas para clases como chat, pricing, feature media, compare rows, etc.

- `utilities`
  - existe una página general
  - pero varias utilidades nuevas de color/fondo/texto no están explicadas una por una

- `color`
  - ya muestra escala y semánticos
  - pero todavía no enlaza claramente con todas las clases utilitarias nuevas `bg-*` y `text-*`

- `examples`
  - ayudan mucho a inspirar
  - pero no sustituyen documentación de API del core

## Faltante claro

Estas áreas del core no están documentadas de forma dedicada hoy:

- `tabs` como componente formal
- `animations`
- documentación formal de `patterns`
- documentación formal de la capa `glass`

También faltan docs explícitas para utilidades recientes:

- `dg-bg-white`
- `dg-bg-black`
- `dg-bg-light`
- `dg-bg-dark`
- `dg-bg-paper`
- `dg-bg-surface`
- `dg-bg-surface-2`
- `dg-bg-surface-3`
- `dg-bg-success`
- `dg-bg-warning`
- `dg-bg-danger`
- `dg-bg-error`
- `dg-bg-info`

y sus pares de texto:

- `dg-text-white`
- `dg-text-black`
- `dg-text-on-dark`
- `dg-text-on-light`
- `dg-text-error`

## Patrones nuevos que ya merecen página

Las clases nuevas de `_patterns.scss` ya son suficientemente importantes como para no quedarse solo dentro de `/examples`:

- `dg-chat-*`
- `dg-calendar-*`
- `dg-calc-*`
- `dg-feature-*`
- `dg-pricing-*`
- `dg-compare-row`
- `dg-billing-toggle`
- `dg-feature-list`
- `dg-phone-shell`
- `dg-mobile-*`
- `dg-gallery-*`

## Riesgos actuales

- El usuario puede ver una clase en un ejemplo y no encontrar su documentación formal.
- Algunas capacidades del core parecen “inventadas en la docs” aunque ya estén en SCSS.
- La documentación por páginas no refleja todavía la evolución reciente del core visual.
- `comenzar/js` está absorbiendo piezas que deberían tener página propia.

## Prioridad recomendada

### Prioridad 1

- Crear página de `Tabs`
- Documentar `Glass / Superficies` como API del core, no solo inspiración
- Documentar utilidades nuevas de color/fondo/texto

### Prioridad 2

- Crear página de `Patterns` o dividirla en:
  - `Chat`
  - `Pricing`
  - `Calendar`
  - `Feature media`

### Prioridad 3

- Crear página de `Animations`
- Revisar `utilities` para cerrar huecos clase por clase

## Siguiente paso sugerido

Orden recomendado para continuar:

1. `Tabs`
2. `Superficies / Glass`
3. `Patterns`
4. `Animations`
5. actualización de `Utilities` y `Color`
