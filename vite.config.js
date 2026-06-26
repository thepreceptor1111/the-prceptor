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
  build: {
    // Target modern browsers — stops Rollup emitting legacy polyfills.
    target: "es2020",
    // esbuild minifier — faster than terser, no extra install needed.
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
    // FIX 7: Increase warning threshold now that micro-chunks are consolidated.
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Vendor: React core — smallest, most stable, cache forever ──────
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }

          // ── Vendor: Framer Motion — largest single dep, lazy-loaded ────────
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }

          // ── Vendor: Sanity — CMS client + image URL builder ─────────────
          if (id.includes('node_modules/@sanity/') ||
              id.includes('node_modules/sanity/') ||
              id.includes('node_modules/@portabletext/')) {
            return 'vendor-sanity';
          }

          // ── Vendor: UI helpers — icons + helmet ─────────────────────────
          if (id.includes('node_modules/lucide-react/') ||
              id.includes('node_modules/react-helmet-async/')) {
            return 'vendor-ui';
          }

          // FIX 7: Consolidate all small app micro-chunks (< 5 KB) that were
          // previously emitted as individual files (Reveal.js, useLenisResize.js,
          // sanityImage.js, constants.js etc.) — 9+ tiny round-trips → 1.
          // Any src/ file that isn't a route-level chunk lands here.
          if (id.includes('/src/') &&
              !id.includes('/src/routes/') &&
              !id.includes('/src/components/home/') &&
              !id.includes('/src/components/site/')) {
            return 'app-utils';
          }
        },
      },
    },
  },
});
