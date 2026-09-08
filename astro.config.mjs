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
      serialize(item) {
        if (item.url === 'https://machinsolutions.com/') item.priority = 1.0;
        else if (/\/(pergolas|tiki-huts)\/$/.test(item.url)) item.priority = 0.9;
        else if (/\/contact\/$/.test(item.url)) item.priority = 0.9;
        else item.priority = 0.7;
        return item;
      },
    }),
  ],
});
