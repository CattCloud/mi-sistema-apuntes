---
tipo: temario
tema: cloud-for-developers
nivel: 2 — dev que opera lo suyo
modulos: 9
tematicas: 47
video_filtrado: ~13 h (de 39h33 del curso)
estado: EN PROGRESO
---

# ☁️ Temario — Cloud for Developers

> Nivel 2: **levantar y operar lo tuyo**. Ni "hago push a Vercel y rezo", ni diseñar VPCs para una empresa.

## Qué es y qué no es

> 📌 **Alcance:** desplegar, persistir, guardar archivos, manejar secretos, ver logs, controlar la factura y procesar trabajo asíncrono. Todo con una app de Node/Next como sujeto.

**Los tres niveles, para ubicarte:**

| Nivel | Qué sabes hacer | |
|-------|-----------------|---|
| 1 — Consumidor de plataforma | Push a Vercel y listo | Insuficiente para apps con LLM |
| **2 — Dev que opera lo suyo** | Contenedor, BD gestionada, storage, secretos, factura | ✅ **Este temario** |
| 3 — Arquitecto / DevOps | Diseño de VPC, IAM a escala, IaC, alta disponibilidad | Fuera. Es lo que evalúa el SAA |

> ⚠️ **Por qué el nivel 1 no alcanza:** las apps con LLM rompen sus supuestos — respuestas que superan el timeout de una función, streaming, jobs en background, costo por llamada. Ahí te estrellas sin saber por qué.

## Cómo usarlo

**Se recorren todas las temáticas.** El marcado ✅/🔄/❌ **no filtra** qué se estudia — calibra qué tan profunda va cada sección del apunte.

**Mapeo con el flujo Tesla:** `1 módulo = 1 apunte (carpeta con 00_indice.md)` · `1 temática = 1 archivo de sección`. Ver `manual_apuntes.md` §1.1 — la densidad se maneja partiendo, no plegando.

**Fuentes:**

| Fuente | Qué es | Dónde |
|--------|--------|-------|
| **Curso AWS DVA** | Procedimiento visual y detalle de servicios | `silabo_curso_aws_dva.md` — filtrado clase por clase. Las referencias `S5`, `S16` apuntan ahí |
| 📓 **Notion previo** | **La capa conceptual que el curso salta** — qué es cloud, IaaS/PaaS/SaaS, servicios core | `apuntes/cloud/_input/notion/` — materia prima, no tier referencia |
| **El agente** | Todo lo que ninguna de las dos cubre | — |

**Integración con el curso** *(protocolo completo en `sistema/prompts/integracion_curso_sistema.md`)*:

```
1. El temario dice qué secciones del curso ver   ← el temario fija el ALCANCE
2. Veo el contenido
3. Anoto en crudo: qué NO entendí, qué me sorprendió, qué contradice lo que creía
4. Paso transcripción + notas crudas al agente
5. Se genera el apunte del MÓDULO, cubriendo TODAS sus temáticas
6. Cierre: lo hago en consola sin el video delante
```

> ⚠️ **El alcance lo fija el temario, nunca las notas ni la transcripción.** El apunte cubre las temáticas del módulo completas, se hayan mencionado o no en el video.
>
> **Qué hacen las notas crudas:** calibran **profundidad**, no cobertura. Donde anotaste "no entendí", esa sección va más honda; donde anotaste "yo creía que era X", eso alimenta un par `[MITO]`.
>
> **La prueba:** si no anotas nada, el apunte sale igual de completo — solo menos afinado a ti.

> 🚫 **Qué NO entra al apunte:** marketing del proveedor (quién lo usa, casos de éxito), historia corporativa, meta-comentario del curso (*"la interfaz cambia seguido"*), logística y preparación de examen. Solo contenido que cambie algo que vas a decidir o hacer.

> 📊 **Diapositivas vs. interfaz:** el curso alterna. Las clases de slides alimentan `[DEF] [DOLOR] [TABLA] [FLUJO] [ANALOGÍA]`; las de consola alimentan `[CONSOLA] [COSTO_SERVICIO]`. No se fuerza `[CONSOLA]` sobre una clase donde el instructor nunca abrió la consola.

---

## 📊 Índice

> **El orden de los números ES el orden de estudio.** Está ordenado por dependencia real: primero lo conceptual, luego lo que toda práctica necesita, después construir, y al final operar y componer.

| # | Módulo | Temáticas | Video | Estado |
|---|--------|:---------:|-------|--------|
| **B1** | **Fundamentos de Cloud** | 4 | ~24 min | ✅ |
| **B2** | **Costos y facturación** | 4 | ~12 min | ✅ |
| **B3** | **Identidad** — quién eres y qué puedes hacer | 5 | ~48 min | ⬜ |
| B4 | Contenedores y Docker | 6 | ~1 h 30 | ⬜ |
| B5 | Serverless: funciones y API | 7 | ~2 h 28 | ⬜ |
| B3b | Secretos — dónde vive una clave *(conserva el 3 por ser la otra mitad de Identidad; se estudia aquí)* | 5 | ~1 h 18 | ⬜ |
| B6 | Datos: base gestionada y storage | 6 | ~1 h 46 | ⬜ |
| B7 | Redes mínimas | 6 | ~2 h 15 | ⬜ |
| B8 | Despliegue, logs y observabilidad | 4 | ~1 h 19 | ⬜ |
| B9 | Trabajo asíncrono para apps con IA | 5 | ~1 h 17 | ⬜ |

