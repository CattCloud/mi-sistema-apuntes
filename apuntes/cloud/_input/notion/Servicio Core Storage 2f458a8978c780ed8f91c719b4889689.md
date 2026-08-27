# Servicio Core: Storage

## Que es Storage?

> Storage se refiere a los **recursos de almacenamiento (discos, espacio) que necesitas para guardar tus datos**: archivos, imágenes, videos, bases de datos, backups, logs, etc.
**En términos simples:** es la capacidad de "recordar" y "guardar" información que tu aplicación necesita.
> 
- **El concepto clave aquí es la PERSISTENCIA.**
Si apagas una máquina virtual (Compute), su memoria RAM se borra. Si quieres que los datos sobrevivan (fotos de usuarios, bases de datos, logs), necesitas moverlos a una capa de **Storage**.

**Antes del Cloud:**

- Comprabas discos duros físicos ($100 - $10,000)
- Los instalabas en tus servidores o NAS (Network Attached Storage)
- Si se llenaban, comprabas más discos
- Si un disco fallaba, perdías datos (a menos que tuvieras RAID o backups)
- Capacidad fija: pagabas por 1TB aunque solo usaras 100GB

**Con Cloud:**

- **Capacidad ilimitada:** Nunca te quedas sin espacio.
- **Durabilidad extrema:** El proveedor replica tus datos en múltiples discos y datacenters automáticamente.
- **Elasticidad:** Pagas por Gigabyte (GB) almacenado. Si borras datos, dejas de pagar.
- **Accesibilidad:** Tus datos están disponibles desde cualquier lugar del mundo (si así lo configuras).

👉 En cloud, **Storage = alquilar espacio de disco por Internet**.

### Diccionario de Conceptos de Storage

**Latencia**: Es el tiempo de retardo que transcurre desde que envías una solicitud de lectura o escritura hasta que recibes los datos.

| Concepto | Definición | Analogía del Mundo Real |
| --- | --- | --- |
| **Throughput (Rendimiento)** | Cantidad de datos que puedes leer/escribir por segundo (MB/s, GB/s). | Como cuántos platos puede servir un restaurante por hora. |
| **IOPS** | Input/Output Operations Per Second. Operaciones de lectura/escritura por segundo. | Como cuántas transacciones puede procesar un cajero por minuto. |
| **Replication (Replicación)** | Copiar tus datos automáticamente en múltiples ubicaciones para evitar pérdida. | Como tener fotocopias de un documento importante en 3 lugares diferentes. |
| **Encryption at Rest** | Cifrado de datos cuando están guardados en disco. | Como guardar documentos en una caja fuerte cerrada con llave. |
| **Encryption in Transit** | Cifrado de datos cuando viajan por la red (HTTPS, TLS). | Como enviar documentos en un sobre sellado por correo certificado. |
| **Versioning** | Guardar múltiples versiones de un archivo (como historial de cambios). | Como Google Docs que te deja ver versiones anteriores de un documento. |
| **Lifecycle Policy** | Reglas automáticas para mover o borrar datos según su edad. | Como una regla de "tirar la comida del refrigerador después de 7 días". |
| **Object** | Unidad básica de almacenamiento en Object Storage (archivo + metadata). | Como un archivo en tu computadora, pero con etiquetas extra (tags, fecha, permisos). |
| **Bucket** | Contenedor lógico donde guardas objetos (en Object Storage). | Como una carpeta principal o un "balde" donde tiras archivos. |
| **Volume** | Disco virtual que se "monta" en una VM (en Block Storage). | Como un disco duro externo USB que conectas a tu laptop. |
| **Mount Point** | Ruta donde se "conecta" un volumen o file system en el OS (ej: `/mnt/data`). | Como la letra de unidad en Windows (C:, D:, E:). |
| **Snapshot** | Copia de respaldo de un volumen en un momento específico. | Como una "foto" de tu disco duro que puedes restaurar después. |
| **Hot Storage** | Almacenamiento de acceso frecuente (rápido, más caro). | Como tener comida en la mesa, lista para comer. |
| **Cool/Cold Storage** | Almacenamiento de acceso poco frecuente (más lento, más barato). | Como tener comida en el refrigerador. |

### Durabilidad vs. Disponibilidad - No es lo mismo que el dato "exista" a que puedas "verlo"

**1. Durabilidad (Integridad): Probabilidad de NO perder tus datos.**
Responde a: **¿El dato sigue existiendo o se corrompió/borró?**
Si AWS dice que tiene "11 nueves" de durabilidad (99.999999999%), significa que si guardas 10,000 archivos, podrías perder 1 archivo cada 10 millones de años.

