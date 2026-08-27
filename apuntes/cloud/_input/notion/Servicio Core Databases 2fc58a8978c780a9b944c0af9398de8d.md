# Servicio Core: Databases

## Databases **= Almacenamiento de Datos Estructurados**

> **Databases** (Bases de Datos) son sistemas organizados para **almacenar, gestionar y recuperar datos** de forma eficiente y segura.
En términos simples: es donde guardas la información crítica de tu aplicación (usuarios, productos, transacciones, etc.).
> 

**Antes del Cloud:**

- Comprabas servidores de bases de datos físicos ($10,000 - $100,000)
- Instalabas software de DB (Oracle, SQL Server, MySQL)
- Contratabas DBAs (Database Administrators) para mantenerlos
- Hacías backups manualmente
- Si el disco se llenaba, comprabas más hardware

**Con Cloud:**

- "Alquilas" bases de datos administradas bajo demanda
- Las creas en minutos desde una consola web
- El proveedor hace backups automáticos, parches, actualizaciones
- Escalas almacenamiento y CPU con un clic
- Pagas solo por lo que usas (por hora + GB almacenado)

👉 En cloud, **Databases = alquilar sistemas de bases de datos administrados por Internet**.

<aside>

### **DBaaS** (Database as a Service)

Es un modelo de servicio en la nube donde el proveedor te entrega acceso a una base de datos sin que tú tengas que configurar el servidor físico, instalar el software o realizar mantenimiento.

</aside>

### ¿Por qué usar Bases de Datos Gestionadas?

El valor principal es quitarte el "trabajo pesado indiferenciado" (Undifferentiated Heavy Lifting).

### 1. Administración Cero

- No más parches de seguridad manuales a las 3 AM.
- No más instalación de software.

### 2. Alta Disponibilidad (Multi-AZ)

- Con un solo check, tu base de datos se replica automáticamente en otro datacenter. Si el principal falla, el secundario toma el control en segundos (Failover).

### 3. Escalabilidad

- **Vertical:** ¿Necesitas más CPU/RAM? Cambia el tipo de instancia.
- **Horizontal:** ¿Muchas lecturas? Crea "Read Replicas" (copias de solo lectura) para dividir la carga.

### Diccionario de Conceptos de Databases

| Concepto | Definición | Analogía del Mundo Real |
| --- | --- | --- |
| **Transaction (Transacción)** | Conjunto de operaciones que se ejecutan como una unidad (todo o nada). | Como una transferencia bancaria (se descuenta de A y se suma a B, o no pasa nada). |
| **ACID** | Propiedades de transacciones confiables (Atomicidad, Consistencia, Aislamiento, Durabilidad). | Como las reglas de un banco para garantizar que tu dinero no desaparezca. |
| **Schema (Esquema)** | Estructura de la base de datos (tablas, columnas, tipos de datos). | Como el plano de un edificio (define qué habitaciones hay y cómo se conectan). |
| **Backup (Respaldo)** | Copia de seguridad de los datos. | Como fotocopiar documentos importantes y guardarlos en otro lugar. |
| **Replication (Replicación)** | Copiar datos a múltiples servidores para redundancia. | Como tener copias de un documento en varias oficinas. |
| **Sharding** | Dividir datos en múltiples bases de datos (horizontal partitioning). | Como dividir una biblioteca en múltiples edificios por tema. |
| **Read Replica** | Copia de solo lectura de la base de datos (para consultas). | Como tener copias de un libro que solo puedes leer, no editar. |
| **IOPS** | Operaciones de entrada/salida por segundo (velocidad del disco). | Como la velocidad de un cajero de banco (cuántos clientes atiende por minuto). |
| **Latency (Latencia)** | Tiempo que tarda una consulta en responder. | Como el tiempo que tarda el bibliotecario en encontrar un libro. |

### Conceptos Fundamentales de Databases

### 1. **Transacciones (Transactions)**

> Una **transacción** es un conjunto de operaciones que se ejecutan como una **unidad atómica** (todo o nada).
> 

**Ejemplo:**

```
BEGIN TRANSACTION;
  UPDATE cuentas SET saldo = saldo - 100 WHERE id = 1;
  UPDATE cuentas SET saldo = saldo + 100 WHERE id = 2;
COMMIT;

Si CUALQUIER operación falla, se hace ROLLBACK (se revierten TODAS).

```

**Estados de una transacción:**

```
BEGIN → PROCESSING → COMMIT (éxito) o ROLLBACK (fallo)

```

**Analogía:** Como una transacción de compra en una tienda. O pagas y te llevas el producto, o no pagas y no te llevas nada. No puedes pagar la mitad y llevarte el producto.

### 2. **Replicación (Replication)**

> **Replicación** es copiar datos de una base de datos (Primary) a una o más copias (Replicas).
> 

**Tipos:**

### **Read Replica (Réplica de Lectura)**

- **Qué es:** Copia de solo lectura de la base de datos ( Una copia de la DB solo para **leer** datos )
- **Uso:** Distribuir consultas de lectura (SELECT) entre múltiples réplicas
- **Ventaja:** Reduce carga en la base de datos principal

**Ejemplo:**

```
Primary DB: Maneja escrituras (INSERT, UPDATE, DELETE)
Read Replica 1: Maneja lecturas (SELECT) de usuarios en América
Read Replica 2: Maneja lecturas (SELECT) de usuarios en Europa

```

### **Multi-Master Replication**

- **Qué es:** Múltiples bases de datos que pueden escribir y leer
- **Uso:** Alta disponibilidad y escrituras distribuidas
- **Desafío:** Resolver conflictos (si dos usuarios editan el mismo dato al mismo tiempo)

