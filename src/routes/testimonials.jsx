import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Star, Quote, PlayCircle } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS_QUERY } from "@/lib/sanityQueries";
import { sanityImage, preloadImage } from "@/lib/sanityImage";

const CAROUSEL_COUNT = 5;
const SLIDE_INTERVAL = 6000;
const CAROUSEL_H     = 520;
const CAROUSEL_STRIP = 72;
const GRID_H         = 400;
const GRID_STRIP     = 64;

function normalise(t) {
  return {
    _id:           t._id,
    name:          t.name    ?? "",
    country:       t.location ?? "",
    text:          t.review   ?? "",
    rating:        t.rating   ?? 5,
    service:       t.service  ?? "",
    avatarInitial: t.avatarInitial ?? "",
    featured:      t.featured ?? false,
    screenshotUrl: t.screenshotImage?.asset?.url
      ? sanityImage(t.screenshotImage.asset.url, { w: 900, q: 80 })
      : null,
    screenshotAlt: t.screenshotImage?.alt ?? "Client testimonial screenshot",
  };
}

/* ─── SHARED PRIMITIVES ─────────────────────────────────────────────────── */

function NavBtn({ onClick, label, children }) {
  return (
    <button onClick={onClick} aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-sm bg-black/30 transition hover:bg-gold/20 shrink-0">
      {children}
    </button>
  );
}

function Dots({ total, current, onDot }) {
  return (
    <div className="flex items-center gap-1.5">
      {[...Array(total)].map((_, i) => (
        <button key={i} onClick={() => onDot(i)} aria-label={`Review ${i + 1}`}
          className={`rounded-full transition-all ${
            i === current ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/30"
          }`} />
      ))}
    </div>
  );
}

