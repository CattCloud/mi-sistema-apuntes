# Referencia: las fuentes que se suben

> Las fuentes salen solo de `scripts/exportar.mjs`. Son **derivadas**: se regeneran desde los apuntes, nunca se editan a mano, y el apunte original nunca se toca (D5).

## Qué entra (D13)

- Solo **clases**: archivos `01_` a `98_` con `estado: finalizada` en su frontmatter.
- **Fuera:** `00_indice.md`, `99_cierre.md`, guías (`guia_*.md`), todo `_input/`, y las clases en progreso (el script las lista como omitidas).

## Dónde y con qué nombre

- **Carpeta (D9):** `notebooklm/<ruta>/<modulo>/`, en la raíz del repo e ignorada por git. `_manifest.json` guarda la huella de cada archivo y no se sube.
- **Notebook (D10, D25):** uno por módulo, llamado `Ruta-MX-Tema` (`Cloud-M3-Identidad`). `X` sale del campo `modulo:` del índice (`B3` → `3`). El script imprime el nombre exacto.
- **Archivos (D11, D25):** `MX-NN_slug.md` por clase e `MX-NN_img_nombre.png` por imagen. Los apuntes sin `modulo:` (los de `ia/`) van sin prefijo.
- **Capacidad (D12):** 50 fuentes por notebook en el plan gratis. El módulo más grande, B3, usa 14.

## Qué le hace el export a cada clase

| En la clase | En la fuente |
|---|---|
| Frontmatter | Una línea de contexto: *Ruta Cloud · Módulo 3: Identidad · Clase 1: Usuarios y grupos — quién eres* |
| Pie de navegación (`---` + `← anterior · índice · siguiente →`) | Se quita |
| Marcas ⚠️ verificar: bloque `> ⚠️ *verificar:*` o `> ⚠️ **Para verificar:**`, párrafo `⚠️ *verificar…*`, marca en línea `⚠️ *verificar…*` o `*(⚠️ verificar …)*` | Se quitan enteras, sin aviso (D28). Si la marca estaba en línea, la frase queda |
| Paréntesis que solo apuntan a otra clase o módulo: `(sección 3)`, `(→ **B6 · Datos**)`, `(Es el M5, …)` | Se quitan (D29) |
| Columna de tabla titulada *Dónde se estudia*, *Dónde se trabaja* o *Dónde se ve* | Se quita entera (D29) |
| Imagen marcada `subir` | `[Imagen: descripción — fuente MX-NN_img_nombre.png]`, y la imagen se copia como fuente (D30) |
| Imagen marcada `excluir` | Sale del texto junto con su leyenda (la línea en cursiva que la sigue) (D30) |
| Bloques de código, tablas, diagramas, quotes | Se conservan |

## Cuándo el export se niega a escribir

No escribe nada y lista el motivo si queda, fuera del código:

- una marca de verificar que no reconoció;
- una mención a otra clase o módulo: `sección N`, `sección anterior/siguiente`, `primera sección`, `módulo M3`, `módulos siguientes`, `**B2**`, `el M5`, `en B4`;
- `como vimos`, `lo que vimos`, `adelantamos`, `veremos`, `verás en el`, `lo que viene` (el gancho de cierre hacia la clase siguiente);
- `00_indice`, `99_cierre`, `micro-ejercicio` o un wikilink `[[…]]` en el cuerpo;
- una imagen de una clase exportable que no esté registrada en `limpieza/`.

`la subsección siguiente` o `esta sección` no bloquean: apuntan dentro de la misma clase.

## El archivo de limpieza

`limpieza/<ruta>/<modulo>.json` vive en la skill y viaja con git.

```json
{
  "imagenes": {
    "01_lista-grupos.png": "subir",
    "01_panel-iam.png": "excluir — muestra el ID de cuenta (R9)"
  },
  "reemplazos": {
    "01_usuarios-y-grupos.md": [
      ["aunque para eso hay algo mejor que veremos en la Sección 5.", "aunque para eso hay algo mejor: un **rol**, que entrega credenciales temporales."],
      [" Es la Sección 4.", ""]
    ]
  }
}
```

- Un reemplazo es texto **exacto** del apunte (se aplica antes de las reglas genéricas) y el texto que queda en la fuente. Se aplica a todas sus apariciones en esa clase.
- Si un reemplazo ya no encuentra su texto, el script lo lista: el apunte cambió.

### Criterios para escribir un reemplazo

1. **La frase tiene que sostenerse sin la otra clase.** Tapar la referencia; si la frase deja de explicar, se reescribe (misma prueba que A6).
2. **Si la frase solo apunta** (*"Es la Sección 4."*, *"Eso es lo que viene."*), se borra.
3. **Si la frase se apoya en algo de otra clase** (una analogía, un término, un ejemplo), se trae en una línea, tomado de la clase donde se define: *"Piensa en el corrector ortográfico de un procesador de texto: … las marcas rojas no salen impresas"*. Nunca se inventa un dato.
4. **Si la frase presentaba una imagen excluida** (*"se crea aquí mismo:"*), se cierra sin los dos puntos. Si la leyenda de esa imagen enseña algo, se reescribe como frase normal, sin cursiva, para que no se borre con la imagen.
5. **Datos de la cuenta en el texto** (nombre de usuario IAM, alias): se cambian por uno genérico (`ana`) (R9).
6. **Cuidado con dejar un patrón bloqueado en el texto nuevo:** *"lo que verás en el asistente"* sigue bloqueando por `verás en el`.

### Criterios para las imágenes (R9)

Abrir cada imagen antes de registrarla. **`excluir`** si se ve cualquiera de estos datos: ID de cuenta (también dentro de una URL, un ARN o un título), alias de la cuenta, nombre de usuario IAM, correo, estado de MFA, claves de acceso. Todo lo demás, **`subir`**.
