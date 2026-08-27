---
tipo: silabo-externo
curso: "[Español] AWS Certified Developer Associate DVA-C02"
instructor: Joan Amengual
plataforma: Udemy
duracion_total: 39h 33min
duracion_filtrada: ~14h 04min
clases: 473
secciones: 34
valoracion: 4.8 (1578 valoraciones, 10264 estudiantes)
capturado: 2026-08-20
granularidad: clase individual (sílabo completo)
---

# 📼 Sílabo filtrado — Curso AWS DVA-C02

> **39h 33min → 14h 04min.** A 1.5x, unas **9h 20min**. Un tercio del curso.

> ⚠️ **Esto no es la ruta de estudio.** El temario de nube nivel 2 manda; este archivo solo dice qué clase alimenta qué bloque. El curso se consume salteado.

**Requisitos del curso:** fundamentos de programación (funciones, variables de entorno, CLI, JSON). **No requiere experiencia previa en AWS.**

**Leyenda:** ✅ ver · ⭐ prioritaria · ⬜ saltar

---

## S1 — Introducción · `6 de 13 min`

| ✅ | Creando una cuenta de AWS - Práctica | 4:28 |
| ✅ | POR FAVOR, LEE: Clases que puedes saltarte | 1:24 |

⬜ Introducción al curso · Sobre tu instructor · Accede a la comunidad *(3 clases, 7 min)*

## S2 — Descarga de código · `4 seg`
✅ Descargar diapositivas. Sirven de referencia visual permanente.

## S3 — Introducción a AWS · `22 de 22 min` — **ver entera**

| ✅ | Visión general de la Cloud de AWS | 3:24 |
| ✅ | Infraestructura global - Regiones y AZ | 8:50 |
| ✅ | Recorrido por la consola y los servicios | 7:38 |
| ✅ | Acerca de los cambios en la UI | 1:55 |

## S4 — IAM y CLI · `44 de 76 min` → *bloque 5*

| ✅ | Introducción a IAM: Usuarios, Grupos, Políticas | 4:08 |
| ✅ | Usuarios y Grupos de IAM - Práctica | 5:10 |
| ✅ | Acceso como usuario IAM - Práctica | 4:14 |
| ✅ | Políticas IAM | 4:04 |
| ✅ | Políticas IAM - Práctica | 4:05 |
| ✅ | Claves de acceso de AWS, CLI y SDK | 4:15 |
| ✅ | Configuración de la CLI de AWS en Windows | 2:02 |
| ✅ | Práctica de la CLI de AWS | 4:56 |
| ⭐ | **Roles de IAM para los servicios de AWS** | 1:40 |
| ⭐ | **Roles de IAM - Práctica** | 2:48 |
| ✅ | Buenas prácticas de IAM | 2:19 |
| ✅ | Modelo de responsabilidad compartida | 1:48 |
| ✅ | Resumen de IAM | 2:01 |

⬜ Múltiples grupos · MFA (2) · CLI Mac · CLI Linux · CloudShell · Herramientas de seguridad (2) *(8 clases, 32 min)*

## S5 — Fundamentos de EC2 · `54 de 111 min` → *bloques 2, 5, 7*

| ⭐ | **Configuración de AWS Budgets** ← *bloque 7, escondido aquí* | 9:42 |
| ✅ | Fundamentos de EC2 | 5:23 |
| ✅ | Crear una Instancia EC2 con datos de usuario - Práctica | 15:26 |
| ⭐ | **Grupos de seguridad y puertos clásicos** ← *reaparece en Lambda, RDS, ECS* | 9:35 |
| ⭐ | **Grupos de Seguridad - Práctica** | 8:34 |
| ✅ | Demostración de roles de instancias EC2 | 5:43 |

⬜ Tipos de instancias · SSH (5 clases) · Conexión de instancias · Opciones de compra *(8 clases, 57 min)*

## S6 — Almacenamiento EC2 · `0 de 74 min` — **saltar entera**
EBS, snapshots, AMI, EFS. Infraestructura nivel 3.

## S7 — ELB + ASG · `42 de 106 min` → *bloque 4 + prerequisito de S16*

| ✅ | Alta disponibilidad y escalabilidad | 6:27 |
| ✅ | Visión general del Elastic Load Balancing | 8:58 |
| ⭐ | **Application Load Balancer (ALB)** | 7:41 |
| ✅ | ALB - Práctica - Parte 1 | 10:29 |
| ✅ | Certificados SSL/TLS | 6:16 |
| ✅ | Certificados SSL/TLS - Práctica | 2:12 |