**2. Disponibilidad (Acceso): Probabilidad de poder ACCEDER a tus datos cuando los necesitas.**
Responde a: **¿Puedo descargar el dato AHORA MISMO?**
Si se cae el internet del datacenter, tu disponibilidad baja a 0%, pero tu durabilidad sigue intacta (el dato está seguro en el disco, solo que no puedes llegar a él).

### Clasificación de los Datos (¿Qué guardamos?)

| **Tipo de Dato** | **Descripción** | **Ejemplo** | **Dónde se suele guardar** |
| --- | --- | --- | --- |
| **Estructurado** | Datos altamente organizados con un formato rígido (filas y columnas). | Tablas de bases de datos (SQL), Excel, Inventarios. | Block Storage (para DBs) |
| **No Estructurado** | Datos que no tienen un formato predefinido. Son "archivos sueltos". Es el 80% de los datos del mundo. | Fotos, Videos, PDFs, Emails, Audios, Redes Sociales. | Object Storage |
| **Semi-estructurado** | Tienen cierta organización interna pero no rígida. | Archivos JSON, XML, HTML, Logs de servidores. | Object o NoSQL DBs |

## Los 3 Tipos de Storage en Cloud

> Storage no es "un disco".
Storage es el tipo de abstracción sobre cómo guardas y accedes a los datos.
**¿Qué tipo de datos guardas y cómo los usas?**
> 

**Cada tipo está optimizado para un caso de uso diferente.**

| Tipo | Qué es | Analogía | Caso de Uso |
| --- | --- | --- | --- |
| **Object Storage** | Almacenamiento de archivos completos sin estructura jerárquica. 
Acceso vía HTTP/API. | Almacén de Amazon: cajas con etiquetas únicas, sin carpetas. | Backups, imágenes, videos, data lakes, static websites |
| **Block Storage** | Disco virtual que se monta en una VM. 
Acceso a nivel de bloques (sectores). | Disco duro externo USB conectado a tu PC. | Bases de datos, sistemas operativos, apps que necesitan disco local |
| **File Storage** | Sistema de archivos compartido (carpetas y archivos). 
Acceso vía NFS/SMB. | Carpeta compartida en red de oficina | Content management, desarrollo colaborativo, home directories |

![image.png](image%209.png)

## OBJECT STORAGE (Almacenamiento de Objetos)

> Para datos no estructurados
**Object Storage** es una arquitectura diseñada para almacenar cantidades masivas de datos no estructurados (fotos, videos, backups, logs) de forma masiva, durable y escalable, accesibles vía API HTTP.
> 
> - No se accede como un disco
>     - A diferencia de tu disco duro (que usa carpetas), aquí **no hay jerarquía**. Es un espacio plano donde cada archivo es un "Objeto" único.
> - No se monta como una carpeta
> - Se accede por **requests**

Object Storage almacena datos como **objetos independientes**, cada uno con:

- **Data** (el archivo en sí: imagen, video, PDF, etc.)
- **Metadata** (información sobre el archivo: fecha, tamaño, tipo, tags personalizados)
- **Unique ID** (**identificador único global**, como un código de barras)

**No hay carpetas reales**. Aunque en la consola web veas "carpetas", son solo prefijos en el nombre del archivo.

<aside>

Imagina que en lugar de un archivero con carpetas dentro de carpetas (File Storage), tienes una **piscina de bolas gigante**.

- Tiras el archivo (Objeto) a la piscina.
- El sistema te da un **Identificador Único (Key/URL)** para encontrarlo.
- Para recuperarlo, no dices "abre carpeta X -> subcarpeta Y", simplemente entregas el ID y el sistema te devuelve el objeto.
</aside>

### Componentes Clave

1. **Object (El Dato):** El archivo en sí (imagen, pdf, video). Es binario (ceros y unos).
2. **Metadata (La Etiqueta):** Información *sobre* el dato.
    - A diferencia de un disco normal, aquí puedes agregar etiquetas personalizadas: `proyecto: "web-v1"`, `autor: "juan"`, `borrar-en: "2026"`. Esto es superpoderoso para búsquedas y organización.
3. **Key (La Llave):** El nombre único del objeto (ej: `fotos/perfil-juan.jpg`). Aunque veas una barra `/`, **no es una carpeta real**, es solo parte del nombre (prefijo).
4. **Bucket / Container:** Es el "**contenedor lógico**" de nivel superior donde guardas los objetos. (Piensa en él como la unidad raíz `C:` o un disco externo virtual).
    - *Nota:* Los nombres de los Buckets suelen ser **globalmente únicos** (nadie más en el mundo puede tener un bucket con el mismo nombre en AWS S3).

![image.png](image%2010.png)

### El Problema que Resuelve

**"Necesito guardar millones de archivos sin preocuparme por discos llenos o estructura de carpetas".**

