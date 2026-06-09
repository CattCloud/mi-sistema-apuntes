# Plantilla: Archivo en `.claude/rules/` con path-scoping

> Plantilla para crear archivos en `.claude/rules/`. Cada archivo aplica solo cuando se trabaja con archivos que coinciden con su patrón `paths:`.

> ⚠️ La sintaxis exacta del frontmatter (campo `paths`) puede variar entre versiones de Claude Code. **Verificar contra la doc oficial de la versión instalada antes de adoptarlo en producción.**

> **Importante:** los ejemplos cubren stacks distintos (JS/TS, Python, Go, SQL) para mostrar que el patrón es universal. Adaptar al stack real del proyecto del usuario, no copiar literal.

---

## Estructura básica

```markdown
---
paths:
  - "[patrón_glob_1]"
  - "[patrón_glob_2]"
---

# Reglas para [nombre del contexto]

[Contenido de las reglas — convenciones, gotchas, patrones específicos.]
```

---

## Patrones glob comunes

| Patrón | Coincide con |
|---|---|
| `**/*.test.ts` | Todos los archivos `.test.ts` en cualquier carpeta. |
| `**/*.spec.ts` | Todos los archivos `.spec.ts`. |
| `__tests__/**/*` | Todo dentro de la carpeta `__tests__` (en cualquier nivel). |
| `app/api/**/*.ts` | Todos los `.ts` dentro de `app/api/`. |
| `prisma/migrations/**/*` | Todas las migraciones de Prisma. |
| `components/ui/*.tsx` | Componentes UI directos (no recursivo). |
| `**/*.sql` | Todos los archivos SQL. |

---

## Ejemplos reales por tipo de regla

### Ejemplo A: Reglas para tests (JS/TS)

```markdown
---
paths:
  - "**/*.test.ts"
  - "**/*.spec.ts"
  - "__tests__/**/*"
---

# Reglas para tests

- Usar `describe` para agrupar y `it` para casos individuales.
- Nombres de tests descriptivos en el lenguaje del equipo (en este proyecto, español).
- Mockear servicios externos siempre, nunca llamar APIs reales.
- Tests pure-logic preferidos: extraer business logic a funciones puras y testear ahí.
- Setup global vive en `[archivo de setup del runner que use el proyecto]`.
```

### Ejemplo B: Reglas para tests Python (pytest)

```markdown
---
paths:
  - "tests/**/*.py"
  - "**/test_*.py"
---

# Reglas para tests

- Cada test debe correr aislado: usar fixtures de pytest, no estado global.
- Fixtures compartidos viven en `conftest.py` al nivel apropiado.
- Mockear DB con `pytest-mock` o `factories`, nunca conectarse a una real.
- Marcar tests lentos con `@pytest.mark.slow` para poder filtrarlos.
- Async tests con `pytest-asyncio` y `@pytest.mark.asyncio`.
```

### Ejemplo C: Reglas para componentes UI (cualquier framework de componentes)

```markdown
---
paths:
  - "components/**/*"
  - "src/components/**/*"
---

# Reglas para componentes UI

- Componentes y archivos en PascalCase.
- Props tipadas explícitamente, no usar tipos genéricos sin restricción.
- Preferir extender componentes existentes del sistema de diseño antes de crear nuevos desde cero.
- Estado global solo cuando sobrevive a varios componentes; estado local en otros casos.
- Sin HTML inline para layout — usar el sistema de estilos del proyecto.
```

### Ejemplo D: Reglas para migraciones de base de datos

```markdown
---
paths:
  - "**/migrations/**"
  - "**/*.sql"
  - "alembic/versions/**"
---

# Reglas para migraciones de base de datos

- Cada migración en su propio archivo con nombre descriptivo y timestamp.
- Antes de mergear: confirmar con el equipo de infra cómo se aplicará en producción (manual, automatizado, ventana de mantenimiento).
- Si el cambio afecta tablas grandes, documentar el plan de aplicación con tiempos estimados en el PR.
- Migraciones destructivas (DROP, ALTER COLUMN destructivo) requieren backup verificado previo.
- Nunca editar una migración ya aplicada en cualquier ambiente — crear una nueva que corrija.
```

### Ejemplo E: Reglas para endpoints/handlers de API

```markdown
---
paths:
  - "app/api/**"
  - "internal/handlers/**"
  - "src/routes/**"
---

# Reglas para endpoints de API

- Validar input con el sistema de schemas del proyecto antes de procesar.
- Errores conocidos con códigos de respuesta apropiados (4xx vs 5xx).
- No exponer detalles internos en respuestas de error (stack traces, paths, queries).
- Logging estructurado con el correlation ID de la request.
- Para endpoints públicos, definir y aplicar rate limiting.
```

---

## Reglas para escribir buenas reglas

| Buena regla | Mala regla |
|---|---|
| **Concreta y aplicable.** *"Mockear servicios externos siempre."* | **Abstracta y genérica.** *"Escribir buenos tests."* |
| **Específica al contexto del path.** *"Convertir Decimal a número primitivo antes de serializar al cliente."* | **Universal, debería estar en CLAUDE.md.** *"Usar tipado estricto."* |
| **Razonada cuando importa.** *"NO testear directamente módulos que cargan ORM en module-init porque rompe el test runner."* | **Sin contexto.** *"NO testear cierto tipo de módulos."* |
| **Sobre cómo escribir el archivo, no sobre estilo.** *"Preferir componentes del sistema de diseño antes que crear nuevos."* | **Estilo de código.** *"Usar comillas dobles."* (esto va a linter) |

---

## Cuándo dividir en varios archivos

Si tienes muchas reglas para distintos contextos, **NO** las pongas todas en un solo archivo de `.claude/rules/`. Cada archivo debería cubrir **un dominio coherente**:

```plain text
.claude/rules/
├── tests.md              ← Reglas para todos los tests
├── handlers.md           ← Reglas para endpoints/handlers de API
├── components.md         ← Reglas para componentes UI
├── migrations.md         ← Reglas para migraciones de base de datos
└── timezone.md           ← Reglas para manejo de fechas/zonas horarias
```

Cada archivo tiene su propio `paths:` y se carga independientemente. Esto mantiene el ruido bajo: si solo trabajas con componentes, no se carga el archivo de tests.

---

## Verificación al crear un archivo nuevo

Antes de dejar un archivo en `.claude/rules/`:

1. ✅ ¿Tiene frontmatter con `paths:`?
2. ✅ ¿Los patrones glob son correctos? (probar con `find` o equivalente que coincidan con los archivos esperados)
3. ✅ ¿Las reglas son específicas al contexto del path? (no universales)
4. ✅ ¿Cada regla tiene razón implícita o explícita de por qué existe?
5. ✅ ¿El archivo es razonablemente corto? (<50 líneas idealmente)
