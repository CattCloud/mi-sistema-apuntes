#!/usr/bin/env node
// Guardián de Tesla: comprueba lo medible de las reglas en los Markdown del sistema (config: reglas.json).
//   node .claude/hooks/verificar.js --todo          revisa todo el alcance
//   node .claude/hooks/verificar.js <archivo...>    revisa esos archivos
//   --al-guardar   hook PostToolUse: revisa el archivo recién escrito y le avisa al agente
//   --al-terminar  hook Stop: revisa lo que el agente tocó en esta sesión antes de cerrar
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');

const RAIZ = path.resolve(__dirname, '..', '..');
const CONFIG = JSON.parse(fs.readFileSync(path.join(__dirname, 'reglas.json'), 'utf8'));
const NO_RECORRER = new Set(['.git', 'node_modules', '_input', 'notebooklm']);

const aRel = (p) => path.relative(RAIZ, path.resolve(RAIZ, p)).split(path.sep).join('/');

function enAlcance(rel) {
  if (!rel.endsWith('.md') || rel.startsWith('..')) return false;
  if (CONFIG.excluir.some((e) => rel.startsWith(e) || rel.includes('/' + e))) return false;
  return CONFIG.alcance.some((a) => (a.endsWith('/') ? rel.startsWith(a) : rel === a));
}

function recorrer(dir, fuera = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (NO_RECORRER.has(e.name)) continue;
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) recorrer(abs, fuera);
    else fuera.push(aRel(abs));
  }
  return fuera;
}

let nombres = null;
function existeNota(destino, dirArchivo) {
  if (!nombres) nombres = new Set(recorrer(RAIZ).filter((r) => r.endsWith('.md')).map((r) => path.posix.basename(r, '.md').toLowerCase()));
  const limpio = destino.replace(/\\$/, '').trim();
  if (fs.existsSync(path.resolve(dirArchivo, limpio + '.md')) || fs.existsSync(path.resolve(dirArchivo, limpio))) return true;
  return nombres.has(path.posix.basename(limpio).toLowerCase());
}

function leerFrontmatter(texto) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const campos = {};
  for (const linea of m[1].split(/\r?\n/)) {
    const k = linea.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (k) campos[k[1]] = k[2].replace(/\s+#.*$/, '').replace(/^"|"$/g, '').trim();
  }
  return campos;
}

function tipoDe(rel) {
  if (!rel.startsWith('apuntes/')) return 'otro';
  const base = path.posix.basename(rel);
  const profundidad = rel.split('/').length;
  if (base === '00_indice.md') return profundidad >= 4 ? 'indice' : 'indice_workspace';
  if (base === '99_cierre.md') return 'cierre';
  if (base.startsWith('guia_')) return 'guia';
  if (/^\d\d_/.test(base)) return 'seccion';
  return 'otro';
}