### 3. **Sharding (Particionamiento Horizontal)**

> **Sharding** es dividir una tabla grande en múltiples bases de datos más pequeñas.
> 

**Ejemplo:**

```
Tabla de usuarios: 100 millones de filas

Sin Sharding:
  - 1 base de datos con 100M filas
  - Consultas lentas ❌

Con Sharding (por región):
  - DB 1 (América): 30M usuarios
  - DB 2 (Europa): 40M usuarios
  - DB 3 (Asia): 30M usuarios
  - Consultas rápidas ✅

```

**Cómo funciona:**

```
Usuario con ID = 12345 → Hash(12345) % 3 = 0 → DB 1
Usuario con ID = 67890 → Hash(67890) % 3 = 1 → DB 2

```

**Desafíos:**

- ❌ Consultas que cruzan shards son lentas
- ❌ Difícil de rebalancear (si un shard crece mucho)

## La Arquitectura: ¿Dónde vive la DB?

Recordando tus apuntes de Networking:

1. **VPC:** La DB vive **SIEMPRE** dentro de tu VPC.
2. **Subnet:** Por seguridad, la DB debe vivir en una **Subnet Privada**.
    - *Regla de Oro:* Nunca le des una IP pública a tu base de datos.
3. **Accesso:** Solo tu Servidor Web (en la Subnet Pública) o tu VPN deberían tener permiso para hablar con la DB (usando Security Groups).

![image.png](image%2021.png)

## **Patrones de Arquitectura**: Alta Disponibilidad y Escalado

### 1. Multi-AZ (Alta Disponibilidad / Disaster Recovery)

- **Problema:** Si tu base de datos vive en un solo servidor y ese servidor se quema, tu app muere.
- **Solución Cloud:** Activas "Multi-AZ".
    
    El proveedor crea una **Instancia Primaria** (donde tu app escribe) y una **Instancia Standby** (réplica oculta) en otro Datacenter físico (otra Zona de Disponibilidad).
    
    - **Primaria:** Donde tu app escribe (`INSERT`, `UPDATE`).
    - **Standby (Reserva):** Una réplica exacta en **otro Datacenter físico** (otra Zona de Disponibilidad).
- **Replicación Síncrona:** El dato no se confirma como "guardado" hasta que se escribe en AMBOS lugares. Cero pérdida de datos.
- **Failover Automático:** Si la Primaria falla, la nube detecta el error y apunta el **DNS** a la Standby automáticamente. Tu app sigue funcionando en segundos.

### 2. Read Replicas (Escalabilidad de Lectura)

- **Problema:** Tienes 100,000 usuarios haciendo `SELECT` (leyendo productos). La CPU de tu base de datos está al 100%.
- **Solución Cloud:** Creas **Read Replicas** (Réplicas de Lectura).
- **Funcionamiento:**
    - La base principal envía copias de los datos a 1, 5 o 15 réplicas.
    - **Replicación Asíncrona:** Hay un pequeño retraso (milisegundos/segundos).
- **Para el Full Stack Dev:**
    - Tienes que modificar tu backend,requiere **cambiar tu código**.
    - Las escrituras (`INSERT`, `UPDATE`) van al **Endpoint Primario**.
    - Las lecturas (`SELECT`) las diriges a los **Endpoints de las Réplicas**.

## Tipos de Bases de Datos

No existe una "mejor" base de datos.
Existe la **adecuada** para tu problema. En la nube, verás principalmente estas tres categorías que estudiaremos:

### 1. Relational Databases (SQL / RDBMS)

- **Estructura:** Tablas con filas y columnas (como Excel). Esquema rígido.
- **Lenguaje:** SQL (Structured Query Language).
- **Uso:** Datos financieros, inventarios, usuarios, transacciones donde la consistencia es vital.
- **Ejemplos:** MySQL, PostgreSQL, SQL Server, Oracle.

### 2. NoSQL Databases (Non-Relational)

- **Estructura:** Flexible. Documentos (JSON), Clave-Valor, Grafos. Sin esquema fijo.
- **Ventaja:** Velocidad extrema y escalabilidad horizontal masiva.
- **Uso:** Redes sociales, catálogos de productos, juegos, IoT, datos en tiempo real.
- **Ejemplos:** MongoDB, Cassandra, DynamoDB.

### 3. Data Warehouses (Almacén de Datos)

- **Estructura:** Relacional, pero optimizada para **Analítica**, no para transacciones.
- **Uso:** Business Intelligence (BI), Reportes históricos, Big Data. "Quiero saber las ventas totales de los últimos 5 años".
- **Ejemplos:** Snowflake, BigQuery, Redshift.

## BASES DE DATOS RELACIONALES - SQL

> Una **base de datos relacional** organiza datos en **tablas** (filas y columnas) con **relaciones** entre ellas.
> 

### **Patrones de Procesamiento BD -** ¿Para qué estás usando la base de datos?

### **OLTP (Online Transaction Processing)**

**Qué es:** Bases de datos optimizadas para **transacciones rápidas** (INSERT, UPDATE, DELETE).

- **Enfoque:** Transacciones rápidas y precisas.
- **Qué hace:** Insertar, actualizar y borrar datos pequeños constantemente.
- **Usuarios:** Tu aplicación web, tus clientes comprando, el cajero del banco.
- **Prioridad:** **Velocidad y Consistencia (ACID).** Necesitas que si alguien compra el último ticket, nadie más pueda comprarlo milisegundos después.
- **Diseño:** Orientado a **Filas** (Row-oriented). Muy normalizado (muchas tablas pequeñas unidas por IDs) para evitar duplicidad.
- **Ejemplos:** MySQL, PostgreSQL, SQL Server, Amazon Aurora.

