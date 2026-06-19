import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

export default function NotFoundPage() {

  return (
    <>
      <SEO {...PAGE_SEO.notFound} robots="noindex, nofollow" />

      <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Cosmic background */}
        <div className="absolute inset-0 starfield" aria-hidden />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,oklch(0.28_0.10_255_/_0.35),transparent_65%)]" />

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="font-serif text-[8rem] leading-none bg-gradient-gold"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              404
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="mt-6 text-2xl md:text-3xl" style={{ fontFamily: "var(--font-serif)" }}>
              Lost in the cosmos.
            </h1>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              The stars aligned — just not to this page. It may have moved, been removed, or never existed.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition"
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                <Home className="w-4 h-4" /> Return Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
            </div>
          </motion.div>

          {/* Floating star */}
          <motion.span
            animate={{ y: [0, -18, 0], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-16 right-16 text-gold text-4xl select-none"
            aria-hidden
          >
            ✦
          </motion.span>
        </div>
      </main>
    </>
  );
}
