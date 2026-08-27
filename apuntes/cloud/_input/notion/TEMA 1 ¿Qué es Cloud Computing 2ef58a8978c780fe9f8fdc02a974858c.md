# TEMA 1:¿Qué es Cloud Computing?

## ¿Qué es Cloud Computing?

<aside>

**Definición técnica:**
Entrega bajo demanda de recursos computacionales (CPU, RAM, almacenamiento, red) a través de Internet, gestionados por un proveedor externo**(**de Amazon/Google/Microsoft), facturados por uso.

</aside>

<aside>

**Definición práctica (la que importa):**

Cloud Computing es **alquilar infraestructura y servicios de TI por internet** , pagando solo por lo que usas, escalando cuando lo necesitas, sin tener que comprar ni mantener hardware.

</aside>

## Evolución Histórica: El "Dolor" que Resolvió Cada Etapa

```
MAINFRAMES (1960-1980) : Computación centralizada , una sola computadora enorme para todos.
│
├─ Problema: Era cara, acceso limitado(Solo grandes empresas)
└─ Dolor pendiente: ¿Qué pasa si el mainframe falla? Todo cae.

      ↓

SERVIDORES FÍSICOS (1980-2000) : Cada empresa compraba su hardware
│
├─ Problema: "Silo effect". Un servidor al 10% de uso y otro al 90%, y no podían compartir recursos.
│   • Compras un servidor para "picos de tráfico" → 80% del tiempo está infrautilizado
│   • Aprovisionamiento lento (semanas para comprar/instalar hardware)
│   • CapEx alto (pagas todo por adelantado)
└─ Analogía: Es como comprar un bus de 50 asientos para tu familia de 5 personas
             "por si acaso vienen visitas en Navidad"

      ↓

VIRTUALIZACIÓN (2000-2006) : La tecnología clave. Permite dividir un servidor físico en múltiples "máquinas virtuales" (VMs).
│
├─ VMware/Hyper-V permiten múltiples "máquinas virtuales" en un servidor físico
├─ Beneficio: Mejor utilización de hardware (de 15% → 70%)
└─ Dolor pendiente: Todavía tienes que:
    • Comprar el hardware físico (todavia eras dueño del hardware)
    • Mantener el datacenter (electricidad, refrigeración, seguridad)
    • Contratar administradores de sistemas

      ↓

CLOUD COMPUTING (2006-Presente) : Alguien más (AWS, Azure, Google) es dueño del edificio y administra la electricidad/seguridad. Tú solo pagas por la noche que usas.
│
├─ AWS lanza EC2 (2006): "Alquila servidores virtuales por hora"
├─ Solución COMPLETA:
│   ✓ Infraestructura → No compras hardware
│   ✓ Escalabilidad → Añade/quita recursos en minutos
│   ✓ Pago por uso → Solo pagas lo que consumes
│   ✓ Globalización → Deploya en 20 regiones con 3 clics
└─ El "salto cuántico": De pensar en servidores a pensar en servicios
```

<aside>

**On-Premise**

- Comprar servidores → **alto costo inicial**
- Esperar semanas para aprovisionar → **lento**
- Capacidad fija → **o sobra o falta**
- Mantener hardware → **operación compleja**
- Picos de tráfico → **caídas del sistema**
</aside>

## ¿Por Qué Existe la Nube? (El Problema Raíz)

**El dilema del servidor físico:**

Imagina que tienes una tienda online:

- **Black Friday:** Necesitas 100 servidores para manejar el tráfico
- **Resto del año:** Solo necesitas 10 servidores

**Opciones tradicionales (on-premise):**

| Opción | Problema |
| --- | --- |
| Comprar 100 servidores | 90 servidores ociosos 360 días/año = pérdida millonaria |
| Comprar 10 servidores | Tu sitio colapsa en Black Friday = pérdida de ventas |

**Solución Cloud:**

```
Día normal → Pagas por 10 servidores
Black Friday → Escalas automáticamente a 100 servidores (solo esas horas)
Después → Reduces a 10 de nuevo

```

