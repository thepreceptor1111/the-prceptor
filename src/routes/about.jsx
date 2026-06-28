import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import aboutHeroImg from "@/assets/about-hero.png";

function QuoteIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
    </svg>
  );
}

function StarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

const milestones = [
  { year: "2012", title: "The Foundation", body: "Began studying Vedic and Western astrology under two senior practitioners in Pune, immersing in classical texts and modern psychological frameworks." },
  { year: "2015", title: "First Private Practice", body: "Opened a small private practice serving referred clients. Word spread quietly through professional networks in Mumbai and Singapore." },
  { year: "2018", title: "International Reach", body: "Expanded to serve clients in the United States, UK, and UAE. Developed a proprietary framework bridging Jyotish and contemporary life coaching." },
  { year: "2021", title: "The Preceptor Studio", body: "Formally established The Preceptor as a dedicated consultancy. Introduced structured programmes — from single sessions to year-long guidance partnerships." },
  { year: "2024", title: "6000+ Sessions", body: "Surpassed 6,000 private sessions across 27 countries. Recognised in two independent spiritual wellness publications for consistent client outcomes." },
];

const beliefs = [
  "The chart is a map, not a sentence.",
  "Clarity is more valuable than prediction.",
  "Every client deserves rigour, not generalisation.",
  "The work is deeply personal and demands discretion.",
  "Ancient wisdom is most powerful when translated into modern context.",
];

const testimonials = [
  { quote: "Working with The Preceptor changed how I understand my own patterns. Not mystical — precise and grounded.", name: "Priya S.", location: "Singapore", rating: 5 },
  { quote: "I came sceptical and left with a framework for the next three years of my life. Extraordinary.", name: "Marcus T.", location: "London, UK", rating: 5 },
  { quote: "The level of preparation and care that goes into each session is unlike anything I've experienced.", name: "Anika R.", location: "New York, USA", rating: 5 },
];

export default function AboutPageWrapper() {
  return (
    <>
      <Helmet>
        <title>About — The Preceptor | Vedic & Western Astrology</title>
        <meta name="description" content="Meet The Preceptor — a modern astrologer with over 12 years of practice, 6000+ sessions, and clients across 27 countries." />
        <meta property="og:title" content="About The Preceptor" />
        <meta property="og:description" content="Modern guidance rooted in classical wisdom. Private consultations for those who seek clarity." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/about" />
      </Helmet>
      <AboutPage />
    </>
  );
}

function AboutPage() {
  const { settings } = useSiteSettings();
  const [activeYear, setActiveYear] = useState(null);

  return (
    <div className="relative">

      {/* ── Hero ── */}
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
              <SparklesIcon className="w-3 h-3" /> Our Story
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              Ancient wisdom,
              <br />
              <span className="display-italic text-gold">modern clarity.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              Twelve years. Six thousand sessions. Twenty-seven countries. One unwavering belief: that the stars reveal design, not destiny.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-12 mx-auto max-w-2xl rounded-2xl overflow-hidden ring-1 ring-gold/20">
              <img src={aboutHeroImg} alt="The Preceptor — astrology practice" className="w-full h-auto object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <span className="eyebrow">— Our Philosophy</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">The chart is a map,<br />not a sentence.</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Classical astrology was built for a world without psychology, neuroscience, or freedom of choice. We honour the rigour of that tradition while translating it into language that serves modern lives.
            </p>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Every session is built around clarity — not comfort. We will tell you what the chart says, what it does not say, and what you can actually do with that information.
            </p>
            <ul className="mt-8 space-y-3">
              {beliefs.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckIcon className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="text-sm md:text-base text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "12+", label: "Years of practice" },
                { value: "6000+", label: "Sessions delivered" },
                { value: "27+", label: "Countries served" },
                { value: "4.98★", label: "Average rating" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
                  <p className="font-serif text-3xl md:text-4xl bg-gradient-gold">{s.value}</p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-24 md:py-32 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center">
            <span className="eyebrow">— The Journey</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">A practice built slowly,<br />with intention.</h2>
          </Reveal>
          <div className="mt-16 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2" aria-hidden />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <Reveal key={m.year} delay={i * 0.07}>
                  <div
                    className={`relative flex items-start gap-8 md:gap-0 ${
                      i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                    onClick={() => setActiveYear(activeYear === m.year ? null : m.year)}
                  >
                    <div className={`flex-1 md:w-[calc(50%-2rem)] ${ i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12" } pl-14 md:pl-0`}>
                      <div
                        className={`glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:ring-1 hover:ring-gold/30 ${
                          activeYear === m.year ? "ring-1 ring-gold/40" : ""
                        }`}
                      >
                        <span className="text-xs uppercase tracking-[0.2em] text-gold">{m.year}</span>
                        <h3 className="mt-2 text-lg font-medium">{m.title}</h3>
                        <motion.div
                          initial={false}
                          animate={{ height: activeYear === m.year ? "auto" : 0, opacity: activeYear === m.year ? 1 : 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{m.body}</p>
                        </motion.div>
                      </div>
                    </div>
                    <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-gold ring-4 ring-background -translate-x-1/2 mt-6" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center">
            <span className="eyebrow">— Client Words</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">What clients say.</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="glass-card rounded-2xl p-8 flex flex-col h-full">
                  <QuoteIcon className="w-8 h-8 text-gold/40 mb-4 shrink-0" />
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.location}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => <StarIcon key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 md:py-32 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="eyebrow">— Begin</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">Let&apos;s talk.</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground mx-auto max-w-xl leading-relaxed">
              A single session can shift how you read the next decade. Book a private consultation or send a message first.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="btn-primary group">
                Book a Session
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/contact" className="btn-secondary">Send a Message</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
