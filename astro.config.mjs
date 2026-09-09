// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * The site is served from the apex custom domain (machinsolutions.com) via the
 * public/CNAME file, so `base` stays at the root. Setting base to
 * "/machin-solutions/" would break every path once the custom domain resolves;
 * GitHub redirects <user>.github.io/machin-solutions/ to the custom domain instead.
 */
export default defineConfig({
  site: 'https://machinsolutions.com',
  base: '/',
  trailingSlash: 'always',
  /**
   * English at the root, Spanish under /es/. `prefixDefaultLocale: false` keeps the
   * existing English URLs exactly as they are — they are already indexed, and moving
   * them to /en/ would throw away every ranking the site has.
   *
   * `redirectToDefaultLocale: false` because there is a real page at "/" already;
   * Astro must not try to redirect it.
   */
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      changefreq: 'monthly',
      lastmod: new Date(),
      // Emits <xhtml:link rel="alternate" hreflang="..."> for every page pair, which
      // is how Google learns the two trees are the same content in two languages.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en-US', es: 'es-US' },
      },
      serialize(item) {
        // Priority is set from the logical path, so /es/contact/ is weighted the same
        // as /contact/ rather than falling through to the 0.7 default.
        const path = item.url
          .replace('https://machinsolutions.com', '')
          .replace(/^\/es(?=\/|$)/, '') || '/';
        if (path === '/') item.priority = 1.0;
        else if (/^\/(pergolas|tiki-huts)\/$/.test(path)) item.priority = 0.9;
        else if (path === '/contact/') item.priority = 0.9;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],
});
