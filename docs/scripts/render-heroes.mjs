// Renders the Studio › Heroes gallery thumbnails to WebP.
//
//   node docs/scripts/render-heroes.mjs [baseUrl]
//
// Captures each full-screen view (/studio/heroes/<id>) at a 1280×800
// viewport with the viewer bar hidden and the entrance animations finished.
// Needs the docs running (`npm run dev` in docs/, default http://localhost:4321).
// Output: docs/public/showcase/heroes/<id>.webp (2x).
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const base = (process.argv[2] || 'http://localhost:4321').replace(/\/$/, '');
const outDir = fileURLToPath(new URL('../public/showcase/heroes/', import.meta.url));
const { heroes } = await import('../src/data/heroes.ts').catch(() => ({ heroes: null }));
const ids = heroes ? heroes.map((hero) => hero.id) : ['poster', 'estudio', 'agencia', 'vano', 'lumo', 'velaro', 'orla', 'atelier', 'butaca', 'halden', 'altera'];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
  const sizes = {};
  for (const id of ids) {
    await page.goto(`${base}/studio/heroes/${id}/`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({ content: '.hv-bar { display: none !important; }' });
    // Let the dg-fade-in-* entrances finish before capturing.
    await page.waitForTimeout(3000);
    const png = await page.screenshot({ animations: 'disabled' });
    const webp = await sharp(png).resize(1280, 800).webp({ quality: 80, effort: 6 }).toBuffer();
    await writeFile(`${outDir}${id}.webp`, webp);
    sizes[id] = `${Math.round(webp.length / 1024)} KB`;
  }
  console.log(JSON.stringify(sizes, null, 2));
} finally {
  await browser.close();
}
