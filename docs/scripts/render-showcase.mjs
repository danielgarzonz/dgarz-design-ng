// Renders the landing showcase posters to WebP.
//
//   node docs/scripts/render-showcase.mjs
//
// Source: docs/scripts/showcase/posters.html (real framework CSS from
// docs/public/dist, so run `npm run build:docs` or copy-core.mjs first).
// Output: docs/public/showcase/<name>.webp at 2x, plus their CSS-pixel sizes
// for the width/height attributes in src/pages/index.astro.
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';
import sharp from 'sharp';

const source = fileURLToPath(new URL('./showcase/posters.html', import.meta.url));
const outDir = fileURLToPath(new URL('../public/showcase/', import.meta.url));
const scale = 2;

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: scale });
  await page.goto(pathToFileURL(source).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const posters = page.locator('[data-poster]');
  const sizes = {};
  for (let index = 0; index < await posters.count(); index++) {
    const poster = posters.nth(index);
    const name = await poster.getAttribute('data-poster');
    const raw = await poster.boundingBox();
    // Crop inward to whole CSS pixels so no antialiased edge of the page
    // background leaks into the image as a thin line.
    const x = Math.ceil(raw.x), y = Math.ceil(raw.y);
    const box = { x, y, width: Math.floor(raw.x + raw.width) - x, height: Math.floor(raw.y + raw.height) - y };
    const png = await page.screenshot({ clip: box, animations: 'disabled' });
    const webp = await sharp(png).webp({ quality: 82, effort: 6 }).toBuffer();
    await writeFile(`${outDir}${name}.webp`, webp);
    sizes[name] = { width: Math.round(box.width), height: Math.round(box.height), kb: Math.round(webp.length / 1024) };
  }
  console.log(JSON.stringify(sizes, null, 2));
} finally {
  await browser.close();
}
