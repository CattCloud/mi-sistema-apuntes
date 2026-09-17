

# 🧠 Guía Experta: Mapas Mentales Técnicos en NotebookLM

El motor de Mapas Mentales de NotebookLM no es un chat de IA tradicional. El campo de texto que ves en la interfaz se inyecta directamente en un "Prompt de Sistema" oculto diseñado estrictamente para estructurar datos en formato de árbol (nodos y ramas).

Para que el mapa refleje la profundidad de tus apuntes `.md` y no se quede en un resumen superficial, debes redactar las instrucciones pensando en **jerarquía, filtrado y relaciones lógicas**.

## 1. Configuración de la Interfaz (El paso crítico)

Antes de escribir una sola palabra, revisa la UI:

* **Menú desplegable "Fuentes":** Por defecto, suele decir "1 fuente". Si tu módulo de estudio está dividido en múltiples archivos (ej. `M1-01...`, `M1-02...`, `M1-03...`), **debes hacer clic y seleccionar todas las fuentes relevantes**. Si no lo haces, la IA generará un mapa incompleto, ignorando el resto de tus apuntes.

## 2. Anatomía del Prompt: ¿Qué va en la caja de texto?

El campo *¿Cuál debería ser el tema?* se utiliza como un **Lente Semántico**. Le dice a la IA con qué "gafas" debe leer tus documentos. Tu prompt debe contener estos 3 elementos:

* **El Nodo Central (Raíz):** Define explícitamente de dónde nace el mapa. *(Ej: "El nodo central debe ser: 'Arquitectura y Ejecución de TypeScript'").*
* **El Filtro de Enfoque:** Qué quieres incluir y qué quieres ignorar. *(Ej: "Céntrate en el proceso de compilación y las reglas estrictas, ignorando la sintaxis básica").*
* **La Lógica de Ramificación:** Cómo quieres que se agrupen los temas. *(Ej: "Agrupa los conceptos en 'Problemas de JS', 'Soluciones de TS', y 'Flujo del Compilador'").*

## 3. Reglas Estrictas: Lo que SÍ y NO debes hacer

🔴 **LO QUE ROMPE EL MAPA (Evitar a toda costa)**

* **Cero instrucciones visuales:** No pidas "nodos cuadrados", "colores rojos", o "líneas punteadas". La IA no dibuja el mapa, solo genera el texto. Pedir estilos visuales corrompe el contenido de los nodos.
* **Cero formatos alternativos:** No pidas que te devuelva una tabla, un JSON o una lista de viñetas. Entrará en conflicto con el motor de renderizado gráfico de la herramienta.
* **Roleplay innecesario:** Evita el clásico "Actúa como un programador senior de 20 años de experiencia...". Ve directo al grano; los tokens son valiosos para leer tu código.

🟢 **LO QUE POTENCIA EL MAPA (Mejores prácticas)**

* **Inclusión de Código en Nodos:** Los mapas mentales no soportan grandes bloques de código multicapa, pero **sí soportan fragmentos de sintaxis (inline code)**. Pide explícitamente: *"Incluye los nombres exactos de los comandos de terminal (ej. tsc --init) y palabras clave de código en los nodos finales"*.
* **Respeto por tu estructura Markdown:** Si tus apuntes ya tienen una progresión lógica (H1, H2, H3), pídele a la herramienta: *"Respeta la jerarquía de títulos de mis archivos Markdown para crear los niveles de las ramas"*.

## 4. ejemplos

Aquí tienes tres enfoques tácticos según el objetivo de tu sesión de estudio:

### A. Plantilla de Visión Arquitectónica (Para resumir un módulo completo)

> "Genera un mapa mental jerárquico que estructure todos los conceptos del módulo actual. El nodo central es 'Fundamentos de TypeScript'. Crea ramas principales basadas en la jerarquía de mis archivos Markdown: 1) Problemas de JS vs Soluciones TS, 2) El concepto de Type Erasure (Borrado de tipos), 3) Diferencias entre Compile-time y Runtime. Asegúrate de que los nodos finales contengan definiciones precisas y conceptos técnicos clave para servir como material de repaso rápido."

### B. Plantilla Comparativa (Para contrastar conceptos, ej. Compile-time vs Runtime)

> "Estructura el mapa mental enfocándote exclusivamente en las diferencias operativas dentro del ecosistema TypeScript. El nodo central debe ser 'Ciclo de Vida del Código'. Ramifica en dos grandes bloques: 'Tiempo de Compilación (tsc)' y 'Tiempo de Ejecución (Node/Navegador)'. Extrae las reglas específicas de los apuntes sobre qué operaciones ocurren en cada fase, destacando que TS verifica formas y no valores. Usa palabras clave técnicas en los nodos."

### C. Plantilla de Flujo y Configuración (Orientado a la práctica)

