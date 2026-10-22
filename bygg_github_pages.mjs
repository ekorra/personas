import fs from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = path.dirname(new URL(import.meta.url).pathname);
const docs = path.join(root, 'docs');
const avatarSource = path.join(root, 'avatarer');
const avatarTarget = path.join(docs, 'assets', 'avatarer');

await fs.mkdir(path.join(docs, 'assets'), { recursive: true });
await fs.cp(avatarSource, avatarTarget, { recursive: true, force: true });
await fs.writeFile(path.join(docs, '.nojekyll'), 'GitHub Pages: do not process this static site with Jekyll.\n');

await run(process.execPath, [
  path.join(root, 'personas-galleri', 'bygg-galleri.mjs'),
  '--output', '../docs/index.html',
  '--avatar-prefix', 'assets/avatarer',
]);

console.log(`Oppdaterte GitHub Pages i ${docs}.`);
