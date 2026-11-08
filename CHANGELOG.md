# Changelog

All notable changes to **dgarz design** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased] — 2.0.0-alpha.0

### Opt-in glass for buttons
- Colors are solid by default; `.is-glass` makes any filled button variant translucent with backdrop blur while keeping its color and text (solid, semantic, cancel, subtle, outline, ghost). Text and gradient variants ignore it.
- New tokens `--dg-glass-alpha`, `--dg-glass-alpha-soft`, `--dg-glass-alpha-hover` and `--dg-glass-filter`; glass hover/focus becomes more opaque instead of fading.
- Glass falls back to solid under `prefers-reduced-transparency: reduce` or without `backdrop-filter` support.
- **Changed:** `.dg-btn-group` is now a solid capsule by default; add `.is-glass` for the previous translucent look. `.dg-btn-glass` stays glass and now follows the shared tokens.
- `verify:button-classes` covers glass on every variant, hover, group and the reduced-transparency fallback.
- `<dgarz-button glass>`: new reflected `glass` prop (React/Vue/Angular adapters included) with `--dgarz-glass-*` tokens and the same solid fallback.

### Flat cards

- Cards use a flat tinted surface instead of a shadow: `--dg-card-bg` (new token, `#f8f8f8` in light, `--dg-surface-2` in dark), no border and no `box-shadow`. `.dg-card-hover` only lifts 2px.

### Carousel controls

- Carousel controls sit at the bottom and are glass by default (translucent with backdrop blur): indicators in a capsule at the bottom left, arrows at the bottom right. `.is-solid` on the carousel makes them opaque; reduced transparency falls back to solid.
- The autoplay pause button is icon-only with thin 2px strokes (pause ↔ play), without a background, in the top-right corner: text color on plain slides, white with a soft shadow over photos.

### Top and bottom drawers

- `.dg-drawer-bottom` and `.dg-drawer-top` open full-width panels from the bottom or top edge. Their height follows the content up to 85% of the viewport, they slide in and out from their edge, and they share the side drawers' header, floating footer, glass option and reduced-motion fallback. The top drawer rounds its bottom corners like the top menu bar (`--dg-drawer-top-radius`, defaults to the new `--dg-bar-radius` token: 55px, 32px at ≤380px, square at ≥861px). The bottom drawer rounds its top corners (`--dg-drawer-bottom-radius`, defaults to `--dg-radius-xl`). The top drawer's header is fixed to the top edge and clears the safe area, so Safari on iOS paints the status bar with its color (and `theme-color` follows it elsewhere).

### Squircle modal container

- Where `corner-shape` is supported (Chromium 139+), the modal container uses squircle corners at 1.5× `--dg-radius-xl` (45px); other browsers keep the round 30px corner. The modal's glass and glow layers follow the same shape, and the solid reveal ends with a matching smaller round clip so the corner does not jump. Full-screen modals stay square; every other component keeps its round corners.

### Overlay focus no longer scrolls the page

- Opening and closing modals, drawers, confirm dialogs, the lightbox and popovers now focus with `{ preventScroll: true }`, so the page behind does not move when the trigger gets its focus back.

### Modal circular reveal

- The reveal now morphs: a circle grows from the center and turns into the modal's rounded rectangle (`clip-path: inset(… round …)`); closing reverses it. `--dg-modal-reveal-radius` sets the final corners (0 for `.dg-modal-full`).
- Solid modals (the default) now open with a reveal from the center (1s) and close by shrinking back to it, replacing the fade-and-rise. The clip only exists while animating (backwards fill), so the shadow is never cut off. Glass modals keep their blur entrance; reduced motion disables both.
- Entrance effects for solid modals: `.dg-modal-zoom`, `.dg-modal-blur`, `.dg-modal-flip` (3D tilt) and `.dg-modal-curtain`, each with a matching exit (1s, 35% hold); the circle stays the default. Docs section 5 «Modal posicionado» becomes «Efectos de entrada»; `.dg-pos-*` classes remain for compatibility but are no longer documented.
- Modal content (texts, buttons, icon, header/footer) stays hidden for the whole entrance effect and fades in once it looks complete (`--dg-dur-content` .6s with `--dg-ease-content`, after `--dg-delay-content` .6s, once the reveal has settled); on close it fades out during a 45% hold (was 35%) before the exit effect, now shared by every modal exit, effect and the backdrop. Plain-text modal bodies are covered too; there is no fixed `opacity: 0`, so content stays visible if a script cancels the animation (e.g. step transitions), and solid modals no longer receive the glass header/footer blur animation.
- The dark backdrop behind modals now fades in with the modal and fades out after the content (holds 35%, then clears), animating its background color so the modal itself is unaffected.

