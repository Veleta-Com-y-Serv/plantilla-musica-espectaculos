// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';

export interface Enlace { texto: string; url: string }
/** Elemento genérico: etiquetas de la portada, pasos de contratación, vídeos (`url` externa, `imagen`, `duracion`)… */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string; duracion?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
export interface Proyecto { titulo: string; texto?: string; imagen?: string; categoria?: string; anio?: string }
export interface Noticia { fecha: string; titulo: string; texto?: string; url?: string }
/** Concierto o actuación abierta al público (sección «fechas»). `url` = venta de entradas (opcional). */
export interface Fecha { fecha: string; lugar?: string; ciudad?: string; hora?: string; estado?: string; url?: string }
/** Espectáculo o formato del repertorio (sección «espectaculos»). */
export interface Espectaculo { titulo: string; texto?: string; duracion?: string; formato?: string; imagen?: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace;
  cta_secundario?: Enlace;
  nota?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  proyectos: Proyecto[];
  noticias: Noticia[];
  fechas: Fecha[];
  espectaculos: Espectaculo[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = (datos ?? {}) as Crudo;
function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
const texto = (v: unknown) => (v == null ? '' : String(v));

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    nota: texto(s.nota),
    cta: s.cta?.url ? (s.cta as Enlace) : undefined,
    cta_secundario: s.cta_secundario?.url ? (s.cta_secundario as Enlace) : undefined,
    items: lista<Item>(s.items),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Testimonio>(s.testimonios),
    galeria: lista<string>(s.galeria),
    horario: lista<Horario>(s.horario),
    preguntas: lista<Pregunta>(s.preguntas),
    proyectos: lista<Proyecto>(s.proyectos),
    noticias: lista<Noticia>(s.noticias),
    fechas: lista<Fecha>(s.fechas).filter((f) => texto(f.fecha).trim() || texto(f.lugar).trim()),
    espectaculos: lista<Espectaculo>(s.espectaculos).filter((e) => texto(e.titulo).trim()),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi negocio',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#e0218a', acento: '#ffd60a', fondo: '#0b0710', texto: '#f7f1f8', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'EntertainmentBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Secciones activas que usan un diseño (su id o su `tipo:`), en orden. */
export function seccionesDeTipo(tipo: string): Seccion[] {
  return seccionesActivas()
    .filter((id) => id === tipo || site.secciones[id].tipo === tipo)
    .map((id) => site.secciones[id]);
}

/** Opciones del desplegable «Me interesa» del formulario de contacto: los títulos de los espectáculos. */
export function intereses(): string[] {
  const titulos = seccionesDeTipo('espectaculos').flatMap((s) => s.espectaculos.map((e) => texto(e.titulo).trim()));
  return [...new Set(titulos.filter(Boolean))];
}

/** Primera fecha de la primera sección de fechas activa (la pegatina de la portada y el pie), con el id de su sección. */
export function proximaFecha(): (Fecha & { ancla: string }) | null {
  for (const id of seccionesActivas()) {
    const s = site.secciones[id];
    if ((id === 'fechas' || s.tipo === 'fechas') && s.fechas.length) return { ...s.fechas[0], ancla: id };
  }
  return null;
}

/**
 * «14 nov 2026» → { dia: '14', resto: 'nov 2026' }; «Sábado 14 de noviembre» → { dia: '14', resto: 'Sábado de noviembre' }.
 * Si no hay número, todo va en `resto`. Sirve para pintar el día en grande sin obligar a un formato.
 */
export function partirFecha(f?: string): { dia: string; resto: string } {
  const t = texto(f).trim();
  const m = t.match(/(^|\s)(\d{1,2})(?=\s|$|[\/.-])/);
  if (!m) return { dia: '', resto: t };
  const resto = (t.slice(0, m.index! + m[1].length) + t.slice(m.index! + m[0].length)).replace(/^[\s\/.-]+/, '').replace(/\s+de\s+/i, ' de ').replace(/\s{2,}/g, ' ').trim();
  return { dia: m[2], resto };
}

/** Lista a partir de una cadena separada por «;» o por líneas (p. ej. `tipos_evento`). */
export const puntos = (t?: unknown) => (t ? String(t).split(/[;\n]/).map((p) => p.trim()).filter(Boolean) : []);

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
/** ¿Enlace a otra web? (se abre en pestaña nueva). */
export const esExterno = (u?: string) => /^https?:\/\//i.test(texto(u));
