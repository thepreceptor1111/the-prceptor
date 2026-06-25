import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { TESTIMONIALS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { TESTIMONIALS_QUERY } from "@/lib/sanityQueries";
import { sanityImage, preloadImage } from "@/lib/sanityImage";
import { useLenisResize } from "@/hooks/useLenisResize";

const SLIDE_INTERVAL = 6000;

function normalise(t) {
  return {
    name:          t.name ?? "",
    country:       t.location ?? t.country ?? "",
    text:          t.review   ?? t.text    ?? "",
    rating:        t.rating   ?? 5,
    avatarInitial: t.avatarInitial ?? "",
    featured:      t.featured ?? false,
    screenshotUrl: t.screenshotImage?.asset?.url
      ? sanityImage(t.screenshotImage.asset.url, { w: 900, q: 80 })
      : null,
    screenshotAlt: t.screenshotImage?.alt ?? "Client testimonial screenshot",
  };
}

const CARD_HEIGHT = 520;
const STRIP_H    = 72;

export function TestimonialsSection() {
  useLenisResize();

  const { data: cmsTestimonials } = useSanity(TESTIMONIALS_QUERY, null);
  const { settings }              = useSiteSettings();

  const sectionLabel   = settings?.testimonialsSectionLabel   ?? "Testimonials";
  const sectionHeading = settings?.testimonialsSectionHeading ?? "Voices from across the world.";

  const all = cmsTestimonials
    ? cmsTestimonials.map(normalise)
    : TESTIMONIALS.map((t) => ({ ...t, screenshotUrl: null }));

  const testimonials = all.filter((t) => t.featured).length > 0
    ? all.filter((t) => t.featured)
    : all;

  const [idx, setIdx] = useState(0);
  useEffect(() => { setIdx(0); }, [testimonials.length]);

  const t = testimonials[idx] ?? testimonials[0];

  useEffect(() => {
    if (testimonials.length < 2) return;
    const nextIdx = (idx + 1) % testimonials.length;
    const prevIdx = (idx + testimonials.length - 1) % testimonials.length;
    preloadImage(testimonials[nextIdx]?.screenshotUrl);
    preloadImage(testimonials[prevIdx]?.screenshotUrl);
  }, [idx, testimonials]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setIdx((c) => (c + 1) % testimonials.length),
      SLIDE_INTERVAL
    );
    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goPrev = () => setIdx((c) => (c + testimonials.length - 1) % testimonials.length);
  const goNext = () => setIdx((c) => (c + 1) % testimonials.length);

  const NavBtn = ({ onClick, label, children }) => (
    <button onClick={onClick} aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-sm bg-black/30 transition hover:bg-gold/20 shrink-0">
      {children}
    </button>
  );

  const Dots = () => (
    <div className="flex items-center gap-1.5">
      {testimonials.map((_, i) => (
        <button key={i} onClick={() => setIdx(i)} aria-label={`Review ${i + 1}`}
          className={`rounded-full transition-all ${
            i === idx ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-white/30"
          }`} />
      ))}
    </div>
  );

  const hasImage = Boolean(t?.screenshotUrl);

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-testimonials" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.55_0.08_310_/_0.12),transparent_65%)] blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{sectionHeading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-14 glass-card rounded-3xl relative"
              style={{ height: `${CARD_HEIGHT}px` }}
            >
              {hasImage ? (
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "inherit", overflow: "hidden" }}>
                  <div
                    data-lenis-prevent
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      bottom: `${STRIP_H}px`,
                      overflowY: "auto",
                      scrollbarWidth: "none",
                    }}
                  >
                    <style>{`.ss-img-scroll::-webkit-scrollbar{display:none}`}</style>
                    <div className="ss-img-scroll" style={{ overflowY: "auto", scrollbarWidth: "none" }}>
                      <img
                        src={t.screenshotUrl}
                        alt={t.screenshotAlt}
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                        style={{ width: "100%", height: "auto", display: "block", minHeight: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: "60px",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
                    pointerEvents: "none", zIndex: 1,
                  }} />
                  <div style={{
                    position: "absolute", left: 0, right: 0, bottom: 0,
                    height: `${STRIP_H + 60}px`,
                    background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.92) 55%)",
                    pointerEvents: "none", zIndex: 1,
                  }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    height: `${STRIP_H}px`,
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
                        {t.avatarInitial || t.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <p style={{ color: "#d4af37", fontFamily: "serif", fontWeight: 500, fontSize: "0.95rem", lineHeight: 1.2 }}>
                          {t.name}
                        </p>
                        {t.country && (
                          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginTop: "0.1rem" }}>
                            {t.country}
                          </p>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <NavBtn onClick={goPrev} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
                      <Dots />
                      <NavBtn onClick={goNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-12 relative z-10 h-full flex flex-col justify-center">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.07),transparent_40%)] pointer-events-none" />
                  <Quote className="w-10 h-10 text-gold/30 mx-auto" />
                  <p className="mt-6 font-serif text-2xl md:text-3xl leading-relaxed">
                    &ldquo;{t?.text}&rdquo;
                  </p>
                  <div className="mt-8 flex justify-center gap-1">
                    {[...Array(t?.rating ?? 5)].map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-left">
                      <p className="font-serif text-lg text-gold">{t?.name}</p>
                      <p className="text-xs text-muted-foreground">{t?.country}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <NavBtn onClick={goPrev} label="Previous"><ArrowLeft className="w-4 h-4" /></NavBtn>
                      <Dots />
                      <NavBtn onClick={goNext} label="Next"><ArrowRight className="w-4 h-4" /></NavBtn>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex justify-center">
            <Link to="/testimonials"
              className="inline-flex items-center gap-2 text-gold font-medium hover:text-foreground transition">
              View more testimonials <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
