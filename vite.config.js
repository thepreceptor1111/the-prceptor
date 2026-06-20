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
    // FIX 5: Target modern browsers — stops Rollup emitting Object.create
    // polyfills and other legacy transforms that bloat the Sanity vendor
    // chunk by ~10 KB and add ~150 ms to LCP.
    target: "es2020",
    // Using Vite's default esbuild minifier (built-in, no extra install needed).
    // drop_console strips all console.* calls from the production bundle.
    // NOTE: terser was previously set here but is NOT installed as a dep;
    // esbuild is faster and sufficient for this project's bundle sizes.
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
    rollupOptions: {
      output: {
        // Split the single monolithic bundle into focused vendor chunks.
        // Each chunk is independently cacheable — updating app code does
        // NOT bust the vendor-react or vendor-motion cache entries.
        manualChunks(id) {
          // React core — smallest, most stable, cache forever
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/react-router-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }
          // Framer Motion — largest single dependency (~180 KB gz)
          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion';
          }
          // Sanity — CMS client + image URL builder
          if (id.includes('node_modules/@sanity/') ||
              id.includes('node_modules/sanity/') ||
              id.includes('node_modules/@portabletext/')) {
            return 'vendor-sanity';
          }
          // UI helpers — icons + helmet
          if (id.includes('node_modules/lucide-react/') ||
              id.includes('node_modules/react-helmet-async/')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
});
