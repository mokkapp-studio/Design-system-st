/**
 * registry/json/*.json → registry/md/*.md
 *
 * El JSON es el contrato (para máquinas). El Markdown es la misma
 * información para personas, para LLMs y para pegar en Figma Specs.
 *
 * Uso: npm run registry:md            (genera)
 *      npm run registry:md -- --check (comprueba que está al día)
 */
import { loadTokens } from "./lib/tokens";
import { loadRegistry, type Contract } from "./lib/registry";
import { emit, finish } from "./lib/write";

const tokens = loadTokens();

const status: Record<Contract["status"], string> = {
  draft: "📝 Borrador",
  review: "👀 En revisión",
  stable: "✅ Estable",
  deprecated: "⛔ Obsoleto",
};

const fmt = (v: unknown) => (v === undefined ? "—" : `\`${JSON.stringify(v)}\``);

function render(c: Contract): string {
  const props = Object.entries(c.props).map(([name, p]) => {
    const type = p.type === "enum" ? p.values!.map((x) => `\`${x}\``).join(" · ") : `\`${p.type}\``;
    return `| \`${name}\` | ${type} | ${fmt(p.default)} | ${p.required ? "Sí" : "No"} | ${p.description ?? ""} |`;
  });

  const toks = Object.entries(c.tokens).map(([role, path]) => {
    const t = tokens.get(path);
    return `| ${role} | \`${path}\` | \`${t ? t.value : "⚠️ no existe"}\` |`;
  });

  return `<!-- Archivo GENERADO desde registry/json/${c.name}.json por scripts/build-registry-md.ts. Edita el JSON y ejecuta npm run registry:md. -->

# ${c.name} · v${c.version}

**Estado:** ${status[c.status]} · **Responsable:** ${c.owner}

${c.description}

## Archivos
- Componente: \`${c.files.component}\`
- Estilos: \`${c.files.styles}\`
- Test: \`${c.files.test}\`
- Contrato: \`registry/json/${c.name}.json\`

## Anatomía
${c.anatomy.map((a, i) => `${i + 1}. ${a}`).join("\n")}

## Props
| Prop | Tipo / valores | Por defecto | Obligatoria | Descripción |
|---|---|---|---|---|
${props.join("\n")}

## Estados
${c.states.map((s) => `\`${s}\``).join(" · ")}

## Tokens
Solo se pueden usar estos tokens semánticos.

| Rol | Token | Valor |
|---|---|---|
${toks.join("\n")}
${c.content ? `
## Contenido
Sigue \`${c.content.guideline}\`.${c.content.maxWords ? ` Máximo ${c.content.maxWords} palabras.` : ""}
` : ""}
## Accesibilidad
${Object.entries(c.a11y).map(([k, v]) => `- **${k}:** ${v}`).join("\n")}

## Contrato
**Siempre**
${c.rules.always.map((r) => `- ${r}`).join("\n")}

**Nunca**
${c.rules.never.map((r) => `- ${r}`).join("\n")}

## Decisiones
${c.decisions.map((d) => `- **${d.decision}.** ${d.why}`).join("\n")}

## Preguntas abiertas
${c.openQuestions.length ? c.openQuestions.map((q) => `- ${q}`).join("\n") : "- Ninguna"}
`;
}

for (const c of loadRegistry()) emit(`registry/md/${c.name}.md`, render(c));
finish();
