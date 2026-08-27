---
tema: B1 — Fundamentos de Cloud
workspace: cloud
estado: FINALIZADO       # generación ✅. El cierre —práctica y caso— va aparte, en 99_cierre.md
arquetipo: Constructor Teórico + Documento Técnico
modulo: B1
temario: contexto/plan_estudio/temario_cloud_developers.md
repaso:
  ultimo: null                # aún sin sesión de repaso; generado el 2026-08-22
  proximo: 2026-08-25
  nivel: null
  reforzar:
    - PaaS no elimina la seguridad — dependencias, secretos y accesos siguen siendo tuyos (fila 🟡)
    - tu código y sus dependencias son tuyos en todos los modelos donde tengas código
    - cuáles son los servicios globales (IAM, Route 53, CloudFront, WAF) frente a los regionales
notebooklm: pendiente
---

# ☁️ B1 — Fundamentos de Cloud

> **Qué estás alquilando exactamente cuando "usas la nube", y hasta dónde llega tu responsabilidad.** Estado: ✅ FINALIZADO · 4 secciones.

## Alcance

Cubre: qué es la nube y qué se alquila (cómputo, almacenamiento, red), las 5 características que definen que algo sea nube, qué es un servicio gestionado y qué dejas de administrar, los modelos de servicio IaaS/PaaS/SaaS con su tabla de capas y su árbol de decisión, dónde encaja serverless, el modelo de responsabilidad compartida (seguridad *de* la nube vs seguridad *en* la nube), y regiones / zonas de disponibilidad / servicios globales vs regionales, incluido el recorrido de consola.

Excluye: comparativa AWS vs Azure vs GCP · modelos de despliegue (public/private/hybrid/multi-cloud) · edge cloud · historia del cloud computing · CapEx vs OpEx y todo lo de facturación (→ **B2**) · IAM, usuarios, roles y políticas (→ **B3**) · CDN y latencia de entrega (→ **B7**) · límites y cold start de funciones (→ **B5**).

## Secciones

1. [[01_que-es-la-nube|¿Qué es la nube y qué alquilas?]] — ✅ `[DOLOR] [DEF] [ANALOGÍA] [TABLA]`
   - El dolor
   - ¿Qué es cloud computing?
   - Qué alquilas exactamente — cómputo, almacenamiento, red
   - Las 5 características que hacen que algo sea nube
   - Servicio gestionado — qué dejas de administrar
2. [[02_modelos-servicio|Modelos de servicio: IaaS, PaaS, SaaS]] — ✅ `[DEF] [TABLA] [ANALOGÍA] [FLUJO:ascii] [MITO]`
   - ¿Qué es un modelo de servicio?
   - IaaS — te dan la máquina, tú la administras
   - PaaS — subes código, la plataforma hace el resto
   - SaaS — solo lo usas
   - La tabla que lo ordena todo: quién administra cada capa
   - ¿Y serverless dónde entra?
   - Cómo eliges — árbol de decisión
3. [[03_responsabilidad-compartida|Modelo de responsabilidad compartida]] — ✅ `[DOLOR] [DEF] [TABLA] [MITO]`
   - El dolor: el bucket que quedó público
   - Seguridad DE la nube vs seguridad EN la nube
   - La línea se mueve según el modelo de servicio
   - Lo que es tuyo siempre — datos, identidades, configuración
   - Lo que la nube NO hace por ti
4. [[04_regiones-y-az|Regiones y zonas de disponibilidad]] — ✅ `[DEF] [FLUJO:ascii] [TABLA] [MITO] [CONSOLA]`
   - Región, zona de disponibilidad, data center
   - Servicios regionales vs globales — la trampa
   - Cómo eliges una región — los cuatro criterios
   - Puntos de presencia (edge locations) — qué son y qué NO son
   - Recorrer la consola: región, servicios, cuenta activa

## Cierre del módulo

El módulo **no cierra al terminar las secciones**. Su práctica en consola y su caso viven en su propio archivo:

- [[99_cierre|🧪 Cierre — práctica en consola y caso]] — 🧩 caso ✅ (22-08-2026) · 🛠️ práctica ⬜ pendiente

## Fuentes

- 📓 Notion — `TEMA 1 ¿Qué es Cloud Computing?` → `apuntes/cloud/_input/notion/` *(materia prima, filtrada por el temario)*
- 📓 Notion — `TEMA 2 Modelos de Servicio: IaaS, PaaS, SaaS` → `apuntes/cloud/_input/notion/` *(materia prima)*
- 🎬 Curso AWS DVA — **S3** Introducción a AWS (22 min) → `apuntes/cloud/_input/transcripcion_s3_introduccion-aws.txt`
- 🎬 Curso AWS DVA — **S4** *Modelo de responsabilidad compartida* (2 min) — ⏭️ **descartada**: las notas de Notion (`TEMA 2`) ya cubren el modelo con su tabla de capas. No se ve.
- 🧠 El agente

## Adiciones pendientes

- Ver `NOTAS.md`.
