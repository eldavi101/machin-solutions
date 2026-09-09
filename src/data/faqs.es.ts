/**
 * FAQ content in Spanish.
 *
 * Same shape and the same rules as `faqs.ts`: every answer is written to be genuinely
 * useful to someone deciding whether to build, and where an answer would depend on
 * business facts that have not been verified (permits, warranty, lead times, financing)
 * it says so and leaves the SAME [PLACEHOLDER] token as the English version — so
 * filling one in tells you to fill in the other, and `npm run audit` counts both.
 *
 * Written for a South Florida reader, not translated word for word: "presupuesto"
 * rather than "estimado", "visita técnica" rather than "visita al sitio", "permisos"
 * rather than "permisas". Nothing here claims anything the English does not.
 */

import type { Faq } from './faqs';

/** Home page — broad, high-intent questions across both services. */
export const generalFaqsEs: Faq[] = [
  {
    question: '¿Qué construye Machin Solutions?',
    answer:
      'Pérgolas a medida, tiki huts y estructuras exteriores para viviendas de Miami y del sur de Florida: pérgolas exentas y adosadas, cabañas junto a la piscina, cubiertas para cocinas exteriores y tiki huts y chickee huts tradicionales de techo de palma. Cada estructura se dibuja para el patio concreto en el que va, no se elige de un catálogo de medidas estándar.',
  },
  {
    question: '¿Cuánto cuesta una pérgola o un tiki hut en el sur de Florida?',
    answer:
      'El precio lo marcan la luz que hay que salvar, la altura, el material y lo que va integrado en la estructura. Una pérgola compacta de dos postes sobre una parrilla está en un extremo; una estructura ancha en voladizo con techo aislado, iluminación, ventiladores, pared para televisor y cocina exterior completa está en el otro. La respuesta honesta es que una cifra dada antes de ver el patio es una suposición. Mande fotos y medidas aproximadas por el formulario y recibirá una cifra real para su proyecto.',
  },
  {
    question: '¿Necesito permiso para una pérgola o un tiki hut?',
    answer:
      'Los permisos los fija el departamento de edificación de su ciudad o condado, y lo que exigen depende de la estructura: tamaño, altura, si va adosada a la casa, cómo se ancla y dónde se sitúa en la parcela. Los requisitos no son iguales en Miami-Dade, Broward y el condado de Monroe. [PERMIT_POLICY] — indique aquí si Machin Solutions tramita el permiso, trabaja junto al permiso que usted saque, o le remite a un gestor.',
  },
  {
    question: '¿Cuánto tarda un proyecto desde la primera llamada hasta la estructura terminada?',
    answer:
      'La obra en sí suele ser la parte más corta. La mayor parte del calendario se va en revisiones de diseño, planos de ingeniería cuando hacen falta, la revisión del permiso en el departamento de edificación y los plazos de fabricación del aluminio a medida. [LEAD_TIME] — añada aquí plazos reales cuando los tenga.',
  },
  {
    question: '¿En qué zonas trabajan?',
    answer:
      'Los condados de Miami-Dade y Broward, más los Cayos Altos: Miami, Homestead, Kendall, Hialeah, Doral, Coral Gables, Cutler Bay, Palmetto Bay, Pinecrest, Fort Lauderdale, Pembroke Pines, Hollywood y las ciudades de alrededor. Si está justo fuera de esa zona, pregunte igualmente.',
  },
  {
    question: '¿Pueden trabajar alrededor de una piscina, terraza o cerramiento ya existentes?',
    answer:
      'Sí — la mayor parte del trabajo es exactamente eso. Las cimentaciones se sitúan esquivando el vaso de la piscina, las tuberías y los desagües de la terraza; las estructuras adosadas se enlazan con la línea del tejado existente; y las exentas se colocan de forma que libren el cerramiento en lugar de pelearse con él. Esa planificación se hace en la visita técnica, antes de pedir nada.',
  },
];

