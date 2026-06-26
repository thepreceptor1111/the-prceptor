import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { useSiteSettings } from "@/lib/useSiteSettings";

// Hero image: /public dir → no Vite hash → always /hero-section.webp.
// Absolute path (leading /) MUST match the <link rel="preload"> href in
// index.html so both share the same browser cache entry.
const heroImg = "/hero-section.webp";

// 6 particles (was 18) — fewer RAF loops on mount
function Particle({ x, y, size, delay, duration, drift }) {
  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0.8, 0],
        y: [0, -60, -120],
        x: [0, drift],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 3,
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "oklch(0.82 0.12 85 / 0.75)",
        boxShadow: "0 0 6px 2px oklch(0.82 0.12 85 / 0.45)",
        pointerEvents: "none",
      }}
    />
  );
}

// Word-by-word staggered heading.
// PERF: filter:blur REMOVED — non-composited, forces main-thread paint
// every frame. opacity+transform are GPU-composited, zero main-thread cost.
function StaggeredHeading({ line1, line2Gold, delay = 0 }) {
  const words1 = line1.split(" ");
  const words2 = line2Gold.split(" ");

  const wordVariant = {
    hidden: { opacity: 0, x: -22 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: delay + i * 0.13, duration: 1.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <h1
      className="mt-6 sm:mt-8 leading-[1.04]"
      style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(2.25rem, 5vw + 0.75rem, 5.75rem)",
        letterSpacing: "-0.025em",
        fontWeight: 400,
      }}
    >
      <span className="block overflow-hidden">
        {words1.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariant}
            initial="hidden"
            animate="visible"
            className="inline-block mr-[0.25em] last:mr-0"
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block overflow-hidden mt-1">
        {words2.map((word, i) => (
          <motion.span
            key={i}
            custom={words1.length + i}
            variants={wordVariant}
            initial="hidden"
            animate="visible"
            className="inline-block mr-[0.25em] last:mr-0 bg-gradient-gold"
          >
            {word}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export function HeroSection() {
  const { settings } = useSiteSettings();
  const [imgReady, setImgReady] = useState(false);

  const badgeText    = settings?.heroBadgeText    ?? "Premium Astrology";
  const heading1     = settings?.heroHeading1     ?? "Modern guidance,";
  const heading2Gold = settings?.heroHeading2Gold ?? "written in the stars.";
  const bodyCopy     = settings?.heroBodyCopy     ?? "Cinematic, deeply personal astrology consultations for high-intention seekers — designed for clarity in love, career, and life's defining chapters.";
  const cta1Label    = settings?.heroCta1Label    ?? "Book a Session";
  const cta2Label    = settings?.heroCta2Label    ?? "Explore Services";
  const clientCount  = settings?.stat2?.value     ?? "8,400+";
  const clientLabel  = settings?.stat2?.label     ?? "clients";
  const countryCount = settings?.stat3?.value     ?? "47";

  const particles = useMemo(
    () => Array.from({ length: 6 }, (_, idx) => ({
      id: idx,
      x: ((idx * 37 + 11) % 90) + 5,
      y: ((idx * 53 + 17) % 80) + 10,
      size: (idx % 3) + 1.5,
      delay: 2 + idx * 0.6,
      duration: 5 + (idx % 5),
      drift: ((idx * 17 + 7) % 41) - 20,
    })),
    [],
  );

  return (
    <section className="relative overflow-hidden min-h-[100svh] flex items-center">

      {/* Nebula gradient — static, no animation */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 72% 28%, oklch(0.28 0.10 255 / 0.65), transparent 58%)",
            "radial-gradient(ellipse 60% 50% at 18% 78%, oklch(0.35 0.10 30 / 0.22), transparent 58%)",
            "radial-gradient(ellipse 50% 60% at 55% 55%, oklch(0.22 0.07 280 / 0.30), transparent 65%)",
          ].join(", "),
        }}
      />

      {/* Starfield */}
      <div className="absolute inset-0 starfield starfield-glow" aria-hidden />

      {/* Particles — delayed 2s so hero paints first */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {particles.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* Purple nebula fog — deferred, starts after 3s */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, 38, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -top-24 -left-24 w-[65%] h-[85%] pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.52 0.09 295 / 0.30), transparent 62%)" }}
      />

      {/* Amber nebula fog — deferred, starts after 3.5s */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ x: [0, -28, 0], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
        className="absolute bottom-0 right-0 w-[58%] h-[65%] pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.38 0.10 38 / 0.22), transparent 60%)" }}
      />

      {/* Hero figure */}
      <motion.div
        initial={{ opacity: 0.88, y: 28, scale: 1.04 }}
        animate={{ opacity: 0.88, y: 0, scale: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 right-0 w-full lg:w-[68%] xl:w-[62%] pointer-events-none"
        style={{
          WebkitMaskImage: [
            "linear-gradient(to right, transparent 0%, black 30%, black 80%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
            "radial-gradient(ellipse 75% 80% at 62% 44%, black 30%, rgba(0,0,0,0.55) 62%, transparent 88%)",
          ].join(", "),
          maskImage: [
            "linear-gradient(to right, transparent 0%, black 30%, black 80%, transparent 100%)",
            "linear-gradient(to bottom, transparent 0%, black 12%, black 80%, transparent 100%)",
            "radial-gradient(ellipse 75% 80% at 62% 44%, black 30%, rgba(0,0,0,0.55) 62%, transparent 88%)",
          ].join(", "),
          WebkitMaskComposite: "source-in, source-in",
          maskComposite: "intersect, intersect",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        >
          <img
            src={heroImg}
            alt="The Preceptor — celestial guide"
            fetchpriority="high"
            decoding="async"
            width={900}
            height={1200}
            onLoad={() => setImgReady(true)}
            style={{ transition: "opacity 0.6s ease" }}
            className={`absolute inset-0 w-full h-full object-cover object-center lg:scale-[1.18] mix-blend-luminosity ${
              imgReady ? "opacity-[0.88]" : "opacity-0"
            }`}
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, oklch(0.10 0.025 270) 0%, oklch(0.10 0.025 270 / 0.55) 22%, transparent 55%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.10 0.025 270) 0%, oklch(0.10 0.025 270 / 0.45) 15%, transparent 45%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, oklch(0.10 0.025 270 / 0.6) 0%, transparent 30%)" }} />
      </motion.div>

      {/* Left readability gradient */}
      <div
        className="absolute inset-y-0 left-0 pointer-events-none w-full lg:w-[58%]"
        style={{ background: "linear-gradient(to right, oklch(0.10 0.025 270) 38%, oklch(0.10 0.025 270 / 0.75) 58%, transparent 100%)" }}
      />

      {/* Page vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, oklch(0.10 0.025 270 / 0.5) 0%, transparent 18%, transparent 75%, oklch(0.10 0.025 270) 100%)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:py-40 w-full">
        <div className="max-w-full sm:max-w-[44rem] lg:max-w-[46rem]">

          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs uppercase tracking-[0.28em] text-gold"
          >
            <motion.span
              animate={{ rotate: [0, 18, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            >
              <Sparkles className="w-3 h-3" />
            </motion.span>
            {badgeText}
          </motion.span>

          <StaggeredHeading line1={heading1} line2Gold={heading2Gold} delay={0.45} />

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
            style={{ color: "oklch(0.7 0.02 80)" }}
          >
            {bodyCopy}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <motion.div
              animate={{ boxShadow: ["0 0 0 0 oklch(0.82 0.12 85 / 0.0)", "0 0 0 10px oklch(0.82 0.12 85 / 0.12)", "0 0 0 20px oklch(0.82 0.12 85 / 0.0)"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 2.5 }}
              className="rounded-full"
            >
              <Link to="/book" className="btn-primary group">
                {cta1Label}
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
            <a href="#services" className="btn-secondary">{cta2Label}</a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.9 }}
            className="mt-10 sm:mt-14 flex flex-wrap items-center gap-3 sm:gap-5 text-sm"
            style={{ color: "oklch(0.7 0.02 80)" }}
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.9 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Star className="w-4 h-4 fill-gold text-gold" />
                </motion.span>
              ))}
            </div>
            <span>{clientCount} {clientLabel} across {countryCount} countries</span>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ y: [0, 9, 0], opacity: [0, 0.5, 0.75, 0.4] }}
        transition={{
          opacity: { delay: 2.4, duration: 1.2, ease: "easeOut" },
          y: { duration: 3.2, repeat: Infinity, delay: 2.4 },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 select-none flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.38em]" style={{ color: "oklch(0.82 0.12 85 / 0.60)" }}>Scroll</span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="block w-px h-6"
          style={{ background: "oklch(0.82 0.12 85 / 0.45)" }}
        />
      </motion.div>

    </section>
  );
}
