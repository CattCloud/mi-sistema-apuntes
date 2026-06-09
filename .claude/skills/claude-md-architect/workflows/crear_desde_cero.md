# Workflow: Crear CLAUDE.md desde cero

> **Cuándo usar este workflow:** el proyecto NO tiene CLAUDE.md aún, o el usuario quiere arrancarlo de cero ignorando el archivo actual.

> **Salida esperada:** un `CLAUDE.md` raíz con el núcleo mínimo (los 4 bloques) listo para usarse, con menos de 100 líneas.

> **Principio guía:** menos es más. La meta no es "cubrir todo lo posible" sino "cubrir lo esencial para que el agente arranque". Las capas adicionales se ganan después.

---

## Paso 1: Entrevista mínima al usuario

Para escribir el núcleo mínimo necesitas estos datos. Pídelos uno por uno, en alternativas concretas cuando sea posible (no preguntas abiertas):

### Bloque QUÉ
- *¿En una sola oración, qué hace este proyecto?*
- *¿Cuál es el stack principal? (lenguajes, framework, base de datos, libs clave)*

### Bloque CÓMO
- *¿Cuál es el comando para correr el proyecto en desarrollo?* (ej. `pnpm dev`, `npm start`)
- *¿Cuál es el comando para correr los tests?*
- *¿Hay linter / typecheck? ¿Qué comando los corre?*
- *¿Comando de build de producción?*
- *¿Hay alguno de estos comandos que NO debe ejecutar el agente?* (típico: dev server, deploy, migraciones — los maneja el usuario manualmente)

### Bloque MAPA DEL REPO
- *¿Cuáles son las carpetas principales del proyecto y qué hay en cada una?*
- Si el usuario no lo tiene claro, leer la estructura del proyecto con `ls` o equivalente y proponer un mapa que el usuario confirma o ajusta.

### Bloque PORQUÉ (decisiones no obvias)
- *¿Hay 1-2 decisiones de arquitectura que el agente debe entender desde el inicio para no equivocarse?* (típicos: por qué se eligió X tecnología, por qué tal patrón en lugar de otro, qué se rechazó explícitamente y por qué)
- *¿Hay 1-2 convenciones del equipo que no son universales?* (cómo nombran ramas, formato de commits, lugares donde guardan secrets, etc.)

**Si el usuario no tiene respuesta para alguno:** está bien. Mejor dejar el bloque corto que inventar. El núcleo mínimo no exige que los 4 bloques estén "completos" — exige que estén "presentes con lo que importe".

---

## Paso 2: Generar borrador del CLAUDE.md

Usa la plantilla en `plantillas/nucleo_minimo.md` como base. Reemplaza los placeholders con la información de la entrevista. Estructura recomendada:

```markdown
# [Nombre del proyecto]

[Oración descriptiva del proyecto.]

**Stack:** [Stack en una línea.]

## Mapa del repo

- `carpeta_1/` — [Para qué sirve.]
- `carpeta_2/` — [Para qué sirve.]
- ...

## Comandos

- `comando_dev` — [Qué hace.]
- `comando_test` — [Qué hace.]
- `comando_lint` — [Qué hace.]
- `comando_build` — [Qué hace.]

## No ejecutar automáticamente

- [Comandos que el agente NO debe correr y por qué — usuario los maneja manualmente.]

## Decisiones de diseño

- **[Decisión 1].** Razón: [por qué].
- **[Decisión 2].** Razón: [por qué].
```

**Reglas al generar:**

- Cada línea debe pasar el filtro: *"¿esto sirve para onboardear al agente en cualquier sesión futura?"*. Si no, no entra.
- Spanglish controlado: tecnicismos en inglés (stack, build, lint, deploy, scope, hooks), explicaciones en español.
- Sin preámbulo, sin sección de "introducción" ni "conclusión".
- El total debe quedar bajo 100 líneas. Si llega más, hay algo de más.

---

## Paso 3: Presentar el borrador al usuario

Mostrar el archivo completo al usuario antes de escribirlo:

```
──────────────────────────────────────
📝 BORRADOR DE CLAUDE.md
[X líneas, dentro del núcleo mínimo]
──────────────────────────────────────

[contenido completo del borrador]

──────────────────────────────────────
¿Apruebas este borrador o quieres ajustar algo?
──────────────────────────────────────
```

Si el usuario quiere agregar más, evaluar cada adición con el filtro de universalidad. Si la adición no pasa el filtro, sugerir alternativa (típicamente: que vaya a `agent_docs/`, a `.claude/rules/`, o que se quede fuera).

---

## Paso 4: Escribir el archivo

Una vez aprobado el borrador, escribir `CLAUDE.md` en la raíz del proyecto.

**Antes de escribir, verificar:**
- Si ya existe un `CLAUDE.md` en raíz, preguntar al usuario qué hacer (sobrescribir, hacer backup primero, etc.). Nunca sobrescribir silenciosamente.
- Si ya existe `.claude/CLAUDE.md`, decidir con el usuario en cuál de las dos ubicaciones quiere que viva (Claude Code lee ambas; convención común: raíz).

---

## Paso 5: Sugerir capas adicionales si el caso lo pide (opcional)

Si durante la entrevista el usuario mencionó cosas que NO entran al núcleo mínimo pero que podrían justificar una capa adicional, anótalas y al final sugiere:

- *"Mencionaste que tienen procedimientos largos de deployment. Si quieres documentarlos para que el agente los lea solo cuando hace deploy, podemos crear `agent_docs/procedures/deploying.md` después. Lee `decidir_capa.md` si quieres explorarlo."*

**No agregar capas tú mismo.** El principio es "las capas se ganan con dolor concreto" — si el dolor no se manifestó en esta sesión, no lo precrees.

---

## Paso 6: Sugerir commit

```
chore: añadir CLAUDE.md inicial para onboarding del agente

Núcleo mínimo siguiendo el principio de "onboarding, no bitácora":
QUÉ + CÓMO + Mapa del repo + PORQUÉ no obvio.

XX líneas. Capas adicionales se irán agregando según necesidad.
```

---

## Paso 7: Reporte final al usuario

```
──────────────────────────────────────
✅ CLAUDE.md CREADO
──────────────────────────────────────

Archivo: ./CLAUDE.md
Líneas: XX (núcleo mínimo)

Cubre los 4 bloques esenciales:
✅ QUÉ — descripción + stack
✅ Mapa del repo
✅ CÓMO — comandos
✅ PORQUÉ — decisiones de diseño no obvias

PRÓXIMOS PASOS:
- Commitear el archivo.
- Trabajar normalmente con el agente y observar dónde se queda corto.
- Si algo se repite mucho o el agente se confunde con algún tipo de archivo
  específico, considera agregar `agent_docs/` o `.claude/rules/` (workflow:
  decidir_capa.md).
──────────────────────────────────────
```

---

## Conexión con otros workflows

| Después de este workflow | Workflow siguiente |
|---|---|
| Archivo creado, usuario satisfecho | Cerrar. Las capas adicionales se ganan con uso real. |
| El usuario quiere preparar una capa adicional desde el día uno | `decidir_capa.md` — pero advertir que la recomendación es esperar a tener dolor concreto. |