- **Antes (Discos tradicionales):** Tenías que planificar particiones, carpetas, permisos. Si el disco se llenaba, tenías que agregar otro y reorganizar.
- **Ahora (Object Storage):** Tiras archivos a un "balde" (bucket) y el proveedor se encarga de distribuirlos, replicarlos y escalarlos infinitamente.

### Características Clave

- **Acceso vía HTTP/API**: No "montas" el storage como un disco. Accedes con URLs o SDKs.
- **Escalabilidad Infinita**: Puedes guardar petabytes sin preocuparte por particiones o límites.
- **Durabilidad Extrema**: 99.999999999% (11 nueves). Tus datos están replicados automáticamente en múltiples datacenters.
- **Metadata Rica**: Puedes agregar tags personalizados (ej: `project=marketing`, `year=2024`).
- **Versionado**: Puedes guardar múltiples versiones del mismo archivo.
- **Flat Namespace**: No hay estructura de carpetas real (aunque se simule visualmente).

### ¿Cuándo NO usar Object Storage?

❌ **Bases de datos transaccionales**: No puedes ejecutar SQL sobre objetos.
❌ **Archivos que cambias constantemente**: Cada cambio = subir el archivo completo de nuevo.
❌ **Acceso de baja latencia**: No es tan rápido como un SSD local.
❌ **Sistemas operativos**: No puedes instalar Windows/Linux en Object Storage.

✅ **Úsalo para**: Backups, archivos multimedia, data lakes, logs, static websites.

<aside>

### Object Storage y Arquitectura Moderna

**En aplicaciones web**

```tsx
Frontend →ObjectStorage (assets)
Backend  →ObjectStorage (uploads)
```

📌 El servidor **no guarda archivos localmente**

**Con Serverless**

```tsx
Lambda / CloudFunction
│
├── procesa archivo
└── guarda resultado enObjectStorage
```

</aside>

## Storage Classes (Clases de Almacenamiento)

> No todos los datos se acceden con la misma frecuencia.
Object Storage ofrece clases de almacenamiento (storage classes) para optimizar costos.
> 

**Concepto:** Mientras **menos accedas a los datos, más barato es guardarlos (pero más lento recuperarlos).**

**Pero ojo:** Las clases baratas cobran por **recuperación** (retrieval). Si guardas 1TB en **Archive / Cold**  pero lo descargas todo, pagas extra.

| Clase | Acceso | Costo | Costo Recuperacion | Caso de Uso |
| --- | --- | --- | --- | --- |
| **Standard / Hot** | Frecuente (diario) | $$$ (Alto) | Gratis / Muy bajo | Archivos activos, imágenes de apps, contenido web |
| **Infrequent Access / Cool** | Poca (1 vez al mes) | $$ (Medio) | $ (Cobran por leer) | Backups recientes, archivos de proyectos terminados |
| **Archive / Cold** | Casi nula (1 vez al año) | $ (Muy Bajo) | $$$ (Caro y Lento) | Compliance, archivos legales, backups antiguos |

### **Lifecycle Management y Lifecycle Policies**

### Lifecycle Management (CONCEPTO - ESTRATEGIA)

> Lifecycle Management es la **capacidad** del servicio de almacenamiento(AWS,AZURE,GC) para **gestionar automáticamente los datos a lo largo de su vida**.
> 
- Es la **Estrategia** o la Capacidad del sistema. Es el concepto general de gestionar un dato desde que nace hasta que muere.

Responde a la pregunta:

> “¿Qué quiero que pase con mis archivos con el tiempo?”
> 

Incluye acciones como:

- Mover archivos a storage más barato
- Archivarlos
- Eliminarlos
- Cambiar su clase de almacenamiento

Su objetivo es resolver dos problemas:

1. **Costo:** No pagar almacenamiento caro (Hot) por datos que nadie mira.
2. **Higiene:** No acumular basura digital (logs viejos) eternamente.

### Lifecycle Policies (La Implementación)

> **Lifecycle Policies** son las **reglas concretas** que configuras para que el Lifecycle Management funcione.
> 
- Son las **Reglas/Instrucciones** específicas (escritas en código JSON o XML) que implementan esa estrategia(Lifecycle Management).

Responden a:

> “¿CUÁNDO y QUÉ acción automática se ejecuta?”
> 

Una política se compone de **Reglas**.
Cada regla tiene dos partes:

1. **Filtro o Condicion:** ¿A qué objetos afecta? (Ej: "Todos los archivos en la carpeta `/logs`").
2. **Acción:** ¿Qué les hago?
    - **Transition (Transición):** Mover a una clase más barata (De S3 Standard -> S3 Glacier).
    - **Expiration (Expiración):** Borrar el objeto permanentemente.

<aside>

### Ejemplo claro y real (mental)

