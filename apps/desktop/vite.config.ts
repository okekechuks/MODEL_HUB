import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: resolve(projectRoot, "src/renderer"),
  plugins: [react()],
  build: {
    outDir: resolve(projectRoot, "dist/renderer"),
    emptyOutDir: true,
  },
});
