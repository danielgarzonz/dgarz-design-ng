# Changelog

All notable changes to **dgarz design** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [1.3.0] — 2026-11-18

New form controls, one corner style for every component (semi by default), Swiss typography and subtle borders by default, status alerts and accessible color. Some defaults look different (corners, headings, borders, tables): each entry marked ⚠ or "Changed" says how to keep the previous look.

### Added — More entrance animations
- `.dg-fade-in` (opacity only), `.dg-zoom-in` (from 85 %), `.dg-zoom-out` (from 115 %), `.dg-blur-in` and `.dg-blur-in-{up,down,left,right}` (out of focus into focus), `.dg-rise-in` (comes up out of its own bottom edge, as if from the ground; no wrapper with `overflow: hidden` needed) `.dg-drop-in` (its mirror, down from the top edge) and `.dg-rise-in-left` / `-right` (out of the left / right edge). Same contract as `.dg-fade-in-*`: they play on mount, stay hidden during a `.dg-delay-*`, leave nothing applied when they end, and work with `.dg-anim-slow` / `-slower` / `-none` and reduced motion.
- Scroll reveal directions: `.dg-reveal-down`, `.dg-reveal-left` and `.dg-reveal-right`, as modifiers on `.dg-reveal` (which keeps rising by default).
- **Entrances wait until they are seen:** with `dgarz.js`, every entrance class (`dg-fade-in*`, `dg-zoom-*`, `dg-blur-in*`, `dg-rise-in*`, `dg-drop-in`, `dg-pop-in`, `dg-text-in`, `dg-text-reveal`) that starts below the fold stays paused and hidden (`.dg-anim-wait`) and plays when it scrolls into view, so it is never finished off-screen. Entrances already on screen play at once, as before. Without the script or with reduced motion they play on mount; `data-dg-no-reveal` on the element or an ancestor opts out. `dgarz.init(container)` also wires entrances added later.
- Docs: the Animations page now has a catalog of every entrance and one example per family (fade, directional fade, zoom, blur, rise, stagger, duration, scroll reveal); each demo plays when it scrolls into view and can be replayed.

