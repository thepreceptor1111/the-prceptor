import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "@/content/site";

const mobileFooterLinks = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms",   label: "Terms & Conditions" },
];

// ── Animation variants ─────────────────────────────────────────────────────
// Header: simple clean fade-drop — one motion, no drama.
const headerVariants = {
  hidden:  { y: -8, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Mobile overlay: elegant fade only — no sliding, no scaling.
const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, transition: { duration: 0.22, ease: "easeIn" } },
};

// Mobile nav items: stagger from opacity only — no y movement (cleaner).
const itemVariants = {
  hidden:  { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: 0.08 + i * 0.055, duration: 0.38, ease: "easeOut" },
  }),
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Desktop / main header ───────────────────────────────────── */}
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
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

          {/* Desktop nav links */}
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
                {/* Slim gold underline on hover / active */}
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

          {/* Desktop CTA */}
          <Link
            to="/book"
            className="hidden lg:inline-flex items-center px-6 py-2.5 rounded-full bg-primary text-primary-foreground btn-text hover:scale-[1.03] hover:shadow-gold transition-all duration-300"
          >
            Book a Session
          </Link>

          {/* Hamburger — morphs Menu ↔ X */}
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
              <Menu className="w-6 h-6" />
            </motion.span>
            <motion.span
              animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              <X className="w-6 h-6" />
            </motion.span>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ──────────────────────────────── */}
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
            {/* Subtle nebula tint behind links */}
            <div className="absolute inset-0 bg-hero opacity-50 pointer-events-none" />

            <nav
              className="relative h-full flex flex-col items-center justify-center gap-7 px-8"
              aria-label="Mobile primary navigation"
            >
              {/* Primary links */}
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

              {/* Book CTA */}
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
                  className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-gold"
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
