# Servicios Core Cloud y Compute

## Que es un servicio core?

- Son los **bloques fundamentales de construcción**.
- Son los servicios básicos e indispensables que necesitas para que **cualquier aplicación moderna exista**.
    - No importa si estás construyendo Netflix, un banco o un blog personal; **siempre** usarás una combinación de estos 4 elementos.
- Un **servicio core** en cloud es un **servicio fundamental**, sin el cual **no puedes construir ni ejecutar sistemas en la nube**.

### Los 4 Servicios Core Universales (80/20)

```tsx
(INTERNET)
          │
          ▼
┌───────────────────────┐
│   1. NETWORKING       │  <-- (VPC / Firewall / Load Balancer)
│   (La Puerta de Entrada-Conexion)
└─────────┬─────────────┘
          │
          ▼
┌───────────────────────┐
│   2. COMPUTE          │  <-- (Servidor Web / VM)
│   (Tu Aplicación corre aquí)
└─────────┬─────────────┘
          │ ◄───────────────┐
          │                 │
          ▼                 ▼
┌───────────────────┐    ┌────────────────────┐
│ 3. DATABASE       │    │ 4. STORAGE         │
│ (Datos)           │    │  (Datos)           │
└───────────────────┘    └────────────────────┘
```

### Relación entre servicios core y servicios avanzados

> Los servicios core son los **bloques base** sobre los que se apoyan **todos los demás servicios**.
> 

```tsx
Servicios Avanzados
     ▲
     │
┌────┴────┐
│  CORE   │  ← siempre primero
└─────────┘

```

<aside>

### Qué NO es un servicio core (importante)

No son core porque **dependen de los core**:

❌ Machine Learning

❌ Big Data

❌ IoT

❌ Analytics

❌ AI Generativa

📌 Estos son **servicios avanzados o especializados**.

</aside>

## Hipervisor (virtualizador)

### ¿Qué hace exactamente?

> Es una capa de software muy delgada que se instala directamente sobre el hardware (el metal) del servidor.
> 

Su trabajo es **mentirle** a los Sistemas Operativos (Windows, Linux) que instalas encima.

- Al Windows de la VM 1 le dice: "Toma, aquí tienes 4GB de RAM y 2 CPUs".
- Al Linux de la VM 2 le dice: "Toma, aquí tienes 8GB de RAM y 1 CPU".

El Windows y el Linux **no saben** que están compartiendo el mismo chip físico. Creen que son los dueños únicos del hardware.

<aside>

Un **Virtualizador (Hipervisor)** es el software que permite que **un** servidor físico actúe como si fueran **muchos** servidores independientes.

</aside>

### La Analogía del Edificio

- **El Servidor Físico** = Un **Edificio** vacío.
- **Las Máquinas Virtuales (VMs)** = Los **Departamentos** dentro del edificio.
- **El Hipervisor** = El **Administrador del Edificio**.

**¿Qué hace el Administrador (Hipervisor)?**

1. **Asigna Recursos:** Le da luz y agua (CPU y RAM) al Depto 301. Si el Depto 301 no usa la luz, se la puede prestar al 302.
2. **Aislamiento (Seguridad):** Se asegura de que las paredes sean gruesas. Si el vecino del 301 hace una fiesta ruidosa (un virus o un error), el vecino del 302 ni se entera y sigue durmiendo tranquilo.
3. **Independencia:** En el 301 puede vivir una familia tradicional (Windows) y en el 302 una banda de rock (Linux). No tienen que ser iguales.

### Los Famosos del Mercado

Seguramente has escuchado estos nombres, todos son Hipervisores:

- **VMware ESXi:** El rey en las empresas tradicionales (On-Premise).
- **Hyper-V:** El de Microsoft (es la base de Azure).
- **KVM (Kernel-based Virtual Machine):** El motor de código abierto (es la base de AWS y Google Cloud mayormente).
- **VirtualBox:** Es un hipervisor pequeño para aprender en casa.

## Compute **= capacidad de cómputo**

> **Compute** se refiere a los **recursos de procesamiento** (CPU, RAM, poder de cómputo) que necesitas para ejecutar tus aplicaciones, código, procesos y cargas de trabajo. 
En términos simples: es la capacidad de "pensar" y "calcular" que tu aplicación necesita
> 

**Antes del Cloud:**