> "Crea un mapa mental procedimental. El nodo central es 'Flujo de Trabajo y Configuración'. Extrae la información sobre cómo se ejecuta un proyecto: desde la escritura del código fuente, el rol del archivo 'tsconfig.json' y sus banderas estrictas, hasta el paso por el compilador 'tsc' y la salida final en JavaScript. En los nodos más externos, incluye los nombres exactos de los comandos de terminal o configuraciones mencionadas en los documentos."



PROBLEMA DE PROMPTS que teniamos

Tienes una excelente intuición técnica, y diste en el clavo. Ese es el problema principal cuando se aplican técnicas genéricas de "Prompt Engineering" a herramientas de UI cerradas.

Para entender exactamente qué poner en el campo **"¿Cuál debería ser el tema?"**, hay que entender cómo funciona NotebookLM por debajo.

Ese cajón de texto **no es un chat libre con el LLM**. Es una variable que se inyecta dentro de un prompt de sistema o "System Prompt" (invisible para ti) que ya está altamente estructurado en el backend. El backend de NotebookLM probablemente tiene una instrucción maestra que dice algo así como:

> *"Analiza los documentos adjuntos y genera una estructura de datos en formato árbol (o JSON) que la interfaz gráfica pueda renderizar como un mapa mental. El usuario ha solicitado que el enfoque semántico de este mapa sea: **[LO QUE TÚ ESCRIBES EN LA CAJA]**."*

Sabiendo esto, aquí tienes la regla de oro sobre lo que **SÍ funciona** y lo que **DEBES EVITAR** para no obstaculizar o "romper" la generación del mapa.

### Lo que NUNCA debes poner en ese campo (Obstaculizadores)

1. **Instrucciones visuales o de interfaz:** El LLM no dibuja el mapa, solo genera el texto estructurado. La UI de NotebookLM se encarga de dibujar los nodos.
* ❌ *Incorrecto:* "Usa nodos cuadrados", "pon las ramas en color rojo", "usa letras grandes para el título". El LLM intentará meter esto como texto dentro de los nodos y arruinará el contenido.


2. **Formatos de salida distintos:** El sistema ya está forzado a devolver la estructura de un mapa mental.
* ❌ *Incorrecto:* "Devuélveme esto en una tabla de Markdown", "Dame una lista de viñetas". Esto entra en conflicto con el prompt del sistema y genera errores de renderizado.


3. **Roleplay excesivo ("Actúa como..."):** El modelo ya está condicionado para extraer información de tus fuentes. Ponerle un personaje largo solo le quita "tokens" de atención a tus documentos.
* ❌ *Incorrecto:* "Actúa como un desarrollador Senior con 20 años en Microsoft que está dando una conferencia magna sobre TypeScript..."



### Lo que REALMENTE va en ese campo (Optimizadores)

Ese campo está diseñado exclusivamente para **Filtrar (Scope)**, **Enfocar (Lens)** y **Definir la Relación (Mapping)** de la información de tus archivos Markdown.

Aquí tienes los 3 tipos de instrucciones que el backend sí procesa a la perfección, aplicados a tus apuntes de TypeScript:

**1. El Lente o Eje Semántico (Cómo quieres que agrupe la info)**
En lugar de un resumen general, le dices bajo qué perspectiva debe leer los archivos.

* ✅ *Qué poner:* "Centrar el mapa exclusivamente en las diferencias y contrastes entre el comportamiento en tiempo de compilación (compile-time) frente al tiempo de ejecución (runtime)."
* *Por qué funciona:* El LLM buscará en tus .md específicos (como tu archivo `M1-03_compile-time-vs-runtime.md`) y forzará que las ramas del mapa sean comparativas, en lugar de secuenciales.

**2. El Filtro de Inclusión / Exclusión**
Sirve para aislar componentes específicos de tus apuntes si no quieres que el mapa se sature con toda la teoría.

* ✅ *Qué poner:* "Extraer únicamente los comandos de terminal, el flujo de ejecución con 'tsc' y las banderas de configuración estricta de 'tsconfig', ignorando los conceptos introductorios."
* *Por qué funciona:* Limita la búsqueda del modelo a la información más procedimental y técnica, ideal si estás preparando material para explicar la configuración del entorno en una sesión de laboratorio.

**3. La Estructura Lógica Deseada (El "Hilo Conductor")**
Le indica al LLM cómo organizar la jerarquía de los nodos de mayor a menor.

* ✅ *Qué poner:* "Estructurar los conceptos en un formato de 'Problema - Solución'. El primer nivel debe mostrar los problemas que tenía JavaScript, y las ramas secundarias deben explicar cómo las características estáticas de TypeScript resuelven esos problemas específicos."

**En resumen:** En ese campo no le hables a la herramienta sobre *cómo dibujar* el mapa, háblale a tu **información**. Dile al LLM con qué "gafas" debe leer tus archivos `.md` para extraer los datos.