⬜ ALB Práctica 2 · NLB (2) · GWLB · Sticky Sessions · Balanceo entre zonas · Drenaje · **todo ASG (5)** · Limpieza *(14 clases, 64 min)*

## S8 — RDS + Aurora + ElastiCache · `33 de 84 min` → *bloque 3*

| ✅ | Visión general de Amazon RDS | 4:37 |
| ✅ | Amazon RDS - Práctica | 15:37 |
| ✅ | Seguridad de RDS y Aurora | 2:26 |
| ⭐ | **RDS Proxy** ← *el pooling de Prisma + serverless* | 3:07 |
| ✅ | Visión general de ElastiCache | 6:52 |

⬜ Réplicas vs Multi-AZ · RDS Oracle/SQL Server · Aurora (2) · ElastiCache Práctica · Estrategias · MemoryDB *(7 clases, 51 min)*

## S9 — Route 53 · `44 de 105 min` → *bloque 4*

| ✅ | ¿Qué es un DNS? | 7:42 |
| ✅ | Visión general de Route 53 | 9:26 |
| ✅ | Registro de un dominio | 3:11 |
| ✅ | Creación de nuestros primeros registros | 3:46 |
| ✅ | Route 53 - TTL | 8:40 |
| ✅ | CNAME vs Alias | 9:21 |
| ✅ | Dominios de terceros y Route 53 | 2:20 |

⬜ Configuración EC2 · **todas las políticas de enrutamiento (9)** · Controles de salud (2) · Limpieza *(12 clases, 61 min)*

## S10 — Fundamentos de VPC · `27 de 27 min` — **ver entera**
> Seguro barato: security groups y subredes reaparecen en Lambda, RDS y ECS.

| ✅ | Introducción a la sección | 1:44 |
| ✅ | VPC, subredes, IGW y NAT | 5:57 |
| ⭐ | **NACL, Grupos de seguridad, Logs de flujo** | 7:12 |
| ✅ | VPC Peering, Endpoints, VPN, Direct Connect | 4:42 |
| ✅ | Comentarios finales sobre la VPC | 3:00 |
| ✅ | Arquitectura de tres niveles | 4:18 |

## S11 — Amazon S3 · `29 de 71 min` → *bloque 3*

| ✅ | Visión general de S3 | 7:07 |
| ✅ | S3 - Práctica | 6:48 |
| ✅ | Seguridad en S3: Política de bucket | 7:27 |
| ✅ | Política de Bucket - Práctica | 5:36 |
| ✅ | Versionado de S3 | 2:05 |

⬜ Sitio web (2) · Versionado Práctica · Replicación (3) · Clases de almacenamiento (2) *(8 clases, 42 min)*

## S12 — CLI, SDK, roles y políticas · `18 de 37 min` → *bloque 5*

| ✅ | Perfiles de la CLI de AWS | 4:22 |
| ⭐ | **Visión general del SDK de AWS** | 1:45 |
| ⭐ | **Backoff exponencial y aumento del límite** ← *reintentos de LLM* | 5:47 |
| ⭐ | **Proveedor y cadena de credenciales de AWS** | 5:47 |

⬜ Ejecución en seco · Descifrar STS · Metadatos EC2 · CLI con MFA · Signature v4 *(5 clases, 19 min)*

## S13 — S3 Avanzado · `11 de 33 min`

| ✅ | Notificaciones de eventos S3 | 3:15 |
| ✅ | Notificaciones de eventos S3 - Práctica | 7:43 |

⬜ Ciclo de vida (2) · Rendimiento · S3 Select · Etiquetas *(5 clases, 22 min)*

## S14 — Seguridad de S3 · `32 de 62 min` → *bloques 3, 4*

| ✅ | Cifrado S3 | 6:57 |
| ✅ | Cifrado S3 por defecto | 1:42 |
| ⭐ | **S3 CORS** | 6:59 |
| ⭐ | **S3 CORS - Práctica** | 11:53 |
| ⭐ | **URLs pre-firmadas de S3** ← *servir archivos privados* | 1:43 |
| ⭐ | **URLs pre-firmadas - Práctica** | 3:09 |

