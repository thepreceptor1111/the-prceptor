import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Vendor: React core ──────────────────────────────────────────────
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react';

          // ── Vendor: Framer Motion ──────────────────────────────────────────
          if (id.includes('node_modules/framer-motion/'))
            return 'vendor-motion';

          // ── Vendor: Sanity npm packages ───────────────────────────────────
          if (
            id.includes('node_modules/@sanity/') ||
            id.includes('node_modules/sanity/') ||
            id.includes('node_modules/@portabletext/')
          ) return 'vendor-sanity';

          // ── Vendor: UI helpers ───────────────────────────────────────────────
          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/react-helmet-async/')
          ) return 'vendor-ui';

          // ── App: Sanity client wrappers (src/lib/sanity*) ─────────────────
          //
          // CRITICAL: These files MUST be in their own chunk, separate from
          // both vendor-sanity AND app-utils.
          //
          // The circular chunk warning (vendor-sanity -> app-utils ->
          // vendor-sanity) was caused by sanityClient.js / sanityQueries.js /
          // sanityImage.js landing in app-utils (they match /src/ but not the
          // route/component exclusions). Those files import @sanity/* which is
          // vendor-sanity, and vendor-sanity’s CJS interop shim imports back
          // through the app-utils entry — creating a cycle that makes the CJS
          // `exports` object undefined at runtime (TypeError on boot).
          //
          // By routing them to a dedicated app-sanity chunk the graph becomes:
          //   vendor-sanity  <—  app-sanity  <—  route chunks
          // Linear. No cycle.
          if (
            id.includes('/src/lib/sanity') ||
            id.includes('/src/lib/useSanity')
          ) return 'app-sanity';

          // ── App: all other non-route src/ utilities ────────────────────────
          if (
            id.includes('/src/') &&
            !id.includes('/src/routes/') &&
            !id.includes('/src/components/home/') &&
            !id.includes('/src/components/site/')
          ) return 'app-utils';
        },
      },
    },
  },
});
