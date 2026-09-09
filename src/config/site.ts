/**
 * Single source of truth for every piece of business information on the site.
 *
 * Anything wrapped in [SQUARE_BRACKETS] is a deliberate placeholder that has not been
 * verified yet. Replace it here once and it updates everywhere — header, footer, CTAs,
 * contact page, structured data and Open Graph tags.
 *
 * Placeholders degrade gracefully: a "Call" button whose number is still a placeholder
 * links to /contact/ instead of producing a broken tel: link, and unverified fields are
 * omitted from JSON-LD rather than published as invented data.
 */

export const PLACEHOLDER = /^\[[A-Z0-9_]+\]$/;

/** True when a config value is still an unfilled placeholder. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || PLACEHOLDER.test(value.trim());
}

/** Returns the value only when it has been filled in with real data. */
export function real(value: string | null | undefined): string | null {
  return isPlaceholder(value) ? null : (value as string);
}

export const site = {
  name: 'Machin Solutions',
  legalName: 'Machin Solutions',
  domain: 'machinsolutions.com',
  url: 'https://machinsolutions.com',
  tagline: 'Custom pergolas, tiki huts and outdoor living structures in Miami & South Florida.',
  founded: null as string | null, // Not verified — leave null rather than invent a year.

  // ---------------------------------------------------------------------------
  // CONTACT — replace these placeholders with the real details.
  // ---------------------------------------------------------------------------
  // `phone` is the dialable form (used in tel: links and JSON-LD); `phoneDisplay` is
  // what visitors read. Always render phoneDisplay via phoneLabel() — rendering
  // `phone` directly puts "+17869926153" on the page.
  phone: '+17869926153',
  phoneDisplay: '(786) 992-6153',
  phoneAlt: '+17867750816',
  phoneAltDisplay: '(786) 775-0816',
  email: 'machindavid2@gmail.com',
  emailAlt: 'machinfarms@gmail.com',
  address: {
    street: '30760 SW 212 Ave',
    locality: 'Homestead',
    region: 'FL',
    postalCode: '33030',
    country: 'US',
  },
  licenseNumber: '[LICENSE_NUMBER]',

  // ---------------------------------------------------------------------------
  // PROFILES — used for Organization.sameAs in structured data.
  // Only non-placeholder entries are emitted.
  // ---------------------------------------------------------------------------
  profiles: {
    googleBusiness: '[GOOGLE_BUSINESS_PROFILE]',
    facebook: '[FACEBOOK_URL]',
    instagram: '[INSTAGRAM_URL]',
  },

  // ---------------------------------------------------------------------------
  // QUOTE FORM
  // GitHub Pages serves static files only — there is no backend to post to.
  // Set this to a form endpoint (Formspree, Basin, Netlify Forms, Web3Forms, a
  // Cloudflare Worker, …) and the form starts submitting for real. Until then the
  // form validates, then shows the visitor how to reach the business directly.
  // ---------------------------------------------------------------------------
  formEndpoint: null as string | null,

  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '18:00' },
    { days: ['Saturday'], opens: '09:00', closes: '14:00' },
  ],

  /**
   * Centre of the SERVICE AREA, not the business location — it feeds the GeoCircle in
   * `serviceArea`, which spans Miami-Dade, Broward and the Upper Keys. It stays on Miami
   * because that is the middle of the area served; the business itself sits in Homestead,
   * at the southern edge of it.
   *
   * There is deliberately no `geo` for the premises: that needs real coordinates for
   * 30760 SW 212 Ave, and guessing them would be inventing precision. Geocode the address
   * properly and add it, or leave it out.
   */
  geo: { latitude: 25.7617, longitude: -80.1918, radiusKm: 80 },
} as const;

/** The human-readable phone number, or null while it is still a placeholder. */
export function phoneLabel(): string | null {
  return real(site.phoneDisplay) ?? real(site.phone);
}

/** The secondary number, human-readable, or null if there isn't one. */
export function phoneAltLabel(): string | null {
  return real(site.phoneAltDisplay) ?? real(site.phoneAlt);
}

/** Where the secondary "Call" link should point, or null if there isn't one. */
export function callAltHref(): string | null {
  const phone = real(site.phoneAlt);
  return phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : null;
}

/** Where a secondary "Email us" link should point, or null if there isn't one. */
export function emailAltHref(): string | null {
  const email = real(site.emailAlt);
  return email ? `mailto:${email}` : null;
}

/** Every verified phone number, dialable form — for JSON-LD. */
export function allPhones(): string[] {
  return [real(site.phone), real(site.phoneAlt)].filter((v): v is string => v !== null);
}

/** Every verified email address — for JSON-LD. */
export function allEmails(): string[] {
  return [real(site.email), real(site.emailAlt)].filter((v): v is string => v !== null);
}

/** Where a "Call now" button should point, given what we actually know. */
export function callHref(): string {
  const phone = real(site.phone);
  return phone ? `tel:${phone.replace(/[^+\d]/g, '')}` : '/contact/';
}

/** Where an "Email us" link should point. */
export function emailHref(): string | null {
  const email = real(site.email);
  return email ? `mailto:${email}` : null;
}

/** Profile URLs that have actually been filled in, for Organization.sameAs. */
export function sameAs(): string[] {
  return Object.values(site.profiles).filter((value): value is string => real(value) !== null);
}

/** Absolute URL for a site-relative path. */
export function absolute(pathname: string): string {
  return new URL(pathname, site.url).href;
}