**Casos de uso:**

- Un usuario hace login, añade un producto al carrito y paga. (Muchas escrituras pequeñas).
- Aplicaciones web (usuarios, pedidos, productos)
- Sistemas bancarios (transacciones)
- E-commerce (carritos de compra)

### **OLAP (Online Analytical Processing)**

**Qué es:** Bases de datos optimizadas para **análisis y consultas complejas** (agregaciones, reportes).

- **Enfoque:** Consultas complejas y lectura masiva de datos.
    - Pocas escrituras, muchas lecturas
- **Qué hace:** Leer millones de filas para encontrar patrones. "Dime las ventas totales de zapatos rojos en 2023 por región".
- **Usuarios:** Analistas de datos, Gerentes, Business Intelligence (BI).
- **Prioridad:** **Capacidad de Cómputo.** No importa si tarda 5 segundos, pero tiene que procesar 10 Terabytes sin explotar.
- **Diseño:** Orientado a **Columnas** (Columnar). Desnormalizado (pocas tablas gigantes) para leer rápido sin hacer tantos JOINs.
- **Ejemplos:** Amazon Redshift, Google BigQuery, Snowflake, Azure Synapse.

> **Caso de uso:** El CEO quiere un reporte de cuánto crecieron las ventas comparado con el año pasado. (Pocas escrituras masivas, muchas lecturas pesadas).
> 

### Tabla Comparativa: OLTP vs OLAP

| Aspecto | OLTP | OLAP |
| --- | --- | --- |
| **Propósito** | Transacciones diarias | Análisis y reportes |
| **Operaciones** | INSERT, UPDATE, DELETE | SELECT (agregaciones) |
| **Volumen de datos** | Medio (GB - TB) | Grande (TB - PB) |
| **Latencia** | Muy baja (<10ms) | Alta (segundos - minutos) |
| **Usuarios** | Miles - Millones | Decenas - Cientos (analistas) |
| **Ejemplo** | App de e-commerce | Dashboard de ventas |

### Los Servicios de Bases de Datos Relacionales por Proveedor

Cada proovedor tiene dos formas:

1. **El Estándar:** Un servicio gestionado que "envuelve" los motores clásicos (MySQL, PostgreSQL, SQL Server).
2. **El Nativo (Premium):** Un motor reconstruido por ellos mismos para aprovechar al máximo la nube (más rápido, más resistente).

### AWS: RDS (Relational Database Service) y Aurora

### **El estandar: RDS (Relational Database Service)**

**Qué es:** Servicio administrado de bases de datos relacionales.

**Motores soportados:**

- MySQL
- PostgreSQL
- MariaDB
- Oracle
- SQL Server

**Características:**

- **Administrado:** AWS hace backups, parches, actualizaciones
- **Multi-AZ:** Alta disponibilidad (réplica en otra zona)
- **Read Replicas:** Hasta 15 réplicas de lectura
- **Escalado:** Vertical (cambiar tamaño de instancia) y horizontal (réplicas)
- **Backups automáticos:** Retención de 1-35 días

* **Filosofía:** "Gestión fácil". AWS se encarga de los parches y backups, pero por debajo sigue siendo la base de datos de toda la vida.

### **Aurora**

Es un motor creado por Amazon compatible con **MySQL y PostgreSQL**

**Qué es:** Base de datos relacional de AWS (compatible con MySQL y PostgreSQL) diseñada para la nube.

**Filosofía:** "MySQL/PostgreSQL, pero 5x más rápido y más confiable".

**Características:**

- **Rendimiento:** 5x más rápido que MySQL, 3x más rápido que PostgreSQL
- **Almacenamiento:** Crece automáticamente hasta 128TB
- **Alta disponibilidad:** 6 copias de datos en 3 AZs
- **Serverless:** Aurora Serverless (escala automáticamente según demanda)
- **Global Database:** Replicación en múltiples regiones (<1s latencia)

**Casos de uso:** Aplicaciones críticas, SaaS, gaming, fintech

### Azure: Azure SQL Database y Azure Database for MySQL/PostgreSQL

### **Azure SQL Database**

**Qué es:** Base de datos SQL Server administrada por Microsoft.

**Filosofía:** "SQL Server en la nube, sin administración".

**Características:**

- **Motor:** SQL Server (propiedad de Microsoft)
- **Serverless:** Escala automáticamente según demanda
- **Hyperscale:** Hasta 100TB de almacenamiento
- **Intelligent Performance:** Optimización automática con IA
- **Geo-replication:** Replicación en múltiples regiones

**Casos de uso:** Aplicaciones empresariales, .NET apps, sistemas legacy de SQL Server

### **Azure Database for MySQL / PostgreSQL**

**Qué es:** MySQL y PostgreSQL administrados por Azure.

**Características:**

- **Motores:** MySQL, PostgreSQL
- **Flexible Server:** Más control sobre configuración
- **High Availability:** 99.99% SLA
- **Backups automáticos:** Retención de 7-35 días

**Casos de uso:** Aplicaciones web, startups, migraciones de on-premise

### GCP: Cloud SQL y Cloud Spanner

### **Cloud SQL**

**Qué es:** MySQL, PostgreSQL y SQL Server administrados por Google.

**Filosofía:** "Simplicidad y velocidad".

**Características:**

- **Motores:** MySQL, PostgreSQL, SQL Server
- **Alta disponibilidad:** 99.95% SLA (regional) / 99.99% SLA (multi-regional)
- **Read Replicas:** Hasta 10 réplicas
- **Backups automáticos:** Retención de 1-365 días
- **Integración:** Con BigQuery (Data Warehouse)