**Resultado:** Pagas 10 servidores/año + picos puntuales. Ahorro del 80-90%.

| Dolor | Solución Cloud |
| --- | --- |
| Infraestructura rígida | Infraestructura elástica |
| Alto CapEx | Modelo OpEx |
| Escalar manualmente | Escalado automático |
| Tiempo de espera | Recursos en minutos |
| Riesgo técnico | Infraestructura industrializada |

## Características Esenciales (NIST)

> Estas son las 5 Caracteristicas que definen si algo es verdaderamente Cloud. Si falta una, no es Cloud.
> 

### 1. On-Demand Self-Service

**"Aprovisionamiento instantáneo sin intervención humana"**

> **Significa**: Tú, como usuario, puedes crear/destruir recursos (servidores, bases de datos, etc.) a través de una consola web o API, sin necesitar que un humano apruebe/configure nada.
> 
- El usuario puede **crear, modificar o eliminar recursos** sin intervención humana del proveedor.

**Ejemplo concreto**

- Creas un servidor en AWS en **2 minutos**
- Nadie de AWS te llama
- Nadie aprueba manualmente

```
ANTES (Datacenter tradicional):
1. Solicitas un servidor al equipo de IT (ticket)
2. Esperas aprobación de gerencia (1-3 días)
3. Equipo de compras adquiere hardware (2-4 semanas)
4. Técnicos instalan/configuran (2-3 días)
Total: 1 mes para tener 1 servidor

CLOUD (AWS/Azure/GCP):
1. Entras a la consola
2. Clicas "Launch Instance"
3. Servidor listo en 60 segundos
```

### 2. Broad Network Access

**"Acceso a los recursos desde cualquier lugar, por red estándar (internet)."**

> **Significa**: Los recursos están disponibles por Internet usando tecnologías estándar (HTTP, SSH, APIs REST), no protocolos propietarios.
> 

**Por qué importa:**
Puedes gestionar tu infraestructura desde:

- Tu laptop en casa
- Un móvil en el aeropuerto
- Un script automatizado (CI/CD pipelines)

No importa si estás en una laptop, móvil o tablet; la API es la misma.

**Ejemplo:**

```python
# Desde cualquier lugar con Internet, puedes ejecutar:
aws ec2 run-instances --image-id ami-12345 --instance-type t2.micro

# Esto crea un servidor en AWS desde tu código
```

### 3. Resource Pooling (Multi-Tenancy)

**"Los recursos del proveedor se comparten entre múltiples clientes, pero cada uno está aislado lógicamente."**

> **Significa**: El proveedor cloud tiene miles de servidores físicos que "agrupa" en un pool. Cuando tú solicitas un servidor virtual, AWS te asigna una "porción" de un servidor físico, pero:
> 
> - **Aislamiento:** Tu VM está aislada de otras VMs en el mismo hardware
> - **Abstracción:** No sabes (ni te importa) en qué servidor físico estás

<aside>

***Abstracción de ubicación:*** Generalmente no sabes en qué rack exacto está tu data, solo la región.

</aside>

**Analogía del Hotel:**

```
Hotel (Datacenter físico de AWS)
├─ Piso 3, habitación 301 → VM de Netflix
├─ Piso 3, habitación 302 → VM de Spotify  } Mismo servidor físico
├─ Piso 3, habitación 303 → Tu aplicación   }
└─ Cada habitación está aislada (no entras a la de Netflix)
```

**Ventaja para el proveedor:**
Si tiene 1000 servidores físicos con capacidad para 10,000 VMs:

- Puede venderle a 10,000 clientes
- Pero como no todos usan el máximo al mismo tiempo, optimiza costos (sobreaprovisionamiento controlado)

**Ventaja para ti:**
Pagas menos porque el costo del hardware se distribuye entre miles de clientes.

### 4. Rapid Elasticity

**"La capacidad de escalar hacia afuera (más máquinas) o hacia adentro (menos máquinas) automáticamente según la demanda."**

> **Significa:** Puedes aumentar/disminuir recursos de forma automática (o manual) en minutos, y para ti parece "ilimitado".
> 

