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
  server: { host: '0.0.0.0', port: 4321 },

  vite: {
    server: {
      fs: { allow: ['..'] },
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
            const types = { css: 'text/css', js: 'application/javascript', svg: 'image/svg+xml' };
            res.setHeader('Content-Type', types[ext] ?? 'application/octet-stream');
            res.setHeader('Cache-Control', 'no-cache');
            createReadStream(file).pipe(res);
          });
        },
      },
    ],
  },
});
