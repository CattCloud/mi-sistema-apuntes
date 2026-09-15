---
tipo: temario
tema: arquitectura-software
nivel: 3 — arquitectura de aplicación
modulos: 8
tematicas: 37
estado: EN PROGRESO
---

# 🏛️ Temario — Arquitectura de Software

> La columna vertebral para estudiar **dónde van los límites de un sistema**. No es el curso: es el mapa que decide qué curso sirve.

## Qué es y qué no es

> 📌 **Alcance:** solo **nivel 3 — arquitectura de aplicación**. Cómo se parte un sistema, quién depende de quién, qué responsabilidad va en cada capa, dónde vive el estado y cómo se manejan los errores.

**Fuera de alcance, con dirección:**

| Nivel | Qué es | A dónde va |
|-------|--------|------------|
| 2 — Diseño | SOLID, patrones, clean code | Temario aparte (el nivel de abajo) |
| 4 — System design | Caché distribuido, colas, sharding, escalado | Temario aparte |
| 5 — Arquitectura de IA | Contexto, evals, costo, agentes | Temario aparte (la meta) |

> ⚠️ **Guardián de alcance:** si un tema no cabe en el nivel 3, no se estira el módulo — se anota en `NOTAS.md` y sigue.

## Cómo usarlo

**Se estudia dentro del sistema, temática por temática.** La fuente principal es el propio flujo de generación (P1–P4) con el agente. El temario ya resuelve P1 (el módulo es el tema acotado) y buena parte de P2 (las temáticas son el esqueleto), así que se entra casi directo a **P3⇄P4**.

**Se recorren todas las temáticas, sin obviar ninguna.** No hay marcado previo ni autodiagnóstico: cada temática se desarrolla completa. La pregunta de cada fila no sirve para filtrar, sirve para saber **qué debes poder responder** cuando la sección esté cerrada.

**Mapeo con el flujo Tesla:** `1 módulo = 1 apunte (carpeta con 00_indice.md)` · `1 temática = 1 archivo de sección`. El temario ya *es* el esqueleto (P2). Ver `apuntes/AGENTS.md` (A1) — la densidad se maneja partiendo, no plegando.

**Ciclo por módulo:** generar el apunte sección por sección (P3⇄P4) en `apuntes/arquitectura/[modulo]/` → resolver el caso → cerrar.

**Material externo: opcional y de apoyo.** Videos o docs se anotan en `📚 Recursos` **solo si hicieron falta**. No hay curso que seguir: el temario no es el índice de nadie más.

**Se evalúa por casos, no por cuestionarios.** Cada módulo cierra con un escenario de decisión: eliges una opción y justificas el costo de las otras. La arquitectura *es* decidir — un cuestionario mide si recitas, un caso mide si decides.

**Cada sección deja su piso de retención.** El archivo de cada sección cierra con un bloque `## 🎯 Lo que debiste llevarte` — ver `apuntes/AGENTS.md` (A7). Es mejor retener unas cuantas cosas por lectura que apostar todo al cierre del módulo.

> 💡 **Regla de cierre:** un módulo está ✅ cuando respondes su **caso** sin ayuda. No cuando viste todos los videos. Esa distinción es el punto entero de este archivo.

---

## 📊 Índice

| # | Módulo | Temáticas | Estado | Recursos |
|---|--------|:---------:|--------|----------|
| M1 | Qué es arquitectura (y qué no) | 5 | ✅ | — |
| M2 | Límites: cómo se parte un sistema | 5 | 🔄 | — |
| M3 | Dirección de dependencias | 5 | ⬜ | — |
| M4 | Capas y responsabilidades | 5 | ⬜ | — |
| M5 | Estilos arquitectónicos | 5 | ⬜ | — |
| M6 | Estado: dónde vive y quién lo manda | 4 | ⬜ | — |
| M7 | Errores y fronteras de confianza | 4 | ⬜ | — |
| M8 | Comunicar y decidir arquitectura | 4 | ⬜ | — |

> **Estado:** ⬜ sin empezar · 🔄 en curso · ✅ cerrado
> **Orden:** espiral. Solo M2 → M3 → M4 tienen dependencia real entre sí; el resto se puede tomar por necesidad.

