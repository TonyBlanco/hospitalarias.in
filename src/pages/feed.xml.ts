import { getCollection } from 'astro:content';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const items = (await getCollection('news'))
    .filter((n) => n.id.startsWith('en/'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 50)
    .map(
      (n) => `    <item>
      <title>${esc(n.data.title)}</title>
      <link>https://hospitalarias.in/en/news/${n.id.slice(3)}/</link>
      <guid isPermaLink="true">https://hospitalarias.in/en/news/${n.id.slice(3)}/</guid>
      <pubDate>${new Date(n.data.date).toUTCString()}</pubDate>
      <description>${esc(n.data.description)}</description>
    </item>`,
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Benedict Menni Centre — News</title>
    <link>https://hospitalarias.in/en/news/</link>
    <atom:link href="https://hospitalarias.in/feed.xml" rel="self" type="application/rss+xml" />
    <description>Communications, updates and stories from the centre.</description>
    <language>en</language>
${items}
  </channel>
</rss>`,
    { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } },
  );
}
