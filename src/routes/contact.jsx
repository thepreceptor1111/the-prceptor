import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Reveal } from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";
import contactHeroImg from "@/assets/contact-hero.png";

// ── Inline SVG icons ─────────────────────────────────────────
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
function MapPinIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SendIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
function InstagramIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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
function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
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
function CheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ── Combobox ─────────────────────────────────────────────
function Combobox({ options, value, onChange, placeholder }) {
  const [query, setQuery]     = useState("");
  const [open, setOpen]       = useState(false);
  const [active, setActive]   = useState(-1);
  const wrapRef               = useRef(null);
  const listRef               = useRef(null);

  const filtered = query.trim() === ""
    ? options
    : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    function handler(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (active >= 0 && listRef.current) {
      const el = listRef.current.children[active];
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  function select(opt) {
    onChange(opt);
    setQuery("");
    setOpen(false);
    setActive(-1);
  }

  function handleKey(e) {
    if (!open) { if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true); return; }
    if (e.key === "ArrowDown")  { e.preventDefault(); setActive((p) => Math.min(p + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")    { e.preventDefault(); setActive((p) => Math.max(p - 1, 0)); }
    if (e.key === "Enter")      { e.preventDefault(); if (active >= 0 && filtered[active]) select(filtered[active]); }
    if (e.key === "Escape")     { setOpen(false); setActive(-1); }
  }

  const displayValue = value || "";

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className={`${inputCls} flex items-center gap-2 cursor-text`}
        onClick={() => { setOpen(true); }}
      >
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground/60 min-w-0"
          placeholder={value ? value : placeholder}
          value={open ? query : displayValue}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(-1); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          autoComplete="off"
        />
        <ChevronDownIcon className={`w-4 h-4 text-muted-foreground/50 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute z-50 top-[calc(100%+6px)] left-0 right-0 max-h-56 overflow-y-auto rounded-xl border border-border bg-background shadow-lg py-1"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted-foreground">No match — try another term</li>
            )}
            {filtered.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={opt === value}
                onMouseDown={(e) => { e.preventDefault(); select(opt); }}
                onMouseEnter={() => setActive(i)}
                className={`flex items-center justify-between px-4 py-2.5 text-sm cursor-pointer transition-colors
                  ${ i === active ? "bg-gold/10 text-foreground" : "text-foreground hover:bg-gold/5" }
                `}
              >
                <span>{opt}</span>
                {opt === value && <CheckIcon className="w-3.5 h-3.5 text-gold" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqgogwj";

const consultationTypes = [
  "Quick Personal Insights",
  "General Birth Chart Reading",
  "Detailed Birth Chart Reading",
  "Relationship Guidance",
  "Partner Compatibility",
  "Career Consultation",
  "Marriage Consultation",
  "Current Situation Guidance",
  "Later Life Reading",
  "Mahadasha Guidance",
  "Saturn\u2019s Seven and a Half Guidance",
  "Birth Time Rectification",
  "Not sure yet",
];

const faqs = [
  { q: "How quickly will I receive a response?", a: "Within 24 hours on business days. Urgent inquiries from international clients are prioritized across timezones." },
  { q: "Are conversations confidential?", a: "Always. Every exchange is treated with the discretion of a private practice." },
  { q: "Do you accept international clients?", a: "Yes — we serve seekers across 47 countries with white-glove scheduling and timezone-aware sessions." },
];

const initial = { name: "", email: "", country: "", consultationType: "", subject: "", message: "" };

function validateForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your full name";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Enter a valid email";
  if (!data.subject || data.subject.trim().length < 2) errors.subject = "Please add a subject";
  if (!data.message || data.message.trim().length < 10) errors.message = "Please share a few sentences";
  return errors;
}

// ── Page wrapper ────────────────────────────────────────
export default function ContactPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Contact — Begin Your Journey | The Preceptor</title>
        <meta name="description" content="Reach The Preceptor for premium private astrology consultations. White-glove onboarding for clients in the US and worldwide." />
        <meta property="og:title" content="Contact The Preceptor" />
        <meta property="og:description" content="Begin your journey towards clarity with a private spiritual consultation." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/contact" />
      </Helmet>
      <ContactPage />
    </>
  );
}

// ── Main page ─────────────────────────────────────────
function ContactPage() {
  const [data, setData]               = useState(initial);
  const [errors, setErrors]           = useState({});
  const [sent, setSent]               = useState(false);
  const [sending, setSending]         = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [openFaq, setOpenFaq]         = useState(0);

  const update = (k) => (e) => setData((prev) => ({ ...prev, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const fieldErrors = validateForm(data);
    if (Object.keys(fieldErrors).length > 0) { setErrors(fieldErrors); return; }
    setErrors({});
    setSubmitError(false);
    setSending(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSent(true); setData(initial); }
      else setSubmitError(true);
    } catch { setSubmitError(true); }
    finally { setSending(false); }
  };

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-36">
        <div className="absolute inset-0 bg-hero" />
        <div className="absolute inset-0 starfield" />
        <motion.div
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.18),transparent_65%)] blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-10 -left-20 w-[55%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.22),transparent_65%)] blur-3xl pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.25em] text-gold">
              <SparklesIcon className="w-3 h-3" /> Private Consultation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}>
              Begin your journey<br />
              <span className="display-italic text-gold">towards clarity.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              A quiet conversation can shift the trajectory of a decade. Share what&#39;s on your mind — we respond personally within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><ClockIcon className="w-3.5 h-3.5 text-gold" /> 24h response</span>
              <span className="inline-flex items-center gap-2"><Globe2Icon className="w-3.5 h-3.5 text-gold" /> All timezones</span>
              <span className="inline-flex items-center gap-2"><ShieldCheckIcon className="w-3.5 h-3.5 text-gold" /> Strictly confidential</span>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 mx-auto max-w-2xl rounded-2xl overflow-hidden ring-1 ring-gold/20">
              <img src={contactHeroImg} alt="The Preceptor — Private Consultation" className="w-full h-auto object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Info column */}
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <span className="eyebrow">— Direct Channels</span>
              <h2 className="mt-5 text-4xl md:text-5xl text-balance">A private line to the studio.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
                Whether you&#39;re booking a session, planning a partnership, or seeking press — the inbox below reaches us personally.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-6">
                {[
                  { Icon: MailIcon,   label: "Email",  value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { Icon: MapPinIcon, label: "Studio", value: "Worldwide · Online consultations" },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
                      {href
                        ? <a href={href} className="mt-1 block text-foreground hover:text-gold transition">{value}</a>
                        : <p className="mt-1 text-foreground">{value}</p>
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <div>
                <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground mb-4">Follow the practice</p>
                <div className="flex gap-3">
                  {[
                    { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
                  ].map(({ Icon, href, label }) => (
                    <a key={label} href={href} aria-label={label}
                      className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-gold hover:scale-110 hover:shadow-gold transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <form onSubmit={submit} className="relative glass-card rounded-3xl p-8 md:p-10 shadow-elegant">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-30 pointer-events-none" />

              {sent && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="relative mb-6 p-4 rounded-xl border border-gold/40 bg-gold/10 text-sm text-foreground">
                  ✨ Thank you — your message has reached the studio. We respond personally within 24 hours.
                </motion.div>
              )}
              {submitError && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="relative mb-6 p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-sm text-foreground">
                  Something went wrong — please try again or email us directly at{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-gold underline">{siteConfig.email}</a>.
                </motion.div>
              )}

              <div className="relative grid sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.name}>
                  <input value={data.name} onChange={update("name")} className={inputCls} placeholder="Your name" />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={data.email} onChange={update("email")} className={inputCls} placeholder="you@email.com" />
                </Field>
                <Field label="Country (optional)" error={errors.country} className="sm:col-span-2">
                  <input value={data.country} onChange={update("country")} className={inputCls} placeholder="United States" />
                </Field>
                <Field label="Consultation Type" error={errors.consultationType} className="sm:col-span-2">
                  <Combobox
                    options={consultationTypes}
                    value={data.consultationType}
                    onChange={(v) => setData((prev) => ({ ...prev, consultationType: v }))}
                    placeholder="Type to search or scroll"
                  />
                </Field>
                <Field label="Subject" error={errors.subject} className="sm:col-span-2">
                  <input value={data.subject} onChange={update("subject")} className={inputCls} placeholder="What can we help you with?" />
                </Field>
                <Field label="Your Message" error={errors.message} className="sm:col-span-2">
                  <textarea rows={6} value={data.message} onChange={update("message")} className={`${inputCls} resize-none`} placeholder="Share what&#39;s on your mind" />
                </Field>
              </div>

              <div className="relative mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <p className="text-xs text-muted-foreground max-w-sm">
                  Your details remain strictly confidential. Used only to respond to your inquiry.
                </p>
                <button type="submit" disabled={sending || sent}
                  className="btn-primary group disabled:opacity-60 disabled:cursor-not-allowed">
                  {sending ? "Sending" : sent ? "Message Sent" : "Send Message"}
                  {!sending && !sent && <SendIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 md:py-32 bg-deep overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center">
            <span className="eyebrow">— Reassurance</span>
            <h2 className="mt-5 text-4xl md:text-5xl text-balance">A few things worth knowing.</h2>
          </Reveal>
          <div className="mt-14 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="glass-card rounded-2xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left">
                    <span className="font-serif text-lg">{f.q}</span>
                    <ChevronDownIcon className={`w-5 h-5 text-gold transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <a href="/book" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all">
                Or skip ahead — book a session <ArrowRightIcon className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full bg-secondary/40 border border-border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-gold focus:bg-secondary/60 focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all duration-300";

function Field({ label, error, children, className }) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="block text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</span>
      {children}
      {error && <span className="block mt-2 text-xs text-destructive">{error}</span>}
    </label>
  );
}
