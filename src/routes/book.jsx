import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Globe2,
  Clock,
  Video,
  Mail,
  ShieldCheck,
  CalendarDays,
  Star,
  User,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";

const CAL_NAMESPACE = "astrology-session";
const CAL_LINK     = "preceptor/astrology-session";
const CAL_ORIGIN   = "https://app.cal.com";

// ─── Book Page ────────────────────────────────────────────────────────────────
export default function BookPage() {
  const [step, setStep]             = useState(0);
  const [bookedData, setBookedData] = useState(null);

  return (
    <>
      <SEO {...PAGE_SEO.book} />
      <div className="bg-hero starfield min-h-screen relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2
                     w-[800px] h-[800px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)" }}
        />
        <section className="relative max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <StepWrap key="intro">
                <IntroStep onStart={() => setStep(1)} />
              </StepWrap>
            )}
            {step === 1 && (
              <StepWrap key="cal">
                <CalStep
                  onBack={() => setStep(0)}
                  onBooked={(data) => { setBookedData(data); setStep(2); }}
                />
              </StepWrap>
            )}
            {step === 2 && (
              <StepWrap key="confirmed">
                <ConfirmedStep bookedData={bookedData} />
              </StepWrap>
            )}
          </AnimatePresence>
        </section>
      </div>
    </>
  );
}

