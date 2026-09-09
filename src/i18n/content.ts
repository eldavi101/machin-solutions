/**
 * Prose that lives inside components rather than inside a page.
 *
 * `ui.ts` holds short chrome — a button label, a form error. This file holds the
 * handful of *paragraphs* that components carry as defaults: the value props, the
 * process steps, and the section headings that go with them. They are prose, so they
 * do not belong in a flat string table, but they are shared across many pages, so
 * they cannot live in a single page either.
 *
 * Pages can still pass their own `items` / `steps` and override all of it.
 *
 * Same rule as everywhere else on this site: nothing here claims anything about the
 * business that has not been verified — no years in business, no client counts, no
 * guarantees, no licence claims.
 */

import type { Lang } from './index';

export interface ValueProp {
  title: string;
  body: string;
  icon: 'draw' | 'anchor' | 'sun' | 'local' | 'finish' | 'clean';
}

export interface ProcessStep {
  title: string;
  body: string;
}

export const valueProps: Record<Lang, ValueProp[]> = {
  en: [
    {
      icon: 'draw',
      title: 'Drawn for your yard, not picked from a catalogue',
      body: 'Spans, post positions and roof type follow the space, the pool, the door you walk out of and where the sun actually lands.',
    },
    {
      icon: 'sun',
      title: 'Built for South Florida weather',
      body: 'Full sun, driving summer rain, salt air near the water and hurricane season are the design conditions here, not edge cases.',
    },
    {
      icon: 'anchor',
      title: 'The connections are the structure',
      body: 'Footings sized for the loads, anchor hardware rated for uplift, and beam-to-post connections that transfer force instead of just resting on it.',
    },
    {
      icon: 'finish',
      title: 'Finished, not just framed',
      body: 'Lighting, fans, speakers, soffit panels and screens are planned into the frame from the start rather than surface-mounted afterwards.',
    },
    {
      icon: 'local',
      title: 'One crew, start to finish',
      body: 'The people who measure your yard are the people who build in it. Nothing gets handed off to a subcontractor who never saw the site.',
    },
    {
      icon: 'clean',
      title: 'You get your yard back',
      body: 'The site is cleaned up before we leave it. A finished structure and a yard full of offcuts is not a finished job.',
    },
  ],
  es: [
    {
      icon: 'draw',
      title: 'Dibujada para su patio, no elegida de un catálogo',
      body: 'Las luces, la posición de los postes y el tipo de techo salen del espacio real: la piscina, la puerta por la que sale usted y por dónde entra el sol de verdad.',
    },
    {
      icon: 'sun',
      title: 'Construida para el clima del sur de Florida',
      body: 'Sol pleno, los aguaceros del verano, el aire salino cerca del agua y la temporada de huracanes son las condiciones de diseño aquí, no casos excepcionales.',
    },
    {
      icon: 'anchor',
      title: 'Las uniones son la estructura',
      body: 'Cimentaciones dimensionadas para las cargas, herrajes de anclaje homologados para succión, y uniones viga-poste que transmiten el esfuerzo en lugar de solo apoyarse.',
    },
    {
      icon: 'finish',
      title: 'Terminada, no solo montada',
      body: 'La iluminación, los ventiladores, los altavoces, los paneles del techo y las pantallas se proyectan dentro de la estructura desde el principio, no se atornillan por fuera después.',
    },
    {
      icon: 'local',
      title: 'Un solo equipo, de principio a fin',
      body: 'Quien mide su patio es quien construye en él. Nada se traspasa a un subcontratista que nunca vio el terreno.',
    },
    {
      icon: 'clean',
      title: 'Le devolvemos su patio',
      body: 'Dejamos la obra limpia antes de irnos. Una estructura terminada y un patio lleno de recortes no es un trabajo terminado.',
    },
  ],
};

export const processSteps: Record<Lang, ProcessStep[]> = {
  en: [
    {
      title: 'Tell us what you want to build',
      body: 'Send photos of the space, rough dimensions and what you want to do under the structure. That is enough for a first, honest read on what will work.',
    },
    {
      title: 'Site visit and measurements',
      body: 'We come out, measure properly, check access for materials, look at where footings can go, and see how the structure would meet the house and the pool deck.',
    },
    {
      title: 'Design and written estimate',
      body: 'You get a design drawn for your yard — spans, post positions, roof type, finishes and everything built in — with a written estimate against it.',
    },
    {
      title: 'Approvals and fabrication',
      body: 'Drawings and paperwork go where they need to go, and the frame is fabricated to the approved dimensions while that runs.',
    },
    {
      title: 'Installation',
      body: 'Footings, frame, roof, then the finishing work — lighting, fans, screens, soffit panels. Your yard gets cleaned up before we leave it.',
    },
  ],
  es: [
    {
      title: 'Cuéntenos qué quiere construir',
      body: 'Mándenos fotos del espacio, medidas aproximadas y qué piensa hacer debajo de la estructura. Con eso basta para darle una primera lectura honesta de qué va a funcionar.',
    },
    {
      title: 'Visita técnica y mediciones',
      body: 'Vamos hasta allí, medimos bien, comprobamos el acceso para los materiales, miramos dónde pueden ir las cimentaciones y cómo encajaría la estructura con la casa y con la terraza de la piscina.',
    },
    {
      title: 'Diseño y presupuesto por escrito',
      body: 'Recibe un diseño dibujado para su patio — luces, posición de postes, tipo de techo, acabados y todo lo que va integrado — con un presupuesto por escrito.',
    },
    {
      title: 'Trámites y fabricación',
      body: 'Los planos y el papeleo van a donde tengan que ir, y mientras eso avanza se fabrica la estructura con las medidas aprobadas.',
    },
    {
      title: 'Instalación',
      body: 'Cimentaciones, estructura, techo y después los remates: iluminación, ventiladores, pantallas y paneles. Le dejamos el patio limpio antes de irnos.',
    },
  ],
};

/** Headings that go with the shared sections above. */
export const sectionCopy = {
  en: {
    valuePropsEyebrow: 'Why Machin Solutions',
    valuePropsTitle: 'What actually separates a good structure from a cheap one',
    processEyebrow: 'How it works',
    processTitle: 'From first message to finished structure',
  },
  es: {
    valuePropsEyebrow: 'Por qué Machin Solutions',
    valuePropsTitle: 'Qué diferencia de verdad una buena estructura de una barata',
    processEyebrow: 'Cómo funciona',
    processTitle: 'Del primer mensaje a la estructura terminada',
  },
} as const;
