# Machin Solutions — estado del proyecto

> **Si eres un agente y vas a trabajar en este proyecto: lee este archivo primero, entero,
> antes de tocar nada.** Contiene las decisiones ya tomadas, las reglas que no se pueden
> romper, y lo que falta. No re-derives nada de esto leyendo el código.

**Última actualización:** 8 de septiembre de 2026
**Último cambio funcional que describe:** `593449d` — sitio bilingüe completo
(inglés y español), más la dirección real del negocio.
**Estado general:** publicado y funcionando. Falta información del negocio, no código.

**Para saber si este archivo está desactualizado**, sin depender de un hash escrito a
mano:

```bash
git log --oneline "$(git log -1 --format=%H -- PROJECT_STATE.md)"..HEAD
```

Lista todo lo que se commiteó después de la última actualización de este archivo. Si
devuelve algo que no sea documentación, el archivo está viejo: léelo con cautela y
actualízalo al terminar tu tarea.

---

## 0. Para retomar — siguiente sesión

El sitio está **entero y verificado**, y es **bilingüe**: 21 páginas en inglés y las
mismas 21 en español. No hay nada roto ni a medias, así que no hace falta arreglar nada
antes de empezar: cualquier tarea nueva parte de una base limpia.

**Si añade o edita contenido, hágalo en los DOS idiomas.** Media página traducida es
peor que ninguna. Ver §15.

**Comprobación de 30 segundos antes de tocar nada:**

```bash
cd "C:\datos D\Demos\Machin Solutions"
git status                     # debe estar limpio y sincronizado con origin/main
npm run build && npm run audit  # debe decir "No problems found."
npm run dev                     # http://localhost:4321 para ver el estado real
```

**Lo más valioso que se puede hacer a continuación, por orden de impacto:**

1. **Conectar el formulario de contacto.** Hoy valida pero no envía, y lo dice
   honestamente. Es literalmente una línea: pon una URL de Formspree/Basin/Web3Forms en
   `formEndpoint` dentro de `src/config/site.ts`. Sin esto, quien no quiera llamar por
   teléfono no deja ningún dato. Es la única captación pasiva del sitio.
2. **Número de licencia** (`[LICENSE_NUMBER]`, 21 páginas). Señal de confianza que los
   competidores sí muestran, y además va al JSON-LD.
3. **Fotos de tiki huts** (`[TIKI_HUT_PHOTOS_NEEDED]`, 6 páginas). Ver §9 — es el hueco
   de contenido más grande del sitio.
4. **Política de permisos** (`[PERMIT_POLICY]`, 6 páginas). "¿Necesito permiso para una
   pérgola en Miami-Dade?" es tráfico con intención muy alta que hoy se está regalando.
   **No lo inventes** (§8): hace falta el dato real.
5. **Perfil de Google Business** en `site.profiles.googleBusiness`. Para búsquedas
   locales pesa más que todo el trabajo on-page junto.

Todos los demás placeholders están en §11.

**Tarea pendiente que se le debe al dueño:** la auditoría competitiva detallada
(§29 del encargo original) se hizo durante la construcción pero **no se guardó en disco**
antes de que el contexto se compactara, así que esos hallazgos se perdieron. Si el dueño
la pide, hay que rehacer la investigación y escribirla en `docs/competitive-audit.md`.
No la reconstruyas de memoria ni la inventes.

**Archivo suelto:** hay un `Estado Actual.docx` sin trackear en la carpeta del proyecto.
No lo puso el proceso de build. **No lo borres ni lo commitees** sin preguntar.

---

## 1. Dónde vive el proyecto

```
C:\datos D\Demos\Machin Solutions
```

**Y en ningún otro sitio.** No lo copies, no lo muevas, no crees una segunda copia en
`C:\Users\machi` ni en ningún otro lado. Fue un requisito explícito del encargo original.

Los originales de las fotos están en:

