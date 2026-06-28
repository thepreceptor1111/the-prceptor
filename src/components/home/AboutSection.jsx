import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useLenisResize } from "@/hooks/useLenisResize";
import aboutImg from "@/assets/about-section.webp";

export function AboutSection() {
  useLenisResize();

  const { settings } = useSiteSettings();

  const heading1     = settings?.aboutHeading1     ?? "A modern astrologer";
  const heading2Gold = settings?.aboutHeading2Gold ?? "for a modern world.";
  const paragraph1   = settings?.aboutParagraph1   ?? "For over twelve years, The Preceptor has guided executives, artists, and seekers through life\u2019s most pivotal chapters \u2014 translating classical Vedic and Western astrology into language that is grounded, modern, and quietly powerful.";
  const paragraph2   = settings?.aboutParagraph2   ?? "Our philosophy is simple: the stars do not predict your fate \u2014 they reveal your design. We help you read it.";
  const stat1        = settings?.stat1 ?? { value: "6+",     label: "Years of practice" };
  const stat4        = settings?.stat4 ?? { value: "4.98\u2605", label: "Average rating" };

  const imageSrc = settings?.aboutImage?.asset?.url ?? aboutImg;
  const imageAlt = settings?.aboutImage?.alt ?? "The Preceptor \u2014 astrologer portrait";

  return (
    <section className="relative overflow-hidden">
      {/* Orbital ring keyframe — injected once */}
      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .about-orbit {
          animation: orbit-spin 28s linear infinite;
        }
      `}</style>

      <div className="grid lg:grid-cols-2 items-center min-h-[600px] lg:min-h-[680px]">

        {/* ── Left: circular portrait ── */}
        <Reveal delay={0.1}>
          <div className="relative flex items-center justify-center p-10 lg:p-14">

            {/* Outer orbital dashed ring */}
            <div
              className="about-orbit absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(300px, 42vw, 460px)",
                height: "clamp(300px, 42vw, 460px)",
                border: "1px dashed oklch(0.82 0.12 85 / 0.18)",
              }}
            />

            {/* Second static decorative ring */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(276px, 38.5vw, 436px)",
                height: "clamp(276px, 38.5vw, 436px)",
                border: "1px solid oklch(0.82 0.12 85 / 0.10)",
              }}
            />

            {/* Gold glow ambient */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(260px, 36vw, 420px)",
                height: "clamp(260px, 36vw, 420px)",
                background: "radial-gradient(circle, oklch(0.82 0.12 85 / 0.12) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            {/* Circle image container */}
            <div
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{
                width:     "clamp(240px, 34vw, 400px)",
                height:    "clamp(240px, 34vw, 400px)",
                boxShadow: "0 0 0 2px oklch(0.82 0.12 85 / 0.45), 0 0 48px oklch(0.82 0.12 85 / 0.22), 0 24px 64px oklch(0 0 0 / 0.5)",
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.82 0.12 85 / 0.65), 0 0 72px oklch(0.82 0.12 85 / 0.32), 0 24px 64px oklch(0 0 0 / 0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 0 0 2px oklch(0.82 0.12 85 / 0.45), 0 0 48px oklch(0.82 0.12 85 / 0.22), 0 24px 64px oklch(0 0 0 / 0.5)";
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
                className="w-full h-full object-cover object-top"
                style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              />
            </div>

          </div>
        </Reveal>

        {/* ── Right: text content ── */}
        <Reveal>
          <div className="py-20 lg:py-28 px-10 lg:px-16 xl:px-20 flex flex-col justify-center">

            <p className="eyebrow text-gold mb-6">— OUR PRACTICE</p>

            <h2
              className="text-4xl md:text-5xl leading-[1.08]"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
            >
              <span className="block">{heading1}</span>
              <span className="block bg-gradient-gold italic">{heading2Gold}</span>
            </h2>

            <p className="mt-6 text-muted-foreground leading-relaxed">{paragraph1}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{paragraph2}</p>

            <div className="mt-10 flex divide-x divide-gold/20">
              <div className="pr-10">
                <p className="font-serif text-4xl bg-gradient-gold">{stat1.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat1.label}</p>
              </div>
              <div className="pl-10">
                <p className="font-serif text-4xl bg-gradient-gold">{stat4.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat4.label}</p>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}
