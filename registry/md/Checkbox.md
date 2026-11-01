<!-- Archivo GENERADO desde registry/json/Checkbox.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Checkbox · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Casilla para activar o aceptar una opción independiente.

## Archivos
- Componente: `components/checkbox/checkbox.tsx`
- Estilos: `components/checkbox/checkbox.css`
- Test: `components/checkbox/checkbox.spec.ts`
- Contrato: `registry/json/Checkbox.json`

## Anatomía
1. casilla
2. etiqueta
3. texto de ayuda (opcional)
4. mensaje de error (opcional)

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `label` | `string` | — | Sí | Texto de la opción. Toda la etiqueta es clicable |
| `name` | `string` | — | No | Nombre del campo en el formulario |
| `hint` | `string` | — | No | Ayuda breve bajo la etiqueta |
| `error` | `string` | — | No | Mensaje de error (por ejemplo, aceptar condiciones) |
| `required` | `boolean` | `false` | No | Opción obligatoria |
| `disabled` | `boolean` | `false` | No | Opción desactivada |

## Estados
`unchecked` · `checked` · `focus` · `error` · `disabled`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| control | `color.field.control` | `#141413` |
| border | `color.field.border` | `#87867f` |
| label.text | `color.text.primary` | `#141413` |
| hint.text | `color.text.secondary` | `#5e5d59` |
| error.text | `color.feedback.error.text` | `#a3402a` |
| disabled.text | `color.action.disabled.text` | `#87867f` |
| focus.ring | `color.focus.ring` | `#141413` |
| focus.width | `size.border.focus` | `2px` |
| focus.offset | `size.space.focus-offset` | `2px` |
| size | `size.control.check` | `20px` |
| target | `size.control.height` | `44px` |
| gap | `size.space.stack-sm` | `8px` |
| helper.gap | `size.space.field-gap` | `4px` |
| label.font.family | `font.body.family` | `Georgia, serif` |
| label.font.size | `font.body.size` | `18px` |
| helper.font.family | `font.helper.family` | `Inter, Arial, sans-serif` |
| helper.font.size | `font.helper.size` | `14px` |

## Contenido
Sigue `content/voice.md#formularios`. Máximo 12 palabras.

## Accesibilidad
- **element:** input type="checkbox" nativo
- **label:** El input está dentro de su <label>: toda la etiqueta es clicable
- **minTarget:** Área táctil de 44px de alto
- **description:** Ayuda y error se enlazan con aria-describedby

## Contrato
**Siempre**
- Usar el checkbox nativo del navegador (accesible por defecto)
- Redactar la etiqueta en positivo: lo que pasa al marcarla

**Nunca**
- Usarlo para acciones inmediatas (para eso existe un interruptor o un botón)
- Etiquetas en negativo ("No quiero recibir…")
- Valores hex o px escritos a mano

## Decisiones
- **Checkbox nativo con accent-color.** Mantiene teclado, lector de pantalla y estados del sistema sin reconstruirlos. El color de marca llega con un solo token.

## Preguntas abiertas
- ¿Hace falta un estado indeterminado para listas con selección parcial?
