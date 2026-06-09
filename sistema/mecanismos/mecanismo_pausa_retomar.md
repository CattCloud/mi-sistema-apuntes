# Mecanismo: Pausa y Retomar

> **Propósito:** Pausar un apunte en curso para trabajar en otro, sin perder contexto, y retomarlo donde quedó.
> **Modelo:** estados de progreso en el `00_indice.md` (no hay checkpoint aparte). Ver `decisiones/decision_final_md_local.md` (D3).
> **Rediseñado:** 2026-06-08 (reemplaza el modelo del `ESTADO.md` separado).

---

## Idea central

Como los apuntes viven en disco (`.md`) y cada apunte tiene su `00_indice.md`, **no hace falta un checkpoint aparte**: el índice ya es la superficie de control. Pausar es, sobre todo, una **señal explícita** (`PAUSADO`) de que el apunte se aparcó a propósito — distinta de `EN PROGRESO` (trabajo activo).

> El `00_indice.md` absorbe el rol que antes tenía `ESTADO.md`. No se crea ni se mantiene un archivo de checkpoint separado.

---

## Contexto

El mecanismo "Apunte Abierto" cubre adiciones *dentro* de un apunte activo. Este mecanismo cubre **interrupciones del flujo** para irse a otro apunte distinto. El usuario salta entre temas según prioridad real (clases, proyectos, urgencias); la pausa es normal, no excepcional.

---

## Estados del apunte

| Estado | Significado |
|--------|-------------|
| `EN PROGRESO` | Flujo activo, se está trabajando ahora |
| `PAUSADO` | Aparcado a propósito; retomable en cualquier momento |
| `FINALIZADO` | Todas las secciones `✅` |

Vive en el frontmatter del `00_indice.md`. A nivel sección (en `## Secciones`): `⬜ pendiente` · `🔄 en progreso` · `✅ finalizada`.

---

## Disparadores

- El usuario dice *"pausemos esto"*, *"cambiemos de tema"*, *"luego seguimos con esto"*.
- Pide arrancar un apunte nuevo cuando hay uno `EN PROGRESO`.
- Menciona un tema fuera del alcance que no es adición integrable (ver Guardián de Alcance) y amerita su propio flujo P1→P4.

**Antes de pausar, confirmar:** *"Marco [X] como PAUSADO y arrancamos [nuevo tema]. ¿Procedo?"*

---

## Flujo de Pausa

1. Asegurar que el `00_indice.md` refleje **dónde se quedó**:
   - Las secciones en `## Secciones` con su estado real (`✅`/`🔄`/`⬜`) — la primera `⬜` es por donde se sigue.
   - Pendientes y `⚠️ verificar` acumulados (en una línea o bloque del índice).
   - Una línea **"Siguiente paso al retomar"** con la acción concreta.
   - Cualquier decisión nueva del hilo que no esté ya en la cabecera (arquetipo, alcance, divisiones del tema).
2. Cambiar `estado: PAUSADO` en el frontmatter del índice.
3. Confirmar: *"Apunte [X] en PAUSADO. El índice tiene el progreso y el siguiente paso. Listo para el nuevo tema."*

**Regla:** la pausa no descarta nada. Las secciones ya escritas quedan intactas; el índice solo registra el estado y el punto de continuación.

---

## Flujo de Retomar

1. El usuario pide volver (*"sigamos con [X]"*, *"retomemos Claude Code"*).
2. El agente lee el `00_indice.md` del apunte.
3. Resume: qué secciones están `✅` y cuál es la primera `⬜`, los pendientes/`⚠️ verificar`, y el "Siguiente paso al retomar".
4. El usuario confirma o ajusta.
5. `estado: EN PROGRESO` y se continúa desde la primera sección `⬜` (P3⇄P4).

**Si el usuario ajusta una decisión previa:** actualizar la cabecera/alcance del índice antes de continuar, para mantener el rastro.

---

## Dónde se detectan los apuntes pausados

- El **índice del workspace** (`apuntes/[workspace]/00_indice.md`) lista sus apuntes con su estado → los `PAUSADO` se ven de un vistazo.
- `CLAUDE.md` puede destacar los apuntes pausados para que el agente los detecte al iniciar sesión.

---

## Conexión con el resto del sistema

- **Apunte Abierto:** opera *dentro* de un apunte `EN PROGRESO`. Este mecanismo opera *entre* apuntes.
- **Guardián de Alcance:** redirige sub-temas a `NOTAS.md`. La pausa es para cuando el otro tema es lo bastante grande como para merecer su propio flujo P1→P4, no una nota.
- **NOTAS.md:** independiente. Las ideas sueltas siguen ahí; los apuntes a medias se reflejan en su propio `00_indice.md` con estado `PAUSADO`.