function fueraDeCodigo(lineas) {
  let enBloque = false;
  return lineas.map((l) => {
    if (/^\s*```/.test(l)) { enBloque = !enBloque; return false; }
    return !enBloque;
  });
}

function revisar(rel) {
  const abs = path.join(RAIZ, rel);
  if (!fs.existsSync(abs)) return [];
  const texto = fs.readFileSync(abs, 'utf8');
  const lineas = texto.split(/\r?\n/);
  const prosa = fueraDeCodigo(lineas);
  const avisos = [];
  const aviso = (regla, msg, linea) => avisos.push({ archivo: rel, regla, msg, linea });
  const fm = leerFrontmatter(texto);
  const tipo = tipoDe(rel);

  for (const p of CONFIG.datos_sensibles.patrones) {
    const re = new RegExp(p);
    lineas.forEach((l, i) => { if (re.test(l)) aviso(CONFIG.datos_sensibles.regla, `posible dato sensible: "${l.trim().slice(0, 70)}"`, i + 1); });
  }

  const ed = CONFIG.estado_duplicado;
  if (!rel.startsWith(ed.solo_fuera_de)) {
    lineas.forEach((l, i) => {
      if (ed.patrones.some((p) => new RegExp(p).test(l))) aviso(ed.regla, `estado fuera del índice del apunte: "${l.trim().slice(0, 80)}"`, i + 1);
    });
  }

  for (const f of CONFIG.frases_prohibidas) {
    if (f.tipos && !f.tipos.includes(tipo)) continue;
    const re = new RegExp(f.patron, 'i');
    lineas.forEach((l, i) => { if (prosa[i] && re.test(l)) aviso(f.regla, `${f.motivo}: "${l.trim().slice(0, 90)}"`, i + 1); });
  }

  if (['seccion', 'cierre', 'guia', 'indice'].includes(tipo)) revisarImagenesYEnlaces(lineas, prosa, abs, aviso);
  if (tipo === 'seccion') revisarSeccion(lineas, prosa, fm, aviso);
  if (tipo === 'indice') revisarIndice(lineas, fm, aviso);
  if (tipo === 'cierre') revisarCierre(lineas, fm, aviso);
  return avisos;
}

function apunteAbierto(dir) {
  const indice = path.join(dir, '00_indice.md');
  if (!fs.existsSync(indice)) return false;
  const estado = leerFrontmatter(fs.readFileSync(indice, 'utf8')).estado;
  return estado === 'EN PROGRESO' || estado === 'PAUSADO';
}

function revisarImagenesYEnlaces(lineas, prosa, abs, aviso) {
  const dir = path.dirname(abs);
  const reImg = /!\[([^\]]*)\]\(([^)\s]+)\)/g;
  const reWiki = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;
  lineas.forEach((l, i) => {
    if (!prosa[i]) return;
    for (const [, alt, src] of l.matchAll(reImg)) {
      if (/^https?:/.test(src)) continue;
      if (!fs.existsSync(path.resolve(dir, decodeURIComponent(src)))) aviso('A9', `imagen que no existe: ${src}`, i + 1);
      if (!alt.trim()) aviso('A9', `imagen sin texto alternativo: ${src}`, i + 1);
      const siguiente = lineas.slice(i + 1).find((x) => x.trim());
      if (!siguiente || !/^\*[^*]/.test(siguiente.trim())) aviso('A9', `imagen sin pie de foto en cursiva en la línea siguiente: ${src}`, i + 1);
    }
    for (const [, destino] of l.matchAll(reWiki)) {
      if (existeNota(destino, dir)) continue;
      if (/^\d\d_[\w-]+$/.test(destino.trim()) && apunteAbierto(dir)) continue;
      aviso('A3', `enlace a una nota que no existe: [[${destino}]]`, i + 1);
    }
  });
}

function revisarSeccion(lineas, prosa, fm, aviso) {
  const cfg = CONFIG.seccion;
  for (const c of cfg.campos) if (!(c in fm)) aviso('A3', `falta el campo "${c}" en el frontmatter`);
  const iH1 = lineas.findIndex((l, i) => prosa[i] && /^# /.test(l));
  if (iH1 < 0) aviso('A1', 'falta el título # del archivo');
  else {
    const primera = lineas.slice(iH1 + 1).find((l) => l.trim());
    if (!primera || !primera.startsWith('> **')) aviso('A4', 'lo primero después del # no es un quote con la primera línea en negrita', iH1 + 1);
  }
  const iLlev = lineas.findIndex((l) => new RegExp(cfg.llevarte.patron).test(l));
  if (iLlev < 0) aviso('A7', 'falta el bloque "## 🎯 Lo que debiste llevarte"');
  else {
    let ideas = 0;
    for (let i = iLlev + 1; i < lineas.length && !/^(---|## )/.test(lineas[i]); i++) if (/^- /.test(lineas[i])) ideas++;
    if (ideas < cfg.llevarte.min || ideas > cfg.llevarte.max) aviso('A7', `"Lo que debiste llevarte" tiene ${ideas} ideas; van entre ${cfg.llevarte.min} y ${cfg.llevarte.max}`, iLlev + 1);
  }
  const reProhibido = new RegExp(cfg.titulos_prohibidos, 'i');
  lineas.forEach((l, i) => { if (prosa[i] && reProhibido.test(l)) aviso('A5', `sección de conclusión o resumen: "${l.trim()}"`, i + 1); });
  if (!lineas.slice(-5).some((l) => l.includes('[[00_indice'))) aviso('A3', 'falta la navegación al pie ([[00_indice|índice]])');
}

function lineasDeSeccion(lineas, titulo) {
  const inicio = lineas.findIndex((l) => l.startsWith(titulo));
  if (inicio < 0) return null;
  const fuera = [];
  for (let i = inicio + 1; i < lineas.length && !/^## /.test(lineas[i]); i++) fuera.push({ l: lineas[i], i });
  return fuera;
}

function revisarIndice(lineas, fm, aviso) {
  const cfg = CONFIG.indice;
  for (const c of cfg.campos) if (!(c in fm)) aviso('A2', `falta el campo "${c}" en el frontmatter`);
  if (fm.estado && !cfg.estados.includes(fm.estado)) aviso('A2', `estado "${fm.estado}" no válido; usar ${cfg.estados.join(' · ')}`);
  const secciones = lineasDeSeccion(lineas, '## Secciones');
  if (!secciones) { aviso('A2', 'falta "## Secciones"'); return; }
  if (fm.estado === 'FINALIZADO') {
    for (const { l, i } of secciones) {
      if (/^\d+\./.test(l) && /⬜|🔄/.test(l)) aviso('A2', `apunte FINALIZADO con una sección sin terminar: "${l.trim().slice(0, 70)}"`, i + 1);
    }
  }
}

function revisarCierre(lineas, fm, aviso) {
  if (fm.seccion !== 'cierre') aviso('A10', 'el frontmatter no dice "seccion: cierre"');
  if (!lineas.some((l) => new RegExp(CONFIG.cierre.que_mide).test(l))) aviso('A10', 'ninguna prueba declara "**Qué mide:**"');
  if (!lineas.slice(-5).some((l) => l.includes('[[00_indice'))) aviso('A3', 'falta la navegación al pie ([[00_indice|índice]])');
}

function formatear(avisos) {
  return avisos.map((a) => `- ${a.archivo}${a.linea ? ':' + a.linea : ''} [${a.regla}] ${a.msg}`).join('\n');
}

function leerEntrada() {
  try { return JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { return {}; }
}

const registro = (sesion) => path.join(os.tmpdir(), `tesla-guardian-${String(sesion || 'sin-sesion').replace(/[^\w-]/g, '')}.json`);
function leerRegistro(sesion) {
  try { return JSON.parse(fs.readFileSync(registro(sesion), 'utf8')); } catch { return { tocados: [], bloqueos: 0 }; }
}
const guardarRegistro = (sesion, datos) => fs.writeFileSync(registro(sesion), JSON.stringify(datos));

const args = process.argv.slice(2);

if (args[0] === '--al-guardar') {
  const entrada = leerEntrada();
  const archivo = entrada.tool_input && (entrada.tool_input.file_path || entrada.tool_input.path);
  if (!archivo) process.exit(0);
  const rel = aRel(archivo);
  if (!enAlcance(rel)) process.exit(0);
  const datos = leerRegistro(entrada.session_id);
  if (!datos.tocados.includes(rel)) datos.tocados.push(rel);
  guardarRegistro(entrada.session_id, datos);
  const avisos = revisar(rel);
  if (!avisos.length) process.exit(0);
  process.stderr.write(`Guardián de Tesla — ${avisos.length} aviso(s) en ${rel}:\n${formatear(avisos)}\nCorrígelos, o explícale al usuario por qué no aplican.\n`);
  process.exit(2);
}

if (args[0] === '--al-terminar') {
  const entrada = leerEntrada();
  const datos = leerRegistro(entrada.session_id);
  const avisos = datos.tocados.flatMap(revisar);
  if (!avisos.length) process.exit(0);
  if (entrada.stop_hook_active && (CONFIG.modo !== 'bloquear' || datos.bloqueos >= 3)) process.exit(0);
  datos.bloqueos += 1;
  guardarRegistro(entrada.session_id, datos);
  process.stderr.write(`Guardián de Tesla — antes de terminar, ${avisos.length} aviso(s) en lo que escribiste en esta sesión:\n${formatear(avisos)}\nCorrígelos, o dile al usuario en una línea por qué no aplican. (modo: ${CONFIG.modo})\n`);
  process.exit(2);
}

const archivos = args.includes('--todo') ? recorrer(RAIZ).filter(enAlcance) : args.map(aRel);
const avisos = archivos.flatMap(revisar);
if (!avisos.length) {
  console.log(`Guardián de Tesla: ${archivos.length} archivo(s) revisados, sin avisos.`);
  process.exit(0);
}
console.log(`Guardián de Tesla: ${avisos.length} aviso(s) en ${archivos.length} archivo(s) revisados.\n${formatear(avisos)}`);
process.exit(1);
