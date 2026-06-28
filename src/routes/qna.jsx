import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { FAQS } from "@/utils/constants";

function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function SearchIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
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
function XIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  );
}

const CATEGORIES = ["All", "Sessions", "Booking & Payment", "Astrology", "Privacy & Confidentiality", "International Clients"];

const LOCAL_FAQS = [
  { category: "Sessions", q: "What can I expect in my first session?", a: "Your first session is a structured 60-minute conversation. You'll share your birth details beforehand, and The Preceptor will prepare a detailed chart reading focused on your stated area of inquiry — whether career, relationships, timing, or a specific life question." },
  { category: "Sessions", q: "How long is a typical session?", a: "Sessions run between 45 and 90 minutes depending on the service selected. Extended or Relationship sessions are typically 75–90 minutes. All sessions include a follow-up summary note sent within 48 hours." },
  { category: "Sessions", q: "Are sessions conducted in person or online?", a: "All sessions are conducted online via Zoom or Google Meet. This allows clients across all time zones to access the same quality of consultation without compromise." },
  { category: "Booking & Payment", q: "How do I book a session?", a: "Visit the Book a Session page, select your preferred service, and choose a time slot. Payment is collected at booking to confirm your appointment. You'll receive a confirmation and preparation notes by email." },
  { category: "Booking & Payment", q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, as well as bank transfers for clients who prefer. All transactions are processed securely through Stripe." },
  { category: "Booking & Payment", q: "What is your cancellation policy?", a: "Cancellations made more than 48 hours before the session are eligible for a full refund or reschedule. Cancellations within 48 hours are eligible for a credit note valid for 90 days." },
  { category: "Astrology", q: "Do you use Vedic or Western astrology?", a: "The Preceptor works with both systems, drawing from whichever framework is most illuminating for the question at hand. Most chart readings integrate Vedic (Jyotish) foundations with Western psychological frameworks." },
  { category: "Astrology", q: "Do I need to know my exact birth time?", a: "An exact birth time significantly improves the precision of a reading — particularly for questions involving life timing and the Ascendant. If you don't have it, birth time rectification is available as a separate service." },
  { category: "Astrology", q: "Can astrology predict the future?", a: "Not in the deterministic sense that popular culture suggests. What the chart offers is a map of tendencies, cycles, and patterns. A skilled reading helps you understand the terrain and navigate it — not surrender to it." },
  { category: "Privacy & Confidentiality", q: "Are my sessions confidential?", a: "Entirely. Every session, message, and piece of shared information is treated with the same discretion as a private legal or medical consultation. Nothing is stored beyond what's needed to prepare for your session." },
  { category: "International Clients", q: "Do you work with clients outside India?", a: "Yes — clients from 27 countries including the US, UK, UAE, Singapore, Australia, and Canada. Sessions are scheduled to accommodate your timezone, and we're available across most working hours globally." },
  { category: "International Clients", q: "Are sessions available in languages other than English?", a: "Currently, sessions are conducted in English and Hindi. If you require another language, please mention it in your booking note and we'll do our best to accommodate." },
];

export default function QnAPageWrapper() {
  return (
    <>
      <Helmet>
        <title>FAQ — Common Questions | The Preceptor</title>
        <meta name="description" content="Answers to the most common questions about The Preceptor's astrology consultations, booking process, and approach." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/qna" />
      </Helmet>
      <QnAPage />
    </>
  );
}

function QnAPage() {
  const { settings } = useSiteSettings();
  const faqs = settings?.faqs ?? LOCAL_FAQS;

  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex]           = useState(null);
  const [query, setQuery]                   = useState("");

  const filtered = useMemo(() => {
    let list = faqs.length > 0 ? faqs : LOCAL_FAQS;
    if (activeCategory !== "All") list = list.filter((f) => f.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
    }
    return list;
  }, [faqs, activeCategory, query]);

  return (
    <div className="relative">

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-36">
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
              <SparklesIcon className="w-3 h-3" /> Questions & Answers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              Everything you&apos;d<br />
              <span className="display-italic text-gold">want to know.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              Browse the most common questions about sessions, booking, astrology, and privacy — or search for something specific below.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 py-4">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search questions…"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setOpenIndex(null); }}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition">
                <XIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setOpenIndex(null); }}
                className={`px-3 py-2 rounded-lg text-xs uppercase tracking-[0.15em] transition-all ${
                  activeCategory === c
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-secondary/40 text-muted-foreground border border-border hover:border-gold/20"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No questions match your search. <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="text-gold underline">Clear filters</button></p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((f, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.3)}>
                  <div className="glass-card rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      className="w-full p-6 flex items-start justify-between text-left gap-4"
                      aria-expanded={openIndex === i}
                    >
                      <div className="flex-1 min-w-0">
                        {f.category && f.category !== "All" && (
                          <span className="block text-xs uppercase tracking-[0.2em] text-gold mb-2">{f.category}</span>
                        )}
                        <span className="font-serif text-base md:text-lg">{f.q}</span>
                      </div>
                      <ChevronDownIcon className={`w-5 h-5 text-gold shrink-0 transition-transform duration-500 mt-0.5 ${ openIndex === i ? "rotate-180" : "" }`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {openIndex === i && (
                        <motion.div
                          key="body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-base md:text-lg text-muted-foreground leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="eyebrow">— Still unsure?</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">Didn&apos;t find what you were looking for?</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground mx-auto max-w-xl leading-relaxed">
              Send a message and we&apos;ll respond personally within 24 hours.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary group">
                Contact Us
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/book" className="btn-secondary">Book a Session</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
