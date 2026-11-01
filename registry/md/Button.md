<!-- Archivo GENERADO desde registry/json/Button.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# Button · v1.0.0

**Estado:** ✅ Estable · **Responsable:** Xavier Pascual · Mokkapp.com

Desencadena una acción del usuario. Hay una sola acción primaria por sección.

## Archivos
- Componente: `components/button/button.tsx`
- Estilos: `components/button/button.css`
- Test: `components/button/button.spec.ts`
- Contrato: `registry/json/Button.json`

## Anatomía
1. contenedor
2. etiqueta
3. anillo de foco

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
| `variant` | `primary` · `secondary` · `tertiary` | `"primary"` | No | Jerarquía visual de la acción |
| `children` | `string` | — | Sí | Texto del botón (ver content/voice.md#botones) |
| `disabled` | `boolean` | `false` | No | Desactiva la acción |
| `type` | `button` · `submit` · `reset` | `"button"` | No | Tipo HTML del botón |

## Estados
`default` · `hover` · `focus-visible` · `disabled`

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
| primary.background | `color.action.primary.bg` | `#141413` |
| primary.background-hover | `color.action.primary.bg-hover` | `#3d3d3a` |
| primary.text | `color.action.primary.text` | `#faf9f5` |
| secondary.background | `color.action.secondary.bg` | `#faf9f5` |
| secondary.background-hover | `color.action.secondary.bg-hover` | `#f0eee6` |
| secondary.border | `color.action.secondary.border` | `#141413` |
| secondary.text | `color.action.secondary.text` | `#141413` |
| tertiary.background-hover | `color.action.tertiary.bg-hover` | `#f0eee6` |
| tertiary.border | `color.action.tertiary.border` | `#87867f` |
| tertiary.text | `color.action.tertiary.text` | `#141413` |
| disabled.background | `color.action.disabled.bg` | `#e8e6dc` |
| disabled.text | `color.action.disabled.text` | `#87867f` |
| focus.ring | `color.focus.ring` | `#141413` |
| focus.width | `size.border.focus` | `2px` |
| focus.offset | `size.space.focus-offset` | `2px` |
| border.width | `size.border.default` | `1px` |
| radius | `size.radius.control` | `8px` |
| height | `size.control.height` | `44px` |
| padding.x | `size.space.control-x` | `24px` |
| padding.y | `size.space.control-y` | `12px` |
| font.family | `font.button.family` | `Georgia, serif` |
| font.size | `font.button.size` | `18px` |
| font.weight | `font.button.weight` | `600` |

## Contenido
Sigue `content/voice.md#botones`. Máximo 3 palabras.

## Accesibilidad
- **element:** button
- **focus:** Anillo visible solo con teclado (:focus-visible)
- **minTarget:** 44px de alto
- **contrast:** Texto/fondo ≥ 4.5:1 en default y hover

## Contrato
**Siempre**
- Usar el elemento <button> (para navegar se usa un enlace, no este componente)
- Usar solo los tokens declarados en este contrato
- Una sola variante primary por sección

**Nunca**
- Sombras (box-shadow)
- Colores de acento
- Valores hex o px escritos a mano
- Variantes que no estén en props.variant
- Iconos (no forman parte de la v1)

## Decisiones
- **Radio de 8px (size.radius.control).** La referencia de marca usaba 8px y 16px para botones según la sección. Se fija 8px para controles y 16px para superficies, y así se elimina la ambigüedad.
- **Hover por cambio de tono, no por opacidad.** Un token explícito (bg-hover) se puede verificar; una opacidad mezcla colores que nadie ha decidido.

## Preguntas abiertas
- ¿Necesitamos un tamaño pequeño para tablas y barras de herramientas?