### **Cloud Spanner**

**Qué es:** Base de datos relacional **global** y **horizontalmente escalable**.

**Filosofía:** "SQL + NoSQL = Lo mejor de ambos mundos".

**Características:**

- **Global:** Una sola base de datos distribuida en múltiples regiones
- **Escalabilidad horizontal:** Escala a millones de QPS (queries per second)
- **ACID:** Transacciones ACID globales (único en el mercado)
- **SQL:** Usa SQL estándar
- **Alta disponibilidad:** 99.999% SLA (5 nueves)

## Tabla Comparativa: Bases de Datos Relacionales

**Ganador:**

- **Ecosistema**: AWS RDS (más motores, más opciones)
- **Rendimiento**: AWS Aurora (5x más rápido que MySQL)
- **Global**: GCP Cloud Spanner (único con ACID global)
- **Empresas Microsoft**: Azure SQL (integración con .NET, Active Directory)

| **Característica** | **🟧 AWS RDS/Aurora** | **🟦 Azure SQL** | **🟥 GCP Cloud SQL/Spanner** |
| --- | --- | --- | --- |
| **Motores** | MySQL, PostgreSQL, Oracle, SQL Server, MariaDB | SQL Server, MySQL, PostgreSQL | MySQL, PostgreSQL, SQL Server |
| **Serverless** | Aurora Serverless | Azure SQL Serverless | ❌ (Cloud SQL no tiene serverless) |
| **Almacenamiento Max** | 128TB (Aurora) / 64TB (RDS) | 100TB (Hyperscale) | 30TB (Cloud SQL) / Ilimitado (Spanner) |
| **Read Replicas** | 15 (Aurora) / 5 (RDS) | 4 (SQL Database) | 10 (Cloud SQL) |
| **Global Database** | Aurora Global | Geo-replication | **Cloud Spanner** (nativo) |
| **SLA** | 99.95% (Multi-AZ) | 99.99% | 99.95% (Cloud SQL) / 99.999% (Spanner) |
| **Precio (básico)** | ~$0.017/hora | ~$0.12/hora | ~$0.015/hora |
| **Killer Feature** | Aurora Serverless | Intelligent Performance | Cloud Spanner (global ACID) |

---

## Mejores Prácticas de Bases de Datos Relacionales

| Práctica | Por qué |
| --- | --- |
| ✅ **Usa Multi-AZ para producción** | Alta disponibilidad (si una AZ falla, la otra sigue) |
| ✅ **Habilita backups automáticos** | Recuperación ante desastres (retención de 7-35 días) |
| ✅ **Crea índices en columnas frecuentes** | Acelera consultas (WHERE, JOIN, ORDER BY) |
| ✅ **Usa Read Replicas para lecturas** | Reduce carga en la DB principal |
| ✅ **Monitorea IOPS y CPU** | Detecta cuellos de botella antes de que afecten usuarios |
| ✅ **Usa conexiones pooling** | Reutiliza conexiones (no abras/cierres conexiones constantemente) |
| ⚠️ **No expongas la DB a Internet** | Siempre en subnet privada, acceso solo desde VPC |
| ⚠️ **No uses SELECT * en producción** | Especifica columnas (reduce transferencia de datos) |

## BASES DE DATOS NoSQL

> **NoSQL** (Not Only SQL) son bases de datos diseñadas para **datos no estructurados o semi-estructurados** que no encajan bien en tablas relacionales.
> 

**Características:**

- **Esquema flexible:** No necesitas definir estructura antes de insertar datos
- **Escalabilidad horizontal:** Fácil agregar más servidores (sharding nativo)
- **Alta disponibilidad:** Diseñadas para distribuirse en múltiples regiones
- **No ACID (usualmente):** Sacrifican consistencia por velocidad y disponibilidad

### **Diferencia con SQL:** Escalabilidad Horizontal (Sharding)

Aquí es donde NoSQL destruye a SQL en rendimiento masivo.

### SQL = Escalado Vertical (Scale Up)

- Para aguantar más tráfico, necesitas un **servidor más grande** (más CPU, más RAM).
- **Límite:** Llega un punto donde no existe una computadora más potente en el mercado. Es como intentar hacer un edificio infinitamente alto; eventualmente colapsa.

### NoSQL = Escalado Horizontal (Scale Out)

- Para aguantar más tráfico, agregas **más servidores pequeños**.
- **Cómo funciona (Sharding/Partitioning):** La base de datos corta los datos en pedacitos y los reparte entre 10, 100 o 1,000 servidores.
- **Resultado:** Capacidad infinita.
    - *Ejemplo:* Amazon DynamoDB maneja picos de **100 millones de peticiones por segundo** en Prime Day. Eso es imposible con una sola base de datos SQL.

![image.png](image%2022.png)

### CAP Theorem (Teorema CAP)

> El Teorema CAP establece que en cualquier sistema distribuido (como la nube), es **imposible** garantizar simultáneamente estas tres propiedades. Solo puedes tener **dos**.
> 

### **C - Consistency (Consistencia)**

> Todos los nodos ven los mismos datos al mismo tiempo.
> 

**Ejemplo:**

```
Escribes "Saldo = $100" en la DB.
Inmediatamente lees desde otro servidor.
Resultado: Ves "$100" (no "$0" o un valor antiguo).
Lo contrario: Leer un dato antiguo o diferente.

```

### **A - Availability (Disponibilidad)**

> La DB siempre responde (aunque algunos nodos estén caídos).
> 

**Ejemplo:**

