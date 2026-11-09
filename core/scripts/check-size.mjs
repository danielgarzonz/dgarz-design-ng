// Size budget for the published bundles (gzip). Fails when a file grows past
// its budget, so a change that bloats the framework is a conscious decision:
// raise the number here in the same pull request and say why.
//
//   node core/scripts/check-size.mjs        (after npm run build:legacy)
import { readFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const budgets = {
  'dgarz.min.css': 43,
  'dgarz.full.min.css': 47,
  'dgarz-app.min.css': 6,
  'dgarz.min.js': 17,
  'dgarz.esm.js': 22,
};
const importantBudget = 35; // !important in dgarz.css: only intentional state overrides.

const dist = new URL('../dist/', import.meta.url);
let failed = false;
for (const [file, kb] of Object.entries(budgets)) {
  const size = gzipSync(readFileSync(new URL(file, dist))).length / 1024;
  const ok = size <= kb;
  failed ||= !ok;
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${file.padEnd(20)} ${size.toFixed(1).padStart(5)} KB gzip (budget ${kb} KB)`);
}
const important = (readFileSync(new URL('dgarz.css', dist), 'utf8').match(/!important/g) || []).length;
const okImportant = important <= importantBudget;
failed ||= !okImportant;
console.log(`${okImportant ? 'ok  ' : 'FAIL'} !important in dgarz.css   ${important} (budget ${importantBudget})`);
process.exit(failed ? 1 : 0);