```
C:\datos D\Demos\Machin Solutions\Gallery
```

**Nunca modifiques ni borres nada de esa carpeta.** Es la única copia de las fotos sin
procesar. Está en `.gitignore` a propósito, así que no viaja al repositorio: si alguien
clona el repo en otra máquina, no tendrá los originales y **no podrá regenerar las
imágenes**. Las versiones optimizadas sí están commiteadas en `public/media/`.

---

## 2. En producción ahora mismo

| | |
|---|---|
| **Sitio en vivo** | https://machinsolutions.com |
| **Repositorio** | https://github.com/eldavi101/machin-solutions (público) |
| **Cuenta de GitHub** | `eldavi101` |
| **Hosting** | GitHub Pages, Source = GitHub Actions |
| **Dominio** | Registrado en GoDaddy, DNS ya apuntando a GitHub |
| **HTTPS** | Forzado, certificado Let's Encrypt (renovación automática) |
| **Despliegue** | Automático en cada push a `main` |

El DNS ya está cortado: 4 registros A (`185.199.108-111.153`) y 4 AAAA
(`2606:50c0:8000-8003::153`) en la zona autoritativa de GoDaddy, sin restos de la
página de parking anterior. `public/CNAME` contiene exactamente `machinsolutions.com`.

**`https://eldavi101.github.io/machin-solutions/` NO es una vista previa del sitio.**
El build está compilado para el dominio raíz (`base: '/'` en `astro.config.mjs`), así que
todas las rutas de CSS, imágenes y enlaces son relativas a la raíz y dan 404 bajo el
prefijo `/machin-solutions/`. Esto es intencionado: poner `base: '/machin-solutions/'`
rompería el sitio real. Para revisar en local, usa `npm run dev`.

### Reglas antes de tocar producción

El dueño exige aviso previo (una línea) y esperar autorización antes de: `git push`,
force-push, merges a `main`, crear o mergear PRs, cualquier deploy, y borrar o
sobrescribir archivos fuera del alcance de la tarea. **No cambies DNS nunca por tu
cuenta.** Ya hay autorización permanente concedida para el flujo de publicación de
*este* repositorio (crear/pushear/desplegar), pero no la extiendas a otros.

---

## 3. Stack y por qué

**Astro 5.18 con salida estática + sharp. Cero framework en el cliente.**

GitHub Pages sólo sirve archivos estáticos, y cada página de este sitio es contenido
conocido en tiempo de build. Enviar un runtime de React costaría ~40 KB de JS para
renderizar texto que ya se conocía. El único JS del sitio está escrito a mano, ~4 KB en
total: menú móvil, filtro de la galería, lightbox y validación del formulario.

Configuración que importa (`astro.config.mjs`):

- `site: 'https://machinsolutions.com'`, `base: '/'` ← ver §2, es carga estructural
- `trailingSlash: 'always'` + `build.format: 'directory'` → `/pergolas/` sirve `pergolas/index.html`
- `compressHTML`, `inlineStylesheets: 'auto'`
- `@astrojs/sitemap` con `filter` (excluye /404) y `serialize` (niveles de prioridad)

---

## 4. Comandos

```bash
npm run dev      # servidor local en http://localhost:4321 — úsalo para revisar
npm run build    # compila a dist/
npm run audit    # AUDITORÍA DEL BUILD — corre después de cada build (ver §7)
npm run seo      # regenera docs/seo-audit.md (mapa de keywords + canibalización)
npm run media    # regenera public/media/ desde Gallery/ — necesita ffmpeg (ver §9)
npm run brand    # regenera la imagen OG, el favicon y los iconos
```

`npm run media` y `npm run brand` **sólo se ejecutan cuando cambian las fotos o la
marca**. No los corras por rutina: reescriben archivos binarios ya commiteados.

---

## 5. Estructura

