// src/routes/admin.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Eye, EyeOff, Shield, ExternalLink, Calendar, LayoutDashboard,
} from "lucide-react";
import BlockTimePanel    from "@/components/BlockTimePanel";
import RestrictHoursPanel from "@/components/RestrictHoursPanel";

// ── Auth ────────────────────────────────────────────────────────────────────────────
const SESSION_KEY  = "tp_admin_unlocked";
const CORRECT_PASS = import.meta.env.VITE_ADMIN_PASS ?? "preceptor-admin-2024";

function useAdminAuth() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true"
  );
  const unlock = (pass) => {
    if (pass === CORRECT_PASS) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      return true;
    }
    return false;
  };
  const lock = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
  };
  return { unlocked, unlock, lock };
}

// ── Lock Screen ─────────────────────────────────────────────────────────────────────
function LockScreen({ onUnlock }) {
  const [pass, setPass]   = useState("");
  const [show, setShow]   = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const ok = onUnlock(pass);
    if (!ok) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setTimeout(() => setError(false), 2500);
      setPass("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-hero starfield relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,oklch(0.55_0.08_310_/_0.22),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[50%] blur-3xl bg-[radial-gradient(ellipse,oklch(0.82_0.12_85_/_0.08),transparent_65%)]" />

      <motion.div
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm mx-6"
      >
        <div className="glass-card rounded-3xl p-10 shadow-elegant border border-gold/20">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <Shield className="w-7 h-7 text-gold" />
            </div>
          </div>

          <h1 className="text-center text-2xl font-serif text-gold mb-1">Command Centre</h1>
          <p className="text-center text-xs text-muted-foreground tracking-widest uppercase mb-8">
            Restricted Access
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Enter passphrase"
                autoFocus
                className={`w-full bg-secondary/40 border rounded-xl px-4 py-3.5 text-sm pr-12
                  placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all
                  ${
                    error
                      ? "border-red-400/60 focus:ring-red-400/20 focus:border-red-400"
                      : "border-border focus:border-gold focus:ring-gold/20"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold transition"
                aria-label={show ? "Hide passphrase" : "Show passphrase"}
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-red-400 text-center"
                >
                  Incorrect passphrase. Try again.
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit" className="w-full btn-primary justify-center flex items-center gap-2">
              <Lock className="w-4 h-4" /> Unlock
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────────
const SANITY_URL = "https://thepreceptor.sanity.studio";
const CAL_URL    = "https://app.cal.com/event-types";

function AdminDashboard({ onLock }) {
  return (
    <div className="min-h-screen flex flex-col bg-hero relative overflow-hidden">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-gold/15 bg-background/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-gold" />
          <span className="text-sm font-serif text-gold tracking-wide">Command Centre</span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground px-2 py-0.5 rounded-full border border-border">
            Private
          </span>
        </div>
        <button
          onClick={onLock}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs border border-border text-muted-foreground hover:border-red-400/50 hover:text-red-400 transition"
        >
          <Lock className="w-3.5 h-3.5" /> Lock Session
        </button>
      </header>

      {/* Cards */}
      <div className="max-w-5xl mx-auto px-6 py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-serif text-gold mb-2">Welcome back.</h2>
          <p className="text-muted-foreground text-sm mb-12">Your tools, one place.</p>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* ── Sanity Studio ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-8 group relative overflow-hidden border border-gold/10 hover:border-gold/35 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.12_85_/_0.07),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/25 flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-xl font-serif mb-3">Sanity Studio</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  Edit services, testimonials, FAQs, hero copy, site stats — all CMS content lives here.
                </p>
                <p className="text-xs text-muted-foreground/60 italic mb-8">
                  Opens in a new tab (iframe blocked by Sanity’s security headers).
                </p>
                <a
                  href={SANITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-gold text-xs hover:bg-gold/25 transition"
                >
                  Open Sanity Studio <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* ── Cal.com ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-8 group relative overflow-hidden border border-gold/10 hover:border-gold/35 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.52_0.09_280_/_0.09),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-xl font-serif mb-3">Cal.com Dashboard</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                  View upcoming bookings, manage availability, reschedule, and edit event types.
                </p>
                <p className="text-xs text-muted-foreground/60 italic mb-8">
                  Opens in a new tab (iframe blocked by Cal.com’s security headers).
                </p>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-gold text-xs hover:bg-gold/25 transition"
                >
                  Open Cal.com <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* ── Availability Controls (full-width section header) ── */}
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5" /> Availability Controls
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Full-day block */}
                <BlockTimePanel />
                {/* Custom hour restriction */}
                <RestrictHoursPanel />
              </div>
            </div>
          </div>

          {/* Quick links row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 p-6 glass-card rounded-2xl border border-border/50 flex flex-wrap gap-4 items-center"
          >
            <span className="text-xs text-muted-foreground uppercase tracking-widest mr-2">Quick Links</span>
            {[
              { label: "Sanity Manage",    href: "https://www.sanity.io/manage" },
              { label: "Cal.com Settings", href: "https://app.cal.com/settings" },
              { label: "Vercel Dashboard", href: "https://vercel.com/dashboard" },
              { label: "GitHub Repo",      href: "https://github.com/archijain23/the-preceptor" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition px-3 py-1.5 rounded-full border border-border hover:border-gold/30"
              >
                {label} <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ── Page export ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const { unlocked, unlock, lock } = useAdminAuth();
  return unlocked
    ? <AdminDashboard onLock={lock} />
    : <LockScreen onUnlock={unlock} />;
}
