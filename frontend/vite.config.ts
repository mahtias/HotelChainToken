import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { nodePolyfills } from "vite-plugin-node-polyfills";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: path.resolve(__dirname),  // frontend folder itself
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        process: true,
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      process: "process/browser",
      util: "util",
      stream: "stream-browserify",
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "../shared"),
    },
  },
  define: {
    global: "globalThis",
    "process.env": {},
    "process.browser": true,
    "process.version": '"v0.0.0"',
  },
});
