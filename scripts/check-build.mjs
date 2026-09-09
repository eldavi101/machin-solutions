/**
 * Post-build audit of dist/.
 *
 * Catches the things that quietly break a static site after a refactor: internal links
 * that 404, images and videos whose files are not in the output, duplicate or missing
 * titles, missing canonicals, invalid JSON-LD, accidental localhost/example.com strings,
 * and stray TODO/FIXME markers.
 *
 * Deliberate business placeholders — [PHONE_NUMBER], [PERMIT_POLICY] and friends — are
 * reported separately as a checklist rather than as failures, because they are supposed
 * to be there until the business fills them in.
 *
 * Usage: npm run audit
 * Exits non-zero when anything in the "problems" list is non-empty.
 */
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE_ORIGIN = 'https://machinsolutions.com';

/**
 * High-frequency English chrome. If any of these survives into a /es/ page, some
 * component is rendering without its `lang` prop. Deliberately short and specific:
 * these are strings that appear on every page, so a miss is loud, and none of them
 * is a word that legitimately appears in Spanish copy.
 */
const ENGLISH_MARKERS = [
  'Get a Free Estimate',
  'Skip to main content',
  'Popular service areas',
  'All South Florida service areas',
  'Request My Free Estimate',
  'All rights reserved.',
  'Choose a service',
];

const problems = [];
const warnings = [];
const placeholders = new Map();

