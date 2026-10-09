/**
 * Post-build SEO checks: canonical, robots, hreflang, and sitemap consistency.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { routes, isPageIndexable, localeFromPathname } from '../src/data/pages.ts';

const SITE = 'https://hospitalarias.in';
const DIST = new URL('../dist', import.meta.url).pathname;
const LOCALES = ['en', 'hi', 'ml', 'es'];
const NEWS_BASE = { en: '/en/news/', hi: '/hi/samachar/', ml: '/ml/varthakal/', es: '/es/noticias/' };

const pathToId = new Map();
for (const loc of LOCALES) {
  for (const [id, path] of Object.entries(routes[loc])) {
    pathToId.set(path, id);
  }
}

function walkHtml(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkHtml(full, files);
    else if (name.endsWith('.html')) files.push(full);
  }
  return files;
}

function fileToPathname(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return null;
}

function pathnameToUrl(pathname) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return SITE + normalized;
}

function parseHead(html) {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const robots = head.match(/<meta name="robots" content="([^"]+)"/)?.[1];
  const hreflangs = [];
  for (const m of head.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)) {
    hreflangs.push({ lang: m[1], href: m[2] });
  }
  const noindex = robots?.includes('noindex') ?? false;
  return { canonical, robots, hreflangs, noindex };
}

function expectedIndexable(pathname) {
  const id = pathToId.get(pathname.endsWith('/') ? pathname : `${pathname}/`);
  if (id) return isPageIndexable(localeFromPathname(pathname), id);
  for (const loc of LOCALES) {
    const base = NEWS_BASE[loc];
    const norm = pathname.endsWith('/') ? pathname : `${pathname}/`;
    if (norm.startsWith(base) && norm.length > base.length) return true;
  }
  return true;
}

function englishCanonical(pathname) {
  const norm = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const id = pathToId.get(norm);
  if (!id) return null;
  return pathnameToUrl(routes.en[id]);
}

const errors = [];
const htmlFiles = walkHtml(DIST);
const urlByPathname = new Map();

for (const file of htmlFiles) {
  const pathname = fileToPathname(file);
  if (!pathname) continue;
  const norm = pathname === '/' ? '/' : pathname.endsWith('/') ? pathname : `${pathname}/`;
  urlByPathname.set(norm, { file, ownUrl: pathnameToUrl(norm) });
}

for (const [norm, { file, ownUrl }] of urlByPathname) {
  const html = readFileSync(file, 'utf8');
  const { canonical, hreflangs, noindex } = parseHead(html);
  const indexable = expectedIndexable(norm);

  if (indexable) {
    if (noindex) errors.push(`${norm}: indexable page must not have noindex`);
    if (canonical !== ownUrl) errors.push(`${norm}: canonical ${canonical} !== own URL ${ownUrl}`);
    for (const alt of hreflangs) {
      const altPath = new URL(alt.href).pathname;
      const altNorm = altPath.endsWith('/') ? altPath : `${altPath}/`;
      const target = urlByPathname.get(altNorm);
      if (!target) {
        errors.push(`${norm}: hreflang ${alt.lang} points to missing page ${alt.href}`);
        continue;
      }
      const targetHead = parseHead(readFileSync(target.file, 'utf8'));
      if (targetHead.noindex) {
        errors.push(`${norm}: hreflang ${alt.lang} targets non-indexable ${alt.href}`);
      }
    }
  } else {
    if (!noindex) errors.push(`${norm}: non-indexable page must have noindex`);
    const expectedCanon = englishCanonical(norm);
    if (expectedCanon && canonical !== expectedCanon) {
      errors.push(`${norm}: canonical should be English ${expectedCanon}, got ${canonical}`);
    }
    if (hreflangs.length > 0) errors.push(`${norm}: non-indexable page must not emit hreflang`);
  }
}

const sitemapPath = join(DIST, 'sitemap-0.xml');
let sitemapLocs = [];
try {
  const xml = readFileSync(sitemapPath, 'utf8');
  sitemapLocs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
} catch {
  errors.push('sitemap-0.xml not found in dist');
}

for (const loc of sitemapLocs) {
  const pathname = new URL(loc).pathname;
  const norm = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const entry = urlByPathname.get(norm);
  if (!entry) {
    errors.push(`sitemap: ${loc} has no built HTML`);
    continue;
  }
  const head = parseHead(readFileSync(entry.file, 'utf8'));
  if (head.noindex) errors.push(`sitemap: ${loc} is noindex`);
  if (!expectedIndexable(norm)) errors.push(`sitemap: ${loc} is not indexable`);
  if (head.canonical !== loc && head.canonical !== pathnameToUrl(norm)) {
    errors.push(`sitemap: ${loc} canonical mismatch (${head.canonical})`);
  }
}

if (errors.length) {
  console.error('SEO validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed (${htmlFiles.length} HTML files, ${sitemapLocs.length} sitemap URLs).`);
