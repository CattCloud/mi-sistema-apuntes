# Servicios Core : SECURITY & IDENTITY

## Security & Identity **= Protección y Control de Acceso**

> **Security & Identity** se refiere a cómo **proteges tus datos** y **controlas quién puede acceder** a tus recursos en la nube.
En términos simples: es el sistema de seguridad (alarmas, cerraduras, guardias) de tu infraestructura cloud.
> 

<aside>

La seguridad en cloud NO es un complemento.

Es parte del diseño del sistema.

</aside>

**Antes del Cloud:**

- Comprabas firewalls físicos ($5,000 - $50,000)
- Contratabas equipos de seguridad (SOC - Security Operations Center)
- Instalabas software antivirus en cada servidor
- Gestionabas usuarios y contraseñas manualmente
- Auditorías de seguridad anuales costosas

**Con Cloud:**

- Seguridad integrada en la plataforma (firewalls virtuales, WAF)
- Herramientas de monitoreo y detección de amenazas automáticas
- Gestión centralizada de identidades (IAM)
- Cifrado automático de datos
- Auditorías y logs en tiempo real
- Pagas solo por los servicios de seguridad que usas

👉 En cloud, **Security & Identity = alquilar infraestructura de seguridad y gestión de identidades por Internet**.

### Shared Responsibility Model (Modelo de Responsabilidad Compartida)

> La seguridad ya no es solo tu problema, pero tampoco es solo problema de AWS/Google/Microsoft. Se dividen el trabajo.
> 

```
Proveedor: Seguridad DE la nube (infraestructura física)
Cliente: Seguridad EN la nube (tus datos y aplicaciones)
```

### 1. Responsabilidad del Proveedor (Security OF the Cloud)

El proveedor (AWS/Azure/GCP) protege la infraestructura que hace funcionar la nube.

- **Físico:** Muros de concreto, guardias armados en los datacenters.
- **Hardware:** Que nadie robe los discos duros o intervenga los cables.
- **Red Global:** Protección contra ataques masivos a su infraestructura.
- **Software Base:** Virtualización (Hypervisor) aislada para que un cliente no pueda ver los datos de otro.

### 2. Responsabilidad del Cliente (Security IN the Cloud)

Tú eres responsable de lo que pones *dentro* de la nube.

- **Tus Datos:** Si los dejas públicos, es tu culpa.
- **Tus Accesos (IAM):** Si pones tu contraseña en GitHub, es tu culpa.
- **Sistema Operativo:** Si no actualizas Windows/Linux en tu EC2, es tu culpa.
- **Firewalls (Security Groups):** Si abres el puerto 22 a todo el mundo, es tu culpa.

> **Resumen:**
Si un hacker entra al Datacenter y roba un disco físico, es culpa de **AWS**.
Si un hacker adivina tu contraseña "admin123", es culpa **tuya**.
> 

<aside>

### IMPORTANTE

 ❌ “Primero construyo… luego aseguro.” 

**Security by Design :** La seguridad se diseña desde el inicio. 

❌ El problema no es el hacking, la mayor cantidad de problemas de seguridad estan relacionadas con gestion de permisos,etc por parte del cliente

</aside>

### Diccionario de Conceptos de Security & Identity

| Concepto | Definición | Analogía del Mundo Real |
| --- | --- | --- |
| **IAM** (Identity and Access Management) | Sistema para gestionar quién puede acceder a qué recursos. | Como el sistema de llaves y permisos de un edificio de oficinas. |
| **Principal** | Entidad que puede realizar acciones (usuario, servicio, aplicación). | Como una persona o robot que intenta entrar al edificio. |
| **Policy (Política)** | Documento que define permisos (qué puede hacer quién). | Como el reglamento del edificio (reglas escritas). |
| **Role (Rol)** | Conjunto de permisos que se pueden asignar a usuarios/servicios. | Como un cargo (ej: "Gerente" tiene permisos de gerente). |
| **Permission (Permiso)** | Acción específica permitida (ej: leer, escribir, eliminar). | Como tener permiso para usar la sala de juntas. |
| **MFA** (Multi-Factor Authentication) | Autenticación con múltiples factores (contraseña + código SMS). | Como necesitar cédula + huella dactilar para entrar. |
| **SSO** (Single Sign-On) | Iniciar sesión una vez y acceder a múltiples aplicaciones. | Como una llave maestra que abre todas las puertas. |
| **Least Privilege (Menor Privilegio)** | Dar solo los permisos mínimos necesarios. | Como dar solo la llave de tu oficina, no de todo el edificio. |
| **Encryption (Cifrado)** | Convertir datos en código ilegible sin la clave correcta. | Como escribir en un idioma secreto que solo tú entiendes. |
| **Encryption at Rest** | Cifrar datos almacenados en disco. | Como guardar documentos en una caja fuerte. |
| **Encryption in Transit** | Cifrar datos mientras viajan por la red. | Como enviar documentos en un sobre sellado. |
| **Key Management** | Gestión de claves de cifrado (crear, rotar, eliminar). | Como gestionar las llaves físicas de un edificio. |
| **Compliance (Cumplimiento)** | Cumplir con regulaciones y estándares (GDPR, HIPAA, SOC 2). | Como cumplir con las leyes de construcción de edificios. |
| **Audit Log (Registro de Auditoría)** | Registro de todas las acciones realizadas (quién, qué, cuándo). | Como las cámaras de seguridad que graban todo. |
| **Zero Trust** | "Nunca confíes, siempre verifica" (verificar cada acceso). | Como pedir identificación incluso a empleados conocidos. |
| **Defense in Depth** | Múltiples capas de seguridad (no confiar en una sola). | Como tener puerta, alarma, cámaras y guardia. |

