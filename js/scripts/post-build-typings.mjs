import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'dist-typings');
const SEARCH = '../src/@types';
const REPLACE = '@types';

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      await walk(full, acc);
    } else if (e.isFile() && e.name.endsWith('.d.ts')) {
      acc.push(full);
    }
  }
  return acc;
}

async function main() {
  try {
    const files = await walk(ROOT, []);
    await Promise.all(
      files.map(async (file) => {
        const buf = await fs.readFile(file, 'utf8');
        const out = buf.split(SEARCH).join(REPLACE);
        if (out !== buf) {
          await fs.writeFile(file, out, 'utf8');
        }
      })
    );
  } catch (err) {
    // If directory doesn't exist or any other non-critical error, surface clearly and exit 1
    console.error('[post-build-typings] error:', err?.message || err);
    process.exit(1);
  }
}

await main();
