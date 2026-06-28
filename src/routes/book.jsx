import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { SERVICES } from "@/utils/constants";
import { useOfferActive } from "@/hooks/useOfferActive";
import { OfferTimer } from "@/components/site/OfferTimer";

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
function CheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
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
function ArrowLeftIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}
function CalendarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
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
function GlobeIcon({ className }) {
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

export default function BookPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Book a Session — The Preceptor</title>
        <meta name="description" content="Book a private astrology session with The Preceptor. Choose your service and schedule your consultation." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/book" />
      </Helmet>
      <BookPage />
    </>
  );
}

function BookPage() {
  const { settings } = useSiteSettings();
  const services = settings?.services ?? SERVICES ?? [];
  const offerActive = useOfferActive();

  const [step, setStep]               = useState(1);
  const [selected, setSelected]       = useState(null);
  const calendarRef                   = useRef(null);

  const calendlyUrl = selected?.calendlyUrl ?? settings?.defaultCalendlyUrl ?? "https://calendly.com/thepreceptor";

  useEffect(() => {
    if (step !== 2 || !calendarRef.current) return;
    const existing = calendarRef.current.querySelector("iframe, .calendly-inline-widget[data-loaded]");
    if (existing) return;
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => { try { document.head.removeChild(script); } catch {} };
  }, [step]);

  return (
    <div className="relative">

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 starfield" />
        <motion.div
          animate={{ opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.15),transparent_65%)] blur-3xl pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.25em] text-gold">
              <SparklesIcon className="w-3 h-3" /> Private Consultation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 400 }}
            >
              Book a session<br />
              <span className="display-italic text-gold">with the stars.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              Choose your consultation below, then pick a time that works for you. We respond to every booking personally.
            </p>
          </Reveal>
          {offerActive && (
            <Reveal delay={0.3}>
              <div className="mt-6">
                <OfferTimer />
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Step 1 — Choose service */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="py-16 md:py-24"
          >
            <div className="max-w-6xl mx-auto px-6 lg:px-10">
              <Reveal className="text-center mb-12">
                <span className="eyebrow">— Step 1 of 2</span>
                <h2 className="mt-3 text-3xl md:text-4xl">Choose your time</h2>
                <p className="mt-4 text-base md:text-lg text-muted-foreground">Select the consultation that matches your need.</p>
              </Reveal>

              {services.length === 0 ? (
                <p className="text-center text-muted-foreground">No services available yet.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {services.map((s, i) => {
                    const isSelected = selected?.title === s.title;
                    return (
                      <Reveal key={s.title} delay={i * 0.06}>
                        <button
                          onClick={() => setSelected(s)}
                          className={`w-full text-left glass-card rounded-2xl p-6 transition-all duration-300 hover:ring-1 hover:ring-gold/40 ${
                            isSelected ? "ring-2 ring-gold shadow-gold" : ""
                          }`}
                        >
                          {s.badge && (
                            <span className="inline-block mb-3 px-2.5 py-1 rounded-full text-xs uppercase tracking-[0.15em] bg-gold/15 text-gold border border-gold/25">{s.badge}</span>
                          )}
                          <h3 className="text-base font-medium leading-snug">{s.title}</h3>
                          {s.duration && <p className="mt-1.5 text-xs text-muted-foreground">{s.duration}</p>}
                          <div className="mt-3 flex items-baseline gap-2">
                            {offerActive && s.originalPrice && (
                              <span className="text-xs text-muted-foreground line-through">{s.originalPrice}</span>
                            )}
                            <span className="font-semibold text-gold text-lg">
                              {!offerActive && s.originalPrice ? s.originalPrice : s.price}
                            </span>
                          </div>
                          {s.includes && (
                            <ul className="mt-4 space-y-1.5">
                              {s.includes.slice(0, 3).map((inc) => (
                                <li key={inc} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <CheckIcon className="w-3 h-3 text-gold mt-0.5 shrink-0" />
                                  {inc}
                                </li>
                              ))}
                            </ul>
                          )}
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="mt-4 inline-flex items-center gap-1.5 text-xs text-gold"
                            >
                              <CheckIcon className="w-3 h-3" /> Selected
                            </motion.div>
                          )}
                        </button>
                      </Reveal>
                    );
                  })}
                </div>
              )}

              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10 flex justify-center"
                >
                  <button
                    onClick={() => setStep(2)}
                    className="btn-primary group"
                  >
                    Continue to scheduling
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Step 2 — Calendar */}
        {step === 2 && (
          <motion.section
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="py-16 md:py-24"
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-10">
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                >
                  <ArrowLeftIcon className="w-4 h-4" /> Back
                </button>
                <div className="flex-1">
                  <span className="eyebrow">— Step 2 of 2</span>
                  <h2 className="mt-1 text-3xl md:text-4xl">Choose your time</h2>
                </div>
              </div>

              {selected && (
                <div className="mb-8 glass-card rounded-2xl p-5 flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Selected service</p>
                    <p className="mt-1 font-medium">{selected.title}</p>
                    {selected.duration && <p className="text-xs text-muted-foreground mt-0.5">{selected.duration}</p>}
                  </div>
                  <span className="font-serif text-xl text-gold">
                    {!offerActive && selected.originalPrice ? selected.originalPrice : selected.price}
                  </span>
                </div>
              )}

              <div
                ref={calendarRef}
                className="calendly-inline-widget rounded-2xl overflow-hidden"
                data-url={calendlyUrl}
                style={{ width: "100%", minHeight: "clamp(520px, 80vh, 760px)" }}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Trust strip */}
      <section className="py-16 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-30 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { Icon: CalendarIcon, title: "Flexible scheduling", body: "Sessions available across all major timezones, 6 days a week." },
              { Icon: ClockIcon,    title: "Punctual & prepared", body: "Your chart is studied before every session. We start on time, every time." },
              { Icon: GlobeIcon,    title: "Global reach",       body: "Clients from 27 countries. International scheduling handled seamlessly." },
            ].map(({ Icon, title, body }) => (
              <Reveal key={title}>
                <div className="flex flex-col items-center gap-3">
                  <span className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