```
Un servidor de la DB se cae.
Resultado: La DB sigue respondiendo desde otros servidores.
Lo contrario: Recibir un "Error 503: Service Unavailable" o un Timeout.

```

### **P - Partition Tolerance (Tolerancia a Particiones)**

> La DB sigue funcionando aunque haya fallos de red entre servidores.
> 

**Ejemplo:**

```
La red entre Virginia y California se corta.
Resultado: Ambos datacenters siguen funcionando independientemente.
Lo contrario: El sistema colapsa si los servidores no pueden hablar entre sí.
```

### El Dilema: Solo puedes elegir 2

En la nube, las redes fallan. Los cables se rompen. Por lo tanto, **la P (Partition Tolerance) es OBLIGATORIA**. No puedes elegir no tenerla.

<aside>

Si sacrificas P, significa que tu sistema **no tolera fallos de red**. Si la red falla, el sistema muere.

</aside>

> **Regla de Oro Cloud:**
Dado que **P** es fija, tu única decisión real es: **¿Sacrifico Consistencia (CP) o sacrifico Disponibilidad (AP)?**
> 

![image.png](image%2023.png)

### 1. Sistema CP (Consistency + Partition Tolerance)

**"Prefiero morir antes que mentir".**

- **Filosofía:** Si ocurre un corte de red entre mis nodos y no puedo asegurar que todos tengan el dato actualizado, **dejo de aceptar peticiones**.
- **Comportamiento:** El sistema se vuelve "No disponible" (da error) hasta que se arregle la red.
- **Ejemplo Real:** **Bancos**.
    - Si el cajero automático no puede confirmar con el servidor central tu saldo exacto, **no te da dinero**. Prefiere decir "Fuera de Servicio" (pérdida de Disponibilidad) a darte dinero que no tienes (pérdida de Consistencia).
- **Bases de Datos Típicas:** MongoDB (por defecto), Redis, HBase.

### 2. Sistema AP (Availability + Partition Tolerance)

**"El show debe continuar".**

- **Filosofía:** Si ocurre un corte de red, sigo aceptando peticiones aunque mis nodos no puedan hablar entre sí.
- **Comportamiento:** El sistema siempre responde "OK", pero podrías leer un dato de hace 5 segundos (dato rancio). Esto es **Consistencia Eventual**.
- **Ejemplo Real:** **Redes Sociales (Likes)**.
    - Si das "Like" a una foto, no importa si tu amigo en Australia no lo ve en el primer milisegundo. Lo importante es que la app no te dé error. Prefieren mostrar un número de likes "viejo" a mostrar una pantalla de error.
- **Bases de Datos Típicas:** Cassandra, DynamoDB, Cosmos DB.

### El Precio de la Velocidad: Eventual Consistency (Consistencia Eventual)

En SQL, estamos acostumbrados a **ACID** (Consistencia inmediata). 

Ejemplo: Si pago, el saldo baja ya.
En NoSQL (para ganar velocidad), a veces aceptamos **BASE** (Consistencia Eventual).

**Eventual Consistency:**
Cuando escribes un dato, la base de datos te dice "OK, guardado". Pero internamente, puede tardar unos milisegundos en copiar ese dato a todos los nodos.

- **Riesgo:** Si lees el dato *demasiado* rápido (en el siguiente milisegundo), podrías ver el dato viejo.
- **Beneficio:** La escritura es ultra rápida porque no espera a que todos los nodos confirmen.

> **Consistencia eventual** significa que los datos **eventualmente** serán consistentes (no inmediatamente).
> 

**Ejemplo:**

```
1. Escribes "Likes = 100" en Virginia
2. Lees inmediatamente desde Tokio
3. Resultado: Ves "Likes = 99" (dato antiguo)
4. Esperas 1 segundo
5. Lees de nuevo desde Tokio
6. Resultado: Ves "Likes = 100" (dato actualizado)

```

**Ventaja:** Muy rápido y siempre disponible.

**Desventaja:** Puede mostrar datos antiguos temporalmente.

### Tipos de Bases de Datos NoSQL

No todas las NoSQL son iguales. Eliges el tipo según la forma de tus datos.

### 1. Key-Value (Clave-Valor)

- **Concepto:** Almacena pares de clave-valor (como un diccionario). Guardas un dato asociado a una clave única.
- **Velocidad:** Extrema. Es la más rápida de todas.
- **Uso:** Carritos de compra, sesiones de usuario, preferencias, caché.
- **Ejemplo:** Redis, **DynamoDB**.

```
Clave: "usuario:123"
Valor: { "nombre": "Juan", "edad": 25 }

Clave: "sesion:abc"
Valor: { "token": "xyz", "expira": "2026-02-03" }

```

### 2. Document (Documental)

- **Concepto:** Guardas datos en formato JSON (o BSON). Es intuitivo para programadores JS.
- **Flexibilidad:** Cada documento puede tener campos distintos. Puedes indexar cualquier campo.
- **Uso:** Catálogos de productos, CMS, perfiles de usuario.
- **Ejemplo:** MongoDB, **Firestore**, **DocumentDB**.

```json
{
  "_id": "123",
  "nombre": "Juan",
  "edad": 25,
  "direccion": {
    "calle": "Av. Principal",
    "ciudad": "Lima"
  },
  "hobbies": ["fútbol", "lectura"]
}

```

### 3. Column-Family (Wide-Column)

- **Concepto:** Parecido a una tabla, pero cada fila puede tener millones de columnas dinámicas. Optimizado para escribir cantidades absurdas de datos.
- **Uso:** IoT (sensores), históricos financieros, analítica en tiempo real.
- **Ejemplo:** Cassandra, **Bigtable**, **Keyspaces**.

