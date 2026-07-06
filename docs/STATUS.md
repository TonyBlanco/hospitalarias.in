# Status - hospitalarias.in

- Last updated: 2026-07-07
- Production domain: `https://hospitalarias.in`
- Hosting target: Hostinger static website deploy
- Hostinger public root: `/home/u900558361/domains/hospitalarias.in/public_html`
- Source repo: `/Volumes/T7/hosting/hospitalarias.in`
- Build output: `/Volumes/T7/hosting/hospitalarias.in/dist`
- Deploy archive: `/Volumes/T7/hosting/hospitalarias.in/restore/hospitalarias_astro_dist_20260707.zip`

## Current State

- Astro rebuild is deployed and working.
- `https://hospitalarias.in/index.html` serves the new Astro home.
- Internal routes such as `/en/about/`, `/hi/`, `/ml/`, `/admin/`, sitemap and redirects are working.
- `/admin/` is intentionally a safe CMS setup page until Tina Cloud/Git publishing is connected.
- HTML responses now include `Cache-Control: no-cache, no-store, must-revalidate` to avoid stale page cache after the Hostinger cache is flushed.

## Known Remaining Issue

`https://hospitalarias.in/` without a query string is still being served from stale Hostinger HCDN cache:

- Header seen: `server: hcdn`
- Header seen: `x-hcdn-cache-status: HIT`
- Old response still includes WordPress headers such as `wp-json` and `x-powered-by: PHP`

The origin is correct. This is proven because `https://hospitalarias.in/?stable-check=...` and `https://hospitalarias.in/index.html` both return the new Astro site.

## Required hPanel Action

Flush Hostinger cache for `hospitalarias.in`:

1. Hostinger hPanel -> Websites -> `hospitalarias.in` -> Dashboard.
2. Use Overview -> Clear cache if available.
3. Also check Advanced -> Cache Manager -> Purge all.
4. If Hostinger CDN is active: Performance -> CDN -> Flush cache.
5. Re-test `https://hospitalarias.in/` and confirm `x-hcdn-cache-status` is no longer serving the old WordPress object.

## Do Not Use

- Do not deploy to old Hetzner IP `94.130.222.205`.
- Do not restore WordPress into `public_html`.
- Do not mix old `wp-admin`, `wp-content`, `wp-includes`, `index.php` or old `.htaccess` with the Astro `dist/` output.
