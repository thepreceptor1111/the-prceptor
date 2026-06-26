import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";

// ── Inline SVG icons — removes lucide-react dependency ────────────────────
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

// ── Constants ─────────────────────────────────────────────────────────────
const CONCERNS = [
  "Birth Chart (Kundli) Analysis",
  "Career & Life Path",
  "Relationships & Compatibility",
  "Marriage Timing",
  "Finance & Wealth",
  "Health & Wellbeing",
  "Spiritual Direction",
  "Tarot Reading",
  "Other / General",
];

const CONTACT_INFO = [
  {
    icon: MailIcon,
    label: "Email",
    value: "thepreceptor1111@gmail.com",
    href: "mailto:thepreceptor1111@gmail.com",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@the.preceptor_",
    href: "https://www.instagram.com/the.preceptor_/",
  },
  {
    icon: MapPinIcon,
    label: "Based in",
    value: "India — serving clients worldwide",
    href: null,
  },
  {
    icon: Globe2Icon,
    label: "Timezone",
    value: "IST (UTC +5:30) — global scheduling available",
    href: null,
  },
];

const TRUST_ITEMS = [
  { icon: ClockIcon,       text: "Reply within 24 hours" },
  { icon: ShieldCheckIcon, text: "Private & confidential" },
  { icon: Globe2Icon,      text: "Clients in 47+ countries" },
];

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? "";

// ── Page ──────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const { settings } = useSiteSettings();

  const [form, setForm] = useState({ name: "", email: "", concern: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [concernOpen, setConcernOpen] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.concern)        e.concern = "Please select a concern";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => { const n = { ...e }; delete n[field]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject:    `New contact: ${form.concern}`,
          from_name:  form.name,
          ...form,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", concern: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputBase = "w-full bg-secondary/40 border rounded-xl px-4 py-3.5 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all";
  const inputErr  = "border-red-400/60";
  const inputOk   = "border-border";

  return (
    <>
      <SEO {...PAGE_SEO.contact} />

      <main className="min-h-screen">
        <section className="relative py-36 overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,oklch(0.28_0.10_255_/_0.42),transparent_65%)]" />
            <div className="absolute inset-0 starfield" />
          </div>
          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center z-10">
            <Reveal>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold"
              >
                <SparklesIcon className="w-3.5 h-3.5" />
                {settings?.contactSectionLabel ?? "Contact"}
              </motion.span>
              <h1 className="mt-5 text-5xl md:text-7xl leading-[1.05]">
                {settings?.contactSectionHeading ?? "Let's connect."}
              </h1>
              <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
                {settings?.contactSectionSubtitle ??
                  "Whether you have a question, want to understand a service better, or simply want to reach out — this is the place."}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-10 pb-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_420px] gap-16 items-start">

            {/* ── Form ── */}
            <Reveal>
              <div className="glass-card rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-serif mb-2">Send a message</h2>
                <p className="text-sm text-muted-foreground mb-8">Fill in the form and expect a reply within 24 hours.</p>

                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center"
                    >
                      <span className="text-5xl">✦</span>
                      <h3 className="mt-6 text-2xl font-serif text-gold">Message received.</h3>
                      <p className="mt-3 text-muted-foreground">I'll be in touch within 24 hours.</p>
                      <button
                        onClick={() => setStatus("idle")}
                        className="mt-8 btn-secondary text-sm"
                      >
                        Send another
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-5"
                      noValidate
                    >
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <input
                            type="text"
                            placeholder="Your name"
                            value={form.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                            className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                        </div>
                        <div>
                          <input
                            type="email"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Concern dropdown */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setConcernOpen((o) => !o)}
                          className={`${inputBase} flex items-center justify-between text-left ${
                            errors.concern ? inputErr : inputOk
                          } ${!form.concern ? "text-muted-foreground/50" : "text-foreground"}`}
                        >
                          {form.concern || "Select your concern"}
                          <ChevronDownIcon className={`w-4 h-4 text-muted-foreground transition-transform ${concernOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {concernOpen && (
                            <motion.ul
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-50 mt-2 w-full bg-background border border-border rounded-xl shadow-elegant overflow-hidden"
                            >
                              {CONCERNS.map((c) => (
                                <li key={c}>
                                  <button
                                    type="button"
                                    onClick={() => { handleChange("concern", c); setConcernOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm transition hover:bg-gold/10 hover:text-gold ${
                                      form.concern === c ? "text-gold bg-gold/5" : "text-foreground"
                                    }`}
                                  >
                                    {c}
                                  </button>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                        {errors.concern && <p className="mt-1 text-xs text-red-400">{errors.concern}</p>}
                      </div>

                      <div>
                        <textarea
                          rows={5}
                          placeholder="Your message…"
                          value={form.message}
                          onChange={(e) => handleChange("message", e.target.value)}
                          className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
                        />
                        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
                      </div>

                      {status === "error" && (
                        <p className="text-sm text-red-400 text-center">
                          Something went wrong. Please try emailing directly.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="btn-primary w-full justify-center flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <SendIcon className="w-4 h-4" /> Send Message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* ── Sidebar ── */}
            <div className="space-y-6 lg:sticky lg:top-28">
              <Reveal delay={0.08}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="text-lg font-serif mb-5">Contact details</h3>
                  <ul className="space-y-5">
                    {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                      <li key={label} className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-gold" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-0.5">{label}</p>
                          {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer"
                              className="text-sm hover:text-gold transition break-all">
                              {value}
                            </a>
                          ) : (
                            <p className="text-sm">{value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="text-sm font-serif text-gold mb-4">You can trust us</h3>
                  <ul className="space-y-3">
                    {TRUST_ITEMS.map(({ icon: Icon, text }) => (
                      <li key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Icon className="w-4 h-4 text-gold shrink-0" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="glass-card rounded-2xl p-7">
                  <h3 className="text-sm font-serif mb-3">Prefer to book directly?</h3>
                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                    Skip the back-and-forth. Book your session instantly via the scheduling page.
                  </p>
                  <a
                    href="/book"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/15 border border-gold/35 text-gold text-sm hover:bg-gold/25 transition group"
                  >
                    Book a Session
                    <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </Reveal>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
