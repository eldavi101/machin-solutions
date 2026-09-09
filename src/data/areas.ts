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
  /** The same line in Spanish. City names do not translate; what you build there does. */
  noteEs: string;
  /** Dedicated landing page path, when one exists. */
  landing?: string;
}

export const areas: Area[] = [
  {
    name: 'Miami',
    county: 'Miami-Dade',
    note: 'From compact Shenandoah and Coconut Grove lots to wide Pinecrest yards — every structure is drawn to the space it actually has.',
    noteEs: 'Desde parcelas compactas de Shenandoah y Coconut Grove hasta patios amplios de Pinecrest: cada estructura se dibuja para el espacio que hay de verdad.',
    landing: '/miami-pergolas/',
  },
  {
    name: 'Homestead',
    county: 'Miami-Dade',
    note: 'Newer subdivisions with big open yards, little mature shade, and a lot of exposure to afternoon sun and open-field wind.',
    noteEs: 'Urbanizaciones nuevas con patios grandes y despejados, poca sombra madura y mucha exposición al sol de la tarde y al viento de campo abierto.',
    landing: '/homestead-pergolas/',
  },
  {
    name: 'Kendall',
    county: 'Miami-Dade',
    note: 'Established homes with mature landscaping and screened patios, where a pergola usually extends what is already there.',
    noteEs: 'Viviendas consolidadas con jardín maduro y patios con mosquitera, donde una pérgola suele prolongar lo que ya existe.',
    landing: '/kendall-pergolas/',
  },
  {
    name: 'Hialeah',
    county: 'Miami-Dade',
    note: 'Tight, hard-working backyards where every square foot of usable shade counts and clean lines beat bulk.',
    noteEs: 'Patios pequeños y muy aprovechados, donde cada metro de sombra útil cuenta y las líneas limpias ganan al volumen.',
    landing: '/hialeah-pergolas/',
  },
  { name: 'Doral', county: 'Miami-Dade', note: 'Newer construction and HOA neighbourhoods that expect a clean, engineered look.', noteEs: 'Construcción reciente y barrios con HOA que esperan un acabado limpio y bien resuelto.' },
  { name: 'Coral Gables', county: 'Miami-Dade', note: 'Mature canopy and design-sensitive streets where the structure has to defer to the house.', noteEs: 'Copa de árboles madura y calles exigentes en diseño, donde la estructura tiene que ceder el protagonismo a la casa.' },
  { name: 'Cutler Bay', county: 'Miami-Dade', note: 'Open coastal-edge lots with real exposure to onshore wind.', noteEs: 'Parcelas abiertas en el borde costero, con exposición real al viento de mar.' },
  { name: 'Palmetto Bay', county: 'Miami-Dade', note: 'Large lots and pool decks with room for a full freestanding structure.', noteEs: 'Parcelas grandes y terrazas de piscina con sitio para una estructura exenta completa.' },
  { name: 'Pinecrest', county: 'Miami-Dade', note: 'Deep yards and heavy tree cover — usually a freestanding build in a clearing.', noteEs: 'Patios profundos y mucha arboleda: casi siempre una construcción exenta en un claro.' },
  { name: 'Miami Lakes', county: 'Miami-Dade', note: 'Lakefront and waterway lots with wind coming off open water.', noteEs: 'Parcelas junto a lagos y canales, con viento entrando desde aguas abiertas.' },
  { name: 'Miami Springs', county: 'Miami-Dade', note: 'Older housing stock where the roof tie-in needs care.', noteEs: 'Vivienda antigua donde el enlace con el tejado pide cuidado.' },
  { name: 'South Miami', county: 'Miami-Dade', note: 'Compact lots that reward a well-proportioned attached structure.', noteEs: 'Parcelas compactas que agradecen una estructura adosada bien proporcionada.' },
  { name: 'Fort Lauderdale', county: 'Broward', note: 'Waterfront and canal properties, and the salt exposure that comes with them.', noteEs: 'Propiedades a pie de agua y de canal, con la exposición al salitre que eso trae.' },
  { name: 'Pembroke Pines', county: 'Broward', note: 'Newer developments with flat, open backyards and full sun.', noteEs: 'Promociones nuevas con patios llanos, despejados y a pleno sol.' },
  { name: 'Hollywood', county: 'Broward', note: 'A mix of older bungalows and new builds, close enough to the coast to matter.', noteEs: 'Mezcla de bungalós antiguos y obra nueva, lo bastante cerca de la costa como para tenerlo en cuenta.' },
  { name: 'Miramar', county: 'Broward', note: 'Planned communities with consistent lot shapes and HOA review.', noteEs: 'Comunidades planificadas con parcelas de forma constante y revisión de la HOA.' },
  { name: 'Weston', county: 'Broward', note: 'Large lots backing onto lakes and preserves.', noteEs: 'Parcelas grandes que dan a lagos y zonas protegidas.' },
  { name: 'Davie', county: 'Broward', note: 'Deep properties, some of them acreage, with room for larger structures.', noteEs: 'Propiedades profundas, algunas de gran superficie, con sitio para estructuras mayores.' },
  { name: 'Key Largo', county: 'Monroe', note: 'Keys builds, where salt air and wind exposure drive the material choice.', noteEs: 'Obra en los Cayos, donde el aire salino y la exposición al viento mandan en la elección del material.' },
  { name: 'Islamorada', county: 'Monroe', note: 'Exposed waterfront sites that need corrosion-resistant hardware throughout.', noteEs: 'Emplazamientos expuestos a pie de agua que piden herrajes resistentes a la corrosión en todo el conjunto.' },
];

export const landingAreas = areas.filter((area) => area.landing);

export const areasByCounty = (['Miami-Dade', 'Broward', 'Monroe'] as const).map((county) => ({
  county,
  areas: areas.filter((area) => area.county === county),
}));