### Conceptos Fundamentales de Seguridad en Cloud

### **Zero Trust (Confianza Cero)**

> **Zero Trust** es un modelo de seguridad que dice: **"Nunca confíes, siempre verifica"**.
> 

**Principios:**

1. **Verificar explícitamente:** Autenticar y autorizar cada acceso
2. **Menor privilegio:** Dar solo los permisos mínimos necesarios
3. **Asumir brecha:** Diseñar como si ya hubiera un atacante dentro

**Antes (Perímetro de Seguridad):**

```
Fuera del edificio = No confiable (verificar)
Dentro del edificio = Confiable (no verificar)

Problema: Si un atacante entra, tiene acceso a todo
```

**Ahora (Zero Trust):**

```
Verificar CADA puerta, CADA vez, INCLUSO dentro del edificio
Beneficio: Si un atacante entra, solo accede a una habitación
```

**Analogía:** Como un aeropuerto. Verifican tu identidad en la entrada, en seguridad, en la puerta de embarque, etc. No confían solo porque ya pasaste la primera verificación.

### **Defense in Depth (Defensa en Profundidad)**

> **Defense in Depth** significa tener **múltiples capas de seguridad**, no confiar en una sola.
> 

**Capas:**

```
┌─────────────────────────────────────────────────────────────┐
│  DEFENSE IN DEPTH (Capas de Seguridad)                     │
└─────────────────────────────────────────────────────────────┘

Capa 1: Firewall de Red (bloquea IPs maliciosas)
  ↓
Capa 2: WAF (Web Application Firewall) (bloquea ataques SQL injection)
  ↓
Capa 3: IAM (verifica permisos)
  ↓
Capa 4: Cifrado (datos ilegibles sin clave)
  ↓
Capa 5: Audit Logs (detecta comportamiento anormal)
  ↓
Capa 6: Backups (recuperación ante desastres)
```

**Beneficio:** Si una capa falla, las otras siguen protegiendo.

### Principio de Menor Privilegio (Least Privilege)

> **Definición:** Dale a un usuario (o servicio) ÚNICAMENTE los **permisos mínimos necesarios** para hacer su trabajo, y ni uno más.
> 
- **Mal:** Darle permisos de "Administrador" a un desarrollador Junior por si acaso necesita borrar algo.
- **Bien:** Darle permiso de "Solo Lectura" en la base de datos de producción y "Escritura" solo en la de desarrollo.

## IAM (Identity and Access Management)

> **IAM** es el sistema para **gestionar identidades** (usuarios, servicios) y **controlar accesos** (permisos) a recursos en la nube.
> 
- **IAM** es el servicio que gestiona **quién** eres (Autenticación) y **qué** tienes permiso para hacer (Autorización).

Su objetivo principal es garantizar:

👉 **El acceso correcto**

👉 **A la persona correcta**

👉 **En el momento correcto**

👉 **Por el motivo correcto**

Esto se conoce como: **AAA Security Model**

Un modelo clásico de seguridad.

- **Authentication** : Verifica identidad.
- **Authorization** : Define permisos.
- **Accounting** (Auditing) : Registra qué acciones se realizaron.

### Componentes de IAM

### 1. **Users (Usuarios)**

**Qué son:** Identidades individuales (personas o aplicaciones).

- Pueden ser identidades humanos o maquinas
- Representan entidades autenticables.

**Características:**

- Tienen credenciales (usuario + contraseña, access keys)
- Se les asignan permisos directamente o vía grupos/roles

**Regla:** Un usuario = Una persona. Nunca compartas usuarios.

- Cada usuario debe ser único (no compartir cuentas)

**Ejemplo:**

```
Usuario: juan@empresa.com
Permisos: Leer buckets S3, Escribir en DynamoDB

```

**Mejores prácticas:**

- ✅ Un usuario por persona (no compartir credenciales)
- ✅ Usar MFA (Multi-Factor Authentication)
- ✅ Rotar contraseñas regularmente
- ❌ No usar usuario root para tareas diarias

### 2. **Groups (Grupos)**

**Qué son:** Colecciones de usuarios con permisos comunes.

**Para qué sirven:** Para administración fácil.

**Ejemplo:** Creas el grupo "Developers". Metes a Erick, Ana y Juan ahí. Le das permisos al **Grupo**, no a las personas individuales. Si Juan se va de la empresa, lo sacas del grupo y pierde los accesos.

**Características:**

- Facilita gestión (asignar permisos a grupo, no a cada usuario)
- Los usuarios heredan permisos del grupo

**Ejemplo:**

```
Grupo: Desarrolladores
  - Usuarios: Juan, María, Pedro
  - Permisos: Leer/Escribir en EC2, Leer S3

Grupo: Administradores
  - Usuarios: Ana, Carlos
  - Permisos: Acceso total (*)

```

### 3. **Roles (Roles)**

**Qué son:** Identidades temporales que pueden ser asumidas por usuarios o servicios.

**Diferencia con usuarios:**

- **Usuario:** Identidad permanente (persona)
- **Rol:** Identidad temporal (cargo, función)

**Casos de uso:**

1. **Servicios:** Una VM necesita acceso a S3 (le asignas un rol, no credenciales)
2. **Cross-account:** Usuario de cuenta A necesita acceso a cuenta B
3. **Federación:** Usuarios de Active Directory acceden a AWS

**Ejemplo:**

```
Rol: EC2-S3-ReadOnly
  - Permisos: Leer buckets S3
  - Asignado a: Instancias EC2

Cuando una EC2 asume este rol, puede leer S3 sin credenciales hardcodeadas
```

<aside>

### El papel de ROL en las distintas nubes