```
Row Key: "usuario:123"
  Column Family: "info"
    nombre: "Juan"
    edad: 25
  Column Family: "actividad"
    ultimo_login: "2026-02-03"
    clicks: 150

```

### 4. Graph (Grafos)

- **Concepto:** Guarda datos (nodos) y relaciones (bordes). Lo importante no es el dato en sí, sino **cómo se conecta** con otros.
- **Uso:** Redes sociales ("Amigos de tus amigos"), Detección de fraude, Motores de recomendación.
- **Ejemplo:** Neo4j, **Neptune**.

```
Nodo: Usuario (Juan)
  ├─ AMIGO_DE → Usuario (María)
  ├─ TRABAJA_EN → Empresa (Google)
  └─ VIVE_EN → Ciudad (Lima)

Nodo: Usuario (María)
  └─ AMIGO_DE → Usuario (Pedro)

```

## Tabla Comparativa: Tipos de NoSQL

| Tipo | Estructura | Velocidad | Consultas | Caso de Uso |
| --- | --- | --- | --- | --- |
| **Key-Value** | Clave → Valor | **Muy rápida** | Solo por clave | Caché, sesiones |
| **Document** | JSON/BSON | Rápida | Por campos | Apps web, CMS |
| **Column-Family** | Columnas | Rápida (lecturas) | Por columnas | Big Data, IoT |
| **Graph** | Nodos + Aristas | Rápida (relaciones) | Grafos | Redes sociales |
|  |  |  |  |  |

### Los Servicios de NoSQL por Proveedor

### 🟧 AWS: La Filosofía "Herramienta Específica"

AWS cree en tener una base de datos especializada para cada problema. No intentan hacer una que haga todo.

1. **Amazon DynamoDB (El Rey):**
    - **Qué es:** Base de datos Key-Value y Documental.
    - **Filosofía:** **Rendimiento predecible a cualquier escala.**
    - **El Superpoder:** Es la base que usa Amazon.com para el Prime Day. No importa si tienes 1 usuario o 100 millones, la respuesta siempre tarda <10ms. Es **Serverless**: no eliges servidores, solo dices "quiero leer X veces por segundo".
    - **Caso de uso:** Carritos de compra, Juegos, Apps móviles, Microservicios.
2. **Amazon DocumentDB:**
    - **Qué es:** Base de datos de documentos compatible con **MongoDB**.
    - **Por qué existe:** Para empresas que ya tienen su código escrito para MongoDB y quieren migrar a AWS sin reescribir nada.
3. **Amazon ElastiCache:**
    - **Qué es:** Servicio gestionado para **Redis** y **Memcached**.
    - **Uso:** Caché en memoria. Se pone *delante* de tu base de datos principal para acelerar lecturas a microsegundos.

### 🟦 Azure: La Filosofía "Navaja Suiza"

Microsoft tomó un camino totalmente diferente con su producto estrella.

1. **Azure Cosmos DB (El Universal):**
    - **Qué es:** Una base de datos **Multi-modelo**.
    - **Filosofía:** "Una base para dominarlas a todas".
    - **El Superpoder:** Cosmos DB es un camaleón. Puedes hablarle en lenguaje SQL, en lenguaje MongoDB, en Cassandra o en Gremlin (Grafos).
    - **Global Distribution:** Tiene un botón literal en la consola que dice "Replicar en todo el mundo". Haces clic en el mapa y tus datos se copian a Japón o Australia al instante. Es la mejor base de datos para aplicaciones verdaderamente globales.

---

### 🟥 GCP: La Filosofía "Escala y Facilidad"

Google ofrece tecnologías que nacieron de sus propios productos masivos (Search, Gmail, Android).

1. **Cloud Firestore (Antes Datastore):**
    - **Qué es:** Base de datos Documental (JSON).
        
        **Filosofía:** "Real-time para apps móviles y web".
        
    - **El Superpoder:** **Desarrollo de Apps.** Es la base nativa de **Firebase**. Permite sincronización en tiempo real: si cambias un dato en la base, la pantalla de tu usuario en su celular se actualiza sola sin recargar. Amada por los desarrolladores Frontend/Mobile.
2. **Cloud Bigtable:**
    - **Qué es:** Base de datos de columnas (Column-Family) para Big Data.
    - **El Superpoder:** **Rendimiento Masivo.** Es la tecnología que hay detrás del buscador de Google y Gmail. No es fácil de usar (no es para principiantes), pero si necesitas procesar petabytes de datos de sensores IoT o analítica financiera, no hay nada más potente.

### Tabla Comparativa: NoSQL

**Ganador:**

- **Serverless**: DynamoDB (más maduro)
- **Multi-modelo**: Cosmos DB (único)
- **Real-time**: Firestore (sincronización instantánea)

| **Característica** | **🟧 AWS DynamoDB** | **🟦 Azure Cosmos DB** | **🟥 GCP Firestore** |
| --- | --- | --- | --- |
| **Tipo** | Key-Value + Document | Multi-modelo | Document |
| **Serverless** | ✅ | ✅ | ✅ |
| **Global** | Global Tables | ✅ (1 clic) | Multi-región |
| **Real-time** | Streams | Change Feed | ✅ (nativo) |
| **Consistencia** | Eventual / Strong | 5 niveles | Strong / Eventual |
| **SLA** | 99.99% | 99.999% | 99.99% |
| **Precio (1M writes)** | $1.25 | ~$0.25 | $1.80 |

## DATA WAREHOUSES (Almacenes de Datos)

### Porque existe un Data Warehouse?

