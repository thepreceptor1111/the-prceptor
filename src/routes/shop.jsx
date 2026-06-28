import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { SHOP_ITEMS } from "@/utils/constants";

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
function ExternalLinkIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

export default function ShopPageWrapper() {
  return (
    <>
      <Helmet>
        <title>Shop — Resources & Readings | The Preceptor</title>
        <meta name="description" content="Digital resources, chart readings, and astrology tools from The Preceptor studio." />
        <link rel="canonical" href="https://www.thepreceptorglobal.com/shop" />
      </Helmet>
      <ShopPage />
    </>
  );
}

function ShopPage() {
  const { settings } = useSiteSettings();
  const items = settings?.shopItems ?? SHOP_ITEMS ?? [];

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
              <SparklesIcon className="w-3 h-3" /> The Studio Shop
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1
              className="mt-8 text-balance"
              style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
            >
              Resources &amp;<br />
              <span className="display-italic text-gold">digital tools.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 lead text-lg md:text-xl mx-auto">
              Guides, readings, and digital resources from The Preceptor studio — crafted to extend the conversation beyond your session.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Shop grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">New resources coming soon. Check back shortly.</p>
              <Link to="/contact" className="mt-6 inline-flex items-center gap-2 text-gold hover:gap-3 transition-all text-sm">
                Get notified <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group">
                    {item.image && (
                      <div className="aspect-video overflow-hidden">
                        <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      {item.badge && (
                        <span className="inline-block mb-3 px-2.5 py-1 rounded-full text-xs uppercase tracking-[0.15em] bg-gold/15 text-gold border border-gold/25">{item.badge}</span>
                      )}
                      <h3 className="text-lg font-medium">{item.title}</h3>
                      {item.description && <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed flex-1">{item.description}</p>}
                      <div className="mt-5 flex items-center justify-between">
                        {item.price && <span className="font-serif text-xl text-gold">{item.price}</span>}
                        {item.link && (
                          <a href={item.link} target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 btn-primary text-sm py-2 px-4">
                            Get it <ExternalLinkIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-deep relative overflow-hidden">
        <div className="absolute inset-0 bg-hero opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="eyebrow">— Prefer a live session?</span>
            <h2 className="mt-5 text-3xl md:text-4xl text-balance">Work directly with The Preceptor.</h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground mx-auto max-w-xl leading-relaxed">
              Digital resources are a starting point. A private session is where real clarity begins.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="btn-primary group">
                Book a Session
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </Link>
              <Link to="/services" className="btn-secondary">View Services</Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