**Por qué este orden:**

- **B1–B2 primero** porque son conceptuales y baratos, y porque gastar dinero sin entender la factura es el error más caro del principiante.
- **B3 tercero** aunque no sea "lo divertido": toda práctica posterior necesita un rol. Sin esto te trabas en la primera.
- **B3b se separó de B3 y se retrasó a propósito.** Identidad y secretos responden preguntas distintas, y la de los secretos es prematura: aprender dónde guardar una contraseña de base de datos **antes de tener la base de datos** es aprender en abstracto. Se estudia justo antes de B6, cuando ya hay algo real que esconder.
- **B4–B6 son el bloque de construcción.** Aquí despliegas algo real por primera vez.
- **B7 séptimo, no primero.** Casi todos los cursos abren con redes; es lo más reglamentario y lo que menos criterio exige. Se hace cuando ya tienes algo desplegado al que ponerle dominio — ahí sí motiva.
- **B8–B9 al final** porque operan y componen lo que ya existe.

---

## B1 — Fundamentos de Cloud

> Lo que el curso da por sabido. Es "Introducción a **AWS**", no "Introducción a **Cloud**".

### 🎯 Pregunta que responde

¿Qué estás alquilando exactamente cuando "usas la nube", y hasta dónde llega tu responsabilidad?

### 🚫 Qué NO entra

Comparativa AWS vs Azure vs GCP · modelos de despliegue (public/private/hybrid/multi-cloud) · edge cloud · historia del cloud computing. No cambian ninguna decisión tuya hoy.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 1.1 | **Qué es la nube y qué alquilas** | ¿Qué es un servicio gestionado y qué dejas de administrar al usarlo? | | | |
| 1.2 | **Modelos de servicio: IaaS, PaaS, SaaS** | ¿Dónde termina tu responsabilidad en cada uno? | | | |
| 1.3 | Modelo de responsabilidad compartida | ¿Qué asegura el proveedor y qué te toca a ti? | | | |
| 1.4 | Regiones y zonas de disponibilidad | ¿Por qué importa en qué región despliegas? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| 📓 **Notion** — `TEMA 1 ¿Qué es Cloud Computing?` | **La fuente principal de 1.1** | — |
| 📓 **Notion** — `TEMA 2 Modelos de Servicio` | **La fuente principal de 1.2** | — |
| 📓 **Notion** — `TEMA 2` §Responsabilidad compartida | **La fuente principal de 1.3** — con tabla por modelo de servicio | — |
| **S3** — Introducción a AWS | **completa** (4 de 4) | 22 |
| **S4** — IAM *(opcional)* | 1 clase — redundante con Notion | 2 |

**Clases exactas:**

- **S3** → `Visión general de la Cloud de AWS` · `Infraestructura global de AWS - Regiones y AZ` · `Recorrido por la consola y los servicios de AWS` · `Acerca de los cambios en la interfaz de usuario en el curso`
- **S4** *(opcional)* → `Modelo de responsabilidad compartida para IAM`

> ⚠️ **1.1, 1.2 y 1.3 no salen del video.** El curso es "Introducción a AWS", no "Introducción a Cloud": da por sabido qué es la nube, qué es IaaS/PaaS/SaaS y cómo se reparte la responsabilidad. Las tres salen de Notion.
>
> 💡 En 1.3 la versión de Notion es **mejor que la del curso**: ata la responsabilidad a los modelos de servicio, conectando 1.3 con 1.2. La clase de AWS da el diagrama genérico suelto.

> ✅ **B1 no depende de ningún video pendiente.** Con S3 visto, está completo.

### 🛠️ Práctica en consola

> **Predice antes de mirar.** Haz la lista de los recursos que ya tienes creados —usuario IAM, grupo, política propia, presupuesto, clave de acceso, rol— y marca cuáles **seguirán visibles** al cambiar de región y cuáles **van a desaparecer**. Escribe el porqué de cada uno *antes* de tocar el selector.
>
> Después cambia de región y compara con tu lista. Por cada fallo, di qué criterio aplicaste mal —global vs. regional—, no *"se me pasó"*.
>
> Cierra respondiendo: ¿en qué región estás creando cosas, y cuál de los cuatro criterios de elección la justifica?

### 🧩 Caso de decisión

> Te ofrecen tres formas de tener tu app de Node corriendo:
>
> **A)** Un servidor virtual donde tú instalas Node, el sistema operativo y los parches
> **B)** Una plataforma donde subes el código y ella se encarga del resto
> **C)** Un servicio que ya existe y solo lo usas por API
>
> **1.** Nombra el modelo de cada una (IaaS / PaaS / SaaS).
> **2.** En cada caso, ¿qué falla es **tuyo** y qué falla es **del proveedor**?
> **3.** Si tu app deja de funcionar por un parche de seguridad no aplicado — ¿en cuál de las tres es culpa tuya?

### 📚 Recursos