Si escuchas **Role** (AWS), **Service Account** (GCP) o **Managed Identity** (Azure), piensa inmediatamente: **"Identidad para que mi código acceda a cosas sin yo poner contraseñas".**

| **Proveedor** | **Nombre del Concepto** | **¿Cómo funciona?** |
| --- | --- | --- |
| **AWS** | **IAM Role** | Es un "sombrero". Tu servidor EC2 se "pone" el sombrero (asume el Rol) y obtiene permisos temporales. No tiene password. |
| **GCP** | **Service Account** | Es un "usuario robot". Tiene su propio email (`bot@...`). Puedes asociarlo a una VM (como en AWS) o descargarle unas "llaves" (archivo JSON) para usarlo desde fuera. |
| **Azure** | **Managed Identity** (o Service Principal) | Es lo equivalente. Creas una "Identidad Gestionada", se la pegas a tu Máquina Virtual, y Azure se encarga de la magia de fondo. |
</aside>

<aside>

### RBAC — Role Based Access Control

Modelo más usado en cloud.

En lugar de asignar permisos uno por uno:

👉 Asignas roles.

Ejemplo:

**Role: ReadOnlyDB**

Permite:

- Leer base de datos
- Consultar métricas

Pero NO:

- Borrar tablas
- Modificar esquemas
</aside>

### 4. **Policies (Políticas)**

**Qué son:** Documentos JSON que definen permisos.

**Estructura:**

- **Effect:** Allow (permitir) o Deny (denegar)
- **Action:** Qué acción (ej: s3:GetObject = leer objetos de S3)
- **Resource:** A qué recurso (ej: mi-bucket)
- **Condition (opcional):** Bajo qué condiciones (ej: solo desde IP de oficina)

```json
{
  "Version": "2012-10-17",
  "Statemen/dest": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mi-bucket/*"
    }
  ]
}
**:**
```

**Tipos de políticas:**

| Tipo | Qué es | Ejemplo |
| --- | --- | --- |
| **Identity-based** | Adjunta a usuarios/grupos/roles | "Juan puede leer S3" |
| **Resource-based** | Adjunta a recursos | "Este bucket S3 permite acceso a Juan" |
| **Service Control Policies (SCP)** | Límites a nivel de organización | "Nadie puede crear VMs en región X" |

### 5. **Permissions (Permisos)**

**Qué son:** Acciones específicas permitidas o denegadas.

**Formato:** `servicio:acción`

**Ejemplos:**

```
s3:GetObject          → Leer objetos de S3
s3:PutObject          → Escribir objetos en S3
ec2:StartInstances    → Iniciar instancias EC2
ec2:TerminateInstances → Eliminar instancias EC2
*:*                   → Todo (peligroso, solo para admin)
```

**Granularidad:**

```
Menos granular:  s3:*              (Todas las acciones en S3)
Más granular:    s3:GetObject      (Solo leer objetos)
Muy granular:    s3:GetObject en bucket específico

```

### MFA (Multi-Factor Authentication)

> **MFA (Autenticación Multifactor)** es un mecanismo de seguridad que requiere que el usuario presente **dos o más** tipos de evidencia (factores) diferentes para iniciar sesión.
> 

**El Problema:** Las contraseñas son débiles. Se pueden adivinar, robar (phishing) o reutilizar. Si tu seguridad depende solo de una contraseña ("admin123"), estás vendido.

**La Solución:** Si un hacker roba tu contraseña, **MFA lo detiene** porque le falta la segunda pieza del rompecabezas (tu teléfono o huella).

### Los 3 Factores de Autenticación

Para que sea MFA real, debes combinar al menos dos de estas categorías. (Usar dos contraseñas no es MFA, es solo doble molestia).

### 1. Algo que SABES (Knowledge)

- **Qué es:** Información que solo tú conoces.
- **Ejemplos:** Tu **Contraseña**, un PIN (4 dígitos), respuestas a preguntas de seguridad ("Nombre de tu primera mascota").
- **Seguridad:** Baja (Fácil de compartir o robar).

### 2. Algo que TIENES (Possession)

- **Qué es:** Un objeto físico que posees y que el hacker no tiene.
- **Ejemplos:**
    - **Tu Smartphone** (con una App generadora de códigos).
    - **YubiKey** (Una llave USB de seguridad).
    - **Tarjeta de coordenadas** (Bancos antiguos).
- **Seguridad:** Alta (El hacker tendría que robarte físicamente el objeto).

### 3. Algo que ERES (Inherence)

- **Qué es:** Características biológicas únicas de tu cuerpo.
- **Ejemplos:** Huella dactilar (TouchID), Reconocimiento Facial (FaceID), Escáner de Iris.
- **Seguridad:** Muy Alta (Difícil de falsificar).

> **La Ecuación del MFA:**
> 
> 
> Acceso = (Password 🧠) + (Código en el Celular 📱)
> 

### Tipos de dispositivos MFA en la Nube

Cuando configures MFA en AWS, Azure o Google, te darán a elegir estas opciones:

### A. Virtual MFA (Apps Autenticadoras)

- **Cómo funciona:** Instalas una App en tu celular. Escaneas un código QR en la pantalla de la nube.
- **TOTP (Time-based One-Time Password):** La App genera un código de 6 dígitos que cambia cada **30 segundos**.
- **Apps Populares:** Google Authenticator, Microsoft Authenticator, Authy.
- **Ventaja:** Gratis y fácil.
- **Riesgo:** Si pierdes el celular, pierdes el acceso (a menos que tengas códigos de recuperación).

### B. Hardware MFA (Llaves Físicas)

