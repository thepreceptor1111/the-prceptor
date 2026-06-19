import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // vite-imagetools: processes image imports at build time.
    // Converts JPGs to WebP, strips metadata, applies quality settings.
    // Query params on import (e.g. ?format=webp&quality=80) control output.
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