*(vacío)*

---

## B2 — Costos y facturación

> El módulo que evita la factura sorpresa. Va segundo porque todo lo que sigue cuesta dinero.

### 🎯 Pregunta que responde

¿Cómo te cobran, qué dispara una factura inesperada, y cómo lo sabes **antes** de desplegar?

### 🚫 Qué NO entra

Optimización de costos a escala, instancias reservadas, spot, savings plans. Nivel 3.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 2.1 | **Cómo se factura la nube** | ¿Qué se cobra por hora, por request y por GB de **salida**? | | | |
| 2.2 | Free tier y sus trampas | ¿Qué cubre la capa gratuita, hasta cuánto, y cuándo caduca? | | | |
| 2.3 | **El gatillo de la factura sorpresa** | ¿Cuáles son los tres costos que la gente olvida hasta que llega el cobro? | | | |
| 2.4 | **Estimar antes de desplegar** | ¿Cómo calculas el costo mensual de una arquitectura antes de construirla? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S5** — EC2 | 1 clase ⭐ | 10 |
| **S32** — Limpieza final | **completa** (2 de 2) | 2 |
| **El agente** | **2.3 y 2.4 completas** — el curso da la herramienta, no el criterio | — |

**Clases exactas:**

- **S5** → ⭐ `Configuración de AWS Budgets` *(9:42)*
- **S32** → `Limpieza final de AWS` *(1:06)* · `Lista de limpieza` *(0:31)*

> ⚠️ **Hueco declarado:** el curso enseña a poner una alerta, no a estimar. `2.4` es enteramente nuestra.

### 🛠️ Práctica en consola

> **Estima a ciegas, después compara.** Sin abrir la calculadora ni los apuntes: escribe las cuatro unidades de cobro y estima la factura mensual del escenario del caso con el método completo (unidades → volumen → precio → total → forma).
>
> Después contrasta con la calculadora oficial y con el desglose real de tu cuenta. **Explica cada desviación mayor al 20%** — el número final importa menos que saber por qué te equivocaste.
>
> Deja la alerta de presupuesto con sus **dos números** (previsto al 80%, tope 1,5–2×) y di por qué no va en el estimado exacto.

### 🧩 Caso de decisión

> Tu gestor de correos con IA va a procesar 10.000 correos al mes. Cada uno dispara una llamada a un LLM, guarda 2 KB de resultado y sirve una interfaz web.
>
> **1.** Lista todos los conceptos que te van a cobrar. ¿Cuál sospechas que domina la factura?
> **2.** Uno de los costos mayores **no es del proveedor de nube**. ¿Cuál, y por qué se olvida siempre?
> **3.** Estima el total mensual con el cálculo a la vista. ¿En qué monto pondrías la alerta y por qué no en el estimado exacto?

### 📚 Recursos

*(vacío)*

---

## B3 — Identidad

> Quién eres y qué puedes hacer. Va tercero porque toda práctica posterior necesita un rol — sin esto te trabas en la primera.

### 🎯 Pregunta que responde

¿Cómo se autentica y autoriza algo —una persona o un servicio— ante AWS, y cómo le doy exactamente los permisos que necesita y ni uno más?

### 🚫 Qué NO entra

STS, federación, Directory Services, Organizations, IAM a escala de empresa. **Y todo lo de secretos y cifrado, que se fue a B3b.** La CLI entra solo como superficie de práctica, no como tema: su estudio a fondo queda en `NOTAS.md`.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 3.1 | **Usuario, grupo, política** | ¿Cuál es la unidad de permiso y cómo se compone? | | | |
| 3.2 | **Rol vs usuario** | ¿Por qué tu código en producción NO debe usar claves de acceso? | | | |
| 3.3 | Menor privilegio en la práctica | ¿Cómo escribes una política que permita solo lo necesario? | | | |
| 3.4 | Proteger la cuenta: MFA y herramientas de auditoría | ¿Cómo dejas de operar como root y cómo sabes quién puede qué? | | | |
| 3.5 | La CLI — donde una credencial se vuelve concreta | ¿Dónde vive tu clave cuando usas la terminal, y qué pasa si se filtra? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S4** — IAM y CLI ✅ *visto* | La sección completa filtrada — usuarios, grupos, políticas, roles, MFA, CLI, buenas prácticas | 42 |
| 📸 **Capturas propias** | La consola actual, que **no coincide** con la del video | — |
| **S5** — EC2 *(opcional)* | `Demostración de roles de instancias EC2` — refuerza 3.2 | 6 |
| 📓 **Notion** — `Servicios Core SECURITY & IDENTITY` | capa conceptual | — |

**Clases exactas (S4):** `Introducción a IAM: Usuarios, Grupos, Políticas` · `Usuarios y Grupos - Práctica` · `Acceso como usuario IAM - Práctica` · `Políticas IAM` · `Políticas IAM - Práctica` · `IAM MFA` · `Claves de acceso, CLI y SDK` · `Configuración de la CLI en Windows` · `Práctica de la CLI` · ⭐ `Roles de IAM para los servicios de AWS` · ⭐ `Roles de IAM - Práctica` · `Herramientas de seguridad de IAM` · `Buenas prácticas` · `Modelo de responsabilidad compartida para IAM` · `Resumen`

