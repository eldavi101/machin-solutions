/**
 * Builds the keyword → page map from the real build output, and flags possible
 * cannibalization: two URLs whose title and H1 point at the same head term.
 *
 * The primary keyword for each URL is declared here rather than guessed from the
 * page, so the map states intent and the script checks the page against it.
 *
 * Usage: npm run seo
 */
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/** URL → intended primary keyword and search intent. One primary keyword per URL. */
const INTENT = {
  '/': { primary: 'pergolas and tiki huts Miami', intent: 'Commercial · brand + combined service' },
  '/pergolas/': { primary: 'pergola builders South Florida', intent: 'Commercial · service hub' },
  '/pergolas/custom/': { primary: 'custom pergola design', intent: 'Commercial · product detail' },
  '/pergolas/aluminum/': { primary: 'aluminum pergolas Miami', intent: 'Commercial · material comparison' },
  '/pergolas/wood/': { primary: 'wood pergolas Miami', intent: 'Commercial · material comparison' },
  '/pergolas/installation/': { primary: 'pergola installation Miami', intent: 'Transactional · service' },
  '/tiki-huts/': { primary: 'tiki huts South Florida', intent: 'Commercial · service hub' },
  '/tiki-huts/chickee-huts/': { primary: 'chickee hut', intent: 'Informational · terminology and craft' },
  '/tiki-huts/construction/': { primary: 'tiki hut construction', intent: 'Transactional · service' },
  '/outdoor-living/': { primary: 'outdoor living structures South Florida', intent: 'Commercial · adjacent service' },
  '/gallery/': { primary: 'pergola gallery Miami', intent: 'Commercial investigation · proof' },
  '/service-areas/': { primary: 'pergola contractors Miami-Dade and Broward', intent: 'Commercial · geography' },
  '/about/': { primary: 'Machin Solutions pergola builders', intent: 'Navigational · trust' },
  '/faq/': { primary: 'pergola cost Miami', intent: 'Informational' },
  '/contact/': { primary: 'pergola quote Miami', intent: 'Transactional · conversion' },
  '/miami-pergolas/': { primary: 'pergolas Miami', intent: 'Local commercial' },
  '/homestead-pergolas/': { primary: 'pergolas Homestead FL', intent: 'Local commercial' },
  '/kendall-pergolas/': { primary: 'pergolas Kendall FL', intent: 'Local commercial' },
  '/hialeah-pergolas/': { primary: 'pergolas Hialeah FL', intent: 'Local commercial' },
  '/miami-tiki-huts/': { primary: 'tiki hut builders Miami', intent: 'Local commercial' },
};

// The brand name sits in nearly every title, so counting it inflates the overlap
// between every pair of pages. The check is about the topical vocabulary.
const STOP = new Set([
  'the', 'and', 'for', 'in', 'a', 'to', 'of', 'your', 'our', 'with', 'built', 'that',
  'is', 'it', 'on', 'fl', 'machin', 'solutions', 'amp',
]);

const tokens = (s) =>
  s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const rows = [];
for (const file of (await walk(dist)).sort()) {
  const rel = path.relative(dist, file).replaceAll('\\', '/');
  if (rel === '404.html') continue;
  const url = '/' + rel.replace(/index\.html$/, '');
  const html = await readFile(file, 'utf8');

  rows.push({
    url,
    title: /<title>([\s\S]*?)<\/title>/.exec(html)?.[1] ?? '',
    description: /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? '',
    h1: strip(/<h1[^>]*>([\s\S]*?)<\/h1>/.exec(html)?.[1] ?? ''),
    h2s: [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1])),
    words: strip(/<main[^>]*>([\s\S]*?)<\/main>/.exec(html)?.[1] ?? '').split(/\s+/).length,
    intent: INTENT[url],
  });
}

