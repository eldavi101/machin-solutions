/**
 * Structured data builders.
 *
 * Rule for this file: nothing goes into JSON-LD that has not been verified. Phone
 * numbers, addresses, licence numbers, ratings, review counts and founding dates are
 * omitted entirely while they are still placeholders — an invented aggregateRating is
 * both a Google policy problem and a lie about the business.
 */
import { site, real, sameAs, absolute } from '../config/site';
import type { MediaImage, MediaVideo } from './media';

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

/** LocalBusiness / HomeAndConstructionBusiness node for the whole site. */
export function organizationSchema(): Record<string, unknown> {
  const phone = real(site.phone);
  const email = real(site.email);
  const street = real(site.address.street);
  const postalCode = real(site.address.postalCode);
  const profiles = sameAs();

  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'GeneralContractor'],
    '@id': ORG_ID,
    name: site.name,
    url: site.url,
    description: site.tagline,
    image: absolute('/og/machin-solutions-og.jpg'),
    logo: {
      '@type': 'ImageObject',
      url: absolute('/og/machin-solutions-logo.png'),
      width: 512,
      height: 512,
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Miami-Dade County, Florida' },
      { '@type': 'AdministrativeArea', name: 'Broward County, Florida' },
      { '@type': 'AdministrativeArea', name: 'Monroe County, Florida' },
    ],
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      geoRadius: site.geo.radiusKm * 1000,
    },
    knowsAbout: [
      'Pergola design and construction',
      'Aluminum pergolas',
      'Tiki huts',
      'Chickee huts',
      'Outdoor living structures',
    ],
    openingHoursSpecification: site.hours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
  };

  if (phone) node.telephone = phone;
  if (email) node.email = email;
  if (profiles.length > 0) node.sameAs = profiles;

  // Only publish an address once the street line is real; a region-only address is
  // worse than none for a local business.
  if (street) {
    node.address = {
      '@type': 'PostalAddress',
      streetAddress: street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      ...(postalCode ? { postalCode } : {}),
      addressCountry: site.address.country,
    };
  }

  return node;
}

/** WebSite node, published once from the home page. */
export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    description: site.tagline,
    inLanguage: 'en-US',
    publisher: { '@id': ORG_ID },
  };
}

export interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  areaServed?: string[];
  offers?: string[];
}

export function serviceSchema(input: ServiceSchemaInput): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absolute(input.path)}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.serviceType,
    provider: { '@id': ORG_ID },
    url: absolute(input.path),
    areaServed: (input.areaServed ?? ['Miami-Dade County, Florida', 'Broward County, Florida']).map(
      (name) => ({ '@type': 'AdministrativeArea', name }),
    ),
  };

  if (input.offers && input.offers.length > 0) {
    node.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: `${input.name} options`,
      itemListElement: input.offers.map((offer) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: offer },
      })),
    };
  }

  return node;
}

export function breadcrumbSchema(crumbs: Array<{ href?: string; label: string }>, currentPath: string) {
  const trail = [{ href: '/', label: 'Home' }, ...crumbs];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: absolute(crumb.href ?? currentPath),
    })),
  };
}

export function imageObjectSchema(image: MediaImage, projectTitle: string) {
  const largest = image.sizes[image.sizes.length - 1];
  // Both URLs come from the manifest rather than an assumed width. A hardcoded
  // thumbnail width silently 404s the moment the ladder in media.json changes,
  // and a 404 in ImageObject is invisible on the page — only a crawler sees it.
  const smallest = image.sizes[0];
  return {
    '@type': 'ImageObject',
    contentUrl: absolute(`/media/${image.slug}-${largest.width}.jpg`),
    thumbnailUrl: absolute(`/media/${image.slug}-${smallest.width}.jpg`),
    width: largest.width,
    height: largest.height,
    caption: image.alt,
    name: projectTitle,
    creditText: site.name,
    creator: { '@id': ORG_ID },
  };
}

export function videoObjectSchema(video: MediaVideo, projectTitle: string) {
  const node: Record<string, unknown> = {
    '@type': 'VideoObject',
    name: `${projectTitle} — ${video.title}`,
    description: video.title,
    thumbnailUrl: absolute(`/media/${video.slug}-poster.webp`),
    contentUrl: absolute(`/media/${video.slug}.mp4`),
    encodingFormat: 'video/mp4',
    width: video.width,
    height: video.height,
    contentSize: `${Math.round(video.bytes / 1024)}kB`,
  };
  // ISO 8601 duration, only when it was actually probed off the file.
  if (video.seconds) node.duration = `PT${Math.round(video.seconds)}S`;
  return node;
}

/** ImageGallery node for /gallery/. */
export function gallerySchema(
  path: string,
  items: Array<Record<string, unknown>>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    '@id': `${absolute(path)}#gallery`,
    name: `${site.name} — completed pergola and outdoor living projects`,
    url: absolute(path),
    about: { '@id': ORG_ID },
    associatedMedia: items,
  };
}

/** WebPage node tying a page back to the business. */
export function webPageSchema(input: {
  path: string;
  name: string;
  description: string;
  primaryImage?: string;
}): Record<string, unknown> {
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absolute(input.path)}#webpage`,
    url: absolute(input.path),
    name: input.name,
    description: input.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-US',
  };
  if (input.primaryImage) {
    node.primaryImageOfPage = { '@type': 'ImageObject', contentUrl: absolute(input.primaryImage) };
  }
  return node;
}
