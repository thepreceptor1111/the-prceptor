/**
 * AdminPortal — invisible secret entry point to /command-center
 *
 * Trigger: Press  Shift  twice rapidly (within 600ms), then press  P
 * A subtle modal fades in asking for confirmation to navigate.
 * No link anywhere in the UI. Zero footprint when closed.
 */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// ── Inline SVG icons — removes lucide-react dependency ────────────────────
function ShieldIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function AdminPortal() {
  const navigate   = useNavigate();
  const [open, setOpen]   = useState(false);

  // ── Secret sequence detector ───────────────────────────────────────────
  // Sequence: Shift pressed twice within 600ms, then P
  useEffect(() => {
    let shiftCount = 0;
    let shiftTimer = null;
    let awaitingP  = false;
    let pTimer     = null;

    const onKey = (e) => {
      // Don't trigger inside inputs / textareas
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;

      if (e.key === "Shift") {
        shiftCount++;
        clearTimeout(shiftTimer);
        shiftTimer = setTimeout(() => { shiftCount = 0; }, 600);

        if (shiftCount >= 2) {
          shiftCount = 0;
          awaitingP  = true;
          clearTimeout(pTimer);
          // If P not pressed within 1.5s, reset
          pTimer = setTimeout(() => { awaitingP = false; }, 1500);
        }
        return;
      }

      if (awaitingP && e.key.toLowerCase() === "p") {
        awaitingP = false;
        clearTimeout(pTimer);
        setOpen(true);
        return;
      }

      // Any other key resets the sequence
      if (awaitingP) {
        awaitingP = false;
        clearTimeout(pTimer);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onEsc = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open]);

  const enter = useCallback(() => {
    setOpen(false);
    navigate("/command-center");
  }, [navigate]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label="Admin portal"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 10  }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[9999] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-full max-w-xs mx-4"
          >
            <div className="glass-card rounded-2xl p-8 border border-gold/25 shadow-elegant relative overflow-hidden">
              {/* Subtle glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.82_0.12_85_/_0.1),transparent_70%)]" />

              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center
                           text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition"
                aria-label="Close"
              >
                <XIcon className="w-3.5 h-3.5" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center"
                >
                  <ShieldIcon className="w-5 h-5 text-gold" />
                </motion.div>
              </div>

              <h2 className="text-center font-serif text-lg text-gold mb-1">Command Centre</h2>
              <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-8">
                Restricted area detected
              </p>

              <div className="space-y-3">
                <button
                  onClick={enter}
                  autoFocus
                  className="w-full btn-primary justify-center group"
                >
                  Enter
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-muted-foreground
                             hover:text-foreground border border-border hover:border-border/80
                             transition text-center"
                >
                  Dismiss
                </button>
              </div>

              {/* Subtle hint */}
              <p className="mt-6 text-center text-[10px] text-muted-foreground/40 tracking-widest uppercase">
                Press Esc to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