### 🛠️ Práctica en consola

> Dejar de operar como root: crear tu propio usuario con permisos, activar MFA, y configurar la CLI para que responda como ese usuario.
>
> Después: crear un **rol para un servicio** y comprobar que ese servicio puede hacer algo que antes no podía.
>
> **Y rómpelo:** quita la política del rol y **predice por escrito qué mensaje vas a ver** antes de volver a intentarlo. Comprueba. Al terminar, borra lo que creaste.

### 🧩 Caso de decisión

> Tu app corre en un servidor y necesita leer archivos de un bucket. Un compañero propone: crear un usuario IAM, generar una clave de acceso, y ponerla en el `.env` del servidor.
>
> **1.** ¿Qué está mal en esa propuesta, y qué haces tú en su lugar?
> **2.** Tu script **local**, en tu laptop, también necesita leer ese bucket. ¿Aplica la misma solución? ¿Por qué?
> **3.** La política que otorgas, ¿qué debe permitir exactamente? ¿Por qué "acceso completo a S3" es una respuesta **cara**, si funciona igual?

### 📚 Recursos

*(vacío)*

---

## B3b — Secretos

> Dónde NO van tus API keys. Se separó de B3 y se retrasó a propósito: sin una base de datos ni una app desplegada, esto se aprende en abstracto. Se estudia **justo antes de B6**.

### 🎯 Pregunta que responde

¿Dónde vive una clave que nadie debe ver, y cómo la lee mi código sin que esté escrita en ninguna parte?

### 🚫 Qué NO entra

Políticas de claves KMS, CloudHSM, rotación automática avanzada, cifrado en tránsito a fondo.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 3b.1 | Cadena de credenciales del SDK | ¿Cómo encuentra el SDK tus credenciales sin que se lo digas? | | | |
| 3b.2 | **Env vars vs gestor de secretos** | ¿Cuándo basta una variable de entorno y cuándo necesitas un gestor? | | | |
| 3b.3 | **Parameter Store vs Secrets Manager** | ¿Cuál eliges, y qué te cuesta cada uno? | | | |
| 3b.4 | Cifrado, lo mínimo | ¿Qué significa "cifrado en reposo" y quién tiene la llave? | | | |
| 3b.5 | Identidad de tus usuarios ≠ identidad de tu app | ¿Por qué Cognito no es IAM? *(solo la intro)* | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S30** — KMS y SSM ⭐ | filtrada — *Cifrado 101* · *KMS* · ⭐ *Parameter Store* · ⭐ *Secrets Manager* · comparativa | 50 |
| **S12** — CLI, SDK | ⭐ *SDK* · ⭐ *Cadena de credenciales* · *Perfiles de la CLI* · ⭐ *Backoff exponencial* | 18 |
| **S27** — Cognito | solo intro (3 de 9) | 10 |

### 🛠️ Práctica en consola

> Guardar una API key en SSM Parameter Store y leerla desde código — **usando un rol**, sin ninguna clave escrita en el repo ni en el código.

### 🧩 Caso de decisión

> Tu app necesita: la API key de Anthropic, la contraseña de Postgres, la URL pública del frontend y un flag `DEBUG`.
>
> **1.** Clasifica los cuatro: env var, gestor de secretos, o código. Justifica cada uno.
> **2.** Uno de ellos **rota** cada 30 días. ¿Cuál, y qué cambia eso en tu decisión?
> **3.** ¿Por qué un `.env` en el repo es peor que un `.env` en el servidor, si en ambos casos el valor está en texto plano?

### 📚 Recursos

*(vacío)*

---

## B4 — Contenedores y Docker

> El módulo más transferible del temario. Docker no es de AWS — te lo llevas a cualquier nube, o a ninguna.

### 🎯 Pregunta que responde

¿Cómo empaqueto mi app para que corra igual en mi laptop y en un servidor que nunca vi?

### 🚫 Qué NO entra

Kubernetes/EKS, autoescalado de contenedores, colocación de tareas, service mesh. Nivel 3.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 4.1 | Qué problema resuelve un contenedor | ¿Qué significa "en mi máquina funciona" y cómo lo mata Docker? | | | |
| 4.2 | **Imagen vs contenedor** | ¿Cuál es la plantilla y cuál la instancia corriendo? | | | |
| 4.3 | Dockerfile: construir tu imagen | ¿Cómo empaquetas una app de Node en una imagen? | | | |
| 4.4 | Registro de imágenes (ECR) | ¿Dónde vive una imagen para que el servidor la pueda bajar? | | | |
| 4.5 | Orquestador: qué hace ECS/Fargate | ¿Qué te ahorra frente a correr Docker a mano en una VM? | | | |
| 4.6 | Definición de tarea | ¿Dónde declaras CPU, memoria, puertos y variables de entorno? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S5** — EC2 | 2 clases | 21 |
| **S16** — ECS, ECR y Fargate ⭐ | 10 de 16 | 69 |
| 📓 **Notion** — `Servicios Core Cloud y Compute` | capa conceptual | — |

**Clases exactas:**

