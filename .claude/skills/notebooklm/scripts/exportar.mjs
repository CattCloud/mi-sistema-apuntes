#!/usr/bin/env node
// Exporta las clases de un módulo de apuntes/ a notebooklm/, limpias para subir a NotebookLM.
// Diseño y decisiones: contexto/plan_notebooklm.md (Fase 1).
//
// Uso:
//   node .claude/skills/notebooklm/scripts/exportar.mjs <carpeta-del-modulo> [--salida <carpeta>]
//
// Cada clase sale autocontenida: sin frontmatter, sin navegación, sin marcas ⚠️ verificar y sin
// referencias a otras clases o módulos. Lo que las reglas genéricas no limpian se resuelve en
// .claude/skills/notebooklm/limpieza/<ruta>/<modulo>.json, que además decide qué imágenes suben (R9).
// Si queda una referencia sin limpiar o una imagen sin revisar, no escribe nada.
// Solo se exportan clases 01_…98_ con `estado: finalizada`. El original nunca se toca.

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const DIR_SKILL = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const RAIZ_REPO = path.resolve(DIR_SKILL, '../../..');
const MAX_FUENTES = 50; // plan gratis, verificado el 2026-09-11
const RUTAS = { cloud: 'Cloud', typescript: 'TypeScript', arquitectura: 'Arquitectura', ia: 'IA' };

const RE_PIE_NAVEGACION = /^\s*\[\[[^\]]+\]\](\s*·\s*\[\[[^\]]+\]\])*\s*$/;
const RE_BLOQUE_VERIFICAR = /^>\s*⚠️\s*\*{1,2}(?:Para )?[Vv]erificar/;
const RE_PARRAFO_VERIFICAR = /^⚠️\s*\*{1,2}(?:Para )?[Vv]erificar/;
const RE_VERIFICAR_EN_LINEA = /\s*(?:\*\(⚠️ verificar[^)]*\)\*|⚠️\s*\*verificar(?:[^*]|\*\*[^*]*\*\*)*\*(?!\*))/g;
const RE_IMAGEN = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
const RE_LEYENDA = /^\*(?!\*).*\*\s*$/;
const RE_COLUMNA_PUNTERO = /^dónde se (?:estudia|trabaja|ve)$/;

// Una mención a otra clase o módulo: "sección 3", "la sección anterior", "módulo M8", "**B6 · Datos**", "el M5".
const REF = String.raw`(?:(?<!\p{L})[Ss]ecci[oó]n (?:anterior|siguiente|previa|\d+)(?!\p{L})|(?:primera|última) secci[oó]n|[Mm][oó]dulos? (?:anterior|siguiente|[BM]\d+[a-z]?(?![\p{L}\d]))|\*\*[BM]\d+[a-z]?(?: · [^*]+)?\*\*|(?<!\p{L})(?:[Ee]l|[Dd]el|[Aa]l|[Ee]n|[Dd]e|[Ee]s|y|o) (?:el )?[BM]\d+[a-z]?(?![\p{L}\d]))`;
const RE_PARENTESIS_PUNTERO = new RegExp(String.raw`\s*\*?\([^()]*?${REF}[^()]*\)\*?`, 'gu');
const RE_RESIDUO = new RegExp(
  String.raw`⚠️\s*\*{0,2}(?:Para )?[Vv]erificar|${REF}|(?<!\p{L})(?:[Cc]omo (?:ya )?vimos|[Ll]o que vimos|[Ll]o vimos|adelantamos|veremos|verás en el|lo que viene)(?!\p{L})|00_indice|99_cierre|micro-ejercicio|\[\[`,
  'u',
);

function fallar(mensaje) {
  console.error(`Error: ${mensaje}`);
  process.exit(1);
}

function leerArgumentos(argv) {
  const args = { modulo: null, salida: path.join(RAIZ_REPO, 'notebooklm') };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--salida') args.salida = path.resolve(argv[++i] ?? fallar('--salida necesita una carpeta'));
    else if (a.startsWith('--')) fallar(`opción desconocida: ${a}`);
    else args.modulo = a;
  }
  if (!args.modulo) fallar('indica la carpeta del módulo, por ejemplo apuntes/cloud/b3-identidad');
  return args;
}

