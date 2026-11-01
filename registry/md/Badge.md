<!-- Archivo GENERADO desde registry/json/Badge.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Badge · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Etiqueta breve para clasificar o indicar un estado. No es interactiva.

## Archivos
- Componente: `components/badge/badge.tsx`
- Estilos: `components/badge/badge.css`
- Test: `components/badge/badge.spec.ts`
- Contrato: `registry/json/Badge.json`

## Anatomía
1. contenedor
2. texto

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `variant` | `neutral` · `strong` · `outline` | `"neutral"` | No | neutral para categorías, strong para destacar, outline para metadatos |
| `children` | `string` | — | Sí | Texto de 1 o 2 palabras |

## Estados
`default`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| neutral.background | `color.surface.warm` | `#e3dacc` |
| neutral.text | `color.text.primary` | `#141413` |
| strong.background | `color.action.primary.bg` | `#141413` |
| strong.text | `color.action.primary.text` | `#faf9f5` |
| outline.border | `color.border.strong` | `#141413` |
| outline.text | `color.text.primary` | `#141413` |
| border.width | `size.border.default` | `1px` |
| radius | `size.radius.control` | `8px` |
| padding.x | `size.space.badge-x` | `8px` |
| padding.y | `size.space.badge-y` | `2px` |
| font.family | `font.eyebrow.family` | `"JetBrains Mono", ui-monospace, monospace` |
| font.size | `font.eyebrow.size` | `14px` |

## Contenido
Sigue `content/voice.md#badges`. Máximo 2 palabras.

## Accesibilidad
- **element:** span
- **meaning:** El significado está en el texto, nunca solo en el color
- **contrast:** Texto ≥ 4.5:1 en todas las variantes

## Contrato
**Siempre**
- Texto en mayúsculas mediante CSS, escrito en minúsculas

**Nunca**
- Hacerlo clicable
- Más de 2 palabras
- Iconos
- Colores de acento

## Decisiones
- **Tipografía mono en mayúsculas.** La marca reserva la mono para metadatos breves: un badge es exactamente eso.

## Preguntas abiertas
- Ninguna