/** Pergolas hub. */
export const pergolaFaqsEs: Faq[] = [
  {
    question: '¿Aluminio o madera? ¿Qué va mejor en el sur de Florida?',
    answer:
      'Para la mayoría de los patios del sur de Florida, aluminio. No se pudre, no se alabea, no se raja ni alimenta a las termitas, aguanta el acabado de fábrica años de sol y aire salino, y pide lavado en vez de restauración. La madera sigue ganando en calidez y para acompañar a una casa antigua, y puede ser la opción correcta bajo una copa de árboles: simplemente pide un mantenimiento que el aluminio no.',
  },
  {
    question: '¿Qué diferencia hay entre una pérgola abierta y una cubierta de techo sólido?',
    answer:
      'Una pérgola abierta filtra la luz entre las viguetas o las lamas: da sombra y dibujo, pero la lluvia entra. Un techo sólido o aislado da sombra completa y mantiene el espacio seco, que es lo que hace viable una cocina exterior o un televisor montado. Muchas de las estructuras que construimos combinan las dos: parte sólida sobre los equipos, parte abierta sobre la zona de estar.',
  },
  {
    question: '¿Qué son las pérgolas de lamas orientables y merecen la pena?',
    answer:
      'Un techo de lamas tiene palas que giran, así que puede abrir el techo para luz y ventilación o cerrarlo para sombra y protección de lluvia. Merecen la pena donde el ángulo del sol cambia mucho a lo largo del día, o donde quiere que una sola estructura haga los dos trabajos. Cuestan más que un techo fijo y añaden piezas móviles, así que encajan en un espacio que se usa a diario más que de vez en cuando.',
  },
  {
    question: '¿Exenta o adosada a la casa?',
    answer:
      'Las adosadas prolongan la línea del tejado, se sienten parte de la casa y suelen necesitar menos superficie. Las exentas van donde de verdad hace falta la sombra —sobre la terraza de la piscina, al fondo del patio, alrededor de un brasero— y evitan del todo enlazar con el tejado y la cornisa existentes. Las terrazas de piscina en las que más trabajamos acaban siendo exentas por esa misma razón.',
  },
  {
    question: '¿Se pueden añadir iluminación, ventiladores, televisor o altavoces?',
    answer:
      'Sí, y sale mucho más limpio si se planifican desde el principio. Los focos empotrados, los ventiladores de techo, los televisores de pared y los altavoces necesitan tubo, refuerzos y puntos de fijación proyectados dentro de la estructura, no atornillados por fuera después. La mayoría de los proyectos de nuestra galería se construyeron así.',
  },
  {
    question: '¿Cómo se ancla una pérgola para que aguante un temporal?',
    answer:
      'Por las cimentaciones y las uniones, no por los postes. Una estructura que aguanta tiene zapatas de hormigón bien dimensionadas, herrajes de anclaje homologados para las cargas y uniones viga-poste que transmiten la succión en lugar de solo apoyar peso sobre un poste. Para comprobar eso existen precisamente los planos de ingeniería y la revisión del permiso.',
  },
];

