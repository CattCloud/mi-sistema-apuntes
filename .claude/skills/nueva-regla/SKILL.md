---
name: nueva-regla
description: Registrar una regla nueva o una corrección del usuario sobre cómo debe trabajar Tesla (formato de apuntes, redacción, flujo, evaluación, datos de entorno). Usar cuando el usuario dice "desde ahora", "siempre", "nunca", "no hagas eso", corrige la misma cosa por segunda vez, o pide cambiar una convención.
---

# Registrar una regla nueva

Principio: una regla vive en **un solo lugar**, le llega al agente en el momento en que aplica y, si se puede medir, la comprueba el guardián (R12). Antes de editar `AGENTS.md`, `CLAUDE.md` o una regla de carpeta, pasar por el gate de entrada de `claude-md-architect`.

## 1. Ubicarla: seis preguntas, en orden (la primera que diga "sí" decide)

1. **¿Describe el estado de un apunte?** → su `00_indice.md`. No es una regla: es estado (R1).
2. **¿Aplica en toda conversación, pase lo que pase?** → `AGENTS.md` (constitución). Tope de 12: si entra una, proponer al usuario cuál se fusiona o baja a otra pieza (R4).
3. **¿Solo importa al trabajar cierto tipo de archivo?** → las reglas de su carpeta: `apuntes/AGENTS.md` (A…) o `contexto/plan_estudio/AGENTS.md` (T…).
4. **¿Es una secuencia de pasos para un momento concreto, o un criterio de estilo al redactar?** → el procedimiento de ese momento (`.claude/skills/<nombre>/`) o `generar-apunte/estilo.md`. Si el momento no tiene procedimiento y ya ocurrió de verdad, crearlo (R12).
5. **¿Se puede comprobar con un sí o un no?** → además, agregarla a `.claude/hooks/reglas.json`.
6. **¿Es un dato del entorno o del usuario?** → `sistema/perfil/` (por ejemplo `entorno_aws.md`). **¿Es el porqué de algo?** → `sistema/decisiones/`.

## 2. Escribirla

- En imperativo y medible, con el porqué en una frase y, si existe, el ejemplo real que falló (*"Falló: …"*).
- Con su número: el siguiente libre de su archivo (A13, T7…). La constitución no pasa de R12.
- Si reemplaza a otra, se borra la vieja: nunca dos versiones.
- Si otro archivo necesita mencionarla, la cita por su número; no la copia.
- Si cambia la estructura del sistema, se presenta antes de ejecutarla (R4).

## 3. Aplicarla hacia atrás

1. Buscar con grep los archivos que la incumplen (excluyendo `_input/` y `_archivo/`).
2. Si son pocos y el cambio es mecánico, corregirlos. Si tocan contenido de estudio ya revisado por el usuario, listarlos con una propuesta y esperar su decisión.
3. Si se tocó `reglas.json`, correr `node .claude/hooks/verificar.js --todo` y revisar los avisos.

## 4. Dejar constancia

- Una fila en `sistema/decisiones/00_registro_reglas.md`: fecha, la regla en una frase, dónde vive.
- Nunca guardarla solo en la memoria del agente.
- Decirle al usuario, en una o dos líneas, dónde quedó y qué archivos se corrigieron.