function ScreenshotCard({ r, cardH, stripH, isActive = false, showControls = false, onPrev, onNext, total, current, onDot }) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden relative" style={{ height: `${cardH}px` }}>

      {/* Scrollable image zone */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        bottom: `${stripH}px`,
        overflowY: "auto", overflowX: "hidden",
        scrollbarWidth: "none",
      }}>
        <style>{`.ss-scroll::-webkit-scrollbar{display:none}`}</style>
        <div className="ss-scroll" style={{ overflowY: "auto", scrollbarWidth: "none" }}>
          <img
            src={r.screenshotUrl}
            alt={r.screenshotAlt}
            loading={isActive ? "eager" : "lazy"}
            fetchpriority={isActive ? "high" : "low"}
            decoding="async"
            style={{ width: "100%", height: "auto", display: "block", minHeight: "100%" }}
          />
        </div>
      </div>

      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "56px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Bottom gradient */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        height: `${stripH + 56}px`,
        background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.92) 55%)",
        pointerEvents: "none", zIndex: 1,
      }} />

      {/* Name + controls strip */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: `${stripH}px`,
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.75rem", gap: "1rem", zIndex: 2,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
          <div style={{
            width: "2.25rem", height: "2.25rem", borderRadius: "9999px",
            background: "rgba(212,175,55,0.22)",
            border: "1px solid rgba(212,175,55,0.45)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#d4af37", fontSize: "0.8rem", fontWeight: 600, flexShrink: 0,
          }}>
            {r.avatarInitial || r.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ color: "#d4af37", fontFamily: "serif", fontWeight: 500, fontSize: "0.95rem", lineHeight: 1.2 }}>
              {r.name}
            </p>
            {r.country && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginTop: "0.1rem" }}>
                {r.country}
              </p>
            )}
          </div>
        </div>

        {showControls ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <NavBtn onClick={onPrev} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
            <Dots total={total} current={current} onDot={onDot} />
            <NavBtn onClick={onNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
          </div>
        ) : r.service ? (
          <span className="text-[10px] uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-2.5 py-1 shrink-0 bg-black/40">
            {r.service}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function TextCard({ r, cardH, showControls = false, onPrev, onNext, total, current, onDot }) {
  return (
    <div
      className="glass-card rounded-3xl overflow-hidden relative"
      style={{ height: cardH ? `${cardH}px` : "auto", minHeight: cardH ? undefined : "240px" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.07),transparent_40%)] pointer-events-none" />
      <div className="p-10 relative z-10 h-full flex flex-col justify-center">
        <Quote className="w-9 h-9 text-gold/30 mx-auto" />
        <p className="mt-5 font-serif text-xl md:text-2xl leading-relaxed">
          &ldquo;{r.text}&rdquo;
        </p>
        <div className="mt-6 flex justify-center gap-1">
          {[...Array(r.rating ?? 5)].map((_, k) => (
            <Star key={k} className="w-4 h-4 fill-gold text-gold" />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <p className="font-serif text-base text-gold">{r.name}</p>
            {r.country && <p className="text-xs text-muted-foreground">{r.country}</p>}
          </div>
          {showControls && (
            <div className="flex items-center gap-3">
              <NavBtn onClick={onPrev} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
              <Dots total={total} current={current} onDot={onDot} />
              <NavBtn onClick={onNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
export default function TestimonialsPage() {
  const { data: cmsTestimonials } = useSanity(TESTIMONIALS_QUERY, null);
  const { settings }              = useSiteSettings();

  const reviews = cmsTestimonials && cmsTestimonials.length > 0
    ? cmsTestimonials.map(normalise)
    : TESTIMONIALS.map((t) => ({ ...t, screenshotUrl: null }));

  const featuredReviews = reviews.filter((r) => r.featured).length > 0
    ? reviews.filter((r) => r.featured).slice(0, CAROUSEL_COUNT)
    : reviews.slice(0, CAROUSEL_COUNT);
  const moreReviews = reviews.filter((r) => !featuredReviews.includes(r));

  const [activeIndex, setActiveIndex] = useState(0);
  const activeReview = featuredReviews[activeIndex] ?? featuredReviews[0];

  useEffect(() => { setActiveIndex(0); }, [reviews.length]);

  // ── Preload adjacent carousel images ──
  useEffect(() => {
    if (featuredReviews.length < 2) return;
    const nextIdx = (activeIndex + 1) % featuredReviews.length;
    const prevIdx = (activeIndex + featuredReviews.length - 1) % featuredReviews.length;
    preloadImage(featuredReviews[nextIdx]?.screenshotUrl);
    preloadImage(featuredReviews[prevIdx]?.screenshotUrl);
  }, [activeIndex, featuredReviews]);

  // ── Auto-advance ──
  useEffect(() => {
    if (!featuredReviews.length) return;
    const timer = window.setInterval(
      () => setActiveIndex((c) => (c + 1) % featuredReviews.length),
      SLIDE_INTERVAL
    );
    return () => window.clearInterval(timer);
  }, [featuredReviews.length]);

  const goPrevious = () => setActiveIndex((c) => (c + featuredReviews.length - 1) % featuredReviews.length);
  const goNext     = () => setActiveIndex((c) => (c + 1) % featuredReviews.length);

  return (
    <>
      <Helmet>
        <title>Testimonials — The Preceptor</title>
        <meta name="description" content="Real stories from clients across the United States and the world after their consultations with The Preceptor." />
        <meta property="og:title" content="Client Stories — The Preceptor" />
        <meta property="og:description" content="Trusted by clients across 47 countries." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/testimonials" />
      </Helmet>

      <div className="bg-hero starfield min-h-screen">
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">

          {/* Hero heading */}
          <Reveal className="text-center max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.3em] text-gold">
              {settings?.testimonialsSectionLabel ?? "Testimonials"}
            </span>
            <h1 className="mt-4 text-5xl md:text-6xl">
              {settings?.testimonialsSectionHeading ?? "Stories from the seekers."}
            </h1>
            <p className="mt-5 text-muted-foreground">Trust earned, one consultation at a time.</p>
          </Reveal>

          {/* ── Featured carousel ── */}
          {featuredReviews.length > 0 && (
            <div className="mt-20">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.3em] text-gold">Featured Stories</span>
                <h2 className="mt-4 text-4xl md:text-5xl">Standout reviews.</h2>
              </Reveal>

              <Reveal delay={0.1}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-10"
                  >
                    {activeReview?.screenshotUrl ? (
                      <ScreenshotCard
                        r={activeReview}
                        cardH={CAROUSEL_H}
                        stripH={CAROUSEL_STRIP}
                        isActive
                        showControls
                        onPrev={goPrevious}
                        onNext={goNext}
                        total={featuredReviews.length}
                        current={activeIndex}
                        onDot={setActiveIndex}
                      />
                    ) : (
                      <TextCard
                        r={activeReview}
                        cardH={CAROUSEL_H}
                        showControls
                        onPrev={goPrevious}
                        onNext={goNext}
                        total={featuredReviews.length}
                        current={activeIndex}
                        onDot={setActiveIndex}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Reveal>
            </div>
          )}

          {/* ── More reviews grid ── */}
          {moreReviews.length > 0 && (
            <div className="mt-16">
              <Reveal className="text-center max-w-3xl mx-auto">
                <span className="text-xs uppercase tracking-[0.3em] text-gold">More stories</span>
                <h2 className="mt-4 text-4xl md:text-5xl">More voices from clients.</h2>
              </Reveal>
              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moreReviews.map((r, i) => (
                  <Reveal key={r._id ?? `${r.name}-${i}`} delay={i * 0.05}>
                    {r.screenshotUrl ? (
                      <ScreenshotCard r={r} cardH={GRID_H} stripH={GRID_STRIP} />
                    ) : (
                      <TextCard r={r} />
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
          )}

          {/* ── Video testimonials placeholder ── */}
          <Reveal>
            <div className="mt-24 text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Video Stories</span>
              <h2 className="mt-4 text-4xl md:text-5xl">Hear it in their words.</h2>
            </div>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <Reveal key={n} delay={n * 0.05}>
                <div className="aspect-video glass-card rounded-3xl flex items-center justify-center hover:shadow-gold transition cursor-pointer group">
                  <PlayCircle className="w-14 h-14 text-gold group-hover:scale-110 transition" />
                </div>
              </Reveal>
            ))}
          </div>

        </section>
      </div>
    </>
  );
}