- **Cómo funciona:** Es un dispositivo USB pequeño (parece un pendrive).
- **Uso:** Lo conectas al puerto USB de la computadora y lo tocas con el dedo para autorizar el acceso.
- **Ejemplos:** YubiKey, Gemalto.
- **Ventaja:** Imposible de hackear remotamente. No depende de batería ni de señal móvil.
- **Desventaja:** Cuesta dinero ($40-$50 USD) y si lo pierdes físicamente es un problema.

### C. SMS MFA (Mensaje de Texto)

- **Cómo funciona:** Te envían el código por SMS.
- **Por qué evitarlo:** Existe el ataque "SIM Swapping" (clonación de chip). Un hacker puede interceptar tus SMS. Las nubes modernas están dejando de usar esto en favor de las Apps.

### Reglas de Oro para el Arquitecto Cloud

1. **MFA en Root es OBLIGATORIO:**
    - El usuario "Root" (dueño de la cuenta) tiene poder infinito. Si no tienes MFA activado en el Root, tu cuenta es una bomba de tiempo.
    - *Recomendación:* Ponle una contraseña de 30 caracteres Y activa MFA.
2. **MFA para todos los usuarios humanos:**
    - Cualquier usuario con acceso a la consola (desarrolladores, admins) debe tener MFA forzado.
3. **No usar MFA para Máquinas:**
    - A los Roles o Service Accounts (robots) no se les pone MFA, porque no tienen dedos para escribir códigos ni ojos para ver el celular. Ellos usan claves criptográficas complejas.

### SSO (Single Sign-On)

> **SSO** permite iniciar sesión **una vez** y acceder a **múltiples aplicaciones** sin volver a autenticarse.
> 

**Cómo funciona:**

```
1. Usuario inicia sesión en proveedor de identidad (ej: Google, Okta)
2. Proveedor genera token de autenticación
3. Usuario accede a App 1, App 2, App 3 con el mismo token
4. No necesita volver a ingresar contraseña
```

**Ejemplo:**

```
Sin SSO:
  - Gmail: usuario + contraseña
  - Google Drive: usuario + contraseña
  - YouTube: usuario + contraseña
  (3 veces la misma contraseña)

Con SSO:
  - Inicias sesión en Google una vez
  - Gmail, Drive, YouTube: acceso automático
  (1 sola vez)

```

**Beneficios:**

- ✅ Mejor experiencia de usuario (no recordar múltiples contraseñas)
- ✅ Más seguro (una contraseña fuerte vs. muchas débiles)
- ✅ Gestión centralizada (deshabilitar un usuario = pierde acceso a todo)

### Los Servicios de IAM por Proveedor

### 🟧 AWS: AWS IAM (El Técnico Granular)

**Nombre:** **AWS Identity and Access Management (IAM)**.

- **Filosofía:** "Control total y detallado".
- **Alcance:** Es un servicio **Global**. Si creas un usuario, existe en todas las regiones del mundo al mismo tiempo.
- **Cómo se siente:** Es muy "técnico". Todo se basa en documentos **JSON** (Policies) donde defines permisos muy específicos.
- **La Pieza Clave:** **Roles**. En AWS, el concepto de "Role" es el rey. Es lo que usas para conectar servicios entre sí (ej: que una Lambda pueda escribir en una base de datos).
- **Evolución:** AWS ahora empuja **IAM Identity Center** (antes llamado SSO) para gestionar humanos, dejando el IAM clásico más para máquinas y configuraciones base.

### 🟦 Azure: Microsoft Entra ID (El Corporativo)

**Qué es:** Servicio de gestión de identidades de Azure (renombrado a Microsoft Entra ID en 2023).

**Nombre:** **Microsoft Entra ID** (Antes conocido como **Azure Active Directory** o Azure AD).

- **Filosofía:** "Identidad Híbrida y Empresarial".
- **El Superpoder:** Es el mismo sistema que usa **Office 365** (Teams, Outlook).
    - Si tu empresa ya usa correos de Microsoft, ¡ya tienes los usuarios creados en Azure! No tienes que hacer nada nuevo. Es la razón #1 por la que las grandes empresas eligen Azure.
- **Estructura:** Funciona por **Directorios** (Tenants). Es muy estricto con la jerarquía.
- **Identidad de Máquina:** Se llaman **Managed Identities**. Son fantásticas porque Azure gestiona la rotación de contraseñas por ti automáticamente.

### 🟥 GCP: Cloud IAM (El Jerárquico)

**Qué es:** Servicio de gestión de identidades y accesos de GCP.

**Nombre:** **Cloud IAM**.

- **Filosofía:** "Simplicidad y Jerarquía".
- **Estructura:** Se basa en **Organización → Carpetas → Proyectos**.
    - **Herencia:** Permisos se heredan de organización → carpeta → proyecto → recurso
    - Si das permiso a un usuario en la "Carpeta de Desarrollo", automáticamente tiene permiso en todos los 50 proyectos que estén dentro. La herencia es muy fuerte aquí.
- **Identidad de Máquina:** **Service Accounts**. En Google, las cuentas de servicio son ciudadanos de primera clase. Tienen su propio email (`robot@proyecto.google.com`) y se usan para todo, desde conectar con Firebase hasta hablar con BigQuery.

## Tabla Comparativa: IAM

- **Flexibilidad**: AWS IAM (políticas JSON muy granulares)
- **Integración empresarial**: Azure AD (ecosistema Microsoft)
- **Simplicidad**: GCP Cloud IAM (herencia de permisos)

