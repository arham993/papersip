// Renders every route to static HTML so pages paint instantly and are crawlable.
// React then hydrates in the browser and takes over navigation.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const app = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(app, 'dist');
const { render, ROUTES } = await import(pathToFileURL(path.join(app, 'dist-ssr/entry-server.js')).href);

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Inline the stylesheet: one less round trip before first paint.
const link = template.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/);
if (link) {
  const file = path.join(dist, link[1].replace(/^.*?assets\//, 'assets/'));
  const css = fs.readFileSync(file, 'utf8');
  template = template.replace(link[0], () => `<style>${css}</style>`);
}

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
function page(url) {
  const { html, head } = render(url);
  const t = esc(head.title), d = esc(head.description);
  const meta = `<title>${t}</title>\n<meta name="description" content="${d}">\n<meta property="og:title" content="${t}">\n<meta property="og:description" content="${d}">`;
  return template.replace('<!--head-->', () => meta).replace('<!--app-->', () => html);
}

for (const route of ROUTES) {
  const out = path.join(dist, route, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(route));
}
fs.writeFileSync(path.join(dist, '404.html'), page('/404/'));
console.log(`Pre-rendered ${ROUTES.length} pages + 404`);