- **S5** → `Fundamentos de EC2` · `Crear una Instancia EC2 con datos de usuario para tener un Sitio Web - Práctica`
- **S16** → ⭐ `Introducción a Docker` · `Amazon ECS` · `IMPORTANTE: CAMBIOS EN LA UI DE ECS` · `Creación de Cluster ECS - Práctica` · ⭐ `Creación del servicio ECS - Práctica` · `Amazon ECS - Actualizaciones continuas` · `Definiciones de tareas de Amazon ECS - Inmersión profunda` · `Definiciones de tareas de Amazon ECS - Práctica` · ⭐ `Amazon ECR` · ⭐ `Amazon ECR - Práctica`

> ⚠️ **Prerrequisito de la práctica:** exponer el servicio necesita abrir un puerto. Ver `S5 — Grupos de seguridad` (18 min); el tema se estudia a fondo en **B7**.

### 🛠️ Práctica en consola

> Empaquetar **una app tuya real** (FastCRM o Min-Commerce) en una imagen Docker, subirla a ECR y levantarla en Fargate. Sin el video.
>
> Criterio de éxito: la URL responde.

### 🧩 Caso de decisión

> Tienes que desplegar tres cosas distintas:
>
> **A)** Una API de Node que responde en ~200 ms y recibe tráfico constante
> **B)** Un script que corre una vez al día y procesa un CSV
> **C)** Un worker que llama a un LLM y a veces tarda 4 minutos
>
> **1.** ¿Cuál va en contenedor y cuál no? Justifica.
> **2.** Para el caso C, ¿qué problema específico tendría una función serverless? *(Si no lo sabes aún, vuelve tras B5.)*

### 📚 Recursos

*(vacío)*

---

## B5 — Serverless: funciones y API

> Donde el LLM te va a romper los supuestos. Los límites de este módulo definen tu arquitectura de producto.

### 🎯 Pregunta que responde

¿Qué gano y qué renuncio al no tener servidor — y dónde están exactamente las paredes?

### 🚫 Qué NO entra

SAM, CDK, Lambda@Edge, versiones y alias, integración con CloudFormation.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 5.1 | Qué es serverless y qué renuncias | ¿Qué dejas de controlar a cambio de no administrar servidores? | | | |
| 5.2 | Modelo de ejecución | ¿Qué son el handler, el `event` y el `context`? | | | |
| 5.3 | Invocación síncrona vs asíncrona | ¿Quién espera la respuesta en cada caso? | | | |
| 5.4 | **Límites: timeout, memoria, payload** | ¿Cuánto puede tardar una función, y qué pasa al llegar al tope? | | | |
| 5.5 | Cold start y concurrencia | ¿Por qué la primera llamada es lenta y qué la empeora? | | | |
| 5.6 | Dependencias y empaquetado | ¿Cómo metes `node_modules` en una función? ¿Y si pesa 300 MB? | | | |
| 5.7 | **Contenedor vs función: cuándo cada uno** | ¿Qué señal del proyecto decide entre B4 y B5? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S21** — Lambda | 27 de 48 | 95 |
| **S23** — API Gateway | 11 de 21 | 53 |

**Clases exactas:**

- **S21** → `Introducción a la sección` · `Introducción a Serverless` · `Visión general de AWS Lambda` · `AWS Lambda - Práctica` · `Invocaciones síncronas de Lambda` · `Invocaciones síncronas - Práctica` · ⭐ `Invocaciones asíncronas de Lambda y DLQ` · `Invocaciones asíncronas - Práctica` · `Lambda y CloudWatch Events / EventBridge` · `Notificaciones de eventos de Lambda y S3` · `Mapeo de fuentes de eventos de Lambda` · ⭐ `Mapeo de fuentes de eventos (SQS) - Práctica` · `Objetos de evento y de contexto` · `Permisos Lambda - Roles IAM y políticas de recursos` · `Permisos Lambda - Práctica` · ⭐ `Variables de entorno Lambda` · `Variables de entorno - Práctica` · `Lambda en VPC` · ⭐ `Rendimiento de la función Lambda` · `Capas Lambda` · `Concurrencia Lambda` · `Dependencias externas de Lambda` · `Dependencias externas - Práctica` · `Imágenes de contenedores Lambda` · `URL de la función lambda` · ⭐ `Límites de Lambda` · `Buenas prácticas de Lambda`
- **S23** → `Introducción a la sección` · `Visión general de API Gateway` · `Visión general de API Gateway - Práctica` · `Etapas y despliegue de API Gateway` · `Planes de uso y claves de API Gateway` · `Supervisión, logs y seguimiento de API Gateway` · ⭐ `API Gateway CORS - Práctica` · `Autenticación y autorización de API Gateway` · `HTTP API vs REST API` · ⭐ `Websocket API` · `API Gateway - Arquitectura`

### 🛠️ Práctica en consola

> Desplegar una función en Node que llame a una API externa y devuelva el resultado, expuesta por API Gateway. Sin el video.
>
> Después, **provoca el fallo a propósito**: haz que tarde más que el timeout configurado y observa qué recibe el cliente.

### 🧩 Caso de decisión