| **Característica** | **🟧 AWS IAM** | **🟦 Azure AD / Entra ID** | **🟥 GCP Cloud IAM** |
| --- | --- | --- | --- |
| **Formato de políticas** | JSON (complejo) | RBAC (roles predefinidos) | Roles (simple) |
| **Roles para servicios** | IAM Roles | Managed Identities | Service Accounts |
| **SSO** | AWS SSO (separado) | ✅ **Nativo** (integrado) | Cloud Identity (separado) |
| **MFA** | ✅ | ✅ | ✅ |
| **Integración AD** | AWS Directory Service | ✅ **Nativo** | Cloud Identity Sync |
| **Herencia de permisos** | ❌ | Grupos | ✅ **Org → Proyecto** |
| **Precio** | Gratis | Gratis (básico) / $6-9/usuario (premium) | Gratis |
| **Killer Feature** | Políticas JSON flexibles | Integración con Microsoft | Herencia de permisos |

## ENCRYPTION (Cifrado)

> **Encryption** es el proceso de convertir información legible (Texto Plano) en un desorden de caracteres sin sentido (Texto Cifrado) usando una fórmula matemática y una **Llave (Key)**.
> 
> 
> Solo quien tenga la **Llave** correcta puede revertir el proceso y leer el mensaje original.
> 

**Por qué es crítico:**

- ✅ Protege datos si son robados (el ladrón no puede leerlos)
- ✅ Cumplimiento normativo (GDPR, HIPAA requieren cifrado)
- ✅ Protege datos en tránsito (evita espionaje en la red)

<aside>

### Por qué el cifrado es CRÍTICO en Cloud

En cloud:

- Los datos viajan por redes públicas
- Los datos se almacenan en infraestructura compartida
- Los discos pueden copiarse, replicarse o moverse

El cifrado garantiza que:

👉 **Ni siquiera el proveedor cloud pueda leer tus datos** (en ciertos modelos).

</aside>

### Los 2 Estados de los Datos (At Rest vs. In Transit)

En la nube, tus datos siempre están en uno de estos dos estados. Debes proteger ambos.

Un sistema profesional **SIEMPRE** tiene ambos:

- Encryption atRest  ✅
- Encryption in Transit ✅

### Encryption at Rest (Cifrado en Reposo)

- **¿Qué es?** Son datos que **no se están moviendo** a través de una red. Están escritos físicamente en algún medio de almacenamiento. Han llegado a su destino y están "durmiendo".
- **¿Dónde viven?**
    - En el disco duro de tu servidor (EBS en AWS).
    - En una base de datos guardada (RDS, MySQL).
    - En un archivo subido a la nube (un objeto en S3 o Azure Blob).
    - En una copia de seguridad (Backup) en una cinta o disco frío.
- **El Peligro (La Amenaza):**
    - **Robo Físico:** Alguien entra al Datacenter de Google y arranca el disco duro del servidor.
    - **Robo Lógico:** Un hacker logra entrar a tu servidor Linux y copia la carpeta `/var/www/html/secretos`.
- **La Defensa:** **Cifrado de Disco (Disk Encryption).**
    - Aunque el ladrón se robe el disco duro físico y se lo lleve a su casa, si lo conecta a su computadora, solo verá ruido estático (basura ilegible) porque no tiene la llave para descifrarlo.
    - *Estándar de la industria:* AES-256.

**Cómo funciona el cifrado:**

```
1. Escribes datos en disco
2. El proveedor cifra automáticamente con clave (AES-256)
3. Datos se guardan cifrados
4. Cuando lees, se descifran automáticamente (transparente para ti)
```

### Encryption in Transit (Cifrado en Tránsito)

- **¿Qué es?** Son datos que están **viajando** activamente de un punto A a un punto B. Están fluyendo por cables de fibra óptica, routers o señales Wi-Fi.
- **¿Por dónde viajan?**
    - Desde el navegador de tu usuario (Chrome) hasta tu servidor (Frontend a Backend).
    - Desde tu servidor hasta la base de datos (Backend a DB).
    - Desde tu laptop hasta la nube cuando subes código.
- **El Peligro (La Amenaza):**
    - **Man-in-the-Middle (MITM):** Imagina que estás en el Wi-Fi gratis de un Starbucks. Un hacker en la mesa de al lado puede usar una antena para "escuchar" todo lo que vuela por el aire. Si tus datos van "desnudos" (texto plano), él puede leer tu contraseña mientras viaja desde tu celular al router.
- **La Defensa:** **Túneles Seguros (TLS/SSL).**
    - Creamos un "tubo blindado" entre el origen y el destino. Aunque el hacker intercepte los paquetes de datos en el aire, no puede entenderlos porque viajan cifrados.
    - *Lo que ves:* El candadito 🔒 **HTTPS** en el navegador.

**Cómo funciona el cifrado:** 

```
1. Cliente y servidor negocian cifrado (SSL/TLS handshake)
2. Intercambian claves (usando cifrado asimétrico)
3. Datos viajan cifrados (usando cifrado simétrico)
4. Receptor descifra con la clave compartida
```

![image.png](image%2027.png)

### Tipos de Cifrado

La diferencia entre Simétrico y Asimétrico radica en **cuántas llaves** existen y **quién las tiene**.

### 1. **Symmetric Encryption (Cifrado Simétrico)**

**Qué es:** Usa la **misma clave** para cifrar y descifrar.

- En el cifrado simétrico, existe una **ÚNICA LLAVE** (Secret Key).
Esa misma llave sirve tanto para **Cerrar** (Cifrar) como para **Abrir** (Descifrar) el candado.

**Cómo funciona:**

```
Cifrado:
  Texto plano + Clave → Texto cifrado

Descifrado:
  Texto cifrado + Clave → Texto plano

```

**Ventajas:**

- ✅ Muy rápido (ideal para grandes volúmenes de datos)

**El Gran Problema (Key Distribution):**

❌ Problema de distribución de claves (¿cómo envías la clave de forma segura?)

¿Cómo le pasas la llave a tu amigo que vive en otro país sin que nadie la intercepte?

