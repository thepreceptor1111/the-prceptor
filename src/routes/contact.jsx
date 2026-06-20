import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Instagram, Youtube, Linkedin, Clock, Globe2, ShieldCheck, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

export default function ContactPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Contact — Begin Your Journey | The Preceptor</title>
        <meta name="description" content="Reach The Preceptor for premium private astrology consultations. White-glove onboarding for clients in the US and worldwide." />
        <meta property="og:title" content="Contact The Preceptor" />
        <meta property="og:description" content="Begin your journey toward clarity with a private spiritual consultation." />
      </Helmet>
      <ContactPage />
    </>
  );
}

function validateForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = "Please enter your full name";
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email = "Enter a valid email";
  if (!data.subject || data.subject.trim().length < 2) errors.subject = "Please add a subject";
  if (!data.message || data.message.trim().length < 10) errors.message = "Please share a few sentences";
  return errors;
}

const initial = { name: "", email: "", country: "", consultationType: "", subject: "", message: "" };

const consultationTypes = [
  "Birth Chart Reading",
  "Career Guidance",
  "Relationship Consultation",
  "Tarot Reading",
  "Spiritual Consultation",
  "Kundli Analysis",
  "Not sure yet",
];

const faqs = [
  { q: "How quickly will I receive a response?", a: "Within 24 hours on business days. Urgent inquiries from international clients are prioritized across timezones." },
  { q: "Are conversations confidential?", a: "Always. Every exchange is treated with the discretion of a private practice. Recordings are shared only with you." },
  { q: "Do you accept international clients?", a: "Yes — we serve seekers across 47 countries with white-glove scheduling and timezone-aware sessions." },
];