```
src/
  config/site.ts        ← FUENTE ÚNICA de todos los datos del negocio (ver §6)
  i18n/
    index.ts            ← idiomas, rutas y localizePath (ver §15)
    ui.ts               ← cadenas de interfaz en los dos idiomas
    content.ts          ← prosa que vive dentro de componentes (value props, proceso)
    routes.ts           ← qué páginas existen ya en español, leído del sistema de archivos
  data/
    media.json          ← manifiesto de la galería: qué foto, qué proyecto, qué categoría
    areas.ts            ← 20 ciudades; 4 con página propia (landing: true)
    faqs.ts             ← generalFaqs, pergolaFaqs, tikiFaqs, galleryFaqs,
                          contactFaqs, siteFaqs
    faqs.es.ts          ← las mismas 33 preguntas en español, mismos placeholders
  lib/
    media.ts            ← acceso tipado al manifiesto generado
    schema.ts           ← constructores de JSON-LD (ver §8, tiene una regla dura)
  layouts/BaseLayout.astro
  components/           ← 16 componentes (Header, Footer, Hero, Gallery, QuoteForm,
                          StickyCta, Faq, TikiPlaceholder, …)
  pages/                ← 21 páginas en inglés
    es/                 ← las mismas 21 en español, misma estructura de carpetas
scripts/
  process-media.mjs     ← Gallery/ → public/media/ (AVIF+WebP+JPEG, vídeo, pósters)
  check-build.mjs       ← la auditoría (§7)
  seo-map.mjs           ← genera docs/seo-audit.md
  make-brand-assets.mjs
public/
  CNAME                 ← machinsolutions.com, exactamente
  media/                ← derivadas optimizadas, SÍ commiteadas (22 MB)
  robots.txt, site.webmanifest, favicon.svg, og/, iconos
docs/seo-audit.md       ← generado, no lo edites a mano
.github/workflows/deploy.yml
```

### Las 21 páginas

`/` · `/pergolas/` + `custom` `aluminum` `wood` `installation` · `/tiki-huts/` +
`chickee-huts` `construction` · `/outdoor-living/` · `/gallery/` · `/service-areas/` ·
`/about/` · `/faq/` · `/contact/` · `/miami-pergolas/` `/homestead-pergolas/`
`/kendall-pergolas/` `/hialeah-pergolas/` · `/miami-tiki-huts/` · `/404`

**No crees decenas de páginas de ciudad casi idénticas.** Hay 20 ciudades listadas y
enlazadas; sólo 4 tienen página propia porque sólo esas 4 tenían contenido realmente
distinto que aportar (exposición al sol, aire salino, acceso al terreno, arbolado).
Una página nueva de ciudad necesita contenido propio o no debe existir.

---

## 6. Datos del negocio — `src/config/site.ts`

**Todo dato del negocio vive aquí y sólo aquí.** Cambiarlo aquí lo actualiza en las 21
páginas, el header, el footer, los CTA, el JSON-LD y las etiquetas Open Graph. Si te
piden cambiar un teléfono, un correo o una URL de perfil, se toca este archivo, no las
páginas.

### Cómo funcionan los placeholders

Cualquier valor con el formato `[MAYUSCULAS_ENTRE_CORCHETES]` es un dato **no verificado
todavía**. El sistema los degrada con elegancia:

- `real(valor)` devuelve `null` si sigue siendo un placeholder
- `callHref()` apunta a `/contact/` en vez de generar un `tel:` roto
- El JSON-LD **omite** el campo entero en vez de publicar un dato inventado
- En la página se ve un chip `.placeholder-token` visible para el desarrollador

### Trampa: `phone` vs `phoneDisplay`

- `site.phone` = `+17869926153` → forma marcable, **sólo** para enlaces `tel:` y JSON-LD
- `site.phoneDisplay` = `(786) 992-6153` → lo que lee el visitante