---

## M1 — Qué es arquitectura (y qué no)

> El módulo que evita que compres un curso de SOLID pensando que es arquitectura.

### 🎯 Pregunta que responde

¿Qué convierte una decisión técnica en **arquitectónica**? ¿Y por qué esas se deciden temprano y las otras no?

### 🚫 Qué NO entra

El rol de "arquitecto de software" como carrera, certificaciones y organigramas de equipo. Aquí interesa la **disciplina**, no el puesto.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 1.1 | Decisión arquitectónica vs de diseño | ¿Qué distingue "dónde va este módulo" de "cómo escribo esta clase"? |
| 1.2 | Costo de reversión | ¿Por qué lo caro de cambiar se decide primero? |
| 1.3 | Atributos de calidad | ¿Arquitectura *para qué*: mantener, testear, escalar, cambiar rápido? |
| 1.4 | El trade-off como unidad | ¿Por qué no existe "la arquitectura correcta", solo la adecuada a un contexto? |
| 1.5 | Arquitectura implícita | ¿Qué arquitectura tiene un proyecto donde nadie decidió ninguna? |

### 🧩 Caso

> Te pasan una lista de decisiones tomadas en un proyecto:
>
> **A)** Usar `camelCase` en los nombres de variables
> **B)** Que el frontend hable con el backend por REST y no por GraphQL
> **C)** Extraer la lógica de precios a un módulo propio
> **D)** Usar `map` en vez de un `for` en el listado de productos
> **E)** Guardar las sesiones en la base de datos en vez de en memoria
>
> **1.** ¿Cuáles son arquitectónicas y cuáles no? Justifica con **un solo criterio**, el mismo para todas.
> **2.** Ordénalas de más cara a más barata de revertir dentro de seis meses. ¿Coincide ese orden con tu respuesta anterior?

> 💡 **Por qué este caso:** la parte 2 revela si entendiste el criterio o si solo etiquetaste por intuición. Si tu orden de reversión no coincide con tu clasificación, uno de los dos está mal.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** listar 5 decisiones arquitectónicas que tomaste en Min-Commerce **sin darte cuenta de que lo eran**.

### 📚 Recursos

*(vacío)*

---

## M2 — Límites: cómo se parte un sistema

> Todo lo demás depende de esto. Si los cortes están mal puestos, ninguna capa ni patrón te salva.

### 🎯 Pregunta que responde

Cuando un sistema crece, ¿por dónde se corta? ¿Y cómo sabes que cortaste mal?

### 🚫 Qué NO entra

Cohesión y acoplamiento a nivel de **clase** — eso es nivel 2 (SOLID). Aquí es a nivel de **módulo y componente**.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 2.1 | Módulo, componente, servicio | ¿Cuál es la unidad de la que hablamos y dónde empieza y termina? |
| 2.2 | Cohesión | ¿Qué hace que dos cosas *merezcan* vivir juntas? |
| 2.3 | Acoplamiento y sus tipos | ¿Qué tipo de acoplamiento duele y cuál es inevitable? |
| 2.4 | Corte por capa técnica vs por dominio | ¿`/controllers /services /models` o `/pedidos /catalogo /pagos`? |
| 2.5 | Señales de un límite mal puesto | ¿Qué síntoma te avisa que el corte está mal antes de que sea tarde? |

### 🧩 Caso

> Un e-commerce se puede organizar de dos formas:
>
> **A)** `/controllers`, `/services`, `/repositories`, `/models` — cada carpeta agrupa un tipo técnico
> **B)** `/catalogo`, `/carrito`, `/pedidos`, `/pagos` — cada carpeta agrupa un pedazo de negocio
>
> **1.** Llega este requerimiento: *"agregar descuentos por volumen al carrito"*. En cada organización, ¿cuántas carpetas tienes que abrir?
> **2.** Ahora llega este otro: *"cambiar Prisma por otro ORM"*. ¿Cuál de las dos sufre más?
> **3.** ¿Qué te dice la comparación sobre en qué contexto conviene cada corte?

> 💡 **Por qué este caso:** cada organización gana en un requerimiento y pierde en el otro. Si contestaste que una es mejor a secas, no viste el trade-off.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** identificar el criterio de corte real de FastCRM. ¿Fue decidido o heredado del tutorial?

