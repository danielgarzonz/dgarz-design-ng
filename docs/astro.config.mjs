// @ts-check
import { defineConfig } from 'astro/config';
import { createReadStream, existsSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const coreDist = resolve(__dirname, '../core/dist');

export default defineConfig({
  site: 'https://dgarz-design.github.io/dgarz-design',
  devToolbar: { enabled: false },
  // Old Spanish routes → English routes (2026-11). Vercel answers them with a
  // 308 from vercel.json; on any other host Astro generates redirect pages.
  redirects: {
    '/comenzar/changelog': '/getting-started/changelog',
    '/comenzar/core': '/getting-started/core',
    '/comenzar/frameworks': '/getting-started/frameworks',
    '/comenzar/install': '/getting-started/install',
    '/comenzar/intro': '/getting-started/intro',
    '/comenzar/js': '/getting-started/js',
    '/fundamentos/animaciones': '/foundations/animations',
    '/fundamentos/auto': '/foundations/semantic-html',
    '/fundamentos/bordes': '/foundations/borders',
    '/fundamentos/color': '/foundations/color',
    '/fundamentos/composicion': '/foundations/composition',
    '/fundamentos/display': '/foundations/display',
    '/fundamentos/escalas': '/foundations/scales',
    '/fundamentos/espaciado': '/foundations/spacing',
    '/fundamentos/flex': '/foundations/flex',
    '/fundamentos/grid': '/foundations/grid',
    '/fundamentos/interaccion': '/foundations/interaction',
    '/fundamentos/sombras': '/foundations/shadows',
    '/fundamentos/superficies': '/foundations/surfaces',
    '/fundamentos/text-effects': '/foundations/text-effects',
    '/fundamentos/tokens': '/foundations/tokens',
    '/fundamentos/typography': '/foundations/typography',
    '/fundamentos/visibilidad': '/foundations/visibility',
    '/formularios/floating-labels': '/forms/floating-labels',
    '/formularios/forms': '/forms/controls',
    '/formularios/variants': '/forms/variants',
    '/componentes/alerts': '/components/alerts',
    '/componentes/badges': '/components/badges',
    '/componentes/buttons': '/components/buttons',
    '/componentes/callouts': '/components/callouts',
    '/componentes/cards': '/components/cards',
    '/componentes/carousel': '/components/carousel',
    '/componentes/chips': '/components/chips',
    '/componentes/collapse': '/components/collapse',
    '/componentes/drawer': '/components/drawer',
    '/componentes/dropdown': '/components/dropdown',
    '/componentes/figures': '/components/figures',
    '/componentes/misc': '/components/misc',
    '/componentes/modales': '/components/modals',
    '/componentes/nav': '/components/nav',
    '/componentes/overlays': '/components/overlays',
    '/componentes/popover': '/components/popover',
    '/componentes/tables': '/components/tables',
    '/componentes/toasts': '/components/toasts',
    '/utilidades/utilities': '/utilities',
  },
  server: { host: '0.0.0.0', port: 4321 },

  vite: {
    server: {
      strictPort: true,
      fs: { allow: ['..'] },
    },
    ssr: {
      external: ['dgarz-design', 'dgarz-design/hydrate'],
    },
    plugins: [
      {
        name: 'serve-core-dist',
        apply: 'serve',
        configureServer(server) {
          server.middlewares.use('/__core', (req, res, next) => {
            const file = resolve(coreDist, decodeURIComponent(req.url ?? '').replace(/^\//, ''));
            if (!existsSync(file)) { next(); return; }
            const ext = file.split('.').pop()?.toLowerCase() ?? '';
            const types = {
              css: 'text/css',
              js: 'application/javascript',
              mjs: 'application/javascript',
              svg: 'image/svg+xml',
              json: 'application/json',
            };
            res.setHeader('Content-Type', types[ext] ?? 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            createReadStream(file).pipe(res);
          });
        },
      },
    ],
  },
});
