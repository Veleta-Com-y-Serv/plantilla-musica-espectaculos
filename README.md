# Plantilla NoExpertise · Música y espectáculos

Web nocturna de cartel de gira para bandas, orquestas, DJ, teatro y salas: fechas, vídeos y contratación.

- Sectores: música, DJ, banda de música, orquesta, espectáculos, teatro, sala de conciertos. Estilo: nocturno. Plan mínimo: gratis.
- Secciones: hero, fechas, espectaculos, banda, videos, galeria, prensa, contratacion, preguntas, contacto (+ `texto` para apartados nuevos).
- Campos propios: `fechas[]` (fecha, lugar, ciudad, hora, estado, url), `espectaculos[]` (titulo, texto, duracion, formato, imagen), `videos.items[]` (titulo, texto, duracion, url, imagen), `contratacion.tipos_evento` (cadena con «;») y `boton_formulario`.
- A ancho completo: portada a pantalla completa con foto a sangre en duotono, cinta corrida y pegatina de la próxima fecha; fechas en filas de cartel de gira; espectáculos en zigzag 50/50 a sangre; banda sobre papel; galería de borde a borde; prensa sobre amarillo; contratación partida magenta / noche.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Contenido editable en `site.yaml`; metadatos en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Imágenes de relleno (`public/placeholders/`) hechas para esta plantilla, sin licencias de terceros.
