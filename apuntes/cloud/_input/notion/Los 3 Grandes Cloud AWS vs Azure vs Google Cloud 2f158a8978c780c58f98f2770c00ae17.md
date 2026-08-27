# Los 3 Grandes Cloud: AWS vs Azure vs Google Cloud

![image.png](image%204.png)

## AWS (Amazon Web Services)

### **Historia:**

- **Lanzamiento**: 2006 (pionero del cloud público)
- **Origen**: Amazon necesitaba infraestructura escalable para su e-commerce, decidió monetizarla
- **Hito**: S3 y EC2 fueron los primeros servicios (marzo 2006)
- **Evolución**: De 2 servicios en 2006 a 200+ servicios en 2025

### **Fortalezas Clave:**

> Tiene más servicios que nadie. Si existe una tecnología, AWS ya tiene un servicio para eso. Su ecosistema de partners y documentación es infinito.
> 

| Fortaleza | Detalle |
| --- | --- |
| **Madurez y Profundidad** | 200+ servicios, el catálogo más completo |
| **Ecosistema** | Mayor comunidad, más documentación, más third-party tools |
| **Innovación Continua** | Lanza 3,000+ features/año |
| **Alcance Global** | 33 regiones, 105 zonas de disponibilidad |
| **Marketplace** | 12,000+ soluciones listas para usar |
| **Servicios Especializados** | IoT, Robotics, Quantum, Satellite (Ground Station) |

### Ideal para

### A. El Estándar de la Industria (Startups Tech)

- **El concepto:** AWS llegó primero (2006). Lleva tanta ventaja que se convirtió en el "idioma por defecto" de la nube.
- **Por qué importa:**
    - **Talento:** Es más fácil encontrar un ingeniero que sepa AWS que uno que sepa Oracle Cloud.
    - **Confianza:** Los inversores (VCs) confían en AWS. Nadie te va a cuestionar por elegirlo.
    - **Recursos:** Si buscas un tutorial en Google sobre "cómo desplegar X", el 80% de los resultados serán para AWS.

### B. Amplitud de Servicios (Nunca te dicen "No")

- **El concepto:** Tienen más de 200 servicios. No solo tienen "servidores"; tienen satélites (Ground Station), robótica (RoboMaker) y computación cuántica (Braket).
- **El Dolor que resuelve:** **Escalabilidad Técnica.** Nunca tendrás que migrarte de AWS porque "se quedó chico". Puedes empezar con un blog y terminar construyendo Netflix (que corre en AWS) sin cambiar de proveedor.

### C. Ecosistema y Comunidad

- **El concepto:** El "Marketplace" de AWS es inmenso. Si necesitas un firewall, Fortinet ya tiene una imagen lista para AWS. Si necesitas una base de datos específica, ya está ahí.
- **Analogía:** Es como la **App Store**. Todo el mundo desarrolla herramientas para que funcionen allí primero.

### Debilidades

### A. Complejidad Abrumadora (Curva de Aprendizaje)

- **El Dolor:** AWS te da bloques de construcción muy pequeños (primitivos).
    - Para hacer algo simple, a veces tienes que configurar 5 servicios distintos (VPC + Subnet + Internet Gateway + Route Table + Security Group).

### B. Pricing Complicado

- **El Dolor:** La factura de AWS es ilegible para humanos.
    - No te cobran "por servidor". Te cobran por: *Horas de CPU + GB de disco + Millones de I/O + GB de transferencia de datos + IP estática...*
- **Riesgo:** Es muy fácil cometer un error de configuración y recibir una factura de $5,000 en lugar de $50 (**Bill Shock**).

### C. UX Inconsistente (Experiencia de Usuario)

- **El Porqué:** Amazon trabaja con equipos autónomos ("Two Pizza Teams"). El equipo que hace S3 no habla mucho con el equipo que hace EC2.
- **Resultado:** La consola de un servicio se ve y funciona diferente a la del otro. A veces se siente como un "Frankenstein" de interfaces.

## Microsoft Azure

### **Historia:**

- **Lanzamiento**: 2010 (inicialmente "Windows Azure")
- **Origen**: Respuesta de Microsoft a AWS, aprovechando su base empresarial
- **Renombre**: De "Windows Azure" a "Microsoft Azure" (2014) para enfatizar soporte multi-OS
- **Estrategia**: Híbrido first, integración con ecosistema Microsoft

### **Fortalezas Clave:**

