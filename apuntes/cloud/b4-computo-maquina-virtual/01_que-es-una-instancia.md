---
tema: B4 — Cómputo: la máquina virtual
workspace: cloud
seccion: 1
titulo: "Qué es una instancia y qué alquilas"
estado: finalizada
prev: null
next: 02_tipos-de-instancia
---

# ☁️ Qué es una instancia y qué alquilas

> **Una instancia es un ordenador que alquilas por tiempo: eliges su sistema operativo, su potencia, su disco y su red, y lo enciendes en un par de minutos.**
>
> Es el servicio más antiguo y más usado de AWS, y el primero del temario donde algo tuyo queda encendido de verdad.

## El dolor: necesitas un servidor y no lo quieres comprar

Tu aplicación tiene que correr en algún sitio que no sea tu portátil. Un sitio encendido siempre, con dirección propia, al que puedan llegar otras personas.

Comprar ese equipo tiene los tres problemas que ya conoces —adivinar el tamaño, esperar semanas, acabar administrándolo tú— pero hay uno anterior y más simple: **para probar una idea durante dos horas, comprar un servidor es absurdo**.

Ahí está el cambio real:

```text
COMPRAR              ALQUILAR POR TIEMPO
─────────            ───────────────────
decisión de años  →  decisión de minutos
pagas por tenerlo →  pagas por encenderlo
te equivocaste,   →  te equivocaste,
lo tienes igual      lo terminas y creas otro
```

Cuando el error cuesta minutos en vez de miles de dólares, **probar deja de ser caro**. Y eso cambia cómo se trabaja, no solo cuánto se paga.

## Qué es EC2 y qué es una instancia

> **EC2 (Elastic Compute Cloud) es el servicio de AWS para alquilar máquinas virtuales.**
>
> Cada máquina que levantas se llama **instancia**: una copia en marcha, con su propio sistema operativo, su disco y su dirección.

EC2 es el ejemplo canónico del modelo **IaaS** *(Infrastructure as a Service)*: el proveedor te entrega la máquina, el disco y la red, y **desde el sistema operativo hacia arriba todo es tuyo** — instalar, configurar, parchear, vigilar. Aquí ese reparto deja de ser una definición y se convierte en una lista de tareas. *(El modelo y sus alternativas se estudian en el módulo de fundamentos, **B1**.)*

> 📝 **Instancia** es el nombre que recibe **una máquina virtual en ejecución**. La palabra importa porque distingue la *plantilla* de la *copia*: de una misma imagen de sistema puedes levantar veinte instancias idénticas, y cada una es independiente de las demás.

EC2 no viene solo: es el centro de un grupo de servicios que se apoyan en él y que aparecerán más adelante.

| Servicio | Qué hace | Dónde se estudia |
|----------|----------|------------------|
| **EC2** | Alquilar la máquina | Aquí |
| **EBS** | Darle un disco que sobrevive a la máquina | **B6** |
| **ELB** | Repartir el tráfico entre varias máquinas | **B7** |
| **Auto Scaling** | Crear y destruir máquinas según la demanda | Fuera del temario — nivel 3 |

De los cuatro, hoy solo importa el primero. Los otros tres explican por qué EC2 aparece nombrado en tantos sitios: **casi todo lo demás se construye encima**.

## Las cinco decisiones de toda máquina virtual

Levantar una instancia es responder cinco preguntas. Ni una más. Todo lo que verás en el asistente de la Sección 3 es una de estas cinco, con otro nombre:

| # | Decisión | Qué es | La pregunta | Qué pasa si eliges mal |
|---|----------|--------|-------------|------------------------|
| 1 | **Sistema operativo** | El software base sobre el que corre todo lo demás: administra el hardware y ejecuta tus programas. Viene ya instalado en la imagen de la que partes | ¿Sobre qué arranca? Linux, Windows, macOS | Tu software no corre, o pagas licencia de más |
| 2 | **Cómputo** | La potencia de la máquina: cuántos núcleos de procesador (**vCPU**) ejecutan tu código a la vez, y cuánta memoria (**RAM**) tiene para los datos con los que trabaja en ese momento | ¿Cuánta CPU y cuánta memoria? | Va lenta, o pagas por potencia que no usas |
| 3 | **Almacenamiento** | El disco donde viven el sistema, tu código y tus archivos. Conserva los datos aunque la máquina se apague. Se mide en GB y hay tipos de distinta velocidad | ¿Cuánto disco y de qué tipo? | Te quedas sin espacio, o pagas disco vacío |
| 4 | **Red** | Cómo se llega a la máquina: si tiene una dirección IP pública alcanzable desde internet, y qué puertos aceptan conexiones (las reglas del **grupo de seguridad**) | ¿Tiene dirección pública? ¿Qué puertos abiertos? | No llegas a ella, o llega cualquiera |
| 5 | **Arranque** | Los comandos que la máquina ejecuta sola la primera vez que enciende: instalar software, descargar tu código, arrancar un servicio | ¿Qué hace la máquina sola al encenderse? | Te toca configurarla a mano cada vez |