### Escenario

Una app guarda **fotos de usuarios**.

Sabes que:

- Las fotos nuevas se usan mucho
- Después de meses casi nadie las mira
- No quieres pagar storage caro innecesariamente

---

### Lifecycle Management (decisión)

> “Quiero que mis archivos se vuelvan más baratos con el tiempo y eventualmente se borren.”
> 

### Lifecycle Policies (reglas)

```
Regla 1:
Si el objeto tiene más de 30 días
→ mover a storage más barato

Regla 2:
Si el objeto tiene más de 180 días
→ mover a storage de archivo (archive)

Regla 3:
Si el objeto tiene más de 2 años
→ eliminar

```

📌 Todo automático
📌 Sin tocar código
📌 Ahorro directo de dinero

**OTRO EJEMPLO**

```tsx
ESTRATEGIA (Management)          REGLAS (Policies)
   ┌─────────────────────────────┐    ┌────────────────────┐
   │ "Quiero ahorrar dinero en   │    │ 1. IF age > 30 days│
   │  datos antiguos y borrar    │──► │    THEN move to    │
   │  lo que no sirve"           │    │    Glacier (Cheap) │
   └─────────────────────────────┘    └────────────────────┘
                                                │
                                      ┌────────────────────┐
                                      │ 2. IF age > 1 year │
                                      │    THEN Delete     │
                                      └────────────────────┘
```

</aside>

## Los Servicios de Object Storage por Proveedor

### AWS: S3 (Simple Storage Service)

- **Qué es:** El **estándar de facto** de Object Storage. El servicio más usado de AWS.
- **Filosofía:** "Guarda cualquier cosa, para siempre, sin límites".
- **Estructura:** `Bucket` -> `Object`
- **Características:**
    - **Buckets**: Contenedores globalmente únicos (nombre único en todo el mundo).
    - **Regiones**: Eliges dónde guardar físicamente (ej: us-east-1, eu-west-1).
    - **Storage Classes**: 7 clases diferentes (Standard, IA, One Zone-IA, Glacier, Deep Archive, Intelligent-Tiering, Reduced Redundancy).
    - **Versionado**: Guarda todas las versiones de un archivo.
    - **Encryption**: At rest (SSE-S3, SSE-KMS, SSE-C) y in transit (HTTPS).
    - **Access Control**: Políticas de bucket, ACLs, IAM roles.
    - **Static Website Hosting**: Puedes hostear un sitio web estático (HTML/CSS/JS) directo desde S3.

### Azure: Blob Storage

- **Qué es:** Object Storage de Microsoft. "Blob" = Binary Large Object.
- **Filosofía:** Integración total con ecosistema Microsoft (Active Directory, .NET, etc).
- **Estructura:** `Storage Account` -> `Container` -> `Blob`.
- **Características:**
    - **Storage Accounts**: Contenedor principal (como un "proyecto").
    - **Containers**: Dentro de una Storage Account (equivalente a buckets de S3).
    - **Blob Types**:
        - **Block Blobs**: Para archivos normales (fotos, videos, backups). Hasta 190TB.
        - **Append Blobs**: Para logs (solo agregar al final, no modificar).
        - **Page Blobs**: Para discos de VMs (VHDs). Hasta 8TB.
    - **Access Tiers**: Hot, Cool, Archive (similar a S3).
    - **Lifecycle Management**: Políticas automáticas de movimiento/borrado.
    - **Soft Delete**: Recuperar archivos borrados accidentalmente (papelera de reciclaje).

### GCP: Cloud Storage (GCS)

- **Qué es:** Object Storage de Google.
- **Filosofía:** Simplicidad y velocidad. Menos opciones, más automatización.
- **Estructura:** `Bucket` -> `Object`.
- **Características:**
    - **Buckets**: Contenedores (nombre globalmente único).
    - **Storage Classes**: Standard, Nearline (30 días), Coldline (90 días), Archive (365 días).
    - **Autoclass**: Similar a S3 Intelligent-Tiering. Mueve objetos automáticamente según uso.
    - **Object Versioning**: Guarda versiones anteriores.
    - **Retention Policies**: Evita borrado accidental (lock de tiempo).
    - **Uniform Bucket-Level Access**: Simplifica permisos (solo IAM, no ACLs).

## Tabla Comparativa: Object Storage

**Ganador:**

- **Ecosistema y Features**: AWS S3 (más maduro, más integraciones)
- **Precio**: Azure Blob (ligeramente más barato)
- **Simplicidad**: GCP Cloud Storage (Autoclass es magia)