/** Tiki huts hub. */
export const tikiFaqsEs: Faq[] = [
  {
    question: '¿Qué diferencia hay entre un tiki hut y un chickee hut?',
    answer:
      'Describen el mismo tipo de estructura y en el sur de Florida las palabras se usan indistintamente. "Chickee" es el término seminola y miccosukee del refugio de techo de palma y lados abiertos del que viene la forma: una estructura elevada, sin paredes, con un techo de palma muy inclinado que evacúa el agua y se mantiene fresco por debajo. "Tiki hut" es el nombre que esa misma estructura adoptó comercialmente.',
  },
  {
    question: '¿De qué están hechos realmente los tiki huts?',
    answer:
      'Tradicionalmente, una estructura de ciprés o madera tratada que sostiene un techo de hojas de palma sabal, colocadas en capas gruesas y con mucha pendiente para que el agua corra por fuera y el interior se mantenga seco y en sombra. También existe la palma sintética, que dura más y pide menos mantenimiento, a costa de parte del carácter.',
  },
  {
    question: '¿Cuánto dura un techo de palma y se puede rehacer?',
    answer:
      'La palma natural es una superficie de desgaste: se curte, se adelgaza y acaba necesitando reposición, y la velocidad depende de la exposición al sol, la lluvia, la cobertura de árboles y de cómo se construyó el techo. Rehacer el techo es parte normal de tener uno: la estructura se queda, el techo se renueva. [THATCH_LIFESPAN] — añada la duración y el intervalo de reposición que esté dispuesto a sostener.',
  },
  {
    question: '¿Es buena idea un tiki hut junto a la piscina?',
    answer:
      'Es de los mejores usos que tienen. Un techo de palma con los lados abiertos da sombra profunda sin cortar la brisa, que es justo lo que se quiere junto a una piscina en julio, y la estructura se lee como un destino dentro del patio y no como una prolongación de la casa.',
  },
  {
    question: '¿Los tiki huts necesitan permiso?',
    answer:
      'Depende de su departamento de edificación, del tamaño y la altura de la estructura y de cómo se ancle, y las normas no son iguales en Miami-Dade, Broward y el condado de Monroe. Algunas administraciones tratan ciertas estructuras chickee tradicionales de forma distinta a otras construcciones auxiliares. No tome como respuesta una respuesta general de una página web: [PERMIT_POLICY] — indique cómo lo gestiona Machin Solutions.',
  },
  {
    question: '¿Reparan o rehacen el techo de un hut que no construyeron ustedes?',
    answer:
      '[TIKI_SERVICE_SCOPE] — confirme aquí si se ofrecen reparación, reposición de palma y mantenimiento de huts existentes, y qué límites hay sobre lo que se puede intervenir.',
  },
];

/** Gallery page. */
export const galleryFaqsEs: Faq[] = [
  {
    question: '¿Estas fotografías son de sus propios proyectos?',
    answer:
      'Sí. Cada fotografía de esta web es una estructura construida por Machin Solutions, fotografiada en obra — varias de ellas a media instalación, con escaleras incluidas. No hay fotos de banco de imágenes ni renders presentados como trabajo terminado.',
  },
  {
    question: '¿Puedo tener la misma estructura que uno de estos proyectos?',
    answer:
      'Muy parecida, adaptada a su patio. Las luces, la posición de los postes, el tipo de techo y los acabados cambian con el espacio y con el uso que le vaya a dar. Señale en el formulario el proyecto que le gusta y cuente qué tiene de distinto su patio: es un punto de partida mucho mejor que una página en blanco.',
  },
];

/** Contact page. */
export const contactFaqsEs: Faq[] = [
  {
    question: '¿Qué pasa después de enviar el formulario?',
    answer:
      'Alguien lo lee y le contesta para concertar una visita técnica: medir el espacio, comprobar los accesos, mirar dónde pueden ir las cimentaciones y cómo encajaría la estructura con la casa. El diseño y el presupuesto por escrito salen de esa visita.',
  },
  {
    question: '¿Qué conviene incluir para recibir una respuesta útil rápido?',
    answer:
      'Fotos del espacio desde dos o tres ángulos, medidas aproximadas de la zona que quiere cubrir, si hay piscina o terraza ya construida, y qué quiere hacer debajo: comer, cocina, estar, sombra sobre una zona de juegos. Con eso suele bastar para darle una dirección real en la primera respuesta.',
  },
  {
    question: '¿El presupuesto es gratis?',
    answer:
      '[ESTIMATE_POLICY] — indique aquí si los presupuestos y las visitas técnicas son gratuitos, y con qué condiciones.',
  },
];

/**
 * The /es/faq/ page.
 *
 * Same discipline as the English `siteFaqs`: it deliberately does NOT repeat the
 * questions already answered on the pergola, tiki hut, gallery or contact pages.
 * Duplicating them across URLs would put those pages in competition with each other
 * for the same queries — in Spanish exactly as in English.
 */