- Si se la envías por email, pueden leerla.
- Si se la dices por teléfono, pueden escucharte.
- *Conclusión:* Es muy inseguro para **iniciar** una conversación con desconocidos.

**Algoritmos:**

- **AES (Advanced Encryption Standard):** El estándar actual (AES-256)
- **DES / 3DES:** Obsoletos (no usar)

**Uso:** Cifrar datos en reposo (discos, bases de datos).

### 2. **Asymmetric Encryption (Cifrado Asimétrico)**

**Qué es:** Usa **dos claves** (pública y privada).

- Aquí usamos **DOS LLAVES DIFERENTES** que están matemáticamente conectadas.
1. **Llave Pública (Public Key):** Se la das a todo el mundo. Sirve solo para **Cerrar (Cifrar)**.
2. **Llave Privada (Private Key):** La guardas tú y nadie más la ve. Sirve solo para **Abrir (Descifrar)**.

**Cómo funciona:**

```
Clave Pública: Puede compartirse con todos (cifra)
Clave Privada: Solo tú la tienes (descifra)

Cifrado:
  Texto plano + Clave Pública → Texto cifrado

Descifrado:
  Texto cifrado + Clave Privada → Texto plano

```

**Ventajas:**

- ✅ No necesitas compartir clave privada (más seguro)

**Desventajas:**

- ❌ Más lento que cifrado simétrico

**Algoritmos:**

- **RSA:** El más usado (RSA-2048, RSA-4096)
- **ECC (Elliptic Curve Cryptography):** Más eficiente que RSA

**Uso:** Cifrar datos en tránsito (HTTPS, SSL/TLS), firmas digitales.

hoy en dia , todo el Internet seguro funciona usando **AMBOS** a la vez.

### Caso Real : Cifrado Hibrido

1. **El Saludo (Asimétrico):** 
    
    > **Poblema** : El navegador tiene la llame simetrica pero como compartirlo al servidor de forma segura?
    > 
    - Tu navegador y el Servidor del Banco se saludan.
    - El Banco te da su **Llave Pública**.
        - El Banco te dice: *"Navegador. Aquí tienes mi candado personal. Cualquiera puede cerrarlo, pero **solo yo tengo la llave** para abrirlo."*
    - Tu navegador crea una **Llave Simétrica temporal** (una contraseña rápida), la cifra con la Llave Pública del banco y se la envía.
        - Tú escribes en un papel: **"La combinación de mi maletín será 55-99(Clave asimetrica)"**.
        - Le pones el **Candado del Banco** y lo cierras. ¡Clic! 🔒 (Ahora, ni siquiera tú puedes volver a abrir esa caja. Solo el Banco).
        - Envías la caja cerrada al Banco.
    - El Banco usa su Llave Privada para descifrarla. (El servidor del banco solo tiene la llave para abrirlo y ver el contenido)
        - Abre su candado y lee el papel: *"Ajá, la combinación es 55-99***(Clave asimetrica)***"*.
    - *Resultado:* Ahora ambos tienen la Llave Simétrica y nadie más la vio.
2. **La Conversación (Simétrico):**
    - Como el Asimétrico es muy lento, dejan de usarlo.
    - Ahora usan la **Llave Simétrica** (que acaban de compartir) para cifrar todos los datos de tu saldo, transferencias, etc., a toda velocidad.

> En resumen
> 
> - Usa **Asimétrico** para intercambiar la llave.
> - Usa **Simétrico** para cifrar los datos

![image.png](image%2028.png)

<aside>

### Keys (Claves)

El cifrado gira alrededor de Keys

Es un valor secreto que permite:

- cifrar datos
- descifrar datos

👉 **La seguridad real no está en el algoritmo, sino en la clave.**

</aside>

<aside>

### Key Management (Gestión de Claves)

> **Key Management** es el proceso de crear, almacenar, rotar y eliminar **claves** de cifrado de forma segura.
> 

**Problema:**

```
Tienes 100 bases de datos cifradas.
Cada una tiene una clave diferente.
¿Dónde guardas las claves? ¿Cómo las rotas? ¿Cómo las auditas?

```

**Solución:** Usar un **Key Management Service (KMS)**.

</aside>

<aside>

### KMS (Key Management Service)

**Qué es:** Servicio administrado para gestionar claves de cifrado.

- **KMS** es un servicio gestionado que **crea, guarda y rota** las llaves de cifrado por ti.
- **Funcionamiento:** Tú le dices a S3: "Cifra este archivo". S3 habla con KMS, le pide permiso para usar la llave, cifra el archivo y te confirma. Tú nunca tocas la llave real.

**Características:**

- **Centralizado:** Todas las claves en un solo lugar
- **Seguro:** Claves nunca salen del servicio (no puedes exportarlas)
- **Auditable:** Logs de quién usó qué clave y cuándo
- **Rotación automática:** Rota claves automáticamente (cada año)

**Tipos de claves:**

| Tipo | Qué es | Quién gestiona |
| --- | --- | --- |
| **AWS-managed keys** | Claves gestionadas por AWS | AWS (gratis) |
| **Customer-managed keys (CMK)** | Claves gestionadas por ti | Tú ($1/mes por clave) |
| **Custom key store (CloudHSM)** | Claves en hardware dedicado | Tú (muy caro) |

**Ejemplo de uso:**

```
1. Creas una clave en KMS (CMK)
2. Configuras S3 para cifrar con esa clave
3. Subes archivo a S3
4. S3 pide a KMS que cifre el archivo
5. KMS cifra y devuelve datos cifrados
6. S3 guarda datos cifrados

```

**Beneficios:**

- ✅ No guardas claves en código (más seguro)
- ✅ Rotación automática (menos trabajo)
- ✅ Auditoría (quién usó qué clave)
</aside>

<aside>