| **Característica** | **🟧 AWS S3** | **🟦 Azure Blob Storage** | **🟥 GCP Cloud Storage** |
| --- | --- | --- | --- |
| **Durabilidad** | 99.999999999% (11 nueves) | 99.999999999% (11 nueves) | 99.999999999% (11 nueves) |
| **Storage Classes** | 7 clases (más opciones) | 3 tiers (Hot, Cool, Archive) | 4 clases (Standard, Nearline, Coldline, Archive) |
| **Automatización** | Intelligent-Tiering (manual) | Lifecycle Management | **Autoclass** (totalmente automático) |
| **Versionado** | Sí | Sí | Sí |
| **Encryption** | SSE-S3, SSE-KMS, SSE-C | Microsoft-managed, Customer-managed | Google-managed, Customer-managed |
| **Static Website** | ✅ Sí (nativo) | ✅ Sí (con $web container) | ✅ Sí (con CNAME) |
| **Compliance** | HIPAA, PCI-DSS, SOC 2 | **Immutable Storage** (WORM) | Retention Policies |
| **Integración Clave** | Lambda, Athena, EMR | Active Directory, .NET | BigQuery, Vertex AI |
| **Precio (Standard)** | ~$0.023/GB/mes | ~$0.018/GB/mes | ~$0.020/GB/mes |
| **Capa Gratuita** | 5 GB/mes (12 meses) | 5 GB (LRS Hot) | 5 GB/mes (Standard) |

## Mejores Prácticas de Object Storage

| Práctica | Por qué |
| --- | --- |
| ✅ **Usa lifecycle policies** | Ahorra costos moviendo datos viejos a clases baratas automáticamente |
| ✅ **Habilita versionado** | Recupera archivos borrados accidentalmente |
| ✅ **Encripta at rest** | Protege datos sensibles (GDPR, HIPAA) |
| ✅ **Usa pre-signed URLs** | No expongas archivos públicamente si no es necesario |
| ✅ **Naming conventions** | Usa prefijos lógicos (ej: `/year=2024/month=01/`) para organizar |
| ✅ **Monitorea costos** | Revisa qué storage classes usas y cuánto descargas (retrieval costs) |
| ⚠️ **No uses como base de datos** | Object Storage no es para datos transaccionales |
| ⚠️ **No guardes secretos sin encriptar** | Usa KMS/Key Vault para claves de encriptación |

## BLOCK STORAGE (Almacenamiento de Bloques)

> **"El Disco Duro de tu Servidor Virtual"**
Block Storage es un disco virtual que se "monta" (attach) a una máquina virtual, funcionando exactamente como un disco duro físico conectado a tu computadora.
Los datos se guardan en bloques de tamaño fijo (ej: 4KB, 8KB), igual que un disco duro tradicional.
> 
- **Es el storage que usa tu sistema operativo y bases de datos:** 
Si necesitas instalar un **Sistema Operativo** (Windows/Linux) o correr una **Base de Datos** (Oracle/MySQL), **OBLIGATORIAMENTE** necesitas Block Storage.
- No guarda “archivos” como Object Storage. → Guarda **bloques de datos** de tamaño fijo.

<aside>

Imagina un disco duro externo USB.

1. Lo conectas a tu laptop (VM).
2. Tu laptop lo ve como una unidad local (`D:` o `/dev/sdb`).
3. Puedes formatearlo con un sistema de archivos (NTFS, EXT4).
4. Si desconectas el USB, tus datos siguen ahí, pero la laptop ya no los ve.

En la nube, este "cable USB" es una conexión de red de fibra óptica ultra-rápida. El disco **no está físicamente** dentro del servidor, está en un rack cercano conectado por red (Network Attached Storage), pero se comporta como si fuera local.

</aside>

### ¿Cómo funciona?

### 1. La Capa Superior: El Cliente Engañado

- **"SISTEMA OPERATIVO (Servidor/VM)":** Esta parte representa a tu Máquina Virtual (tu Windows o Linux).
- El Sistema Operativo ve este almacenamiento simplemente como un "Disco Local" (C: o /dev/sda). No sabe que está en la nube ni que es complejo; solo ve un cable conectado.

### 2. La Capa Media: La Organización Lógica

- **"VOLUMEN LÓGICO (Disco Virtual)":** Aquí es donde ocurre la magia del "Bloque".
- **Bloques B1, B2, B3...:** **El sistema** divide cualquier archivo que guardes en pedacitos idénticos llamados **bloques** (en el dibujo son de tamaño fijo, ej. 4KB).
- **¿Por qué bloques?** Imagina que es una hoja cuadriculada. Es mucho más rápido escribir en cuadritos exactos que intentar escribir en espacios de tamaños variables.
    
    <aside>
    
    ## ¿Qué es un “bloque”?
    
    Un **bloque** es:
    
    - Una unidad fija de datos (ej. 4 KB, 8 KB)
    - No tiene significado por sí solo
    - El sistema operativo decide:
        - Qué bloque es parte de qué archivo
        - En qué orden se leen
    
    💡 Block Storage **no entiende archivos**, solo bloques numerados.
    
    </aside>
    