### 📚 Recursos

*(vacío)*

---

## M3 — Dirección de dependencias

> El módulo que explica por qué tu lógica de negocio no debería saber que Prisma existe.

### 🎯 Pregunta que responde

¿Quién puede importar a quién? Y cuando dos módulos se necesitan mutuamente, ¿cuál de los dos cede?

### 🚫 Qué NO entra

El resto de SOLID, la inyección de dependencias como framework y los contenedores IoC. Aquí solo interesa **hacia dónde apunta la flecha**.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 3.1 | Dirección del import | ¿Qué capa puede importar a cuál, y por qué esa y no la otra? |
| 3.2 | Inversión de dependencias | ¿Cómo haces que el de arriba deje de depender del de abajo? |
| 3.3 | Port y adapter | ¿Cuál de los dos es el contrato y cuál la implementación? |
| 3.4 | Dónde vive la interfaz | ¿En la capa que la usa o en la que la implementa? ¿Por qué importa? |
| 3.5 | Cuándo NO vale la pena | ¿En qué caso invertir dependencias es sobre-ingeniería pura? |

### 🧩 Caso

> Estás armando el checkout de un e-commerce. La regla *"un pedido no se confirma si algún ítem quedó sin stock"* tiene que vivir en algún lado:
>
> **A)** En el componente React del checkout
> **B)** En el route handler que recibe el POST
> **C)** En una función de dominio que no sabe nada de HTTP ni de Prisma
>
> **1.** Elige y justifica el costo de las otras dos.
> **2.** Ahora te dicen que el checkout también se dispara desde un webhook de WhatsApp. ¿Cuál de las tres respuestas sobrevive intacta?
> **3.** ¿En qué tamaño de proyecto la opción **B** sería la decisión correcta?

> 💡 **Por qué este caso:** la parte 2 es la que evalúa de verdad. La 1 se responde de memoria; la 2 solo si entendiste la dirección. Y la 3 evita que salgas dogmático.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** ubicar en Min-Commerce un punto donde la lógica de negocio importa el ORM directo. Diagramar la inversión.
- **Refactor chico:** extraer esa regla a una función de dominio pura.

### 📚 Recursos

*(vacío)*

---

## M4 — Capas y responsabilidades

> Saber que existen cuatro capas es fácil. Saber en cuál va la validación es lo que separa criterio de vocabulario.

### 🎯 Pregunta que responde

Dado un pedazo de lógica cualquiera, ¿en qué capa va — y qué se rompe si lo pones en la de al lado?

### 🚫 Qué NO entra

Los nombres canónicos de cada estilo (eso es M5). Aquí importa la **responsabilidad**, no cómo la bautizó cada autor.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 4.1 | Las capas y su responsabilidad | ¿Qué hace presentación, aplicación, dominio e infraestructura? |
| 4.2 | Dónde va la validación | ¿La de formato, la de negocio y la de integridad van en el mismo sitio? |
| 4.3 | Cruce de límites y DTOs | ¿Por qué no mandar la entidad de la BD directo al frontend? |
| 4.4 | Lógica filtrada | ¿Qué síntoma tiene un controlador que hace demasiado? |
| 4.5 | Cuántas capas necesitas | ¿Cuándo cuatro capas son sobre-ingeniería para un CRUD? |

### 🧩 Caso

> Te dan cinco pedazos de lógica de un CRM. Coloca cada uno en su capa y justifica:
>
> **A)** "El email debe tener formato válido"
> **B)** "Un cliente no puede tener más de 3 etiquetas activas"
> **C)** "Si falla la conexión a Mongo, reintentar dos veces"
> **D)** "Mostrar el teléfono formateado según el país"
> **E)** "Al crear un cliente, enviar un evento a la cola de bienvenida"
>
> **1.** Ubica cada uno.
> **2.** Dos de ellos podrían defenderse en más de una capa. ¿Cuáles, y qué decide el empate?

> 💡 **Por qué este caso:** la parte 2 es el corazón. Los casos limpios los acierta cualquiera; el criterio se ve en los ambiguos.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** en Min-Commerce, rastrear una validación de negocio y ver en cuántas capas está repetida.