⬜ Cifrado Práctica · MFA Delete (2) · Access Logs (2) · Puntos de acceso · Objeto S3 Lambda *(7 clases, 30 min)*

## S15 — CloudFront · `19 de 59 min` → *bloque 4*

| ✅ | CloudFront - Visión general | 9:38 |
| ✅ | CloudFront - Práctica | 6:44 |
| ✅ | Invalidaciones - Práctica | 2:48 |

⬜ Políticas de caché · Comportamientos · Invalidaciones · ALB como origen · Restricción geográfica · URL firmada (2) · Avanzados · Logs *(9 clases, 40 min)*

## S16 — ECS, ECR y Fargate ⭐ · `69 de 111 min` → *bloque 2*
> **La sección más valiosa del curso para ti.** Docker en serio.

| ⭐ | **Introducción a Docker** | 9:58 |
| ✅ | Amazon ECS | 7:58 |
| ✅ | IMPORTANTE: CAMBIOS EN LA UI DE ECS | 0:10 |
| ✅ | Creación de Cluster ECS - Práctica | 6:38 |
| ⭐ | **Creación del servicio ECS - Práctica** | 16:18 |
| ✅ | Amazon ECS - Actualizaciones continuas | 4:26 |
| ✅ | Definiciones de tareas - Inmersión profunda | 12:14 |
| ✅ | Definiciones de tareas - Práctica | 6:53 |
| ⭐ | **Amazon ECR** | 1:51 |
| ⭐ | **Amazon ECR - Práctica** | 7:53 |

⬜ Autoescalado · Arquitecturas · Colocación de tareas · Copilot (2) · EKS *(6 clases, 42 min)*

## S17 — Elastic Beanstalk · `0 de 81 min` — **saltar entera**
PaaS en declive. Vercel/Railway hacen lo mismo mejor.

## S18 — CloudFormation · `0 de 66 min` — **saltar entera**
IaC. Solo importaría si vieras SAM o CDK, que también se saltan.

## S19 — Monitorización · `50 de 110 min` → *bloque 6*

| ✅ | Introducción a la sección | 0:40 |
| ✅ | Visión general de la monitorización | 2:56 |
| ✅ | Métricas de CloudWatch | 3:21 |
| ⭐ | **Logs de CloudWatch** | 6:07 |
| ⭐ | **CloudWatch Logs - Práctica** | 7:46 |
| ✅ | Alarmas de CloudWatch | 4:43 |
| ✅ | Alarmas de CloudWatch - Práctica | 7:15 |
| ✅ | Amazon EventBridge | 8:09 |
| ✅ | Visión general de X-Ray | 6:07 |
| ✅ | CloudTrail vs CloudWatch vs X-Ray | 1:22 |

⬜ Métricas personalizadas · Agente · Filtros (2) · Synthetics · EventBridge Práctica (2) · X-Ray detalle (4) · CloudTrail (2) *(14 clases, 60 min)*

## S20 — SQS, SNS, Kinesis · `70 de 144 min` → *bloque 8*

| ✅ | Introducción a la sección | 1:03 |
| ✅ | Introducción a la mensajería | 1:53 |
| ✅ | SQS - Visión general de las colas estándar | 10:48 |
| ✅ | SQS - Práctica de colas estándar | 9:26 |
| ✅ | SQS - Tiempo de espera de visibilidad | 4:53 |
| ⭐ | **SQS - Colas de Mensajes Fallidos (DLQ)** ← *reintentos de LLM* | 2:42 |
| ⭐ | **SQS - DLQ - Práctica** | 3:52 |
| ✅ | SQS - Colas de espera / retraso | 2:24 |
| ✅ | SQS - Colas FIFO | 4:16 |
| ✅ | Amazon SNS | 5:22 |
| ⭐ | **SNS y SQS - Patrón Fan Out** | 8:44 |
| ✅ | SNS - Práctica | 3:52 |
| ✅ | SQS vs SNS vs Kinesis | 2:53 |

⬜ Política de acceso · Conceptos de Certified Developer · FIFO Avanzado · **todo Kinesis (10)** *(13 clases, 74 min)*

## S21 — Lambda · `95 de 196 min` → *bloque 2*