### HSM (Hardware Security Module)

**Qué es:** Dispositivo físico dedicado para gestionar claves de cifrado.

- Es el dispositivo físico (hardware blindado) donde los proveedores guardan las llaves maestras en sus datacenters. Es a prueba de manipulaciones físicas.
- **Para la mayoría de casos, KMS es suficiente**

**Diferencia con KMS:**

- **KMS:** Software (claves en servidores compartidos)
- **HSM:** Hardware dedicado (claves en dispositivo físico exclusivo para ti)

**Por qué usar HSM:**

- ✅ Cumplimiento normativo (algunos requieren HSM, ej: PCI-DSS nivel 1)
- ✅ Mayor seguridad (claves nunca salen del hardware)
- ✅ Certificación FIPS 140-2 Level 3 (estándar de seguridad)

**Desventajas:**

- ❌ Muy caro (~$1,000-$5,000/mes)
- ❌ Más complejo de gestionar

**Servicios:**

- **AWS:** CloudHSM
- **Azure:** Dedicated HSM
- **GCP:** Cloud HSM (usa CloudHSM de AWS)

**Cuándo usar:**

- Solo si cumplimiento normativo lo requiere
</aside>

### SSL/TLS Certificates (Certificados SSL/TLS)

**Qué son:** Archivos digitales que verifican la identidad de un sitio web y habilitan HTTPS.

Un Certificado SSL/TLS cumple dos funciones vitales:

1. **Identidad:** Garantiza que "google.com" es realmente Google y no un hacker ruso fingiendo ser Google.
2. **Cifrado:** Habilita el HTTPS. Sin certificado, el tráfico viaja desnudo (HTTP).

**Componentes:**

- **Certificado:** Identidad del sitio (nombre de dominio, organización)
- **Clave pública:** Para cifrar datos
- **Clave privada:** Para descifrar datos (solo el servidor la tiene)
- **Firma digital:** Verificación de autoridad certificadora (CA) , verifica que eres legitimo

**Cómo funciona la conexion HTTPS:**

Cuando entras a una web, esto pasa en milisegundos:

1. **Navegador :** "¡Hola! Quiero entrar a `banco.com`. Identifícate". -> Cliente (navegador) se conecta a servidor
2. **Server de la pagina:** "Hola. Aquí está mi Certificado ". → Servidor envía certificado SSL/TLS
3. **Navegador :** Mira el certificado y se hace 3 preguntas: →  Cliente verifica certificado (¿es válido? ¿no expiró? ¿firma de CA confiable?)
    - *"¿El nombre coincide?"* (¿Dice `banco.com` o dice `hacker.com`?)
    - *"¿Está caducado?"* (Los certificados vencen, como los pasaportes).
    - *"¿Quién firmó esto?"* (¿Lo firmó una autoridad confiable como "DigiCert" o lo firmó "Pepito el de los palotes"?).
4. **Veredicto: →** Cliente y servidor negocian cifrado (TLS handshake)
    - Si todo está bien ✅: Aparece el candado y empieza el cifrado Híbrido.
    - Si algo falla ❌: El navegador te muestra la pantalla roja de "SU CONEXIÓN NO ES PRIVADA".

**Tipos de certificados:**