- Comprabas un servidor físico ($5,000 - $50,000)
- Lo instalabas en tu oficina o datacenter
- Esperabas semanas para recibirlo y configurarlo
- Si necesitabas más capacidad, comprabas otro servidor

**Con Cloud:**

- "Alquilas" capacidad de procesamiento bajo demanda
- Lo creas en minutos desde una consola web
- Pagas solo por lo que usas (por hora o segundo)
- Escalas hacia arriba o abajo según necesidad

👉 En cloud, **Compute = alquilar computadoras virtuales por Internet**.

### Diccionario de Conceptos de Compute

| Concepto | Definición | Analogía del Mundo Real |
| --- | --- | --- |
| **vCPU (Virtual CPU)** | Núcleo de procesador virtual. Unidad de poder de cómputo | Como los "núcleos" de tu laptop (dual-core, quad-core), pero virtuales |
| **Instance / VM** | Servidor virtual que emula un servidor físico completo | Como tener una computadora completa pero en la nube corriendo en un servidor |
| **Instance Type** | Plantilla que define CPU, RAM, storage, networking | Como modelos de laptop: básico (2 cores, 8GB), profesional (8 cores, 32GB) |
| **Region** | Ubicación geográfica de datacenters (ej: us-east-1, europe-west1) | Como elegir dónde quieres que esté tu servidor: Virginia, Frankfurt, Singapur |
| **Availability Zone (AZ)** | Datacenter independiente dentro de una región | Como edificios separados en una misma ciudad para redundancia |
| **Auto-scaling** | Aumentar/disminuir automáticamente número de instancias según demanda | Como contratar personal temporal en Black Friday y despedirlo después |
| **Load Balancer** | Distribuye tráfico entre múltiples instancias | Como un recepcionista que dirige clientes a diferentes cajas en un banco |
| **Image / AMI** | Plantilla pre-configurada de un sistema operativo + software | Como un disco de instalación de Windows, pero personalizado con tus apps |
| **Snapshot** | Copia de respaldo de tu instancia en un momento específico | Como una "foto" de tu servidor que puedes restaurar después |
| **Elastic IP** | Dirección IP pública fija que puedes asignar a instancias | Como un número de teléfono que puedes transferir entre dispositivos |
| **Security Group** | Firewall virtual que controla tráfico entrante/saliente | Como un guardia de seguridad que decide quién entra y sale |
| **SSH Key** | Llave criptográfica para acceder remotamente a tu instancia (Linux) | Como una llave física para entrar a un edificio, pero digital |
| **RDP** | Remote Desktop Protocol, para conectarte a Windows VMs | Como TeamViewer pero para acceder a tu servidor Windows |

## Compute y sus niveles de abstraccion

> Compute no es “servidores”.
> 
> 
> Compute es el nivel de abstracción sobre el hardware.
> **¿Qué tanto de la infraestructura "invisible" quieres manejar tú y qué tanto quieres que maneje el proveedor (AWS/Azure/GCP)?**
> 
> Cada modelo **oculta una parte distinta de la infraestructura**.
> 

<aside>

### ¿Qué es Abstracción en Cloud?

**Abstracción** = ocultar complejidad técnica para:

- Reducir esfuerzo operativo
- Acelerar desarrollo
- Delegar responsabilidades al proveedor

📌 **Más abstracción → menos control, menos gestión**

📌 **Menos abstracción → más control, más responsabilidad**

</aside>

![image.png](image%205.png)

### 1. Virtual Machines (VMs) - **"El Servidor Completo"**

Una VM es una emulación de software de una computadora física completa. Se ejecuta sobre un **Hipervisor** que le asigna recursos de hardware virtualizados (vCPU, RAM, Disco).

### Características Clave

- **Guest OS Completo:** Cada VM tiene su propio Sistema Operativo completo (ej. Windows Server, Ubuntu Linux) instalado dentro de ella.
- **Pesadas:** Ocupan mucho espacio (GBs) porque incluyen todo el OS.
- **Arranque Lento:** Tardan minutos en encender, igual que una PC física.
- **Aislamiento Fuerte:** Es la opción más segura si necesitas separar cargas de trabajo hostiles, ya que tienen un kernel de OS propio.

### Qué abstrae

✔ Hardware físico (infraestructura alquilada)

❌ Sistema Operativo

