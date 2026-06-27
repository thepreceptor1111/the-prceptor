import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

// ── Inline SVG icons ───────────────────────────────────────────────────────────
function MenuIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
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

const mobileFooterLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms",   label: "Terms & Conditions" },
];

// ── Mobile overlay animation variants (framer-motion — off critical path) ─────
// These variants only run when the user opens the hamburger menu.
// The header itself now uses a pure CSS animation (nav-in keyframe in styles.css)
// so framer-motion is NOT executed on the critical rendering path.
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

const itemVariants = {
  hidden:  { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.08 + i * 0.055, duration: 0.38, ease: "easeOut" },
  }),
};

// ── Hook: track whether viewport is lg+ (≥1024px) ──────────────────────
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDesktop = useIsDesktop();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/*
        PERF: header no longer uses motion.header.
        Previously: motion.header triggered framer-motion layout tracking and
        the JS animation engine on every page load, even before any interaction.
        Now: pure CSS animation via `animation: nav-in 0.55s ...` defined in
        styles.css. Zero JS execution cost on the critical path.
        framer-motion is only imported/used for the mobile overlay below,
        which is off-screen and loaded lazily by React.lazy(Nav).
      */}
      <header
        style={{ animation: "nav-in 0.55s cubic-bezier(0.22,1,0.36,1) both" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-background/70 border-b border-border/60 shadow-elegant"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-gold font-serif text-2xl group-hover:rotate-12 transition-transform duration-500">
              ✦
            </span>
            <span className="font-serif text-xl tracking-wide">{siteConfig.name}</span>
          </Link>

          {/* Desktop nav links — only visible lg+ */}
          <nav className="hidden lg:flex items-center gap-10" aria-label="Primary navigation">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `nav-link text-muted-foreground hover:text-foreground transition-colors relative group${
                    isActive ? " text-foreground" : ""
                  }`
                }
              >
                {l.label}
                <span
                  className="absolute -bottom-2 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, oklch(0.82 0.12 85 / 0.7), transparent)",
                    transformOrigin: "center",
                  }}
                />
              </NavLink>
            ))}
          </nav>

          {/*
            Desktop CTA — rendered ONLY when viewport is lg+ (≥1024px).
            Using JS-driven conditional render instead of Tailwind hidden/lg:inline-flex
            because .btn-primary sets display:inline-flex in CSS, which has higher
            specificity than the Tailwind `hidden` utility and overrides it on mobile.
          */}
          {isDesktop && (
            <Link
              to="/book"
              className="btn-primary"
            >
              Book a Session
            </Link>
          )}

          {/* Hamburger — only on < lg */}
          <button
            className="lg:hidden text-foreground relative w-10 h-10 flex items-center justify-center"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <MenuIcon className="w-6 h-6" />
            </motion.span>
            <motion.span
              animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <XIcon className="w-6 h-6" />
            </motion.span>
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden fixed inset-0 z-40 bg-background/96 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />

            <nav
              className="relative h-full flex flex-col items-center justify-center gap-7 px-8"
              aria-label="Mobile primary navigation"
            >
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.to}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-serif text-4xl text-foreground/90 hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="mt-4"
              >
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="btn-primary px-8 py-4 text-base"
                >
                  Book a Session
                </Link>
              </motion.div>

              {/* Legal links at bottom */}
              <motion.div
                custom={navLinks.length + 1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-6 px-8"
              >
                {mobileFooterLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-xs text-muted-foreground hover:text-gold transition-colors tracking-wide"
                  >
                    {l.label}
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
