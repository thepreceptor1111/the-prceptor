import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Star, Briefcase, Heart, Moon, Sparkles,
  BookOpen, Compass, CheckCircle, Clock,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { OfferTimer } from "@/components/site/OfferTimer";
import { SERVICES, SITE } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { SERVICES_QUERY } from "@/lib/sanityQueries";

const ICON_MAP = {
  Star, BookOpen, Heart,
  HeartHandshake: Heart,
  Rings: Moon,
  Briefcase,
  Saturn: Sparkles,
  Hourglass: Moon,
  Orbit: Sparkles,
  Compass,
  Moon, Sparkles,
};

const INCLUDES = [
  "Private 1-on-1 video session",
  "Full session recording delivered within 24h",
  "Written summary of key themes",
  "Follow-up Q&A via email (48h window)",
  "Timezone-aware scheduling",
];

/**
 * Normalise a Sanity service doc into the shape the card expects.
 */
function normaliseService(s) {
  return {
    slug:          s.slug?.current ?? s.slug ?? s._id,
    title:         s.title ?? "",
    badge:         s.tagline ?? "",
    desc:          s.description ?? "",
    duration:      s.sessionDuration ? `${s.sessionDuration} min` : "60 min",
    price:         s.price ? `${s.currency ?? "$"}${s.price}` : "",
    originalPrice: s.originalPrice ? `${s.currency ?? "$"}${s.originalPrice}` : "",
    icon:          "Star",
    isSoldOut:     s.isSoldOut ?? false,
    isPopular:     s.isPopular ?? false,
  };
}

export default function ServicesPage() {
  const { data: cmsServices, loading } = useSanity(SERVICES_QUERY, null);
  const { settings } = useSiteSettings();

  // Use CMS data when available; fall back to constants
  const services = cmsServices && cmsServices.length > 0
    ? cmsServices.map(normaliseService)
    : SERVICES;

  const email = settings?.email ?? SITE?.email;

  return (
    <>
      <SEO {...PAGE_SEO.services} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-36 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.28_0.10_255_/_0.45),transparent_65%)]" />
          <div className="absolute inset-0 starfield" aria-hidden />
          <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-gold"
            >
              {settings?.servicesSectionLabel ?? "— What We Offer"}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              {settings?.servicesSectionHeading ?? (
                <>
                  Sessions designed for
                  <span className="block bg-gradient-gold"> the discerning seeker.</span>
                </>
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.9 }}
              className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {settings?.servicesSectionSubtitle ??
                "Every consultation is a private, one-on-one experience — unhurried, deeply personal, and focused entirely on your questions."}
            </motion.p>
          </div>
        </section>

        {/* All service cards */}
        <section className="py-20 bg-cosmic-deep relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none section-glow-services" aria-hidden />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

            <Reveal className="mb-4">
              <OfferTimer />
            </Reveal>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="glass-card rounded-2xl p-8 h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((s, i) => {
                  const Icon = ICON_MAP[s.icon] || Star;
                  return (
                    <Reveal key={s.slug} delay={i * 0.06}>
                      <motion.div
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="glass-card rounded-2xl p-8 flex flex-col gap-3 group hover:border-primary/40 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.12_85_/_0.06),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex flex-col gap-3 h-full">
                          <div className="w-12 h-12 rounded-full bg-primary/10 text-gold flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>

                          {s.badge && (
                            <span className="inline-block self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20 text-gold">
                              {s.badge}
                            </span>
                          )}

                          <div className="flex-1">
                            <h2 className="text-2xl font-serif leading-snug">{s.title}</h2>
                            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                            <span className="flex items-center gap-1 text-xs text-gold">
                              <Clock className="w-3 h-3" />
                              {s.duration}
                            </span>
                            <div className="flex items-baseline gap-2">
                              {s.originalPrice && (
                                <span className="text-sm text-muted-foreground line-through">
                                  {s.originalPrice}
                                </span>
                              )}
                              <span className="font-serif text-xl text-gold">{s.price}</span>
                            </div>
                          </div>

                          {s.isSoldOut ? (
                            <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed">
                              Sold Out
                            </span>
                          ) : (
                            <Link
                              to="/book"
                              className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-foreground transition group/link"
                            >
                              Book this session
                              <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* What's included */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Every Session</span>
              <h2 className="mt-4 text-3xl md:text-4xl">What's always included.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-10 grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Ready to book?</h2>
              <p className="mt-4 text-muted-foreground">
                Choose your session and reserve your private time. Slots fill up — early scheduling is recommended.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/book" className="btn-primary">
                  Reserve a Session <ArrowRight className="w-4 h-4" />
                </Link>
                {email && (
                  <a href={`mailto:${email}`} className="btn-secondary">
                    Have a question?
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