**Ejemplo real: Auto-Scaling de Uber**

```
06:00 AM (Hora pico) → 500 servidores activos
10:00 AM (Baja demanda) → 100 servidores activos
18:00 PM (Hora pico) → 600 servidores activos
02:00 AM (Madrugada) → 50 servidores activos

Uber NO paga por 600 servidores todo el día.
Paga por el promedio ponderado de uso real.
```

**Otro ejemplo**

- Black Friday → tráfico x10 → cloud escala
- Lunes normal → cloud reduce → pagas menos

<aside>

- *Escalabilidad:* Capacidad de crecer.
- *Elasticidad:* Capacidad de crecer **y decrecer** automáticamente (ahorro de costos).
</aside>

### 5. Measured Service (Pay-as-you-go)

**"El uso se monitorea, controla y reporta automáticamente."**

> **Significa:** Pagas exactamente por lo que usas
El proveedor mide automáticamente:
> 
> - Horas de cómputo (por segundo en algunos casos)
> - GB de almacenamiento
> - GB de transferencia de datos
> - Requests a APIs
> 
> Y te cobra exactamente por eso.
> 

**Ejemplo comparativo:**

| Métrica | Costo AWS (ejemplo) |
| --- | --- |
| 1 servidor t3.micro ejecutándose 720 horas/mes | $7.50/mes |
| El mismo servidor ejecutándose 100 horas/mes | $1.04/mes |
| 50 GB en S3 (almacenamiento) | $1.15/mes |
| 10,000 requests a Lambda | $0.20 |

**Analogía de la Electricidad:** No pagas una tarifa fija de $500/mes "por tener acceso a electricidad". Pagas por los kWh que consumes. Si te vas de vacaciones y apagas todo, pagas casi $0.

<aside>

Cloud **no es barato por defecto**, es **optimizable**.
AWS mide hasta el segundo. Si enciendes un servidor a las 14:30:00 y lo apagas a las 14:35:00, pagas por 5 minutos (no por 1 hora completa).

</aside>

## VENTAJAS: Por Qué Migrar a Cloud?

- **Escalabilidad Horizontal Automática:**
    
    ANTES: Colapso del servidor → Pérdida de clientes
    AHORA: Auto-scaling añade 50 servidores en 3 minutos → App sigue funcionando
    
- **Velocidad de deployment:** De idea a implementación en minutos, no meses.
- **Economía de Escala:** AWS compra millones de servidores, por lo que consigue precios que tú nunca podrías igualar.
- **Alcance Global:** Puedes desplegar tu app en Japón, Alemania y Brasil con dos clics (baja latencia para el usuario final).
- **CapEx → OpEx (Flexibilidad Financiera)**

## DESVENTAJAS (Los "Dolores" de Cloud)

### 1. **Vendor Lock-In**

**El problema:** Si construyes toda tu arquitectura usando servicios propietarios de un proveedor (ej. bases de datos que solo existen en AWS), migrar a otro lado es doloroso y costoso.

**Consecuencia:**

```
AÑO 1: AWS te cobra $10,000/mes
AÑO 3: AWS sube precios a $18,000/mes
Tu opción: Pagar o migrar (6-12 meses de trabajo de ingeniería)
```

**Ejemplo real:**

- **Dropbox** migró FUERA de AWS en 2016 (tardaron 2 años, pero ahorraron $75M en 2 años)

**Mitigación:**
Usar tecnologías open-source cuando sea posible:

- Kubernetes (portátil entre clouds)
- PostgreSQL (vs DynamoDB propietaria)
- Kafka (vs AWS Kinesis propietaria)

### 2. **Latencia y Dependencia de Internet**

> **Problema:** Para sistemas de tiempo real crítico (ej. cirugía robótica remota o fábricas automatizadas), la ida y vuelta a la nube puede ser lenta.
> 

```
DATACENTER PROPIO: Tu servidor está a 2ms de tu oficina
CLOUD: Tu servidor puede estar a 150ms (si elegiste región lejana)
```

**Casos donde esto MATA tu producto:**

