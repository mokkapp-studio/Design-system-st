/**
 * Escribe un archivo generado o, con --check, comprueba que está al día.
 * Así la CI detecta si alguien ha editado a mano un archivo generado.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export const CHECK = process.argv.includes("--check");
let stale = 0;

export function emit(path: string, content: string) {
  const current = existsSync(path) ? readFileSync(path, "utf8") : null;
  if (CHECK) {
    if (current !== content) {
      stale++;
      console.error(`❌ ${path} no está al día. Ejecuta "npm run generate".`);
    } else {
      console.log(`✅ ${path} al día`);
    }
    return;
  }
  writeFileSync(path, content);
  console.log(`✍️  ${path}`);
}

export function finish() {
  if (CHECK && stale > 0) process.exit(1);
}
