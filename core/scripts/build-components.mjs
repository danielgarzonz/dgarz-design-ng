import { mkdir, writeFile, copyFile, rm, readFile, readdir } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
if (process.argv.includes('--clean')) {
  for (const directory of ['components/', 'types/', 'hydrate/']) {
    await rm(new URL(directory, dist), { recursive: true, force: true });
  }
  process.exit(0);
}
await mkdir(new URL('components/', dist), { recursive: true });
await writeFile(new URL('components/package.json', dist), '{"type":"module"}\n');
await writeFile(new URL('index.mjs', dist), `export * from './components/index.js';
import * as components from './components/index.js';
export function defineCustomElements() {
  if (typeof customElements === 'undefined') return;
  for (const [name, define] of Object.entries(components)) {
    if (name.startsWith('defineCustomElement') && typeof define === 'function') define();
  }
}
if (typeof customElements !== 'undefined') defineCustomElements();
`);
await writeFile(new URL('index.d.mts', dist), "export * from './components/index.js';\nexport type { Components, JSX } from './types/components.js';\nexport declare function defineCustomElements(): void;\n");
// The package root keeps the classic JS (dgarz.js / dgarz.esm.js, as in 1.1.0);
// its types expose only the component types (events, props), never values, so
// `import { defineCustomElements } from 'dgarz-design'` fails at compile time
// instead of at run time. The components themselves live in dgarz-design/core.
await writeFile(new URL('root.d.mts', dist), "export type * from './index.mjs';\n");
await copyFile(new URL('../src/tokens/tokens.css', import.meta.url), new URL('tokens.css', dist));

// Stencil docs contain a wall-clock timestamp; omit it for reproducible packages.
const docsUrl = new URL('component-docs.json', dist);
const docs = JSON.parse(await readFile(docsUrl, 'utf8'));
delete docs.timestamp;
await writeFile(docsUrl, JSON.stringify(docs, null, 2) + '\n');

// Re-export DOM constructors from the declarations next to their JS modules.
// Stencil 4's single-export index can point to un-emitted author-class paths.
const indexTypesUrl = new URL('components/index.d.ts', dist);
let indexTypes = await readFile(indexTypesUrl, 'utf8');
for (const component of docs.components) {
  const name = component.tag.split('-').map(part => part[0].toUpperCase() + part.slice(1)).join('');
  indexTypes = indexTypes.replace(
    new RegExp(`export \\{ \\w+ as ${name} \\} from ['"]\\.\\./types/[^'"]+['"];`),
    `export { ${name} } from './${component.tag}.js';`,
  );
}
await writeFile(indexTypesUrl, indexTypes);

// NodeNext consumers require extensions in relative declaration imports.
async function normalizeDeclarations(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) await normalizeDeclarations(url);
    else if (entry.name.endsWith('.d.ts')) {
      const source = await readFile(url, 'utf8');
      await writeFile(url, source.replace(/(from\s*['"])(\.[^'"]+)(['"])/g,
        (match, before, path, after) => /\.(?:js|json|ts)$/.test(path) ? match : `${before}${path}.js${after}`));
    }
  }
}
await normalizeDeclarations(new URL('components/', dist));
await normalizeDeclarations(new URL('types/', dist));
