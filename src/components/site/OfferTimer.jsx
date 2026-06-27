import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OFFER_END_DATE } from "@/utils/constants";
import { useSiteSettings } from "@/lib/useSiteSettings";

// ── Inline SVG icon — removes lucide-react dependency ─────────────────────
function ClockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function getTimeLeft(deadline) {
  const diff = new Date(deadline) - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

function Digit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-black/30 border border-gold/20 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0,   opacity: 1 }}
            exit={{    y:  20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute font-mono text-xl sm:text-2xl font-semibold text-gold"
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

// ── Expired fallback — shown instead of nothing when deadline has passed ──
// To reactivate the timer: update offerDeadline in Sanity Studio siteSettings.
function ExpiredBadge({ label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4 py-4"
    >
      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/20 bg-black/20 text-xs uppercase tracking-[0.25em] text-gold/60">
        <ClockIcon className="w-3.5 h-3.5 shrink-0" />
        <span>{label}</span>
      </div>
    </motion.div>
  );
}

export function OfferTimer() {
  const { settings } = useSiteSettings();

  const deadline    = settings?.offerDeadline ?? OFFER_END_DATE;
  const timerLabel  = settings?.offerLabel?.trim()   || "Introductory offer ends in";
  // Editors can customise the expired message from Sanity siteSettings too.
  // Falls back to a sensible default if the field isn't set.
  const expiredLabel = settings?.offerExpiredLabel?.trim()
    || "Introductory offer has ended \u2014 standard pricing now applies";

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    setTimeLeft(getTimeLeft(deadline));
    const id = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1_000);
    return () => clearInterval(id);
  }, [deadline]);

  // ── Expired: show fallback pill instead of an invisible gap ──────────────
  if (!timeLeft) return <ExpiredBadge label={expiredLabel} />;

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80">
        <ClockIcon className="w-3.5 h-3.5" />
        <span>{timerLabel}</span>
      </div>
      <div className="flex items-end gap-2 sm:gap-3">
        <Digit value={timeLeft.days}    label="Days" />
        <span className="text-gold/60 text-2xl font-light mb-5">:</span>
        <Digit value={timeLeft.hours}   label="Hrs" />
        <span className="text-gold/60 text-2xl font-light mb-5">:</span>
        <Digit value={timeLeft.minutes} label="Min" />
        <span className="text-gold/60 text-2xl font-light mb-5">:</span>
        <Digit value={timeLeft.seconds} label="Sec" />
      </div>
    </div>
  );
}
