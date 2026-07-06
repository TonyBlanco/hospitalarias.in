import { routes, type Locale, type PageId } from '@/data/pages';

const allLocales: Locale[] = ['en', 'hi', 'ml'];

export function alternateLinks(id: PageId) {
  const localeLinks = allLocales.map(lang => ({
    lang,
    href: `https://hospitalarias.in${routes[lang][id]}`,
  }));
  return [...localeLinks, { lang: 'x-default' as const, href: `https://hospitalarias.in${routes.en[id]}` }];
}

export function otherLocale(locale: Locale): Locale {
  const others = allLocales.filter(l => l !== locale);
  return others[0] ?? 'en';
}
