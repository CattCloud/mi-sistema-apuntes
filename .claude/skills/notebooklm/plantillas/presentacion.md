# Plantilla: Presentación de una clase

> **Diálogo:** "Personalizar presentación de diapositivas". Opciones según el Paso 2 de `SKILL.md`; por defecto **Presentación detallada** · **Predeterminada** · **español** (D36).
> **Fuentes a marcar:** el `.md` de la clase y sus imágenes (`MX-NN_`).
> Rellenar los `[corchetes]` leyendo la clase **exportada**. Borrar las líneas que no apliquen: si la clase no tiene código, sale la línea de código.

## Plantilla

```text
Presentación para estudiar por mi cuenta "[título de la clase]". Audiencia: un desarrollador que quiere entender y retener todo su contenido. Explicación en español, tecnicismos en inglés.

Cubre todas estas temáticas, en este orden y con el mismo peso; ninguna se omite ni se reduce a una línea:
1. [temática 1]
2. [temática 2]
3. [...]

Dale más explicación y un ejemplo a lo que más cuesta entender: [lo difícil, nombrado por su contenido]. Sin quitarle espacio a las demás temáticas.

Código: cuando una diapositiva explique un ejemplo, muestra el bloque de código literal de las fuentes junto a su explicación, sin resumirlo ni reescribirlo. [Si la clase compara dos códigos: Muestra juntos [código A] y [código B] para compararlos.]

Visuales: usa tablas y diagramas cuando ordenen el contenido, en especial [tablas o diagramas clave de la clase]. No uses imágenes decorativas, fotos de archivo ni íconos que no aporten información.

Cierra con una diapositiva con las ideas del bloque "Lo que debiste llevarte".
```

## Variantes

- **Diapositivas del presentador** (para exponer): cambiar la audiencia por *"estudiantes a los que les voy a explicar esta clase"* y agregar *"Texto mínimo en cada diapositiva: el código, las tablas y los diagramas llevan el peso"*.
- **Duración Corto:** agregar a la lista de temáticas *"Cada temática tiene al menos una diapositiva"*.

## Ejemplo: TypeScript M1, clase 4

**Opciones:** Presentación detallada · Predeterminada · español. **Fuentes:** `M1-04_tsc-y-el-flujo.md`.

```text
Presentación para estudiar por mi cuenta "tsc y el flujo de trabajo". Audiencia: un desarrollador que quiere entender y retener todo su contenido. Explicación en español, tecnicismos en inglés.

Cubre todas estas temáticas, en este orden y con el mismo peso; ninguna se omite ni se reduce a una línea:
1. Los tres trabajos de tsc y cuándo ocurre cada fase
2. Instalarlo: local con npx o global
3. Los comandos que vas a usar
4. Cómo se ve trabajar de verdad, y por qué en un proyecto de Next.js nunca escribes tsc
5. Errores y el .js que se genera igual

Dale más explicación y un ejemplo a lo que más cuesta entender: que herramientas como tsx o el compilador de Next.js borran los tipos pero se saltan la verificación, y que tsc ignora el tsconfig.json cuando le pasas un nombre de archivo. Sin quitarle espacio a las demás temáticas.

Código: cuando una diapositiva explique un ejemplo, muestra el bloque de código literal de las fuentes junto a su explicación, sin resumirlo ni reescribirlo. Muestra juntos el mismo archivo compilado con target "ES2020" y con target "ES5" para compararlos.

Visuales: usa tablas y diagramas cuando ordenen el contenido, en especial el esquema de cuándo ocurre cada fase, la comparación entre instalar con -g y con -D, y la tabla de quién verifica los tipos en cada momento. No uses imágenes decorativas, fotos de archivo ni íconos que no aporten información.

Cierra con una diapositiva con las ideas del bloque "Lo que debiste llevarte".
```
