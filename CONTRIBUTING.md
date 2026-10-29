# Contributing to dgarz design

Thanks for your interest in contributing. This guide covers everything you need to get started.

## Prerequisites

- Node.js ≥ 22
- npm ≥ 10

## Setup

```bash
git clone https://github.com/dgarzonz/dgarz-design.git
cd dgarz-design
npm install
```

## Project structure

```
dgarz-design/
├── core/               # npm package — source + dist
│   ├── src/
│   │   ├── scss/       # SCSS source files
│   │   ├── js/         # Behavior layer
│   │   └── icons/      # SVG sprite source
│   └── dist/           # Compiled output (do not edit manually)
├── docs/               # Documentation site (Astro)
└── examples/           # Standalone HTML examples
```

## Development

Open two terminals:

```bash
# Terminal 1 — watch SCSS, rebuilds core/dist/ on save
npm run dev:core

# Terminal 2 — docs site at http://localhost:4321
npm run dev:docs
```

Or run both at once:

```bash
npm run dev
```

## Naming conventions

- All CSS classes use the `dg-` prefix: `.dg-btn`, `.dg-card`, `.dg-input`.
- Variants follow `dg-[component]-[variant]`: `.dg-btn-primary`, `.dg-badge-success`.
- State classes use `.is-[state]`: `.is-active`, `.is-open`, `.is-loading`.
- CSS custom properties live under `--dg-`: `--dg-solid`, `--dg-radius`, `--dg-space-4`.
- JavaScript behavior is driven by `data-dg-*` attributes only — no class-based JS hooks.

## Before submitting a PR

1. Run the full build and make sure it completes without errors:

   ```bash
   npm run build
   ```

2. Test your changes against the docs site — open `http://localhost:4321` and verify visually.

3. If you added a new component or variant, add a usage example in the relevant docs page under `docs/src/pages/`.

4. Keep PRs focused: one feature or fix per PR. Large refactors should be discussed in an Issue first.

## Reporting issues

Open an issue at [github.com/dgarzonz/dgarz-design/issues](https://github.com/dgarzonz/dgarz-design/issues) and include:

- A clear description of the bug or request.
- Steps to reproduce (for bugs).
- Browser and OS version (for visual bugs).

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](./LICENSE).
