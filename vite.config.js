import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import { resolve } from "path";

// vite-plugin-compression: brotli-compress all JS/CSS/SVG assets.
// Falls back gracefully if the package isn't installed yet.
let compression;
try {
  compression = (await import("vite-plugin-compression")).default;
} catch {
  compression = null;
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    // Brotli compression for all text assets — reduces JS/CSS transfer size
    // by ~25-30% vs gzip. CDN/server must serve .br files with
    // Content-Encoding: br (Cloudflare/Netlify/Vercel do this automatically).
    compression && compression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024, // only compress assets > 1 KB
      deleteOriginFile: false,
    }),
    compression && compression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    cssCodeSplit: true,
    esbuildOptions: {
      drop: ["console", "debugger"],
    },
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── Vendor: React core ────────────────────────────────────────────
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/scheduler/')
          ) return 'vendor-react';

          // ── Vendor: Framer Motion ─────────────────────────────────────────
          // Isolated chunk — only loaded when Nav lazy chunk is requested,
          // which is AFTER the first paint (deferred in App.jsx).
          if (id.includes('node_modules/framer-motion/'))
            return 'vendor-motion';

          // ── Vendor: Sanity npm packages ───────────────────────────────────
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
        },
      },
    },
  },
});