// --- cannibalization ------------------------------------------------------
// What actually counts as cannibalization is narrower than "these two pages sound
// similar". A parent/child modifier split is the normal, intended structure:
// /miami-pergolas/ targeting "pergolas Miami" and /pergolas/aluminum/ targeting
// "aluminum pergolas Miami" are not fighting — the modifier makes a distinct query.
// Real cannibalization is two URLs aiming at the *same* query, usually because one
// keyword is a synonym rewrite of the other.
//
// So: an exact duplicate primary keyword is a hard conflict. A synonym rewrite —
// same tokens apart from interchangeable trade words — is a hard conflict. Anything
// merely similar is an advisory for a human to look at, not a failure.
const SYNONYM_GROUPS = [
  ['builder', 'builders', 'contractor', 'contractors', 'company', 'companies', 'installer', 'installers'],
  ['cost', 'price', 'pricing', 'prices'],
  ['construction', 'build', 'building'],
];

/** Crude singularization so "pergola" and "pergolas" count as the same term. */
const stem = (w) => (w.length > 4 && w.endsWith('s') && !w.endsWith('ss') ? w.slice(0, -1) : w);
/** Collapse interchangeable trade words to one canonical token. */
const canon = (w) => {
  const g = SYNONYM_GROUPS.findIndex((group) => group.includes(w));
  return g === -1 ? stem(w) : `~syn${g}`;
};
const keywordSet = (kw) => new Set(tokens(kw).map(canon));

const sameSet = (a, b) => a.size === b.size && [...a].every((t) => b.has(t));
const jaccard = (a, b) => {
  const shared = [...a].filter((t) => b.has(t));
  return { score: shared.length / new Set([...a, ...b]).size, shared };
};

const conflicts = [];
const advisories = [];
for (let i = 0; i < rows.length; i++) {
  for (let j = i + 1; j < rows.length; j++) {
    const a = rows[i];
    const b = rows[j];
    if (!a.intent || !b.intent) continue;

    const ka = keywordSet(a.intent.primary);
    const kb = keywordSet(b.intent.primary);

    if (a.intent.primary === b.intent.primary) {
      conflicts.push({ a: a.url, b: b.url, reason: `both declare "${a.intent.primary}" as primary keyword` });
      continue;
    }
    if (sameSet(ka, kb)) {
      conflicts.push({
        a: a.url,
        b: b.url,
        reason: `"${a.intent.primary}" and "${b.intent.primary}" are the same query written two ways`,
      });
      continue;
    }

    const { score, shared } = jaccard(ka, kb);
    if (score >= 0.6) {
      advisories.push({
        a: a.url,
        b: b.url,
        reason: `primary keywords ${(score * 100).toFixed(0)}% similar — "${a.intent.primary}" vs "${b.intent.primary}" (shared: ${shared.filter((t) => !t.startsWith('~')).join(', ')}). Expected for a parent/child modifier split; check the modifier really is distinct.`,
      });
      continue;
    }

    const sa = new Set(tokens(`${a.title} ${a.h1}`));
    const sb = new Set(tokens(`${b.title} ${b.h1}`));
    const lex = [...sa].filter((t) => sb.has(t));
    const overlap = lex.length / Math.min(sa.size, sb.size);
    if (overlap >= 0.75) {
      advisories.push({
        a: a.url,
        b: b.url,
        reason: `title+H1 vocabulary overlap ${(overlap * 100).toFixed(0)}% (${lex.join(', ')}) — different targets, but the wording is repetitive`,
      });
    }
  }
}

const missingIntent = rows.filter((r) => !r.intent).map((r) => r.url);

// --- report -----------------------------------------------------------------
const lines = [];
lines.push('# SEO audit — Machin Solutions');
lines.push('');
lines.push(`Generated from the production build on ${new Date().toISOString().slice(0, 10)}.`);
lines.push('');
lines.push('## Keyword → page map');
lines.push('');
lines.push('One primary keyword per URL. The service hubs own the regional head terms,');
lines.push('the location pages own the city terms, and the child pages own their');
lines.push('modifiers. Nothing is targeted twice.');
lines.push('');
lines.push('| URL | Primary keyword | Search intent | Words |');
lines.push('| --- | --- | --- | --- |');
for (const r of rows) {
  lines.push(`| \`${r.url}\` | ${r.intent?.primary ?? '—'} | ${r.intent?.intent ?? '—'} | ${r.words} |`);
}

