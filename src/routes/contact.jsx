import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Instagram, Clock, Globe2, ShieldCheck, Sparkles, ChevronDown, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SelectField } from "@/components/site/SelectField";
import { siteConfig } from "@/content/site";
import contactHeroImg from "@/assets/contact-hero.png";

// Reddit SVG icon — not in lucide-react
function RedditIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
  );
}

export default function ContactPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Contact — Begin Your Journey | The Preceptor</title>
        <meta name="description" content="Reach The Preceptor for premium private astrology consultations. White-glove onboarding for clients in the US and worldwide." />
        <meta property="og:title" content="Contact The Preceptor" />
        <meta property="og:description" content="Begin your journey toward clarity with a private spiritual consultation." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/contact" />
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

// Exact 14 options per client document (June 2026)
const consultationTypes = [
  "Quick Overview About YOU!",
  "General Birth Chart Reading (Mid-level)",
  "Detailed Birth Chart Reading",
  "Relationship Guidance (Quick one)",
  "Partner Compatibility (Mid-Level or In-depth)",
  "Career Consultation",
  "Marriage Consultation",
  "Current Situation Guidance",
  "Later Life Reading",
  "Mahadasha Guidance",
  "Saturn's Seven and a Half Guidance",
  "Birth Time Rectification (using D9 chart)",
  "About The Preceptor",
  "Not sure yet",
];

const faqs = [
  { q: "How quickly will I receive a response?", a: "Within 24 hours on business days. Urgent inquiries from international clients are prioritized across timezones." },
  { q: "Are conversations confidential?", a: "Always. Every exchange is treated with the discretion of a private practice." },
  { q: "Do you accept international clients?", a: "Yes — we serve seekers across 47 countries with white-glove scheduling and timezone-aware sessions." },
];

function ContactPage() {
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const update = (k) => (e) => {
    setData((prev) => ({ ...prev, [k]: e.target.value }));
  };

  const updateDirect = (k) => (val) => {
    setData((prev) => ({ ...prev, [k]: val }));
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
              A quiet conversation can shift the trajectory of a decade. Share what&apos;s on your mind — we respond personally within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gold" /> 24h response</span>
              <span className="inline-flex items-center gap-2"><Globe2 className="w-3.5 h-3.5 text-gold" /> All timezones</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-gold" /> Strictly confidential</span>
            </div>
          </Reveal>

          {/* ── Contact Hero Image ── */}
          <Reveal delay={0.4}>
            <div className="mt-12 mx-auto max-w-2xl rounded-2xl overflow-hidden ring-1 ring-gold/20">
              <img
                src={contactHeroImg}
                alt="The Preceptor — Private Consultation"
                className="w-full h-auto object-cover"
              />
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
                Whether you&apos;re booking a session, planning a partnership, or seeking press — the inbox below reaches us personally.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="space-y-6">
                {[
                  { Icon: Mail,   label: "Email",  value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                  { Icon: MapPin, label: "Studio", value: "Worldwide · Online consultations" },
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
                    { Icon: Instagram,  href: siteConfig.social.instagram, label: "Instagram" },
                    { Icon: RedditIcon, href: siteConfig.social.reddit,    label: "Reddit" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
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

                {/* ── Custom styled dropdown — replaces native <select> ── */}
                <SelectField
                  label="Consultation Type"
                  placeholder="Select a focus (optional)"
                  value={data.consultationType}
                  onChange={updateDirect("consultationType")}
                  options={consultationTypes}
                  error={errors.consultationType}
                  className="sm:col-span-2"
                />

                <Field label="Subject" error={errors.subject} className="sm:col-span-2">
                  <input value={data.subject} onChange={update("subject")} className={inputCls} placeholder="What can we help you with?" />
                </Field>
                <Field label="Your Message" error={errors.message} className="sm:col-span-2">
                  <textarea rows={6} value={data.message} onChange={update("message")} className={`${inputCls} resize-none`} placeholder="Share what&apos;s on your mind…" />
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

      {/* FAQ / Reassurance */}
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
