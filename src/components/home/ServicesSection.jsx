import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { OfferTimer } from "@/components/site/OfferTimer";
import { HOME_SERVICES } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useOfferActive } from "@/lib/useOfferActive";
import { SERVICES_QUERY } from "@/lib/sanityQueries";
import { useLenisResize } from "@/hooks/useLenisResize";

// ── Inline SVG icons ───────────────────────────────────────────────────────────────────────
function StarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function BriefcaseIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
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

function BookOpenIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CompassIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
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

function Loader2Icon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function ZapIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function LayersIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
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

const ICON_MAP = {
  Star:           StarIcon,
  BookOpen:       BookOpenIcon,
  Heart:          HeartIcon,
  HeartHandshake: HeartIcon,
  Rings:          MoonIcon,
  Briefcase:      BriefcaseIcon,
  Saturn:         SparklesIcon,
  Hourglass:      MoonIcon,
  Orbit:          SparklesIcon,
  Compass:        CompassIcon,
  Moon:           MoonIcon,
  Sparkles:       SparklesIcon,
};

const DEFAULT_HOME_SERVICES_LIMIT = 6;

const TABS = [
  { key: 'all',     label: 'All',            icon: null },
  { key: 'quick',   label: 'Quick Guidance',  icon: ZapIcon },
  { key: 'mid',     label: 'Mid Level',       icon: LayersIcon },
  { key: 'indepth', label: 'In-depth',        icon: SearchIcon },
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
  const Icon = ICON_MAP[s.icon] || StarIcon;
  const offerActive = useOfferActive();

  const displayedPrice = !offerActive && s.originalPrice ? s.originalPrice : s.price;

  return (
    <motion.div
      key={s.slug}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to="/book" className="block h-full">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[oklch(0.14_0.030_270)] border border-[oklch(0.25_0.020_270)] rounded-2xl p-8 h-full group cursor-pointer hover:border-gold/40 relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col h-full gap-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
              <Icon className="w-4 h-4" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {s.isPopular && (
                <span className="inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/5">Popular</span>
              )}
              {s.badge && (
                <span className="inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20 text-gold break-words">{s.badge}</span>
              )}
              {s.isSoldOut && (
                <span className="inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-red-400/30 text-red-400">Sold Out</span>
              )}
            </div>
            <h3
              className="text-xl leading-snug"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
            >
              {s.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">{s.desc}</p>
            <div className="mt-2 flex items-center justify-between border-t border-gold/10 pt-3">
              <span className="flex items-center gap-1 text-xs text-gold">
                <ClockIcon className="w-3 h-3" />{s.duration}
              </span>
              <div className="flex items-baseline gap-2">
                {offerActive && s.originalPrice && (
                  <span className="text-xs text-muted-foreground line-through">{s.originalPrice}</span>
                )}
                <span className="font-semibold text-gold text-lg">{displayedPrice}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export function ServicesSection({ initialServices = null, servicesLoading = false }) {
  useLenisResize();

  const skip = initialServices !== null;
  const { data: ownServices, loading: ownLoading } = useSanity(
    skip ? null : SERVICES_QUERY,
    null
  );

  const allServices = skip ? initialServices : ownServices;
  const loading     = skip ? servicesLoading  : ownLoading;

  const { settings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('all');

  const sectionLabel    = settings?.servicesSectionLabel    ?? "Services";
  const sectionHeading  = settings?.servicesSectionHeading  ?? "Consultations crafted with intention.";
  const sectionSubtitle = settings?.servicesSectionSubtitle ?? null;

  const homeLimit = settings?.homeServicesLimit
    ? Number(settings.homeServicesLimit)
    : DEFAULT_HOME_SERVICES_LIMIT;

  const hasTiers = allServices?.some(s => s.sessionTier);
  const services = allServices ? allServices.map(normalise) : HOME_SERVICES;

  const filtered = (activeTab === 'all'
    ? services
    : services.filter(s => s.sessionTier === activeTab)
  ).slice(0, homeLimit);

  return (
    <section id="services" className="py-32 relative bg-cosmic-deep">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 section-glow-services" />
        <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[radial-gradient(ellipse_at_top_right,oklch(0.55_0.08_310_/_0.15),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.82_0.12_85_/_0.08),transparent_65%)] blur-3xl" />
      </div>
      <div className="cosmic-stars absolute inset-0 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-sm uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-5xl md:text-6xl">{sectionHeading}</h2>
          {sectionSubtitle && <p className="mt-5 text-muted-foreground">{sectionSubtitle}</p>}
        </Reveal>
        <Reveal className="mt-10">
          <OfferTimer />
        </Reveal>
        {!loading && hasTiers && (
          <Reveal className="mt-10">
            <div className="flex flex-wrap justify-center gap-2">
              {TABS.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                      isActive
                        ? 'bg-gold/15 border-gold/50 text-gold'
                        : 'border-gold/15 text-muted-foreground hover:border-gold/30 hover:text-gold'
                    }`}
                  >
                    {TabIcon && <TabIcon className="w-3.5 h-3.5" />}
                    {tab.label}
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>
        )}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2Icon className="w-6 h-6 text-gold animate-spin" />
          </div>
        )}
        {!loading && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="mt-10 grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filtered.map((s, i) => (
                <ServiceCard key={s.slug} s={s} i={i} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-muted-foreground">
                  No services in this category yet.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
        <Reveal className="mt-12 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-gold/40 text-gold hover:bg-gold/10 transition font-medium text-sm tracking-wide group"
          >
            View All Services
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
