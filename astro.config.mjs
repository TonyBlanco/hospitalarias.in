import { existsSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { routes } from './src/data/pages.ts';

const SITE = 'https://hospitalarias.in';
const LOCALES = ['en', 'hi', 'ml', 'es'];
const NEWS_BASE = { en: '/en/news/', hi: '/hi/samachar/', ml: '/ml/varthakal/', es: '/es/noticias/' };

// Reverse map: localized path -> pageId (route paths are unique across locales)
const pathToId = new Map();
for (const loc of LOCALES) {
  for (const [id, path] of Object.entries(routes[loc])) {
    pathToId.set(path, id);
  }
}

// All four localized URLs for a given emitted path, or null if unknown.
function alternatesFor(pathname) {
  const id = pathToId.get(pathname);
  if (id) return LOCALES.map((l) => ({ url: SITE + routes[l][id], lang: l }));
  for (const loc of LOCALES) {
    const base = NEWS_BASE[loc];
    if (pathname.startsWith(base) && pathname.length > base.length) {
      const slug = pathname.slice(base.length).replace(/\/$/, '');
      // Only link locales where the article actually exists — single-locale
      // publishes must not emit alternates pointing at 404s.
      return LOCALES.filter((l) => existsSync(`src/content/news/${l}/${slug}.md`)).map((l) => ({
        url: SITE + NEWS_BASE[l] + slug + '/',
        lang: l,
      }));
    }
  }
  return null;
}

export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          hi: 'hi',
          ml: 'ml',
          es: 'es',
        },
      },
      serialize(item) {
        const links = alternatesFor(new URL(item.url).pathname);
        if (links) item.links = links;
        return item;
      },
    }),
  ],
});
