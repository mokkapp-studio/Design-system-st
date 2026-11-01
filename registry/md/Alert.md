<!-- Archivo GENERADO desde registry/json/Alert.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Alert · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Informa del resultado de una acción importante (por ejemplo, un pago) dentro del flujo de la página.

## Archivos
- Componente: `components/alert/alert.tsx`
- Estilos: `components/alert/alert.css`
- Test: `components/alert/alert.spec.ts`
- Contrato: `registry/json/Alert.json`

## Anatomía
1. contenedor con borde lateral
2. título
3. texto (opcional)
4. acción (opcional, máximo 1)

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `variant` | `info` · `error` | `"info"` | No | info para estados neutros, error cuando algo ha fallado y la persona puede actuar |
| `title` | `string` | — | Sí | Qué ha pasado, en 6 palabras como máximo |
| `children` | `node` | — | No | Motivo y qué puede hacer la persona. Puede incluir un Button |

## Estados
`default`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| background | `color.surface.raised` | `#f0eee6` |
| text | `color.text.primary` | `#141413` |
| info.accent | `color.border.strong` | `#141413` |
| error.accent | `color.feedback.error.border` | `#a3402a` |
| error.title | `color.feedback.error.text` | `#a3402a` |
| border.width | `size.border.default` | `1px` |
| accent.width | `size.border.accent` | `4px` |
| border.color | `color.border.subtle` | `#e3dacc` |
| radius | `size.radius.control` | `8px` |
| padding | `size.space.alert` | `24px` |
| gap | `size.space.stack-sm` | `8px` |
| title.font.family | `font.subtitle.family` | `Georgia, serif` |
| title.font.size | `font.subtitle.size` | `18px` |
| title.font.weight | `font.subtitle.weight` | `600` |
| body.font.family | `font.body.family` | `Georgia, serif` |
| body.font.size | `font.body.size` | `18px` |

## Contenido
Sigue `content/voice.md#avisos`. Máximo 6 palabras.

## Accesibilidad
- **element:** div
- **role:** error → role="alert" (se anuncia de inmediato); info → role="status"
- **meaning:** El tipo de aviso se entiende por el texto, no solo por el color

## Contrato
**Siempre**
- Explicar el motivo y el siguiente paso
- Usar solo los tokens declarados en este contrato

**Nunca**
- Fondo rojo: el rojo solo va en el borde lateral y en el título
- Más de una acción
- Sombras (box-shadow)
- Bloquear la pantalla (para eso existe un diálogo)

## Decisiones
- **Rojo solo en el borde lateral y el título.** En las pruebas, un fondo rojo entero generaba ansiedad en un momento delicado como un pago fallido.
- **Una sola acción.** Con dos opciones, la persona duda. El aviso propone un único siguiente paso.

## Preguntas abiertas
- ¿El aviso debe poder cerrarse o desaparecer solo?
- ¿Necesitamos una variante de éxito?
