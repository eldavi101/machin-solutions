# Machi — asistente local de navegación

Implementado el 12 de noviembre de 2026. El encargo incluye publicar los cambios junto con la auditoría SEO previa.

Machi es un personaje SVG original con animación CSS, integrado en todas las páginas y localizado en inglés/español. Guía a servicios, proyectos, zonas, factores de precio, plazos, requisitos y contacto. Las preguntas sugeridas y el campo de texto usan coincidencia local de intenciones y respuestas redactadas a partir del contenido del sitio.

**No es un modelo de IA generativa ni un chatbot conectado a un proveedor.** Esta decisión evita dependencias externas, descargas de modelos, backend, claves y costes de inferencia. El panel lo indica. No puede improvisar asesoramiento, recordar conversaciones entre páginas, cotizar ni concertar visitas. Las dudas desconocidas remiten al equipo.

La conversación solo existe en memoria de la pestaña y se limita a 21 bloques visibles. El asistente no usa cookies, almacenamiento, llamadas de red, analítica ni servicios externos. Esto se refiere al asistente: el sitio ya utiliza recursos externos para fuentes y el contador de visitas. No se transmite texto escrito ni se crea historial persistente.

Accesibilidad: botón nativo, diálogo modal nativo con cierre y Escape, foco en el campo al abrir, retorno de foco al cerrar, región de mensajes anunciada y movimiento desactivado con `prefers-reduced-motion`. El botón se sitúa por encima de la barra móvil existente mediante `--sticky-cta-height`. Sin JavaScript se oculta el lanzador y la navegación habitual permanece accesible.

Archivos:

- `src/components/SiteAssistant.astro`: personaje, panel, interacción y estilos.
- `src/lib/site-assistant.mjs`: contenido bilingüe y selección local de respuestas.
- `src/layouts/BaseLayout.astro`: integración común.
- `scripts/site-assistant.test.mjs`: pruebas de intención, acentos, comparación de materiales, entradas desconocidas/hostiles y rutas existentes en ambos idiomas.
- `scripts/assistant-browser-check.js`: evidencia reproducible de foco, enlaces, contenido, posición y recursos.
- `.github/workflows/deploy.yml`: ejecuta `npm test` después del build y auditoría.

Comprobaciones: `npm.cmd run build`, `npm.cmd run audit`, `npm.cmd test`, `git diff --check`, gstack en español móvil e inglés escritorio. Capturas y registros en `docs/assistant-evidence/`. No se inventan precios ni políticas del negocio. No se incluye el cambio previo ajeno a esta tarea de `Estado Actual.docx` en el commit.
