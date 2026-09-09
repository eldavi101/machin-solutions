/**
 * Which pages actually exist in each language.
 *
 * The Spanish tree is being filled in page by page, and a language switcher that
 * links to a page nobody has written yet is a 404 in the header — the single worst
 * place to put one. So the switcher asks this module first and simply does not
 * render when the counterpart is missing.
 *
 * The list is derived from the filesystem with `import.meta.glob`, not hand-written,
 * so adding `src/pages/es/faq.astro` is all it takes for the switcher to light up on
 * `/faq/`. Nothing to remember, nothing to keep in sync.
 */

import { defaultLang, localizePath, stripLang, type Lang } from './index';

/** eager:false — only the keys are read, the modules are never loaded. */
const esModules = import.meta.glob('../pages/es/**/*.astro');

/**
 * `../pages/es/pergolas/index.astro` → `/pergolas/`
 * `../pages/es/about.astro`          → `/about/`
 * `../pages/es/index.astro`          → `/`
 *
 * Returns the LOGICAL path (no language prefix), which is what the rest of the
 * i18n helpers take.
 */
function logicalPathFromFile(file: string): string {
  const relative = file.replace('../pages/es/', '').replace(/\.astro$/, '');
  if (relative === 'index') return '/';
  return `/${relative.replace(/\/index$/, '')}/`;
}

const esRoutes = new Set(Object.keys(esModules).map(logicalPathFromFile));

/** Every logical path that has a Spanish page, sorted — handy for the audit. */
export const translatedPaths: string[] = [...esRoutes].sort();

/** Does `path` (in either language) exist in `lang`? */
export function existsIn(path: string, lang: Lang): boolean {
  // English is complete by definition: it is the source tree.
  if (lang === defaultLang) return true;
  return esRoutes.has(stripLang(path));
}

/**
 * The counterpart URL for the language switcher, or null when this page has no
 * version in the other language yet.
 */
export function counterpart(path: string, lang: Lang): string | null {
  return existsIn(path, lang) ? localizePath(path, lang) : null;
}
