/**
 * Lectura y resolución de tokens (formato DTCG simplificado).
 * Lo usan los scripts de generación, el validador y la página /sistema.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Layer = "primitive" | "semantic";

export type Token = {
  path: string; // p. ej. "color.action.primary.bg"
  layer: Layer;
  type: string;
  rawValue: unknown; // tal como está escrito (puede ser un alias "{...}")
  value: string; // valor final resuelto, listo para CSS
  description?: string;
  aliasOf?: string; // si el token apunta a otro
};

const ROOT = process.cwd();

function readLayer(layer: Layer): Record<string, any>[] {
  const dir = join(ROOT, "tokens", layer);
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(dir, f), "utf8")));
}

function walk(node: Record<string, any>, prefix: string[], layer: Layer, out: Map<string, Omit<Token, "value">>) {
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    const path = [...prefix, key];
    if (child && typeof child === "object" && "$value" in child) {
      const id = path.join(".");
      if (out.has(id)) throw new Error(`Token duplicado: ${id}`);
      out.set(id, {
        path: id,
        layer,
        type: child.$type,
        rawValue: child.$value,
        description: child.$description,
        aliasOf: typeof child.$value === "string" && child.$value.startsWith("{") ? child.$value.slice(1, -1) : undefined,
      });
    } else if (child && typeof child === "object") {
      walk(child, path, layer, out);
    }
  }
}

function toCss(type: string, value: unknown): string {
  if (type === "dimension" && value && typeof value === "object") {
    const v = value as { value: number; unit: string };
    return `${v.value}${v.unit}`;
  }
  if (type === "fontFamily" && Array.isArray(value)) {
    return value.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
  }
  return String(value);
}

export function loadTokens(): Map<string, Token> {
  const raw = new Map<string, Omit<Token, "value">>();
  for (const layer of ["primitive", "semantic"] as Layer[]) {
    for (const file of readLayer(layer)) walk(file, [], layer, raw);
  }

  const resolved = new Map<string, Token>();
  const resolve = (id: string, seen: string[] = []): string => {
    if (seen.includes(id)) throw new Error(`Alias circular: ${[...seen, id].join(" → ")}`);
    const t = raw.get(id);
    if (!t) throw new Error(`El alias {${id}} no existe${seen.length ? ` (lo usa ${seen.at(-1)})` : ""}`);
    if (t.aliasOf) return resolve(t.aliasOf, [...seen, id]);
    return toCss(t.type, t.rawValue);
  };

  for (const [id, t] of raw) {
    if (t.layer === "semantic" && !t.aliasOf) {
      throw new Error(`El token semántico ${id} debe apuntar a un primitivo (alias), no tener un valor directo.`);
    }
    if (t.aliasOf && raw.get(t.aliasOf)?.layer === "semantic" && t.layer === "primitive") {
      throw new Error(`El primitivo ${id} no puede apuntar a un semántico.`);
    }
    resolved.set(id, { ...t, value: resolve(id) });
  }
  return resolved;
}

/** Nombre de la variable CSS de un token: color.action.primary.bg → --color-action-primary-bg */
export const cssVar = (path: string) => `--${path.replace(/\./g, "-")}`;

export const semanticTokens = (tokens: Map<string, Token>) =>
  [...tokens.values()].filter((t) => t.layer === "semantic");
