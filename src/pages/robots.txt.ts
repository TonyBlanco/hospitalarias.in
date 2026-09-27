export function GET() {
  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin/',
      'Disallow: /panel.php',
      'Disallow: /track.php',
      '',
      'Sitemap: https://hospitalarias.in/sitemap-index.xml',
      '',
    ].join('\n'),
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    },
  );
}
