# Plantilla: CLAUDE.local.md

> Plantilla para el nivel local (`./CLAUDE.local.md`). Va en `.gitignore` — solo te afecta a ti, no al equipo.

> **Cuándo usarla:** cuando tienes contenido que el agente SÍ debe ver pero que NO quieres versionar.

---

## Antes de usar

**Verificar que `.gitignore` lo excluye:**

Agregar esta línea a tu `.gitignore` (si no está ya):

```
CLAUDE.local.md
```

**Verificar con git que efectivamente está ignorado:**

```bash
git check-ignore CLAUDE.local.md
```

Si devuelve `CLAUDE.local.md`, está bien ignorado. Si no devuelve nada, el `.gitignore` no lo está cubriendo.

---

## Plantilla

```markdown
# Preferencias locales

> Este archivo es personal y no se versiona (`.gitignore`). Sobrescribe o complementa lo del CLAUDE.md compartido para esta máquina.

## URLs y endpoints locales

- Sandbox propio: [URL]
- Base de datos local de pruebas: [URL/connection string sin credenciales reales]
- Tunneling activo (ngrok, etc.): [URL si lo usas seguido]

## Preferencias de respuesta

- [Preferencia tuya que sobrescribe el comportamiento default — ej. "respuestas más cortas", "usar más analogías", "siempre incluir ejemplos de código"]

## Atajos personales

- [Comandos o scripts propios que usas seguido y quieres que el agente los conozca]

## Contexto temporal

> Para cosas que estás trabajando ahora mismo y quieres que el agente tenga en mente esta semana. **Limpia esta sección con frecuencia** — no es bitácora a largo plazo.

- [Tarea actual / contexto efímero]
```

---

## Ejemplos reales

### Ejemplo A: Desarrollador con varios entornos personales

```markdown
# Preferencias locales

## URLs y endpoints locales

- Sandbox personal: https://erick-sandbox.staging.miempresa.com
- DB local de pruebas: mysql://localhost:3306/enterbase_local
- Ngrok activo para webhooks: https://erick-ngrok.ngrok.io

## Preferencias de respuesta

- Respuestas más cortas cuando es código simple, más detalladas para arquitectura.
- Tecnicismos en inglés, explicaciones en español (spanglish controlado).
```

### Ejemplo B: Desarrollador con tooling personalizado

```markdown
# Preferencias locales

## Atajos personales

- `./scripts/quick-deploy.sh` — Script personal mío para deploy rápido a mi staging.
- `./scripts/seed-local.sh` — Carga datos de prueba específicos a mi flujo.

## Contexto temporal

- Esta semana estoy trabajando en la rama `feature/billing-v2`. Si me ves haciendo cambios en `app/billing/`, asume que es de esa rama.
```

---

## Qué NO va en `CLAUDE.local.md`

- **Credenciales reales** (passwords, tokens de producción, API keys). Esas van en variables de entorno, no en archivos que el agente pueda leer.
- **Información del equipo** que aplica a todos. Eso es nivel proyecto, va en el CLAUDE.md versionado.
- **Bitácora de cambios.** Si quieres anotar cambios para acordarte, eso es trabajo de tu sistema de tracking o de git mismo.

---

## Mantenimiento

- **Revisa `CLAUDE.local.md` cada 2-4 semanas.** El contenido temporal se vuelve obsoleto rápido.
- **Si una preferencia personal pasa a ser convención del equipo**, muévela al CLAUDE.md versionado y elimínala de aquí.
- **Si una preferencia temporal ya pasó** (terminaste el feature, cerraste la rama), elimínala.
