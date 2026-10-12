import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site lives at /papersip/. For a custom domain, build with BASE_PATH=/
const base = process.env.BASE_PATH || '/papersip/';

export default defineConfig({
  base,
  plugins: [
    react(),
    { name: 'base-in-html', transformIndexHtml: (html) => html.replaceAll('__BASE__', base) },
  ],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
    reportCompressedSize: true,
  },
});