> Las bases de datos tradicionales (SQL/NoSQL) están diseñadas para **operar** el negocio (vender, registrar, guardar), pero son pésimas para **analizar** el negocio.
> 

Si intentas hacer preguntas complejas ("¿Cuál fue el producto más vendido en navidad los últimos 5 años?") a tu base de datos principal, ocurren dos problemas graves:

1. **Bloqueo:** La base de datos se satura leyendo millones de datos antiguos.
2. **Lentitud:** Tu aplicación web (la tienda) se vuelve lenta o se cae para los clientes reales que intentan comprar en ese momento.

**Solución:** separar mundos.

```tsx
App DB → operar
DW → analizar
```

El **Data Warehouse** existe para ser el **"Sandbox de Análisis"**: un lugar seguro donde puedes torturar los datos con consultas pesadas sin afectar la operación diaria de la empresa.

> Un **Data Warehouse (DW)** es un sistema centralizado diseñado para **almacenar grandes volúmenes de datos históricos** provenientes de múltiples fuentes con el objetivo de **analizarlos y apoyar la toma de decisiones**.
Un **Data Warehouse** es una base de datos optimizada para **análisis** y **reportes** (OLAP), no para transacciones (OLTP).
> 

### **Características:**

- **Datos históricos:** Almacena años de datos (no se borran)
- **Consultas complejas:** Agregaciones, JOINs masivos, análisis
- **Columnar:** Almacena datos por columnas (no por filas)
- **ETL:** Extrae datos de múltiples fuentes, los transforma y los carga

**Diferencia con bases de datos transaccionales:**

| Aspecto | OLTP (Transaccional) | OLAP (Data Warehouse) |
| --- | --- | --- |
| **Propósito** | Transacciones diarias | Análisis y reportes |
| **Operaciones** | INSERT, UPDATE, DELETE | SELECT (agregaciones) |
| **Volumen** | GB - TB | TB - PB |
| **Latencia** | <10ms | Segundos - Minutos |
| **Usuarios** | Miles - Millones | Decenas - Cientos |
| **Ejemplo** | App de e-commerce | Dashboard de BI |

<aside>

### DATA LAKE

> Son sistemas de almacenamiento de archivos (Object Storage) , no es BD
Un **Data Lake** es un repositorio de almacenamiento masivo y barato donde guardas datos **CRUDOS (Raw Data)** en su formato original.
> 
- Es una **Estrategia / Arquitectura**. Significa: "Voy a guardar todos los datos de mi empresa en un solo lugar centralizado, sin procesar, para usarlos en el futuro".

**Diferencia con el Data Warehouse:**

- **Data Warehouse (Almacén):** Es como una **Estantería de Archivos**. Solo aceptas carpetas ordenadas, etiquetadas y procesadas (Tablas SQL). Si intentas meter una foto o un video, no entra.
- **Data Lake (Lago):** Aceptas todo. Archivos JSON, CSVs, Imágenes, Videos, Logs de servidor.

Data Lake es un CONCEPTO (una arquitectura).Object Storage es la TECNOLOGÍA (la herramienta) donde lo construyes.

"Un **Data Lake** es una arquitectura lógica que, hoy en día, se implementa físicamente usando servicios de **Object Storage**"

### ¿Por qué usamos Object Storage para hacer el Data Lake?

Usamos **Object Storage (S3, Blob, GCS)** como la base del Data Lake porque tiene las características perfectas para ese concepto:

1. **Acepta cualquier formato:** (Video, JSON, CSV, MP3). Las bases de datos no pueden hacer esto.
2. **Espacio Infinito:** Nunca te dice "Disco Lleno".
3. **Barato:** Es la forma más económica de guardar datos en la nube.
4. **Separado del Cómputo:** Puedes tener 1 Petabyte guardado y pagas solo por guardarlo. No necesitas tener una CPU encendida (como en una Base de Datos) para mantener los datos ahí.
</aside>

### Arquitectura de un Data Warehouse

### 1. Data Sources (Fuentes de Datos)

El origen de todo. Son sistemas externos al Warehouse.

- **Sistemas Operacionales (OLTP):** Tu MySQL, PostgreSQL, MongoDB (donde vive tu App).
- **Apps SaaS:** Salesforce, Stripe, Google Analytics.
- **Logs:** Archivos de registro de servidores.

<aside>

### ETL vs ELT

> Esta es la decisión de arquitectura más importante. Define **dónde** y **cuándo** limpias los datos.
> 

### 1. ETL (Extract, Transform, Load) - *La Vieja Escuela*

Diseñado cuando el almacenamiento en disco era caro y las bases de datos lentas.

1. **Extract (Extraer):** Sacas los datos de MySQL.
2. **Transform (Transformar):** En un **servidor externo dedicado**, limpias los datos, calculas promedios y cambias formatos.
3. **Load (Cargar):** Guardas el resultado limpio y final en el Warehouse.
- **Ventaja:** Al Warehouse solo llega "dato puro". Ahorra espacio.
- **Desventaja:** Es lento. Si necesitas un dato nuevo, tienes que reprogramar todo el pipeline de transformación.

### 2. ELT (Extract, Load, Transform) - *El Estándar Cloud*

Diseñado para la nube (AWS Redshift, BigQuery, Snowflake), donde el almacenamiento es barato y la potencia de cálculo es masiva.

1. **Extract (Extraer):** Sacas los datos de MySQL.
2. **Load (Cargar):** Tiras los datos **crudos (raw)** directamente al Warehouse (o a un Data Lake como S3).
3. **Transform (Transformar):** Usas la potencia del propio Warehouse para limpiar y transformar los datos adentro.
- **Ventaja:** **Velocidad y Agilidad.** Los datos están ahí disponibles inmediatamente. Si quieres cambiar una métrica, solo cambias la query SQL, no tienes que volver a extraer nada.
- **Desventaja:** Requiere un Warehouse potente (Cloud).
    
    ![image.png](image%2024.png)
    