> Si tu empresa usa Windows Server, Active Directory, SQL Server y .NET, Azure es la extensión natural. Su modelo híbrido es excelente.
> 

| Fortaleza | Detalle |
| --- | --- |
| **Integración Microsoft** | Active Directory, Office 365, Dynamics 365, Teams seamless |
| **Híbrido Superior** | Azure Arc, Azure Stack (cloud en tu datacenter) |
| **Enterprise-Friendly** | Acuerdos Enterprise (EA), soporte dedicado |
| **Windows Workloads** | Mejor opción para apps .NET, SQL Server, SharePoint |
| **AI/OpenAI** | Acceso exclusivo a GPT-4, DALL-E via Azure OpenAI Service |
| **Compliance** | 90+ certificaciones de cumplimiento normativo |

<aside>

**Filosofía:** "Empresarial". Integración perfecta con Office 365 y contratos corporativos (Enterprise Agreements)

</aside>

### Ideal para

### A. La Inercia Corporativa (El Ecosistema Microsoft)

- **El Concepto:** Si tu empresa ya "habla Microsoft" (usa Outlook, Teams, Windows Server, Active Directory), Azure es la extensión natural.
- **El Dolor que resuelve:** **Fricción de Identidad.**
    - En AWS, tienes que crear usuarios nuevos.
    - En Azure, usas el mismo usuario y contraseña que usas para iniciar sesión en tu laptop corporativa (Azure AD / Entra ID). Esto para un CIO vale oro.

### B. El Rey de la Nube Híbrida

- **El Concepto:** A diferencia de Amazon (que nació 100% web), Microsoft lleva 40 años vendiendo servidores físicos. Entienden que los bancos y gobiernos no pueden mover todo a la nube mañana.
- **La Ventaja:** Tienen las mejores herramientas para conectar tu datacenter viejo con la nube nueva y gestionarlo todo como si fuera uno solo (**Azure Arc**).

### C. La Carta del Triunfo: Azure OpenAI

- **El Concepto:** Tienen la exclusiva de los modelos de OpenAI (GPT-4) para empresas.
- **Por qué importa:** Si quieres usar ChatGPT con datos confidenciales de tu empresa, no puedes usar la web pública. Debes usar Azure OpenAI Service, que te garantiza (por contrato) que **no** usarán tus datos para entrenar al modelo público.

### D. Contratos EA (El factor Dinero)

- **El Concepto:** Muchas empresas grandes ya pagan millones a Microsoft por licencias de Office y Windows.
- **La Táctica:** Microsoft les dice: *"Como ya gastas tanto, te regalo $50,000 en créditos de Azure"*. Es difícil decir que no a infraestructura "gratis".

### Debilidades

### A. El Caos de los Nombres (Rebranding Fatigue)

- **El Dolor:** A Microsoft le encanta cambiar los nombres de los productos por marketing.
    - *Ejemplo:* "Azure Active Directory" ahora es "Microsoft Entra ID".
    - *Ejemplo:* ¿Azure ML, Machine Learning Studio o Databricks? Hay 3 formas de hacer lo mismo y confunde al arquitecto.
- **Resultado:** Es difícil mantener los diagramas y la documentación mental actualizada.

### B. Documentación Fragmentada

- **El Dolor:** A diferencia de la documentación técnica "seca pero precisa" de AWS, la de Microsoft a veces mezcla marketing con técnica, o te lleva a páginas desactualizadas de versiones antiguas de Windows Server.
- **Riesgo:** A veces es más difícil encontrar la "respuesta exacta" a un error de configuración.

### C. Madurez Desigual

- **El Dolor:** Los servicios principales (Compute, SQL, Storage) son rocas sólidas. Pero si te vas a servicios muy nuevos o de nicho, puedes encontrar bugs que no verías en AWS. Se siente que algunos servicios salen en "Beta" disfrazada.

## Google Cloud Platform (GCP)

### **Historia:**

- **Lanzamiento**: 2008 (App Engine), cloud completo en 2011
- **Origen**: Google abre su infraestructura interna (misma que usa para Search, Gmail, YouTube)
- **Diferenciación**: Enfoque en data, analytics, ML, open source
- **Apuesta**: Kubernetes (creado por Google), TensorFlow, BigQuery

### **Fortalezas Clave:**

