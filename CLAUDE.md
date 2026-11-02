# Plantilla «Música y espectáculos» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **nocturno**
(cartel de gira: noche + magenta + amarillo, letra de cartel condensada enorme, datos en monoespaciada, fotos en
duotono magenta, cinta corrida, bandas de borde a borde). Todo en castellano de España, frases cortas, sin jerga.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…).
  - `primario` = magenta: bandas de color pleno (un espectáculo de cada dos, contratación, 404), sombra dura de los botones y el duotono de las fotos.
  - `acento` = amarillo: botones, cinta de la portada, pegatina de la próxima fecha, banda de prensa, días de las fechas y teléfono.
  - `fondo` + `texto` = tema oscuro por defecto. Si el cliente pide fondo claro, cambia esos dos y todo se recoloca (la banda «papel» sale de mezclar `texto` y `acento`).
  - Derivados en `src/styles/global.css`: `--noche`, `--negro`, `--papel`, `--sobre-acento`, `--sobre-primario`, `--resalte` y `--resalte-texto` (lo que resalta en cada banda).
- **Tipografías y aspecto general**: `src/styles/global.css` (`--fuente-titulos`: Impact, Haettenschweiler, Franklin Gothic Heavy, Roboto Condensed…; `--fuente-mono`: ui-monospace, Cascadia Mono, Consolas…; texto en system-ui). Bandas `.banda-oscura|noche|magenta|amarilla|papel`, `.trama` (puntos), `.duo` (duotono), `.hueco` (letra en contorno), `.sello` (estado), botones `.btn`/`.btn-sec`, cabecera `.cabecera--noche`, pie `.pie--noche`. Fuentes del sistema: no añadas fuentes externas.
- **Imágenes**: las fotos van en `public/fotos/` (lista y descripción en `fotos.json`); si una foto todavía no existe, `Imagen.astro` enseña su respaldo `public/placeholders/<mismo nombre>.svg`. En `site.yaml` se referencian con ruta absoluta (`/fotos/hero.jpg`). Fotos de personas: `/placeholders/persona.svg` (no se generan caras).
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = disco amarillo con la inicial + nombre.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie`. El pie enseña la próxima fecha (la primera de `fechas`) y `contacto.horario`.

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: pantalla completa, foto en duotono a sangre, `titulo` enorme (la última palabra en amarillo; mejor 3-5 palabras), `texto`, `cta`, `cta_secundario`, `items: [{titulo, icono}]` en la cinta corrida del pie y pegatina con la próxima fecha (sale sola de la sección `fechas`).
- `fechas` → `fechas.astro`: `fechas: [{fecha, lugar, ciudad, hora, estado, url}]`. `fecha` libre («14 nov 2026»): el número se pinta en grande. `estado`: «Últimas entradas» (magenta), «Agotado» (tachado, sin botón), «Entrada libre»… o vacío. `url` = venta de entradas (botón «Entradas», otra pestaña). `nota` y `cta` opcionales. Pon las fechas en orden: la primera es la «próxima».
- `espectaculos` → `espectaculos.astro`: `espectaculos: [{titulo, texto, duracion, formato, imagen}]` en filas 50/50 a sangre en zigzag. `cta` opcional.
- `banda` → `banda.astro`: `texto` (párrafos con línea en blanco), `imagen` a sangre y `personas: [{nombre, cargo, foto, texto}]` en cartel.
- `videos` → `videos.astro`: `items: [{titulo, texto, duracion, url, imagen}]`; `url` a YouTube/Vimeo (se abre fuera, no se incrusta). El primero va grande.
- `galeria` → `galeria.astro`: `galeria: [ruta…]` de borde a borde sin márgenes (con 6 o 9 fotos queda cerrada).
- `prensa` → `prensa.astro`: `testimonios: [{texto, autor, nota}]`; la primera enorme. No inventes opiniones.
- `contratacion` → `contratacion.astro`: `texto`, `items: [{titulo, texto}]` (pasos), `cta` (p. ej. WhatsApp), `tipos_evento` (cadena con «;») y `boton_formulario`; formulario con fecha, tipo de evento y lugar.
- `preguntas` → `preguntas.astro` (acordeón `details/summary`; sin preguntas no se pinta).
- `contacto` → `contacto.astro`: teléfono enorme, datos de `contacto` y formulario («Me interesa» con los espectáculos). `boton_formulario` opcional.
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen` 50/50 a sangre, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`.
3. **Cambiar textos, teléfonos, fechas, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas (las horas y las fechas, siempre: `hora: "22:30"`).
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios siempre como texto entre comillas. Máximo 24 elementos por lista. Las fechas pasadas se quitan de la lista.
5. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: fechas`, `tipo: videos`…) y su propio id. Si hace falta un diseño nuevo, crea `src/components/secciones/<id>.astro` con `seccion(Astro.props.id)` y una banda (`Seccion` con `banda=`). `src/pages/index.astro` la recoge sola: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Los ids `hero` y `contacto` son obligatorios. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base y salen solos de `site.yaml`. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida y respaldo), sin JavaScript nuevo salvo necesidad real, 16 px de margen lateral (`.contenedor`), bandas y fotos de borde a borde, sin scroll horizontal en móvil. Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
9. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.
10. Iconos: `src/components/ui/Icono.astro` (de música: `nota, microfono, altavoz, guitarra, entrada, play, disco, focos, mascara`; y `estrella, corazon, maletin, rayo, usuarios, reloj, mapa`…).

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `secciones.espectaculos.espectaculos` → `/espectaculos/<slug>/` (espectáculo).
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (precio, duración…) salen en la tabla de datos de la ficha.
- Una orden «añade una página para X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/espectaculos/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio/producto con precio si lo hay).
