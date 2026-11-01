# Figma ⇄ repositorio

El repositorio es la **fuente de verdad**. Figma la refleja con los **mismos nombres**, para que personas y agentes relacionen cada pieza sin traducciones.

## 1. Variables (tokens)

Crea dos colecciones de variables:

| Colección | Contenido | Ejemplo |
|---|---|---|
| `primitive` | Los valores de `tokens/primitive/` | `color/slate/900 = #141413` |
| `semantic` | **Alias** de los primitivos, como en `tokens/semantic/` | `color/action/primary/bg → color/slate/900` |

- Usa `/` en Figma donde el repo usa `.`: `color.action.primary.bg` ↔ `color/action/primary/bg`.
- En la colección `primitive`, desactiva la publicación ("Hide from publishing"). Así los diseñadores, igual que el código, solo usan variables semánticas.
- No crees ninguna variable semántica para `clay`: el acento existe, pero la interfaz no lo usa.

**Atajo con un agente** (Claude Code o Cursor con el MCP de Figma):

> Crea en este archivo de Figma [enlace] las colecciones `primitive` y `semantic` a partir de `tokens/`. Las semánticas deben ser alias de las primitivas y la colección primitive no debe publicarse.

## 2. Componentes

Crea los componentes usando **solo variables semánticas**:

| Componente | Propiedades de Figma | Igual que en el contrato |
|---|---|---|
| Button | `variant`: primary · secondary · tertiary · `state`: default · hover · focus · disabled · `label` (texto) | `registry/json/Button.json` |
| Card | `variant`: cream · warm · `eyebrow` (booleano + texto) · `title` (texto) | `registry/json/Card.json` |
| Input | `state`: default · hover · focus · error · disabled · `label`, `hint`, `error` (texto) | `registry/json/Input.json` |
| Checkbox | `checked`: true · false · `state`: default · error · disabled · `label` (texto) | `registry/json/Checkbox.json` |
| Badge | `variant`: neutral · strong · outline · `label` (texto) | `registry/json/Badge.json` |
| Alert | `variant`: info · error · `title` (texto) · `action` (booleano + Button) | `registry/json/Alert.json` |

Pega en la **descripción** de cada componente de Figma la primera línea del contrato y la ruta: `Contrato: registry/json/Button.json`.

## 3. Specs

Arrastra cada archivo de `registry/md/` (por ejemplo, `Button.md`) al lienzo para convertirlos en **Specs**, junto a cada componente. Después incrusta el componente dentro de la sección *Anatomía* de su spec.

> Los `.md` de `registry/md/` se generan desde los contratos. Si cambias la spec en Figma, lleva el cambio al JSON del repositorio mediante una pull request. Si no, se perderá en la siguiente generación.

## 4. Code Connect (opcional)

Conecta cada componente de Figma con su archivo:

| Figma | Código |
|---|---|
| Button | `components/button/button.tsx` |
| Card | `components/card/card.tsx` |
| Input | `components/input/input.tsx` |
| Checkbox | `components/checkbox/checkbox.tsx` |
| Badge | `components/badge/badge.tsx` |
| Alert | `components/alert/alert.tsx` |

Así, cuando un agente lee un frame por MCP, recibe `<Button variant="secondary">` en lugar de reconstruir el botón con divs.

## 5. Mantener la sincronía

| Si cambia… | Primero en… | Después en… |
|---|---|---|
| Un valor de marca | `tokens/primitive/` (PR) | Variable `primitive` en Figma |
| El uso de un color | `tokens/semantic/` (PR) | Alias en la colección `semantic` |
| Un componente | `registry/json/` (PR) | Componente y Spec en Figma |

**Regla:** el repositorio manda. Figma se actualiza después del merge, a mano o pidiéndoselo al agente por MCP.