| ✅ | Introducción a la sección · Introducción a Serverless | 2:49 |
| ✅ | Visión general de AWS Lambda | 5:49 |
| ✅ | AWS Lambda - Práctica | 8:05 |
| ✅ | Invocaciones síncronas + Práctica | 7:16 |
| ⭐ | **Invocaciones asíncronas de Lambda y DLQ** | 3:36 |
| ✅ | Invocaciones asíncronas - Práctica | 8:28 |
| ✅ | Lambda y CloudWatch Events / EventBridge | 0:47 |
| ✅ | Notificaciones de eventos de Lambda y S3 | 2:46 |
| ✅ | Mapeo de fuentes de eventos de Lambda | 6:27 |
| ⭐ | **Mapeo de fuentes de eventos (SQS) - Práctica** | 7:07 |
| ✅ | Objetos de evento y de contexto | 3:44 |
| ✅ | Permisos Lambda - Roles IAM + Práctica | 6:07 |
| ⭐ | **Variables de entorno Lambda + Práctica** | 3:14 |
| ✅ | Lambda en VPC | 4:22 |
| ⭐ | **Rendimiento de la función Lambda** ← *timeouts, crítico para LLM* | 4:56 |
| ✅ | Capas Lambda | 1:15 |
| ✅ | Concurrencia Lambda | 4:40 |
| ✅ | Dependencias externas + Práctica | 9:53 |
| ✅ | Imágenes de contenedores Lambda | 4:45 |
| ✅ | URL de la función lambda | 5:45 |
| ⭐ | **Límites de Lambda** | 2:19 |
| ✅ | Buenas prácticas de Lambda | 1:23 |

⬜ ALB (2) · EventBridge Práctica · S3 Práctica · Destinos (2) · Monitorización (2) · Lambda@Edge · VPC Práctica · Rendimiento Práctica · Capas Práctica · Sistemas de archivos · Concurrencia Práctica · CloudFormation (2) · Versiones y alias (2) · CodeDeploy · URL Práctica · CodeGuru *(21 clases, 101 min)*

## S22 — DynamoDB · `19 de 122 min` — **solo la intro**
> No usas DynamoDB (usas Postgres/Mongo). Solo lo mínimo para seguir las demos de Lambda.

| ✅ | Introducción a la sección | 0:48 |
| ✅ | Visión general de DynamoDB | 9:04 |
| ✅ | Conceptos básicos - Práctica | 8:45 |

⬜ Las otras 22 clases *(103 min)*

## S23 — API Gateway · `53 de 108 min` → *bloques 2, 4*

| ✅ | Introducción a la sección | 1:01 |
| ✅ | Visión general de API Gateway | 8:45 |
| ✅ | Visión general - Práctica | 11:11 |
| ✅ | Etapas y despliegue | 4:43 |
| ✅ | Planes de uso y claves de API Gateway | 9:05 |
| ✅ | Supervisión, logs y seguimiento | 6:10 |
| ⭐ | **API Gateway CORS - Práctica** | 9:29 |
| ✅ | Autenticación y autorización | 7:58 |
| ✅ | HTTP API vs REST API | 1:04 |
| ⭐ | **Websocket API** ← *streaming de respuestas* | 5:21 |
| ✅ | API Gateway - Arquitectura | 1:15 |

⬜ Etapas Práctica (2) · Canary (2) · Integración y mapeos (2) · Open API (2) · Caché · Websocket Práctica *(10 clases, 55 min)*

## S24 — AWS CICD · `29 de 137 min` → *bloque 6*
> Solo los **conceptos**. Las herramientas son AWS-nativas; tú usarás GitHub Actions.

| ⭐ | **Introducción a CICD en AWS** | 8:22 |
| ✅ | Visión general de CodePipeline | 4:18 |
| ✅ | Visión general de CodeBuild | 6:25 |
| ✅ | Visión general de CodeDeploy | 9:51 |

⬜ CodeCommit (3) · Prácticas (5) · Extras (3) · CodeStar (2) · CodeArtifact (3) · CodeGuru (2) · Cloud9 (2) *(21 clases, 108 min)*

## S25 — SAM · `0 de 70 min` — **saltar entera**
## S26 — CDK · `0 de 30 min` — **saltar entera**

## S27 — Cognito · `10 de 46 min` — **solo la intro**
> Usas NextAuth. Solo el vocabulario para no perderte en S23.

| ✅ | Visión general de Cognito | 2:11 |
| ✅ | Cognito User Pools | 3:29 |
| ✅ | User Pools vs Identity Pools | 3:54 |

