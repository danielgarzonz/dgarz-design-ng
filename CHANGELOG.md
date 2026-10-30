# Changelog

All notable changes to **dgarz design** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased] — 1.2.0

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
