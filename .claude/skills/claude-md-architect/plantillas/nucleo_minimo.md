# Plantilla: Núcleo mínimo de CLAUDE.md

> Plantilla base para crear un CLAUDE.md desde cero. Reemplazar los `[placeholders]` con la información del proyecto. **Meta: bajo 100 líneas.**

> **Importante:** los ejemplos de abajo son ilustrativos del **patrón** (los 4 bloques, el filtro de universalidad, el estilo de redacción), no del **stack**. La skill aplica a cualquier tipo de proyecto: web, backend, CLI, library, data pipeline, mobile, infra-as-code, etc. Adaptar los placeholders a las tecnologías reales del proyecto del usuario.

---

```markdown
# [Nombre del proyecto]

[Una oración descriptiva de qué hace el proyecto. Concreta, no marketing.]

**Stack:** [Lista en una línea — lenguajes, framework, base de datos, libs clave.]

## Mapa del repo

- `[carpeta_1]/` — [Para qué sirve, una línea.]
- `[carpeta_2]/` — [Para qué sirve.]
- `[carpeta_3]/` — [Para qué sirve.]
- `[archivo_clave]` — [Para qué sirve si es un archivo único importante.]

## Comandos

- `[comando_dev]` — [Qué hace.]
- `[comando_test]` — [Qué hace.]
- `[comando_lint]` — [Qué hace, cuándo correrlo.]
- `[comando_typecheck]` — [Qué hace.]
- `[comando_build]` — [Qué hace.]

## No ejecutar automáticamente

- `[comando_que_no_va]` — [Por qué el usuario lo maneja manualmente.]

## Decisiones de diseño

- **[Decisión 1].** Razón: [por qué se eligió esto, en una oración.]
- **[Decisión 2].** Razón: [por qué.]
```

---

## Ejemplos reales aplicados a distintos tipos de proyecto

### Ejemplo A: Proyecto web típico (Next.js + Prisma)

```markdown
# Min-Commerce

E-commerce con carrito persistente, auth con Google y panel admin con estadísticas.

**Stack:** Next.js 15 + TypeScript + PostgreSQL + Prisma + NextAuth + Zustand.

## Mapa del repo

- `src/app/` — Rutas de Next.js (App Router).
- `src/components/` — Componentes React reutilizables.
- `src/lib/` — Lógica de negocio y helpers.
- `src/lib/db/` — Capa de acceso a datos vía Prisma.
- `prisma/` — Schema y migraciones de la base de datos.
- `src/types/` — Tipos compartidos del proyecto.

## Comandos

- `pnpm dev` — Levanta el servidor de desarrollo.
- `pnpm test` — Corre los tests con Vitest.
- `pnpm lint` — Valida con ESLint (corre después de cualquier cambio).
- `pnpm typecheck` — Valida tipos de TypeScript.
- `pnpm build` — Build de producción.

## Decisiones de diseño

- **Carrito en Zustand + localStorage**, no en base de datos. Razón: queremos que sobreviva al refresh sin requerir sesión activa.
- **Auth solo con Google**, no se acepta email/password. Razón: simplifica seguridad y el público objetivo ya está en Google.
```

### Ejemplo B: Backend Python con API REST

```markdown
# OrderService

Microservicio de gestión de órdenes: recibe pedidos del frontend, procesa pagos via Stripe, encola eventos a Kafka.

**Stack:** Python 3.12 + FastAPI + PostgreSQL + SQLAlchemy + Alembic + Stripe SDK + confluent-kafka.

## Mapa del repo

- `app/api/` — Endpoints FastAPI (routers organizados por dominio).
- `app/services/` — Lógica de negocio (procesamiento de órdenes, pagos).
- `app/models/` — Modelos SQLAlchemy + schemas Pydantic.
- `app/events/` — Productores y consumidores de Kafka.
- `alembic/` — Migraciones de base de datos.
- `tests/` — Tests con pytest.

## Comandos

- `uvicorn app.main:app --reload` — Servidor de desarrollo (lo levanta el usuario).
- `pytest` — Corre tests.
- `ruff check .` — Linter.
- `mypy app/` — Type check estricto.
- `alembic upgrade head` — Aplica migraciones pendientes en dev.

## No ejecutar automáticamente

- `alembic upgrade` en staging/prod — Requiere coordinación con infra.
- Cualquier comando que toque Stripe en modo live — Solo modo test.

## Decisiones de diseño

- **Eventos via Kafka, no llamadas síncronas entre servicios.** Razón: aislamiento de fallas; si el servicio downstream cae, los eventos quedan en el topic.
- **Stripe como única pasarela.** Razón: simplifica compliance PCI; otras pasarelas se evaluarán solo si entramos a mercados donde Stripe no opera.
```

### Ejemplo C: CLI tool en Go

```markdown
# datasync

CLI para sincronizar datasets entre buckets S3 con verificación de checksums y reintento exponencial.

**Stack:** Go 1.22 + cobra (CLI) + aws-sdk-go-v2 + zerolog.

## Mapa del repo

- `cmd/datasync/` — Entry point del binario y registro de subcomandos.
- `internal/sync/` — Lógica de sincronización (núcleo del programa).
- `internal/checksum/` — Cálculo y verificación de hashes.
- `internal/retry/` — Política de reintentos con backoff.
- `pkg/` — Paquetes públicos reutilizables.
- `testdata/` — Fixtures para tests.

## Comandos

- `go build -o datasync ./cmd/datasync` — Compila el binario.
- `go test ./...` — Corre tests.
- `golangci-lint run` — Linter.
- `go vet ./...` — Verificación estática.

## Decisiones de diseño

- **`internal/` para todo lo no público.** Razón: previene que código de cliente importe internals; convención estándar de Go.
- **zerolog sobre log estándar.** Razón: logs estructurados JSON facilitan ingestión por Datadog en producción.
```

---

## Filtro a aplicar en cada línea

Antes de escribir una línea en el archivo, pasarla por este filtro:

| Pregunta | Si la respuesta es | Acción |
|---|---|---|
| ¿Esto sirve para onboardear al agente en cualquier sesión futura? | **No** | No entra. |
| ¿Esto se puede descubrir leyendo el código? | **Sí** | Considerar si entra o si es mejor dejar que el agente lo descubra. Solo entra si es muy costoso de descubrir. |
| ¿Esto es un fix puntual o decisión de un sprint pasado? | **Sí** | No entra. Es bitácora. |
| ¿Esto es una regla de estilo de código (indentación, comillas, naming)? | **Sí** | No entra. Va a linter + hook. |
| ¿Esto cambia cada semana? | **Sí** | No entra. CLAUDE.md es estable. |

---

## Reglas de formato

- **Sin emojis** dentro del archivo (a menos que el equipo los use por convención).
- **Sin preámbulo** ("este es el archivo CLAUDE.md de...").
- **Sin sección final** de "Conclusión" / "Notas finales" / "Próximos pasos".
- **Spanglish controlado**: tecnicismos en inglés (stack, build, lint, deploy, scope, hooks), explicaciones en español.
- **Comandos en backticks** (`` `npm run dev` ``).
- **Rutas en backticks** (`` `src/components/` ``).
- **Decisiones en negrita** seguidas de razón.
