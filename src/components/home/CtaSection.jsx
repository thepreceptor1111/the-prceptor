import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useLenisResize } from "@/hooks/useLenisResize";

// ── Inline SVG icon — removes lucide-react dependency ────────────────────
function ArrowRight({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function CtaSection() {
  useLenisResize();

  const { settings } = useSiteSettings();
  const heading  = settings?.ctaSectionHeading  ?? "Ready for clarity?";
  const subtext  = settings?.ctaSectionSubtext  ?? "Book a private consultation and take the first step toward understanding your chart \u2014 and yourself.";
  const btnLabel = settings?.ctaSectionBtnLabel ?? "Book a Session";

  return (
    <section className="pt-32 lg:pt-40 pb-16 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 section-glow-cta" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] aspect-square rounded-full bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.07),transparent_65%)] blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center relative z-10">
        <Reveal>
          <span className="text-sm uppercase tracking-[0.3em] text-gold">Begin</span>
          <h2 className="mt-4 text-5xl md:text-6xl lg:text-7xl">{heading}</h2>
          <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">{subtext}</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="btn-primary inline-flex items-center gap-2">
              {btnLabel} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-secondary">View Services</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