## S28 — Step Functions y AppSync · `7 de 69 min`

| ✅ | Visión general de Step Functions ← *orquestación, roza tu terreno de agentes* | 6:47 |

⬜ El resto *(10 clases, 62 min)*

## S29 — Identidad avanzada · `0 de 25 min` — **saltar entera**

## S30 — Seguridad: KMS y SSM · `50 de 116 min` → *bloque 5*

| ✅ | Introducción a la sección | 0:34 |
| ✅ | Cifrado 101 | 6:28 |
| ✅ | Visión general de KMS | 9:58 |
| ⭐ | **Visión general del almacén de parámetros SSM** | 5:44 |
| ✅ | SSM Parameter Store (CLI) - Práctica | 8:30 |
| ⭐ | **SSM Parameter Store (Lambda) - Práctica** | 8:29 |
| ⭐ | **Visión general de Secrets Manager** | 2:01 |
| ✅ | Secrets Manager - Práctica | 6:16 |
| ⭐ | **SSM Parameter Store vs Secrets Manager** | 2:00 |

⬜ KMS detalle (7) · CloudHSM · Secrets+CFN · Cifrado logs · Seguridad CodeBuild · Nitro *(12 clases, 66 min)*

## S31 — Otros servicios · `9 de 31 min`

| ✅ | Amazon Certificate Manager (ACM) | 1:57 |
| ✅ | ACM - Práctica | 7:22 |

⬜ SES · OpenSearch · Athena · MSK · Private CA · Macie · AppConfig *(8 clases, 22 min)*

## S32 — Limpieza final · `2 de 2 min` — **ver entera**
> No opcional. Es lo que evita que te llegue una factura sorpresa.

## S33 — Preparación para el examen · `0 de 28 min` — **saltar entera**
## S34 — Enhorabuena · `0 de 3 min` — **saltar entera**

---

## Cobertura vs. el temario de nube nivel 2

| Bloque | Secciones que lo alimentan | Estado |
|---|---|---|
| 1. Modelo mental y facturación | S3, S4 *(responsabilidad compartida)*, S5 *(Budgets)* | ✅ |
| 2. Cómputo y Docker | **S16**, S21, S23, S5 | ✅ Fuerte — ~4h |
| 3. Datos, pooling, storage | S8 *(RDS Proxy)*, S11, S14 | ✅ |
| 4. Redes mínimas | S10, S9, S7 *(ALB, SSL)*, S14 *(CORS)*, S15, S31 *(ACM)* | ✅ |
| 5. Identidad y secretos | S4, S12, **S30** | ✅ Fuerte |
| 6. Despliegue, CI/CD, logs | S19, S24 *(solo conceptos)* | 🔶 Falta GitHub Actions |
| 7. Costos | S5 *(Budgets)*, S32 *(limpieza)* | 🔶 La herramienta, no el criterio |
| 8. Async para apps con IA | **S20** *(SQS/SNS/DLQ)*, S21 *(async, timeouts)*, S23 *(Websocket)* | ✅ Mejor de lo esperado |

## Huecos que quedan para el sistema

- **Criterio de estimación de costos** — el curso da AWS Budgets pero no enseña a estimar antes de desplegar, ni costo por llamada a LLM
- **CI/CD con GitHub Actions** — el curso usa CodePipeline. Los conceptos transfieren, la práctica no
- **El patrón async para LLM** — el curso da SQS/DLQ como servicio; falta el *por qué* (respuesta que no cabe en un request, streaming, jobs)
- **Connection pooling con Prisma** — el curso menciona RDS Proxy pero no el problema concreto de Prisma en serverless

---

## Notas

- **Ruta de arranque sugerida:** S3 → S4 → S5 → S10 → S11 → **S16** → S21 → S23 → S8 → S30 → S19 → S20 → S7 → S9 → S12 → S14 → S15 → S24 → S32
- **Las 4 secciones que se saltan enteras:** S6 (almacenamiento EC2), S17 (Beanstalk), S18 (CloudFormation), S25/S26 (SAM/CDK), S29 (identidad avanzada). Suman **~5h 46min** de puro nivel 3.
- **Los cuestionarios de cada sección** no cuentan en la duración y sí conviene hacerlos — son gratis y calibran.
- El curso está organizado **por servicio**, no por proyecto. El temario reordena eso.