### 3. Las Flechas Cruzadas: La Distribución

- Fíjate en las líneas negras que conectan los bloques de arriba con los discos de abajo.
- **Están cruzadas y desordenadas.** Esto es intencional. Muestra que el **Bloque B1** y el **Bloque B2** (que para ti están juntos en tu archivo) pueden guardarse físicamente en discos duros totalmente diferentes y separados.

### 4. La Capa Inferior: La Realidad Física

- **"DISCOS FÍSICOS (Storage Array)":** Estos son los discos reales (hardware) en el rack del datacenter.
- Al repartir tus datos (los bloques) entre varios discos físicos distintos, el sistema puede leer de todos al mismo tiempo.
    - *Resultado:* **Velocidad extrema**.

![image.png](image%2011.png)

### Características Clave

- **Montado en VM**: Se conecta a una instancia específica (EC2, Azure VM, Compute Engine).
- **Acceso a Nivel de Bloques**: El sistema operativo ve sectores y bloques, no archivos.
- **Bajo Nivel**: Tú decides qué sistema de archivos usar (ext4, NTFS, XFS).
- **Alto Rendimiento**:
    
    Se mide con:
    
    - **IOPS** → Operaciones de lectura/escritura por segundo
    - **Throughput** → MB/s transferidos
    - **Latency** → Tiempo de respuesta
    
    📌 Block Storage es **rápido y consistente**.
    
- **Persistente**: Los datos sobreviven aunque apagues la VM.
- **Snapshots**: Puedes hacer copias de respaldo incrementales.

### El Problema que Resuelve

**"Necesito un disco rápido y confiable para mi base de datos o sistema operativo".**

- **Antes (Disco físico):** Comprabas un SSD de $500, lo instalabas en el servidor. Si fallaba, perdías datos.
- **Ahora (Block Storage):** Creas un volumen virtual en segundos, con snapshots automáticos y replicación. Si la VM falla, desmontas el volumen y lo montas en otra VM.

## Conceptos Clave de Block Storage

| Concepto | Definición |
| --- | --- |
| **Volume (Volumen)** | Disco virtual que se monta en una VM. 
La unidad de disco que creas y "enchufas" a tu VM. Puedes tener varios volúmenes en una sola VM. |
| **Attach/Detach** | Conectar/desconectar un volumen a una VM (como conectar/desconectar USB). |
| **IOPS** | Input/Output Operations Per Second. La cantidad de veces por segundo que puedes leer o escribir. Más IOPS = más rápido. |
| **Throughput** | La cantidad total de datos (MB/s) que puedes transferir.. Importante para archivos grandes. |
| **Snapshot** | Una copia de seguridad incremental de tu volumen. Se guarda en Object Storage (S3) para ser barato, pero se restaura como un nuevo volumen. |
| **Encryption** | Cifrado de datos en disco (at rest). Transparente para el OS. |
| **Multi-Attach** | Permitir que múltiples VMs monten el mismo volumen (solo algunos tipos). |

### Tipos de Discos (SSD vs HDD)

> No todos los discos son iguales. Los proveedores te cobran según la tecnología física que hay detrás.
> 

| Tipo | Tecnología | IOPS | Throughput | Latencia | Costo | Caso de Uso |
| --- | --- | --- | --- | --- | --- | --- |
| **SSD (Solid State Drive)** | Flash memory | Alto (miles-cientos de miles) | Alto (cientos MB/s) | Muy baja (<1ms) | CARO | Bases de datos, apps transaccionales |
| **HDD (Hard Disk Drive)** | Discos magnéticos | Bajo (cientos) | Medio (decenas MB/s) | Alta (10-20ms) | BARATO | Backups, data warehouses, archivos grandes |

**Regla de oro:**

- **SSD**: Para apps que hacen muchas operaciones pequeñas (bases de datos, logs).
- **HDD**: Para apps que leen/escriben archivos grandes secuencialmente (backups, videos).

### ¿Cuándo usar Block Storage?

1. **Tu Boot Drive:** Siempre necesitas uno para arrancar la VM.
2. **Bases de Datos:** MySQL, PostgreSQL, Oracle, SQL Server necesitan la latencia de milisegundos y los IOPS garantizados.
3. **Sistemas Legacy:** Aplicaciones viejas que esperan ver un disco `C:` o `/data` y no saben hablar con APIs de la nube.

### **¿Cuándo NO usar Block Storage?**

