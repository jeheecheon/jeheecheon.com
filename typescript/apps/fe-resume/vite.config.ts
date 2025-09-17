import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [tailwindcss(), solidPlugin()],
  server: {
    port: 4002,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
