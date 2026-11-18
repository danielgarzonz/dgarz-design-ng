// Every dg-* class written in the docs (pages, Studio designs, examples) must
// exist in the framework CSS and must not be a deprecated alias
// (core/src/deprecated-classes.json), and Studio designs and examples must not use
// style="" (they are built only with framework classes).
//
//   node docs/scripts/verify-classes.mjs      (after building core)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const css = ['dgarz.full.css'].map((f) => readFileSync(join(root, 'core/dist', f), 'utf8')).join('\n');
const defined = new Set([...css.matchAll(/\.(dg-[a-zA-Z0-9_-]*[a-zA-Z0-9])/g)].map((m) => m[1]));
// Deprecated aliases (they still work, but the docs must teach the class to use).
const { aliases: deprecated } = JSON.parse(readFileSync(join(root, 'core/src/deprecated-classes.json'), 'utf8'));

// Classes that are hooks for JavaScript or docs-only markers, not styles.
const hooks = /^dg-(js-|is-|has-)/;
// Files where style="" is forbidden (designs and examples built from classes).
const noStyle = [/src\/data\/heroes\.ts$/, /src\/pages\/fundamentos\/(composicion|escalas)\.astro$/];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (/\.(astro|ts)$/.test(name)) files.push(full);
  }
})(join(root, 'docs/src'));

const problems = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  for (const [, list] of text.matchAll(/class(?:Name)?="([^"]*)"/g)) {
    for (const cls of list.split(/\s+/)) {
      if (!cls.startsWith('dg-') || cls.includes('$') || cls.includes('{') || hooks.test(cls)) continue;
      if (!defined.has(cls)) problems.push(`${rel}: unknown class ${cls}`);
      else {
        const hit = deprecated[cls] ?? Object.entries(deprecated).find(([k]) => k.endsWith('*') && cls.startsWith(k.slice(0, -1)))?.[1];
        if (hit) problems.push(`${rel}: deprecated class ${cls} (use ${hit})`);
      }
    }
  }
  if (noStyle.some((re) => re.test(rel)) && /\sstyle="/.test(text)) problems.push(`${rel}: style="" is not allowed here`);
}
const unique = [...new Set(problems)];
console.log(unique.length ? unique.join('\n') : `All dg-* classes exist (${files.length} files checked).`);
process.exit(unique.length ? 1 : 0);