</aside>

### 2. Staging Area (Zona de Escala / Intermedia)

*El "Muelle de Carga".*

- **Qué es:** Un lugar de almacenamiento temporal donde aterrizan los datos tal cual vienen de la fuente (crudos).
- **Tecnología:** En la nube, suele ser **Object Storage** (Amazon S3, Google Cloud Storage, Azure Blob).
- **Función:** Evita que el Warehouse se rompa si la carga falla. Sirve de "colchón" de seguridad.

### 3. Data Warehouse (El Almacén Central)

*El "Corazón".*

- **Qué es:** La base de datos OLAP (Redshift, BigQuery, Snowflake).
- **Función:** Aquí viven los datos consolidados. Es la **"Single Source of Truth"** (Fuente Única de la Verdad). Si Ventas dice que ganaron 1M y Finanzas dice 0.9M, el Warehouse dice quién tiene la razón.

### 4. Data Marts (Tiendas Especializadas)

*El "Minimarket Departamental".*

- **Qué es:** Un **Data Mart** es un subconjunto del Data Warehouse, diseñado específicamente para un **departamento o equipo** (Marketing, Finanzas, RRHH).
- **Problema:** El equipo de Marketing no necesita ver los datos de Recursos Humanos. Se confunden.
- **Solución:** Creas un **Data Mart de Marketing** (solo tablas de campañas y leads) y un **Data Mart de Finanzas** (solo tablas de facturación).
- **Nota Técnica:** A veces son bases de datos separadas, pero en Cloud suelen ser simplemente **Vistas Lógicas** (Views) dentro del mismo Warehouse.

### 5. BI Tools / Presentation Layer (Capa de Presentación)

*La "Cara Visible".*

- **Qué es:** Herramientas que conectan al Warehouse para hacer gráficos y reportes.
- **Ejemplos:** Power BI, Tableau, Google Looker Studio, Metabase.
- **Función:** Traducir SQL complejo a gráficos de barras para el CEO.

![image.png](image%2025.png)

### Relacion BD Tradicionales - Data Warehouse

![image.png](image%2026.png)

### Los Servicios de Data Warehouses por Proveedor

### 🟧 AWS: Amazon Redshift

**El Pionero.** Fue el primer Data Warehouse masivo en la nube.Data Warehouse columnar de AWS.

- **Filosofía:** "Potencia bruta y control".
- **Cómo funciona:** Originalmente lanzabas un clúster de servidores (Provisioned). Ahora también tienen opción **Serverless**, pero su núcleo sigue siendo muy cercano al "hierro".
- **El Superpoder:** **Integración con el Lago de Datos (S3).**
    - Tiene una función llamada **Redshift Spectrum**. Imagina que tienes 50 TB de archivos CSV viejos en S3. Con Redshift, puedes lanzar una query SQL para leer esos archivos **sin cargarlos** en la base de datos. Ahorras horas de importación.

### 🟥 GCP: Google BigQuery

**Qué es:** Data Warehouse serverless de Google.

**El Favorito de los Devs.** Cambió las reglas del juego al eliminar el concepto de "servidor".

- **Filosofía:** "No administres nada, solo pregunta".
- **Cómo funciona:** Es **100% Serverless**. No eliges CPU, ni RAM, ni discos. Solo subes datos y lanzas SQL.
- **El Superpoder:** **Velocidad Instantánea.**
    - Google te presta miles de CPUs durante los 2 segundos que dura tu consulta y luego te las quita. Es ideal para empresas que necesitan analítica rápida sin tener un equipo de infraestructura manteniendo servidores.
    - Se conecta nativamente con **Google Analytics 4** y **Firebase**.

### 🟦 Azure: Azure Synapse Analytics

**Qué es:** Data Warehouse y plataforma de análisis de Azure.

**El Unificador.** Microsoft no solo creó un Warehouse, creó un "Estudio de Trabajo".

- **Filosofía:** "Todo en un solo lugar" → "Data Warehouse + Big Data + IA en un solo lugar".
- **Cómo funciona:** Synapse es una plataforma que combina **Data Warehouse** (SQL), **Big Data** (Spark/Databricks) e **Integración de Datos** (Pipelines tipo ETL).
- **El Superpoder:** **Ecosistema Corporativo.**
    - Si tu empresa usa Office 365, Power BI y Active Directory, Synapse es la pieza que falta. La integración con **Power BI** es tan fluida que puedes crear reportes directamente desde la base de datos sin configuraciones complejas.

### Tabla Comparativa: Data Warehouses

**Ganador:**

- **Serverless**: BigQuery (más maduro)
- **Integración BI**: Synapse (Power BI nativo)
- **ML**: BigQuery (ML con SQL)

| **Característica** | **🟧 AWS Redshift** | **🟦 Azure Synapse** | **🟥 GCP BigQuery** |
| --- | --- | --- | --- |
| **Serverless** | Redshift Serverless | ✅ | ✅ (nativo) |
| **Escalabilidad** | Petabytes | Petabytes | **Exabytes** |
| **Integración BI** | QuickSight | **Power BI** | Looker, Data Studio |
| **ML integrado** | SageMaker (separado) | Azure ML | **BigQuery ML** (SQL) |
| **Precio (1TB query)** | ~$5 | ~$5 | $5 |
| **Killer Feature** | Redshift Spectrum | Power BI | BigQuery ML |