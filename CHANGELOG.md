# Changelog

All notable changes to **dgarz design** are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/) and the project adheres to [Semantic Versioning](https://semver.org/).

## [1.2.0] — 2026-09-20

### Changed
- **Modal**: status-accent variants (`.dg-modal-accent` + `is-success`/`is-warning`/`is-danger`/`is-info`) inheriting the same color language as alerts/callouts.
- **Modal**: optional glow effects — a pulsing inner halo (`.dg-modal-glow`) and a spinning gradient ring (`.dg-modal-glow-spin`), both status-aware, plus a duotone variant.
- **Modal**: large icon hero + status tag layout (`.dg-modal-status-hero`, `.dg-status-tag`) for result/confirmation modals.
- **Modal**: onboarding variant (`.dg-modal-onboard`) with stepped media, step label and progress dots.

## [1.1.0] — 2026-06-24

### Added
- **Modal**: glass background by default (`backdrop-filter` blur + saturation) with a `.is-solid` opaque variant.
- **Modal**: edge positioning — `.dg-pos-top` / `.dg-pos-bottom` / `.dg-pos-left` / `.dg-pos-right` — with direction-aware enter/exit animations.
- **Modal**: additional sizes (`sm`, `lg`, `xl`, `full`) and a compact bar/snackbar variant (`.dg-modal-bar`).
- **Modal**: centered confirmation layout with icon, plus `dgConfirm` / `dgAlert` / `dgPrompt` JS helpers (`core/src/js/confirm.js`).

## [1.0.0] — 2026-05-28

### Added
- **Core**: design tokens (`--dg-*`), reset, editorial typography (Newsreader + Geist), 12-column responsive grid with `sm`/`md`/`lg` breakpoints and offsets, utility classes.
- **Components**: buttons, button groups, inputs/select/textarea, checkbox/radio/switch, input groups, cards, badges, alerts, toasts, tables, navbar, tabs, segmented control, dropdown, modal, avatar, progress, spinner, tooltip.
- **App pack** (`dgarz-app.css`): app shell with collapsible sidebar + mobile drawer, off-canvas drawer, accordion, breadcrumbs, pagination, steps/stepper, skeleton loaders, empty states, list groups, stat cards, form validation states, chips, popover, styled scrollbars.
- **Behavior layer** (`dgarz.js`): attribute-driven, accessible (focus-trap, keyboard nav, ARIA), zero-dependency. Handles theme toggle, overlays, dropdowns, tabs, accordions, segmented groups and toasts. Ships UMD, minified and ES-module builds.
- **Icons**: 30-icon monochrome SVG sprite.
- **Theming**: full light/dark via a single `data-theme` attribute.
- **Distribution**: `dist/` with split and combined builds (`dgarz`, `dgarz-app`, `dgarz.full`), minified variants, npm package and jsDelivr/unpkg support.
- **Docs**: interactive component showcase + a real dashboard demo.

[1.2.0]: https://github.com/dgarzonz/dgarz-design/releases/tag/v1.2.0
[1.1.0]: https://github.com/dgarzonz/dgarz-design/releases/tag/v1.1.0
[1.0.0]: https://github.com/dgarzonz/dgarz-design/releases/tag/v1.0.0