> **Data, AI y Kubernetes.** GCP es donde nacieron Kubernetes y TensorFlow. Sus servicios de Big Data (BigQuery) son considerados los mejores del mercado por velocidad y facilidad.
> 
- Tu foco es **Big Data, Machine Learning o IA Generativa**. (BigQuery y Vertex AI son líderes).
- Eres una empresa **"Cloud Native"** que usa intensivamente **Kubernetes**. (GKE es la implementación más estable y avanzada de K8s, ya que Google lo inventó).

| Fortaleza | Detalle |
| --- | --- |
| **Data & Analytics** | BigQuery es el mejor data warehouse del mercado |
| **Machine Learning** | TensorFlow, Vertex AI, AutoML líderes en industria |
| **Kubernetes** | GKE es el mejor managed Kubernetes (Google lo inventó) |
| **Networking** | Infraestructura de red más rápida (Google Fiber backbone) |
| **Pricing** | Descuentos automáticos por uso sostenido, por segundo billing |
| **Open Source** | Kubernetes, TensorFlow, Istio, Go language |
| **Simplicidad** | Menos servicios pero mejor UX y consistencia |

### Ideal para:

### A. El Rey de los Datos (Data-Intensive & Analytics)

- **El Concepto:** Google vive de los datos. Su infraestructura interna (Borg, BigTable) fue diseñada para indexar todo internet.
- **La Joya de la Corona:** **BigQuery**.
    - **Por qué importa:** Es un Data Warehouse *Serverless*. Le puedes tirar petabytes de datos y te responde en segundos sin que tengas que configurar ni un solo servidor. Es la razón #1 por la que las empresas eligen GCP.
- **Caso de Uso:** Retailers analizando comportamientos de compra en tiempo real (Spotify, Twitter/X usan esto).

### B. Machine Learning y AI Nativo (Vertex AI)

- **El Concepto:** Google inventó los "Transformers" (la 'T' de ChatGPT) y TensorFlow. La IA no es un producto agregado, es su ADN.
- **La Ventaja:** Tienen hardware propio para IA (**TPUs** - Tensor Processing Units) que a veces es más rápido y barato que las GPUs de Nvidia para entrenar modelos.
- **Herramienta Clave:** **Vertex AI**. Unifica todo el ciclo de vida del ML en una sola plataforma muy pulida.

### C. Container Native (La Casa de Kubernetes)

- **El Hecho:** Google **inventó** Kubernetes y lo regaló al mundo.
- **La Consecuencia:** **GKE (Google Kubernetes Engine)** es, indiscutiblemente, la mejor implementación de Kubernetes del mercado.
    - Es más automático, se actualiza mejor y es más fácil de manejar ("Piloto Automático") que EKS (AWS) o AKS (Azure).
    - Si tu startup es "Cloud Native" (todo microservicios), aquí vivirás más feliz.

### D. Developer Experience (Para Startups)

- **El Sentimiento:** La consola de GCP es **bonita, rápida y limpia**.
- **Comparación:**
    - AWS se siente como un panel de control de avión (mil botones).
    - GCP se siente como usar Gmail.
    - Para una startup con equipo pequeño, esta velocidad y simplicidad operativa vale oro.

### Debilidades

### A. Catálogo de Servicios "Curado" (Menos es... menos)

- **El Dolor:** AWS tiene un servicio para *todo* (hasta satélites). GCP tiene los servicios *esenciales*.
- **El Riesgo:** Si necesitas una característica muy específica o legado (ej. un servicio gestionado para una base de datos antigua y rara), es probable que GCP no lo tenga y AWS sí.

### B. El Fantasma del Soporte Enterprise

- **La Fama:** Históricamente, Google ha sido criticado por tener un soporte al cliente "robotizado".
- **El Dolor:** Es difícil hablar con un humano. Tienden a enviarte a documentación o foros. Para un Banco que pierde millones por minuto si el sistema cae, esto es inaceptable (aunque han mejorado mucho en los últimos 2 años).

### C. Menos Regiones (Aunque suficiente para el 90%)

- **La Realidad:** Azure tiene data centers hasta debajo de las piedras (60+ regiones). GCP tiene menos (~40 regiones).
- **Impacto:** Si necesitas cumplir una ley de "Residencia de Datos" en un país específico donde Google no tiene data center, simplemente no puedes usarlos.

### D. Ecosistema Empresarial "Joven"

- **El Problema:** Hay menos consultoras, menos integradores y menos herramientas de terceros que soporten GCP "out of the box" comparado con AWS.
- **Causa:** Tener solo el 10-11% del mercado significa que las empresas de software priorizan desarrollar primero para AWS y Azure.