> Un endpoint recibe un documento y pide a un LLM que lo resuma. El modelo tarda entre 20 s y 4 min según el largo.
>
> **1.** ¿Puede vivir en una función detrás de API Gateway? Justifica con **números concretos** de límites.
> **2.** El cliente es un navegador esperando la respuesta. ¿Qué pasa a los 30 segundos?
> **3.** Da **dos** arquitecturas que sí funcionen, y di qué sacrifica cada una.

> 💡 **Por qué este caso:** es literalmente tu producto. Y la respuesta obvia —"le subo el timeout"— falla por un límite que no está donde crees.

### 📚 Recursos

*(vacío)*

---

## B6 — Datos: base gestionada y storage

> Dos preguntas: dónde vive lo estructurado y dónde viven los archivos. Con una trampa clásica en medio.

### 🎯 Pregunta que responde

¿Cómo conecto mi app a una base de datos que no administro, y dónde guardo lo que no cabe en una tabla?

### 🚫 Qué NO entra

Réplicas de lectura, Multi-AZ, Aurora, clases de almacenamiento, ciclo de vida, replicación.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 6.1 | Base gestionada vs autogestionada | ¿Qué dejas de hacer y qué pierdes al usar una BD gestionada? | | | |
| 6.2 | **Connection pooling** | ¿Por qué Prisma + serverless agota las conexiones de Postgres? | | | |
| 6.3 | Object storage: el modelo | ¿En qué se parece y en qué NO se parece un bucket a un sistema de archivos? | | | |
| 6.4 | **URLs pre-firmadas** | ¿Cómo sirves un archivo privado sin abrir el bucket al mundo? | | | |
| 6.5 | Eventos desde el storage | ¿Cómo disparas código cuando alguien sube un archivo? | | | |
| 6.6 | Cuándo caché y cuándo NoSQL | ¿Qué señal justifica meter Redis? ¿Y una BD de documentos? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S8** — RDS + ElastiCache | 5 de 12 | 33 |
| **S11** — Amazon S3 | 5 de 13 | 29 |
| **S14** — Seguridad S3 | 4 de 13 | 14 |
| **S13** — S3 Avanzado | 2 de 7 | 11 |
| **S22** — DynamoDB | 3 de 25 (solo intro) | 19 |
| 📓 **Notion** — `Servicio Core Storage` · `Servicio Core Databases` | capa conceptual | — |

**Clases exactas:**

- **S8** → `Visión general de Amazon RDS` · `Amazon RDS - Práctica` · `Seguridad de RDS y Aurora` · ⭐ `RDS Proxy` · `Visión general de ElastiCache`
- **S11** → `Visión general de S3` · `S3 - Práctica` · `Seguridad en S3: Política de bucket` · `Seguridad en S3: Política de Bucket - Práctica` · `Versionado de S3`
- **S14** → `Cifrado S3` · `Cifrado S3 por defecto` · ⭐ `URLs pre-firmadas de S3` · ⭐ `URL pre-firmadas de S3 - Práctica`
- **S13** → `Notificaciones de eventos S3` · `Notificaciones de eventos S3 - Práctica`
- **S22** → `Introducción a la sección - DynamoDB` · `Visión general de DynamoDB` · `Conceptos básicos de DynamoDB - Práctica`

### 🛠️ Práctica en consola

> Levantar un Postgres gestionado, conectarlo desde tu máquina, y subir un archivo a un bucket privado sirviéndolo con una URL pre-firmada. Sin el video.

### 🧩 Caso de decisión

> Tu gestor de correos con IA guarda: el correo original, su clasificación, los adjuntos, y el embedding vectorial de cada uno.
>
> **1.** ¿Qué va a Postgres, qué a object storage, y por qué?
> **2.** El sistema corre en funciones serverless que escalan a 200 concurrentes. ¿Qué se rompe en Postgres y cómo lo arreglas?
> **3.** Un adjunto pesa 40 MB. ¿Pasa por tu servidor al subirlo? ¿Qué alternativa hay?

### 📚 Recursos

*(vacío)*

---

## B7 — Redes mínimas

> Va séptimo a propósito. Casi todos los cursos abren aquí; es lo más reglamentario y lo que menos criterio exige. Se hace cuando ya tienes algo desplegado al que ponerle dominio.

### 🎯 Pregunta que responde

¿Qué necesito saber de redes para que mi app sea alcanzable, segura y con dominio propio — sin volverme administrador de redes?

### 🚫 Qué NO entra

Diseño de VPC, subredes, tablas de rutas, NAT, VPC Peering, políticas de enrutamiento, NLB, Auto Scaling Groups. **Todo nivel 3.**

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 7.1 | **Grupos de seguridad** | ¿Qué es un security group y por qué reaparece en todos lados? | | | |
| 7.2 | DNS y dominios | ¿Qué es un registro A, un CNAME y para qué sirve el TTL? | | | |
| 7.3 | HTTPS y certificados | ¿Cómo consigues un certificado y dónde se instala? | | | |
| 7.4 | Load balancer: qué hace y cuándo aparece | ¿Por qué un contenedor en producción casi siempre tiene uno delante? | | | |
| 7.5 | **CORS en producción** | ¿Por qué funciona en local y truena desplegado? | | | |
| 7.6 | CDN: cuándo vale la pena | ¿Qué acelera un CDN y qué **no** acelera? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S10** — Fundamentos de VPC | **completa** (6 de 6) — *seguro barato* | 27 |
| **S5** — EC2 | 2 clases ⭐ | 18 |
| **S9** — Route 53 | 4 de 19 | 30 |
| **S7** — ELB + ASG | 6 de 20 | 32 |
| **S14** — Seguridad S3 | 2 clases ⭐ | 19 |
| **S15** — CloudFront | 3 de 12 | 19 |
| **S31** — Otros servicios | 2 clases | 9 |
| 📓 **Notion** — `Servicio Core Networking` | capa conceptual, **muy recortada** | — |

