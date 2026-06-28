import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { OfferTimer } from "@/components/site/OfferTimer";
import { SERVICES, SITE } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useOfferActive } from "@/lib/useOfferActive";
import { SERVICES_QUERY } from "@/lib/sanityQueries";

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

function CheckCircleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
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

const INCLUDES = [
  "Private 1-on-1 video session",
  "A brief preliminary discussion before the session",
  "Verbal revision of key themes",
  "Follow-up Q&A via email (48h window)",
  "Timezone-aware scheduling",
];

const TABS = [
  { key: 'all',     label: 'All Sessions',   icon: null },
  { key: 'quick',   label: 'Quick Guidance',  icon: ZapIcon },
  { key: 'mid',     label: 'Mid Level',       icon: LayersIcon },
  { key: 'indepth', label: 'In-depth',        icon: SearchIcon },
];

function normaliseService(s) {
  const fmtPrice = (v) => {
    if (v === null || v === undefined || v === "") return "";
    if (typeof v === "number") return `$${v}`;
    return String(v).startsWith("$") ? String(v) : `$${v}`;
  };

  return {
    slug:          s.slug?.current ?? s.slug ?? s._id,
    title:         s.title ?? "",
    badge:         s.tagline ?? s.badge ?? "",
    desc:          s.description ?? s.desc ?? "",
    duration:      s.sessionDuration ?? s.duration ?? "60 min",
    price:         fmtPrice(s.price),
    originalPrice: fmtPrice(s.originalPrice),
    icon:          s.icon ?? "Star",
    isSoldOut:     s.isSoldOut ?? false,
    isPopular:     s.isPopular ?? false,
    sessionTier:   s.sessionTier ?? null,
  };
}

export default function ServicesPage() {
  const { data: cmsServices, loading } = useSanity(SERVICES_QUERY, null);
  const { settings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('all');
  const offerActive = useOfferActive();

  const raw = cmsServices && cmsServices.length > 0 ? cmsServices : SERVICES;
  const services = raw.map(normaliseService);
  const hasTiers = services.some(s => s.sessionTier);

  const filtered = activeTab === 'all'
    ? services
    : services.filter(s => s.sessionTier === activeTab);

  const email = settings?.email ?? SITE?.email;

  return (
    <>
      <SEO {...PAGE_SEO.services} />

      <main className="min-h-screen">

        <section className="relative py-36">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,oklch(0.28_0.10_255_/_0.45),transparent_65%)]" />
            <div className="absolute inset-0 starfield" />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center z-10">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.3em] text-gold"
            >
              {settings?.servicesSectionLabel ?? "What We Offer"}
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
                "Every consultation is a private, one-on-one experience. Unhurried, deeply personal, and focused entirely on your questions."}
            </motion.p>
          </div>
        </section>

        <section className="py-20 bg-cosmic-deep relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            <div className="absolute inset-0 section-glow-services" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

            <Reveal className="mb-8">
              <OfferTimer />
            </Reveal>

            {!loading && hasTiers && (
              <Reveal className="mb-10">
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
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />}
                      </button>
                    );
                  })}
                </div>
              </Reveal>
            )}

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-2xl p-8 h-64 animate-pulse bg-[oklch(0.14_0.030_270)]" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {filtered.map((s, i) => {
                    const Icon = ICON_MAP[s.icon] || StarIcon;
                    const displayedPrice = !offerActive && s.originalPrice ? s.originalPrice : s.price;
                    return (
                      <Reveal key={s.slug} delay={i * 0.06}>
                        <motion.div
                          whileHover={{ y: -6 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="bg-[oklch(0.14_0.030_270)] border border-[oklch(0.25_0.020_270)] rounded-2xl p-8 flex flex-col gap-3 group hover:border-gold/40 relative overflow-hidden"
                        >
                          <div className="relative z-10 flex flex-col gap-3 h-full">

                            {/* Icon */}
                            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center">
                              <Icon className="w-4 h-4" />
                            </div>

                            {/* Badges — text-[10px] → text-xs (12px floor) */}
                            <div className="flex flex-wrap gap-1.5">
                              {s.isPopular && (
                                <span className="inline-block text-xs uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/30 text-gold bg-gold/5">Popular</span>
                              )}
                              {s.badge && (
                                <span className="inline-block text-xs uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold/20 text-gold break-words">{s.badge}</span>
                              )}
                              {s.isSoldOut && (
                                <span className="inline-block text-xs uppercase tracking-widest px-2 py-0.5 rounded-full border border-red-400/30 text-red-400">Sold Out</span>
                              )}
                            </div>

                            <div className="flex-1">
                              {/* Title — text-xl → text-base + var(--font-serif) */}
                              <h4
                                className="text-base leading-snug font-medium tracking-wide"
                                style={{ fontFamily: "var(--font-serif)" }}
                              >
                                {s.title}
                              </h4>
                              {/* Description — text-sm → text-base */}
                              <p className="mt-3 text-muted-foreground text-base leading-relaxed">{s.desc}</p>
                            </div>

                            {/* Footer: duration + price */}
                            <div className="flex items-center justify-between pt-4 border-t border-gold/10">
                              {/* Duration — text-xs → text-sm, icon bump */}
                              <span className="flex items-center gap-1.5 text-sm text-gold">
                                <ClockIcon className="w-3.5 h-3.5" />{s.duration}
                              </span>
                              <div className="flex items-baseline gap-2">
                                {offerActive && s.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">{s.originalPrice}</span>
                                )}
                                {/* Price — text-lg → text-xl */}
                                <span className="font-semibold text-gold text-xl">{displayedPrice}</span>
                              </div>
                            </div>

                            {s.isSoldOut ? (
                              <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-not-allowed">Sold Out</span>
                            ) : (
                              <Link
                                to="/book"
                                className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-foreground transition group/link"
                              >
                                Book this session
                                <ArrowRightIcon className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      </Reveal>
                    );
                  })}
                  {filtered.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                      No services in this category yet.
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </section>

        <section className="py-24 relative">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Every Session</span>
              <h2 className="mt-4 text-3xl md:text-4xl">What&apos;s always included.</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-10 grid sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Reveal>
              <h2 className="text-3xl md:text-4xl">Ready to book?</h2>
              <p className="mt-4 text-muted-foreground">
                Choose your session and reserve your private time. Slots fill up, so early scheduling is recommended.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Link to="/book" className="btn-primary">
                  Reserve a Session <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <Link to="/qna" className="btn-secondary">Have a question?</Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
    </>
  );
}