❌ Parches

❌ Configuración

### Tu Responsabilidad (Lo que duele)

Tú eres el administrador del sistema. Tienes que parchear el OS, configurar el firewall interno, instalar las librerías y mantenerlo encendido.

> Analogía: Alquilar una Casa Independiente. Tienes tus propios cimientos, paredes y techo. Eres responsable de toda la seguridad y el mantenimiento dentro de la reja.
> 

### Containers (Contenedores)  - **"El Paquete de Software Ligero"**

> Un contenedor es una unidad estándar de software que empaqueta el código y todas sus dependencias (librerías, binarios, configuraciones) para que la aplicación se ejecute de manera rápida y confiable de un entorno a otro.
> 
- A diferencia de una VM, los contenedores **no** tienen un OS completo propio. **Comparten el Kernel del Sistema Operativo del "Host"** (la máquina donde corren) pero corren en procesos aislados en el espacio de usuario.

### Características Clave

- **Ligeros:** Pesan Megabytes (MBs), no Gigabytes.
- **Arranque Rápido:** Encienden en segundos (o milisegundos).
- **Portabilidad:** Resuelven el problema de "funciona en mi máquina". Un contenedor Docker corre exactamente igual en tu laptop que en un servidor de Google.
- **Efímeros:** Están diseñados para morir y ser reemplazados fácilmente.

### Qué abstrae

✔ Hardware

✔ Sistema Operativo (parcial)

❌ Runtime y dependencias

### Tu Responsabilidad (Lo que duele)

Ya no parches el OS (eso lo hace el proveedor en el Host). Te preocupas por empaquetar bien tu app y, el gran dolor, **orquestarlos** (usando Kubernetes) cuando tienes cientos de ellos.

> Analogía: Alquilar un Apartamento en un Edificio. Compartes los cimientos y la plomería principal (el Kernel del Host) con los vecinos, pero tu espacio privado está amueblado exactamente como tú quieres.
> 

### 3. Serverless (Functions) - La Abstracción Total - **"Solo el Código"**

> Es un modelo de ejecución donde el proveedor de nube gestiona dinámicamente la asignación de recursos. 
Tú despliegas **Funciones** (pequeños fragmentos de código) que se activan solo en respuesta a **Eventos** (una petición HTTP, un archivo subido, una alerta de base de datos).
> 
- No hay servidores, ni OS, ni contenedores que tú veas o administres.

### Características Clave

- **Orientado a Eventos:** No corre 24/7. Solo despierta cuando pasa algo.
- **Escalado Instantáneo (Scale to Zero):** Si nadie usa tu app, consume 0 recursos y pagas $0. Si llegan 10,000 peticiones de golpe, la nube lanza 10,000 instancias de tu función al instante.
- **Sin Estado (Stateless):** Las funciones nacen, hacen el trabajo y mueren. No "recuerdan" nada entre ejecuciones (necesitan una base de datos externa para eso).

### Qué abstrae

✔ Hardware

✔ OS

✔ Runtime

✔ Escalado

✔ Alta disponibilidad

### Tu Responsabilidad (Lo que duele)

Solo tu lógica de negocio. Los dolores son nuevos: "arranques en frío" (el primer arranque tarda un poco más) y límites de tiempo de ejecución (ej. una Lambda no puede correr más de 15 minutos).

> Analogía: Quedarse en un Hotel. Llegas, duermes y te vas. No te importa quién limpia las sábanas ni quién paga la luz del edificio. Solo pagas por la noche que ocupaste la habitación.
> 

## **VIRTUAL MACHINES (VMs): Máquinas Virtuales**

