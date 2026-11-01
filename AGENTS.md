# AGENTS.md · Mapa del sistema de diseño

Este archivo es el punto de entrada para cualquier agente de IA (Claude Code, Cursor, Codex…).
Sin un mapa, la IA explora y adivina. Con este mapa, navega.

## 1. Por dónde empezar

| Pregunta | Dónde está la respuesta |
|---|---|
| ¿Qué componentes existen? | `registry/json/` (contratos) |
| ¿Cómo y cuándo se usa un componente? | `registry/md/<Componente>.md` |
| ¿Qué tokens puedo usar? | `tokens/semantic/` → como variables CSS en `app/tokens.css` |
| ¿Cómo es la marca? | `docs/DESIGN.md` |
| ¿Cómo se escribe el texto? | `content/voice.md` |
| ¿Me han pasado un enlace de Figma? | Léelo con el servidor MCP de Figma (`.mcp.json`) y tradúcelo al registro |

## 2. Las tres capas

1. **`tokens/`: los valores.** `primitive/` dice qué existe; `semantic/` dice para qué sirve. Los componentes solo usan semánticos.
2. **`registry/`: el contrato.** `json/` obliga (máquinas), `md/` explica (personas), `validate.ts` comprueba.
3. **`components/`: el código.** Cada componente vive en su carpeta con `.tsx`, `.css` y `.spec.ts` (el test que verifica el contrato).

## 3. Siempre

- Lee el contrato (`registry/json/<Componente>.json`) antes de usar o modificar un componente.
- Reutiliza componentes del registro antes de crear nada.
- Usa variables CSS de tokens semánticos: `var(--color-action-primary-bg)`.
- Respeta las props, variantes, reglas y límites de contenido de cada contrato.
- Escribe los textos según `content/voice.md`.
- Termina ejecutando `npm run check` y corrige lo que falle.

## 4. Nunca

- Escribir valores a mano en CSS: ni hex, ni rgb, ni px, ni `box-shadow`.
- Usar tokens de `tokens/primitive/` en componentes o páginas.
- Crear un componente o una variante sin añadirlo antes a `registry/json/`.
- Editar archivos generados: `app/tokens.css`, `registry/md/*.md`, `docs/DESIGN.md`.
- Inventar. Si algo no está definido, **pregunta** o añádelo a `openQuestions` del contrato.

## 5. Si un diseño de Figma no cumple el contrato

Si el diseño usa un color, medida o variante que no existe en el registro, **no lo copies**: implementa la versión más cercana que cumpla el contrato y señala la diferencia en tu respuesta.

## 6. Cómo se cambia el sistema

| Quiero… | Edito… | Después ejecuto… |
|---|---|---|
| Cambiar un valor de marca | `tokens/primitive/*.json` | `npm run generate` |
| Cambiar el uso de un color | `tokens/semantic/*.json` | `npm run generate` |
| Cambiar un componente | Primero `registry/json/<C>.json`, luego el código | `npm run generate && npm run check` |
| Cambiar la prosa de marca | `content/brand.md` | `npm run tokens` |

Todo cambio se propone mediante **pull request** y sube la versión del contrato afectado (x.y.z) con su entrada en `CHANGELOG.md`.
