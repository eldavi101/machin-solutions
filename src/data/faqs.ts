/**
 * FAQ content.
 *
 * Every answer is written to be genuinely useful to someone deciding whether to build,
 * not to hit a keyword. Where an answer would depend on business facts that have not
 * been verified yet (permit handling, warranty terms, lead times), the answer says so
 * and leaves a clearly marked [PLACEHOLDER] to fill in.
 *
 * `answer` supports a tiny inline markup: [TOKEN] renders as a highlighted placeholder.
 */

export interface Faq {
  question: string;
  answer: string;
}

/** Home page — broad, high-intent questions across both services. */
export const generalFaqs: Faq[] = [
  {
    question: 'What does Machin Solutions build?',
    answer:
      'Custom pergolas, tiki huts and outdoor living structures for homes across Miami and South Florida — freestanding and attached pergolas, poolside cabanas, outdoor kitchen covers, and traditional thatched tiki and chickee huts. Every structure is drawn for the specific yard it goes into rather than picked from a catalogue of stock sizes.',
  },
  {
    question: 'How much does a pergola or tiki hut cost in South Florida?',
    answer:
      'Cost is driven by span, height, material and what gets built into the structure. A compact two-post pergola over a grill area sits at one end; a wide cantilevered structure with a solid insulated roof, lighting, fans, a media wall and a full outdoor kitchen sits at the other. The honest answer is that a number given before anyone has seen the yard is a guess. Send photos and rough dimensions through the quote form and you will get a real figure for your project.',
  },
  {
    question: 'Do I need a permit for a pergola or tiki hut?',
    answer:
      'Permitting is set by your city or county building department, and what it requires depends on the structure — its size, height, whether it is attached to the house, how it is anchored, and where it sits on the lot. Requirements differ between Miami-Dade, Broward and Monroe County. [PERMIT_POLICY] — fill in here whether Machin Solutions pulls the permit, works alongside your permit, or refers you to a permit expediter.',
  },
  {
    question: 'How long does a project take from first call to finished structure?',
    answer:
      'The build itself is usually the shortest part. Most of the calendar goes to design revisions, engineering drawings where they are needed, permit review at the local building department, and material lead times on custom-fabricated aluminium. [LEAD_TIME] — add realistic typical timelines here once you have them.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Miami-Dade and Broward counties, plus the Upper Keys — Miami, Homestead, Kendall, Hialeah, Doral, Coral Gables, Cutler Bay, Palmetto Bay, Pinecrest, Fort Lauderdale, Pembroke Pines, Hollywood and the surrounding cities. If you are just outside that footprint, ask anyway.',
  },
  {
    question: 'Can you work around an existing pool, deck or screen enclosure?',
    answer:
      'Yes — most of the work is exactly that. Footings get placed around existing pool shells, plumbing and deck drains; attached structures tie into the existing roof line; and freestanding structures are set so they clear an enclosure rather than fight it. That planning happens at the site visit, before anything is ordered.',
  },
];

/** Pergolas hub. */
export const pergolaFaqs: Faq[] = [
  {
    question: 'Aluminium or wood — which is better in South Florida?',
    answer:
      'For most South Florida yards, aluminium. It does not rot, warp, split or feed termites, it holds a factory finish through years of UV and salt air, and it needs washing rather than refinishing. Wood still wins on warmth and on matching an older house, and it can be the right call under a shaded canopy — it simply asks for maintenance that aluminium does not.',
  },
  {
    question: 'What is the difference between an open pergola and a solid-roof cover?',
    answer:
      'An open pergola filters light through rafters or louvres: you get shade and pattern, but rain comes through. A solid or insulated roof gives full shade and keeps the space dry, which is what makes an outdoor kitchen or a mounted television practical. Many of the structures we build combine the two — a solid section over the equipment, an open section over the seating.',
  },
  {
    question: 'What are louvered pergolas, and are they worth it?',
    answer:
      'A louvered roof has blades that rotate, so you can open the roof for light and airflow or close it for shade and rain cover. They are worth it where the sun angle changes a lot across the day, or where you want one structure to do both jobs. They cost more than a fixed roof and add moving parts, so they suit a space you use daily rather than occasionally.',
  },
  {
    question: 'Freestanding or attached to the house?',
    answer:
      'Attached structures extend the roof line, feel like part of the house and usually need less footprint. Freestanding structures go wherever the shade is actually needed — over a pool deck, at the far end of the yard, around a firepit — and avoid tying into the existing roof and fascia at all. The pool decks we work on most often end up freestanding for exactly that reason.',
  },
  {
    question: 'Can you add lighting, fans, a television or speakers?',
    answer:
      'Yes, and it is much cleaner to plan them in from the start. Recessed downlights, ceiling fans, wall-mounted televisions and speakers all need conduit, blocking and mounting points designed into the frame rather than surface-mounted afterwards. Most of the projects in our gallery were built that way.',
  },
  {
    question: 'How is a pergola anchored so it holds up in a storm?',
    answer:
      'Through the footings and the connections, not the posts. A structure that will hold has properly sized concrete footings, anchor hardware rated for the loads, and beam-to-post connections that transfer uplift rather than just resting weight on a post. That is also what engineering drawings and permit review exist to check.',
  },
];

