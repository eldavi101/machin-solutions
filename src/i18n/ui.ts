/**
 * Interface strings, in both languages.
 *
 * This file holds the *chrome* — navigation, buttons, form labels, error messages,
 * the footer. Page prose does NOT live here: it lives in the pages themselves, in
 * `src/pages/` for English and `src/pages/es/` for Spanish. Putting 15,000 words of
 * marketing copy into a key-value dictionary makes both the dictionary and the
 * templates unreadable.
 *
 * The Spanish is written for a South Florida audience, not translated literally:
 * "presupuesto" rather than "estimado", "visita técnica" rather than "visita del
 * sitio", "pérgola" with the accent. Same rule as the English copy — nothing here
 * may claim anything about the business that has not been verified.
 */

import type { Lang } from './index';

export const ui = {
  en: {
    // --- navigation ---------------------------------------------------------
    'nav.pergolas': 'Pergolas',
    'nav.tikiHuts': 'Tiki Huts',
    'nav.outdoorLiving': 'Outdoor Living',
    'nav.gallery': 'Our Work',
    'nav.serviceAreas': 'Service Areas',
    'nav.about': 'About',
    'nav.primary': 'Primary',
    'nav.menu': 'Menu',
    'nav.skipToContent': 'Skip to main content',

    // --- language switcher --------------------------------------------------
    'lang.label': 'Language',
    'lang.switchTo': 'Ver en español',
    'lang.current': 'English',

    // --- calls to action ----------------------------------------------------
    'cta.freeEstimate': 'Get a Free Estimate',
    'cta.requestQuote': 'Request a quote',
    'cta.getQuote': 'Get a quote',
    'cta.callNow': 'Call now',
    'cta.viewWork': 'View Our Work',
    'cta.call': 'Call',
    'cta.email': 'Email',
    'cta.or': 'Or',
    'cta.band.title': 'Tell us about your backyard.',
    'cta.band.body':
      'Send a couple of photos and rough dimensions and you will get a real answer about what fits, what it takes and what it costs — not a brochure.',
    'areas.whereWeBuild': 'Where we build',
    'tiki.caption': 'Tiki hut photography is being added to this gallery.',

    // --- breadcrumbs --------------------------------------------------------
    'crumb.home': 'Home',
    'crumb.label': 'Breadcrumb',

    // --- gallery ------------------------------------------------------------
    'gallery.allProjects': 'All projects',
    'gallery.filterLabel': 'Filter projects by type',
    'gallery.viewer': 'Project photo viewer',
    'gallery.close': 'Close photo viewer',
    'gallery.next': 'Next photo',
    'gallery.previous': 'Previous photo',
    'gallery.videoUnsupported': 'Your browser cannot play this video.',
    'gallery.downloadClip': 'Download the clip',
    'gallery.instead': 'instead.',
    'gallery.category.pergolas': 'Pergolas',
    'gallery.category.tikiHuts': 'Tiki Huts',
    'gallery.category.outdoorLiving': 'Outdoor Living',

    // --- quote form ---------------------------------------------------------
    'form.name': 'Name',
    'form.phone': 'Phone',
    'form.email': 'Email',
    'form.city': 'City',
    'form.service': 'Service needed',
    'form.serviceChoose': 'Choose a service…',
    'form.servicePergola': 'Pergola',
    'form.serviceTiki': 'Tiki Hut',
    'form.serviceOther': 'Other Outdoor Project',
    'form.description': 'Project description',
    'form.submit': 'Request My Free Estimate',
    'form.privacy':
      'No obligation. Your details are used to prepare your estimate and nothing else.',
    'form.phonePlaceholder': '(786) 000-0000',
    'form.err.name': 'Please tell us your name.',
    'form.err.phone': 'Please enter a phone number we can reach you on.',
    'form.err.email': 'Please enter a valid email address.',
    'form.err.city': 'Please tell us which city the project is in.',
    'form.err.service': 'Please choose the type of project.',
    'form.err.description': 'Please describe the project, even briefly.',
    'form.status.sending': 'Sending…',
    'form.status.sent': 'Thank you — your request is on its way. We will be in touch shortly.',
    'form.status.failed':
      'Something went wrong sending the form. Please call or email us directly and we will pick it up straight away.',
    'form.status.noEndpoint':
      'Thanks — everything checks out. This demo form is not connected to a mailbox yet, so please call or email us directly and we will pick it up straight away.',
    'form.ownerNote': 'Setup note for the site owner:',
    'form.err.generic': 'Please check this field.',
    'form.err.incomplete': 'A few details are still missing — they are marked above.',
    'form.preferToCall': 'Prefer to call?',
    'form.descriptionPlaceholder':
      'Rough size of the area, whether there is a pool or existing deck, and what you want to use the space for.',
    'form.photosHint':
      'Photos help a lot. Mention that you have them and you will be told where to send them.',

    // --- footer -------------------------------------------------------------
    'footer.label': 'Footer',
    'footer.company': 'Company',
    'footer.pergolas': 'Pergolas',
    'footer.serviceAreas': 'Service areas',
    'footer.popularAreas': 'Popular service areas',
    'footer.allAreas': 'All South Florida service areas',
    'footer.about': 'About us',
    'footer.faq': 'FAQ',
    'footer.ourWork': 'Our work',
    'footer.licence': 'Licence',
    'footer.serving': 'Serving Miami-Dade, Broward & the Upper Keys',
    'footer.tagline':
      'Custom pergolas, tiki huts and outdoor living structures built for South Florida backyards — Miami-Dade, Broward and the Upper Keys.',
    'footer.pergolasOverview': 'Pergolas overview',
    'footer.customPergolas': 'Custom pergolas',
    'footer.aluminumPergolas': 'Aluminum pergolas',
    'footer.pergolaInstallation': 'Pergola installation',
    'footer.chickeeHuts': 'Chickee huts',
    'footer.outdoorStructures': 'Outdoor living structures',
    'footer.rights': 'All rights reserved.',
    'footer.woodPergolas': 'Wood pergolas',
    'footer.tikiOverview': 'Tiki huts overview',
    'footer.tikiConstruction': 'Tiki hut construction',
    'footer.pergolasIn': 'Pergolas in',
    'footer.tikiHutsIn': 'Tiki huts in',

    // --- tiki placeholder ---------------------------------------------------
    'tiki.meanwhile': 'In the meantime, the',
    'tiki.galleryLink': 'pergola and outdoor living gallery',
  },

  es: {
    // --- navegación ---------------------------------------------------------
    'nav.pergolas': 'Pérgolas',
    'nav.tikiHuts': 'Tiki Huts',
    'nav.outdoorLiving': 'Espacios Exteriores',
    'nav.gallery': 'Nuestro Trabajo',
    'nav.serviceAreas': 'Zonas de Servicio',
    'nav.about': 'Nosotros',
    'nav.primary': 'Principal',
    'nav.menu': 'Menú',
    'nav.skipToContent': 'Saltar al contenido principal',

    // --- selector de idioma -------------------------------------------------
    'lang.label': 'Idioma',
    'lang.switchTo': 'View in English',
    'lang.current': 'Español',

    // --- llamadas a la acción -----------------------------------------------
    'cta.freeEstimate': 'Presupuesto Gratis',
    'cta.requestQuote': 'Pedir presupuesto',
    'cta.getQuote': 'Presupuesto',
    'cta.callNow': 'Llamar ahora',
    'cta.viewWork': 'Ver Nuestro Trabajo',
    'cta.call': 'Teléfono',
    'cta.email': 'Correo',
    'cta.or': 'O',
    'cta.band.title': 'Cuéntenos cómo es su patio.',
    'cta.band.body':
      'Mande un par de fotos y medidas aproximadas y recibirá una respuesta real sobre qué cabe, qué hace falta para construirlo y cuánto cuesta — no un folleto.',
    'areas.whereWeBuild': 'Dónde construimos',
    'tiki.caption': 'Estamos añadiendo fotografías de tiki huts a esta galería.',

    // --- migas de pan -------------------------------------------------------
    'crumb.home': 'Inicio',
    'crumb.label': 'Ruta de navegación',

    // --- galería ------------------------------------------------------------
    'gallery.allProjects': 'Todos los proyectos',
    'gallery.filterLabel': 'Filtrar proyectos por tipo',
    'gallery.viewer': 'Visor de fotos del proyecto',
    'gallery.close': 'Cerrar el visor de fotos',
    'gallery.next': 'Foto siguiente',
    'gallery.previous': 'Foto anterior',
    'gallery.videoUnsupported': 'Su navegador no puede reproducir este vídeo.',
    'gallery.downloadClip': 'Descargue el clip',
    'gallery.instead': 'en su lugar.',
    'gallery.category.pergolas': 'Pérgolas',
    'gallery.category.tikiHuts': 'Tiki Huts',
    'gallery.category.outdoorLiving': 'Espacios Exteriores',

    // --- formulario ---------------------------------------------------------
    'form.name': 'Nombre',
    'form.phone': 'Teléfono',
    'form.email': 'Correo electrónico',
    'form.city': 'Ciudad',
    'form.service': 'Servicio que necesita',
    'form.serviceChoose': 'Elija un servicio…',
    'form.servicePergola': 'Pérgola',
    'form.serviceTiki': 'Tiki Hut',
    'form.serviceOther': 'Otro proyecto exterior',
    'form.description': 'Descripción del proyecto',
    'form.submit': 'Solicitar mi presupuesto gratis',
    'form.privacy':
      'Sin compromiso. Sus datos se usan para preparar el presupuesto y para nada más.',
    'form.phonePlaceholder': '(786) 000-0000',
    'form.err.name': 'Díganos su nombre, por favor.',
    'form.err.phone': 'Escriba un teléfono donde podamos localizarle.',
    'form.err.email': 'Escriba un correo electrónico válido.',
    'form.err.city': 'Díganos en qué ciudad está el proyecto.',
    'form.err.service': 'Elija el tipo de proyecto.',
    'form.err.description': 'Describa el proyecto, aunque sea brevemente.',
    'form.status.sending': 'Enviando…',
    'form.status.sent':
      'Gracias — su solicitud va en camino. Nos pondremos en contacto en breve.',
    'form.status.failed':
      'Hubo un problema al enviar el formulario. Llámenos o escríbanos directamente y lo atendemos enseguida.',
    'form.status.noEndpoint':
      'Gracias — todo está correcto. Este formulario todavía no está conectado a un buzón, así que llámenos o escríbanos directamente y lo atendemos enseguida.',
    'form.ownerNote': 'Nota de configuración para el dueño del sitio:',
    'form.err.generic': 'Revise este campo, por favor.',
    'form.err.incomplete': 'Faltan algunos datos — están marcados arriba.',
    'form.preferToCall': '¿Prefiere llamar?',
    'form.descriptionPlaceholder':
      'Medidas aproximadas de la zona, si hay piscina o terraza ya construida, y para qué quiere usar el espacio.',
    'form.photosHint':
      'Las fotos ayudan mucho. Diga que las tiene y le indicaremos adónde enviarlas.',

    // --- pie de página ------------------------------------------------------
    'footer.label': 'Pie de página',
    'footer.company': 'Empresa',
    'footer.pergolas': 'Pérgolas',
    'footer.serviceAreas': 'Zonas de servicio',
    'footer.popularAreas': 'Zonas de servicio principales',
    'footer.allAreas': 'Todas las zonas del sur de Florida',
    'footer.about': 'Sobre nosotros',
    'footer.faq': 'Preguntas frecuentes',
    'footer.ourWork': 'Nuestro trabajo',
    'footer.licence': 'Licencia',
    'footer.serving': 'Damos servicio en Miami-Dade, Broward y los Cayos Altos',
    'footer.tagline':
      'Pérgolas a medida, tiki huts y estructuras exteriores construidas para los patios del sur de Florida — Miami-Dade, Broward y los Cayos Altos.',
    'footer.pergolasOverview': 'Pérgolas: visión general',
    'footer.customPergolas': 'Pérgolas a medida',
    'footer.aluminumPergolas': 'Pérgolas de aluminio',
    'footer.pergolaInstallation': 'Instalación de pérgolas',
    'footer.chickeeHuts': 'Chickee huts',
    'footer.outdoorStructures': 'Estructuras para exteriores',
    'footer.rights': 'Todos los derechos reservados.',
    'footer.woodPergolas': 'Pérgolas de madera',
    'footer.tikiOverview': 'Tiki huts: visión general',
    'footer.tikiConstruction': 'Construcción de tiki huts',
    'footer.pergolasIn': 'Pérgolas en',
    'footer.tikiHutsIn': 'Tiki huts en',

    // --- marcador de tiki huts ----------------------------------------------
    'tiki.meanwhile': 'Mientras tanto, la',
    'tiki.galleryLink': 'galería de pérgolas y espacios exteriores',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

/**
 * Returns a lookup function for one language. Falls back to English for a key that
 * has not been translated yet, so a missing string degrades to readable English
 * rather than to the raw key.
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    const table = ui[lang] as Record<string, string>;
    return table[key] ?? (ui.en as Record<string, string>)[key] ?? key;
  };
}