- Trading de alta frecuencia (cada ms = $$$)
- Aplicaciones industriales en fábricas (si cae Internet, producción se detiene)

### 3. **Costos Impredecibles (Si No Se Gestiona Bien)**

> **Problema:** Es fácil prender recursos y olvidar apagarlos. La factura puede ser una sorpresa desagradable si no hay gobernanza.
> 

```
HISTORIA REAL: Startup deja API pública sin rate limiting
→ Bot hace 50 millones de requests en 1 fin de semana
→ Factura de AWS: $72,000 (vs $500 habitual)

```

**Solución:**

- Establecer "Budgets" y alertas en AWS
- Implementar **rate limiting**
- Usar "Reserved Instances" para cargas predecibles

### 4. **Compliance y Soberanía de Datos**

**El problema legal:**

- GDPR (Europa): Datos de ciudadanos europeos deben estar en Europa
- China: Datos de ciudadanos chinos deben estar en servidores chinos
- Healthcare (HIPAA): Datos médicos tienen requisitos estrictos

**Ejemplo:**

```
Tu app de salud almacena datos en AWS us-east-1 (Virginia)
→ Cliente alemán pregunta: "¿Mis datos están en Europa?"
→ Respuesta: No → Cliente rechaza tu servicio por incumplimiento GDPR

```

**Solución:**
Usar regiones específicas (ej: AWS eu-central-1 en Frankfurt para clientes europeos)

## CUÁNDO **NO** USAR CLOUD (Casos Específicos)

- **Sistemas Legacy Monolíticos:** Apps antiguas que no pueden escalarse y requieren hardware muy específico (ej. mainframes viejos). Moverlas a la nube sin refactorizar ("Lift and Shift") suele salir más caro.
- **Regulaciones Extremas:** Datos de defensa nacional o bancarios que, por ley, no pueden salir de premisas físicas específicas (aunque esto está cambiando con nubes gubernamentales).
- **Cargas de trabajo predecibles y masivas:** Si sabes *exactamente* cuánto cómputo necesitas 24/7 por 5 años (ej. Dropbox en sus inicios), comprar tu propio hardware puede ser más barato a largo plazo.

| Escenario | Por qué NO cloud | Alternativa |
| --- | --- | --- |
| **Cargas de trabajo 24/7 estables** | Servidor cloud 24/7 = $7,000/año. Servidor propio = $2,000 inicial + $500/año electricidad | Comprar hardware propio (ROI en 2 años) |
| **Aplicaciones legacy no cloud-friendly** | App monolítica de 1995 que requiere hardware específico | Mantener on-premise hasta rediseño |
| **Industrias con regulación ultra-estricta** | Bancos centrales, defensa militar (datos clasificados) | Datacenter privado con certificaciones gubernamentales |
| **Ultra-baja latencia crítica** | Trading algorítmico (requiere <1ms) | Servidores físicos junto a la bolsa de valores |
| **Presupuesto limitado con carga predecible** | ONG pequeña con tráfico constante y sin picos | Servidor dedicado o VPS de bajo costo |

## MODELO DE COSTOS: CapEx vs OpEx

> Para un CFO (Director Financiero), el dinero tiene dos formas de salir de la empresa. Entender cuál usar define si una startup sobrevive o si una corporación se estanca.
> 
- **La diferencia entre comprar infraestructura y consumir infraestructura.**

### **CapEx (Capital Expenditure - Gastos de Capital)**

- **Definición:** Es el dinero que gastas por adelantado en infraestructura física. Es una **inversión a largo plazo**.
- **El Modelo Tradicional (On-Premise):** Compras servidores, routers, aire acondicionado y construyes el data center *antes* de tener clientes.
- **Contabilidad:**
    - No puedes deducir el gasto total de los impuestos ese año.
    - El hardware se convierte en un **Activo** que se **deprecia** durante 3 a 5 años.

```tsx
Compras servidores
↓
Pagas todo al inicio
↓
Infraestructura fija
↓
Uso constante (aunque no se necesite)
↓
Depreciación(3-5 años)
```