function StepWrap({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Intro ────────────────────────────────────────────────────────────────────
function IntroStep({ onStart }) {
  return (
    <div className="text-center max-w-3xl mx-auto pt-8">
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold"
      >
        <Sparkles className="w-3.5 h-3.5" /> Private Consultation
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-6 text-5xl md:text-7xl leading-[1.05] bg-gradient-gold bg-clip-text text-transparent"
      >
        Begin Your Spiritual Consultation
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
      >
        A calm, private space to explore your chart with clarity and care.
        Each session is crafted around your story, guided by quiet intention.
      </motion.p>

      <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { icon: Clock,  label: "60 minute session" },
          { icon: Video,  label: "Online, private 1:1" },
          { icon: Globe2, label: "Your local timezone" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <item.icon className="w-5 h-5 text-gold mx-auto" />
            <p className="mt-3 text-sm text-foreground/90">{item.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
        className="mt-10 max-w-lg mx-auto glass-card rounded-2xl p-6 text-left"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5 text-center">How it works</p>
        <div className="space-y-4">
          {[
            { icon: CalendarDays, step: "01", text: "Choose your date & time slot" },
            { icon: User,         step: "02", text: "Fill your details & birth info" },
            { icon: Star,         step: "03", text: "Get instant confirmation by email" },
          ].map((row) => (
            <div key={row.step} className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-gold/60 w-6 shrink-0">{row.step}</span>
              <row.icon className="w-4 h-4 text-gold shrink-0" />
              <span className="text-sm text-muted-foreground">{row.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72 }}
        onClick={onStart}
        className="mt-10 btn-primary"
      >
        Choose a Time <ArrowRight className="w-4 h-4" />
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
        className="mt-5 text-xs text-muted-foreground tracking-wide"
      >
        Takes about 3 minutes · Confirmed instantly
      </motion.p>
    </div>
  );
}

// ─── Cal embed ────────────────────────────────────────────────────────────────
/**
 * STRATEGY — clean <script src> approach:
 *
 * 1. On mount, inject ONE <script src="embed.js"> into document.head.
 *    A module-level `embedScriptEl` ref tracks it so we never double-inject.
 *
 * 2. Once embed.js loads (onload), call the three Cal APIs:
 *    - Cal("init", namespace, { origin })
 *    - Cal.ns[namespace]("inline", { elementOrSelector, calLink, config })
 *    - Cal.ns[namespace]("ui", { theme, cssVarsPerTheme })
 *
 * 3. Attach the bookingSuccessful listener immediately after inline().
 *
 * 4. On unmount: remove the script tag, delete window.Cal so the next
 *    mount gets a completely clean state (no stale namespace queue).
 *
 * WHY NO overflow-hidden on wrapper:
 *    Cal renders an <iframe> that expands to its own height. Clipping
 *    it with overflow-hidden on the parent causes the spinner to show
 *    forever because the iframe body never becomes visible.
 */

let embedScriptEl = null;

function CalStep({ onBack, onBooked }) {
  const embedRef = useRef(null);

  useEffect(() => {
    function bootCal() {
      const Cal = window.Cal;
      if (!Cal) return;

      Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });

      Cal.ns[CAL_NAMESPACE]("inline", {
        elementOrSelector: embedRef.current,
        calLink: CAL_LINK,
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      });

      Cal.ns[CAL_NAMESPACE]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "dark",
        cssVarsPerTheme: {
          dark: {
            "cal-bg":             "#14121e",
            "cal-bg-emphasis":    "#1c192d",
            "cal-bg-subtle":      "#1f1c30",
            "cal-bg-muted":       "#18162a",
            "cal-bg-inverted":    "#f5f0e8",
            "cal-text":           "#f0ede6",
            "cal-text-emphasis":  "#faf8f3",
            "cal-text-subtle":    "#9b97a8",
            "cal-text-muted":     "#6b6778",
            "cal-text-inverted":  "#14121e",
            "cal-brand":          "#d4a84b",
            "cal-brand-emphasis": "#e8c068",
            "cal-brand-subtle":   "#2a2318",
            "cal-brand-text":     "#14121e",
            "cal-border":         "rgba(255,255,255,0.08)",
            "cal-border-subtle":  "rgba(255,255,255,0.05)",
            "cal-border-booker":  "rgba(255,255,255,0.07)",
            "cal-border-default": "rgba(255,255,255,0.08)",
          },
        },
      });

      Cal.ns[CAL_NAMESPACE]("on", {
        action: "bookingSuccessful",
        callback: (e) => onBooked(e.detail?.data ?? {}),
      });
    }

    if (embedScriptEl) {
      // Script already in DOM — Cal may or may not have initialised yet.
      // If window.Cal exists, boot immediately; otherwise wait for onload.
      if (window.Cal) {
        bootCal();
      } else {
        embedScriptEl.addEventListener("load", bootCal, { once: true });
      }
    } else {
      const script = document.createElement("script");
      script.src   = "https://app.cal.com/embed/embed.js";
      script.async = true;
      script.addEventListener("load", bootCal, { once: true });
      document.head.appendChild(script);
      embedScriptEl = script;
    }

    return () => {
      // Full teardown so next mount starts clean
      if (embedScriptEl && document.head.contains(embedScriptEl)) {
        document.head.removeChild(embedScriptEl);
      }
      embedScriptEl = null;
      try { delete window.Cal; } catch (_) {}
    };
  }, [onBooked]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.35em] text-gold">Book Your Session</span>
        <h2 className="mt-3 text-4xl md:text-5xl">Choose your time</h2>
        <p className="mt-4 text-muted-foreground">
          Pick a date and slot, then fill in your details on the next screen.
          All times are shown in your local timezone.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
        {[
          { icon: Globe2,       text: "Your local timezone" },
          { icon: Clock,        text: "60 min sessions" },
          { icon: CalendarDays, text: "Available every day" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <item.icon className="w-3.5 h-3.5 text-gold" />
            {item.text}
          </div>
        ))}
      </div>

      {/*
        IMPORTANT: No overflow-hidden on this wrapper.
        Cal's iframe grows to its own height — clipping it causes the
        eternal spinner. Border-radius is applied via border-radius CSS only.
      */}
      <div
        className="mt-8 rounded-3xl shadow-elegant"
        style={{
          background:     "oklch(0.14 0.024 270 / 0.80)",
          border:         "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          ref={embedRef}
          style={{
            width:     "100%",
            minHeight: "clamp(520px, 80vh, 760px)",
          }}
        />
      </div>

      <div className="mt-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full gold-border hover:bg-secondary transition text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}

// ─── Confirmed ────────────────────────────────────────────────────────────────
function ConfirmedStep({ bookedData }) {
  const name      = bookedData?.attendees?.[0]?.name  || "";
  const email     = bookedData?.attendees?.[0]?.email || "";
  const firstName = name.trim().split(" ")[0] || "friend";

  const startTime = bookedData?.startTime
    ? new Date(bookedData.startTime).toLocaleString("en-US", {
        weekday: "long", month: "long", day: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
        timeZoneName: "short",
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center justify-center w-24 h-24 rounded-full"
        style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)" }}
      >
        <CheckCircle2 className="w-14 h-14 text-gold" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="mt-8 text-4xl md:text-5xl bg-gradient-gold bg-clip-text text-transparent"
      >
        Your Session is Confirmed
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        className="mt-4 text-muted-foreground max-w-md mx-auto"
      >
        {firstName !== "friend" ? `Thank you, ${firstName}.` : "Thank you."} Your private
        consultation is booked. A calendar invite and meeting link are on their way to your inbox.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
        className="mt-10 glass-card rounded-3xl p-8 shadow-elegant text-left"
      >
        {startTime && <SummaryRow label="Date & Time" value={startTime} />}
        {name      && <SummaryRow label="Name"        value={name} />}
        {email     && <SummaryRow label="Confirmation sent to" value={email} last />}
        {!startTime && !name && !email && (
          <p className="text-sm text-muted-foreground text-center py-4">Check your email for booking details.</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
        className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
      >
        <Mail className="w-4 h-4 text-gold" />
        Check your inbox for the confirmation email &amp; meeting link.
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        className="mt-5 flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border max-w-md mx-auto"
      >
        <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground text-left">
          Your birth details have been securely noted for session preparation.
        </p>
      </motion.div>
    </div>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-4 ${
      last ? "" : "border-b border-border/60"
    }`}>
      <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm md:text-base sm:text-right">{value}</span>
    </div>
  );
}
