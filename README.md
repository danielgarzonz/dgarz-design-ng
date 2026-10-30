# dgarz design

A minimal, **monochrome**, performance-first CSS framework. Elegant serif headings (Newsreader), a clean grotesque body (Geist), pill-forward shapes, and full light/dark theming built in. Zero dependencies — one stylesheet.

---

## Install

### npm

```bash
npm install dgarz-design
```

```js
// CSS — pick one
import "dgarz-design/full";  // everything at once
import "dgarz-design/css";   // core + components
import "dgarz-design/app";   // optional app pack (load after css)

// JS behavior layer (optional, auto-initializes)
import dgarz from "dgarz-design";
dgarz.toast("Hello!");
```

### CDN

```html
<!-- Fonts -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono&family=Newsreader:ital@0;1&display=swap" rel="stylesheet">

<!-- Styles -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz.full.min.css">

<!-- Optional behavior layer -->
<script src="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz.min.js" defer></script>
```

Pick only what you need:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz-app.min.css">
```

---

## Files

| File | Contents |
|------|----------|
| `dist/dgarz.css` / `.min.css` | Core (tokens, reset, grid, type, utilities) + components |
| `dist/dgarz-app.css` / `.min.css` | App pack (shell, drawer, accordion, steps, stat cards…) |
| `dist/dgarz.full.css` / `.min.css` | Everything in one file |
| `dist/dgarz.js` / `.min.js` | Behavior layer — UMD (browser global `window.dgarz`) |
| `dist/dgarz.esm.js` | Behavior layer — ES module |
| `dist/dgarz-icons.svg` | Icon sprite (36 icons, 24×24, stroke-based) |

---

## Development

**Requirements:** Node.js ≥ 22

```bash
git clone https://github.com/dgarzonz/dgarz-design.git
cd dgarz-design
npm install
```

### Dev

```bash
# Watch SCSS and rebuild core/dist/ on save
npm run dev:core

# Docs site at http://localhost:4321 (syncs core/dist automatically)
npm run dev:docs

# Both at once
npm run dev
```

### Build

```bash
npm run build       # core/dist/ (CSS + JS)
npm run build:docs  # static docs site
```

### Publish

```bash
cd core
npm publish
```

---

## Browser support

Chrome/Edge 111+, Firefox 113+, Safari 16.4+.

Uses `color-mix()`, `:has()`, and `backdrop-filter`. No polyfills provided.

---

## License

[MIT](./LICENSE) © dgarz design
