# Design Contracts

**Del prompt a la especificación.** Un sistema de diseño pequeño en el que personas y agentes de IA trabajan desde la misma fuente de verdad: tokens, contratos y tests.

> Un prompt es una conversación. Una especificación es un acuerdo.

Creado por **Xavier Pascual · [Mokkapp.com](https://mokkapp.com)** y la **[Comunidad Mokkapp](https://www.skool.com/mokkapp-1438/about)** como material del workshop *Del prompt a la especificación*.

---

## La idea

```
 Diseño (Figma) ─┐                                   ┌─ Claude Code
 Código ─────────┼──▶  CONTRATOS  ──▶  MCP / CLI  ──▶├─ Cursor
 Contenido ──────┘   componentes                     └─ Codex
                       tokens
                         │
                    PR ──▶ Tests ──▶ Producto
```

Diseño, código y contenido entran por la izquierda. Los agentes trabajan por la derecha. **En el centro, el contrato decide.**

| Pieza del esquema | Dónde vive en este repo |
|---|---|
| Diseño | Figma, conectado por MCP (`.mcp.json`, `figma/`) |
| Código | `components/` y `app/` (Next.js) |
| Contenido | `content/voice.md` y `content/brand.md` |
| Contratos | `registry/` |
| Componentes | `components/<nombre>/` |
| Tokens | `tokens/primitive/` y `tokens/semantic/` |
| MCP | `.mcp.json` (Claude Code) · `.cursor/mcp.json` (Cursor) |
| CLI | `npm run generate`, `npm run check` |
| Agentes | `AGENTS.md` (y `CLAUDE.md`, que apunta a él) |
| PR | `.github/pull_request_template.md` · `.github/CODEOWNERS` |
| Tests | `components/*/*.spec.ts` · `registry/validate.ts` · `.github/workflows/ci.yml` |
| Producto | La app de Next.js (`app/`) |

---

## Estructura

```
AGENTS.md                ← el mapa para cualquier agente
├── tokens/              ← LOS VALORES
│   ├── primitive/       ← qué existe (paleta, escala, fuentes)
│   └── semantic/        ← para qué sirve (colors, typography, size)
├── components/          ← EL CÓDIGO (una carpeta por componente)
│   ├── alert/           ← alert.tsx · alert.css · alert.spec.ts
│   ├── badge/
│   ├── button/
│   ├── card/
│   ├── checkbox/
│   └── input/
├── registry/            ← EL CONTRATO
│   ├── json/            ← Alert.json, Badge.json, Button.json… (obliga · máquinas)
│   ├── md/              ← los mismos en Markdown (explica · personas) [generado]
│   └── validate.ts      ← comprueba que todo cuadra
├── content/             ← voz, microcopy y prosa de marca
├── app/                 ← Next.js: / y /sistema (documentación viva)
├── docs/
│   ├── DESIGN.md        ← la marca en formato DESIGN.md [generado]
│   └── demo-guide.md    ← guion de la demo en directo
├── figma/README.md      ← cómo reflejar el repo en Figma
└── scripts/             ← la "CLI": generadores
```

### Componentes

| Componente | Variantes / estados | Para qué |
|---|---|---|
| `Button` | primary · secondary · tertiary · disabled | Acciones |
| `Card` | cream · warm | Agrupar contenido |
| `Input` | default · hover · focus · error · disabled | Campos de texto con etiqueta, ayuda y error |
| `Checkbox` | unchecked · checked · error · disabled | Opciones independientes |
| `Badge` | neutral · strong · outline | Clasificar o indicar estado |
| `Alert` | info · error | Resultado de una acción importante |

### Los 5 archivos de cada componente

Un componente solo existe si tiene sus 5 archivos. Si falta alguno, `npm run check` falla.

| Archivo | Función |
|---|---|
| `registry/json/<C>.json` | **Contrato:** obliga (a mano) |
| `registry/md/<C>.md` | **Spec:** explica (generado) |
| `components/<c>/<c>.tsx` | **Componente:** construye (a mano) |
| `components/<c>/<c>.css` | **Estilos:** solo tokens del contrato (a mano) |
| `components/<c>/<c>.spec.ts` | **Test:** verifica (a mano) |

### Spec, contrato y test

| Archivo | Función | Pregunta que responde |
|---|---|---|
| `registry/md/Button.md` | **Explica** | ¿Qué es y por qué? |
| `registry/json/Button.json` | **Obliga** | ¿Qué debe cumplirse? |
| `components/button/button.spec.ts` | **Verifica** | ¿Se está cumpliendo? |

### Tokens en dos capas

- **Primitivos** (`tokens/primitive/`): `color.slate.900 = #141413`. Dicen *qué existe*.
- **Semánticos** (`tokens/semantic/`): `color.action.primary.bg → {color.slate.900}`. Dicen *para qué sirve*.

Solo los semánticos se publican como variables CSS. Por eso `color.clay.500` (un acento) existe en la paleta pero **la interfaz no puede usarlo**: no tiene ningún significado asignado. La regla de marca se convierte en estructura.

---

## Empezar

Necesitas Node.js 20 o superior.

```bash
npm install
npm run dev          # genera los tokens y abre http://localhost:3000
```

- `http://localhost:3000`: página de ejemplo hecha solo con componentes del registro.
- `http://localhost:3000/sistema`: documentación viva generada desde tokens y contratos.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run generate` | tokens → `app/tokens.css` + `docs/DESIGN.md`; contratos → `registry/md/` |
| `npm run validate` | Comprueba que el código cumple los contratos |
| `npm test` | Ejecuta las specs (tests) de cada componente |
| `npm run check` | Todo lo anterior. Es lo que ejecuta la CI en cada pull request |

## Añadir un componente nuevo

1. Crea el contrato en `registry/json/<Nombre>.json` (copia uno existente como plantilla).
2. Si necesitas tokens nuevos, añádelos en `tokens/semantic/` apuntando a primitivos.
3. `npm run generate` → crea `registry/md/<Nombre>.md`.
4. Crea `components/<nombre>/` con `.tsx`, `.css` y `.spec.ts`.
5. `npm run check` hasta que todo esté en verde, y abre la pull request.

## Qué comprueba el validador

1. Cada contrato tiene la forma correcta y una versión `x.y.z`.
2. Cada token citado en un contrato existe y es **semántico**.
3. Los archivos del contrato existen.
4. No hay componentes sin contrato en `components/`.
5. El CSS no tiene **hex, rgb, px ni `box-shadow`**, y solo usa los tokens declarados en su contrato.
6. Las variantes del CSS coinciden exactamente con las del contrato.
7. Los archivos generados no se han editado a mano.

Prueba a romperlo: añade `box-shadow: 0 4px 12px #0003;` a `components/card/card.css` y ejecuta `npm run check`.

---

## Usarlo con agentes de IA

1. Abre el repo en Claude Code, Cursor o Codex. El agente lee `AGENTS.md` (Claude Code lo hace vía `CLAUDE.md`).
2. Autentica el servidor MCP de Figma la primera vez que te lo pida.
3. Prueba estos encargos:

**Crear con el registro (repo → Next.js)**
> Crea una página `/recursos` con un titular y tres Cards: la primera en variante warm. Añade un botón primario y uno secundario al final.

> Crea una página `/contacto` con un formulario: nombre, correo con mensaje de error si no es válido, una casilla para aceptar las condiciones y un botón para enviar.

**Implementar un diseño (Figma → repo)**
> Implementa este diseño [enlace de Figma] usando solo los componentes y tokens del repositorio. Si algo del diseño no cumple el contrato, dímelo.

**Llevar el sistema a Figma (repo → Figma)**
> Crea en este archivo de Figma [enlace] dos colecciones de variables, `primitive` y `semantic`, a partir de `tokens/`. Las semánticas deben ser alias de las primitivas.

**Poner a prueba el contrato**
> Añade una sombra a las tarjetas para que destaquen más.

El agente debería avisar de que el contrato lo prohíbe y, si lo hace igualmente, `npm run check` fallará.

Más detalle en [`figma/README.md`](figma/README.md) y en el guion de la demo: [`docs/demo-guide.md`](docs/demo-guide.md).

---

## Gobernanza

- **Una sola fuente de verdad.** Se editan `tokens/` y `registry/json/`; el resto se genera.
- **El contrato primero.** Ningún componente ni variante nueva sin su contrato.
- **Todo cambio por pull request**, con la plantilla de checklist y la CI en verde.
- **Versiones.** Cada contrato tiene su versión `x.y.z` y cada cambio, su entrada en `CHANGELOG.md`.
- **Responsables.** `CODEOWNERS` define quién aprueba tokens, contratos y contenido.
- **Decisiones y dudas por escrito.** Cada contrato guarda sus `decisions` (con su porqué) y sus `openQuestions`.

---

## Sobre la marca de ejemplo

La identidad visual (tinta oscura sobre crema, serif para leer, sin sombras ni acentos) es un **ejemplo didáctico** de sistema editorial monocromo. Las tipografías usan alternativas libres: Georgia, Inter y JetBrains Mono.

## Licencia

MIT · © 2026 Xavier Pascual · [Mokkapp.com](https://mokkapp.com)