Las cuatro primeras son de dimensionamiento y son las que todo el mundo espera. **La quinta es la interesante**, porque es la que separa un servidor artesanal de uno reproducible.

> 🎯 **El script de arranque** —AWS lo llama *user data*— es un conjunto de comandos que la máquina ejecuta **sola, una única vez, la primera vez que enciende**. Instalar paquetes, descargar tu código, arrancar un servicio. Sin él, cada máquina nueva es media hora de configuración manual; con él, levantar la número veinte cuesta lo mismo que la primera.

Ese punto se trabaja a fondo en la Sección 3, pero conviene tenerlo en el mapa desde ahora: **es lo que convierte una instancia en algo repetible**.

## Una instancia nunca viene sola: lo que arrastra consigo

Aquí está la trampa que produce las facturas que no cuadran. Cuando creas *una* instancia, en realidad aparecen **varios recursos independientes**:

| Lo que se crea | Qué es | ¿Muere con la instancia? |
|----------------|--------|--------------------------|
| **La instancia** | La máquina en sí — lo que se enciende y se apaga | Sí, al terminarla |
| **El volumen de disco** | Dónde vive el sistema y tus archivos | **No necesariamente.** Puede sobrevivir |
| **La dirección IP pública** | Por dónde se llega desde internet | Sí — y esa es otra trampa, Sección 4 |
| **El grupo de seguridad** | Las reglas de qué puertos están abiertos | **No.** Queda ahí, reutilizable |
| **El par de claves** | La credencial para conectarte por consola remota | **No.** Vive en tu cuenta y en tu disco |

Cinco objetos de un solo clic. Y cada uno tiene su propio ciclo de vida.

> 💸 **Por qué esto importa y no es un detalle:** hay una regla de facturación que aquí se ve entera — **lo que se cobra por existir no se apaga, se borra**. Apagas la instancia y el disco sigue ahí, cobrando por GB al mes, esperando a una máquina que ya no existe. Nadie te avisa, porque el sistema está haciendo exactamente lo que le pediste. *(El modelo de cobro completo está en **B2 · Costos y facturación**.)*

> 🎯 **La pregunta que hay que aprender a hacerse:** no *"¿apagué la instancia?"* sino **"¿qué quedó vivo de lo que creé?"**. A partir de aquí esa pregunta tiene nombres concretos: un volumen, una IP, un grupo de seguridad.

## 🎯 Lo que debiste llevarte

> **Si de esta sección solo retienes estas líneas, cumplió su función.**

- Una instancia es una máquina virtual en ejecución que alquilas por tiempo, y su valor real es que **equivocarte cuesta minutos**, no una compra.
- EC2 entrega la máquina, el disco y la red; **desde el sistema operativo hacia arriba, todo pasa a ser tu trabajo** — eso es lo que significa IaaS en la práctica.
- Levantar una instancia es responder cinco preguntas —sistema, cómputo, disco, red y arranque— y todo lo que aparece en el asistente es una de ellas.
- El **script de arranque** es lo que convierte una máquina artesanal en una reproducible: se ejecuta solo, una vez, al primer encendido.
- Una instancia arrastra consigo al menos cuatro recursos más, y **cada uno tiene su propio ciclo de vida** — el disco y el grupo de seguridad sobreviven a la máquina.
- La pregunta correcta al terminar no es *"¿lo apagué?"* sino *"¿qué quedó vivo de lo que creé?"*.

---
[[00_indice|índice]] · [[02_tipos-de-instancia|siguiente →]]
