import { Sun, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";

export function CtaSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-cta" aria-hidden />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.82_0.12_85_/_0.07),transparent_60%)] blur-3xl" />
      </div>
      <div className="max-w-5xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden glass-card p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-hero opacity-60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.15),transparent_40%)]" />
            <div className="relative z-10">
              {/* Pure CSS rotation — no framer-motion needed for a simple spin */}
              <Sun
                className="w-10 h-10 text-gold mx-auto"
                style={{ animation: "ctaSunSpin 6s ease-in-out infinite" }}
              />
              <style>{`
                @keyframes ctaSunSpin {
                  0%, 100% { transform: rotate(0deg) scale(1); }
                  33%       { transform: rotate(15deg) scale(1.12); }
                  66%       { transform: rotate(-10deg) scale(1); }
                }
              `}</style>
              <h2 className="mt-6 text-4xl md:text-5xl">Begin your reading.</h2>
              <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
                A single conversation can shift the trajectory of a decade. Reserve your private session today.
              </p>
              <Link to="/book"
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition">
                Book Your Session <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
