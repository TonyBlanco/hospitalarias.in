import { existsSync } from 'node:fs';
import { routes, getPage, isPageIndexable, type Locale, type PageId } from '@/data/pages';
import { t } from '@/data/i18n';
import { mediaPath } from '@/utils/media';
import navigation from '@/content/settings/navigation.json';

const SITE = 'https://hospitalarias.in';
const allLocales: Locale[] = ['en', 'hi', 'ml', 'es'];

const NEWS_BASE: Record<Locale, string> = {
  en: '/en/news/',
  hi: '/hi/samachar/',
  ml: '/ml/varthakal/',
  es: '/es/noticias/',
};

export type HreflangLink = { lang: string; href: string };

/** hreflang cluster for indexable static pages only */
export function indexableAlternateLinks(id: PageId): HreflangLink[] {
  const langs = allLocales.filter((lang) => isPageIndexable(lang, id));
  const links: HreflangLink[] = langs.map((lang) => ({
    lang,
    href: `${SITE}${routes[lang][id]}`,
  }));
  if (isPageIndexable('en', id)) {
    links.push({ lang: 'x-default', href: `${SITE}${routes.en[id]}` });
  }
  return links;
}

/** Localized title/description for indexable non-English static pages */
export function staticPageSeo(locale: Locale, pageId: PageId): { title: string; description: string } {
  const page = getPage(pageId, locale);
  if (locale === 'en') return { title: page.title, description: page.description };
  if (pageId === 'news') {
    return { title: t(locale, 'newsTitle'), description: t(locale, 'newsDesc') };
  }
  if (pageId === 'team') {
    const description =
      locale === 'hi'
        ? 'केंद्र के हमारे मिशन को संभव बनाने वाली बहनें, कर्मचारी और सहयोगी।'
        : locale === 'ml'
          ? 'ഞങ്ങളുടെ ദൗത്യത്തിന് ജീവൻ നൽകുന്ന സന്ന്യാസിനിമാർ, ജീവനക്കാർ & സഹകാരികൾ.'
          : page.description;
    return { title: t(locale, 'team'), description };
  }
  return { title: page.title, description: page.description };
}

export function newsArticleAlternateLinks(slug: string): HreflangLink[] {
  const langs = allLocales.filter((locale) => existsSync(`src/content/news/${locale}/${slug}.md`));
  const links: HreflangLink[] = langs.map((lang) => ({
    lang,
    href: `${SITE}${NEWS_BASE[lang]}${slug}/`,
  }));
  if (langs.includes('en')) {
    links.push({ lang: 'x-default', href: `${SITE}${NEWS_BASE.en}${slug}/` });
  }
  return links;
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