/** Tiki huts hub. */
export const tikiFaqs: Faq[] = [
  {
    question: 'What is the difference between a tiki hut and a chickee hut?',
    answer:
      'They describe the same kind of structure and in South Florida the words are used interchangeably. "Chickee" is the Seminole and Miccosukee term for the open-sided, thatched-roof shelter the form comes from — a raised frame, no walls, and a steep palm-thatch roof that sheds rain and stays cool underneath. "Tiki hut" is the name the same structure picked up commercially.',
  },
  {
    question: 'What are tiki huts actually made of?',
    answer:
      'Traditionally a cypress or pressure-treated frame carrying a thatch roof of sabal palm fronds, layered thick and steeply pitched so water runs off the outside and the interior stays dry and shaded. Synthetic thatch is also available and lasts longer with less upkeep, at the cost of some of the character.',
  },
  {
    question: 'How long does a thatch roof last, and can it be re-thatched?',
    answer:
      'Natural thatch is a wearing surface: it weathers, thins and eventually needs replacing, and how fast depends on sun exposure, rainfall, tree cover and how the roof was built. Re-thatching is a normal part of owning one — the frame stays, the roof gets renewed. [THATCH_LIFESPAN] — add the lifespan and re-thatch interval you are prepared to stand behind.',
  },
  {
    question: 'Are tiki huts a good idea next to a pool?',
    answer:
      'They are one of the best uses for them. An open-sided thatched roof gives deep shade without blocking the breeze, which is what you want beside a pool in July, and the structure reads as a destination in the yard rather than an extension of the house.',
  },
  {
    question: 'Do tiki huts need a permit?',
    answer:
      'That depends on your local building department, the size and height of the structure, and how it is anchored — and rules differ between Miami-Dade, Broward and Monroe County. Some jurisdictions treat certain traditional chickee structures differently from other accessory buildings. Do not take a general answer from a website as your answer: [PERMIT_POLICY] — fill in how Machin Solutions handles this.',
  },
  {
    question: 'Can you repair or re-thatch a hut you did not build?',
    answer:
      '[TIKI_SERVICE_SCOPE] — confirm here whether repair, re-thatching and maintenance on existing huts are offered, and any limits on what can be worked on.',
  },
];

/** Gallery page. */
export const galleryFaqs: Faq[] = [
  {
    question: 'Are these photographs of your own projects?',
    answer:
      'Yes. Every photograph on this site is a structure Machin Solutions built, photographed on site — several of them mid-installation, ladders and all. There is no stock photography and no renders presented as finished work.',
  },
  {
    question: 'Can I get the same structure as one of these projects?',
    answer:
      'Close to it, adapted to your yard. Spans, post positions, roof type and finishes all shift with the space and the way you use it. Point at the project you like on the quote form and describe what is different about your yard — that is a much better starting point than a blank page.',
  },
];

/** Contact page. */
export const contactFaqs: Faq[] = [
  {
    question: 'What happens after I send the form?',
    answer:
      'Someone reads it and gets back to you to arrange a site visit — measuring the space, checking access, looking at where footings can go and how the structure would meet the house. Design and a written estimate follow from that visit.',
  },
  {
    question: 'What should I include to get a useful answer quickly?',
    answer:
      'Photos of the space from two or three angles, rough dimensions of the area you want covered, whether there is a pool or existing deck, and what you want to do under it — dining, a kitchen, lounging, shade over a play area. That is usually enough to give you a real direction on the first reply.',
  },
  {
    question: 'Is the estimate free?',
    answer: '[ESTIMATE_POLICY] — state here whether estimates and site visits are free, and any conditions attached.',
  },
];