| Tipo | Validación | **Confianza** | Precio | Uso |
| --- | --- | --- | --- | --- |
| **Domain Validation (DV)** | Solo dominio
El robot de la CA solo verifica que **tienes la contraseña del dominio**. Te envía un email a `admin@tu-sitio.com` y si respondes, te lo dan. | Baja (sé que eres el dueño del dominio, pero no sé quién eres tú). | Gratis (Let's Encrypt) | Blogs, sitios personales |
| **Organization Validation (OV)** | Dominio + organización
La CA verifica que tu empresa existe legalmente (revisa registros públicos). | Media | $50-$200/año | Empresas que quieren que su nombre aparezca en los detalles del certificado. |
| **Extended Validation (EV)** | Validación exhaustiva
Te piden papeles legales, llaman a la oficina, verifican la dirección física. | Maxima | $200-$1,000/año | Bancos, e-commerce |

### Los Servicios de Encryption por Proveedor

### 🟧 AWS: AWS KMS (El Estándar)

**Nombre:** **AWS Key Management Service (KMS)**.

**Qué es:** Servicio administrado para gestionar claves de cifrado.

- **Filosofía:** "Integración Profunda".
- **Lo Importante:** Es casi imposible usar AWS sin tocar KMS. Está pegado con pegamento a todo: S3, Discos EBS, Bases de Datos RDS.
- **Cómo funciona:**
    - **AWS Managed Keys:** Llaves que AWS crea y gestiona por ti. Son gratis y automáticas. (La opción por defecto).
    - **Customer Managed Keys (CMK):** Llaves que TÚ creas y controlas. Tú decides cuándo rotarlas o borrarlas.
- **Nivel Dios:** **AWS CloudHSM**. Es un servicio donde te alquilan un aparato físico (hardware) dedicado solo para ti dentro de sus datacenters. Úsalo solo si eres un banco o gobierno y la ley te obliga a no compartir hardware con nadie.

**AWS ACM (Certificate Manager) :** Servicio para gestionar certificados SSL/TLS.

**Características:**

- **Gratis:** Para uso en AWS (ALB, CloudFront, API Gateway)
- **Renovación automática:** Cada 90 días
- **Validación:** DV (Domain Validation)

### 🟦 Azure: Azure Key Vault (La Bóveda Total)

**Qué es:** Servicio para gestionar claves, secretos y certificados.

**Nombre:** **Azure Key Vault**.

- **Filosofía:** "Todo secreto va aquí".
- **Lo Importante:** A diferencia de AWS (que separa secretos de llaves), Azure Key Vault es una **Caja Fuerte Universal**.
    - Guarda **Llaves de Cifrado** (para encriptar discos).
    - Guarda **Secretos** (Contraseñas de base de datos, API Keys).
    - Guarda **Certificados SSL** (para HTTPS).
- **Para el Dev:** Es el favorito de los programadores .NET y Java porque centraliza toda la seguridad de la aplicación en un solo lugar.

### 🟥 GCP: Cloud KMS (El Global)

**Nombre:** **Cloud Key Management Service (Cloud KMS)**.

**Qué es:** Servicio administrado para gestionar claves de cifrado.

- **Filosofía:** "Escala Global y Flexibilidad".
- **Lo Importante:** Es muy potente para gestionar llaves distribuidas por el mundo.
- **External Key Manager (EKM):** Google tiene una función muy fuerte que te permite usar llaves que **ni siquiera están en Google**. Puedes tener la llave física en tu oficina y conectar Google Cloud para que la use. (Ideal para empresas paranoicas que no confían ni en Google).

## Tabla Comparativa: Encryption Services

| **Característica** | **🟧 AWS KMS** | **🟦 Azure Key Vault** | **🟥 GCP Cloud KMS** |
| --- | --- | --- | --- |
| **Precio (clave)** | $1/mes | $0 (Standard) / $1 (Premium) | $0.06/mes |
| **Rotación automática** | ✅ (anual) | ✅ (configurable) | ✅ (configurable) |
| **HSM** | CloudHSM ($1,000/mes) | Dedicated HSM ($4,000/mes) | Cloud HSM ($900/mes) |
| **Certificados SSL** | ACM (gratis) | Key Vault ($70/año) | Google-managed (gratis) |
| **Multi-región** | ✅ | ✅ | ✅ |

## COMPLIANCE (Cumplimiento Normativo)

> **Compliance** (Cumplimiento) significa cumplir con **regulaciones, leyes y estándares** de seguridad y privacidad.
> 

**Por qué es crítico:**

- ✅ Evitar multas millonarias (GDPR: hasta €20M o 4% de ingresos anuales)
- ✅ Evitar demandas legales
- ✅ Ganar confianza de clientes (certificaciones = credibilidad)
- ✅ Acceder a ciertos mercados (ej: salud requiere HIPAA)

### Principales Regulaciones y Estándares

### **PCI-DSS (Payment Card Industry Data Security Standard)**

**Qué es:** Estándar de seguridad para empresas que procesan tarjetas de crédito.

**Aplica a:** E-commerce, procesadores de pagos, cualquier empresa que almacene/procese datos de tarjetas.

**Requisitos clave:**

- ✅ Cifrado de datos de tarjetas (nunca almacenar CVV)
- ✅ Firewall (proteger red de pagos)
- ✅ Auditorías regulares (anuales)
- ✅ No almacenar datos de tarjetas si no es necesario (usa Stripe, PayPal)

**Niveles:**

- **Nivel 1:** >6M transacciones/año (auditoría anual obligatoria)
- **Nivel 4:** <20K transacciones/año (auto-evaluación)

**Multas:**

- $5,000 - $100,000 por mes de incumplimiento

**Ejemplo:** Si vendes productos online y aceptas tarjetas, debes cumplir PCI-DSS.

### **ISO 27001**

**Qué es:** Estándar internacional de gestión de seguridad de la información.

**Aplica a:** Cualquier empresa que quiera demostrar buenas prácticas de seguridad.

**La Regla:** Es un manual de "buenas prácticas" para gestionar la seguridad en una empresa.

**Requisitos:**

- ✅ Sistema de gestión de seguridad (ISMS)
- ✅ Evaluación de riesgos
- ✅ Controles de seguridad (143 controles)
- ✅ Auditorías regulares

### Certificaciones de Proveedores Cloud

**Los proveedores cloud (AWS, Azure, GCP) tienen certificaciones que TÚ puedes heredar.**

**En la Nube, tú HEREDAS el cumplimiento.**
AWS/Azure/Google ya gastaron millones certificando sus datacenters.

- Cuando el auditor te pregunta: *"¿Cómo proteges el acceso físico al servidor?"*
- Tú respondes: *"Uso AWS. Aquí está el certificado ISO 27001 de AWS que prueba que ELLOS lo protegen."*
- **Resultado:** Te ahorraste el 50% de la auditoría.
    
    **Ejemplo:**
    

```
Tu app corre en AWS.
AWS tiene certificación HIPAA.
Tú firmas BAA (Business Associate Agreement) con AWS.
→ Tu app puede cumplir HIPAA (pero debes configurar correctamente)
```

### Servicios de Compliance por Proveedor

¿Dónde descargas esos certificados para dárselos a tu auditor?

### 🟧 AWS: AWS Artifact

- **Qué es:** Un portal de autoservicio gratuito.
- **Función:** Entras y descargas los informes de auditoría de AWS (ISO, PCI, SOC). Son PDFs legales que le entregas a tus auditores.
- **Concepto:** Es tu "biblioteca de evidencias".

### 🟦 Azure: Microsoft Purview / Azure Policy

- **Qué es:** Azure se enfoca mucho en el "Gobierno".
- **Azure Policy:** Es una herramienta activa. Puedes crear una regla que diga: *"Nadie puede crear servidores fuera de Europa"* (para cumplir con GDPR). Si alguien intenta crear uno en EE.UU., Azure lo bloquea.
- **Service Trust Portal:** Es el equivalente a AWS Artifact para descargar documentos.

### 🟥 GCP: Compliance Resource Center

- **Qué es:** Similar a los anteriores, una central de recursos donde Google publica sus certificaciones y guías sobre cómo configurar GCP para cumplir con leyes específicas.