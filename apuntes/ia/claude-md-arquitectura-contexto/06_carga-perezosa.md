---
tema: CLAUDE.md — Arquitectura de Contexto
workspace: ia
seccion: 6
titulo: "Carga perezosa — la pieza que evita inflar el contexto"
estado: finalizada
prev: 05_sistema-de-archivos-scope
next: 07_mecanismos-escalar
---

# 🤖 Carga perezosa — la pieza que evita inflar el contexto

Los 4 niveles de scope que vimos en la sección anterior resuelven **dónde** vive cada cosa según a quién afecta, pero no resuelven un problema distinto: **cuándo se cargan los archivos al contexto del modelo**. Dentro del nivel proyecto, ¿realmente todo el contexto del repo tiene que vivir en un solo CLAUDE.md raíz?

La respuesta es no. El nivel proyecto admite una subdivisión interna importante:

> **Dentro del nivel proyecto, puedes tener un CLAUDE.md raíz (`./CLAUDE.md`) Y CLAUDE.md adicionales dentro de subdirectorios específicos (`./frontend/CLAUDE.md`, `./packages/auth/CLAUDE.md`, etc.). Todos son nivel proyecto — solo que cada uno aplica a una zona distinta del repo.**
>
> Es decir, los 4 scopes responden a *"¿a QUIÉN afecta?"*, y las subdivisiones internas del nivel proyecto responden a *"¿a QUÉ ZONA del proyecto aplica?"*. Son dos ejes que se combinan.

Esto plantea un problema: si todos esos CLAUDE.md de subdirectorios se cargaran al arrancar la sesión, los proyectos grandes (un monorepo con frontend, backend y varios paquetes compartidos) reventarían el presupuesto en el primer turno.

Aquí entra el mecanismo que hace que el sistema escale: la **carga perezosa**.

> **La carga perezosa significa que Claude Code no carga todos los CLAUDE.md de tu proyecto al arranque — solo carga los que están en directorios donde el agente efectivamente termina trabajando durante la sesión.**
>
> Es decir, los CLAUDE.md de subdirectorios solo entran al contexto cuando Claude lee archivos en esos subdirectorios. Si nunca tocas esa zona del repo, su CLAUDE.md no consume presupuesto.

Antes de seguir, conviene aclarar el término:

> **"Perezoso" (lazy en inglés) es un término de programación que se usa para describir mecanismos que difieren el trabajo hasta el momento en que realmente se necesita, en vez de hacerlo todo de antemano.**
>
> La carga perezosa (lazy loading) es la versión aplicada a archivos: en vez de cargar todo al inicio, se carga cada cosa "a último momento", solo cuando se va a usar. Lo opuesto es la carga ansiosa (eager), donde todo se carga de entrada por si acaso.

Imagina que vives en una casa grande con varios cuartos (los subdirectorios de tu repo), y cada cuarto tiene su propio interruptor de luz (el CLAUDE.md de ese subdirectorio). En lugar de prender todas las luces de la casa al despertar (carga ansiosa — consume mucha energía y la mayoría no la usas), las luces tienen sensor de movimiento y solo se prenden cuando entras al cuarto (carga perezosa — solo se gasta energía donde efectivamente vas). Si pasas todo el día en la sala y la cocina, los cuartos del segundo piso se quedan apagados. Cuando subes, sus luces se activan.

Aplicado a CLAUDE.md, esto significa lo siguiente:

```plain
ESTRUCTURA DEL REPO              CARGA AL ARRANQUE       CARGA BAJO DEMANDA
                                 (entran siempre)        (solo si toco la zona)

  ./CLAUDE.md                    ✅ Sí
  ./frontend/CLAUDE.md           ⚪ No                    → Si leo ./frontend/X
  ./backend/CLAUDE.md            ⚪ No                    → Si leo ./backend/X
  ./packages/auth/CLAUDE.md      ⚪ No                    → Si leo ./packages/auth/X
  ./packages/ui/CLAUDE.md        ⚪ No                    → Si leo ./packages/ui/X
```

**Lo que se carga siempre al arranque:**

- El CLAUDE.md de la**raíz** del proyecto.
- Los CLAUDE.md en los directorios**por encima** del directorio donde estás trabajando (típicamente solo tu home, que es donde vive el nivel usuario).

**Lo que se carga bajo demanda:**

- Los CLAUDE.md en**subdirectorios** del proyecto. Solo entran cuando Claude lee archivos dentro de ese subdirectorio.

**Por qué esto importa tanto:** convierte la jerarquía de CLAUDE.md de un sistema rígido ("todo o nada") en un sistema **modular**. Puedes poner contexto muy específico de tu frontend en `./frontend/CLAUDE.md` (convenciones de React, estructura de componentes, etc.) y ese contexto **solo entra al presupuesto cuando Claude trabaja con el frontend**. Si en esta sesión solo tocas el backend, el frontend/CLAUDE.md no existe para el modelo.

Esto es **la pieza que hace viable la disciplina de "menos es más" en proyectos grandes**. Sin carga perezosa, un monorepo te obligaría a meter todo el contexto de todas las áreas en un solo archivo raíz gigante (rompiendo el presupuesto). Con carga perezosa, puedes tener un CLAUDE.md raíz mínimo + CLAUDE.md específicos por componente, sin pagar el costo de todos a la vez.

**Implicación práctica para tu trabajo:** si estás en un proyecto donde notas que tu CLAUDE.md raíz se está inflando porque metiste convenciones específicas de distintas áreas (*"para el frontend hacemos X, para el backend Y, para la base de datos Z"*), eso es la señal de que conviene mover cada zona a su propio CLAUDE.md de subdirectorio. El presupuesto del agente te lo agradece y el archivo raíz vuelve a ser una hoja de onboarding limpia.

Debes recordar que la carga perezosa no es un truco — es el **principio arquitectónico** que permite que el sistema escale. Te da una forma natural de tener "mucho contexto disponible" sin pagar "mucho costo simultáneo".


---
[[05_sistema-de-archivos-scope|← anterior]] · [[00_indice|índice]] · [[07_mecanismos-escalar|siguiente →]]
