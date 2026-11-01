<!-- Archivo GENERADO desde registry/json/Card.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Card · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Agrupa un contenido relacionado (un artículo, una idea, un recurso) sobre el lienzo.

## Archivos
- Componente: `components/card/card.tsx`
- Estilos: `components/card/card.css`
- Test: `components/card/card.spec.ts`
- Contrato: `registry/json/Card.json`

## Anatomía
1. contenedor
2. eyebrow (opcional)
3. título
4. cuerpo

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `variant` | `cream` · `warm` | `"cream"` | No | cream por defecto; warm para destacar un elemento |
| `eyebrow` | `string` | — | No | Categoría o metadato breve |
| `title` | `string` | — | Sí | Título de la tarjeta |
| `headingLevel` | `2` · `3` · `4` | `3` | No | Nivel del encabezado para mantener la jerarquía de la página |
| `children` | `node` | — | No | Cuerpo de la tarjeta |

## Estados
`default`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| cream.background | `color.surface.raised` | `#f0eee6` |
| cream.border | `color.border.subtle` | `#e3dacc` |
| warm.background | `color.surface.warm` | `#e3dacc` |
| border.width | `size.border.default` | `1px` |
| radius | `size.radius.surface` | `16px` |
| padding | `size.space.surface` | `32px` |
| gap | `size.space.stack-sm` | `8px` |
| text | `color.text.primary` | `#141413` |
| eyebrow.text | `color.text.secondary` | `#5e5d59` |
| eyebrow.font.family | `font.eyebrow.family` | `"JetBrains Mono", ui-monospace, monospace` |
| eyebrow.font.size | `font.eyebrow.size` | `14px` |
| title.font.family | `font.title.family` | `Georgia, serif` |
| title.font.size | `font.title.size` | `24px` |
| body.font.family | `font.body.family` | `Georgia, serif` |
| body.font.size | `font.body.size` | `18px` |

## Contenido
Sigue `content/voice.md#tarjetas`. Máximo 8 palabras.

## Accesibilidad
- **element:** article
- **heading:** El título es un encabezado real (h2–h4) según headingLevel
- **contrast:** Texto ≥ 4.5:1 sobre ambas variantes

## Contrato
**Siempre**
- Separar la tarjeta del fondo con cambio de tono y borde de 1px
- Usar solo los tokens declarados en este contrato

**Nunca**
- Sombras (box-shadow)
- Más de un nivel de jerarquía dentro de la tarjeta
- Variantes que no estén en props.variant

## Decisiones
- **Sin sombra.** La profundidad se consigue con superficies, no con sombras. Es una decisión de marca (docs/DESIGN.md).
- **Eyebrow en color.text.secondary (slate.500).** El gris claro de la referencia (cloud.400) no llega al contraste AA sobre crema.

## Preguntas abiertas
- ¿La tarjeta completa debe ser clicable cuando enlaza a un artículo?
