import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// ── Inline SVG icons — removes lucide-react dependency ────────────────────
function ArrowLeftIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}

function HomeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function RefreshCwIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

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
                <ArrowLeftIcon className="w-4 h-4" /> Go Back
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition"
              >
                <HomeIcon className="w-4 h-4" /> Return Home
              </Link>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition"
              >
                <RefreshCwIcon className="w-4 h-4" /> Try Again
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
