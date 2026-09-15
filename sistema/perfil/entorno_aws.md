# ☁️ Entorno AWS de estudio

> **Qué es:** el entorno real contra el que se escriben los apuntes y las prácticas de la ruta Cloud for Developers.
> **Este repositorio es público.** Aquí solo va lo que puede leer cualquiera. El ID de cuenta, el alias, los usuarios IAM, sus permisos y el estado de MFA viven en `entorno_aws.local.md`, en esta misma carpeta, que git ignora (R9).

| Dato | Valor | Confirmado |
|---|---|---|
| **Cuenta de trabajo** | **GreenCloud**, creada en agosto de 2026 | 2026-09-08 |
| Cuenta vieja | Cattcloud — no se usa | 2026-09-08 |
| **Plan** | Plan gratuito nuevo, por créditos. El panel de EC2 mostraba **120 USD restantes**; el plan vence el 2027-02-21 o al agotarse el crédito. ⚠️ verificar: un handoff anterior hablaba de 100 USD y de un vencimiento del crédito el 2027-08-22 | 2026-09-08 |
| **Región de trabajo** | **`us-east-2` (Ohio)**. Un `PROMPT.md` anterior decía `us-east-1`, pero las capturas y la primera instancia están en Ohio. Al buscar recursos, mirar primero Ohio: las instancias solo se ven en la región activa | 2026-09-08 |

> ⚠️ **El plan gratuito nuevo invalida lo que el curso AWS DVA (agosto de 2022) dice del free tier clásico de 12 meses.** Donde el curso y la cuenta difieren, manda la cuenta (R8).

> 💸 **Todo lo que se crea para practicar sigue el ciclo completo:** crear → comprobar → terminar → verificar que no quedó nada vivo (disco, IP, grupo de seguridad).

> 🔒 **En apuntes y capturas**, un ID de cuenta o un ARN de ejemplo usa el valor de la documentación de AWS: `123456789012`.
