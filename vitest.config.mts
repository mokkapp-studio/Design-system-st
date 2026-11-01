import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["components/**/*.spec.ts"],
    css: false,
  },
});