### Changed — Brand accent
- The accent tokens use the dgarz design steel-blue palette (ink #101820, slate #354B60, steel #7394AC, mist #B8D0DE, frost #F0F5F7) instead of blue, violet, orange and mint: `--dg-accent` slate (steel in dark), `--dg-accent-2` steel (mist in dark), `--dg-accent-3` mist, `--dg-accent-violet` ink (steel in dark), `--dg-accent-warm` and `--dg-accent-mint` mist/steel. This changes the surface gradients (`cool` slate → steel in pastel, `warm` mist, `aurora`, `mesh`), the gradient buttons, the focus ring and the modal glow. `.dg-btn-gradient` runs ink → slate → steel with white text (steel → mist with ink text in dark) via the new `--dg-on-accent`. Override the tokens to bring back any palette.

### Changed — Switch, checkbox and radio
- New look that adapts to whatever background the control sits on. The switch track and the check box are filled with that background (`--dg-control-bg`, see below) and carry a subtle 1px edge drawn from the current text color (18%, 32% when on). The switch thumb is flat (no shadow) and inset (`--dg-switch-pad: .2em`): off, it is the background mixed with 28% of the text color, so it always contrasts; on, it takes the text color itself — black on light fills, white on dark or strong ones. The radio dot (larger) uses the same color. An unchecked checkbox shows its check in a subtle tone (the fill mixed with 25% of the text color). Checked, it fills with the text color (black; white in dark) and plays the stepper's "done" effect: a ring is drawn around it, the circle fills, then the check is traced left → right in the background color; unchecking plays it in reverse (check, fill, ring) — with transitions, so boxes that load checked do not animate; reduced motion skips it. The press stretch and landing bounce are unchanged.
- `--dg-switch-on`, `--dg-switch-thumb-off`, `--dg-switch-line` and `--dg-switch-line-on` are optional overrides (no longer defined by default); `--dg-switch-on` colors the thumb instead of filling the track. `--dg-switch-off` and `--dg-switch-thumb-shadow` are removed.

### Deprecated
- Duplicate class names (same rule as another class) are deprecated: they keep working in 1.x and will be removed in 2.0. The list, with the class to use instead, ships as `dist/deprecated-classes.json`:
  - `.dg-serif` → `.dg-font-serif`
  - `.dg-glass`, `.dg-glass-strong`, `.dg-glass-dark`, `.dg-liquid` → `.dg-surface-glass`, `-glass-strong`, `-glass-dark`, `.dg-surface-liquid`
  - `.dg-table-responsive` → `.dg-table-scroll`; `.dg-modal-footer-expanded` → `.dg-modal-footer-wide`
  - `.dg-col-flex` → `.dg-flex-col`; `.dg-flex-auto` → `.dg-grow`; `.dg-no-shrink` → `.dg-shrink-0`
  - `.dg-fs-2xl` → `.dg-text-2xl`; `.dg-lh-1` → `.dg-leading-none`; `.dg-text-decoration-none` → `.dg-no-underline`
  - `.dg-text-on-dark` / `.dg-text-on-light` → `.dg-text-white` / `.dg-text-black`; `.dg-place-center` → `.dg-place-items-center`
  - `.dg-visible-xs`, `.dg-visible-sm` → `.dg-hidden-desktop` (they only hid from 992px, despite their names)
  - `.dg-w-100p`, `.dg-h-100p`, `.dg-max-w-100p` (and their `md`/`lg`/`xl` copies) → `.dg-w-full`, `.dg-h-full`, `.dg-max-w-full`; `.dg-w-100vw` → `.dg-w-screen`. The keywords are now part of the size scale, so they also exist per breakpoint (`.dg-md-w-full`, `.dg-lg-w-screen`…).
  - `.dg-table-square` → nothing: tables are square by default.
- Floating labels (`.dg-float-field`) are deprecated and gone from the docs: use `.dg-field` with `.dg-label` above the input. They keep working in 1.x and will be removed in 2.0.
- Competing systems for the same job are deprecated too, so there is one way per concept (grid, `.dg-grid-cols-*` and `.dg-row` / `.dg-col-*` all stay):
  - `.dg-space-x-*` / `.dg-space-y-*` → `.dg-stack` / `.dg-cluster` + `.dg-gap-*`
  - `.dg-text-gray-*` / `.dg-bg-gray-*` → `.dg-muted`, `.dg-faint`, `.dg-text-white` / `-black` and the `.dg-bg-surface*` utilities
  - `.dg-text-muted` / `.dg-text-faint` → `.dg-muted` / `.dg-faint`, which now live in the utilities layer (they win over a component's own text color, like the old `.dg-text-*` versions did).

### Changed — New default corners ("semi") ⚠ visual change
- **The default look is less rounded.** Corners now default to "semi": 5px on small parts (checkbox) and 10px on everything else — buttons, fields, cards, badges, modals, dock. Before 1.3 the default was rounded: soft corners with pill buttons. **To keep the previous look, add one attribute:** `<html data-radius="full">`.
- Corners have three options for the whole framework, set with `data-radius` on `<html>` or on any container: the default / `"semi"`, `"full"` (rounded: soft corners, pill buttons and pill one-line fields; the textarea keeps 22px) and `"none"` (square everywhere). Each mode sets every radius token, so all components follow it. True circles drawn with 50% (avatars, radios, spinners) stay round; the checkbox follows the mode (`--dg-check-radius`) and its checking ring follows the shape. `--dg-bar-radius` (bars hanging from the top edge, matching the iPhone screen corner) only changes in `"none"`.
- New tokens: `--dg-field-radius` (one-line fields: input, select, combobox, input groups — including a button inside the group), `--dg-field-radius-multiline` (textarea), `--dg-check-radius`, `--dg-dock-item-radius`. The last fixed radii (3px, 6px, dock items) now go through the tokens. `.dg-input-pill` forces a pill field in any mode.

### Added — Corner style switch, like the color theme
- `data-dg-radius-toggle` on a button cycles the corner style (semi → full → none); `data-dg-radius-set="none"` sets one. Without a target they act on `<html>` and the choice is remembered (`localStorage` "dg-radius") and restored on the next visit, as `data-dg-theme-toggle` does; with `data-dg-target="#id"` they change only that container.
- JavaScript: `dgarz.setRadius(value, el?)`, `dgarz.toggleRadius(el?)`, `dgarz.getRadius(el?)`, and a `dg:radiuschange` event with `{ radius }`.
- The change animates: every corner morphs for 0.5s (`[data-dg-radius-morph]`, set for 600ms), except with reduced motion.

### Added — Text case utilities
- `.dg-lowercase`, `.dg-capitalize` and `.dg-normal-case` (undoes a case change inherited from a wrapper, e.g. inside `.dg-uppercase`), next to the existing `.dg-uppercase`.

### Added — `--dg-control-bg`
- New token for the fill of the switch track and the check box: the background they sit on. It defaults to `--dg-paper`, and `.dg-card`, `.dg-modal`, `.dg-menu`, `.dg-popover`, `.dg-drawer` and every `.dg-bg-*` utility (surfaces, white/black, light/dark, the semantic and primary/secondary scales, sand/cream/graphite) set it to their own fill, so the controls are never see-through and always match their container. Set it on any wrapper with a custom background.

### Fixed — No zoom when focusing a field on iPhone
- iOS Safari zoomed the page when a field with text under 16px got focus (fields use 14px, the small size 12px). On touch screens (`pointer: coarse`) inputs, textareas, selects, the combobox input and native fields in `.dg-auto` now use at least 16px; desktop keeps 14px. Page zoom stays available (no `maximum-scale`).

### Added — Form controls
- **Date range** (`.dg-datepicker[data-range]`): one calendar picks start and end; the days in between are tinted and a hint says which end is next. Value: `dd/mm/yyyy – dd/mm/yyyy`.
- **Time picker** (`.dg-timepicker` or `data-time-only`): hours and minutes only, value `HH:mm`; `data-minute-step` (e.g. 15) sets the minute increment.
- **Number with − / +** (`.dg-number` + `.dg-number-btn[data-step]`): uses the input's `min`, `max` and `step`, fires `input`/`change` and disables a button at its limit.
- **Option cards** (`.dg-check.dg-option-card` with `-body`, `-title`, `-desc`, `-meta`): a radio or checkbox as a selectable card; the selected one gets a 2px outline.
- **Verification code** (`.dg-otp` + `.dg-otp-input`): auto-advance, backspace goes back, arrows move, pasting fills every box; fires `dg:complete` with `{ value }`. `data-otp-type="text"` accepts letters.
- **Character counter** (`.dg-counter[data-counter-for="id"]`): counts against the field's `maxlength` (or `data-max`); `is-near` from 90 %, `is-over` past the limit. Sits next to `.dg-help` in the new `.dg-field-foot`.
- **Autosize textarea** (`.dg-textarea[data-autosize]`): grows with its text up to 20em (native `field-sizing`, with a script fallback).
- **Free tags** (`.dg-tags` + `.dg-tags-input`): Enter, comma or Tab adds a tag, Backspace removes the last, a pasted list is split; duplicates flash instead of repeating. `data-value` (starting tags), `data-max`, an optional hidden input, and a `dg:change` event with `{ values }`. Uses the combobox chip.
- **Rating** (`.dg-rating`): native radios 1…n drawn as stars, with hover preview, keyboard arrows and no JavaScript; disabled inputs make it read-only; sized with `dg-text-*`.
- **Form layout**: `.dg-fieldset` + `.dg-legend` (titled groups), `.dg-field-row` (label on the left from 768px), `.dg-label.is-required` (asterisk) and `.dg-label-optional`.

### Fixed — Datepicker
- With time or range, picking a day closed the calendar: the click landed on a cell that had just been re-rendered and was read as an outside click. Outside clicks now use the event path.
- `data-min` / `data-max` were read as UTC and could shift one day back west of Greenwich; they are now local dates.

### Changed — Size budgets
- `check-size` budgets raised for the 1.3.0 components: `dgarz.min.css` 45 KB, `dgarz.full.min.css` 49 KB, `dgarz.min.js` 18 KB, `dgarz.esm.js` 24 KB (gzip).

### Changed — Alert footer
- Status and confirmation modals (`.dg-modal-confirm`, `.dg-modal-accent`, or with `.dg-modal-status-hero`, which includes `dgAlert` / `dgConfirm` / `dgPrompt`) no longer float their footer in a gray box: the buttons sit centered on the modal, so the alert follows the same corners and surface as everything else.
- `.dg-btn-cancel` inside a modal is a tint of the text color instead of a fixed gray (#b8b8bf), so it reads as the secondary action in both themes.

### Fixed — Modals and drawers open with their animation every time (Safari)
- In Safari, from the second opening on, an overlay could appear at its final state with no entrance ("dry"): the engine kept the animations of the previous opening. `openOverlay` now restarts every entrance (backdrop, modal effect, content) from its first frame with one style pass of `animation-name: none` (`.dg-anim-restart`, last layer) before anything paints. No visible change in other browsers.

### Fixed — Warning as a text color
- `.dg-text-warning` used the fill yellow (#eab308, 1.9:1 on white). It now uses the new `--dg-warning-text` token: #854d0e in light (≥ 4.5:1 on every surface), the same yellow in dark. Fills, buttons, badges and alerts do not change. `check-contrast` now audits this token too.

### Fixed — Input masks, timeline and combobox
- Input masks (`data-mask`, `data-mask-pattern`) dropped every character typed where the mask expects a literal: a phone number stayed empty (its mask starts with "("), a card stopped at 4 digits and `AA-9999` at the letters. The typed letters and digits are now read regardless of their position.
- `.dg-timeline-dot` drew its ring with a border, which the flat reset removes: pending and in-progress dots were invisible and their white fill cut the line. The ring is now an outline over the background the timeline sits on (`--dg-control-bg`); the in-progress dot shows a solid ring with a dot inside.
- `.dg-combobox-label` (the option text the script reads) now has styles: it takes the free space and truncates.

### Fixed — Color contrast (WCAG AA)
- Every shipped text/background token pair now reaches 4.5:1 in both themes (`node core/scripts/check-contrast.mjs`: 80 pairs, 0 failures). Text colors: `--dg-on-danger-subtle` #c81e1e (was #dc2626, 4.4:1), `--dg-on-danger-light` #450a0a (was #7f1d1d, 3.6:1), `--dg-on-info-light` #172554 (was #1e3a8a, 4.1:1), dark `--dg-on-warning-dark` #fefce8 (was #fef08a, 4.2:1). Fill: `--dg-success` #15803d (was #16a34a: white text was 3.3:1) and `--dg-success-dark` #166534 to stay a step darker — the Success button, badge and alert are slightly deeper green.

### Fixed — Surfaces
- A focused `.dg-input-group` now marks the whole group (field + addon or button) with one 1px line in the text color, following the group's corners; before, only the inner field showed a ring (its box-shadow ring was removed by the flat reset).
- Focused text fields (`.dg-input`, `.dg-textarea`, `.dg-select` and native inputs) showed a double border: their own darker border plus the flat layer's 2px focus ring. Fields now keep only their border; checkboxes, switches, buttons and links keep the ring.
- `.dg-surface-gradient-cool`, `-warm` and `-aurora` are light in both themes and now carry their own dark ink (`--dg-text`, `--dg-text-muted`), so their text is readable in dark mode.
- A `.dg-spinner` inside a button now takes the button's text color (white on a solid button) instead of the page text color.
- `.dg-surface-glass` and `.dg-surface-glass-strong` were 94–96 % opaque and looked like a solid card. They now follow `--dg-glass-alpha` (72 %; strong adds 14 %), the same translucency as the glass components; `.dg-surface-glass-dark` too. They still turn solid with reduced transparency or without `backdrop-filter`.
- `.dg-surface-noise` replaced the surface's background (a gradient + noise card lost its gradient and turned transparent). The grain is now a layer on top.
- `.dg-surface-glass-dark` redefines `--dg-text` / `--dg-text-muted`, so card titles and muted text inside turn white instead of staying dark on dark.
- Docs: brand identity — the `dg` logo, white (black in dark) pages with the framework's text colors, white demo panels and landing cards with a subtle 1px line, light neutral code blocks with no border, and the steel-blue palette as the primary: slate #354B60 for text accents (mist #B8D0DE in dark), a mist → ink gradient on the accent marks, and a cold light (frost into ink) behind every glass demo.
- Docs: every example's code now matches its demo exactly (231 examples checked): empty code blocks are filled from the demo markup, demos no longer use docs-only classes or inline styles, and drawer demos render from the same markup their code shows. The header and favicon use the `dg` monogram.
- Docs: the Surfaces page was rewritten (one comparison per family, what each variant is for, a real example, brand override, class table) and every glass demo in the docs now sits on a Swiss poster backdrop instead of stock photos and color blobs.

### Changed — Swiss typography by default
- Headings (`h1`–`h3`, `.dg-display`, `.dg-h1`–`.dg-h3`), card titles, brand marks (navbar, app), big figures (`.dg-stat-value`, `.dg-pricing-amount`), empty-state titles, carousel captions and quotes (`.dg-quote`, testimonials) now use `--dg-font-heading`, which defaults to **Geist** instead of Gambetta. Headings are firmer and tighter (600, −0.025em; display 700, −0.04em); figures use tabular numbers; quotes are no longer italic.
- **To keep the previous editorial look:** `:root { --dg-font-heading: var(--dg-font-serif); }`. Gambetta stays available as `.dg-font-serif` / `.dg-serif`.
- A heading set in `.dg-font-condensed` keeps its own −0.01em tracking.

### Changed — Flat gradients
- `.dg-gradient-{primary,secondary,success,warning,danger,info}` are a clean diagonal from the light to the subtle tone of each color (primary, the brand's solid color, runs dark from the base to the dark tone and inverts with the theme); the dark radial blobs (they read as shadows, worst on warning) are gone. In dark, warning starts darker and uses white text (contrast ≥ 5.2:1 across the whole gradient).

### Changed — Subtle borders by default
- Every structural border of the framework uses the subtle `--dg-border` (#dcdce0; #2a2a2e in dark) instead of `--dg-border-strong`: form fields (`--dg-field-border` now points to `--dg-border`: inputs, selects, textareas, dropdown triggers, combobox, dock), tables (card, rows, caption, bordered cells, sticky header line, mobile card view), accordion, bordered collapse, outline badge, file dropzone, the alert side mark, `kbd` and the combobox check box. The switch and check edge is 14% of the text color. Outline buttons keep their colored border (it is the variant). Set `--dg-field-border: var(--dg-border-strong)` to bring back the stronger field edge.
- Docs: the editorial rules are subtle too (`--doc-rule` 10%, `--doc-rule-strong` 18% of the text color instead of solid black); section openers keep their 2px weight.

### Changed — Square tables
- Table headers (`th` in `.dg-table` and in `.dg-auto` tables) have a subtle gray fill by default (`--dg-surface-2`); the sticky header uses the same gray.
- `.dg-table-card` and the mobile `.dg-table-rowcard` have square corners (radius 0) by default; `.dg-table-square` stays as a no-op alias.

### Changed — Tabs
- Underline tabs (`.dg-tabs`) show a subtle 1px baseline under the whole row (a background, so the flat reset keeps it; color via `--dg-tabs-line`), and the active tab's 2px black line sits on it with square ends. Pill and enclosed tabs are unchanged.

## [1.2.0] — 2026-11-09

### Compatibility
- **Nothing breaks on upgrade from 1.1.0:** the package root (`import 'dgarz-design'`, `require('dgarz-design')`) still delivers the classic JS (`dgarz.esm.js` / `dgarz.js`) and every 1.1.0 CSS path is unchanged. The root types expose only component types (`dist/root.d.mts`).
- **New:** the Stencil component core is published at `dgarz-design/core` (with `/components`, `/hydrate`, `/tokens`, `/legacy`). Switching the root to it is planned for 2.0.
- **Changed — cascade layers:** the CSS now uses `@layer` (`dg.reset → dg.base → dg.layout → dg.components → dg.utilities → dg.flat`). Utilities always win over components, and your own CSS (outside any layer) always wins over the framework without `!important`. If your site relied on the framework beating a less specific rule of yours, check it after upgrading. `!important` went from 55 to 35 (only intentional state overrides remain).
- **Fixed:** CSS-only tooltips (`.dg-tooltip[data-tip]`) showed a second bubble from the JS tooltip; the JS tooltip now skips them.
- **Layers in detail:** all framework layers are nested under one `dg` layer (`dg.reset`, `dg.base`, `dg.layout`, `dg.components`, `dg.utilities`, `dg.flat`), so your own layers can be ordered around the whole framework (`@layer dg, my-app;`), and a sublayer like `dg.docs` declared before the CSS (`@layer dg.reset, dg.base, dg.layout, dg.components, dg.docs, dg.utilities, dg.flat;`) sits between components and utilities. The app pack joins `dg.components` (after the core components); surface FX (`dg-surface-glass`, `-liquid`, `-gradient-*`) load at the start of `dg.utilities`, so they beat the component and an explicit utility still wins. Rules that style a component inside a layout moved to `components/_contexts.scss`.
- **Changed:** `.dg-link` inherits the color of its text (what browsers already showed, because the reset won before); `.dg-menu` always aligns its items to the start; `dg-sticky` and `dg-flex-1` defaults use `:where()` so `dg-top-*` / `dg-min-h-*` win.
- **Verified:** computed styles of every docs page and Studio hero, before vs after layers: only intended changes remain (utilities that now win: `dg-text-right` in table cells, `dg-menu-end`, `dg-rounded-0` on skeletons, `dg-pb-3` on the app brand).


### Opt-in glass for buttons
- Colors are solid by default; `.is-glass` makes any filled button variant translucent with backdrop blur while keeping its color and text (solid, semantic, cancel, subtle, outline, ghost). Text and gradient variants ignore it.
- New tokens `--dg-glass-alpha`, `--dg-glass-alpha-soft`, `--dg-glass-alpha-hover` and `--dg-glass-filter`; glass hover/focus becomes more opaque instead of fading.
- Glass falls back to solid under `prefers-reduced-transparency: reduce` or without `backdrop-filter` support.
- **Changed:** `.dg-btn-group` is now a solid capsule by default; add `.is-glass` for the previous translucent look. `.dg-btn-glass` stays glass and now follows the shared tokens.
- `verify:button-classes` covers glass on every variant, hover, group and the reduced-transparency fallback.
- `<dgarz-button glass>`: new reflected `glass` prop (React/Vue/Angular adapters included) with `--dgarz-glass-*` tokens and the same solid fallback.

### Focus carousel

- `.dg-carousel-focus` (with `data-dg-carousel`): the active slide sits in the center at full size and the others scale down with their distance (70%, 50%, 40%), looping; slides three or more steps away fade out so none is seen crossing the screen. On load the slides start stacked in the center and spread out to their places (1.6s, `.is-entering`). Works with `data-dg-carousel-autoplay`, the pause button, keyboard and swipe. Sizes: `dg-focus-sm`, default, `dg-focus-lg`; custom with `--dg-focus-w` and `--dg-focus-gap`.

### Two-line menu icon

- New `#dg-menu-2` (two lines, as used by the top menu and navbars) and `#dg-globe` in the icon sprite; 38 icons.

### Complete utility scales and responsive utilities

- **Generated scales** (`abstracts/_scales.scss`): every family now has every step, from one source.
  - Margin, padding and gap on every side (`m/p` + `t r b l x y`, `gap-x/-y`) with the space scale 0–9 (new `9` = 96px); margins also `auto` and negatives `n1–n9` (`dg-mt-n4`). New `dg-m-*`.
  - Sizes: one px series (16 → 720, `max-w` up to 1440) for `w`, `h`, `min-w`, `min-h`, `max-w`, `max-h`; percentages `dg-w-{10…100}p` (33 and 66 included); viewport `25/50/75/100` vw/vh; `auto`, `fit`, `min`, `max`, `full`, `none`; `dg-size-*` (width and height).
  - Offsets `dg-top/right/bottom/left-{0…9}`, `-{25,50,75,100}p`, `-auto`, `dg-inset-x-0`, `dg-inset-y-0`.
  - Grid: `dg-grid-cols-{1…12}` (includes `display: grid`), `dg-span-{1…12}`, `dg-span-full`, `dg-grid-rows-{1…6}`, `dg-row-span-{1…6}`, `dg-grid-flow-*`, `dg-place-items/self-*`, `dg-justify-items-*`.
  - Rounded sides `dg-rounded-{t,b,l,r}[-0|-sm|-lg|-xl|-pill]`; type `dg-text-justify/start/end`, `dg-lowercase`, `dg-capitalize`, `dg-normal-case`, `dg-not-italic`, `dg-line-clamp-{1…5}`, `dg-leading-relaxed`, lists `dg-list-none/disc/decimal/inside`; `dg-contents`, `dg-flow-root`, `dg-inline-grid`, `dg-flex-auto`, `dg-flex-none`, `dg-justify-evenly`; `dg-overflow-visible/-x-hidden/-y-hidden`, `dg-overscroll-contain`, `dg-z-0`, `dg-z-auto`, `dg-opacity-{10…90}`, `dg-aspect-3-2/9-16/21-9`, `dg-object-left/right/fill/none`.
- **More families for any kind of page:** gray scale `dg-text-gray-*` / `dg-bg-gray-*` (0–950), `dg-text-current/inherit`, `dg-bg-transparent`; big and fluid type `dg-text-6xl…9xl`, `dg-text-fluid-sm/md/lg/xl`; `dg-fw-thin/light/black`, `dg-leading-loose`, `dg-tracking-tighter`, `dg-text-pretty`, `dg-tabular-nums`, `dg-hyphens-auto`, `dg-whitespace-pre`, `dg-underline-offset-*`; text columns `dg-columns-1…4` + `dg-break-inside-avoid`; transforms with individual properties so they combine (`dg-rotate-*`, `dg-scale-50…125`, `dg-translate-center/-x-n50/-y-n50`, `dg-center-abs`, `dg-flip-x/y`); filters `dg-blur-*`, `dg-brightness-110/125`, `dg-contrast-125`, `dg-invert`, `dg-sepia`, `dg-backdrop-blur-*`, blend `dg-mix-*`, `dg-isolate`; photo scrims `dg-scrim-b/t/full/light-b`; children `dg-space-y-*`, `dg-space-x-*`, `dg-divide-y/x` (1px background lines, unaffected by the flat reset); hover `dg-hover-lift/scale-105/opacity-*/underline/bg-surface-*` and group hover `dg-group` + `dg-group-hover-scale-105/110/opacity-*/underline/nudge/x/lift` (reduced motion respected); `dg-scroll-mt-*`, `dg-scrollbar-none`, `dg-overscroll-none`, `dg-touch-*`, `dg-appearance-none`, `dg-resize-*`, more cursors; `dg-z-n1/60/100/max`, `dg-aspect-4-5/5-4/2-1`, `dg-ring-2`; theme `dg-only-light/dark`; print `dg-print-hidden/only/break-*`. Responsive copies also for big type and columns.
- **Fix:** `dg-sticky` sets its `top: 0` at zero specificity, so `dg-sticky dg-top-6` keeps the offset.
- **Responsive utilities, mobile first:** `dg-md-*` (≥768px), `dg-lg-*` (≥992px), `dg-xl-*` (≥1200px) for display, position, flex (direction, wrap, justify, items, self, content, `flex-1`, `grow`, order), grid, gap, margin and padding (no negatives), text align and size, and fluid widths/heights. They load last, so they win over base utilities.
- Docs: new page Fundamentos › Escalas (scale reference + examples); Utilidades updated.
- Size: `dgarz.min.css` 30 → 41 KB gzip (201 → 269 KB minified; 2,836 classes).
- Fixes found by comparing computed styles on every docs page and hero (old vs new CSS): generated sides are emitted all → x/y → single side, so `dg-py-2 dg-pb-6` keeps bottom 6; the `min-height: 0` of `dg-flex-1` now has zero specificity (`:where`), so a `dg-min-h-*` on the same element wins.

### Utilities always win, and composition utilities

- **Load order:** utilities now load after layout and components (still before the flat reset), so a utility on an element applies even when the component sets the same property (`dg-pb-0` on `dg-section`, `dg-gap-0` on `dg-stack`, `dg-text-lg` on `dg-card-title`, `dg-max-w-*` on tables). Docs fix: the toast demo buttons use `dg-btn-subtle-*` instead of `dg-text-*` on a dark button.
- **Changed:** `dg-uppercase` only changes the case; the 0.08em spacing moved to `dg-tracking-wide`. New `dg-tracking-wider` and `dg-tracking-widest`.
- **New utilities** (Fundamentos › Composición). The scales are short and closed on purpose: quarters of the screen and of the container, the page edges. A new design fits these steps instead of adding one of its own.
  - Flex: `dg-flex-col`, `dg-flex-row`, `dg-flex-1` (basis 0), `dg-shrink-0`, `dg-g-0` (row without gutter).
  - Viewport sizes (svh): `dg-min-h-screen`, `dg-h-screen`, `dg-h-/min-h-/max-h-{25,50,75}vh`, `dg-w-{25,50,75}vw`, `dg-min-h-150vh` (room to scroll a parallax), `dg-h-px`.
  - Media: `dg-aspect-3-4/2-3/16-10`, `dg-object-top/center/bottom`, `dg-scale-150/200`, `dg-origin-top/center/bottom`.
  - Radius: `dg-rounded-full`, `dg-rounded-t-xl/b-xl`, one corner `dg-rounded-{tl,tr,bl,br}-full` (an arch).
  - Position: `dg-top/right/bottom/left-{0,4,5}` (page edges), `dg-top-/left-{25,50,75,100}p` (quarters of the parent), `dg-mt-n{4,6,8}`.
  - Type: `dg-font-condensed` (new `--dg-font-condensed` token, Anton first), `dg-fw-normal`, `dg-leading-none/display`, `dg-em-{25,50,75}`, `dg-align-top/middle`, `dg-vertical`, `dg-vertical-up`.
  - Text that fills its container: `dg-cq` + `dg-fit-{4…10,12,16,20}` (a count of letters, so the steps are consecutive) + `dg-fit-cap-{20,30,40,50}`.
  - Overlap: `dg-overlap-{10,20,30,40,50}` (the next element rises by that share of the font size).
  - Slower entrances: `dg-anim-slow` (1.2s) and `dg-anim-slower` (1.8s) for `dg-fade-in-*` / `dg-pop-in`.
  - CSS-only parallax: `dg-parallax-slow/-mid/-fast` (scroll-driven; static where unsupported, off with reduced motion) and `dg-overflow-clip` (clips without breaking `position: sticky`).
  - Lines and rings (survive the flat reset): `dg-ring`, `dg-bg-current`.
  - Layers: `dg-layers` (children share one cell, one track as wide as the container) with `dg-justify-self-start/center/end` (center is `unsafe`, so an oversized title overflows evenly).
  - Filters and masks: `dg-grayscale`, `dg-brightness-50/75`, `dg-mask-fade-x/-y`.
  - Motion: `dg-marquee` + `dg-marquee-track` (looping row, or column with `dg-marquee-y`; repeat the items once for a seamless loop; pauses on hover/focus, static with reduced motion; `-slow`, `-fast`, `-reverse`, `dg-marquee-gap-2/-4`).
  - Editorial surfaces, fixed in both themes and setting text colors inside: `dg-bg-sand`, `dg-bg-sand-deep`, `dg-bg-cream`, `dg-bg-graphite` (tokens `--dg-sand`, `--dg-sand-deep`, `--dg-cream`, `--dg-graphite`). Ink for a whole subtree: `dg-ink-danger/black/white`.

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
