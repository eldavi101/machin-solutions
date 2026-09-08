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
  phone: '[PHONE_NUMBER]',
  phoneDisplay: '[PHONE_NUMBER]',
  email: '[EMAIL]',
  address: {
    street: '[BUSINESS_ADDRESS]',
    locality: 'Miami',
    region: 'FL',
    postalCode: '[POSTAL_CODE]',
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

  /** Geographic centre used for the LocalBusiness service radius. */
  geo: { latitude: 25.7617, longitude: -80.1918, radiusKm: 80 },
} as const;

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
