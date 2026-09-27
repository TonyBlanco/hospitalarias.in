import { routes, getPage, type Locale, type PageId } from '@/data/pages';
import { mediaPath } from '@/utils/media';
import navigation from '@/content/settings/navigation.json';

const allLocales: Locale[] = ['en', 'hi', 'ml', 'es'];

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

const ORG = {
  '@type': 'Organization',
  name: 'Benedict Menni Psycho-Social Rehabilitation Centre',
  url: 'https://hospitalarias.in',
} as const;

export function newsArticleSchema(
  entry: { data: { title: string; description: string; date: Date; image: string } },
  locale: Locale,
  canonical: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: entry.data.title,
    description: entry.data.description,
    datePublished: entry.data.date.toISOString(),
    inLanguage: locale,
    image: `https://hospitalarias.in${mediaPath(entry.data.image)}`,
    author: ORG,
    publisher: ORG,
    mainEntityOfPage: canonical,
  };
}

const crumbParents: Partial<Record<PageId, PageId>> = {
  about: 'home',
  'mission-values': 'about',
  founders: 'about',
  team: 'about',
  'benito-menni': 'founders',
  'get-involved': 'home',
  donate: 'get-involved',
  volunteer: 'get-involved',
  collaborate: 'get-involved',
  news: 'home',
  gallery: 'home',
  newsletter: 'home',
  contact: 'home',
  'privacy-policy': 'home',
};

export type Crumb = { label: string; href?: string };

type NavItem = { label: string; href: string; children?: NavItem[] };

/* href -> translated nav label, so crumbs match what the user sees in the header. */
const navLabels = Object.fromEntries(
  Object.entries(navigation.locales).map(([loc, items]) => {
    const map: Record<string, string> = {};
    const walk = (list: NavItem[]) =>
      list.forEach((it) => {
        map[it.href] = it.label;
        if (it.children) walk(it.children);
      });
    walk(items as NavItem[]);
    return [loc, map];
  }),
) as Partial<Record<Locale, Record<string, string>>>;

/* Path from home down to pageId, every item with its localized route. */
export function crumbPath(locale: Locale, pageId: PageId): Crumb[] {
  const path: PageId[] = [];
  let cur: PageId | undefined = pageId;
  while (cur) {
    path.unshift(cur);
    cur = crumbParents[cur];
  }
  return path.map((id) => {
    const href = routes[locale][id];
    return { label: navLabels[locale]?.[href] ?? getPage(id, locale).title, href };
  });
}
