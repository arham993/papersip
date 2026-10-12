# Papersip Company

Website for Papersip Company, a one-stop advertising agency in Faridabad running TV, radio, print, OOH and digital advertising, visibility signage, media buying & planning, and strategy. In business since 2010.

Built with **React 18 + React Router + Vite**. Every page is pre-rendered to static HTML at build time, then React hydrates it in the browser. The first paint is instant, every page can be crawled, and moving between pages happens without a reload.

## Folder layout

```
app/                  React source (edit here)
  src/data.js         all text content: services, clients, work, contact details
  src/pages/          one component per page
  src/components/     layout, header/menu, shared UI, media, 3D wrappers
  src/three/scenes.js 3D paper-craft models (Three.js), loaded on demand
  src/styles/site.css all styles
  public/             fonts, model stills, favicon (copied as-is)
  scripts/            pre-render + publish steps
index.html, about/, services/, …   built site (generated, served by GitHub Pages)
```

## Edit and publish

```bash
cd app
npm install          # first time only
npm run dev          # local preview with hot reload
npm run publish      # build, pre-render every page, copy the result to the repo root
```

Then commit and push. GitHub Pages serves the repo root, so you don't need to change any settings.

For a custom domain at the root (for example `papersipcompany.com`), build with `BASE_PATH=/ npm run publish`.

## Why it's fast

- Pages are pre-rendered HTML with the CSS inlined, so they need no extra request before first paint.
- Fonts are self-hosted: 4 small WOFF2 files with the Latin subset only. There are no Google Fonts requests.
- React hydrates in interruptible slices (`startTransition`), so the page stays responsive while it takes over.
- Three.js (about 135 KB gzipped) loads only after the visitor interacts, or about 1.5 s after load on desktop. Until then, each model shows as a pre-rendered WebP still. Phones with Data Saver on, or with very little memory, keep the stills.
- Models are built one per frame, so the 3D start-up never freezes scrolling. Scenes pause when they are off-screen and are disposed when you leave the page.
- SoundCloud players, TV videos and the Google map load only when someone presses play or "Show map".

## Pages

| Page | Path |
|---|---|
| Home | `/` |
| About | `/about/` |
| Services | `/services/` |
| TV · Radio · Print · OOH · Digital Advertising | `/services/tv-advertising/` etc. |
| Visibility Signage | `/services/visibility-signage/` |
| Media Buying & Planning | `/services/media-buying-planning/` |
| Strategy | `/services/strategy/` |
| Clients | `/clients/` |
| Our Work | `/our-work/` |
| Contact | `/contact/` |

Service URLs match the existing WordPress site.

## Media

Portfolio images and client logos load from `papersipcompany.com/wp-content/uploads/`. TV commercials load from `cariotauto.in`, and radio spots from SoundCloud. A tile whose image fails to load hides itself.
