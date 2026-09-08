/**
 * Service areas.
 *
 * `landing` marks the cities that have a dedicated landing page. A city only earns
 * one when there is enough genuinely different content to write about it — the yard
 * types, the housing stock, the exposure. The rest are listed on /service-areas/
 * without a thin page of their own.
 */

export interface Area {
  name: string;
  county: 'Miami-Dade' | 'Broward' | 'Monroe';
  /** One line describing what building here actually involves. */
  note: string;
  /** Dedicated landing page path, when one exists. */
  landing?: string;
}

export const areas: Area[] = [
  {
    name: 'Miami',
    county: 'Miami-Dade',
    note: 'From compact Shenandoah and Coconut Grove lots to wide Pinecrest yards — every structure is drawn to the space it actually has.',
    landing: '/miami-pergolas/',
  },
  {
    name: 'Homestead',
    county: 'Miami-Dade',
    note: 'Newer subdivisions with big open yards, little mature shade, and a lot of exposure to afternoon sun and open-field wind.',
    landing: '/homestead-pergolas/',
  },
  {
    name: 'Kendall',
    county: 'Miami-Dade',
    note: 'Established homes with mature landscaping and screened patios, where a pergola usually extends what is already there.',
    landing: '/kendall-pergolas/',
  },
  {
    name: 'Hialeah',
    county: 'Miami-Dade',
    note: 'Tight, hard-working backyards where every square foot of usable shade counts and clean lines beat bulk.',
    landing: '/hialeah-pergolas/',
  },
  { name: 'Doral', county: 'Miami-Dade', note: 'Newer construction and HOA neighbourhoods that expect a clean, engineered look.' },
  { name: 'Coral Gables', county: 'Miami-Dade', note: 'Mature canopy and design-sensitive streets where the structure has to defer to the house.' },
  { name: 'Cutler Bay', county: 'Miami-Dade', note: 'Open coastal-edge lots with real exposure to onshore wind.' },
  { name: 'Palmetto Bay', county: 'Miami-Dade', note: 'Large lots and pool decks with room for a full freestanding structure.' },
  { name: 'Pinecrest', county: 'Miami-Dade', note: 'Deep yards and heavy tree cover — usually a freestanding build in a clearing.' },
  { name: 'Miami Lakes', county: 'Miami-Dade', note: 'Lakefront and waterway lots with wind coming off open water.' },
  { name: 'Miami Springs', county: 'Miami-Dade', note: 'Older housing stock where the roof tie-in needs care.' },
  { name: 'South Miami', county: 'Miami-Dade', note: 'Compact lots that reward a well-proportioned attached structure.' },
  { name: 'Fort Lauderdale', county: 'Broward', note: 'Waterfront and canal properties, and the salt exposure that comes with them.' },
  { name: 'Pembroke Pines', county: 'Broward', note: 'Newer developments with flat, open backyards and full sun.' },
  { name: 'Hollywood', county: 'Broward', note: 'A mix of older bungalows and new builds, close enough to the coast to matter.' },
  { name: 'Miramar', county: 'Broward', note: 'Planned communities with consistent lot shapes and HOA review.' },
  { name: 'Weston', county: 'Broward', note: 'Large lots backing onto lakes and preserves.' },
  { name: 'Davie', county: 'Broward', note: 'Deep properties, some of them acreage, with room for larger structures.' },
  { name: 'Key Largo', county: 'Monroe', note: 'Keys builds, where salt air and wind exposure drive the material choice.' },
  { name: 'Islamorada', county: 'Monroe', note: 'Exposed waterfront sites that need corrosion-resistant hardware throughout.' },
];

export const landingAreas = areas.filter((area) => area.landing);

export const areasByCounty = (['Miami-Dade', 'Broward', 'Monroe'] as const).map((county) => ({
  county,
  areas: areas.filter((area) => area.county === county),
}));