**VIDEO:** [https://www.youtube.com/watch?v=F-sM9zbk76A](https://www.youtube.com/watch?v=F-sM9zbk76A)

> Una **máquina virtual** es un servidor emulado por software que actúa como un computador físico completo. Tiene su propio sistema operativo, CPU virtual, memoria, disco y red.
> 

**Tú entras por SSH o Escritorio Remoto y la usas igual que tu PC.**

Tiene:

- Sistema Operativo (Linux, Windows)
- Disco
- RAM
- CPU virtual

Se comporta como una computadora normal pero es virtual

Corre sobre un servidor físico real, consume de ese servidor los requisitos que asignes a la VM (RAM,Disco,etc)

![image.png](image%206.png)

<aside>

### ¿Qué es una “instancia”?

Una **instancia** es una VM ya creada y corriendo.

Cada instancia tiene un **tamaño**, por ejemplo:

- Pequeña (1 CPU, 1 GB RAM)
- Mediana
- Grande
</aside>

### ¿Qué incluye un servicio de Compute?

> Cuando creas una VM, el proveedor te da:
> 

| Componente | Qué significa |
| --- | --- |
| CPU | Potencia de cálculo |
| RAM | Memoria para apps |
| Disco | Almacenamiento |
| OS | Linux / Windows |
| Red | IP privada y/o pública |
| Seguridad | Firewalls básicos |

### **Los 3 servicios (la misma idea con distinto nombre)**

| Proveedor | Servicio | Qué es |
| --- | --- | --- |
| AWS | **EC2** | VMs en AWS |
| Azure | **Azure Virtual Machines** | VMs en Azure |
| GCP | **Compute Engine** | VMs en GCP |

### AWS: EC2 (Elastic Compute Cloud)

- **Filosofía:** Tener una herramienta exacta para cada necesidad, aunque sea abrumador.
- **Tipos de Instancias:** Tienen la mayor variedad del mercado. Tienen instancias con procesadores Intel, AMD, y sus propios chips llamados **Graviton** (que son más baratos y eficientes).
- **Naming (Nombres):** Usan códigos tipo `m5.large`, `t3.micro`.
    - `m` = Familia (General).
    - `5` = Generación (Quinta).
    - `large` = Tamaño.
- **Killer Feature:** **Spot Instances**. AWS tiene el mercado de "subastas" de servidores más maduro. Si tienes procesos que pueden interrumpirse, puedes conseguir servidores con 90% de descuento.

### Azure: Virtual Machines (VMs)

- **Filosofía:** Continuidad empresarial. Si sabes administrar un servidor en tu oficina, sabes administrar este.
- **Tipos de Instancias:** Muy enfocadas en cargas de trabajo corporativas (SAP, Oracle, SQL Server).
- **Naming:** Más descriptivo pero largo, tipo `Standard_D2s_v3`.
- **Killer Feature:** **Azure Hybrid Benefit**.
    - *El Dolor:* Las licencias de Windows Server y SQL Server son carísimas.
    - *La Solución:* Si tu empresa ya pagó licencias para sus servidores locales, Microsoft te deja usarlas en la nube de Azure para ahorrarte hasta un 40% del costo. (En AWS tendrías que pagar la licencia de nuevo o con sobreprecio).

### GCP: Compute Engine (GCE)

- **Filosofía:** Rendimiento puro y flexibilidad. Menos burocracia, más velocidad.
- **Tipos de Instancias:** Menos familias que AWS, pero más flexibles.
- **Naming:** Tipo `n1-standard-1`.
- **Killer Feature #1 (La Joya): Custom Machine Types.**
    - En AWS/Azure, tienes que elegir del menú fijo: "¿Quieres la de 2 CPU con 4GB RAM o la de 4 CPU con 8GB RAM?". No puedes pedir intermedios.
    - En GCP, tú dices: "Quiero **3** vCPUs y **5.5** GB de RAM". Te hacen la instancia a tu medida exacta. Ahorras dinero no pagando recursos que no usas.
- **Killer Feature #2: Live Migration.**
    - Google puede actualizar el hardware físico o el software del host *mientras tu máquina virtual sigue corriendo*. No necesitas reiniciar. Es magia negra para los administradores de sistemas.

### Tabla Comparativa: Compute

**Ganador:**

- **Ecosistema**: AWS S3 (más maduro, más integraciones)
- **Precio**: Azure (ligeramente más barato)
- **Simplicidad**: GCP (UX más limpia)

| **Característica** | **🟧 AWS EC2** | **🟦 Azure VMs** | **🟥 GCP Compute Engine** |
| --- | --- | --- | --- |
| **Tiempo de Arranque** | Medio (minutos) | Lento (a veces tarda más) | **Muy Rápido** (segundos) |
| **Flexibilidad** | Menú Fijo (tamaños fijos) | Menú Fijo | **A Medida** (Custom Types) |
| **Licencias Windows** | Pagas precio full (generalmente) | **Descuento masivo** (Hybrid Benefit) | Precio estándar |
| **Mantenimiento** | Requiere reinicio a veces | Requiere reinicio a veces | **Live Migration** (Sin reinicio) |
| **Descuentos** | "Savings Plans" (Compromiso $$) | "Reserved Instances" (1-3 años) | "Committed Use" (1-3 años) |
| **Ideal para...** | Quien necesita variedad extrema. | Quien usa Windows/SQL Server. | Quien quiere optimizar costos al milímetro. |
- **Si eres nuevo:** Empieza con **AWS EC2**. Es el estándar, hay millones de tutoriales y la capa gratuita (Free Tier) te regala 750 horas al mes de una instancia pequeña (`t2.micro` o `t3.micro`) por un año.
- **Si odias desperdiciar dinero:** Mira **GCP**. Poder elegir la RAM exacta es una ventaja financiera enorme a escala.
- **Si tu empresa ama Microsoft:** **Azure** es la única opción lógica por el ahorro en licencias.

## CONTAINERS (Contenedores)

**Concepto Central:** "Empaquetar una vez, ejecutar en cualquier lugar".

> A diferencia de las VMs que virtualizan el *hardware*, los contenedores virtualizan el **Sistema Operativo**.
Un **contenedor** **empaqueta una aplicación con todas sus dependencias**, pero **sin incluir un sistema operativo completo**.
> 
> - **Comparten el Kernel del Sistema Operativo del "Host"** (la máquina donde corren) pero corren en procesos aislados en el espacio de usuario.

![image.png](image%207.png)

### Nuevos conceptos

<aside>

### ¿Qué es Docker?

**Docker** es la tecnología más popular para:

- Crear contenedores
- Ejecutarlos localmente
- Empaquetar aplicaciones

📌 Docker **no es cloud**, es una tecnología base.

</aside>

<aside>

### Imagen (Image) o **Container Image**

Es el "plano" o la **plantilla de tu contenedor**. 

Es un archivo de solo lectura que contiene tu código + librerías + dependencias. 

No se ejecuta, solo se almacena.

</aside>

<aside>

### **Que es Orquestacion?**

La **orquestación** es el conjunto de reglas que decide:

- Cuántos contenedores correr
- En qué máquina
- Qué pasa si uno falla
- Cómo escalan

**Orchestrator (Orquestador) →  Kubernet**

> Sistema de orquestación que gestiona cientos/miles de contenedores automáticamente
El "Capitán". Si tienes 1 contenedor, lo manejas manual. Si tienes 1,000, necesitas un software que los vigile, los reinicie si fallan y los distribuya entre varios servidores.
> 
> - El estándar mundial es **Kubernetes (K8s)**.
</aside>

- **Container (Contenedor):** Una imagen en ejecución , Cuando le das "run" a una imagen, se convierte en un contenedor.
- **Runtime:** El software que permite que el contenedor corra en el servidor (ej. Docker Engine, Containerd).

| Concepto | Definición |
| --- | --- |
| **Docker** | Es la tecnología estándar para crear contenedores. Es la "marca" que se volvió sinónimo de la tecnología (como Kleenex o Scotch).
Plataforma para crear, ejecutar y gestionar contenedores (el estándar de facto) |
| **Container Registry** | Repositorio donde guardas imágenes (como GitHub pero para imágenes Docker) |
| **Dockerfile** | Archivo de texto con instrucciones para construir una imagen |
| **Pod** | Unidad mínima en Kubernetes: uno o más contenedores que comparten red y storage |
| **Node** | Servidor (VM) donde corren los contenedores en Kubernetes |
| **Cluster** | Conjunto de nodes gestionados por el Orquestador(Kubernetes) |
| **Service** | Abstracción que expone un conjunto de pods como un servicio de red |
| **Deployment** | Definición de cómo desplegar y actualizar aplicaciones en Kubernetes |
| **Ingress** | Reglas para exponer servicios HTTP/HTTPS al exterior |
| **Namespace** | Aislamiento lógico dentro de un cluster (como carpetas para organizar recursos) |
| **ConfigMap** | Configuración de aplicación separada del código (variables, archivos config) |
| **Secret** | Como ConfigMap pero para datos sensibles (passwords, API keys) encriptados |

### El Problema que Resuelven

**"En mi máquina funcionaba".**

- **Antes (VMs):** Desarrollabas en tu laptop (MacOS), lo pasabas a pruebas (Windows) y a producción (Linux). El código fallaba porque las librerías eran distintas.
- **Ahora (Containers):** El contenedor lleva sus propias librerías adentro. Es una caja cerrada.
    
    Se ejecuta igual en:
    
    - Laptop
    - VM
    - Cloud
    - On-premise

<aside>

Un contenedor es una app “empaquetada” que **siempre corre igual**, sin importar dónde la ejecutes.

</aside>

### ¿Dónde corren los contenedores?

> Los contenedores **NO viven solos**.
Necesitan un entorno que los ejecute.
> 

Opciones:

- Laptop (Docker Desktop)
- VM en la nube
- Clúster de contenedores

En cloud, **normalmente corren sobre VMs**.

### Los Servicios (Orquestación de Contenedores)

> Aquí ya no hablamos de "correr un Docker", sino de gestionar clusters de producción con **Kubernetes**.
> 

### AWS Container Services: ECS y EKS

**AWS ofrece DOS opciones principales:**

1. **ECS (Elastic Container Service):**
    - *Qué es:* El orquestador **propio** de Amazon (no es Kubernetes)
    - *Filosofía:* Simple y muy integrado con AWS.
    - *Ideal para:* Quien quiere usar contenedores pero le da miedo la complejidad de Kubernetes.
2. **EKS (Elastic Kubernetes Service):**
    - *Qué es:* Kubernetes **gestionado** por AWS.
    - *Filosofía:* Estándar de la industria.
    - *Ideal para:* Empresas grandes que quieren portabilidad total (poder llevarse su configuración a Azure mañana si quisieran).

### Azure: AKS (Azure Kubernetes Service)

- *Qué es:* Kubernetes gestionado por Microsoft.
- *Filosofía:* **Developer Experience**.
- *Killer Feature:* La integración con herramientas de desarrollo. Desde **Visual Studio Code** puedes desplegar directo a AKS. También se integra nativamente con **Active Directory** (seguridad corporativa), lo que ahorra muchos dolores de cabeza a las empresas grandes.

### GCP: GKE (Google Kubernetes Engine)

- *Qué es:* El "Rey" de los contenedores. Google inventó Kubernetes internamente (lo llamaban Borg) y luego lo regaló al mundo.
- *Filosofía:* Automatización total.
- *Killer Feature:* **GKE Autopilot**.
    - En AWS/Azure, aunque sea "gestionado", todavía tienes que decidir un poco sobre los servidores de fondo.
    - En **GKE Autopilot**, Google te dice: "Tú dame el contenedor, yo me encargo de todo el hardware, parches y seguridad. No toques nada". Es la experiencia más pulida del mercado.

### Tabla Comparativa: Containers (K8s Managed)

| **Característica** | **🟧 AWS EKS** | **🟦 Azure AKS** | **🟥 GCP GKE** |
| --- | --- | --- | --- |
| **Origen** | Adaptado (AWS llegó tarde a K8s) | Adaptado (Microsoft compró talento) | **Nativo** (Google lo inventó) |
| **Facilidad de Uso** | Baja (Configuración manual "pesada") | Media (Buena integración IDE) | **Alta** (Modo Autopilot) |
| **Actualizaciones** | Manuales (Tú decides cuándo) | Automatizables | **Automáticas** (Google las gestiona muy bien) |
| **Integración** | Fuerte con servicios AWS | Fuerte con Active Directory | Fuerte con herramientas de Data/AI |
| **Costo del Panel de Control** | ~$70 USD/mes por cluster | **Gratis** (Pagas solo los nodos) | Gratis (versión estándar) / Pago (versión Enterprise) |

## SERVERLESS

> "Solo código. Cero infraestructura". → Tú solo subes tu función (código) al servidor y la nube se encarga del resto.
> 
- "Ejecuta código sin pensar en servidores. El proveedor los administra todos.” : Significa que **tú no ves los servidores, no los configuras y no los administras**.
- **Tú solo subes funciones (pequeños bloques de código) que se ejecutan cuando ocurre un evento (HTTP request, archivo subido, timer, mensaje en cola).**

### FaaS (Function as a Service)

> **FaaS** es el modelo más común de Serverless.
En lugar de desplegar una "Aplicación" completa (monolito), despliegas pequeñas **Funciones** individuales que hacen una sola cosa (ej: `redimensionar_imagen()`, `procesar_pago()`).
> 

### ¿Qué es una "Función Serverless"?

**Función** = bloque de código pequeño que:

- Recibe un **evento** (input).
- Procesa datos.
- Devuelve **respuesta** (output).
- Termina **(la funcion no queda corriendo)**.

```tsx
Evento → Función → Resultado → Muere
```

**Ejemplo práctico:**

```tsx
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  TRIGGER     │      │   COMPUTE    │      │   DESTINO    │
│  (Evento)    │ ───► │ (Tu Función) │ ───► │  (Acción)    │
└──────────────┘      └──────────────┘      └──────────────┘
  Usuario sube        La nube asigna        Guarda la foto
  foto a S3           recursos, corre       en Database y
                      el código y           se apaga.
                      redimensiona.
```

### Event-Driven (Orientado a Eventos)

> Las funciones no están "corriendo" esperando a ver si alguien llama. Están **apagadas**.
> 

Solo se despiertan cuando ocurre un **Evento** (un Disparador).

| **Concepto** | **Definición** |
| --- | --- |
| **Trigger (Disparador)** | El **evento** que "despierta" a tu función. (Ej: Subir un archivo, una petición HTTP, una hora específica). |
| **Cold Start (Arranque en Frío)** | Tiempo extra que tarda la función en ejecutarse la **primera vez** (o después de inactividad).
La nube tiene que "encender" el entorno por ello la primera vez tarda mas que una ejecucion normal.
📌 Luego de la primera ejecución, las siguientes son rápidas (*Warm Start*). |
| **Stateless (Sin Estado)** | Las funciones no tienen memoria, **no recuerda nada** entre ejecuciones.
Cuando terminan, se destruyen. Si necesitas guardar datos (variables, archivos), debes usar una base de datos externa (S3, DynamoDB, SQL). |
| **Timeout (Tiempo Límite)** | Una función no puede correr para siempre. Tienen un límite máximo de vida (usualmente 15 min). Si no termina, la nube la mata. |
| **Scale to Zero** | Si nadie usa tu función, consume 0 CPU y 0 RAM. Pagas literalmente $0.00. |
| **Concurrency (Concurrencia)** | Si llegan 1,000 eventos a la vez, la nube crea 1,000 copias de tu función en paralelo instantáneamente. |
| **Runtime** | El **runtime** es el lenguaje/entorno donde corre tu función (NodeJS,Python,etc) |

![image.png](image%208.png)

<aside>

### El Problema que Resuelven

**"Pagar por aire". "No quiero administrar servidores para lógica simple."**

- **Antes (VMs/Containers):** Tienes un servidor encendido 24/7 esperando usuarios. Si a las 3 AM no entra nadie, sigues pagando la electricidad y el CPU.
- **Ahora (Serverless):** Función corre SOLO cuando hay request →  Pagas solo por los **milisegundos** exactos que tu código estuvo trabajando. Eficiencia de costos extrema para tráfico variable.
</aside>

<aside>

### ¿Qué NO puedes hacer en Serverless?

- No instalar software del sistema
- No controlar el sistema operativo
- No mantener procesos vivos
- No usar disco local permanente

👉 Serverless **no reemplaza todo**, es ideal para **lógica reactiva y APIs**.

</aside>

### Los Servicios (FaaS por Proveedor)

### AWS Lambda

- **Qué es:** Servicio FaaS de AWS , El pionero (2014). Definió el mercado.
- **Uso Típico:** Cuando subes un archivo a S3, Lambda se activa para procesarlo. Cuando alguien escribe en DynamoDB, Lambda se activa para enviar una notificación.
- **Modelo de pago:**
    - Tiempo de ejecución (ms)
    - Memoria asignada

**Servicios alrededor de Lambda**

- **Triggers**: HTTP (API Gateway), S3 (archivo subido), DynamoDB (cambio), SNS (mensajes), Timer, Kinesis (streaming).

| Servicio | Para qué sirve |
| --- | --- |
| **API Gateway** | Exponer Lambdas como APIs REST |
| **S3 Events** | Disparar funciones al subir archivos |
| **DynamoDB** | Base de datos serverless |
| **EventBridge** | Orquestación por eventos |

### Azure Functions

- **Qué es:** FaaS de Microsoft.
- **Planes**:
    - **Consumption**: Escala a 0 (igual Lambda).
    - **Premium**: Cold starts más rápidos, VNet integration.
- **Killer Feature:** **Durable Functions**.
    - Normalmente las funciones son "stateless" (sin memoria). Azure permite crear funciones que "recuerdan" el estado y pueden orquestar flujos largos (ej: esperar aprobación humana) sin complicaciones de código.
- **Lenguajes:** Soporte de primera clase para **C# / .NET** y PowerShell.
- **API Management**: Gateway de Azure.
- **Integración clave**
    - Active Directory
    - Visual Studio / VS Code
    - Servicios empresariales

### Google Cloud Functions (GCF) + **Cloud Run**

- **Cloud Functions**: Función serverless ligera de GCP.
    - **Filosofía:** Simplicidad y Datos.
    - **Triggers**: HTTP, Cloud Storage, Pub/Sub (mensajes), Firestore, Timer.
    - **Límites**: Max 9 minutos, cold starts muy rápidos.
    - **Casos típicos**:
        - Procesamiento de datos (BigQuery triggers).
        - ML inference (modelo se ejecuta por request).
- **Cloud Run**: Serverless pero con **contenedores** (no solo funciones).
    - Despliegas Docker containers como serverless.
    - Google lo ejecuta sin que administres servidores
    - Escala a 0, pero con más flexibilidad que funciones puras.
    - Soporta apps completas (no solo funciones
    - **Híbrido**: Entre Functions y Kubernetes.

### Tabla Comparativa: Serverless (FaaS)

| **Característica** | **🟧 AWS Lambda** | **🟦 Azure Functions** | **🟥 Google Cloud Functions** |
| --- | --- | --- | --- |
| **Tiempo Máx. (Timeout)** | 15 minutos | 10 min (Defecto) / Ilimitado (Plan Premium) | 9 minutos (Gen 1) / 60 min (Gen 2 HTTP) |
| **Arranque en Frío** | Muy Rápido (Líder) | Medio (Mejorando en .NET) | Rápido |
| **Disparadores (Triggers)** | Casi todos los servicios de AWS | Servicios Azure + Event Grid | HTTP, Cloud Storage, Pub/Sub, Firebase |
| **Lenguajes Clave** | Node.js, Python, Java, Go | **C#**, PowerShell, Java, Python | Go, Python, Node.js |
| **Capa Gratuita** | **1 millón** de peticiones/mes gratis | 1 millón de peticiones/mes gratis | 2 millones de invocaciones/mes gratis |

### Ventajas y Limitacion

| Ventaja | Limitación |
| --- | --- |
| ✅ **Cero admin**: No OS, no parches, no scaling manual. | ⚠️ **Cold starts**: Primera ejecución más lenta. |
| ✅ **Escala automática**: De 0 a 1M ejecuciones. | ⚠️ **Tiempo max**: 9-15 min (no para jobs largos). |
| ✅ **Pagas solo ejecución**: Ideal tráfico variable. | ⚠️ **Vendor lock-in**: Funciones no portables entre clouds. |
| ✅ **Deploy rápido**: Subes ZIP o container. | ⚠️ **Stateless**: No mantiene estado entre llamadas. |
| ✅ **Integraciones nativas**: Triggers listos con storage, queues, DB. | ⚠️ **Debugging complejo**: Logs distribuidos. |

### **¿Cuándo usar Serverless?**

1. **Tareas cortas y rápidas:** Procesar imágenes, enviar emails, leer datos de sensores IoT.
2. **Tráfico impredecible:** Si tu app pasa de 0 a 10,000 usuarios en un minuto (ej: venta de entradas), Serverless escala mejor que nadie.
3. **APIs simples:** Backends para apps móviles o webs sencillas.

### **¿Cuándo NO usar Serverless?**

1. **Procesos largos:** Si tu código tarda más de 15 minutos en correr (ej: entrenar una IA, procesar un video largo), Lambda se cortará. Usa Containers o VMs.
2. **Latencia ultra-baja constante:** Si no puedes permitirte los 500ms del "Cold Start" (Arranque en frío), usa un contenedor siempre encendido.
3. **Sistemas Legacy:** No puedes "agarrar y mover" una app vieja a Serverless. Tienes que reescribir el código.