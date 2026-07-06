# Deploy - hospitalarias.in

## Target

- Platform: Hostinger static website deploy
- Domain: `hospitalarias.in`
- Public root: `/home/u900558361/domains/hospitalarias.in/public_html`
- Local project: `/Volumes/T7/hosting/hospitalarias.in`
- Generated site: `/Volumes/T7/hosting/hospitalarias.in/dist`

The old Hetzner WordPress server is not the production deploy target.

## Local Build

```bash
cd /Volumes/T7/hosting/hospitalarias.in
npm run build
```

Expected result:

- `astro check` has 0 errors.
- Astro builds 48 static pages.
- Output is written to `dist/`.

## Package

```bash
cd /Volumes/T7/hosting/hospitalarias.in
rm -f restore/hospitalarias_astro_dist_20260707.zip
cd dist
zip -qr ../restore/hospitalarias_astro_dist_20260707.zip .
```

## Deploy

Deploy the zip archive to Hostinger with the Hostinger static deploy API/MCP for domain `hospitalarias.in`.

The deployed `public_html` should contain the generated Astro files, for example:

- `index.html`
- `.htaccess`
- `robots.txt`
- `sitemap-index.xml`
- `_astro/`
- `images/`
- `en/`
- `hi/`
- `ml/`
- `admin/`

It should not contain old WordPress runtime directories.

## Verification

```bash
curl -I https://hospitalarias.in/index.html
curl -L https://hospitalarias.in/index.html | rg '<title>'
curl -I https://hospitalarias.in/en/about/
curl -I https://hospitalarias.in/our-founders/
curl -I https://hospitalarias.in/sitemap-index.xml
curl -L https://hospitalarias.in/admin/ | rg 'CMS setup pending|No CMS token'
```

If `/` still shows old WordPress but `/index.html` and `/?cache-bust=...` show Astro, flush Hostinger HCDN/Cache Manager. That is cache, not a failed deploy.