function resolverModulo(arg) {
  const dir = [path.resolve(arg), path.resolve(RAIZ_REPO, arg)].find((d) => fs.existsSync(d) && fs.statSync(d).isDirectory());
  if (!dir) fallar(`no existe la carpeta ${arg}`);
  const relativa = path.relative(path.join(RAIZ_REPO, 'apuntes'), dir);
  const partes = relativa.split(path.sep);
  if (relativa.startsWith('..') || partes.length !== 2) fallar(`${arg} no es una carpeta de módulo dentro de apuntes/<ruta>/`);
  return { dir, workspace: partes[0], slug: partes[1] };
}

function separarFrontmatter(texto) {
  const lineas = texto.split(/\r?\n/);
  const fin = lineas[0] === '---' ? lineas.indexOf('---', 1) : -1;
  if (fin < 0) return { datos: {}, cuerpo: lineas };
  const datos = {};
  for (const linea of lineas.slice(1, fin)) {
    const m = linea.match(/^([A-Za-z_]+):\s*(.*)$/); // las claves anidadas (indentadas) no interesan
    if (!m) continue;
    const valor = m[2].trim();
    datos[m[1]] = valor.startsWith('"') ? valor.replace(/^"(.*)"$/, '$1') : valor.replace(/\s+#.*$/, '');
  }
  return { datos, cuerpo: lineas.slice(fin + 1) };
}

// El pie de navegación (`---` + [[anterior]] · [[índice]] · [[siguiente]]) es del sistema, no contenido.
function quitarPieDeNavegacion(lineas) {
  const ultima = lineas.findLastIndex((l) => l.trim() !== '');
  if (ultima < 0 || !RE_PIE_NAVEGACION.test(lineas[ultima])) return lineas;
  const previa = lineas.slice(0, ultima).findLastIndex((l) => l.trim() !== '');
  return lineas.slice(0, previa >= 0 && lineas[previa].trim() === '---' ? previa : ultima);
}

// Aplica una transformación solo al texto fuera del código en línea.
function fueraDeCodigo(linea, fn) {
  return linea
    .split(/(`[^`]*`)/)
    .map((tramo, i) => (i % 2 === 1 ? tramo : fn(tramo)))
    .join('');
}

// Divide una fila de tabla en celdas sin romper las que llevan `|` dentro de código.
function celdas(fila) {
  const salida = [];
  let actual = '';
  let enCodigo = false;
  for (const c of fila.trim().replace(/^\||\|$/g, '')) {
    if (c === '`') enCodigo = !enCodigo;
    if (c === '|' && !enCodigo) {
      salida.push(actual);
      actual = '';
    } else actual += c;
  }
  salida.push(actual);
  return salida;
}

function quitarColumnasPuntero(lineas) {
  const salida = [];
  for (let i = 0; i < lineas.length; i++) {
    const esCabecera = /^\s*\|.*\|\s*$/.test(lineas[i]) && /^\s*\|[\s:|-]+\|\s*$/.test(lineas[i + 1] ?? '');
    const quitar = esCabecera
      ? celdas(lineas[i]).flatMap((c, n) => (RE_COLUMNA_PUNTERO.test(c.replace(/\*/g, '').trim().toLowerCase()) ? [n] : []))
      : [];
    if (quitar.length === 0) {
      salida.push(lineas[i]);
      continue;
    }
    for (; i < lineas.length && /^\s*\|.*\|\s*$/.test(lineas[i]); i++) {
      salida.push(`|${celdas(lineas[i]).filter((_, n) => !quitar.includes(n)).join('|')}|`);
    }
    i--;
  }
  return salida;
}

function limpiarClase(texto, { reemplazos, alEncontrarImagen }) {
  const sinUso = [];
  for (const [buscar, por] of reemplazos) {
    if (!texto.includes(buscar)) sinUso.push(buscar);
    else texto = texto.split(buscar).join(por);
  }

  const lineas = quitarColumnasPuntero(texto.split('\n'));
  const salida = [];
  let enBloque = false;
  for (let i = 0; i < lineas.length; i++) {
    const linea = lineas[i];
    if (/^\s*(```|~~~)/.test(linea)) enBloque = !enBloque;
    if (enBloque || /^\s*(```|~~~)/.test(linea)) {
      salida.push(linea);
      continue;
    }
    if (RE_BLOQUE_VERIFICAR.test(linea)) {
      while (i + 1 < lineas.length && /^>/.test(lineas[i + 1])) i++;
      continue;
    }
    if (RE_PARRAFO_VERIFICAR.test(linea)) continue;

    let excluida = false;
    // La marca de verificar puede llevar código en línea dentro, así que se quita antes de separar el código.
    const limpia = fueraDeCodigo(linea.replace(RE_VERIFICAR_EN_LINEA, ''), (tramo) =>
      tramo
        .replace(RE_PARENTESIS_PUNTERO, '')
        .replace(RE_IMAGEN, (_, alt, src) => {
          const marca = alEncontrarImagen(alt, src);
          if (marca === null) excluida = true;
          return marca ?? '';
        }),
    );
    if (excluida) {
      // Sin la imagen, su leyenda (la línea en cursiva que la sigue) habla de algo que no está.
      let j = i + 1;
      while (j < lineas.length && lineas[j].trim() === '') j++;
      if (j < lineas.length && RE_LEYENDA.test(lineas[j])) i = j;
      if (limpia.trim() === '') continue;
    }
    salida.push(limpia);
  }

  const compacta = salida.filter((l, n) => !(l.trim() === '' && (n === 0 || salida[n - 1].trim() === '')));
  while (compacta.length && compacta.at(-1).trim() === '') compacta.pop();

  const residuos = [];
  enBloque = false;
  for (const linea of compacta) {
    if (/^\s*(```|~~~)/.test(linea)) enBloque = !enBloque;
    if (enBloque) continue;
    const m = fueraDeCodigo(linea, (t) => t).replace(/`[^`]*`/g, '').match(RE_RESIDUO);
    if (m) residuos.push(linea.trim().slice(Math.max(0, linea.trim().indexOf(m[0]) - 60), linea.trim().indexOf(m[0]) + 80));
  }
  return { lineas: compacta, sinUso, residuos };
}

const args = leerArgumentos(process.argv.slice(2));
const { dir, workspace, slug } = resolverModulo(args.modulo);

const rutaLimpieza = path.join(DIR_SKILL, 'limpieza', workspace, `${slug}.json`);
const limpieza = fs.existsSync(rutaLimpieza) ? JSON.parse(fs.readFileSync(rutaLimpieza, 'utf8')) : {};
const decisionImagen = limpieza.imagenes ?? {};

// El índice se lee para nombrar el notebook, pero nunca se exporta.
const rutaIndice = path.join(dir, '00_indice.md');
const indice = fs.existsSync(rutaIndice) ? separarFrontmatter(fs.readFileSync(rutaIndice, 'utf8')).datos : {};
const ruta = RUTAS[workspace] ?? workspace.charAt(0).toUpperCase() + workspace.slice(1);
const numero = (indice.modulo ?? '').match(/\d+/)?.[0] ?? null;
const codigo = numero ? `M${numero}` : null;
const tema = (indice.tema || slug).replace(/^[A-Za-z]+\d+\s*—\s*/, '');
const notebook = [ruta, codigo, tema].filter(Boolean).join('-');
const prefijo = codigo ? `${codigo}-` : '';

const clases = fs
  .readdirSync(dir)
  .filter((f) => /^\d{2}_.+\.md$/.test(f) && Number(f.slice(0, 2)) >= 1 && Number(f.slice(0, 2)) <= 98)
  .sort();
if (clases.length === 0) fallar(`${slug} no tiene clases numeradas`);

const archivos = new Map(); // nombre en el export → contenido
const omitidas = [];
const residuos = [];
const sinRevisar = [];
const reemplazosSinUso = [];

for (const archivo of clases) {
  const { datos, cuerpo } = separarFrontmatter(fs.readFileSync(path.join(dir, archivo), 'utf8'));
  if (datos.estado !== 'finalizada') {
    omitidas.push(`${archivo} — estado: ${datos.estado || 'sin campo'}`);
    continue;
  }
  const nn = archivo.slice(0, 2);
  const { lineas, sinUso, residuos: quedan } = limpiarClase(quitarPieDeNavegacion(cuerpo).join('\n'), {
    reemplazos: limpieza.reemplazos?.[archivo] ?? [],
    alEncontrarImagen: (alt, src) => {
      const base = path.basename(src);
      const decision = decisionImagen[base];
      if (decision === undefined) {
        sinRevisar.push(`${archivo} | ${base} | ${alt}`);
        return '';
      }
      if (decision.startsWith('excluir')) return null;
      const origen = path.resolve(dir, src);
      if (!fs.existsSync(origen)) fallar(`${archivo} referencia ${src}, que no existe`);
      const nombre = `${prefijo}${nn}_img_${base.replace(/^\d{2}_/, '')}`;
      archivos.set(nombre, fs.readFileSync(origen));
      return `[Imagen: ${alt} — fuente ${nombre}]`;
    },
  });
  residuos.push(...quedan.map((r) => `${archivo}: …${r}…`));
  reemplazosSinUso.push(...sinUso.map((s) => `${archivo}: "${s.slice(0, 80)}"`));

  while (lineas.length && lineas[0].trim() === '') lineas.shift();
  const contexto = `Ruta ${ruta} · ${codigo ? `Módulo ${numero}: ` : ''}${tema} · Clase ${Number(nn)}: ${datos.titulo || archivo}`;
  archivos.set(`${prefijo}${archivo}`, Buffer.from([contexto, '', ...lineas, ''].join('\n'), 'utf8'));
}

const listar = (titulo, items) => {
  if (items.length) console.log(`\n${titulo} (${items.length}):\n${items.map((i) => `  ${i}`).join('\n')}`);
};
const relativo = (p) => (p.startsWith(RAIZ_REPO) ? path.relative(RAIZ_REPO, p) : p);

if (residuos.length || sinRevisar.length) {
  console.log(`No se exportó ${slug}: el contenido no saldría limpio. Resuélvelo en ${relativo(rutaLimpieza)}.`);
  listar('Referencias o marcas sin limpiar → añade un reemplazo ["texto exacto", "texto limpio"]', residuos);
  listar('Imágenes sin revisar → ábrelas y regístralas como "subir" o "excluir — motivo" (R9: nada de datos de la cuenta)', sinRevisar);
  listar('Reemplazos que ya no encuentran su texto', reemplazosSinUso);
  process.exit(1);
}

const salidaModulo = path.join(args.salida, workspace, slug);
const rutaManifest = path.join(salidaModulo, '_manifest.json');
const manifestPrevio = fs.existsSync(rutaManifest) ? JSON.parse(fs.readFileSync(rutaManifest, 'utf8')) : {};
const huella = (contenido) => crypto.createHash('sha256').update(contenido).digest('hex');
const previos = manifestPrevio.archivos ?? {};
const huellas = {};
const nuevos = [];
const cambiados = [];
let sinCambios = 0;
for (const [nombre, contenido] of archivos) {
  huellas[nombre] = huella(contenido);
  if (!(nombre in previos)) nuevos.push(nombre);
  else if (previos[nombre] !== huellas[nombre]) cambiados.push(nombre);
  else sinCambios++;
}
const retirados = Object.keys(previos).filter((n) => !archivos.has(n));

fs.mkdirSync(salidaModulo, { recursive: true });
for (const nombre of retirados) fs.rmSync(path.join(salidaModulo, path.basename(nombre)), { force: true });
for (const [nombre, contenido] of archivos) fs.writeFileSync(path.join(salidaModulo, nombre), contenido);
fs.writeFileSync(rutaManifest, JSON.stringify({ notebook, archivos: huellas }, null, 2) + '\n');

console.log(`Notebook: ${notebook}`);
console.log(`Carpeta:  ${relativo(salidaModulo)}`);
console.log(`Fuentes:  ${archivos.size} de ${MAX_FUENTES}${archivos.size > MAX_FUENTES ? '  ⚠️ supera el tope del plan gratis' : ''}`);
listar('Subir (nuevos)', nuevos);
listar('Volver a subir (cambiaron: quita la fuente vieja en NotebookLM)', cambiados);
listar('Quitar de NotebookLM (ya no se exportan)', retirados);
if (sinCambios) console.log(`\nSin cambios: ${sinCambios}`);
listar('Clases omitidas', omitidas);
listar('Reemplazos que ya no encuentran su texto', reemplazosSinUso);