## TABLA COMPARATIVA DE SERVICIOS CORE

---

### DATABASE (Bases de Datos Relacionales)

| Aspecto | AWS RDS | Azure SQL Database | GCP Cloud SQL |
| --- | --- | --- | --- |
| **Motores Soportados** | MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora | SQL Server, PostgreSQL, MySQL | MySQL, PostgreSQL, SQL Server |
| **Motor Propietario** | **Aurora** (5x MySQL, 3x PostgreSQL) | Azure SQL (basado en SQL Server) | No tiene propietario |
| **Alta Disponibilidad** | Multi-AZ (replicación síncrona) | Geo-replication | Regional replicas |
| **Read Replicas** | Hasta 15 (Aurora) | Hasta 4 | Hasta 10 |
| **Auto-scaling Storage** | Sí (Aurora Serverless) | Sí (Hyperscale) | Sí |
| **Serverless** | Aurora Serverless v2 | Azure SQL Serverless | No nativo |
| **Backup Automático** | Hasta 35 días | Hasta 35 días | Hasta 365 días |
| **Punto de Restore** | Cualquier segundo (35 días) | Cualquier segundo | Cualquier segundo |

**Servicios Especiales:**

```
AWS:
• Aurora: Motor propietario compatible MySQL/PostgreSQL
  - 5x performance de MySQL estándar
  - Hasta 128TB de storage
  - Auto-scaling de read replicas

Azure:
• Azure SQL Managed Instance: SQL Server en cloud con casi 100% compatibilidad
  - Lift-and-shift de SQL Server on-premise
  - CLR, Agent Jobs, cross-database queries

GCP:
• Cloud Spanner: Base de datos relacional distribuida globalmente
  - Consistency global (no eventual)
  - Horizontal scaling ilimitado
  - Latencia <10ms global

```

**Ganador por categoría:**

- **Performance**: AWS Aurora (motor optimizado)
- **SQL Server**: Azure (es Microsoft, compatibilidad total)
- **Simplicidad**: GCP Cloud SQL (setup más fácil)
- **Global Distribution**: GCP Cloud Spanner (único en su clase)

---

### NETWORKING (Redes Virtuales)

| Aspecto | AWS VPC | Azure VNet | GCP VPC |
| --- | --- | --- | --- |
| **Nombre Completo** | Virtual Private Cloud | Virtual Network | Virtual Private Cloud |
| **Alcance** | Regional (1 VPC = 1 región) | Regional | **Global** (1 VPC = multi-región) |
| **Subnets** | Por AZ (availability zone) | Por región | Por región |
| **CIDR** | /16 a /28 | /8 a /29 | /8 a /29 |
| **Peering** | VPC Peering (no transitivo) | VNet Peering | VPC Peering (global) |
| **VPN** | Site-to-Site VPN | VPN Gateway | Cloud VPN |
| **Conexión Dedicada** | **Direct Connect** | **ExpressRoute** | **Cloud Interconnect** |
| **Firewall** | Security Groups, NACLs | NSG (Network Security Groups) | Firewall Rules |
| **Load Balancer** | ALB, NLB, CLB | Application Gateway, Load Balancer | Cloud Load Balancing |

**Diferencia CLAVE:**

```
AWS VPC (Regional):
┌──────────────────┐  ┌──────────────────┐
│  VPC us-east-1   │  │  VPC eu-west-1   │
│  (separadas)     │  │  (separadas)     │
└──────────────────┘  └──────────────────┘
      Requiere VPC Peering o Transit Gateway

GCP VPC (Global):
┌─────────────────────────────────────────┐
│         VPC Global                      │
│  ┌──────────────┐  ┌──────────────┐    │
│  │ us-central1  │  │  europe-west1│    │
│  │ (subnet)     │  │  (subnet)    │    │
│  └──────────────┘  └──────────────┘    │
└─────────────────────────────────────────┘
      Una sola VPC, múltiples regiones

```

**Ganador:**

- **Flexibilidad**: AWS (más opciones de configuración)
- **Enterprise**: Azure (ExpressRoute, integración on-premise)
- **Simplicidad Global**: GCP (VPC global única en industria)

---

### SERVERLESS (Funciones como Servicio)