**Para mostrar el número en pantalla usa siempre `phoneLabel()`, nunca `site.phone`.**
Este bug ya ocurrió una vez: `phoneDisplay` estaba declarado pero ningún componente lo
consumía, y los 8 sitios de visualización renderizaban `site.phone` directamente. Lo
mismo aplica a `phoneAltLabel()` para el número secundario.

### Datos reales actuales

| Campo | Valor |
|---|---|
| Teléfono principal | (786) 992-6153 |
| Teléfono secundario | (786) 775-0816 |
| Email principal | machindavid2@gmail.com |
| Email secundario | machinfarms@gmail.com |

Los secundarios aparecen **sólo en el footer y en `/contact/`**. El header, el hero y el
CTA fijo del móvil llevan un solo número a propósito: dos números en un botón de llamada
fijo lo convierten en un peor botón de llamada.

### Formulario de contacto

`formEndpoint: null`. **GitHub Pages no tiene backend, y está prohibido inventarse un
endpoint.** El formulario valida de verdad, pero al enviar dice honestamente que todavía
no está conectado a un buzón y pide que llamen o escriban. Para activarlo: pon una URL de
Formspree, Basin, Web3Forms o un Cloudflare Worker en `formEndpoint` y empieza a enviar
solo. No hay nada más que cambiar.

---

## 7. La auditoría del build — `npm run audit`

Lee `dist/` y **falla el despliegue** si encuentra: enlaces internos rotos, referencias a
imágenes/vídeos/iconos sin archivo detrás, títulos o descripciones o canonicals faltantes
o duplicados, cero o más de un `<h1>`, falta de og:image / twitter:card / lang, JSON-LD
inválido, URLs dentro del JSON-LD que no resuelven, `<img>` sin alt o sin width/height,
restos de `localhost` / `example.com` / `lorem ipsum` / `TODO` / `FIXME`, CNAME ausente o
con contenido incorrecto, robots.txt / 404.html / sitemap ausentes, y URLs del sitemap sin
página detrás.

Corre **dentro del workflow de GitHub Actions**, así que una auditoría fallida impide el
despliegue. Estado actual: 913 enlaces, 947 assets, 230 URLs de JSON-LD, 65 bloques de
schema, 20 URLs de sitemap — **todo resuelve, sin problemas**.

También imprime la lista de placeholders pendientes y en qué páginas están. Es la forma
más rápida de saber qué falta.

> La comprobación de URLs dentro del JSON-LD se añadió después de encontrar que los 11
> `ImageObject` de `/gallery/` apuntaban a un `-480.jpg` que ya no existía (había quedado
> hardcodeado tras cambiar la escalera de anchos). No se veía en la página ni en la
> consola: sólo lo habría visto un crawler. Por eso existe esa comprobación.

---

## 8. SEO y datos estructurados

### Regla dura, no negociable

**Nunca inventes ni permitas que se inventen:** valoraciones, reseñas, `aggregateRating`,
años de experiencia, número de clientes, direcciones, teléfonos, números de licencia,
certificaciones, garantías, premios ni fechas de fundación.

Si el dato no está verificado: se deja como placeholder y se **omite** del JSON-LD. No hay
ni un `Review` ni un `AggregateRating` en todo el sitio, y eso es deliberado — un rating
inventado es a la vez un problema de políticas de Google y una mentira sobre el negocio.
`src/lib/schema.ts` lleva esta regla escrita en su cabecera. **No la relajes aunque el
resultado se vea más vacío.**

Lo mismo con las afirmaciones legales: **no hagas afirmaciones sobre permisos, licencias
o normativa que no estén verificadas.** Por eso `[PERMIT_POLICY]` sigue siendo un
placeholder en 6 páginas en vez de una respuesta inventada.

### Schemas implementados

`HomeAndConstructionBusiness` + `GeneralContractor`, `WebSite`, `WebPage`, `Service` +
`OfferCatalog`, `FAQPage`, `ImageGallery`, `ImageObject`, `VideoObject`,
`BreadcrumbList` — con referencias cruzadas por `@id`.