- **El Dolor:** Rigidez. Si gastas $100k en servidores y tu app fracasa, te quedas con $100k de metal inútil. Si tienes éxito masivo, tardas semanas en comprar más.
    - **Sobre-dimensionas** (“por si crecemos”)
    - Capital inmovilizado
    - Difícil reaccionar a cambios

### **OpEx (Operational Expenditure - Gastos Operativos)**

- **Definición:** Es el dinero que gastas en el día a día para operar el negocio
    - Pagas por **uso real**, no por posesión.
- **El Modelo Cloud:** No compras nada. Alquilas potencia de cómputo y almacenamiento.
- **El Beneficio:** Agilidad. Pagas por lo que usas. Si la app fracasa, apagas los servidores y el costo baja a cero.

```tsx
Usas recursos
↓
Pagas mensual
↓
Ajustas según demanda
↓
Costo variable
```

### Comparativa Estratégica

| **Característica** | **CapEx (On-Premise)** | **OpEx (Cloud Computing)** |
| --- | --- | --- |
| **Flujo de Caja** | **Pago enorme inicial.** Afecta la liquidez de la empresa. | **Pago recurrente.** Paga según consumes (Pay-as-you-go). |
| **Tiempo** | Lento. Semanas/Meses para adquirir e instalar. | Inmediato. Minutos para desplegar recursos. |
| **Riesgo** | Alto. Adivinas la demanda futura. | Bajo. Ajustas el gasto a la demanda real. |
| **Mantenimiento** | Tú eres responsable (parches, cables, luz). | El proveedor (AWS/Azure) es responsable. |
| **Obsolescencia** | Tu hardware se vuelve viejo y lento. | Siempre accedes a la tecnología más nueva. |

<aside>

### Analogía : El Transporte

- **CapEx (Comprar un Auto):** Pagas $20,000 de golpe. El auto es tuyo (activo). Tienes que pagar seguro, llantas y mecánico (mantenimiento). Si dejas de usarlo, el dinero ya se gastó y el auto pierde valor cada día (depreciación).
- **OpEx (Usar Uber/Cabify):** No pagas nada inicial. Si necesitas ir lejos, pagas más. Si no sales de casa, pagas $0. No te importa si el auto necesita aceite.
</aside>

### Impacto en decisiones de negocio

**¿Cuándo gana OpEx (Cloud)? (El 80% de los casos)**

- **Startups y Nuevos Proyectos:** No tienes $50k para servidores. Necesitas probar el mercado rápido y barato ("Fail fast").
- **Demanda Variable:** Un e-commerce en Black Friday. Necesitas 100 servidores hoy y solo 2 mañana. OpEx permite esa elasticidad.
- **Innovación Rápida:** Quieres probar Inteligencia Artificial. En CapEx tendrías que comprar GPUs carísimas. En OpEx las alquilas por hora.

**¿Cuándo gana CapEx? (El 20% restante)**

- **Cargas de trabajo estables y masivas:** Si eres Dropbox o Facebook y sabes *exactamente* cuántos petabytes necesitas por los próximos 5 años, comprar tu propio hardware es más barato a largo plazo que alquilarlo.
- **Control Total:** Requisitos legales donde NADIE más puede tocar tu infraestructura física.

```
┌─────────────────────────────────────────────────────┐
│ ¿Tu carga de trabajo es PREDECIBLE y CONSTANTE?    │
└────────────┬────────────────────────┬───────────────┘
             │                        │
            SÍ                       NO
             │                        │
             ▼                        ▼
    ┌─────────────────┐      ┌──────────────────┐
    │ Análisis TCO:   │      │  CLOUD (OpEx)    │
    │ CapEx 3 años vs │      │  ES LA MEJOR     │
    │ OpEx 3 años     │      │  OPCIÓN          │
    └────────┬────────┘      └──────────────────┘
             │
             ▼
      ¿CapEx < OpEx?
             │
        ┌────┴─────┐
       SÍ          NO
        │           │
        ▼           ▼
   ON-PREMISE    CLOUD

```