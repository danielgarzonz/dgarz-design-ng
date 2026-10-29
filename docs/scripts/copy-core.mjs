import { cpSync, existsSync, rmSync } from 'node:fs';

const source = new URL('../../core/dist/', import.meta.url);
const target = new URL('../public/dist', import.meta.url);

if (!existsSync(source)) {
  throw new Error('Missing core/dist. Build the framework before building the docs.');
}

rmSync(target, { recursive: true, force: true });
cpSync(source, target, { recursive: true });
