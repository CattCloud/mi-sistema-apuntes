---
name: procesar-notas
description: Procesar NOTAS.md de Tesla — decidir qué nota va a un apunte existente, cuál ya está cubierta y cuál es un tema nuevo. Usar cuando el usuario dice "procesa mis notas", "revisa NOTAS.md", o pide tomar una idea anotada para empezar un apunte.
---

# Procesar `NOTAS.md`

`NOTAS.md` es el único lugar donde viven ideas, dudas y adiciones pendientes (no hay notas por carpeta). La escriben el usuario a mano y el agente cuando el guardián de alcance redirige algo (R10).

## Pasos

1. Leer `NOTAS.md` completo.
2. Por cada nota **sin marcar** bajo un tema existente, proponer una de tres salidas, con una línea de porqué:
   - **Va en la sección [X] del apunte** → al aprobarse, se integra con `generar-apunte` (apunte abierto, A11), releyendo antes el archivo destino.
   - **Ya está cubierta en [sección Y]** → se marca procesada.
   - **Es un apunte nuevo** → se mueve a "Ideas de temas nuevos".
3. Las ideas de temas nuevos se quedan ahí hasta que el usuario decida empezar P1 con una.
4. Presentar todas las propuestas juntas, con alternativas concretas (R11), y aplicar lo que el usuario apruebe.
5. Marcar cada nota procesada con `[x]` y anotar al lado qué se hizo: integrada en la sección X, nueva subsección, o descartada.
