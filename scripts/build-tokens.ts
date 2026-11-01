/**
 * tokens/ → app/tokens.css + docs/DESIGN.md
 *
 * - Solo los tokens SEMÁNTICOS se publican como variables CSS: así es
 *   imposible que un componente use un primitivo.
 * - docs/DESIGN.md se genera para agentes y herramientas que leen ese formato.
 *
 * Uso: npm run tokens        (genera)
 *      npm run tokens -- --check  (comprueba que lo generado está al día)
 */
import { readFileSync } from "node:fs";
import { cssVar, loadTokens, semanticTokens } from "./lib/tokens";
import { emit, finish } from "./lib/write";

const HEADER = "Archivo GENERADO desde tokens/ por scripts/build-tokens.ts. No lo edites a mano: ejecuta npm run tokens.";

const tokens = loadTokens();
const semantic = semanticTokens(tokens);

// 1. Variables CSS ---------------------------------------------------------
const css = [
  `/* ${HEADER} */`,
  ":root {",
  ...semantic.map((t) => `  ${cssVar(t.path)}: ${t.value};`),
  "}",
  "",
].join("\n");
emit("app/tokens.css", css);

// 2. DESIGN.md -------------------------------------------------------------
const v = (path: string) => {
  const t = tokens.get(path);
  if (!t) throw new Error(`DESIGN.md necesita el token ${path}`);
  return t.value;
};
const q = (s: string) => `"${s.replace(/"/g, "'")}"`;

const colors = semantic
  .filter((t) => t.type === "color")
  .map((t) => `  ${t.path.replace(/^color\./, "").replace(/\./g, "-")}: ${q(t.value)}`);

const typo = (name: string, base: string, extra: string[] = []) => [
  `  ${name}:`,
  `    fontFamily: ${q(v(`${base}.family`))}`,
  `    fontSize: ${v(`${base}.size`)}`,
  ...extra.map((e) => `    ${e}`),
];

const designMd = `---
version: alpha
name: Design Contracts
description: >-
  Sistema editorial monocromo de ejemplo para el workshop "Del prompt a la
  especificación", de Xavier Pascual · Mokkapp.com. Tinta oscura sobre
  lienzo crema, sin sombras ni acentos.
colors:
${colors.join("\n")}
typography:
${[
  ...typo("display", "font.display", [`fontWeight: ${v("font.display.weight")}`, "lineHeight: 1.15"]),
  ...typo("title", "font.title", ["lineHeight: 1.3"]),
  ...typo("body", "font.body", ["lineHeight: 1.5"]),
  ...typo("button", "font.button", [`fontWeight: ${v("font.button.weight")}`]),
  ...typo("eyebrow", "font.eyebrow", ["textTransform: uppercase"]),
].join("\n")}
rounded:
  control: ${q(v("size.radius.control"))}
  surface: ${q(v("size.radius.surface"))}
spacing:
${semantic
  .filter((t) => t.path.startsWith("size.space."))
  .map((t) => `  ${t.path.replace("size.space.", "")}: ${q(t.value)}`)
  .join("\n")}
components:
  button-primary:
    backgroundColor: "{colors.action-primary-bg}"
    textColor: "{colors.action-primary-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: ${q(v("size.control.height"))}
  button-secondary:
    backgroundColor: "{colors.action-secondary-bg}"
    textColor: "{colors.action-secondary-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
  card-cream:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.surface}"
    padding: ${q(v("size.space.surface"))}
  card-warm:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.surface}"
    padding: ${q(v("size.space.surface"))}
---

<!-- ${HEADER} La prosa sale de content/brand.md. -->

${readFileSync("content/brand.md", "utf8").trim()}
`;
emit("docs/DESIGN.md", designMd);

finish();
