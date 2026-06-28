import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

// ── Inline SVG icons — no lucide-react ──────────────────────────
function ArrowRightIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
function ArrowLeftIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
    </svg>
  );
}
function CheckCircle2Icon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}
function Globe2Icon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function VideoIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m22 8-6 4 6 4V8z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </svg>
  );
}
function MailIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function ShieldCheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function CalendarDaysIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
      <path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
    </svg>
  );
}
function StarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function UserIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function AlertTriangleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}
function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

const CAL_NAMESPACE = "astrology-session";
const CAL_LINK     = "preceptor/astrology-session";
const CAL_ORIGIN   = "https://app.cal.com";
const EMBED_ID     = "cal-embed-astrology";

let calStubInjected  = false;
let calSrcInjected   = false;

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

function IntroStep({ onStart }) {
  return (
    <div className="text-center max-w-3xl mx-auto pt-8">
      <motion.span
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold"
      >
        <SparklesIcon className="w-3.5 h-3.5" /> Private Consultation
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-6 leading-[1.05] bg-gradient-gold bg-clip-text text-transparent"
        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 5.5rem)" }}
      >
        Begin Your Spiritual Consultation
      </motion.h1>

      {/*
        Inline textAlign:"center" is required here.
        The global styles.css rule  p, li, figcaption { text-wrap: pretty }
        causes Chromium to reset text-align to "start" on constrained <p> blocks
        (max-w-xl creates a new block formatting context).
        Tailwind utility text-center loses the cascade battle against that global
        rule in Tailwind v4's @layer ordering. Inline style wins unconditionally.
      */}
      <motion.p
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto"
        style={{ textAlign: "center" }}
      >
        A calm, private space to explore your chart with clarity and care.
        Each session is crafted around your story, guided by quiet intention.
      </motion.p>

      <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        {[
          { icon: ClockIcon,  label: "60 minute session" },
          { icon: VideoIcon,  label: "Online, private 1:1" },
          { icon: Globe2Icon, label: "Your local timezone" },
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
            { icon: CalendarDaysIcon, step: "01", text: "Choose your date & time slot" },
            { icon: UserIcon,         step: "02", text: "Fill your details & birth info" },
            { icon: StarIcon,         step: "03", text: "Get instant confirmation by email" },
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
        Choose a Time <ArrowRightIcon className="w-4 h-4" />
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

function BookingFailedBanner({ onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative mb-6 rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, oklch(0.18 0.025 270 / 0.95), oklch(0.14 0.022 270 / 0.95))",
        border: "1px solid oklch(0.82 0.12 85 / 0.35)",
        boxShadow: "0 0 32px -8px oklch(0.82 0.12 85 / 0.18)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
      <div className="p-5 flex items-start gap-4">
        <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.82 0.12 85 / 0.12)", border: "1px solid oklch(0.82 0.12 85 / 0.30)" }}
        >
          <AlertTriangleIcon className="w-4 h-4 text-gold" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground leading-snug">
            We couldn't complete your booking.
          </p>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
            This usually happens when the selected time slot doesn't align with your timezone.
            Please <strong className="text-foreground font-medium">try a different time slot</strong>,
            or reach us directly and we'll schedule your session manually.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Session%20Booking%20Help`}
            className="inline-flex items-center gap-1.5 mt-3 text-xs text-gold hover:text-gold/80 transition-colors"
          >
            <MailIcon className="w-3.5 h-3.5" />
            {siteConfig.email}
          </a>
        </div>
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all"
        >
          <XIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function CalStep({ onBack, onBooked }) {
  const [bookingFailed, setBookingFailed] = useState(false);

  useEffect(() => {
    if (!calStubInjected) {
      const stub = document.createElement("script");
      stub.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns  = {};
              cal.q   = cal.q || [];
              cal.loaded = false;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const ns  = ar[1];
              api.q = api.q || [];
              if (typeof ns === "string") {
                cal.ns[ns] = cal.ns[ns] || api;
                p(cal.ns[ns], ar);
                p(cal, ["initNamespace", ns]);
              } else { p(cal, ar); }
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");
      `;
      document.head.appendChild(stub);
      calStubInjected = true;
    }

    if (window.Cal?.loaded) {
      try {
        window.Cal.ns[CAL_NAMESPACE]("on", {
          action:   "bookingSuccessful",
          callback: (e) => onBooked(e.detail?.data ?? {}),
        });
        window.Cal.ns[CAL_NAMESPACE]("on", {
          action:   "bookingFailed",
          callback: () => setBookingFailed(true),
        });
      } catch (_) {}
      return;
    }

    window.Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });

    window.Cal.ns[CAL_NAMESPACE]("inline", {
      elementOrSelector: `#${EMBED_ID}`,
      calLink:           CAL_LINK,
      config:            { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
    });

    window.Cal.ns[CAL_NAMESPACE]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
      theme:  "dark",
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

    window.Cal.ns[CAL_NAMESPACE]("on", {
      action:   "bookingSuccessful",
      callback: (e) => onBooked(e.detail?.data ?? {}),
    });

    window.Cal.ns[CAL_NAMESPACE]("on", {
      action:   "bookingFailed",
      callback: () => setBookingFailed(true),
    });

    if (!calSrcInjected) {
      const src = document.createElement("script");
      src.src   = "https://app.cal.com/embed/embed.js";
      src.async = true;
      document.head.appendChild(src);
      calSrcInjected = true;
    }

    return () => {
      const container = document.getElementById(EMBED_ID);
      if (container) container.innerHTML = "";
    };
  }, [onBooked]);

  return (
    <div className="max-w-5xl mx-auto text-center">
      <div className="max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.35em] text-gold">Book Your Session</span>
        <h2 className="mt-3 text-4xl md:text-5xl">Choose your time</h2>
        <p className="mt-4 text-muted-foreground" style={{ textAlign: "center" }}>
          Pick a date and slot, then fill in your details on the next screen.
          All times are shown in your local timezone.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
        {[
          { icon: Globe2Icon,       text: "Your local timezone" },
          { icon: ClockIcon,        text: "60 min sessions" },
          { icon: CalendarDaysIcon, text: "Available every day" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <item.icon className="w-3.5 h-3.5 text-gold" />
            {item.text}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {bookingFailed && (
          <div className="mt-6 text-left">
            <BookingFailedBanner onDismiss={() => setBookingFailed(false)} />
          </div>
        )}
      </AnimatePresence>

      <div
        className="mt-8 rounded-3xl shadow-elegant"
        style={{
          background:     "oklch(0.14 0.024 270 / 0.80)",
          border:         "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          id={EMBED_ID}
          style={{ width: "100%", minHeight: "clamp(520px, 80vh, 760px)" }}
        />
      </div>

      <div className="mt-5 flex justify-start">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full gold-border hover:bg-secondary transition text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back
        </button>
      </div>
    </div>
  );
}

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
        <CheckCircle2Icon className="w-14 h-14 text-gold" />
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
        style={{ textAlign: "center" }}
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
        <MailIcon className="w-4 h-4 text-gold" />
        Check your inbox for the confirmation email &amp; meeting link.
      </motion.div>

      {/* Privacy note card — intentionally text-left scoped to the card itself */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
        className="mt-5 flex items-start gap-3 p-4 rounded-2xl bg-secondary/40 border border-border max-w-md mx-auto text-left"
      >
        <ShieldCheckIcon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
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
