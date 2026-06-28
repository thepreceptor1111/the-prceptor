import { Helmet } from "react-helmet-async";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS } from "@/utils/constants";

function StarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function QuoteIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="currentColor" className={className} aria-hidden="true">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
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
function FilterIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

const FILTERS = ["All", "5 Stars", "Relationships", "Career", "General Reading", "International"];

function TestimonialCard({ t, featured = false }) {
  return (
    <div className={`glass-card rounded-2xl p-7 flex flex-col h-full ${ featured ? "ring-1 ring-gold/30" : "" }`}>
      <QuoteIcon className="w-7 h-7 text-gold/35 mb-4 shrink-0" />
      <p className="text-base md:text-lg text-muted-foreground leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">{t.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{t.location}</p>
          {t.service && <p className="text-xs text-gold mt-0.5">{t.service}</p>}
        </div>
        <div className="flex gap-0.5 shrink-0">
          {[...Array(t.rating ?? 5)].map((_, i) => <StarIcon key={i} className="w-3.5 h-3.5 fill-gold text-gold" />)}
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Client Testimonials | The Preceptor</title>
        <meta name="description" content="Read what clients across 27 countries say about their sessions with The Preceptor." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/testimonials" />
      </Helmet>
      <TestimonialsPage />
    </>
  );
}

function TestimonialsPage() {
  const { settings } = useSiteSettings();
  const allTestimonials = settings?.testimonials ?? TESTIMONIALS ?? [];

  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(9);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return allTestimonials;
    if (activeFilter === "5 Stars") return allTestimonials.filter((t) => (t.rating ?? 5) === 5);
    return allTestimonials.filter((t) =>
      t.category?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      t.service?.toLowerCase().includes(activeFilter.toLowerCase())
    );
  }, [allTestimonials, activeFilter]);

  const visible = filtered.slice(0, visibleCount);
  const featured = allTestimonials.slice(0, 3);

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
              <SparklesIcon className="w-3 h-3" /> Client Testimonials
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              Voices from<br />
              <span className="display-italic text-gold">27 countries.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              Real sessions. Real shifts. Read what clients across the world have experienced.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="py-16 md:py-20 bg-deep relative overflow-hidden">
          <div className="absolute inset-0 bg-hero opacity-30 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            <Reveal className="text-center mb-10">
              <span className="eyebrow">— Featured</span>
              <h2 className="mt-4 text-3xl md:text-4xl">Standout reviews.</h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((t, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <TestimonialCard t={t} featured />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter bar */}
      <section className="sticky top-16 z-20 bg-background/80 backdrop-blur-md border-b border-border/40 py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-3 flex-wrap">
          <FilterIcon className="w-4 h-4 text-muted-foreground shrink-0" />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setVisibleCount(9); }}
              className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-[0.15em] transition-all ${
                activeFilter === f
                  ? "bg-gold/20 text-gold border border-gold/30"
                  : "bg-secondary/40 text-muted-foreground border border-border hover:border-gold/20"
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">{filtered.length} reviews</span>
        </div>
      </section>

      {/* All reviews grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {visible.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No reviews in this category yet.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((t, i) => (
                  <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
                    <TestimonialCard t={t} />
                  </Reveal>
                ))}
              </div>
              {visibleCount < filtered.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((v) => v + 9)}
                    className="btn-secondary"
                  >
                    Load more reviews
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* More voices strip */}
      <section className="py-20 md:py-28 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <span className="eyebrow">— International Reach</span>
            <h2 className="mt-4 text-3xl md:text-4xl">More voices from clients.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(allTestimonials.slice(3, 9).length > 0 ? allTestimonials.slice(3, 9) : allTestimonials.slice(0, 6)).map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <TestimonialCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="eyebrow">— Your Turn</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">Ready for your session?</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground mx-auto max-w-xl leading-relaxed">
              Join thousands of clients who found clarity in a single conversation.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="btn-primary group">
                Book a Session
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