/* ─── Animated Celestial Illustration ─────────────────────────────────────── */
function CelestialIllustration() {
  return (
    <Reveal delay={0.25}>
      <div className="relative w-full flex items-center justify-center select-none pointer-events-none" aria-hidden="true">
        {/* Outer slow-rotating orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
          className="absolute w-64 h-64 rounded-full border border-gold/20"
          style={{ borderStyle: "dashed" }}
        />
        {/* Middle orbit ring with planet dot */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute w-44 h-44 rounded-full border border-gold/15"
        >
          {/* Orbiting planet */}
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold/60 shadow-[0_0_12px_4px_oklch(0.82_0.12_85_/_0.45)]" />
        </motion.div>
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute w-28 h-28 rounded-full border border-gold/25"
        >
          {/* Small orbiting dot */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-amber-300/70 shadow-[0_0_8px_2px_oklch(0.88_0.15_85_/_0.5)]" />
        </motion.div>

        {/* Central glowing SVG — celestial eye / astrology symbol */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center glass-card shadow-[0_0_32px_8px_oklch(0.82_0.12_85_/_0.22)]"
        >
          {/* Astrological SVG — simplified celestial compass / mandala */}
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-14 h-14">
            {/* Outer circle */}
            <circle cx="40" cy="40" r="36" stroke="oklch(0.82 0.12 85)" strokeWidth="0.8" strokeDasharray="4 3" />
            {/* Cross axes */}
            <line x1="40" y1="4" x2="40" y2="76" stroke="oklch(0.82 0.12 85 / 0.35)" strokeWidth="0.6" />
            <line x1="4" y1="40" x2="76" y2="40" stroke="oklch(0.82 0.12 85 / 0.35)" strokeWidth="0.6" />
            {/* Diagonal axes */}
            <line x1="14.6" y1="14.6" x2="65.4" y2="65.4" stroke="oklch(0.82 0.12 85 / 0.2)" strokeWidth="0.5" />
            <line x1="65.4" y1="14.6" x2="14.6" y2="65.4" stroke="oklch(0.82 0.12 85 / 0.2)" strokeWidth="0.5" />
            {/* Middle circle */}
            <circle cx="40" cy="40" r="18" stroke="oklch(0.82 0.12 85 / 0.6)" strokeWidth="0.8" />
            {/* Inner star polygon */}
            <polygon
              points="40,22 43.5,36.5 58,36.5 46.5,45.5 50,60 40,51 30,60 33.5,45.5 22,36.5 36.5,36.5"
              fill="oklch(0.82 0.12 85 / 0.15)"
              stroke="oklch(0.82 0.12 85 / 0.7)"
              strokeWidth="0.7"
              strokeLinejoin="round"
            />
            {/* Centre dot */}
            <circle cx="40" cy="40" r="3.5" fill="oklch(0.82 0.12 85)" />
            {/* Cardinal tick marks */}
            {[0, 90, 180, 270].map((deg) => (
              <line
                key={deg}
                x1="40" y1="6" x2="40" y2="12"
                stroke="oklch(0.82 0.12 85 / 0.8)"
                strokeWidth="1.2"
                transform={`rotate(${deg} 40 40)`}
              />
            ))}
          </svg>
        </motion.div>

        {/* Floating sparkle particles */}
        {[
          { top: "10%",  left: "18%",  size: "w-1.5 h-1.5", delay: 0 },
          { top: "20%",  left: "75%",  size: "w-1 h-1",     delay: 1.2 },
          { top: "72%",  left: "22%",  size: "w-1 h-1",     delay: 0.7 },
          { top: "78%",  left: "70%",  size: "w-1.5 h-1.5", delay: 1.8 },
          { top: "48%",  left: "88%",  size: "w-1 h-1",     delay: 2.4 },
          { top: "38%",  left: "8%",   size: "w-1.5 h-1.5", delay: 0.4 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className={`absolute ${p.size} rounded-full bg-gold/70`}
            style={{ top: p.top, left: p.left }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}

        {/* Subtle glow backdrop */}
        <div className="absolute w-48 h-48 rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.08),transparent_70%)] blur-2xl" />
      </div>
    </Reveal>
  );
}

function ContactPage() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const update = (k) => (e) => {
    setData((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const fieldErrors = validateForm(data);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSent(true);
    setData(initial);
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
              <Sparkles className="w-3 h-3" /> Private Consultation
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-8 text-balance">
              Begin your journey<br />
              <span className="display-italic text-gold">toward clarity.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead mx-auto">
              A quiet conversation can shift the trajectory of a decade. Share what's on your mind — we respond personally within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gold" /> 24h response</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="w-3.5 h-3.5 text-gold" /> All timezones</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> Strictly confidential</span>
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
                Whether you're booking a session, planning a partnership, or seeking press — the inbox below reaches us personally.
              </p>
            </Reveal>

            {/* ── Celestial Illustration ── */}
            <div className="py-4">
              <CelestialIllustration />
            </div>

            <Reveal delay={0.1}>
              <ul className="space-y-6">
                {[
                  { Icon: Mail,    label: "Email",  value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { Icon: MapPin,  label: "Studio", value: "Worldwide · Online consultations" },
                ].map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <span className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-gold shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="mt-1 block text-foreground hover:text-gold transition">{value}</a>
                      ) : (
                        <p className="mt-1 text-foreground">{value}</p>
                      )}
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
                    { Icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                    { Icon: Youtube,   href: siteConfig.social.youtube,   label: "YouTube" },
                    { Icon: Linkedin,  href: siteConfig.social.linkedin,  label: "LinkedIn" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-11 h-11 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-gold hover:scale-110 hover:shadow-gold transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.15} className="lg:col-span-7">
            <form
              onSubmit={submit}
              className="relative glass-card rounded-3xl p-8 md:p-10 shadow-elegant"
            >
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-gold/20 via-transparent to-transparent opacity-30 pointer-events-none" />

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative mb-6 p-4 rounded-xl border border-gold/40 bg-gold/10 text-sm text-foreground"
                >
                  Thank you — your message has reached the studio. We respond personally within 24 hours.
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
                  <div className="relative">
                    <select value={data.consultationType} onChange={update("consultationType")} className={`${inputCls} appearance-none pr-10`}>
                      <option value="">Select a focus (optional)</option>
                      {consultationTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
                  </div>
                </Field>
                <Field label="Subject" error={errors.subject} className="sm:col-span-2">
                  <input value={data.subject} onChange={update("subject")} className={inputCls} placeholder="What can we help you with?" />
                </Field>
                <Field label="Your Message" error={errors.message} className="sm:col-span-2">
                  <textarea rows={6} value={data.message} onChange={update("message")} className={`${inputCls} resize-none`} placeholder="Share what's on your mind…" />
                </Field>
              </div>

              <div className="relative mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <p className="text-xs text-muted-foreground max-w-sm">
                  Your details remain strictly confidential. Used only to respond to your inquiry.
                </p>
                <button type="submit" className="btn-primary group">
                  Send Message
                  <Send className="w-4 h-4 group-hover:translate-x-0.5 transition" />
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
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 flex items-center justify-between text-left"
                  >
                    <span className="font-serif text-lg">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gold transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: openFaq === i ? "auto" : 0, opacity: openFaq === i ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-16 text-center">
              <a href="/book" className="inline-flex items-center gap-2 text-gold hover:gap-3 transition-all">
                Or skip ahead — book a session <ArrowRight className="w-4 h-4" />
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