### Keywords y canibalización

El mapa completo está en `docs/seo-audit.md` (generado por `npm run seo`): URL, Title,
Meta Description, H1, keyword principal, intención de búsqueda y esquema de H2 por página.

**Estado: 0 conflictos de canibalización.** Llegar ahí costó trabajo — la home competía
con los dos hubs de servicio, y las tres páginas de tiki competían entre sí. Se arregló
re-apuntando keywords, no borrando páginas. Quedan 6 advertencias, todas revisadas y
aceptadas como estructura padre/hijo intencionada (documentadas en el propio informe).

**Si añades una página, corre `npm run seo` y revisa la sección de canibalización.**

---

## 9. Fotos y vídeo

`src/data/media.json` es la fuente de la verdad: define qué archivo de `Gallery/`
corresponde a qué proyecto, su categoría (`pergolas` / `tiki-huts` / `outdoor-living`), su
texto alternativo y su orientación. `npm run media` lo lee y genera las derivadas.

- **8 proyectos, 11 imágenes, 2 vídeos.** De las 20 originales se descartaron 7
  duplicados de baja resolución en vez de mostrar la misma pérgola seis veces.
- Cada imagen: AVIF + WebP + JPEG en hasta 6 anchos (**400 / 560 / 760 / 1000 / 1280 /
  1600**; los retratos se cortan en 1280). Nunca se genera un ancho mayor que el original.
- Vídeo: H.264 CRF 28 con `+faststart`, póster WebP, `preload="none"`.
- Nombres SEO (`custom-pergola-miami-01.webp`, no `IMG_3928.jpg`), `width`/`height`
  explícitos en el HTML → **CLS 0**.

### Trampa de ffmpeg

`scripts/process-media.mjs` busca `ffmpeg` en el PATH y, si no lo encuentra, prueba
`D:\Installed programs\ffmpeg.exe`, **que es la ruta de la máquina donde se construyó
esto y no existirá en ninguna otra**. Sin ffmpeg el script procesa las fotos pero avisa
`! ffmpeg unavailable, skipped:` y **no genera ni MP4 ni pósters**. Sólo afecta a
regenerar medios; un `npm run build` normal nunca necesita ffmpeg porque `public/media/`
está commiteado.

### El hueco de las fotos de tiki hut — importante

**Las 20 fotos originales son pérgolas, cabañas y cocinas exteriores. No hay ni una sola
foto de un tiki hut o chickee hut.**

Las páginas de tiki huts están escritas completas y con contenido real, pero se ilustran
con un dibujo SVG (`src/components/TikiPlaceholder.astro`) y un marcador
`[TIKI_HUT_PHOTOS_NEEDED]` bien visible. **Ninguna foto de pérgola aparece en un contexto
de tiki hut**, ni en las imágenes OG ni en el schema.

**No etiquetes una pérgola como tiki hut para rellenar el hueco.** Si no puedes
determinar de forma fiable qué es una foto, no inventes la información. El procedimiento
para sustituir el dibujo por fotos reales está en el README.

---

## 10. Rendimiento y accesibilidad

Medido con Lighthouse 12 CLI, preset móvil, contra el build de producción:

| Página | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| Home | 99–100 | 100 | 100 | 100 |
| Pergolas | 99–100 | 100 | 100 | 100 |
| Gallery | 100 | 100 | 100 | 100 |
| Tiki Huts | 100 | 100 | 100 | 100 |
| Contact | 100 | 100 | 100 | 100 |
| Miami Pergolas | 100 | 100 | 100 | 100 |

LCP 0,9–1,8 s · **CLS 0** · TBT 0 ms · home 15,1 KB comprimido.

Verificado también en navegador real: **sin scroll horizontal** en 375, 390, 430, 768,
1024, 1280, 1440 y 1920 px en las 21 páginas; sin errores de consola; sin saltos de nivel
de encabezado; sin fallos de contraste.

