/**
 * Bilingual routing helpers.
 *
 * URL shape: English lives at the root (`/pergolas/`), Spanish under a prefix
 * (`/es/pergolas/`). The slug itself is NOT translated, deliberately:
 *
 *  - `hreflang` correctness is what actually ranks a bilingual site, and it has to
 *    stay correct across every page pair. English slugs make that mapping mechanical
 *    (`/x/` ↔ `/es/x/`) instead of a hand-maintained table that drifts the first time
 *    someone adds a page.
 *  - The head terms here — pergola, tiki hut, chickee — are the same words in Miami
 *    Spanish. The only slugs worth translating (`/galeria/`, `/contacto/`) are on the
 *    lowest-value pages.
 *
 * If pretty Spanish slugs are ever wanted, add a redirect layer on top of a working
 * bilingual site rather than rebuilding the routing.
 */

export const languages = ['en', 'es'] as const;
export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'en';

/** Human label for the language switcher. */
export const langNames: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

/** The `lang` attribute and og:locale for each language. */
export const htmlLang: Record<Lang, string> = {
  en: 'en-US',
  es: 'es-US',
};

export const ogLocale: Record<Lang, string> = {
  en: 'en_US',
  es: 'es_US',
};

/**
 * Strips the language prefix, returning the shared "logical" path.
 * `/es/pergolas/` → `/pergolas/`, `/pergolas/` → `/pergolas/`, `/es/` → `/`.
 */
export function stripLang(path: string): string {
  for (const lang of languages) {
    if (lang === defaultLang) continue;
    if (path === `/${lang}` || path === `/${lang}/`) return '/';
    if (path.startsWith(`/${lang}/`)) return path.slice(`/${lang}`.length);
  }
  return path;
}

/** The language a path belongs to, from the path alone. */
export function langFromPath(path: string): Lang {
  for (const lang of languages) {
    if (lang === defaultLang) continue;
    if (path === `/${lang}` || path === `/${lang}/` || path.startsWith(`/${lang}/`)) return lang;
  }
  return defaultLang;
}

/**
 * The path of `path` in `lang`. Accepts a path in either language, so it is safe to
 * call with whatever the current page happens to be.
 */
export function localizePath(path: string, lang: Lang): string {
  const base = stripLang(path);
  if (lang === defaultLang) return base;
  return base === '/' ? `/${lang}/` : `/${lang}${base}`;
}

/**
 * Every language version of a path, for the hreflang block. Order is stable so the
 * generated HTML does not churn between builds.
 */
export function alternates(path: string): Array<{ lang: Lang; path: string }> {
  return languages.map((lang) => ({ lang, path: localizePath(path, lang) }));
}