### 📚 Recursos

*(vacío)*

---

## M5 — Estilos arquitectónicos

> Lo que la mayoría cree que es "arquitectura". Llega quinto a propósito: sin M2–M4, estos nombres son decoración.

### 🎯 Pregunta que responde

Hexagonal, clean, vertical slice, monolito modular: ¿qué problema resuelve cada uno y **cuál es su factura**?

### 🚫 Qué NO entra

Microservicios como arquitectura distribuida (eso es nivel 4). Aquí solo aparece como **contraste** contra el monolito modular.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 5.1 | Monolito modular | ¿Por qué volvió a ser el default después de la fiebre de microservicios? |
| 5.2 | Hexagonal (ports & adapters) | ¿Qué protege exactamente y de qué? |
| 5.3 | Clean architecture | ¿Qué le agrega a hexagonal y cuánto cuesta esa adición? |
| 5.4 | Vertical slice / feature-based | ¿Por qué desplazó al corte por capas en frontend? |
| 5.5 | Elegir y sobre-ingeniería | ¿Qué señales del proyecto deciden el estilo, y cuándo ninguno aplica? |

### 🧩 Caso

> Tienes que elegir estilo para tres productos distintos:
>
> **A)** Un MVP que debe salir en 3 semanas, un solo dev, futuro incierto
> **B)** Un CRM interno con 4 años de vida esperada, reglas de negocio densas y cambiantes
> **C)** Un panel administrativo que es 90% formularios sobre tablas
>
> **1.** Elige un estilo para cada uno y nombra **qué estás sacrificando** en cada elección.
> **2.** En uno de los tres, el estilo "más profesional" sería la peor decisión. ¿En cuál y por qué?

> 💡 **Por qué este caso:** si aplicaste clean architecture a los tres, el módulo no está cerrado. El criterio es elegir, no acumular capas.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** nombrar el estilo real de FastCRM y de Min-Commerce. ¿Son el mismo? ¿Debieron serlo?

### 📚 Recursos

*(vacío)*

---

## M6 — Estado: dónde vive y quién lo manda

> El módulo más relevante para tu stack. Next.js borró la frontera entre cliente y servidor, y con ella la respuesta obvia a "¿dónde guardo esto?".

### 🎯 Pregunta que responde

Para cada dato del sistema: ¿quién es su dueño, quién puede cambiarlo y quién solo tiene una copia?

### 🚫 Qué NO entra

Caché distribuido, Redis y estrategias de invalidación a escala — nivel 4. Aquí es caché **a nivel de aplicación**.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 6.1 | Fuente de verdad | ¿Quién es dueño de cada dato y quién tiene solo una copia? |
| 6.2 | Estado de servidor vs de cliente | ¿Por qué tratarlos igual causa la mitad de los bugs de UI? |
| 6.3 | La frontera en frameworks full-stack | Con Server Components y server actions, ¿dónde quedó el límite? |
| 6.4 | Persistencia como detalle | ¿Puedes describir tu dominio sin nombrar la base de datos? |

### 🧩 Caso

> En un e-commerce, el carrito puede vivir en cuatro sitios: estado de React, `localStorage`, cookie de sesión, o tabla en Postgres.
>
> **1.** Elige dónde vive **la fuente de verdad** y justifica.
> **2.** El usuario agrega un producto en el celular y abre la laptop. ¿Tu elección aguanta? ¿Y si agregó sin haber iniciado sesión?
> **3.** ¿Qué copias del carrito existen en tu diseño y quién las invalida?

> 💡 **Por qué este caso:** la parte 3 es la trampa. Casi todo el mundo elige bien la fuente de verdad y después olvida que dejó tres copias sueltas sin dueño.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** mapear en Min-Commerce todos los lugares donde vive el estado del carrito.

### 📚 Recursos

*(vacío)*

---

## M7 — Errores y fronteras de confianza

> "Lo resuelvo ad-hoc" es una estrategia de errores. Mala, pero estrategia. Este módulo la reemplaza por una decidida.

### 🎯 Pregunta que responde