1. **Compartir archivos entre 50 personas:** Block Storage (generalmente) solo se conecta a **una** VM a la vez. Si necesitas una carpeta compartida tipo "Red de Oficina", usa **File Storage** (que veremos después).
2. **Backups a largo plazo:** No guardes tus backups en el disco activo. Muévelos a Snapshots o S3 Glacier.

## Los Servicios de Block Storage por Proveedor

### AWS: EBS (Elastic Block Store)

- **Qué es:** Discos virtuales para instancias EC2(Maquina Virtual de AWS).
- **Filosofía:** Opciones para cada necesidad (6 tipos de volúmenes).

**Instance Store:** AWS ofrece discos locales efímeros (NVMe) increíbles para caché, pero recuerda: **se borran al apagar**.

### Azure: Managed Disks

- **Qué es:** Discos virtuales para Azure VMs.
- **Filosofía:** Simplicidad. Azure gestiona la replicación y disponibilidad.
- **Punto Fuerte:** Tienen una integración muy buena para mover discos entre VMs y facilidades de backup.

### GCP: Persistent Disks (PD)

- **Qué es:** Discos virtuales para Compute Engine VMs.
- **Filosofía:** Rendimiento predecible y escalabilidad automática.
- **Killer Feature:** **Redimensionamiento en vivo fácil:** En AWS, cambiar el tamaño o el tipo de disco a veces requiere pasos extra. En GCP es casi mágico, puedes pasar de HDD a SSD sin detener la base de datos en muchos casos.

## Tabla Comparativa: Block Storage

| **Característica** | **🟧 AWS EBS** | **🟦 Azure Managed Disks** | **🟥 GCP Persistent Disks** |
| --- | --- | --- | --- |
| **Tipos de Discos** | 6 tipos (más opciones) | 5 tipos | 4 tipos |
| **IOPS Máximos** | 256,000 (io2 Block Express) | 160,000 (Ultra Disk) | 120,000 (Extreme PD) |
| **Replicación** | Solo en misma AZ (pagas extra por snapshots) | LRS (gratis) o ZRS (pago) | **Automática multi-zona** (gratis) |
| **Snapshots** | Incrementales (guardados en S3) | Incrementales | **Globales** (restaurar en cualquier región) |
| **Resize** | Sí (Elastic Volumes) | Sí (sin detener VM) | Sí (sin detener VM) |
| **Multi-Attach** | Solo io1/io2 (hasta 16 VMs) | Shared Disks (hasta 10 VMs) | Multi-Writer (solo lectura) |
| **Encryption** | KMS (opcional) | SSE (automático) | Google-managed (automático) |
| **Precio (SSD General)** | ~$0.08/GB/mes (gp3) | ~$0.05/GB/mes (Standard SSD) | ~$0.17/GB/mes (SSD PD) |

## Snapshots (Copias de Respaldo)

> Un snapshot es una copia de respaldo de un volumen en un momento específico.
> 

**Características:**

- **Incrementales**: Solo guarda los bloques que cambiaron desde el último snapshot.
- **Rápidos**: Crear un snapshot tarda segundos (aunque el proceso de copia en background puede tardar minutos).
- **Restaurables**: Puedes crear un nuevo volumen desde un snapshot.

**Ejemplo de uso:**

```
Día 1: Snapshot completo (100GB)
Día 2: Snapshot incremental (solo 5GB cambiaron)
Día 3: Snapshot incremental (solo 3GB cambiaron)

Total guardado: 100 + 5 + 3 = 108GB (no 300GB)

```

**Casos de uso:**

- Backups antes de actualizaciones críticas
- Disaster recovery (restaurar en otra región)
- Clonar entornos (dev, staging, prod)

**Mejores prácticas:**

- Automatiza snapshots con políticas (ej: diario a las 2 AM)
- Retén solo lo necesario (ej: 7 días de snapshots diarios, 4 semanales, 12 mensuales)
- Prueba restauraciones periódicamente (un backup que no se puede restaurar no sirve)

## FILE STORAGE (Almacenamiento de Archivos)

> **“Una carpeta compartida en la nube, accesible por múltiples servidores”**
File Storage es un sistema de archivos compartido (carpetas,subcarpetas y archivos) accesible por múltiples VMs **simultáneamente** a través de la red.
> 

### ¿Cómo funciona?

> Funciona bajo el modelo **Cliente-Servidor**.
> 
1. Tienes un "Servidor de Archivos" central (gestionado por la nube).
2. Tus máquinas virtuales (VMs) actúan como "Clientes".
3. Utilizan **protocolos estándar de red** para "montar" la carpeta compartida y verla como si fuera un disco local.

**Protocolos Estándar:**

- **NFS (Network File System):** El estándar para **Linux**.
- **SMB (Server Message Block) / CIFS:** El estándar para **Windows**.

### **Características Clave**

