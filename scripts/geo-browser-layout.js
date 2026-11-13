return await (async () => {
  await document.fonts.ready;
  const guide = document.querySelector('#planning-guide');
  return JSON.stringify({url: location.href, viewport: innerWidth,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
    h1Count: document.querySelectorAll('h1').length,
    guideCount: document.querySelectorAll('#planning-guide').length,
    guideText: guide?.parentElement.textContent,
    contactNotice: document.querySelector('.form-contact-note')?.textContent,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    headings: [...document.querySelectorAll('h1,h2,h3')].map(x => x.textContent),
    images: [...document.images].map(x => ({alt: x.alt, width: x.width, loading: x.loading, complete: x.complete})),
    navigation: [...document.querySelectorAll('header a')].map(x => ({text: x.textContent, href: x.getAttribute('href')}))
  }, null, 2);
})();
