# Machin Solutions — instrucciones del proyecto

## Antes de nada: lee `PROJECT_STATE.md`

**Lee [`PROJECT_STATE.md`](./PROJECT_STATE.md) entero antes de hacer cualquier cambio.**
Contiene el estado actual, las decisiones ya tomadas y por qué, las trampas conocidas y
lo que falta. No re-derives nada de eso leyendo el código: ya está escrito, y varias de
las decisiones no son evidentes desde el código.

Empieza por su **§0 "Para retomar"**: dice en qué estado quedó todo, la comprobación de
30 segundos para confirmarlo, y qué conviene hacer a continuación por orden de impacto.

Al terminar cualquier cambio, **actualiza `PROJECT_STATE.md`** (la fecha, el commit que
describe, y lo que haya cambiado).

## Reglas que no se rompen

1. **No inventes datos del negocio.** Nunca añadas valoraciones, reseñas,
   `aggregateRating`, años de experiencia, número de clientes, direcciones, teléfonos,
   licencias, certificaciones, garantías, premios ni fecha de fundación que no estén
   verificados. Si el dato no está confirmado, se queda como placeholder
   `[ENTRE_CORCHETES]` y se **omite** del JSON-LD. No hay ni un `Review` ni un
   `AggregateRating` en el sitio y así debe seguir.

2. **No hagas afirmaciones legales o sobre permisos sin verificar.** Por eso
   `[PERMIT_POLICY]` sigue siendo un placeholder y no una respuesta inventada.

3. **No toques `Gallery/`.** Es la única copia de las fotos originales sin procesar.
   No modificar, no borrar, no mover.

4. **No etiquetes una pérgola como tiki hut.** No hay ni una foto de tiki hut en el
   material disponible. Si no puedes determinar de forma fiable qué muestra una foto, no
   inventes la información.

5. **El proyecto vive sólo en `C:\datos D\Demos\Machin Solutions`.** No crees copias.

6. **Avisa y espera antes de `git push`**, force-push, merges a `main`, crear o mergear
   PRs, y cualquier despliegue. El push dispara el despliegue a producción.
   **Nunca cambies DNS.**

7. **Datos del negocio → `src/config/site.ts`, nunca en las páginas.** Es la fuente única
   para las 21 páginas, header, footer, CTAs, JSON-LD y Open Graph. Para mostrar el
   teléfono en pantalla usa `phoneLabel()`, nunca `site.phone` (ese es sólo para `tel:`
   y JSON-LD).

8. **No inventes un endpoint para el formulario.** GitHub Pages no tiene backend.
   `formEndpoint: null` es deliberado.

## Antes de dar por terminado

```bash
npm run build && npm run audit   # la auditoría tiene que pasar limpia
npm run seo                      # sólo si añadiste o re-apuntaste una página
```

`npm run audit` falla ante enlaces rotos, assets ausentes, metadatos duplicados, JSON-LD
inválido o URLs de JSON-LD que no resuelven. Corre también en CI, así que una auditoría
fallida impide el despliegue.

Haz commits lógicos y separados, no uno gigante.

## Idioma

El sitio es para clientes de South Florida: **todo el contenido de cara al público va en
inglés**. La documentación interna (`PROJECT_STATE.md`, este archivo) va en español.
