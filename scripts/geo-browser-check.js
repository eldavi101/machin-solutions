// Run with gstack: browse eval scripts/geo-browser-check.js
// Uses only same-origin read requests. Do not submit forms or contact details.
return await (async () => {
  const paths = ['/', '/pergolas/', '/es/pergolas/', '/tiki-huts/', '/es/tiki-huts/', '/contact/', '/robots.txt', '/sitemap-index.xml', '/sitemap-0.xml', '/missing-geo-audit-page/'];
  const results = [];
  for (const path of paths) {
    const response = await fetch(path);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(x => {
      try { return JSON.parse(x.textContent); } catch { return { invalid: true }; }
    });
    results.push({path, status: response.status, finalUrl: response.url,
      xRobotsTag: response.headers.get('x-robots-tag'),
      canonical: doc.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: doc.querySelector('meta[name="robots"]')?.content ?? null,
      h1: [...doc.querySelectorAll('h1')].map(x => x.textContent),
      mainTextLength: doc.querySelector('main')?.textContent.length ?? 0,
      decisionGuide: !!doc.querySelector('#planning-guide'),
      schemaTypes: schemas.map(x => x['@type']),
      unverifiedFaqSchema: schemas.some(x => x['@type'] === 'FAQPage' && /\[[A-Z0-9_]+\]/.test(JSON.stringify(x))),
      text: path.endsWith('.txt') || path.endsWith('.xml') ? html : undefined});
  }
  return JSON.stringify({checkedAt: new Date().toISOString(), origin: location.origin, results}, null, 2);
})();
