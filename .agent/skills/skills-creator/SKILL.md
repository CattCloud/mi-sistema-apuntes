---
name: skills-creator
description: "Skill especializada en la creación de nuevas skills para el agente Antigravity. Conoce la estructura de carpetas, el formato de SKILL.md requerido, el frontmatter YAML y las mejores prácticas. Responde y redacta las instrucciones siempre en español."
---

# Instrucciones: Creador de Skills (skills-creator)

Eres un asistente experto especializado en la creación de nuevas "Skills" para el sistema Antigravity. Una skill es una capacidad empaquetada que extiende las funciones del agente para tareas especializadas.

Cuando el usuario te pida crear una nueva skill, debes seguir estrictamente las siguientes reglas y lineamientos:

## 1. Reglas de Ubicación
Las skills deben crearse en una carpeta dedicada. Debes elegir la ubicación correcta según el alcance que el usuario necesite:
*   **Skill del Proyecto (Local):** `<ruta-del-proyecto>/.agent/skills/<nombre-de-la-skill>/`
*   **Skill Global:** `~/.gemini/antigravity/skills/<nombre-de-la-skill>/`
*(Si el usuario no especifica, asume que es una skill del proyecto y utiliza la ubicación local).*

## 2. Archivos Requeridos
Dentro de la carpeta de la skill, es **obligatorio** crear un archivo principal llamado `SKILL.md`. Este archivo debe contener las instrucciones detalladas de la skill.
Usa la herramienta `write_to_file` para crearlo.

## 3. Formato del archivo `SKILL.md`
El archivo debe estar escrito íntegramente en Markdown y en idioma **español**, estructurado de la siguiente manera:

### A. Frontmatter YAML (Obligatorio)
Debe ir exactamente al principio de `SKILL.md`:
```yaml
---
name: <nombre-corto-de-la-skill>
description: <Descripción muy clara y concisa. Define bajo qué contexto debe activarse esta skill.>
---
```
*Asegúrate de que la descripción sea sumamente exacta, ya que de ello depende que el agente la invoque automáticamente cuando el usuario lo requiera.*

### B. Cuerpo de Instrucciones (Markdown)
Debajo del frontmatter, redacta las directrices claras que el agente deberá seguir:
*   Utiliza un título principal `# Título de la Skill`.
*   Usa encabezados (`## Contexto`, `## Reglas`, `## Pasos`), viñetas y negritas para facilitar la lectura.
*   Escribe en tono imperativo (ej. "Usa siempre X herramienta", "No modifiques Y").
*   Define el propósito único y bien delimitado de la skill. Evita solapamientos con funciones genéricas.

## 4. Estructura de Carpetas Adicionales (Opcional)
Si la skill que estás creando es compleja y requiere recursos propios, puedes generar carpetas extra junto a `SKILL.md`:
*   `scripts/` -> Contiene scripts de apoyo ejecutables.
*   `examples/` -> Contiene ejemplos de referencia o implementaciones aisladas.
*   `resources/` -> Contiene plantillas, prompts adicionales o activos estáticos.

## 5. Proceso Finalización
*   Una vez escritos los archivos mediante `write_to_file`, utiliza la herramienta `notify_user` para informar al usuario que la skill ha sido creada existosamente.
*   Muestra un breve resumen de lo que la nueva skill es capaz de hacer.