Cuando algo falla en el fondo de la pila, ¿quién lo atrapa, quién lo traduce y qué llega al usuario?

### 🚫 Qué NO entra

Herramientas concretas de observabilidad (Sentry, Datadog) y logging distribuido. Aquí es la **estrategia**, no el tooling.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 7.1 | Error esperado vs excepcional | ¿"Stock insuficiente" y "Postgres caído" se manejan igual? |
| 7.2 | Dónde capturar y dónde traducir | ¿Por qué atrapar en cada capa termina ocultando la causa? |
| 7.3 | Frontera de confianza | ¿Qué se valida en cada límite y por qué no basta validar una vez? |
| 7.4 | Fallo parcial | ¿Qué haces cuando 1 de 3 servicios responde mal — todo o nada? |

### 🧩 Caso

> Un endpoint de checkout llama a: validar stock → cobrar con la pasarela → guardar el pedido → enviar el correo de confirmación.
>
> **1.** El correo falla. ¿El endpoint devuelve error? Justifica.
> **2.** La pasarela cobra pero guardar el pedido falla. ¿Qué le dices al usuario y qué queda registrado?
> **3.** ¿En qué capa se decide cada una de esas dos respuestas — y por qué no en la misma?

> 💡 **Por qué este caso:** los cuatro pasos no tienen la misma criticidad, y tratarlos igual es el error más caro y más común de esta lista.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** revisar el manejo de errores del flujo de checkout de Min-Commerce contra las respuestas del caso.

### 📚 Recursos

*(vacío)*

---

## M8 — Comunicar y decidir arquitectura

> Una decisión que nadie registró se vuelve a discutir cada seis meses. Este módulo cierra el ciclo — y conecta con Spec-Driven.

### 🎯 Pregunta que responde

¿Cómo se registra el **porqué** de una decisión, y cómo se dibuja un sistema para que alguien más lo entienda?

### 🚫 Qué NO entra

Herramientas de diagramado y notación UML completa. Aquí es qué comunicar, no con qué app.

### 📋 Temáticas

| # | Temática | Pregunta que debes poder responder |
|---|----------|-------------------------------------|
| 8.1 | ADR (Architecture Decision Record) | ¿Qué campos tiene y por qué el más importante es "alternativas descartadas"? |
| 8.2 | Niveles de diagrama (C4) | ¿Qué diagrama para qué audiencia — negocio, dev nuevo, tú en 6 meses? |
| 8.3 | Diagramar lo que cambia | ¿Por qué un diagrama exhaustivo se pudre y uno parcial no? |
| 8.4 | La arquitectura dentro del spec | En Spec-Driven, ¿qué va en `/specify` y qué en `/plan`? |

### 🧩 Caso

> Decidiste que FastCRM use Mongo **y** Postgres a la vez. Seis meses después entra un dev nuevo y pregunta por qué no está todo en Postgres.
>
> **1.** Escribe el ADR que debiste haber escrito. ¿Qué campo te cuesta más llenar hoy?
> **2.** ¿Qué diagrama le muestras al dev nuevo, y en qué se diferencia del que le mostrarías al CEO?

> 💡 **Por qué este caso:** el campo que más cuesta llenar siempre es "alternativas descartadas", porque es el único que exige recordar el contexto y no solo el resultado. Ahí está el valor entero del ADR.

### ⏭️ Para repaso *(no ahora)*

- **Auditoría:** revisar `sistema/decisiones/decision_final_md_local.md` — ya es un ADR. ¿Qué le falta según 8.1?

### 📚 Recursos

*(vacío)*

---

## Notas

- **Este temario es la fuente única** del estudio de arquitectura nivel 3. Los recursos externos se anotan **por módulo**, nunca al revés.
- **Los bloques `⏭️ Para repaso`** están escritos a propósito aunque no se hagan ahora. Se activan en la etapa de repaso (`sistema/metodologia_repaso.md`) con los apuntes ya hechos. Están aquí para que "más adelante" no se convierta en "nunca".
- **Los casos están ambientados** en dominios conocidos (e-commerce, CRM) para que la decisión duela. No requieren abrir código ni escribir una línea.
- **Si un módulo se infla** con temas nuevos, no se estira: va a `NOTAS.md`.
