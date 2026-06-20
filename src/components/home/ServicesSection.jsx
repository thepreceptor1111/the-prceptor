import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star, Briefcase, Heart, Moon, Sparkles, BookOpen,
  Compass, ArrowRight, Clock, Loader2, Zap, Layers, Search,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { OfferTimer } from "@/components/site/OfferTimer";
import { HOME_SERVICES } from "@/utils/constants";
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

const TIERS = [
  {
    key: 'quick',
    label: 'Quick Guidance',
    subtitle: 'Short Session',
    icon: Zap,
    color: 'text-amber-400',
    border: 'border-amber-400/20',
  },
  {
    key: 'mid',
    label: 'Mid Level Guidance',
    subtitle: 'Balanced Depth',
    icon: Layers,
    color: 'text-gold',
    border: 'border-gold/20',
  },
  {
    key: 'indepth',
    label: 'In-depth Guidance',
    subtitle: 'Comprehensive',
    icon: Search,
    color: 'text-violet-400',
    border: 'border-violet-400/20',
  },
];

function normalise(s) {
  return {
    slug:          s.slug?.current ?? s.slug ?? s._id,
    title:         s.title,
    badge:         s.tagline ?? s.badge ?? null,
    desc:          s.description ?? s.desc ?? "",
    duration:      s.sessionDuration ?? s.duration ?? "60 min",
    price:         s.price ? `$${s.price}` : s.price,
    originalPrice: s.originalPrice ? `$${s.originalPrice}` : s.originalPrice ?? null,
    icon:          s.icon ?? "Star",
    isSoldOut:     s.isSoldOut ?? false,
    isPopular:     s.isPopular ?? false,
    sessionTier:   s.sessionTier ?? null,
  };
}

function ServiceCard({ s, i }) {
  const Icon = ICON_MAP[s.icon] || Star;
  return (
    <Reveal delay={i * 0.07}>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-2xl p-8 h-full group cursor-pointer hover:border-primary/40 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(0.82_0.12_85_/_0.07),transparent_40%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col h-full gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-gold flex items-center justify-center group-hover:bg-primary/20 transition">
            <Icon className="w-5 h-5" />
          </div>
          {s.isPopular && (
            <span className="inline-block self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/5">
              Popular
            </span>
          )}
          {s.badge && !s.isPopular && (
            <span className="inline-block self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20 text-gold">
              {s.badge}
            </span>
          )}
          {s.isSoldOut && (
            <span className="inline-block self-start text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-red-400/30 text-red-400">
              Sold Out
            </span>
          )}
          <h3 className="text-xl leading-snug">{s.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{s.desc}</p>
          <div className="mt-2 flex items-center justify-between border-t border-gold/10 pt-3">
            <span className="flex items-center gap-1 text-xs text-gold">
              <Clock className="w-3 h-3" />
              {s.duration}
            </span>
            <div className="flex items-baseline gap-2">
              {s.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">{s.originalPrice}</span>
              )}
              <span className="font-semibold text-gold text-lg">{s.price}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function ServicesSection() {
  const { data: allServices, loading } = useSanity(SERVICES_QUERY, null);
  const { settings } = useSiteSettings();

  const sectionLabel    = settings?.servicesSectionLabel    ?? "Services";
  const sectionHeading  = settings?.servicesSectionHeading  ?? "Consultations crafted with intention.";
  const sectionSubtitle = settings?.servicesSectionSubtitle ?? null;

  // If no sessionTier data yet (Sanity not updated), fall back to flat grid
  const hasTiers = allServices?.some(s => s.sessionTier);

  const services = allServices ? allServices.map(normalise) : HOME_SERVICES;

  return (
    <section id="services" className="py-32 relative bg-cosmic-deep overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-services" aria-hidden />
      <div className="cosmic-stars absolute inset-0 pointer-events-none" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.08_310_/_0.15),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.82_0.12_85_/_0.08),transparent_65%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Section header */}
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{sectionHeading}</h2>
          {sectionSubtitle && (
            <p className="mt-5 text-muted-foreground">{sectionSubtitle}</p>
          )}
        </Reveal>

        <Reveal className="mt-10">
          <OfferTimer />
        </Reveal>

        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-6 h-6 text-gold animate-spin" />
          </div>
        )}

        {!loading && hasTiers && (
          // ── 3-TIER GROUPED LAYOUT ───────────────────────────────────
          <div className="mt-16 space-y-20">
            {TIERS.map((tier) => {
              const tierServices = services.filter(s => s.sessionTier === tier.key);
              if (tierServices.length === 0) return null;
              const TierIcon = tier.icon;
              return (
                <div key={tier.key}>
                  {/* Tier heading */}
                  <Reveal>
                    <div className={`flex items-center gap-3 mb-8 pb-4 border-b ${tier.border}`}>
                      <TierIcon className={`w-5 h-5 ${tier.color}`} />
                      <div>
                        <h3 className={`text-lg font-medium ${tier.color}`}>{tier.label}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">{tier.subtitle}</p>
                      </div>
                    </div>
                  </Reveal>
                  {/* Cards */}
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {tierServices.map((s, i) => (
                      <ServiceCard key={s.slug} s={s} i={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && !hasTiers && (
          // ── FLAT GRID FALLBACK (no tiers set in Sanity yet) ──────────
          <div className="mt-16 grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.slice(0, 4).map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </div>
        )}

        <Reveal className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition font-medium text-sm tracking-wide group"
          >
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
