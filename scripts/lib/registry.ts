/** Tipos y lectura del registro de componentes (registry/json). */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Prop = {
  type: "enum" | "string" | "boolean" | "node" | "number";
  values?: (string | number)[];
  default?: unknown;
  required?: boolean;
  description?: string;
};

export type Contract = {
  name: string;
  version: string;
  status: "draft" | "review" | "stable" | "deprecated";
  owner: string;
  description: string;
  files: { component: string; styles: string; test: string };
  anatomy: string[];
  props: Record<string, Prop>;
  states: string[];
  tokens: Record<string, string>;
  content?: { guideline: string; maxWords?: number };
  a11y: Record<string, string>;
  rules: { always: string[]; never: string[] };
  decisions: { decision: string; why: string }[];
  openQuestions: string[];
};

export const REGISTRY_DIR = join(process.cwd(), "registry", "json");

export function loadRegistry(): Contract[] {
  return readdirSync(REGISTRY_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort()
    .map((f) => JSON.parse(readFileSync(join(REGISTRY_DIR, f), "utf8")) as Contract);
}
