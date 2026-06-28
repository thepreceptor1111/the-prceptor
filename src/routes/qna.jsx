import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Reveal from "@/components/site/Reveal";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { FAQ_QUERY } from "@/lib/sanityQueries";

// ── Inline SVG icons — removes lucide-react dependency ────────────────────
function PlusIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function MinusIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
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

function MessageCircleQuestionIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
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

const STATIC_CATEGORIES = [
  {
    id: "sessions",
    label: "Sessions",
    questions: [
      {
        q: "What happens in a typical consultation?",
        a: "Each session is a private, 60-minute one-on-one video call. We begin with your birth chart and move into whatever area of life is most calling for attention, career, relationships, timing, or spiritual direction.",
      },
      {
        q: "Do I need to know anything about astrology beforehand?",
        a: "Not at all. Sessions are designed to be fully accessible whether you're a complete newcomer or have studied astrology for years. The language is always clear, grounded, and practical.",
      },
      {
        q: "How do I prepare for my session?",
        a: "The most important thing is your accurate birth time, date, exact time, and city. Beyond that, simply arrive with an open mind and one or two areas of life you'd like to explore. There's no homework required.",
      },
      {
        q: "Can I book sessions for someone else as a gift?",
        a: "Yes. Gift sessions are available. Simply note 'gift' in the concern field during booking and include the recipient's details. A personalised gift confirmation is sent to you.",
      },
    ],
  },
  {
    id: "astrology",
    label: "Astrology",
    questions: [
      {
        q: "Which system of astrology do you use?",
        a: "The Preceptor blends Vedic (Jyotish) and Western tropical astrology depending on your question. Vedic is used for precise timing and life-path readings; Western is used for psychological and relationship insight. Both are explained in simple terms.",
      },
      {
        q: "Is astrology the same as fortune-telling?",
        a: "No. Astrology maps energetic patterns and timing cycles. It reveals design, not fixed destiny. The goal is always to give you more agency, not less. Knowing the weather doesn't stop you from going outside; it just helps you dress well.",
      },
      {
        q: "What is a birth chart?",
        a: "Your birth chart (or natal chart) is a snapshot of the sky at the exact moment and location of your birth. It shows the position of the Sun, Moon, and planets across 12 houses, each governing a different area of life. It is the primary map used in every consultation.",
      },
      {
        q: "Can astrology predict exact events?",
        a: "Astrology reveals windows of high probability and energetic themes, not fixed outcomes. Timing tools like transits and dashas highlight when certain areas of life are activated, but free will always plays a central role in how those energies manifest.",
      },
    ],
  },
  {
    id: "logistics",
    label: "Logistics",
    questions: [
      {
        q: "Where do sessions take place?",
        a: "All consultations are held online via a private video call link sent to your email after booking. Sessions are available to clients anywhere in the world across all timezones.",
      },
      {
        q: "What timezone are sessions scheduled in?",
        a: "Sessions are displayed in your local timezone during booking. The astrologer is based in IST (India Standard Time, UTC+5:30) and offers slots across multiple windows to accommodate international clients.",
      },
      {
        q: "How far in advance should I book?",
        a: "The booking window opens 14 days in advance. Demand is high, so booking 5 to 7 days ahead is recommended. Same-week slots occasionally open when cancellations occur, check the booking page regularly.",
      },
      {
        q: "What is the cancellation policy?",
        a: "Cancellations made 48 hours or more before the session receive a full credit toward a future session. Cancellations within 24 hours are non-refundable. No-shows forfeit the session.",
      },
    ],
  },
  {
    id: "readings",
    label: "Types of Readings",
    questions: [
      {
        q: "What is a Kundli Analysis?",
        a: "Kundli Analysis is a deep Vedic birth chart examination covering all 12 houses, planetary placements, yogas (special combinations), and dashas (timing periods). It is the most comprehensive reading offered and is ideal for first-time clients or those at a major life crossroads.",
      },
      {
        q: "What does a Relationship Consultation cover?",
        a: "Relationship sessions use composite chart and synastry analysis to examine compatibility, recurring patterns, karmic themes, and timing. They are suitable for romantic partnerships, business relationships, or family dynamics.",
      },
      {
        q: "How is a Tarot Reading different from an astrology session?",
        a: "Tarot readings are intuitive and symbolic. They respond to the energy of the present moment and your specific question. Astrology readings are chart-based and timing-specific. Many clients find the two work beautifully together.",
      },
      {
        q: "Can I request a follow-up session?",
        a: "Yes. Follow-up sessions are available and encouraged every 6 to 12 months as major planetary cycles shift. Returning clients receive priority booking access and a discounted rate on their second session.",
      },
    ],
  },
];

