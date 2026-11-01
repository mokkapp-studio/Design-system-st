# Guion de la demo en directo (30 min)

*Del prompt a la especificación* · Xavier Pascual · Mokkapp.com

**Objetivo:** demostrar que una especificación es más precisa que un prompt, y que un contrato permite gobernar el trabajo de personas y agentes.

## Preparación

- [ ] `npm install && npm run dev` funcionando (`/` y `/sistema`).
- [ ] Archivo de Figma con variables `primitive` / `semantic`, componentes `Button` y `Card` y sus Specs (ver `figma/README.md`).
- [ ] Claude Code, Cursor o Codex abierto en el repo, con el MCP de Figma autenticado.
- [ ] Un chatbot en una pestaña aparte, **sin** acceso al repo.
- [ ] Rama limpia y una rama `demo-final` de respaldo.
- [ ] Vídeo grabado de cada paso por si falla la conexión.

---

## 0–4 min · El prompt

En el chatbot sin contexto:

> Diseña una tarjeta de artículo y un botón para la web de un estudio de diseño.

Cuenta en voz alta las decisiones que ha tomado la IA por su cuenta: color, radio, sombra, tipografía, texto del botón… **Ese número es tu referencia para el final.**

## 4–10 min · Una decisión, tres lugares

Pantalla dividida:

1. **Figma:** variable `color/action/primary/bg`.
2. **Repo:** `tokens/semantic/colors.json` → `"bg": "{color.slate.900}"`.
3. **Spec:** `registry/md/Button.md`, tabla de tokens.

Enseña después `/sistema`: *"Esta página nadie la ha escrito: se genera desde los tokens y los contratos."*

Momento clave: enseña `clay` en `tokens/primitive/colors.json` y explica que **no tiene token semántico**. La regla de marca "sin acentos" no es un consejo: es estructura.

## 10–15 min · Spec, contrato, test

Abre los tres archivos del botón uno junto a otro:

| `Button.md` | `Button.json` | `button.spec.ts` |
|---|---|---|
| Explica | Obliga | Verifica |

Lee en voz alta una **decisión** del contrato (radio de 8px y por qué) y una **pregunta abierta**.

## 15–22 min · El agente con contrato

En Claude Code, Cursor o Codex:

> Crea una página `/recursos` con un titular y tres Cards: la primera en variante warm. Añade un botón primario y uno secundario al final.

Señala mientras trabaja: lee `AGENTS.md`, consulta el registro, usa `<Card>` y `<Button>`, no escribe colores y termina con `npm run check`.

Después, el intento de romperlo:

> Añade una sombra a las tarjetas para que destaquen más.

- Si el agente se niega o avisa → **el contrato ha funcionado como instrucción**.
- Si lo hace → ejecuta `npm run check` y enseña el ❌. **El contrato ha funcionado como guardián.**

Opcional, desde Figma: selecciona un frame, copia el enlace y pide:

> Implementa este diseño [enlace] usando solo los componentes y tokens del repositorio. Si algo no cumple el contrato, dímelo.

Para el momento más didáctico, prepara en el frame un botón en color `clay`: el agente debería avisar de que no existe en el contrato.

## 22–28 min · Gobernanza: cambiar una decisión

*"Marca quiere que la tinta del botón primario sea algo más suave."*

1. Nueva rama. En `tokens/semantic/colors.json` cambia `action.primary.bg` de `{color.slate.900}` a `{color.slate.700}` y `bg-hover` a `{color.slate.500}`.
2. Ejecuta `npm run check` **sin** generar → ❌ *"app/tokens.css no está al día"*. Nadie puede saltarse la generación.
3. `npm run generate` → `npm run check` → ✅.
4. Sube la versión en `registry/json/Button.json` (1.0.0 → 1.1.0) y añade la entrada en `CHANGELOG.md`.
5. Abre la pull request: aparece la plantilla con la checklist y la CI se ejecuta.
6. Actualiza el alias en Figma (o pídeselo al agente por MCP).

*"Con un prompt, este cambio lo habría hecho cada persona a su manera. Con un contrato tiene autor, motivo, versión, revisión y prueba."*

## 28–30 min · Cierre

| Prompt | Especificación |
|---|---|
| Rápido | Precisa |
| Ambiguo | Versionada |
| Efímero | Compartida |
| Imposible de revisar | Comprobable |

> Las herramientas cambian cada pocos meses. Saber escribir la intención con claridad no caduca.