| Aspecto | AWS Lambda | Azure Functions | GCP Cloud Functions |
| --- | --- | --- | --- |
| **Lanzamiento** | 2014 (pionero) | 2016 | 2017 |
| **Lenguajes** | Node.js, Python, Java, Go, C#, Ruby, Custom Runtime | C#, Java, JS, Python, PowerShell, TypeScript | Node.js, Python, Go, Java, .NET, Ruby, PHP |
| **Timeout Max** | 15 minutos | 10 min (Consumption), Unlimited (Premium) | 9 minutos (Gen 1), 60 min (Gen 2) |
| **Memoria Max** | 10GB | 1.5GB (Consumption), 14GB (Premium) | 8GB (Gen 1), 16GB (Gen 2) |
| **Concurrencia** | 1,000 por región (aumentable) | Sin límite (escala automático) | 1,000 por función |
| **Cold Start** | 100-500ms (mejorando) | 200-800ms | 100-400ms |
| **Triggers** | 20+ servicios (S3, DynamoDB, API Gateway, etc.) | 200+ bindings (Event Grid, Cosmos DB, etc.) | 10+ (Pub/Sub, Storage, HTTP) |
| **Pricing** | $0.20 por 1M requests + $0.00001667/GB-segundo | $0.20 por 1M requests + $0.000016/GB-segundo | $0.40 por 1M requests + $0.0000025/GB-segundo |

**Free Tier:**

```
AWS Lambda:
• 1M requests gratis/mes (perpetuo)
• 400,000 GB-segundos gratis/mes

Azure Functions:
• 1M requests gratis/mes
• 400,000 GB-segundos gratis/mes

GCP Cloud Functions:
• 2M invocations gratis/mes
• 400,000 GB-segundos gratis/mes
• 200,000 GHz-segundos gratis/mes

```

**Ecosistema:**

```
AWS Lambda:
✓ Integración más profunda (20+ event sources)
✓ Serverless Framework (framework más popular)
✓ Step Functions (orquestación compleja)
✓ Lambda@Edge (funciones en CDN)
✓ EFS mounting (sistema de archivos)

Azure Functions:
✓ Durable Functions (stateful workflows)
✓ Integración Visual Studio (desarrollo local)
✓ Logic Apps (low-code workflow)
✓ Mejor para .NET developers

GCP Cloud Functions:
✓ Simplicidad superior
✓ Cloud Run (containers serverless, más flexible)
✓ Integración BigQuery, Pub/Sub
✓ Eventarc (event routing avanzado)

```

**Ganador:**

- **Ecosistema**: AWS Lambda (más maduro, más integraciones)
- **Desarrollo .NET**: Azure Functions
- **Simplicidad**: GCP Cloud Functions
- **Precio**: Azure (ligeramente más barato)

---

### KUBERNETES (Managed Kubernetes)

| Aspecto | AWS EKS | Azure AKS | GCP GKE |
| --- | --- | --- | --- |
| **Nombre** | Elastic Kubernetes Service | Azure Kubernetes Service | Google Kubernetes Engine |
| **Lanzamiento** | 2018 (tardío) | 2018 | 2015 (el primero) |
| **Control Plane** | **$0.10/hora** ($73/mes) | **GRATIS** | **$0.10/hora** ($73/mes) |
| **K8s Version** | Hasta 4 versiones minor | Hasta 3 versiones | Hasta 3 versiones |
| **Upgrade** | Manual (EKS lo gestiona) | Manual o automático | **Automático** (con release channels) |
| **Node Pools** | Managed Node Groups | Node Pools | Node Pools |
| **Autoscaling** | Cluster Autoscaler (addon) | Cluster Autoscaler | **GKE Autopilot** (fully managed) |
| **Networking** | VPC CNI (AWS native) | Azure CNI, Kubenet | VPC-native, Alias IPs |
| **Registro Privado** | ECR (integración nativa) | ACR (integración nativa) | GCR/Artifact Registry |
| **Service Mesh** | App Mesh (istio-based) | Open Service Mesh | **Anthos Service Mesh** (Istio managed) |

**Modos de Operación:**

```
EKS (AWS):
• Standard: Tú gestionas nodes, AWS gestiona control plane
• Fargate: Serverless pods (sin nodes)

AKS (Azure):
• Standard: Tú gestionas nodes
• Virtual Nodes: ACI integration (serverless)

GKE (Google):
• Standard: Tú gestionas nodes
• **Autopilot**: Google gestiona TODO (nodes, upgrades, scaling)
  - Solo pagas por pods, no por nodes
  - Cero gestión operativa

```

**Características Únicas:**

