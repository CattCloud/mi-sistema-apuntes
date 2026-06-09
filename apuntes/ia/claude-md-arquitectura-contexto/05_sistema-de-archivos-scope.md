---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 5
titulo: "El sistema de archivos — jerarquía por scope"
estado: finalizada
prev: 04_cuando-se-carga
next: 06_carga-perezosa
---

# 🤖 El sistema de archivos — jerarquía por scope

Hasta aquí hemos hablado de "CLAUDE.md" como si fuera un único archivo. En realidad es una **familia de archivos** con el mismo nombre que pueden vivir en varios lugares al mismo tiempo. Claude Code los lee todos al arrancar y los combina automáticamente.

> **CLAUDE.md no es un solo archivo en un solo lugar — es una jerarquía de archivos que viven en distintos niveles, cada uno con su propio alcance.**
>
> El sistema permite separar lo que aplica a toda tu organización, lo que aplica a ti como persona, lo que aplica al proyecto, y lo que aplica solo a tu copia local — sin mezclarlos en un mismo archivo.

Esto resuelve un problema clave que el archivo único no podía resolver: **separar contextos**. No es lo mismo una regla que aplica a toda tu empresa que una preferencia personal que solo aplica a ti. No es lo mismo una decisión arquitectónica del proyecto que un alias temporal de tu copia local. Cada cosa va en el nivel que le corresponde.

## 🤖 Los 4 niveles de scope

> **CLAUDE.md tiene 4 niveles de scope (alcance), ordenados de más amplio a más específico:**
>
> - **Organización** — afecta a todos los desarrolladores de la empresa.
> - **Usuario** — solo te afecta a ti, en todos tus proyectos.
> - **Proyecto** — afecta a cualquiera que clone el repo.
> - **Local** — afecta solo a tu copia personal del repo.

Cada nivel responde a una pregunta distinta sobre dónde debe vivir una instrucción. La tabla siguiente muestra los detalles de cada uno:


| Nivel                            | Ubicación                                                   | A quién afecta                                    | Ejemplo de contenido                                                              |
| ---------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 🟦**Gestionada (organización)** | Configurada por administradores de la empresa                | Todos los desarrolladores de la organización      | Reglas de seguridad corporativa, herramientas prohibidas, políticas obligatorias |
| 🟪**Usuario**                    | `~/.claude/CLAUDE.md`                                        | Solo tú, en todos tus proyectos                   | Tu nombre preferido, estilo de respuesta que prefieres, atajos personales         |
| 🟩**Proyecto**                   | `./CLAUDE.md` o `./.claude/CLAUDE.md` (en la raíz del repo) | Todos los que clonen el repo (se versiona con git) | Stack, arquitectura, comandos del proyecto, decisiones de diseño                 |
| 🟨**Local**                      | `./CLAUDE.local.md` (en raíz del repo, ignorado por git)    | Solo tu copia personal del repo                    | URLs de sandbox, credenciales de dev, preferencias que no quieres compartir       |

🟦 = Organización · 🟪 = Tú como usuario · 🟩 = El proyecto compartido · 🟨 = Tu copia local

**Diferencias clave:**

- El**nivel gestionado** lo controla el equipo de plataforma o el administrador de tu organización — tú no lo editas. Es la única vía para imponer reglas que**no** puedan ser anuladas por archivos más específicos.
- El**nivel usuario** vive en tu carpeta personal (`~/.claude/`) y te acompaña a todos los proyectos. Es ideal para preferencias tuyas que no tienen que ver con un repo específico.
- El**nivel proyecto** es el más común y el que probablemente ya conoces. Se versiona con git para que todo el equipo lo comparta.
- El**nivel local** vive en el repo pero**no se versiona** (se agrega a`.gitignore`). Es para cosas tuyas que no quieres que aparezcan en el repo compartido.

**Una nota sobre el uso real:** la mayoría de la gente solo trabaja con el **nivel proyecto** (`./CLAUDE.md`) porque es el que aparece por defecto al inicializar Claude Code con `/init`. Los otros tres niveles son opcionales y se activan según necesidad — no tienes que usarlos todos. Por ejemplo, el nivel usuario es útil cuando tienes preferencias personales que se repiten en todos tus proyectos; el nivel local cuando trabajas con URLs o credenciales que no deberían quedar versionadas.

En otras palabras, esta separación te permite responder por separado a tres preguntas distintas:

1. *"¿Esto aplica a cualquier proyecto en el que trabaje yo?"* → nivel usuario.
2. *"¿Esto aplica a cualquiera que toque este proyecto?"* → nivel proyecto.
3. *"¿Esto aplica solo a mi máquina específica?"* → nivel local.

## 🤖 Orden de carga — lo específico pesa más

> **Claude Code carga los 4 niveles de scope en orden, de más amplio a más específico. Cuando hay conflicto entre dos niveles, el más específico es el que prevalece.**
>
> Es decir, una instrucción del nivel proyecto puede sobrescribir una del nivel usuario, y una del nivel local puede sobrescribir una del nivel proyecto.

El orden de carga es este:

```plain
ORDEN DE CARGA (de más amplio a más específico)

  🟦 Gestionada (organización)
        ↓
  🟪 Usuario (~/.claude/CLAUDE.md)
        ↓
  🟩 Proyecto (./CLAUDE.md)
        ↓
  🟨 Local (./CLAUDE.local.md)        ← Lo último cargado pesa más
```

**Por qué importa el orden:** lo último que se carga es lo que el modelo "ve más fresco" en su contexto. Si tu nivel usuario dice *"prefiero respuestas concisas"* y el nivel proyecto dice *"en este repo las respuestas deben ser detalladas porque hay onboarding de juniors"*, el nivel proyecto gana — porque es más específico y se carga después.

**Caso típico:** una preferencia tuya de nivel usuario (*"hazme las explicaciones cortas"*) puede ser sobrescrita por una necesidad del proyecto (*"este equipo necesita explicaciones largas y comentadas porque hay devs nuevos cada semana"*). Es exactamente lo que quieres — tu preferencia personal no debe imponerse sobre las reglas del equipo.

**Implicación práctica:** esto significa que **no tienes que repetir instrucciones en niveles más específicos**. Si algo aplica a toda tu organización, va al nivel gestionado. Si algo aplica a ti en todos lados, va al nivel usuario. Solo metes algo en el nivel proyecto si **realmente es específico de ese proyecto**. Esa disciplina mantiene cada archivo pequeño y enfocado.

Debes recordar que esta jerarquía no es solo organizacional — es **funcional**. El orden de carga garantiza que el contexto más específico siempre tenga la última palabra, lo cual es exactamente lo que necesitas en la práctica.


---
[[04_cuando-se-carga|← anterior]] · [[00_indice|índice]] · [[06_carga-perezosa|siguiente →]]
