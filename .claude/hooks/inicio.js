#!/usr/bin/env node
// Guardián de inicio de Tesla (hook SessionStart): deriva de los 00_indice.md qué está en curso y qué quedó pendiente.
// No guarda estado: lo lee cada vez de los índices (R1). Su salida entra al contexto del agente.
'use strict';
const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const APUNTES = path.join(RAIZ, 'apuntes');
let entrada = {};
try { entrada = JSON.parse(fs.readFileSync(0, 'utf8') || '{}'); } catch { entrada = {}; }

function indices(dir, fuera = []) {
  if (!fs.existsSync(dir)) return fuera;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '_input' || e.name === 'notion' || e.name === 'img') continue;
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) indices(abs, fuera);
    else if (e.name === '00_indice.md' && path.relative(APUNTES, abs).split(path.sep).length >= 3) fuera.push(abs);
  }
  return fuera;
}

function leer(abs) {
  const texto = fs.readFileSync(abs, 'utf8');
  const fm = (texto.match(/^---\r?\n([\s\S]*?)\r?\n---/) || [])[1] || '';
  const campo = (nombre) => ((fm.match(new RegExp(`^${nombre}:\\s*(.+)$`, 'm')) || [])[1] || '').replace(/\s+#.*$/, '').replace(/^"|"$/g, '').trim();
  const repaso = (nombre) => ((fm.match(new RegExp(`^\\s+${nombre}:\\s*([^\\s#]+)`, 'm')) || [])[1] || 'null');
  const lineas = texto.split(/\r?\n/);
  const bloque = (titulo) => {
    const i = lineas.findIndex((l) => l.startsWith(titulo));
    if (i < 0) return [];
    const fuera = [];
    for (let j = i + 1; j < lineas.length && !/^## /.test(lineas[j]); j++) fuera.push(lineas[j]);
    return fuera;
  };
  const secciones = bloque('## Secciones').filter((l) => /^\d+\./.test(l)).map((l) => ({
    titulo: ((l.match(/\[\[[^|\]]+\|([^\]]+)\]\]/) || [])[1] || l.replace(/^\d+\.\s*/, '').split(' — ')[0]).trim(),
    estado: l.includes('✅') ? 'hecha' : l.includes('🔄') ? 'en curso' : 'pendiente',
  }));
  const lineaCierre = bloque('## Cierre').find((l) => l.includes('99_cierre')) || '';
  const cierre = !lineaCierre ? null : lineaCierre.includes('✅') ? 'superado' : lineaCierre.includes('⏸️') ? 'aplazado' : 'pendiente';
  return {
    ruta: path.relative(RAIZ, path.dirname(abs)).split(path.sep).join('/'),
    tema: campo('tema'),
    estado: campo('estado'),
    proximo: repaso('proximo'),
    ultimo: repaso('ultimo'),
    secciones,
    cierre,
  };
}

const hoyISO = new Date().toLocaleDateString('sv-SE');
const hoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
const apuntes = indices(APUNTES).map(leer);

const salida = [`[Guardián de inicio · Tesla] Hoy es ${hoy}. Reglas: AGENTS.md (R1-R12). Procedimientos: .claude/skills/. Resumen derivado de los 00_indice.md (la fuente es cada índice, R1).`];
if (entrada.source === 'compact') salida.push('La conversación se acaba de compactar. Antes de seguir con un apunte, releer su 00_indice.md y el .md de la sección en curso (R1, R3).');

const resumen = (a) => {
  const hechas = a.secciones.filter((s) => s.estado === 'hecha').length;
  const sigue = a.secciones.find((s) => s.estado !== 'hecha');
  return `- ${a.tema} (${a.ruta}) — ${hechas}/${a.secciones.length} secciones${sigue ? ` · sigue: "${sigue.titulo}" (${sigue.estado})` : ''}`;
};
const grupo = (titulo, lista) => { if (lista.length) salida.push(`${titulo}\n${lista.join('\n')}`); };

grupo('En progreso:', apuntes.filter((a) => a.estado === 'EN PROGRESO').map(resumen));
grupo('Pausados:', apuntes.filter((a) => a.estado === 'PAUSADO').map(resumen));
grupo('Cierres pendientes o aplazados:', apuntes.filter((a) => a.cierre && a.cierre !== 'superado' && a.secciones.every((s) => s.estado === 'hecha')).map((a) => `- ${a.tema} — ${a.cierre}`));
grupo('Repasos vencidos:', apuntes.filter((a) => /^\d{4}-\d{2}-\d{2}$/.test(a.proximo) && a.proximo <= hoyISO).map((a) => `- ${a.tema} — tocaba el ${a.proximo}`));
const nunca = apuntes.filter((a) => a.estado === 'FINALIZADO' && a.ultimo === 'null' && !/^\d{4}/.test(a.proximo));
if (nunca.length) salida.push(`Finalizados sin repasar nunca: ${nunca.map((a) => a.tema).join(' · ')}`);

process.stdout.write(salida.join('\n\n') + '\n');