function fail(file, message) {
  problems.push(`${file}: ${message}`);
}
function warn(file, message) {
  warnings.push(`${file}: ${message}`);
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const attr = (html, re) => {
  const matches = [];
  let m;
  while ((m = re.exec(html)) !== null) matches.push(m[1]);
  return matches;
};

/** Turn a site-relative URL into the file that should serve it. */
// Walk any JSON-LD value and yield every on-site URL it contains, as a path.
// Off-site URLs (schema.org vocabulary, social profiles) are skipped, and so are
// the "#organization"-style @id fragments, which are internal node identifiers
// rather than addresses that have to resolve to a file.
function* schemaUrls(node) {
  if (Array.isArray(node)) {
    for (const item of node) yield* schemaUrls(item);
    return;
  }
  if (!node || typeof node !== 'object') return;
  for (const [key, value] of Object.entries(node)) {
    if (key === '@context') continue;
    if (typeof value === 'string') {
      if (!value.startsWith(SITE_ORIGIN)) continue;
      const pathname = value.slice(SITE_ORIGIN.length) || '/';
      if (pathname.startsWith('#')) continue;
      yield pathname;
    } else {
      yield* schemaUrls(value);
    }
  }
}

function resolveTarget(href) {
  const clean = href.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return path.join(dist, 'index.html');
  const relative = clean.replace(/^\//, '');
  const direct = path.join(dist, relative);
  if (existsSync(direct)) {
    return direct;
  }
  // Directory-format routes: /pergolas/ -> dist/pergolas/index.html
  const asIndex = path.join(dist, relative, 'index.html');
  if (existsSync(asIndex)) return asIndex;
  return null;
}

async function main() {
  if (!existsSync(dist)) {
    console.error('dist/ not found — run "npm run build" first.');
    process.exit(1);
  }

  const files = await walk(dist);
  const pages = files.filter((file) => file.endsWith('.html'));
  const titles = new Map();
  const descriptions = new Map();
  const canonicals = new Set();

  let linkCount = 0;
  let assetCount = 0;
  let schemaUrlCount = 0;
  let schemaCount = 0;
  let hreflangCount = 0;
  const hreflangEdges = [];

  for (const file of pages) {
    const rel = path.relative(dist, file).replaceAll('\\', '/');
    const html = await readFile(file, 'utf8');

    // --- head essentials --------------------------------------------------
    const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1]?.trim();
    if (!title) fail(rel, 'missing <title>');
    else {
      if (title.length > 62) warn(rel, `title is ${title.length} chars (may be truncated in SERPs): "${title}"`);
      if (titles.has(title)) fail(rel, `duplicate title, also used by ${titles.get(title)}`);
      else titles.set(title, rel);
    }

    const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
    if (!description) fail(rel, 'missing meta description');
    else {
      if (description.length < 70 || description.length > 168) {
        warn(rel, `meta description is ${description.length} chars (aim for 120–160)`);
      }
      if (descriptions.has(description)) fail(rel, `duplicate meta description, also used by ${descriptions.get(description)}`);
      else descriptions.set(description, rel);
    }

    const canonical = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
    if (!canonical) fail(rel, 'missing canonical');
    else if (canonicals.has(canonical)) fail(rel, `duplicate canonical URL ${canonical}`);
    else canonicals.add(canonical);

    const h1s = html.match(/<h1[\s>]/g) ?? [];
    if (h1s.length === 0) fail(rel, 'no <h1>');
    if (h1s.length > 1) fail(rel, `${h1s.length} <h1> elements — there should be exactly one`);

    // --- bilingual checks -------------------------------------------------
    // The Spanish tree lives under /es/. Every one of these has bitten a real
    // bilingual site: a page declaring the wrong language to screen readers, an
    // hreflang pointing at a 404, a one-sided pair Google silently ignores, or an
    // English string left behind because a component never got its `lang` prop.
    const inSpanishTree = rel === 'es/index.html' || rel.startsWith('es/');
    const expectedLang = inSpanishTree ? 'es-US' : 'en-US';
    const declaredLang = html.match(/<html lang="([^"]+)"/)?.[1];
    if (declaredLang !== expectedLang) {
      fail(rel, `<html lang> is "${declaredLang}" but this page is in the ${inSpanishTree ? 'Spanish' : 'English'} tree (expected "${expectedLang}")`);
    }

    const expectedLocale = inSpanishTree ? 'es_US' : 'en_US';
    const declaredLocale = html.match(/<meta property="og:locale" content="([^"]+)"/)?.[1];
    if (declaredLocale !== expectedLocale) {
      fail(rel, `og:locale is "${declaredLocale}", expected "${expectedLocale}"`);
    }

    const alts = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)]
      .map(([, lang, href]) => ({ lang, href }));
    if (alts.length > 0) {
      const withoutDefault = alts.filter((a) => a.lang !== 'x-default');
      if (!alts.some((a) => a.lang === 'x-default')) {
        fail(rel, 'has hreflang alternates but no x-default');
      }
      if (withoutDefault.length < 2) {
        fail(rel, 'declares hreflang but lists fewer than two languages');
      }
      for (const alt of alts) {
        hreflangCount += 1;
        const altPath = alt.href.replace(SITE_ORIGIN, '');
        if (!resolveTarget(altPath)) {
          fail(rel, `hreflang ${alt.lang} points at a missing page -> ${altPath}`);
        }
        if (alt.lang !== 'x-default') hreflangEdges.push({ from: rel, to: altPath, lang: alt.lang });
      }
    }

    if (inSpanishTree) {
      // A cheap leak detector. It cannot catch every untranslated sentence, but it
      // does catch the thing that actually happens: a component that never received
      // its `lang` prop and is still rendering the English chrome.
      const leaks = ENGLISH_MARKERS.filter((marker) => html.includes(marker));
      for (const leak of leaks) {
        fail(rel, `untranslated English string on a Spanish page: "${leak}"`);
      }
    }

    if (!/<meta property="og:image"/.test(html)) fail(rel, 'missing og:image');
    if (!/<meta name="twitter:card"/.test(html)) fail(rel, 'missing twitter:card');
    if (!/<html lang="/.test(html)) fail(rel, 'missing lang attribute on <html>');

    // --- structured data --------------------------------------------------
    const blocks = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
    let sawSchema = false;
    for (const [, json] of blocks) {
      sawSchema = true;
      schemaCount += 1;
      try {
        const parsed = JSON.parse(json);
        if (!parsed['@context']) fail(rel, 'JSON-LD block has no @context');
        if (!parsed['@type']) fail(rel, 'JSON-LD block has no @type');

        // Every URL inside the structured data has to resolve too. A 404 in an
        // ImageObject or a BreadcrumbList is invisible on the page and in the
        // browser console — only a crawler ever sees it, and by then it counts
        // against the site. This caught a hardcoded thumbnail width that had
        // been left behind when the image ladder changed.
        for (const url of schemaUrls(parsed)) {
          schemaUrlCount += 1;
          if (!resolveTarget(url)) fail(rel, `JSON-LD points at a missing target -> ${url}`);
        }
      } catch (error) {
        fail(rel, `invalid JSON-LD: ${(error).message}`);
      }
    }
    if (!sawSchema && !rel.startsWith('404')) warn(rel, 'no structured data on this page');

    // --- internal links ---------------------------------------------------
    for (const href of attr(html, /<a[^>]+href="([^"]+)"/g)) {
      if (/^(https?:|mailto:|tel:|#)/.test(href)) continue;
      if (!href.startsWith('/')) {
        warn(rel, `relative link "${href}" — prefer site-absolute paths`);
        continue;
      }
      linkCount += 1;
      if (!resolveTarget(href)) fail(rel, `broken internal link -> ${href}`);
    }

    // --- media ------------------------------------------------------------
    const mediaRefs = [
      ...attr(html, /<img[^>]+src="([^"]+)"/g),
      ...attr(html, /<source[^>]+src="([^"]+)"/g),
      ...attr(html, /<video[^>]+poster="([^"]+)"/g),
      ...attr(html, /<link rel="icon"[^>]+href="([^"]+)"/g),
      ...attr(html, /<link rel="apple-touch-icon"[^>]+href="([^"]+)"/g),
      ...attr(html, /<link rel="manifest"[^>]+href="([^"]+)"/g),
    ];
    // srcset carries several candidates per attribute.
    for (const set of attr(html, /srcset="([^"]+)"/g)) {
      for (const candidate of set.split(',')) {
        const url = candidate.trim().split(/\s+/)[0];
        if (url) mediaRefs.push(url);
      }
    }

    for (const ref of mediaRefs) {
      if (/^(https?:|data:)/.test(ref) || !ref.startsWith('/')) continue;
      assetCount += 1;
      if (!existsSync(path.join(dist, ref.replace(/^\//, '')))) {
        fail(rel, `missing asset -> ${ref}`);
      }
    }

    // --- images must carry explicit dimensions and alt ---------------------
    for (const [, tag] of html.matchAll(/<img\b([^>]*)>/g)) {
      if (!/\balt=/.test(tag)) fail(rel, 'an <img> has no alt attribute');
      const isLightboxSlot = /data-lightbox-img/.test(tag);
      if (!isLightboxSlot && !(/\bwidth=/.test(tag) && /\bheight=/.test(tag))) {
        fail(rel, 'an <img> is missing width/height (causes layout shift)');
      }
    }

    // --- leftovers that should never ship ---------------------------------
    for (const bad of ['localhost', 'example.com', '127.0.0.1', 'lorem ipsum']) {
      if (html.toLowerCase().includes(bad)) fail(rel, `contains "${bad}"`);
    }
    for (const marker of ['TODO', 'FIXME', 'XXX:']) {
      if (html.includes(marker)) fail(rel, `contains a ${marker} marker`);
    }

    // --- intentional business placeholders --------------------------------
    for (const [, token] of html.matchAll(/\[([A-Z][A-Z0-9_]{2,})\]/g)) {
      if (!placeholders.has(token)) placeholders.set(token, new Set());
      placeholders.get(token).add(rel);
    }
  }

  // --- sitemap and robots -------------------------------------------------
  const sitemapIndex = path.join(dist, 'sitemap-index.xml');
  // Google ignores a one-sided hreflang: if /faq/ says "the Spanish version is
  // /es/faq/" but /es/faq/ does not say the reverse, the pair is not confirmed and
  // neither page benefits. Check both directions.
  for (const edge of hreflangEdges) {
    const targetFile = resolveTarget(edge.to);
    if (!targetFile) continue;
    const targetHtml = await readFile(targetFile, 'utf8');
    const sourcePath = '/' + edge.from.replace(/index\.html$/, '').replace(/\.html$/, '/');
    const normalised = sourcePath === '//' ? '/' : sourcePath;
    if (!targetHtml.includes(`href="${SITE_ORIGIN}${normalised}"`)) {
      fail(edge.from, `hreflang is one-sided: ${edge.to} does not point back at ${normalised}`);
    }
  }

  if (!existsSync(sitemapIndex)) fail('dist', 'sitemap-index.xml was not generated');
  else {
    const sitemapFiles = files.filter((f) => /sitemap-\d+\.xml$/.test(f));
    const urls = new Set();
    for (const file of sitemapFiles) {
      const xml = await readFile(file, 'utf8');
      for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(loc);
    }
    for (const url of urls) {
      const target = resolveTarget(new URL(url).pathname);
      if (!target) fail('sitemap', `lists a URL with no page in dist: ${url}`);
    }
    if ([...urls].some((url) => url.includes('/404'))) fail('sitemap', '404 page should not be listed');
    console.log(`sitemap: ${urls.size} URLs, all resolvable`);
  }

  if (!existsSync(path.join(dist, 'robots.txt'))) fail('dist', 'robots.txt missing');
  const cname = path.join(dist, 'CNAME');
  if (!existsSync(cname)) fail('dist', 'CNAME missing — GitHub Pages will drop the custom domain');
  else {
    const value = (await readFile(cname, 'utf8')).trim();
    if (value !== 'machinsolutions.com') fail('CNAME', `expected "machinsolutions.com", found "${value}"`);
  }
  if (!existsSync(path.join(dist, '404.html'))) fail('dist', '404.html missing');

  // --- media weight -------------------------------------------------------
  let mediaBytes = 0;
  for (const file of files.filter((f) => f.includes(`${path.sep}media${path.sep}`))) {
    mediaBytes += (await stat(file)).size;
  }

  // --- report -------------------------------------------------------------
  console.log(`\npages: ${pages.length}`);
  console.log(`internal links checked: ${linkCount}`);
  console.log(`asset references checked: ${assetCount}`);
  console.log(`JSON-LD URLs resolved: ${schemaUrlCount}`);
  console.log(`hreflang links checked: ${hreflangCount}`);
  console.log(
    `pages by language: ${pages.filter((f) => !path.relative(dist, f).replaceAll('\\', '/').startsWith('es/')).length} en, ` +
      `${pages.filter((f) => path.relative(dist, f).replaceAll('\\', '/').startsWith('es/')).length} es`,
  );
  console.log(`JSON-LD blocks parsed: ${schemaCount}`);
  console.log(`media payload in dist: ${(mediaBytes / 1e6).toFixed(1)} MB`);

  if (placeholders.size > 0) {
    console.log('\n--- Intentional placeholders still to fill in ---');
    for (const [token, where] of [...placeholders].sort()) {
      const pagesList = [...where].sort();
      const shown = pagesList.slice(0, 4).join(', ');
      const more = pagesList.length > 4 ? ` (+${pagesList.length - 4} more)` : '';
      console.log(`  [${token}] — ${pagesList.length} page(s): ${shown}${more}`);
    }
  }

  if (warnings.length > 0) {
    console.log('\n--- Warnings ---');
    for (const warning of warnings) console.log(`  ${warning}`);
  }

  if (problems.length > 0) {
    console.log('\n--- Problems ---');
    for (const problem of problems) console.log(`  ${problem}`);
    console.log(`\n${problems.length} problem(s) found.`);
    process.exit(1);
  }

  console.log('\nNo problems found.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