**Clases exactas:**

- **S10** → `Introducción a la sección` · `VPC, subredes, IGW y NAT` · ⭐ `NACL, Grupos de seguridad, Logs de flujo de VPC` · `VPC Peering, Endpoints, VPN, Direct Connect` · `Comentarios finales sobre la VPC` · `Arquitectura de tres niveles`
- **S5** → ⭐ `Visión general de los grupos de seguridad y los puertos clásicos` · ⭐ `Grupos de Seguridad - Práctica`
- **S9** → `¿Qué es un DNS?` · `Visión general de Route 53` · `Route 53 - Registro de un dominio` · `Route 53 CNAME vs Alias`
- **S7** → `Alta disponibilidad y escalabilidad` · `Visión general del Elastic Load Balancing (ELB)` · ⭐ `Application Load Balancer (ALB)` · `ALB - Práctica - Parte 1` · `ELB - Certificados SSL/TLS` · `Certificados SSL/TLS - Práctica`
- **S14** → ⭐ `S3 CORS` · ⭐ `S3 CORS - Práctica`
- **S15** → `CloudFront - Visión general` · `CloudFront - Práctica` · `Almacenamiento en caché e invalidaciones de CloudFront - Práctica`
- **S31** → `Amazon Certificate Manager (ACM)` · `Amazon Certificate Manager - Práctica`

### 🛠️ Práctica en consola

> Poner un dominio propio con HTTPS delante del servicio que levantaste en B4. Sin el video.

### 🧩 Caso de decisión

> Tu frontend en Vercel llama a tu API en AWS. En local todo funciona. Desplegado, el navegador rechaza las peticiones.
>
> **1.** ¿Cuáles son las **tres** causas más probables? Ordénalas por frecuencia.
> **2.** ¿Cómo distingues un problema de CORS de uno de grupo de seguridad, mirando solo el error del navegador?
> **3.** ¿Cuál de los dos nunca se arregla desde el frontend?

### 📚 Recursos

*(vacío)*

---

## B8 — Despliegue, logs y observabilidad

> Qué hacer cuando ya está desplegado y algo falla a las 2 a.m.

### 🎯 Pregunta que responde

¿Cómo llega mi código a producción sin que yo haga clics, y dónde miro cuando truena?

### 🚫 Qué NO entra

CodeCommit, CodeArtifact, CodeStar, Cloud9, CodeGuru. Herramientas que no vas a usar teniendo GitHub.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 8.1 | El pipeline: source → build → deploy | ¿Cuáles son las etapas y qué hace cada una? | | | |
| 8.2 | Entornos y estrategias de despliegue | ¿Qué diferencia hay entre rolling, blue/green y canary — y qué cuesta cada una? | | | |
| 8.3 | **Logs: dónde caen y cómo se buscan** | ¿Dónde termina un `console.log` de tu función? | | | |
| 8.4 | Alarmas y métricas | ¿Qué métrica te avisa antes de que el usuario se queje? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S19** — CloudWatch, X-Ray, CloudTrail | 10 de 24 | 50 |
| **S24** — AWS CICD | 4 de 25 — **solo los conceptos** | 29 |

**Clases exactas:**

- **S19** → `Introducción a la sección` · `Visión general de la monitorización en AWS` · `Métricas de CloudWatch` · ⭐ `Logs de CloudWatch` · ⭐ `CloudWatch Logs - Práctica` · `Alarmas de CloudWatch` · `Alarmas de CloudWatch - Práctica` · `Amazon EventBridge` · `Visión general de X-Ray` · `CloudTrail vs CloudWatch vs X-Ray`
- **S24** → ⭐ `Introducción a CICD en AWS` · `Visión general de CodePipeline` · `Visión general de CodeBuild` · `Visión general de CodeDeploy`

> ⚠️ **Hueco declarado:** el CI/CD del curso es AWS-nativo. Los **conceptos** transfieren; la práctica la harás con GitHub Actions, que se cubre en el sistema.

### 🛠️ Práctica en consola

> Provocar un error en la función de B5, encontrarlo en los logs **sin ayuda**, y poner una alarma que te avise la próxima vez.

### 🧩 Caso de decisión

> Desplegaste a las 6 p.m. A las 8 p.m. los usuarios reportan que la app "a veces falla". No hay errores en tu terminal.
>
> **1.** ¿Cuál es tu primer movimiento y por qué ese y no otro?
> **2.** ¿Qué habrías necesitado tener puesto **antes** para no estar a ciegas ahora?
> **3.** "A veces falla" sugiere algo intermitente. ¿Qué tres causas priorizas?