Accesibilidad WCAG 2.2 AA: skip link, landmarks, un solo `<h1>` por página,
`:focus-visible`, errores de formulario con `aria-invalid`/`aria-describedby`,
`aria-current`, `aria-pressed`, `prefers-reduced-motion`, contraste 4.5:1 verificado.

### Trampas ya resueltas — no las reintroduzcas

- **`define:vars` en un `<script type="application/json">` rompe el JSON.** Astro envuelve
  la salida en un IIFE y corrompe el payload. Esto mató el lightbox *y* el filtro de la
  galería a la vez, sin que se notara nada hasta hacer clic. El índice del lightbox viaja
  como JSON inerte (`is:inline` + `set:html`), no con `define:vars`.
- **El `srcset` de la galería se hornea desde el manifiesto, no se arma en el navegador.**
  No todas las fotos tienen derivada de 1440 px (una original pequeña se corta en su ancho
  nativo), así que adivinar anchos en cliente daría 404.
- **La paleta de color ya está ajustada para WCAG AA.** `--teak-500: #95592b`,
  `--teak-600: #7f4c22`, `--ink-faint: #696d66` y las etiquetas del footer en `#8f938b`
  son valores calculados, no elegidos a ojo. Si los aclaras, rompes el contraste.
- **El chip `.placeholder-token` es opaco y con color propio a propósito** (12,8:1). Si
  hereda el color del texto que lo rodea, falla el contraste dentro de las líneas
  atenuadas.
- **El enlace de marca del header no lleva `aria-label`.** El texto visible es su nombre
  accesible; un `aria-label` que no contenga el texto visible rompe WCAG 2.5.3.

---

## 11. Lo que falta — placeholders pendientes

Ninguno es un bug. Todos esperan datos reales del negocio.

| Placeholder | Páginas | Qué se necesita |
|---|---|---|
| `[LICENSE_NUMBER]` | 21 | Número de licencia de contratista |
| `[PERMIT_POLICY]` | 6 | Cómo gestiona la empresa los permisos |
| `[TIKI_HUT_PHOTOS_NEEDED]` | 6 | Fotos de tiki huts terminados |
| `[LEAD_TIME]` | 3 | Plazo real de entrega |
| `[FIRE_RETARDANT_POLICY]` | 2 | Tratamiento ignífugo del techo de palma |
| `[THATCH_LIFESPAN]` | 2 | Vida útil real del techo |
| `[TIKI_SERVICE_SCOPE]` | 2 | Alcance exacto del servicio de tiki huts |
| `[GOOGLE_BUSINESS_PROFILE]` | 2 | URL del perfil de Google Business |
| `[BUSINESS_ADDRESS]` | 1 | Dirección física |
| `[ESTIMATE_POLICY]` | 1 | Política de presupuestos |
| `[FINANCING]` | 1 | Opciones de financiación |
| `[INSURANCE_DETAILS]` | 1 | Seguro y cobertura |
| `[WARRANTY_TERMS]` | 1 | Términos de la garantía |
| `[YEARS_IN_BUSINESS]` | 1 | Años de actividad |
| `[TESTIMONIAL_1]`, `[TESTIMONIAL_2]` | 1 | Testimonios reales de clientes |

También pendientes, fuera de los placeholders: `facebook` e `instagram` en
`site.profiles`, y `formEndpoint` para que el formulario envíe de verdad.

---

## 12. Flujo de trabajo para un cambio

1. Lee este archivo (ya lo estás haciendo).
2. `npm run dev` y mira el estado actual en el navegador antes de tocar nada.
3. Haz el cambio. Datos del negocio → `src/config/site.ts`. Contenido → la página.
   Fotos → `src/data/media.json` + `npm run media`.
