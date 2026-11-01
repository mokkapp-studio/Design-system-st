<!-- Archivo GENERADO desde registry/json/Input.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Input · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Campo de texto de una línea con su etiqueta, ayuda y mensaje de error.

## Archivos
- Componente: `components/input/input.tsx`
- Estilos: `components/input/input.css`
- Test: `components/input/input.spec.ts`
- Contrato: `registry/json/Input.json`

## Anatomía
1. etiqueta
2. campo
3. texto de ayuda (opcional)
4. mensaje de error (opcional)

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `label` | `string` | — | Sí | Etiqueta visible. Siempre presente: el placeholder no la sustituye |
| `type` | `text` · `email` · `password` · `search` · `tel` · `url` · `number` | `"text"` | No | Tipo de dato |
| `name` | `string` | — | No | Nombre del campo en el formulario |
| `placeholder` | `string` | — | No | Ejemplo de formato, nunca instrucciones |
| `hint` | `string` | — | No | Ayuda breve bajo el campo |
| `error` | `string` | — | No | Mensaje de error. Si existe, el campo pasa a estado inválido |
| `required` | `boolean` | `false` | No | Campo obligatorio |
| `disabled` | `boolean` | `false` | No | Campo desactivado |

## Estados
`default` · `hover` · `focus` · `error` · `disabled`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| background | `color.field.bg` | `#faf9f5` |
| border | `color.field.border` | `#87867f` |
| border-hover | `color.field.border-hover` | `#5e5d59` |
| border-focus | `color.field.border-focus` | `#141413` |
| text | `color.field.text` | `#141413` |
| placeholder | `color.field.placeholder` | `#5e5d59` |
| label.text | `color.text.primary` | `#141413` |
| hint.text | `color.text.secondary` | `#5e5d59` |
| error.text | `color.feedback.error.text` | `#a3402a` |
| error.border | `color.feedback.error.border` | `#a3402a` |
| disabled.background | `color.action.disabled.bg` | `#e8e6dc` |
| disabled.text | `color.action.disabled.text` | `#87867f` |
| focus.ring | `color.focus.ring` | `#141413` |
| focus.width | `size.border.focus` | `2px` |
| border.width | `size.border.default` | `1px` |
| radius | `size.radius.control` | `8px` |
| height | `size.control.height` | `44px` |
| padding.x | `size.space.field-x` | `16px` |
| padding.y | `size.space.control-y` | `12px` |
| gap | `size.space.field-gap` | `4px` |
| font.family | `font.body.family` | `Georgia, serif` |
| font.size | `font.body.size` | `18px` |
| label.font.family | `font.label.family` | `Inter, Arial, sans-serif` |
| label.font.size | `font.label.size` | `14px` |
| label.font.weight | `font.label.weight` | `500` |
| helper.font.family | `font.helper.family` | `Inter, Arial, sans-serif` |
| helper.font.size | `font.helper.size` | `14px` |

## Contenido
Sigue `content/voice.md#formularios`. Máximo 4 palabras.

## Accesibilidad
- **element:** input
- **label:** La etiqueta está asociada al campo con for/id
- **description:** Ayuda y error se enlazan con aria-describedby
- **invalid:** Con error, el campo lleva aria-invalid="true"
- **contrast:** Borde del campo ≥ 3:1 y textos ≥ 4.5:1

## Contrato
**Siempre**
- Mostrar siempre una etiqueta visible
- Explicar el error y cómo solucionarlo
- Usar solo los tokens declarados en este contrato

**Nunca**
- Usar el placeholder como etiqueta
- Indicar el error solo con color
- Sombras (box-shadow) o fondos de color en estado de error
- Valores hex o px escritos a mano

## Decisiones
- **Error en rojo solo en borde y mensaje.** El fondo rojo genera ansiedad y compite con la marca monocroma. Además, el mensaje en texto hace que el error no dependa solo del color.
- **Nuevo primitivo color.rust.700 para errores.** El acento clay no llega a 4.5:1 sobre crema. rust.700 cumple AA en todas las superficies y clay sigue sin uso en la interfaz.

## Preguntas abiertas
- ¿Necesitamos un estado de éxito o validación en tiempo real?
