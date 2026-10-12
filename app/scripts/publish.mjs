// Copies the finished build (app/dist) to the repository root, which GitHub Pages serves.
// Only paths that the build produces are replaced; app/, README and .git are never touched.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repo = path.resolve(app, '..');
const dist = path.join(app, 'dist');
const OWNED = ['index.html', '404.html', '.nojekyll', 'favicon.svg', 'favicon.ico', 'favicon-32.png', 'icon-192.png', 'apple-touch-icon.png', 'brand', 'streams', 'partners', 'assets', 'fonts', 'thumbs', 'about', 'services', 'clients', 'our-work', 'contact'];

for (const p of OWNED) fs.rmSync(path.join(repo, p), { recursive: true, force: true });
for (const p of fs.readdirSync(dist)) fs.cpSync(path.join(dist, p), path.join(repo, p), { recursive: true });
console.log('Published app/dist to the repository root');
