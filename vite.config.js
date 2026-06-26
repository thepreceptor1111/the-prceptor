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
          // ── Vendor: React core ────────────────────────────────────────────
          // Stable across every deploy → cache forever on CDN.
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react';

          // ── Vendor: Framer Motion ─────────────────────────────────────────
          // 114 KB gzip — isolated so a motion update doesn't bust react cache.
          if (id.includes('node_modules/framer-motion/'))
            return 'vendor-motion';

          // ── Vendor: Sanity npm packages ───────────────────────────────────
          // ONLY the node_modules/@sanity/* packages go here.
          // src/lib/sanity*.js and src/lib/SiteSettingsContext.jsx are
          // deliberately left out so Rollup can resolve the import graph
          // without creating a CJS interop cycle.
          if (
            id.includes('node_modules/@sanity/') ||
            id.includes('node_modules/sanity/') ||
            id.includes('node_modules/@portabletext/')
          ) return 'vendor-sanity';

          // ── Vendor: UI helpers ────────────────────────────────────────────
          if (
            id.includes('node_modules/lucide-react/') ||
            id.includes('node_modules/react-helmet-async/')
          ) return 'vendor-ui';

          // ── src/ files: NO manual chunks ─────────────────────────────────
          //
          // Previously, src/ files were grouped into app-utils / app-sanity
          // manual chunks. This caused a fatal CJS interop cycle:
          //
          //   vendor-sanity (node_modules/@sanity/client)
          //     imports → app-utils (which contained sanityClient.js)
          //     imports → vendor-sanity  ← CYCLE
          //
          // Rollup's CJS shim accesses module.exports of the importer at
          // init time. When app-utils is mid-evaluation the exports object
          // is undefined → TypeError: Cannot read properties of undefined
          // (reading 'exports').
          //
          // Letting Rollup auto-split src/ files resolves this: it builds
          // the correct evaluation order and never creates the cycle.
          // Route-level code splitting (React.lazy) still works because
          // Rollup emits separate async chunks for each lazy() import.
        },
      },
    },
  },
});