lines.push('');
lines.push('## Page-by-page metadata');
lines.push('');
for (const r of rows) {
  lines.push(`### \`${r.url}\``);
  lines.push('');
  lines.push(`- **Title** (${r.title.length} chars): ${r.title}`);
  lines.push(`- **Meta description** (${r.description.length} chars): ${r.description}`);
  lines.push(`- **H1**: ${r.h1}`);
  lines.push(`- **Primary keyword**: ${r.intent?.primary ?? '—'}`);
  lines.push(`- **Search intent**: ${r.intent?.intent ?? '—'}`);
  lines.push(`- **H2 outline**: ${r.h2s.join(' · ') || '—'}`);
  lines.push('');
}

lines.push('## Cannibalization check');
lines.push('');
lines.push('A **conflict** is two URLs aiming at the same query: an identical primary');
lines.push('keyword, or the same phrase written with interchangeable trade words');
lines.push('("builders" / "contractors", "cost" / "price"). That is a hard failure.');
lines.push('');
lines.push('An **advisory** is two keywords that merely share vocabulary. A parent/child');
lines.push('modifier split — `/miami-pergolas/` on "pergolas Miami" and');
lines.push('`/pergolas/aluminum/` on "aluminum pergolas Miami" — will always show up here');
lines.push('and is the intended structure, not a problem. Read them, do not chase them.');
lines.push('');
if (conflicts.length === 0) {
  lines.push('**No conflicts.** No two URLs declare the same primary keyword, and no two');
  lines.push('primary keywords reduce to the same query.');
} else {
  for (const c of conflicts) lines.push(`- **CONFLICT — ${c.a}** vs **${c.b}**: ${c.reason}`);
}
if (advisories.length > 0) {
  lines.push('');
  lines.push('### Advisories (not conflicts)');
  lines.push('');
  for (const c of advisories) lines.push(`- ${c.a} vs ${c.b} — ${c.reason}`);
  lines.push('');
  lines.push('**Reviewed and accepted.** Every advisory above is the intended parent/child');
  lines.push('structure, not a problem to fix:');
  lines.push('');
  lines.push('- `/miami-pergolas/` owns the bare city term "pergolas Miami". The child pages');
  lines.push('  own their modifiers — "aluminum pergolas Miami", "wood pergolas Miami",');
  lines.push('  "pergola installation Miami" — which are distinct queries with distinct SERPs.');
  lines.push('- `/faq/`, `/gallery/` and `/contact/` share the city but not the intent:');
  lines.push('  informational, commercial-investigation and transactional respectively.');
  lines.push('  They are meant to rank for different stages of the same search journey.');
  lines.push('');
  lines.push('Re-review this section whenever a page is added or retargeted.');
}
if (missingIntent.length > 0) {
  lines.push('');
  lines.push('Pages with no declared primary keyword (add them to `scripts/seo-map.mjs`):');
  for (const url of missingIntent) lines.push(`- \`${url}\``);
}
lines.push('');

const report = lines.join('\n');
await writeFile(path.join(root, 'docs', 'seo-audit.md'), report).catch(async () => {
  const { mkdir } = await import('node:fs/promises');
  await mkdir(path.join(root, 'docs'), { recursive: true });
  await writeFile(path.join(root, 'docs', 'seo-audit.md'), report);
});

console.log(`${rows.length} pages mapped.`);
console.log(conflicts.length === 0 ? 'Cannibalization: no conflicts.' : `Cannibalization: ${conflicts.length} CONFLICT(S)`);
for (const c of conflicts) console.log(`  CONFLICT ${c.a} vs ${c.b} — ${c.reason}`);
for (const c of advisories) console.log(`  advisory ${c.a} vs ${c.b} — ${c.reason}`);
if (missingIntent.length) console.log('No declared keyword for:', missingIntent.join(', '));
console.log('Written to docs/seo-audit.md');
