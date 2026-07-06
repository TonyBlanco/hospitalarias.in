import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    locale: z.enum(['en', 'es']),
    title: z.string(),
    description: z.string(),
    path: z.string(),
    source: z.array(z.string()).default([]),
    translationStatus: z.enum(['source', 'draft', 'pending']).default('source'),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
  }),
});

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.union([
    z.object({
      locales: z.record(z.string(), z.array(z.any())),
    }),
    z.object({
      name: z.string(),
      url: z.string(),
      description: z.string(),
      email: z.string(),
      phone: z.string(),
      address: z.string(),
      social: z.array(z.object({ label: z.string(), href: z.string() })),
    }),
    z.object({
      members: z.array(
        z.object({
          name: z.string(),
          role: z.string(),
          image: z.string().optional(),
        }),
      ),
    }),
  ]),
});

export const collections = { pages, news, settings };
