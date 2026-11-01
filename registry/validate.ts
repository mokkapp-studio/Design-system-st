/**
 * EL GUARDIÁN DEL CONTRATO
 *
 * Comprueba que el registro, los tokens y el código no se contradicen.
 * Se ejecuta en local (npm run validate) y en cada pull request (CI).
 *
 *  1. Cada contrato tiene la forma correcta.
 *  2. Cada token citado existe y es SEMÁNTICO.
 *  3. Los archivos del contrato existen.
 *  4. No hay componentes sin registrar.
 *  5. El CSS solo usa los tokens de su contrato, sin hex, px ni sombras.
 *  6. Las variantes del CSS coinciden con las del contrato.
 */
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { cssVar, loadTokens, semanticTokens } from "../scripts/lib/tokens";
import { loadRegistry, type Contract } from "../scripts/lib/registry";

const errors: string[] = [];
const warnings: string[] = [];
const fail = (where: string, msg: string) => errors.push(`${where}: ${msg}`);

const tokens = loadTokens();
const semanticVars = new Map(semanticTokens(tokens).map((t) => [cssVar(t.path), t.path]));

// Reglas de CSS que aplican a todo el proyecto ------------------------------
const FORBIDDEN: { re: RegExp; msg: string }[] = [
  { re: /#[0-9a-f]{3,8}\b/i, msg: "color hex escrito a mano (usa un token)" },
  { re: /\b(rgb|rgba|hsl|hsla|oklch)\(/i, msg: "color escrito a mano (usa un token)" },
  { re: /\d+(\.\d+)?px\b/, msg: "medida en px escrita a mano (usa un token)" },
  { re: /box-shadow/i, msg: "box-shadow está prohibido por la marca" },
];

function stripComments(css: string) {
  return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

function checkCss(file: string, allowed: Map<string, string>) {
  const css = stripComments(readFileSync(file, "utf8"));
  css.split("\n").forEach((line, i) => {
    for (const { re, msg } of FORBIDDEN) {
      if (re.test(line)) fail(`${file}:${i + 1}`, `${msg} → "${line.trim()}"`);
    }
  });
  for (const [, name] of css.matchAll(/var\((--[a-z0-9-]+)/gi)) {
    if (!allowed.has(name)) {
      const isSemantic = semanticVars.has(name);
      fail(file, isSemantic
        ? `usa ${name}, que existe pero NO está declarado en su contrato`
        : `usa ${name}, que no es un token semántico`);
    }
  }
  return css;
}

// 1–6. Componentes registrados ---------------------------------------------
const registry = loadRegistry();
const SEMVER = /^\d+\.\d+\.\d+$/;
const STATUS = ["draft", "review", "stable", "deprecated"];

for (const c of registry) {
  const where = `registry/json/${c.name}.json`;

  // 1. Forma
  for (const key of ["name", "version", "status", "owner", "description", "files", "props", "tokens", "rules"] as (keyof Contract)[]) {
    if (c[key] === undefined) fail(where, `falta el campo "${key}"`);
  }
  if (!SEMVER.test(c.version)) fail(where, `la versión "${c.version}" no sigue x.y.z`);
  if (!STATUS.includes(c.status)) fail(where, `estado "${c.status}" no válido`);
  for (const [name, p] of Object.entries(c.props ?? {})) {
    if (p.type === "enum" && !p.values?.length) fail(where, `la prop "${name}" es enum pero no tiene values`);
    if (p.type === "enum" && p.default !== undefined && !p.values!.includes(p.default as never))
      fail(where, `el default de "${name}" no está entre sus valores`);
  }

  // 2. Tokens
  const allowed = new Map<string, string>();
  for (const [role, path] of Object.entries(c.tokens ?? {})) {
    const t = tokens.get(path);
    if (!t) fail(where, `el token "${path}" (${role}) no existe`);
    else if (t.layer !== "semantic") fail(where, `el token "${path}" (${role}) es primitivo: usa uno semántico`);
    else allowed.set(cssVar(path), path);
  }

  // 3. Archivos
  for (const [kind, file] of Object.entries(c.files ?? {})) {
    if (!existsSync(file)) fail(where, `no existe el archivo ${kind}: ${file}`);
  }
  if (!existsSync(c.files?.styles ?? "")) continue;

  // 5. CSS
  const css = checkCss(c.files.styles, allowed);
  const used = new Set([...css.matchAll(/var\((--[a-z0-9-]+)/gi)].map((m) => m[1]));
  for (const [name, path] of allowed) {
    if (!used.has(name)) warnings.push(`${where}: el token "${path}" está en el contrato pero el CSS no lo usa`);
  }

  // 6. Variantes
  const block = basename(c.files.styles, ".css");
  const cssVariants = new Set([...css.matchAll(new RegExp(`\\.${block}--([a-z0-9-]+)`, "g"))].map((m) => m[1]));
  const contractVariants = new Set((c.props.variant?.values ?? []).map(String));
  for (const v of cssVariants) if (!contractVariants.has(v)) fail(c.files.styles, `define la variante "${v}", que no está en el contrato`);
  for (const v of contractVariants) if (!cssVariants.has(v)) fail(c.files.styles, `falta la variante "${v}" del contrato`);
}

// 4. Componentes sin registrar ---------------------------------------------
const registered = new Set(registry.map((c) => c.files?.component?.split("/")[1]));
for (const dir of readdirSync("components", { withFileTypes: true })) {
  if (dir.isDirectory() && !registered.has(dir.name)) {
    fail(`components/${dir.name}`, "componente sin contrato: créalo antes en registry/json/");
  }
}

// CSS global de la app: cualquier token semántico, pero ningún valor a mano --
for (const file of readdirSync("app").filter((f) => f.endsWith(".css") && f !== "tokens.css")) {
  checkCss(join("app", file), semanticVars);
}

// Informe --------------------------------------------------------------------
console.log(`\nRegistro: ${registry.length} componentes · Tokens: ${tokens.size} (${semanticVars.size} semánticos)\n`);
warnings.forEach((w) => console.log(`⚠️  ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`❌ ${e}`));
  console.error(`\n${errors.length} incumplimiento(s) del contrato.\n`);
  process.exit(1);
}
console.log("✅ El código cumple los contratos.\n");
