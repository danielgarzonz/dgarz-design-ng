# dgarz design

A minimal, **monochrome**, performance-first CSS framework. Elegant serif headings (Newsreader), a clean grotesque body (Geist), pill-forward shapes, and full light/dark theming. Zero dependencies — one stylesheet.

**[Full documentation →](https://dgarzonz.github.io/dgarz-design)**

## Install

```bash
npm install dgarz-design
```

```js
import "dgarz-design";       // core + components
import "dgarz-design/app";   // optional app pack
import "dgarz-design/full";  // everything at once
```

## CDN

Siempre última versión 1.x (recomendado):

```html
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono&family=Newsreader:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz.full.min.css">
<script src="https://cdn.jsdelivr.net/npm/dgarz-design@1/dist/dgarz.min.js" defer></script>
```

Versión fija 1.1.0:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/dgarz-design@1.1.0/dist/dgarz.full.min.css">
<script src="https://cdn.jsdelivr.net/npm/dgarz-design@1.1.0/dist/dgarz.min.js" defer></script>
```

unpkg:

```html
<link rel="stylesheet" href="https://unpkg.com/dgarz-design@1.1.0/dist/dgarz.full.min.css">
<script src="https://unpkg.com/dgarz-design@1.1.0/dist/dgarz.min.js" defer></script>
```

## Quick start

```html
<html data-theme="light">
  <body>
    <button class="dg-btn dg-btn-primary">Get started</button>

    <div class="dg-row">
      <div class="dg-col-12 dg-col-md-6">Left half</div>
      <div class="dg-col-12 dg-col-md-6">Right half</div>
    </div>
  </body>
</html>
```

## Files

| Import | File |
|--------|------|
| `"dgarz-design"` | `dist/dgarz.js` (UMD) / `dist/dgarz.esm.js` (ESM) |
| `"dgarz-design/css"` | `dist/dgarz.css` |
| `"dgarz-design/full"` | `dist/dgarz.full.css` |
| `"dgarz-design/app"` | `dist/dgarz-app.css` |
| `"dgarz-design/icons"` | `dist/dgarz-icons.svg` |

## Browser support

Chrome/Edge 111+, Firefox 113+, Safari 16.4+.

## License

[MIT](./LICENSE) © dgarz design