- **Compartido**: Múltiples VMs pueden leer/escribir al mismo tiempo.
- **Acceso Concurrente:** Múltiples instancias leen/escriben a la vez (Read/Write Many).
- **Acceso vía Red**: Se monta como un sistema de archivos remoto (no es un disco local).
- **Jerarquía de Carpetas**: Estructura tradicional de carpetas y subcarpetas.
- **Permisos**: Control de acceso a nivel de archivo/carpeta (POSIX, ACLs).
- **Escalable**: Crece automáticamente según uso (no necesitas provisionar tamaño fijo).
- **Gestionado**: El proveedor maneja replicación, backups, parches.

<aside>

Imagina una **carpeta compartida en una empresa**:

- Todos los empleados ven:
    
    ```
    \\servidor\proyectos\
    ```
    
- Todos pueden:
    - Leer
    - Escribir
    - Modificar archivos
- Los permisos deciden quién puede hacer qué

👉 Eso es **File Storage**, pero en la nube.

</aside>

![image.png](image%2012.png)

### El Problema que Resuelve

**"Necesito que múltiples servidores accedan a los mismos archivos simultáneamente".**

- **Antes (NAS local):** Comprabas un NAS de $5,000, lo configurabas, lo mantenías. Si fallaba, perdías acceso.
- **Ahora (File Storage):** Creas un file system en minutos, se escala automáticamente, está replicado y gestionado por el proveedor.

### ¿Cuándo usar File Storage?

✅ **Desarrollo colaborativo**: Múltiples desarrolladores accediendo al mismo código.
✅ **Content Management**: WordPress, Drupal (archivos compartidos entre web servers).
✅ **Home Directories**: Carpetas de usuarios en entornos corporativos.
✅ **Machine Learning**: Datasets compartidos entre múltiples instancias de entrenamiento.

❌ **No uses para**: Bases de datos (usa Block Storage), archivos estáticos públicos (usa Object Storage).

### Los Servicios de File Storage por Proveedor

### AWS: EFS (Elastic File System)

- **Qué es:** File storage compartido para Linux (NFS).
- **Filosofía:** Escalabilidad automática e ilimitada.
- Se monta en múltiples EC2
- **Escala automáticamente**
- Multi-AZ (alta disponibilidad)

### Azure: Azure Files

- **Qué es:** File storage compartido para Windows y Linux (SMB y NFS).
- **Filosofía:** Compatibilidad total con Windows (reemplazo de file servers on-premise).
- Integración con **Active Directory**
- Se puede montar:
    - En la nube
    - En on-prem (híbrido)

📌 Muy fuerte en entornos corporativos

### GCP: Filestore

- **Qué es:** File storage compartido para Linux (NFS).
- **Filosofía:** Alto rendimiento y simplicidad
- Rendimiento muy alto
- Menos opciones, más simple

### Tabla Comparativa: File Storage

| **Característica** | **🟧 AWS EFS** | **🟦 Azure Files** | **🟥 GCP Filestore** |
| --- | --- | --- | --- |
| **Protocolos** | NFSv4.1 | SMB 3.0, NFS 4.1 | NFSv3 |
| **Sistemas Operativos** | Solo Linux | Windows + Linux | Solo Linux |
| **Escalado** | **Automático** (ilimitado) | Manual (hasta 100TB) | Manual (hasta 100TB) |
| **Performance Max** | 10+ GB/s (Max I/O) | 10 GB/s (Premium) | 1.2 GB/s (High Scale SSD) |
| **Replicación** | Multi-AZ (automático) | LRS, ZRS, GRS | Zonal (single-zone) o Regional |
| **Storage Classes** | Standard, IA | Premium, Hot, Cool | HDD, SSD, Enterprise |
| **Active Directory** | No | **Sí** (nativo) | No |
| **Precio (Standard)** | ~$0.30/GB/mes | ~$0.06/GB/mes (Hot HDD) | ~$0.20/GB/mes (HDD) |

## ¿Cuándo usar cada tipo de Storage?

| Necesidad | Object Storage | Block Storage | File Storage |
| --- | --- | --- | --- |
| **Sistema operativo de VM** | ❌ | ✅ | ❌ |
| **Base de datos** | ❌ | ✅ | ❌ |
| **Backups** | ✅ | ✅ (snapshots) | ✅ |
| **Imágenes/videos de app** | ✅ | ❌ | ❌ |
| **Static website** | ✅ | ❌ | ❌ |
| **Compartir archivos entre VMs** | ❌ | ❌ | ✅ |
| **Content management (WordPress)** | ❌ | ❌ | ✅ |
| **Data lake (petabytes)** | ✅ | ❌ | ❌ |
| **Machine Learning datasets** | ✅ | ❌ | ✅ |
| **Logs de aplicación** | ✅ | ✅ | ❌ |