### 📚 Recursos

*(vacío)*

---

## B9 — Trabajo asíncrono para apps con IA

> El módulo que ningún curso de nube tiene, porque no es un tema de infraestructura — es de producto con IA. Y es el capstone: compone todos los anteriores.

### 🎯 Pregunta que responde

Cuando el trabajo tarda más de lo que un request HTTP aguanta, ¿qué arquitectura lo sostiene?

### 🚫 Qué NO entra

Kinesis, streaming de datos masivos, Step Functions en profundidad, AppSync.

### 📋 Temáticas

| # | Temática | ¿Lo sé? Pregunta de autodiagnóstico | ✅ | 🔄 | ❌ |
|---|----------|--------------------------------------|:--:|:--:|:--:|
| 9.1 | **Por qué un LLM no cabe en un request** | ¿Qué límites se cruzan y en qué orden? | | | |
| 9.2 | Cola de mensajes: el modelo | ¿Qué es un productor, un consumidor y la visibilidad de un mensaje? | | | |
| 9.3 | **Reintentos y DLQ** | ¿Qué pasa con un mensaje que falla tres veces? ¿Y si el LLM devolvió basura? | | | |
| 9.4 | Fan-out: un evento, varios consumidores | ¿Cuándo necesitas SNS además de SQS? | | | |
| 9.5 | **Streaming vs polling vs webhook** | Tres formas de devolverle el resultado al usuario. ¿Cuál eliges y por qué? | | | |

### 📼 Fuentes

| Fuente | Qué aporta | Min |
|--------|-----------|-----|
| **S20** — SQS, SNS | 13 de 27 — **sin Kinesis** | 70 |
| **S28** — Step Functions | 1 de 11 | 7 |
| **El agente** | **9.1 y 9.5 completas** — el patrón, no el servicio | — |

**Clases exactas:**

- **S20** → `Introducción a la sección` · `Introducción a la mensajería` · `Amazon SQS - Visión general de las colas estándar` · `SQS - Práctica de colas estándar` · `SQS - Tiempo de espera de visibilidad de mensajes` · ⭐ `SQS - Colas de Mensajes Fallidos` · ⭐ `SQS - Colas de Mensajes Fallidos - Práctica` · `SQS - Colas de espera / retraso` · `SQS - Colas FIFO` · `Amazon SNS` · ⭐ `Amazon SNS y SQS - Patrón Fan Out` · `SNS - Práctica` · `SQS vs SNS vs Kinesis`
- **S28** → `Visión general de Step Functions`

> Se apoya además en lo visto en B5: invocaciones asíncronas, DLQ, límites y Websocket API.

### 🛠️ Práctica en consola

> Montar el flujo completo: un endpoint que recibe una petición, la encola, responde `202` inmediatamente, y una función que consume la cola y procesa. Sin el video.
>
> Después: **haz que el consumidor falle a propósito** y confirma que el mensaje llega a la DLQ.

### 🧩 Caso de decisión — *examen final del temario*

> Tu producto recibe un PDF de 80 páginas y devuelve un resumen generado por un LLM. Tarda de 2 a 6 minutos.
>
> **1.** Diseña el flujo completo, desde el clic del usuario hasta que ve el resumen.
> **2.** El LLM falla en el 5% de los casos (rate limit, respuesta malformada). ¿Dónde vive el reintento y cuántas veces?
> **3.** El usuario cierra la pestaña a los 30 segundos. ¿Qué pasa con su trabajo? ¿Y cómo se entera del resultado?
> **4.** ¿Qué le muestras mientras espera — y qué le cuesta a tu factura cada opción?

> 💡 **Por qué este caso:** cruza B2 (el costo), B3 (la API key), B4 o B5 (dónde corre), B6 (dónde se guarda), B8 (cómo lo depuras) y B9 (cómo se orquesta). Si lo respondes entero, el temario está cerrado.

### 📚 Recursos

*(vacío)*

---

## Notas

- **Nivel 2, techo declarado.** Todo lo que huela a diseño de VPC, alta disponibilidad, IaC o escalado automático queda fuera por decisión, no por olvido.
- **El orden de los números es el orden de estudio.** Conceptual → lo que toda práctica necesita → construir → operar → componer.
- **El curso alimenta, no dicta.** Cada módulo se arma con clases de varias secciones distintas. El sílabo filtrado vive en `silabo_curso_aws_dva.md`.
- **Cuatro huecos que el curso no cubre** y quedan para el flujo Tesla: estimación de costos (2.4) · CI/CD con GitHub Actions (B8) · el patrón async para LLM (9.1, 9.5) · connection pooling con Prisma (6.2).
- **La evaluación es doble**: 🛠️ hacerlo en consola sin el video *(la nube es procedimental)* + 🧩 el caso *(elegir servicio es criterio)*. Un módulo cierra cuando pasan las dos.
- **Los apuntes** viven en `apuntes/cloud/[modulo]/` con su `00_indice.md`, siguiendo P1–P4.
- **Si un módulo se infla** con temas nuevos, no se estira: va a `NOTAS.md`.
