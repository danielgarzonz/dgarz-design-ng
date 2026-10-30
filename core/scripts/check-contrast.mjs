import { readFileSync } from 'node:fs';

// Audit the shipped foreground/background token pairs in both themes.
const source = readFileSync(new URL('../src/scss/abstracts/_tokens.scss', import.meta.url), 'utf8');
const [light, dark] = source.split('[data-theme="dark"]');
const parse = text => Object.fromEntries([...text.matchAll(/--(dg-[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
const base = parse(light);
let checked = 0;
let failures = 0;
function luminance(value, tokens, seen = new Set()) {
  const ref = /^var\(--([\w-]+)\)$/.exec(value);
  if (ref) {
    if (seen.has(ref[1])) throw new Error(`Circular token: ${ref[1]}`);
    return luminance(tokens[ref[1]], tokens, new Set([...seen, ref[1]]));
  }
  let hex = value.replace('#', '');
  if (hex.length === 3) hex = [...hex].map(c => c + c).join('');
  if (!/^[\da-f]{6}$/i.test(hex)) throw new Error(`Unsupported color: ${value}`);
  const rgb = [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map(c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return rgb.reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}
for (const [theme, tokens] of [['light', base], ['dark', { ...base, ...parse(dark) }]]) {
  const pairs = Object.keys(tokens).filter(k => k.startsWith('dg-on-') && tokens[`dg-${k.slice(6)}`])
    .map(k => [k, `dg-${k.slice(6)}`]);
  for (const fg of ['dg-text', 'dg-text-muted', 'dg-text-faint']) {
    for (const bg of ['dg-paper', 'dg-surface', 'dg-surface-2', 'dg-surface-3']) pairs.push([fg, bg]);
  }
  for (const [fg, bg] of pairs) {
    const [low, high] = [luminance(tokens[fg], tokens), luminance(tokens[bg], tokens)].sort((a, b) => a - b);
    const ratio = (high + 0.05) / (low + 0.05);
    checked++;
    if (ratio < 4.5) {
      failures++;
      console.error(`${theme}: ${fg} / ${bg}: ${ratio.toFixed(2)}:1 (minimum 4.5:1)`);
    }
  }
}
console.log(`${checked} token pairs checked; ${failures} failures.`);
process.exitCode = failures ? 1 : 0;
