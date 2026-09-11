import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set by the Tauri CLI when a mobile device needs to reach the dev server over the network.
const host = process.env.TAURI_DEV_HOST;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Keep Rust compiler output visible when running under the Tauri CLI.
  clearScreen: false,
  server: {
    port: 5173,
    strictPort: true,
    host: host || undefined,
    hmr: host ? { protocol: "ws", host, port: 5174 } : undefined,
    watch: { ignored: ["**/src-tauri/**"] },
  },
});