```
EKS:
✓ Integración IAM (IRSA: IAM Roles for Service Accounts)
✓ Fargate para serverless pods
✓ Anywhere: K8s on-premise gestionado por AWS

AKS:
✓ Control plane GRATIS (ahorro $73/mes)
✓ Azure AD integration nativa
✓ Virtual Kubelet (ACI integration)
✓ KEDA (event-driven autoscaling)

GKE:
✓ **Autopilot**: Cero gestión de infraestructura
✓ Release Channels (Stable, Regular, Rapid)
✓ Binary Authorization (seguridad de imágenes)
✓ Workload Identity (mejores prácticas de seguridad)
✓ Multi-cluster ingress
✓ Google inventó Kubernetes (expertise nativo)

```

**Ganador por categoría:**

- **Expertise Kubernetes**: GKE (Google lo inventó, mejor implementación)
- **Simplicidad Operativa**: GKE Autopilot (fully managed)
- **Costo**: AKS (control plane gratis)
- **Integración AWS**: EKS (obviamente)
- **Integración Azure**: AKS (obviamente)

---

## 3. RESUMEN EJECUTIVO (Principio 80/20)

### ¿Cuál Elegir Según Tu Situación?

```
┌──────────────────────────────────────────────────────────────┐
│                    MATRIZ DE DECISIÓN                        │
└──────────────────────────────────────────────────────────────┘

ELIGE AWS SI:
✓ Startup tech (estándar de facto en Silicon Valley)
✓ Necesitas amplitud de servicios (serverless, IoT, ML, etc.)
✓ Ecosistema y comunidad son prioritarios
✓ Presupuesto amplio, equipo técnico fuerte
✓ No tienes infraestructura Microsoft existente

ELIGE AZURE SI:
✓ Empresa con ecosistema Microsoft (Office 365, AD, Windows)
✓ Aplicaciones .NET, SQL Server, SharePoint
✓ Necesitas híbrido (Azure Arc, Azure Stack)
✓ Tienes Enterprise Agreement con Microsoft
✓ Requieres Azure OpenAI (GPT-4 empresarial)

ELIGE GCP SI:
✓ Proyecto data-intensive (analytics, big data)
✓ Machine Learning y AI son core de tu producto
✓ Aplicaciones containerizadas (Kubernetes native)
✓ Priorizas developer experience y simplicidad
✓ Presupuesto ajustado (descuentos automáticos, pricing transparente)

```

### Tabla de Fortalezas por Área

| Área | Líder | Segundo | Tercero |
| --- | --- | --- | --- |
| **Compute (VMs)** | AWS | Azure | GCP |
| **Serverless** | AWS Lambda | Azure Functions | GCP Cloud Functions |
| **Storage** | AWS S3 | Azure Blob | GCP Cloud Storage |
| **Databases** | AWS Aurora | Azure SQL | GCP Spanner (nicho) |
| **Kubernetes** | **GCP GKE** | Azure AKS | AWS EKS |
| **Data Analytics** | **GCP BigQuery** | Azure Synapse | AWS Redshift |
| **Machine Learning** | **GCP Vertex AI** | Azure ML | AWS SageMaker |
| **Híbrido** | **Azure Arc** | AWS Outposts | Google Anthos |
| **Pricing** | **GCP** | Azure | AWS |
| **Ecosistema** | **AWS** | Azure | GCP |
| **Enterprise** | **Azure** | AWS | GCP |

### Costos Típicos (Ejemplo: Startup SaaS)

```
ESCENARIO: App web con 100K usuarios/mes
• 2 instancias web (4vCPU, 16GB RAM)
• 1 base de datos managed (8vCPU, 32GB RAM)
• 500GB storage
• 1TB egress/mes
• Load balancer

AWS:     ~$650/mes
Azure:   ~$620/mes
GCP:     ~$550/mes (descuentos automáticos incluidos)

NOTA: Precios reales varían según optimizaciones, reserved instances, etc.

```

### Recomendación Final

**Para el 80% de casos:**

1. **Si eres startup tech sin legado**: Empieza con **AWS** (ecosistema) o **GCP** (simplicidad/precio)
2. **Si eres empresa Microsoft**: **Azure** sin dudar
3. **Si tu producto es data/ML-centric**: **GCP** es la mejor opción técnica
4. **Si necesitas híbrido**: **Azure** tiene la mejor solución (Azure Arc)
5. **Si quieres evitar vendor lock-in**: Usa **Kubernetes** + open source databases (portable entre clouds)

**No existe "el mejor" cloud absoluto, existe "el mejor para TU caso".**