### Full-screen modal on phones
- Phone status bar now matches the full-screen modal header on Safari iOS. Verified on device: Safari takes the color from a fixed, bar-shaped element at the very top of the page (it ignores `theme-color`, the page background and full-screen layers), so the full-screen header is now `position: fixed` (not while the bounds animate on resize). `theme-color` is still synced for other browsers and now converts any CSS color to hex.
- Modal header titles stay on one line: when a title does not fit, its font shrinks to fit (down to 60%, never below 14px) on open, resize, viewport resize and font load (`dgarz.fitModalTitles()` is public for dynamic titles); the ellipsis is only a last resort. Narrow screens (≤480px) use tighter, still symmetric header padding.
- New token `--dg-overlay-chrome` (#f8f8f8 light, `--dg-surface-3` dark) shared by modal and drawer headers/footers.

### Navbar style options

- The navbar toggle icon is now two lines (`ICON_OPEN` in `navbar.js` and the documented markup).
- **Changed:** `.dg-navbar` is solid by default with no shadow or border. Options (combinable): `.dg-navbar-shadow` (soft `--dg-shadow-bar`), `.dg-navbar-bordered` (1px rule), `.is-glass`, `.dg-navbar-inverse` (dark bar; children get the solid pair swapped so primary buttons stay visible) and `.dg-navbar-floating` (rounded capsule with margin). The docs header uses `.dg-navbar-shadow`.

### Dock (floating bottom menu)
- New `.dg-dock` / `.dg-dock-item`: a floating bottom menu. Solid by default (light gray fill, active item on the page surface, no shadow or border); options `.dg-dock-shadow`, `.dg-dock-bordered` (1px input border), `.is-glass` and `.dg-dock-inverse` (dark capsule). Items adapt to their content: icon only, icon + `.dg-dock-label` (iOS tab bar) or text only. Opt-in glass (`.is-glass` or `data-surface="glass"`), `.dg-dock-fixed` (bottom center, safe-area aware) and `.dg-dock-sm`; tokens `--dg-dock-item`, `--dg-dock-icon`, `--dg-dock-pad`.
- With `data-dg-dock` (new `js/dock.js`) the active circle slides and grows between items (shared indicator), buttons get `aria-pressed`, links use `aria-current`, arrow keys move focus and `dg:change` reports `{ value, index }`.
- `.dg-dock-bar`: full-width bottom bar (edge to edge, items spread, safe-area aware; icon-only items become wide pills that shrink to fit). `.dg-dock-layout`: the content (first child) rounds its bottom corners and overlaps the bar for depth (`--dg-dock-tuck`, 2rem).
- Documented as the «Menú inferior (dock)» section of the Navigation page (`/componentes/nav#dock`); `verify:glass` covers the dock.

### Checkbox and radio
- `.dg-check-box` is now round (iOS-style; the radio differs by its dot) and matches the switch height (1.95em) and the 1px input border. The check is an SVG stroke (mask) that draws left→right and lands with the switch's bounce; the radio dot grows from the center. Transitions only, so boxes that load checked do not animate; dimmed disabled state; no motion with reduced motion. Same markup.

### iOS-style switch
- `.dg-switch` is larger (3.2 × 1.95em) with a flush thumb (no inner padding by default; `--dg-switch-pad` adds one). The thumb stretches toward the middle while pressed and lands with a small bounce (`--dg-switch-dur`, `--dg-switch-ease`). Same markup. The track has the same 1px border as inputs (`--dg-field-border`; filled with the track color when on). The always-white thumb sits flush inside the border and uses a soft shadow (exempt from the flat reset) instead of an outline; the dark-mode "on" track is mid gray (`--dg-switch-on`) so the thumb stays visible. Dimmed disabled state, no motion with reduced motion.

### Sliding indicator for tabs and segmented control
- With `data-dg-tabs` / `data-dg-segmented`, the active pill (`.dg-tabs-pill`) or underline (base tabs, `.dg-segmented`) now glides between options instead of jumping (new `js/indicator.js`). It is placed without animation on load and re-measured on resize and font load.
- The indicator grows while it travels (up to `--dg-ind-scale`, 1.12) and settles back to its size on arrival. Position uses the individual `translate` property and the pulse uses `scale`, so growing never shifts it off its path.
- New tokens `--dg-dur-indicator` (.45s) and `--dg-ease-indicator`. Without JS the static active styles remain; reduced motion switches instantly.

### Consistent button hover
- Every button now grows 5% on hover and keyboard focus (0.5s), the effect modal footers and button groups already had; the shared rule replaces their duplicates. Text-only and full-width buttons, disabled buttons, `.dg-btn-hover-lift`/`-grow` and reduced motion are excluded; pressing still scales to 0.96.
- `<dgarz-button>` uses the same hover.
- One shared transition for every button (`$transition` in `abstracts/_buttons.scss`: colors .18s, grow/shadow .5s) and one press scale (0.96). Modal footers and button groups (previously 0.18s grow, 0.98 press) and `.dg-btn-hover-*` effects (0.22s, which also made color changes instant) no longer override it.

### Serif typeface: Gambetta
- **Changed:** `--dg-font-serif` is now `"Gambetta", Georgia, "Times New Roman", serif` (was Newsreader). Load it from Fontshare: `https://api.fontshare.com/v2/css?f[]=gambetta@400,401,500,501&display=swap` (ITF Free Font License). Geist and Geist Mono still come from Google Fonts.
- Installation snippets, typography docs, examples and the landing were updated.

### Solid floating components and global glass scope
- **Changed (visual):** navbar, app header/sidebar, modal, drawer, menus, popover, combobox, date picker and carousel arrows are now solid by default, using the theme surface (light or dark). Carousel indicators are solid too.
- Glass is the second option: `.is-glass` per element, or `data-surface="glass"` on `<html>`/any container for every floating component inside it; `.is-solid` keeps one element solid inside that scope.
- **Changed:** `.dg-modal.is-solid` and `.dg-drawer.is-solid` no longer force a white palette in dark mode; `.is-solid` is now the default appearance and only opts out of a glass scope.
- Solid modals fade and rise in 1s; glass modals keep the animated blur. Positioned modals keep their own motion in both modes.
- Glass modal/drawer layers and `.dg-glass*` utilities now also fall back to solid under reduced transparency or without `backdrop-filter`.
- Modal and drawer close buttons use `--dg-solid`/`--dg-on-solid`, so they stay visible on dark surfaces.
- **Changed:** the drawer container is square by default (`--dg-drawer-radius`, default `0`); the floating footer keeps its rounded capsule.
- Top menu bars (`.dg-navbar`, `.dg-app-header`) cast the new soft `--dg-shadow-bar` token (`0 1px 8px` at 5% light / 28% dark) and are exempt from the flat reset; modal headers never cast a shadow (the full-screen modal header shadow was removed).
- Drawer header and footer now share the modal's section contrast: opaque `--dg-surface-3` when solid, `--dg-surface-3` at 55% with blur when glass (the header previously had no background).
- `verify:glass` now covers the floating components (default, `.is-glass`, scope, `.is-solid` opt-out), modal motion and fallbacks.

### Opt-in glass for components
- `.is-glass` now also applies to badges, alerts, callouts, cards, tabs (base/pill/enclosed), segmented control, toasts, chips, inputs, textareas, selects and input groups. Each keeps its own color and text; focused fields and hovered/selected cards become more opaque.
- Shared Sass mixins in `abstracts/_glass.scss` (`surface`, `fill`, `boost`) drive every component from the same `--dg-glass-*` tokens and solid fallback.
- **Changed:** `.dg-card` no longer applies a `backdrop-filter` behind its opaque fill (no visual change; less GPU work). Use `.dg-card.is-glass` for a frosted card.
- New `verify:glass` script checks every component variant in light/dark, focus/hover, the select chevron and the reduced-transparency fallback.

### Subtle and text button contrast
- New `--dg-btn-ink` token for subtle and text button labels: black on light, `--dg-text` on dark. Fixes unreadable black labels on dark subtle fills and dark pages.
- `verify:button-classes` now expects borderless subtle tones with their own `--dg-*-subtle` fill and checks a 4.5:1 text contrast in both themes.

### Button documentation and responsive width
- Split button examples into 17 navigable sections with default behavior first.
- Added `dg-btn-block-mobile` for full container width up to 991px and intrinsic width from 992px.

### Colored subtle borders
- Added standalone subtle primary/success/warning/danger/info variants with semantic 1px borders, soft surfaces and contrasting text/loading/modal icons.

### Subtle button variant
- Added standalone `dg-btn-subtle` with a light gray surface and dark text, dark-theme adaptation and contrasting loading/modal icons.
- The default `dg-btn` remains solid primary at medium size.

### Button CSS simplification
- Button variants such as `dg-btn-primary` now include the base styles; `dg-btn-primary dg-btn-sm` is sufficient.
- Existing `dg-btn` markup remains compatible; groups, loading, container styles and keyboard reordering support standalone variants.
- Added `verify:button-classes` and updated button documentation.

### Added
- Stencil.js/TypeScript Core with native Shadow DOM, the `dgarz-button` pilot and `dgarz-input` text field.
- Public `--dgarz-*` tokens via `dgarz-design/tokens`, with light/dark themes and field tokens.
- Vitest/Testing Library tests and Storybook stories with Controls.
- Architecture and staged migration documentation.
- Generated React 19, Vue 3.5 and Angular 20.3 adapter packages, with installed-consumer TypeScript/template/browser verification.
- Generated Stencil component metadata and public component subpaths.
- `dgarz-design/hydrate` server module with Declarative Shadow DOM for the pilot, plus `verify:hydrate`.
- Astro docs demo at `/comenzar/core` with build-time DSD and client hydration (`verify:astro-hydrate`).
- Next.js App Router consumer verification for Core hydrate DSD (`verify:next-hydrate`).
- `data-dg-reorder` on `.dg-btn-group`: drag to reorder with mouse or touch, Alt + arrow keys, Esc to cancel and a `dg:reorder` event.
- `verify:package`: isolated reproducible production builds, tarball installation, consumer types and Chromium checks.

### Changed
- **Breaking:** the root ESM entry now exports and registers Web Components. Import the previous behavior API from `dgarz-design/legacy`.
- Stencil compiles the Core with its runtime bundled; the existing CSS, icons and browser bundles remain available for migration.
- Production builds explicitly use `--prod`, clear generated component types and rebuild before packing.
- Framework adapters now use official output targets; SSR/DSD integration and Next.js-specific validation remain planned work.
- Subtle buttons use cream/light fills of each semantic tone (same structure as solids). Outline buttons use a solid colored border with no fill, and take the matching subtle fill on hover; added `dg-btn-outline-{primary,success,warning,danger,info}`.
- Semantic solid tokens (`success`, `warning`, `danger`, `info`) are more saturated in light and dark themes; primary remains the monochrome brand solid.
- Added text-only buttons (`dg-btn-text` / `dg-btn-text-{tone}`) with a solid underline and no fill.

## [1.2.0] — cambios heredados pendientes de publicación

### Added
- **Forms**: date/time picker (`.dg-datepicker`, `.dg-cal-*`), combobox with search and multi-select tags (`.dg-combobox`), file upload dropzone with file list and progress (`.dg-dropzone`, `.dg-file-*`), input masks (`data-mask`, `data-mask-pattern`, `data-currency`), password visibility toggle (`.dg-password-wrap`).
- **Content blocks**: pricing (`.dg-pricing-*`), feature grid (`.dg-feature-*`), testimonial (`.dg-testimonial-*`), timeline (`.dg-timeline-*`), FAQ with search (`.dg-faq`), image gallery with lightbox (`.dg-gallery`, `.dg-lightbox-*`).
- **Tables**: row-to-card layout for mobile (`.dg-table-desktop` / `.dg-table-cards` / `.dg-table-rowcard-*`), inline cell editing (`.dg-table-editable`, `dg:cell-saved` event), select-all checkbox in `th.dg-cell-check` that marks rows with `.is-selected` (`dg:select` event).
- **Navigation**: collapsible sidebar sub-menus (`.dg-nav-item-toggle`, `.dg-nav-sub`), toolbar actions bar (`.dg-actions`).
- **Tooltip**: JS-positioned tooltip (`data-tip`, `.dg-tooltip-pop-*`).
- **Modal**: optional glow effects — pulsing halo (`.dg-modal-glow`) and spinning gradient ring (`.dg-modal-glow-spin`).
- **JS**: `dgConfirm` / `dgAlert` / `dgPrompt` helpers are now exported (announced in 1.1.0 but missing from that build).
- **Buttons**: `.dg-btn-cancel`.
- **Animations**: `.dg-fade-in`, `.dg-fade-in-up`, `.dg-fade-in-down`, `.dg-pop-in`, `.dg-delay-*`.
- **Utilities**: full flexbox set (direction, wrap, align-self, align-content, order), complete spacing scale on every axis (`mx/my/ml/mr/px/py/pt/pb/pl/pr` 0–6, plus `mt/mb/mx/ml/mr-auto`), `.dg-top-0` / `.dg-left-0`, shadow scale `.dg-shadow-xs…xl`, `.dg-shadow-inset-*`, colored and special shadows, `.dg-shadow-none`, `.dg-opacity-25`, `.dg-cursor-text`, `.dg-transition-colors/-transform/-opacity`, scroll utilities (`.dg-scroll-smooth`, `.dg-scroll-snap-x/y`, `.dg-snap-start/center/end`).
- **Icons**: `dg-minus` (36 icons).
- **Package**: `dgarz-design/esm`, `dgarz-design/js` and `dgarz-design/js/min` export paths.

### Fixed
- Sortable tables sorted by the wrong column when a non-sortable column (e.g. a checkbox) came first.

### Deprecated
- `.dg-surface-liquid` / `.dg-liquid` — use `.dg-surface-glass-strong`. Will be removed in 2.0.

## [1.1.0] — 2026-06-24

### Added
- **Modal**: glass background by default (`backdrop-filter` blur + saturation) with a `.is-solid` opaque variant.
- **Modal**: edge positioning — `.dg-pos-top` / `.dg-pos-bottom` / `.dg-pos-left` / `.dg-pos-right` — with direction-aware enter/exit animations.
- **Modal**: additional sizes (`sm`, `lg`, `xl`, `full`) and a compact bar/snackbar variant (`.dg-modal-bar`).
- **Modal**: centered confirmation layout with icon, plus `dgConfirm` / `dgAlert` / `dgPrompt` JS helpers (`core/src/js/confirm.js`).

## [1.0.0] — 2026-06-05

### Added
- **Core**: design tokens (`--dg-*`), reset, editorial typography (Newsreader + Geist), 12-column responsive grid with `sm`/`md`/`lg` breakpoints and offsets, utility classes.
- **Components**: buttons, button groups, inputs/select/textarea, checkbox/radio/switch, input groups, cards, badges, alerts, toasts, tables, navbar, tabs, segmented control, dropdown, modal, avatar, progress, spinner, tooltip.
- **App pack** (`dgarz-app.css`): app shell with collapsible sidebar + mobile drawer, off-canvas drawer, accordion, breadcrumbs, pagination, steps/stepper, skeleton loaders, empty states, list groups, stat cards, form validation states, chips, popover, styled scrollbars.
- **Behavior layer** (`dgarz.js`): attribute-driven, accessible (focus-trap, keyboard nav, ARIA), zero-dependency. Handles theme toggle, overlays, dropdowns, tabs, accordions, segmented groups and toasts. Ships UMD, minified and ES-module builds.
- **Icons**: 30-icon monochrome SVG sprite.
- **Theming**: full light/dark via a single `data-theme` attribute.
- **Distribution**: `dist/` with split and combined builds (`dgarz`, `dgarz-app`, `dgarz.full`), minified variants, npm package and jsDelivr/unpkg support.
- **Docs**: interactive component showcase + a real dashboard demo.

[Unreleased]: https://github.com/dgarzonz/dgarz-design/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/dgarzonz/dgarz-design/releases/tag/v1.1.0
[1.0.0]: https://github.com/dgarzonz/dgarz-design/releases/tag/v1.0.0
