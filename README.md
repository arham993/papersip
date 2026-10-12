# Papersip Company

Website for Papersip Company, a one-stop advertising agency in Faridabad running TV, radio, print, OOH and digital advertising, visibility signage, media buying & planning, and strategy. In business since 2010.

Plain static HTML, CSS and JS. No build step is needed to host it.

## Pages

| Page | Path |
|---|---|
| Home | `/` |
| About | `/about/` |
| Services | `/services/` |
| TV Advertising | `/services/tv-advertising/` |
| Radio Advertising | `/services/radio-advertising/` |
| Print Advertising | `/services/print-advertising/` |
| OOH Advertising | `/services/ooh-advertising/` |
| Digital Advertising | `/services/digital-advertising/` |
| Visibility Signage | `/services/visibility-signage/` |
| Media Buying & Planning | `/services/media-buying-planning/` |
| Strategy | `/services/strategy/` |
| Clients | `/clients/` |
| Our Work | `/our-work/` |
| Contact | `/contact/` |

The service URLs match the current WordPress site, so existing links keep working.

## Files

- `assets/css/site.css` holds all styles: colours, type, layout and every component.
- `assets/js/site.js` runs the menus, smooth scrolling, page transitions, the contact brief builder, the work filters and the lightbox.
- `assets/js/scene.js` is the 3D paper-craft media set (Three.js r128): the home hero, the channel turntable, the service-page models, the services carousel and the card thumbnails.
- `assets/vendor/` holds Three.js r128 and Lenis 1.1.13, both MIT licensed.

All links are relative, so the site works on GitHub Pages under `/papersip/` and on a custom domain at `/`.

## Media

Portfolio images and client logos load from `papersipcompany.com/wp-content/uploads/`. TV commercials load from `cariotauto.in`, and radio spots from SoundCloud. If any of these fails to load, that tile hides itself.

## Go live with GitHub Pages

1. Open **Settings → Pages → Build and deployment**.
2. Set **Source** to **Deploy from a branch**.
3. Choose **main** and **/ (root)**, then click **Save**.