4. `npm run build && npm run audit` — **la auditoría tiene que pasar limpia**.
5. Si añadiste o re-apuntaste una página: `npm run seo` y revisa la canibalización.
6. Commits lógicos y separados, no uno gigante.
7. **Avisa antes de hacer push** y espera. El push dispara el despliegue a producción.
8. Verifica en vivo. Si el dueño dice que no ve los cambios, comprueba primero la caché
   DNS de su router antes de suponer que algo falló (ver §13).
9. **Actualiza este archivo** con lo que cambió.

Configuración de git ya hecha en el repo: identidad local
`Machin Solutions <machindavid2@gmail.com>`, y el helper de credenciales apunta a la CLI
de GitHub (`gh auth git-credential`) porque la credencial guardada de GitHub Desktop
estaba caducada y bloqueaba los push.

---

## 13. Cosas que parecen errores y no lo son

- **"DNS Check in Progress" en la configuración de Pages.** GitHub relanza la
  comprobación cada vez que se toca la configuración, incluido marcar *Enforce HTTPS*.
  Lo que importa es que el certificado esté emitido y `https_enforced: true`.
- **El dueño ve la página vieja de GoDaddy.** Es la caché DNS de su router
  (`192.168.1.254`), no el sitio. Comprueba con
  `curl --resolve machinsolutions.com:443:185.199.108.153 https://machinsolutions.com/`
  y con `nslookup machinsolutions.com 8.8.8.8` antes de tocar nada.
- **`eldavi101.github.io/machin-solutions/` se ve roto.** Es esperado, ver §2.
- **Imágenes que parecen "rotas" al inspeccionar el DOM.** Son lazy y aún no han cargado;
  desplázate al final y vuelve a comprobar.
- **Un `git push` rechazado por "fetch first".** Ya pasó una vez: al fijar el dominio
  personalizado por API, **GitHub creó por su cuenta un commit `Create CNAME`** en la
  raíz del repositorio. No es un conflicto real — su contenido coincide con
  `public/CNAME`. Se resuelve con `git pull --rebase origin main`, reconstruir, volver a
  auditar y pushear. **Nunca con force-push:** ese commit es legítimo y borrarlo puede
  romper la configuración del dominio.
- **Hay un `CNAME` en la raíz *y* un `public/CNAME`.** No es duplicado por error. El que
  se despliega es `public/CNAME`, que el build copia a `dist/CNAME`; el de la raíz lo
  puso GitHub. Deja los dos con el mismo contenido y no toques ninguno.

---

## 14. Historial resumido

21 commits. Los que explican decisiones vivas:

- `94bda58` inicialización · `3f80e50` páginas de pérgolas · `a918fbd` tiki huts, outdoor
  living, galería y ciudades
- `33d8498` despliegue en Pages y auditoría del build
- `21c92ae` accesibilidad y responsive encontrados en QA con navegador real
- `31eff13` rendimiento tras Lighthouse: fuentes, escalera de imágenes, pósters de vídeo
- `c182b01` contraste del chip de placeholder y escalera de anchos más fina
- `2d15cb8` generador de auditoría SEO y re-apuntado de 4 páginas
- `302aad8` **thumbnails del JSON-LD apuntaban a un ancho retirado** (ver §7)
- `243c4d5` estado real del dominio y qué NO es la URL de proyecto
- `892a936` actualización de las actions a majors sobre Node 24
- `c99f7ce` `Create CNAME` — **commit creado por GitHub, no por nosotros** (ver §13)
- `6b92372` **teléfonos y correos reales** (ver §6)
- `032cde8` `PROJECT_STATE.md` y `CLAUDE.md` como punto de entrada
- `cf09d2d` **dirección real del negocio** (30760 SW 212 Ave, Homestead)
- `cc4c3b5` infraestructura bilingüe (ver §15)
- `635e8cd` componentes y auditoría bilingües
- `593449d` **las 21 páginas en español**

