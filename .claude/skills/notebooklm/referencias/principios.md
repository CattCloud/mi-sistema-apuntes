# Principios para redactar un prompt de NotebookLM

> Valen para la caja de texto de **Presentación** y de **Mapa mental**. Origen: el protocolo de junio (`.claude/skills/repasar/consolidacion-notebooklm.md`), `PROMPT.md` del 2026-09-15 y las dos guías del usuario (`_archivo/notebooklm/`). Lo que la herramienta hace de verdad está en `herramienta.md`; aquí va cómo pedírselo.

## 1. Dirigir, no aportar

NotebookLM es *grounded*: solo usa las fuentes marcadas. El prompt no agrega hechos ni pide explicar algo que la clase no trae. Pide **orden, estructura, énfasis y audiencia** sobre lo que ya está en la fuente.

## 2. Cada prompt es el único

La presentación y el mapa mental se generan por separado y ninguno ve el prompt del otro. Nunca *"igual que la presentación"* ni *"como antes"*: cada prompt repite audiencia, temáticas y énfasis.

## 3. Nada del sistema ni de la selección

- **Ni clases ni fuentes:** la clase se elige marcando su fuente en el diálogo (D32). El prompt no dice *"usa solo la clase 4"* ni nombra archivos.
- **Ni sistema:** nada de índice, repaso, `reforzar:`, módulos, cierres ni "Tesla" (D14, D35).

## 4. Cobertura pareja (D33)

- **Enumerar todas las temáticas** de la clase (sus `##`, en orden) como obligatorias y con el mismo peso. Una lista explícita es lo que evita que el material se quede con lo más vistoso.
- **Lo difícil se nombra por su contenido** y recibe más explicación o un ejemplo, *"sin quitarle espacio a las demás temáticas"*. Señales en la clase: los quotes 🔑 **Matiz** y ⚠️ **Cuidado**, y los pares ❌ **Mito** / ✅ **Realidad**.
- **Con Duración Corto**, pedir igual que cada temática aparezca al menos una vez: lo corto recorta profundidad, no temáticas.

## 5. Código (D34)

- **Presentación:** cada ejemplo se muestra con su **bloque de código literal de la fuente**, junto a su explicación, sin resumirlo, reescribirlo ni cambiarlo por pseudocódigo. Si la clase compara dos códigos (el `.ts` y el `.js` que genera, `target: "ES2020"` contra `"ES5"`), pedir que se muestren juntos.
- **Mapa mental:** no hay bloques y el código se ve como texto plano. En un nodo va, a lo sumo, el **término o el comando exacto** (`tsc --noEmit`, `strict`), nunca un fragmento de código; el código completo se pide después en el chat, desde el nodo (§10).

## 6. Sin relleno (D34)

- Prohibir explícitamente las imágenes decorativas, las fotos de archivo y los íconos que no aportan información.
- Aceptar tablas, diagramas y esquemas cuando salen de la fuente o cuando ordenan una comparación que la fuente hace.
- No pedir estilo visual: colores, tipografías, fondos, formas de nodos. En el mapa mental, además, no pedir otro formato de salida (tabla, lista, JSON).

## 7. Audiencia y lengua

- **Audiencia por defecto:** un desarrollador que estudia la clase por su cuenta y quiere entenderla y retenerla. Con *Diapositivas del presentador*: estudiantes a los que el usuario les va a explicar la clase.
- **Español**, tecnicismos en inglés (R11). En Presentación el idioma se elige además en su selector.
- **Sin roleplay** (*"actúa como un senior de 20 años…"*): no aporta nada a un material grounded.

## 8. Lo que el prompt no controla

- **El largo:** en Presentación lo decide **Duración**. No pedir minutos ni número de diapositivas.
- **Qué fuentes entran:** lo decide el selector **Fuentes**.

## 9. Forma del prompt

Corto y en bloques: una línea de audiencia, la lista de temáticas, una línea de énfasis, una de código, una de visuales y, en la presentación, el cierre. Los `[corchetes]` de la plantilla se rellenan con palabras de la propia clase exportada.

## 10. Mapa mental: cada nodo es una consulta (D37, D38, D39)

Al hacer clic en un nodo, NotebookLM escribe en el chat *"Discuss what these sources say about [nodo], in the larger context of [nodo padre]."* El título del nodo **es** la consulta, así que el mapa funciona como un índice que pregunta.

- **Ramas = las temáticas de la clase, nombradas como tema** (*"Regla: formas vs valores"*), en su orden (§4). Nacen de los `##` de la clase: un fragmento delimitado, sin solape con las demás ramas. Cada rama es el contexto de las consultas de sus hojas (*"in the larger context of…"*), y ahí un tema funciona mejor que otra pregunta.
- **Sin número fijo de hojas (D39).** No se pide una cantidad por rama. Una rama con más ideas distintas tiene más hojas; una con pocas, menos. Pedir siempre "N hojas" fuerza a rellenar con preguntas que repiten lo mismo con otras palabras — es la causa más probable de un mapa que se siente inflado.
- **Ninguna hoja repite lo que otra ya pregunta (D39)**, ni dentro de la misma rama ni entre ramas distintas. Si dos preguntas se responderían igual, es una sola.
- **Hojas = preguntas (D38).** El mapa se estudia de forma activa: se lee la pregunta, se intenta responder, y el clic trae la explicación al chat, donde se puede seguir preguntando. Una buena pregunta:
  - **se entiende sola**, sin tener la clase delante: lenguaje claro y sin fragmentos de código (un término o comando corto sí: `tsc`, `any`);
  - es **específica**: un solo concepto, nombrado con su término técnico;
  - es **corta**: cabe en una línea;
  - pide **un porqué, una diferencia, una consecuencia o un cuándo**, no un sí o no;
  - **se responde con la clase**; si la fuente no la cubre, el chat no tiene qué contestar.

  ❌ *"¿Por qué const u: Usuario = await res.json() no comprueba nada?"* — no se entiende sin el código.
  ❌ *"¿Tiempo de ejecución?"* — no dice qué se quiere saber.
  ✅ *"¿Por qué TypeScript no valida los datos que llegan de una API?"*
- **El mapa no carga la explicación ni el código:** los trae el chat al hacer clic. El mapa ordena y pregunta.
- **Mapa en cascada:** el mapa no pasa de 3 niveles (límite fijo de la herramienta). Si una rama queda demasiado densa, se genera otro mapa con esa rama como nodo central.