export const siteFaqsEs: Faq[] = [
  {
    question: '¿Qué determina de verdad el precio de una estructura exterior?',
    answer:
      'Cinco cosas, más o menos por orden. La luz: cuánto tiene que salvar el techo sin un poste debajo, que fija el canto de la viga y todo lo que viene después. El tipo de techo: un techo de viguetas abiertas, uno de lamas y uno sólido aislado son tres obras muy distintas. El tamaño y la altura. Lo que va integrado: iluminación, ventiladores, pared de televisor, pantallas, cocina exterior. Y las condiciones del terreno: acceso para los materiales, qué hay que atravesar para las cimentaciones y cómo se encuentra la estructura con la casa.',
  },
  {
    question: '¿Por qué nadie me da un precio por teléfono?',
    answer:
      'Porque los honestos no pueden. Dos estructuras de los mismos metros cuadrados pueden diferir muchísimo según la luz, el tipo de techo y lo que sostienen, y a menudo hay posiciones de poste descartadas por cosas que nadie ve en una foto: tuberías de la piscina, desagües, riego, retranqueos. Una cifra dada antes de la visita técnica es una suposición, y en este oficio las suposiciones suelen quedarse cortas a propósito.',
  },
  {
    question: '¿Aguantará un huracán una pérgola o un tiki hut?',
    answer:
      'Eso lo deciden las cimentaciones, los anclajes y las uniones, no el aspecto de la estructura. Una estructura bien calculada y con permiso tiene zapatas dimensionadas para las cargas reales —incluida la succión, que es la carga que importa con viento fuerte— y herrajes homologados para transmitir ese esfuerzo, no solo para cargar peso. Para comprobar exactamente esto existe la revisión del departamento de edificación. Nadie puede prometer con responsabilidad un resultado concreto en un temporal concreto, y conviene desconfiar de quien lo haga.',
  },
  {
    question: '¿Cuánto mantenimiento pide una estructura exterior?',
    answer:
      'Depende por completo del material. Una estructura de aluminio con acabado en polvo pide lavado y prácticamente nada más. Una de madera pide un ciclo real de limpieza, lijado y sellado, y con el tiempo sustituir alguna pieza. Un techo de palma natural es una superficie de desgaste que habrá que reponer en algún momento. Ninguna de las tres es un problema si se sabe de antemano.',
  },
  {
    question: '¿Me lo permitirá la asociación de vecinos?',
    answer:
      'Muchas HOA del sur de Florida revisan el diseño de cualquier cosa visible desde la calle o desde una propiedad vecina, y algunas tienen normas de color, altura y materiales. Conviene sacar las normas de su HOA antes de que el diseño avance mucho, porque un cambio pequeño hecho pronto es gratis y ese mismo cambio hecho tarde no lo es. Esa revisión es distinta y adicional a lo que exija el departamento de edificación.',
  },
  {
    question: '¿Pueden construir sobre una terraza de piscina o un cerramiento existente?',
    answer:
      'Normalmente sí — la mayor parte de nuestro trabajo es justo eso. Las cimentaciones se sitúan esquivando el vaso de la piscina, las tuberías y los desagües, y las estructuras se colocan de modo que libren el cerramiento en vez de pelearse con él. De vez en cuando la respuesta honesta es que la posición que usted quiere no está disponible y otra ligeramente distinta es mucho mejor. Eso se descubre en la visita técnica, no cuando ya han llegado los materiales.',
  },
  {
    question: '¿Cuál es la mejor época del año para construir en el sur de Florida?',
    answer:
      'La estación seca es más cómoda para el calendario: el hormigonado de las zapatas y el trabajo de palma la prefieren, y hay menos retrasos por lluvia. Dicho eso, la mayor parte del tiempo de un proyecto se va en diseño, revisión y fabricación más que en días de obra, así que lo práctico es empezar la conversación bastante antes de la temporada en la que quiere usar el espacio.',
  },
  {
    question: '¿Ofrecen financiación?',
    answer:
      '[FINANCING] — indique aquí si hay financiación disponible y a través de quién. No lo deje vago: es una de las preguntas más habituales en un proyecto de este tamaño.',
  },
  {
    question: '¿Hacen obra comercial?',
    answer:
      'Sí — restaurantes, resorts, marinas y espacios para eventos, tanto en estructuras modernas como en huts de palma. Los proyectos comerciales cambian las prioridades: luces mayores, uso más intenso, un plan de mantenimiento que importa desde el primer día, y requisitos de tratamiento ignífugo que es más probable que apliquen. Describa el emplazamiento y el uso y recibirá una respuesta clara sobre si somos las personas indicadas.',
  },
];