Los dos últimos se rebasearon sobre el commit de GitHub, así que sus hashes cambiaron
respecto a los originales locales. El contenido es el mismo.

---

## 15. El sitio es bilingüe

**Inglés en la raíz (`/pergolas/`), español bajo `/es/` (`/es/pergolas/`).** El inglés es
el idioma por defecto y sus URLs no cambiaron: ya estaban indexadas.

### Los slugs NO se traducen, y es deliberado

`/es/pergolas/`, no `/es/pergolas-a-medida/`. Razones, por orden de peso:

1. **El hreflang correcto es lo que de verdad posiciona un sitio bilingüe**, y hay que
   mantenerlo exacto en las 21 parejas. Con slugs en inglés el mapeo es mecánico
   (`/x/` ↔ `/es/x/`); con slugs traducidos es una tabla a mano que se desincroniza en
   cuanto alguien añade una página.
2. La auditoría resuelve enlaces por ruta. Un mapa de slugs obligaría a un helper en cada
   enlace interno, y el que se olvide es un 404.
3. Los términos principales — *pergola*, *tiki hut*, *chickee* — son los mismos en el
   español de Miami. Los únicos slugs que ganarían algo (`/galeria/`, `/contacto/`) están
   en las páginas de menos valor.

Si algún día se quieren slugs bonitos en español, se añaden como **capa de
redirecciones** sobre un sitio que ya funciona. No se rehace el enrutado.

### Cómo está montado

- **`src/i18n/index.ts`** — `localizePath(ruta, idioma)`, `stripLang`, `alternates`.
  Todo enlace interno de un componente pasa por `localizePath`.
- **`src/i18n/ui.ts`** — cadenas de interfaz (navegación, botones, formulario, pie).
  `useTranslations(lang)` devuelve `t(clave)`, con respaldo al inglés si falta una clave.
- **`src/i18n/content.ts`** — la prosa que vive dentro de componentes: los seis value
  props, los cinco pasos del proceso y sus encabezados.
- **`src/i18n/routes.ts`** — deriva del sistema de archivos qué páginas existen en
  español. El conmutador y el hreflang solo se dibujan donde hay contraparte, así que el
  repo queda desplegable aunque falte una traducción.
- **`src/data/faqs.es.ts`** — las FAQs en español, con los **mismos** tokens
  `[PLACEHOLDER]` que el inglés.
- **`src/data/areas.ts`** — cada ciudad tiene `note` y `noteEs`.

### Reglas

- **Los componentes reciben `lang` como prop y NUNCA lo deducen de la URL.** Esa regla
  duplicada en dieciséis archivos es como se pudre un i18n.
- **Si añade una página, añádala en los dos idiomas.** Si de verdad no puede, el
  conmutador simplemente no aparecerá en ella — el sitio no se rompe — pero dígalo.
- **Si edita copy en un idioma, edítelo en el otro.** No hay detector automático de
  divergencia de contenido, solo de cadenas de interfaz olvidadas.
- **Los bloques `<style>` de las páginas españolas se copian del original inglés**, no se
  escriben a mano. Son traducciones de la copia, no rediseños.
- **Las páginas `noindex` no llevan hreflang ni conmutador.** GitHub Pages sirve la 404
  para cualquier ruta inexistente, así que `/404/` no es una dirección real.

### Qué vigila la auditoría

`npm run audit` falla si: `<html lang>` u `og:locale` no cuadran con el árbol, un
hreflang apunta a una página que no existe, un hreflang es unilateral (Google ignora los
pares no confirmados), falta `x-default`, o aparece una cadena inglesa de alta frecuencia
en una página `/es/` — esto último caza el componente al que se olvidó pasarle `lang`.

Estado actual: **21 páginas en cada idioma, 120 enlaces hreflang recíprocos, 40 URLs de
sitemap, sin problemas.** Lighthouse mide idéntico en las dos ramas (98/98).
