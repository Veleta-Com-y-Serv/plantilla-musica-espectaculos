# Música y espectáculos: brief de diseño

Plantilla `musica-espectaculos` creada el 29/10/2026 a partir de `gimnasio-deporte` con `php artisan plantillas:nueva` y
rediseñada entera a ancho completo. Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe
la plantilla.

## Brief

- **Para quién**: bandas de versiones, orquestas de verbena, grupos, DJ, compañías de teatro y espectáculos, salas de
  conciertos. Quien entra quiere saber cuándo y dónde tocan, ver y oír cómo suenan (vídeos, fotos, prensa) y, sobre
  todo, contratarlos para una boda, unas fiestas o un evento de empresa.
- **Qué tiene que conseguir la web**: que pida presupuesto con la fecha y el tipo de evento (formulario de
  contratación o WhatsApp). Secundario: comprar entradas de los conciertos (`url` de cada fecha) y llamar.
- **Tono y estilo** (`nocturno`): eléctrico, festivo, de cartel de gira. Sí: los carteles de concierto y las webs de
  festivales (letra condensada enorme, colores plenos, fechas en grande). No: la caja centrada con tarjetas blancas,
  el verde neón con franjas diagonales y botones inclinados de `gimnasio-deporte`, ni el negro con rojo oscuro y
  texturas de `tatuajes-barberia`.
- **Paleta de ejemplo**: primario `#e0218a` (magenta), acento `#ffd60a` (amarillo), fondo `#0b0710` (noche), texto
  `#f7f1f8`. Derivados con `color-mix` en `global.css`: `--noche` (noche teñida de magenta), `--negro` (pie),
  `--papel` (texto + un poco de acento: la banda clara), `--sobre-acento` y `--sobre-primario` (letra calculada con
  `oklch`), `--resalte` / `--resalte-texto` (lo que resalta en cada banda; en papel el magenta se oscurece para AA).
  Aguanta otros cuatro colores; con fondo claro y texto oscuro el papel pasa a oscuro.
- **Tipografía**: letra de cartel del sistema (Impact, Haettenschweiler, Franklin Gothic Heavy, Arial Narrow Bold,
  Roboto Condensed de respaldo) en mayúsculas, 900 sin negrita sintética: portada hasta 8,5 rem (3 rem en móvil),
  títulos de sección hasta 6,5 rem, nombre del pie hasta 15 rem en contorno magenta. Datos (fechas, horas,
  antetítulos, menú, etiquetas) en monoespaciada en mayúsculas con interletrado, como una entrada de concierto. Texto
  en system-ui.
- **Motivos propios**: duotono magenta en todas las fotos (gris multiplicado sobre el primario; a color al pasar);
  cinta amarilla corrida con los `items` de la portada (se para con «reducir movimiento»); pegatina redonda girada
  con la próxima fecha; números en contorno (`.hueco`) en los espectáculos y los pasos; botones de bloque con sombra
  dura magenta; trama de puntos en las bandas magenta; sellos de estado («Últimas entradas», «Agotado» tachado).
- **Ritmo de bandas** (todas de borde a borde, contenido a `max-width: 90rem`):
  portada a pantalla completa (foto a sangre + velo + cinta amarilla) → fechas (oscura, filas de gira) →
  espectáculos (noche; filas 50/50 a sangre, texto alterno magenta / oscuro) → banda (papel; 50/50 con foto a sangre
  y cartel de personas en 6 columnas) → vídeos (oscura con halo magenta; el primero grande) → galería (de borde a
  borde, sin márgenes) → prensa (amarilla, cita enorme) → contratación (50/50 magenta / noche con formulario) →
  preguntas (papel, titular fijo y acordeón) → contacto (oscura, teléfono enorme y formulario con sombra amarilla) →
  pie (negro, cuatro columnas y nombre gigante en contorno).
- **Responsive**: móvil primero. A 375 px todo en una columna con 16 px de margen del texto (fotos y fondos tocan el
  borde), fechas con el día a la izquierda y el botón debajo, filas foto/texto apiladas, galería a 2 columnas, menú
  plegable (`details`) con enlaces grandes. Desde 768 px las filas pasan a 50/50 a sangre y la galería a 3 columnas;
  desde 900 px las fechas van en una fila (día, lugar, hora, estado y botón) y la pegatina se pone a la derecha de la
  portada; desde 1024 px contratación partida y vídeos 2 + 1; desde 1100 px, menú completo en la cabecera.
- **Cabecera**: fija a todo el ancho; transparente sobre la portada y noche al hacer scroll (script pequeño en
  `Header.astro`); disco amarillo con la inicial, nombre en letra de cartel, menú en mono y botón amarillo.

## Apartados (en orden) y listas propias

1. `hero`: antetítulo, título, texto, foto, dos botones e `items` (titulo + icono) en la cinta.
2. `fechas`: `fechas` [{fecha, lugar, ciudad, hora, estado, url}], `nota`, `cta`.
3. `espectaculos`: `espectaculos` [{titulo, texto, duracion, formato, imagen}], `cta`.
4. `banda`: texto, `imagen`, `personas` [{nombre, cargo, foto, texto}].
5. `videos`: `items` [{titulo, texto, duracion, url, imagen}].
6. `galeria`: `galeria` (lista de rutas).
7. `prensa`: `testimonios` [{texto, autor, nota}].
8. `contratacion`: texto, `items` [{titulo, texto}] (pasos), `cta`, `tipos_evento`, `boton_formulario`.
9. `preguntas`: `preguntas` [{pregunta, respuesta}].
10. `contacto`: titular, vías de contacto de `site.yaml → contacto` y formulario.
11. `texto` (diseño genérico para apartados nuevos).

## Fotos

15 en `fotos.json`: portada (escenario en una plaza de noche con focos magenta y ámbar), cuatro espectáculos
(verbena en plaza, boda en finca, sala ochentera con neón, rincón acústico), la banda (vista desde el fondo del
escenario), tres miniaturas de vídeo y seis de galería (baquetas, micrófono, mesa de mezclas, guitarra, confeti,
sintetizador). Sin texto legible, sin logotipos y sin personas.

## Qué no hacer

- Volver a la caja centrada estrecha con tarjetas o al hero de la base.
- Quitar el duotono, la cinta o las fechas en grande: es lo que distingue la plantilla.
- Poner textos fijos en los componentes o inventar precios, fechas, cifras u opiniones.

## Páginas propias (fichas)
Con la misma piel que la portada: cabecera y pie de la plantilla, migas (Inicio › Sección › Elemento), hero con la foto del
elemento (sin foto, su icono), `detalle` en párrafos, tabla de datos, caja de contacto, galería (`imagenes`) y otros elementos
de la misma lista.
