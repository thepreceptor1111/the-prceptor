import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";
import { OFFER_END_DATE } from "@/utils/constants";
import { useSiteSettings } from "@/lib/useSiteSettings";

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

export function OfferTimer() {
  const { settings } = useSiteSettings();
  // Use Sanity deadline if set, otherwise fall back to the constant
  const deadline = settings?.offerDeadline ?? OFFER_END_DATE;

  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(deadline));

  useEffect(() => {
    setTimeLeft(getTimeLeft(deadline));
    const id = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1_000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!timeLeft) return null;

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80">
        <Clock className="w-3.5 h-3.5" />
        <span>Introductory offer ends in</span>
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