const CATEGORY_META = [
  { id: "sessions", label: "Sessions" },
  { id: "astrology", label: "Astrology" },
  { id: "logistics", label: "Logistics" },
  { id: "readings", label: "Types of Readings" },
];

function groupByCategory(faqs) {
  const map = {};
  CATEGORY_META.forEach(({ id }) => { map[id] = []; });

  faqs.forEach((faq) => {
    const cat = faq.category ?? "sessions";
    if (!map[cat]) map[cat] = [];
    map[cat].push({ q: faq.question, a: faq.answer });
  });

  return CATEGORY_META
    .filter(({ id }) => map[id].length > 0)
    .map(({ id, label }) => ({ id, label, questions: map[id] }));
}

export default function QnAPage() {
  const { data: cmsFaqs } = useSanity(FAQ_QUERY, null);
  const { settings } = useSiteSettings();

  const CATEGORIES =
    cmsFaqs && cmsFaqs.length > 0
      ? groupByCategory(cmsFaqs)
      : STATIC_CATEGORIES;

  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]?.id ?? "sessions");
  const [openIndex, setOpenIndex] = useState(null);

  const activeQuestions =
    CATEGORIES.find((c) => c.id === activeCategory)?.questions ?? [];

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(null);
  };

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <SEO {...PAGE_SEO.qna} />

      <div className="bg-hero starfield min-h-screen relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full opacity-25 blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--gold) 0%, transparent 60%)",
          }}
        />

        <section className="relative max-w-5xl mx-auto px-6 lg:px-10 pt-20 pb-16 text-center">
          <Reveal>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-gold"
            >
              <SparklesIcon className="w-3.5 h-3.5" /> Questions &amp; Answers
            </motion.span>
            <h1
              className="mt-6 leading-[1.05] bg-gradient-gold bg-clip-text text-transparent"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              {settings?.faqSectionHeading ?? "Everything you want to know."}
            </h1>
            <div className="mt-6 flex justify-center">
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl text-center" style={{ textAlign: 'center' }}>
                From how sessions work to the deeper philosophy behind the practice,
                find honest, clear answers below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12 inline-flex items-center justify-center w-20 h-20 rounded-full gold-border shadow-gold">
              <MessageCircleQuestionIcon className="w-9 h-9 text-gold" />
            </div>
          </Reveal>
        </section>

        <section className="max-w-5xl mx-auto px-6 lg:px-10 pb-6">
          <Reveal>
            <div className="flex flex-wrap gap-3 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-6 py-2.5 rounded-full text-sm transition-all duration-300 border ${
                    activeCategory === cat.id
                      ? "bg-gold/15 border-gold text-gold shadow-gold"
                      : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-3"
            >
              {activeQuestions.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <div
                      className={`glass-card rounded-2xl border transition-all duration-300 ${
                        isOpen
                          ? "border-gold/60 shadow-gold"
                          : "border-border hover:border-gold/30"
                      }`}
                    >
                      <button
                        onClick={() => toggle(i)}
                        className="w-full flex items-center justify-between gap-4 px-7 py-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span
                          className={`font-medium text-base leading-snug transition-colors ${
                            isOpen ? "text-gold" : "text-foreground"
                          }`}
                        >
                          {item.q}
                        </span>
                        <span
                          className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                            isOpen
                              ? "border-gold bg-gold/10 text-gold rotate-0"
                              : "border-border text-muted-foreground"
                          }`}
                        >
                          {isOpen ? (
                            <MinusIcon className="w-4 h-4" />
                          ) : (
                            <PlusIcon className="w-4 h-4" />
                          )}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-7 pb-7 text-base text-muted-foreground leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        <section className="max-w-3xl mx-auto px-6 lg:px-10 pb-28">
          <Reveal>
            <div className="glass-card rounded-3xl p-10 md:p-14 text-center border border-gold/20 shadow-elegant relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, var(--gold), transparent 70%)",
                }}
              />
              <span className="text-xs uppercase tracking-[0.35em] text-gold">
                Still curious?
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl">
                Didn&apos;t find your answer?
              </h2>
              <p className="mt-4 text-base text-muted-foreground max-w-md mx-auto">
                Reach out directly. Every question is welcome. A response lands
                in your inbox within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <a
                  href="mailto:thepreceptor1111@gmail.com"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.03] transition"
                >
                  Ask a Question <ArrowRightIcon className="w-4 h-4" />
                </a>
                <Link
                  to="/book"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Book a Session <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  );
}
