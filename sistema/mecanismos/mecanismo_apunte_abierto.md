# Mecanismo: Apunte Abierto

> **Propósito:** Permitir que los apuntes se enriquezcan durante y después de su generación, sin romper el flujo ni caer en perfeccionismo infinito.  
> **Implementar en:** T10 (Skill)  
> **Fecha de diseño:** 10 de Mayo, 2026

---

## Contexto

El flujo P1→P2→P3→P4 genera apuntes de forma **progresiva** — sección por sección, con síntesis y escritura al `.md` inmediata. El agente en Cowork es la **única fuente de contenido** (genera y se autocritica) Y el sintetizador, todo en un único hilo de conversación, lo que permite que el proceso ocurra sin perder contexto.

Esto crea un entorno natural para que surjan preguntas y adiciones: el usuario está leyendo, comparando y validando contenido en tiempo real. Las ideas no llegan "después" en abstracto — aparecen mientras se estudia.

Además, el perfil del usuario (ver `sistema/perfil/yo.md`) incluye una tendencia al perfeccionismo — siempre quiere agregar más, profundizar más. El sistema debe ser un aliado que **ayude a parar** cuando algo ya excede el alcance del apunte actual.

---

> **Mecanismo complementario:** Para pausar un apunte completo y trabajar en otro tema (no es una adición sino una interrupción del flujo), ver `mecanismo_pausa_retomar.md`. Los mecanismos de abajo operan *dentro* de un apunte activo; el de pausa opera *entre* apuntes.

## Los 3 mecanismos

### 1. Pregunta Rápida (durante el armado) — incluye Apunte Vivo

**Cuándo:** El usuario está en el flujo progresivo P3→P4 (el agente genera y sintetiza la sección, el usuario la valida) y le surge una duda o quiere ampliar algo. Esto es natural porque el usuario está activamente leyendo y procesando contenido.

**Flujo base:**
1. El usuario interrumpe con una pregunta sobre el tema (en la misma conversación de Cowork)
2. El agente responde la pregunta (tiene contexto completo porque ya generó su propia respuesta)
3. El agente evalúa: ¿esta respuesta enriquece una sección existente del esqueleto, o amerita un nuevo H3?
4. El agente propone: "Esto encaja en la sección [X] como [detalle/H3 nuevo]. ¿Lo integro?"
5. Si el usuario confirma → el agente actualiza el esqueleto y genera la síntesis para esa adición
6. Si el usuario dice no → la respuesta queda como conversación, no se integra

**Regla:** La adición se sintetiza en el estilo del manual, igual que cualquier otra sección.

---

#### Apunte Vivo — detección proactiva de explicaciones valiosas

El usuario tiene tendencia a aprender mejor cuando *él pregunta y el agente responde* que con el primer borrador. Si esas explicaciones del chat no se integran al `.md`, se pierden — y como el objetivo del sistema es **poder estudiar después**, eso es un fracaso.

**Disparador (cuándo activarlo):** No solo cuando el usuario pide explícitamente integrar algo. También cuando el agente detecta que **su propia respuesta** a una pregunta del usuario:

- Contiene una **analogía, ejemplo real o reformulación** que es más clara que lo escrito en el apunte.
- **Define un término** que el apunte usaba sin definir.
- Conecta un concepto del apunte con **algo que el usuario ya conoce** (su stack, su día a día).
- Añade un **matiz importante** que faltaba.
- Responde una pregunta que **otro lector tendría** al leer la sección.

Señales lingüísticas del usuario que indican que la explicación valió: *"ahora sí lo entiendo"*, *"así me tienes que explicar"*, *"no había escuchado eso"*, *"esto enriquece mucho"*.

**Flujo:**
1. El usuario hace una pregunta. El agente responde con la mejor explicación posible.
2. Después de responder, el agente **se autoevalúa**: ¿esta explicación cumple alguno de los disparadores de arriba?
3. Si sí → el agente propone: *"Esta explicación enriquece la sección [X]. Te propongo integrarla como [cita inline / párrafo nuevo / bloque de contexto extra]. ¿La integro?"*
4. El agente decide **el anclaje correcto** (la sección que mejor encaja, aunque no sea la actual — ver siguiente sub-bloque).
5. Si el usuario aprueba → el agente reescribe la sección destino integrando la explicación, en estilo Tesla, y la guarda al `.md`. Si el usuario ajusta → se ajusta. Si dice que no → queda solo en el chat.

**Regla anti-fricción:** No proponer integrar *cada* respuesta. Solo las que cumplen los disparadores. La mayoría de respuestas en el chat son ajustes operativos o decisiones de estilo — esas no enriquecen el apunte y no se integran.

---

#### Anclaje al lugar correcto (anterior, actual o futura)

Cuando el agente propone integrar una explicación, decide **dónde** según la lógica didáctica del esqueleto, no según dónde surgió la pregunta:

| Caso | Acción |
|------|--------|
| Encaja en la sección **actual** | Integrar en el momento, reescribiendo la sección. |
| Encaja en una sección **previa ya escrita en el `.md`** | Editar esa sección previa en el `.md` final, integrar ahí, y mencionar al usuario: *"esto pertenece conceptualmente a la sección [Y] que ya escribimos — voy a actualizarla allá"*. |
| Encaja en una sección **futura del esqueleto** | Anotar en la entrada de esa sección en el `00_indice.md`, para integrar cuando lleguemos a ella. Avisar: *"esto encaja mejor en la sección [Z] que veremos después — lo guardo para integrarlo allá"*. |
| **No encaja en ninguna** sección pero es valioso | Proponer un H3 nuevo en el esqueleto (con confirmación), o ir a `NOTAS.md` si excede el alcance (Guardián de Alcance). |

**Principio:** la lógica didáctica del esqueleto manda. Una explicación sobre conceptos básicos que surge en la sección 5 debe ir a la sección 1, no quedarse fuera de lugar en la 5.

---

### 2. Guardián de Alcance (freno contra el perfeccionismo)

**Cuándo:** La pregunta o adición del usuario se desvía del alcance definido en P1.

**Flujo:**
1. El usuario pregunta algo que excede el alcance del apunte actual
2. El agente responde la pregunta (no deja al usuario sin respuesta)
3. Pero advierte: "Esto ya es un tema propio. ¿Lo anoto en NOTAS.md para un apunte futuro?"
4. Si el usuario insiste → el agente evalúa: ¿es un H3 corto que puede entrar sin inflar el apunte? Si sí, lo permite con advertencia. Si no, se mantiene firme.
5. El agente anota la idea en `NOTAS.md` bajo la sección correspondiente o en "Ideas de temas nuevos"

**Criterios para decidir:**
- ¿Esto se puede cubrir en 1 quote + 2-3 párrafos? → Puede entrar como adición
- ¿Esto necesita su propio esqueleto con múltiples H2/H3? → Es otro apunte
- ¿Esto ya estaba en la lista de "Excluye" del alcance de P1? → Definitivamente es otro apunte

**Tono del guardián:** Constructivo, no restrictivo. No dice "no puedes", dice "esto merece su propio espacio para hacerle justicia".

---

### 3. NOTAS.md Centralizado (después del armado)

**Cuándo:** Después de que el apunte está listo, al usuario se le ocurren ideas, dudas o adiciones.

**Ubicación:** `/mi-sistema-estudio/NOTAS.md` (raíz del proyecto, NO dentro de cada carpeta de tema)

**Estructura del archivo:**

```markdown
## Por tema

### [nombre_carpeta_tema]
- [ ] [Nota o pregunta] — contexto breve

## Ideas de temas nuevos
- [ ] [Tema] — [qué cubriría]
```

**Flujo de procesamiento:**
1. El usuario dice "procesa mis notas" (o el agente detecta que hay notas pendientes)
2. El agente lee NOTAS.md
3. Para cada nota bajo un tema existente, propone:
   - "Esto va en la sección [X] del apunte existente" → genera la síntesis
   - "Esto ya está cubierto en [sección Y]" → marca como procesada
   - "Esto es un apunte nuevo" → mueve a "Ideas de temas nuevos"
4. Para cada idea de tema nuevo: se queda ahí hasta que el usuario decida iniciar P1 con ella
5. Las notas procesadas se marcan con [x]

**Quién escribe en NOTAS.md:**
- El usuario puede escribir directamente (edición manual)
- El agente puede anotar automáticamente cuando el Guardián de Alcance redirige algo

---

## Estados del apunte (en el `00_indice.md`)

| Estado | Significado |
|--------|-------------|
| `EN PROGRESO` | El flujo P1→P4 está en curso |
| `PAUSADO` | Aparcado a propósito, retomable (ver `mecanismo_pausa_retomar.md`) |
| `FINALIZADO` | Todas las secciones `✅` |

El estado vive en el frontmatter del `00_indice.md` (no hay `ESTADO.md` aparte). Las adiciones pendientes se anotan en `NOTAS.md`.

---

## Conexión con el flujo principal

- Los mecanismos 1 y 2 operan **dentro** del flujo progresivo P3→P4 (síntesis sección por sección)
- El mecanismo 3 opera **fuera** del flujo, a demanda del usuario
- Los 3 mecanismos se implementan en T10 (Skill), no en los prompts estáticos T5-T8
- El esqueleto (P2) es un documento vivo — puede recibir adiciones sin reiniciar el flujo
- El `.md` del apunte se construye progresivamente — las adiciones se integran en el momento, no se acumulan para el final

## Por qué el nuevo flujo facilita el apunte abierto

En el flujo anterior (ir a 3 IAs → traer todo → sintetizar todo), las preguntas del usuario quedaban fuera del proceso. El usuario tenía que esperar a que todo estuviera listo para opinar.

En el flujo actual (Cowork genera + se autocritica → sintetiza en estilo Tesla → usuario valida → escribe al .md):
- El usuario está **activamente involucrado** en cada sección
- Las preguntas surgen **naturalmente** mientras se valida
- El agente tiene **contexto completo** para responder y ubicar adiciones
- La escritura progresiva al `.md` hace que las adiciones se integren **en tiempo real**
