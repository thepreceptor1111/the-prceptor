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
  const stat1        = settings?.stat1 ?? { value: "6+",      label: "Years of practice" };
  const stat4        = settings?.stat4 ?? { value: "4.98\u2605", label: "Average rating" };

  const imageSrc = settings?.aboutImage?.asset?.url ?? aboutImg;
  const imageAlt = settings?.aboutImage?.alt ?? "The Preceptor \u2014 astrologer portrait";

  // Gold OKLCH shorthand
  const gold = (a) => `oklch(0.82 0.12 85 / ${a})`;

  // Sparkle dot positions (degrees around the ring)
  const sparkles = [0, 90, 180, 270];

  return (
    <section className="relative overflow-hidden">
      <style>{`
        @keyframes cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.12; }
          50%       { opacity: 0.30; }
        }
        @keyframes sparkle-fade {
          0%, 100% { opacity: 0.9; transform: scale(1);   }
          50%       { opacity: 0.4; transform: scale(0.6); }
        }

        .about-ring-1  { animation: cw  20s linear infinite; }
        .about-ring-2  { animation: ccw 35s linear infinite; }
        .about-ring-3  { animation: cw  55s linear infinite; }
        .about-pulse   { animation: pulse-glow 4s ease-in-out infinite; }

        .about-portrait-wrap:hover .about-ring-1 { animation-duration: 8s; }
        .about-portrait-wrap:hover .about-ring-2 { animation-duration: 14s; }
        .about-portrait-wrap:hover .about-ring-3 { animation-duration: 24s; }
        .about-portrait-wrap:hover .about-pulse  { animation-duration: 1.8s; }

        @media (prefers-reduced-motion: reduce) {
          .about-ring-1, .about-ring-2, .about-ring-3,
          .about-pulse, .sparkle-dot { animation: none !important; }
        }

        .sparkle-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${gold("0.9")};
          box-shadow: 0 0 6px 2px ${gold("0.6")};
          top: 50%;
          left: 50%;
          transform-origin: 0 0;
          animation: sparkle-fade 2.4s ease-in-out infinite;
        }
        .sparkle-dot:nth-child(2) { animation-delay: 0.6s; }
        .sparkle-dot:nth-child(3) { animation-delay: 1.2s; }
        .sparkle-dot:nth-child(4) { animation-delay: 1.8s; }
      `}</style>

      <div className="grid lg:grid-cols-2 items-center min-h-[600px] lg:min-h-[720px]">

        {/* ── Left: circular portrait with orbital rings ── */}
        <Reveal delay={0.1}>
          <div
            className="about-portrait-wrap relative flex items-center justify-center p-10 lg:p-16"
            style={{ overflow: "visible" }}
          >

            {/* Pulsing ambient glow */}
            <div
              className="about-pulse absolute rounded-full pointer-events-none"
              style={{
                width:      "clamp(320px, 48vw, 560px)",
                height:     "clamp(320px, 48vw, 560px)",
                background: `radial-gradient(circle, ${gold("0.18")} 0%, transparent 68%)`,
                filter:     "blur(32px)",
              }}
            />

            {/* Ring 3 — outermost, very slow clockwise, dotted */}
            <div
              className="about-ring-3 absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(430px, 58vw, 630px)",
                height: "clamp(430px, 58vw, 630px)",
                border: `1px dotted ${gold("0.10")}`,
              }}
            />

            {/* Ring 2 — middle, counter-clockwise, dashed */}
            <div
              className="about-ring-2 absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(380px, 52vw, 580px)",
                height: "clamp(380px, 52vw, 580px)",
                border: `1px dashed ${gold("0.18")}`,
              }}
            />

            {/* Ring 1 — innermost, clockwise, solid + sparkle dots */}
            <div
              className="about-ring-1 absolute rounded-full pointer-events-none"
              style={{
                width:  "clamp(340px, 47vw, 540px)",
                height: "clamp(340px, 47vw, 540px)",
                border: `1px solid ${gold("0.30")}`,
              }}
            >
              {/* Sparkle dots at N / E / S / W */}
              {sparkles.map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                // radius in px at midpoint of clamp — approx 270px
                const r = 270;
                const x = Math.cos(rad - Math.PI / 2) * r;
                const y = Math.sin(rad - Math.PI / 2) * r;
                return (
                  <span
                    key={i}
                    className="sparkle-dot"
                    style={{
                      marginLeft: `${x - 2.5}px`,
                      marginTop:  `${y - 2.5}px`,
                    }}
                  />
                );
              })}
            </div>

            {/* Circle image */}
            <div
              className="relative rounded-full overflow-hidden flex-shrink-0"
              style={{
                width:      "clamp(300px, 44vw, 500px)",
                height:     "clamp(300px, 44vw, 500px)",
                boxShadow:  `0 0 0 2px ${gold("0.50")}, 0 0 60px ${gold("0.25")}, 0 28px 72px oklch(0 0 0 / 0.55)`,
                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.5s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform  = "scale(1.04)";
                e.currentTarget.style.boxShadow = `0 0 0 2px ${gold("0.70")}, 0 0 90px ${gold("0.38")}, 0 28px 72px oklch(0 0 0 / 0.55)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform  = "scale(1)";
                e.currentTarget.style.boxShadow = `0 0 0 2px ${gold("0.50")}, 0 0 60px ${gold("0.25")}, 0 28px 72px oklch(0 0 0 / 0.55)`;
              }}
            >
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                width={500}
                height={500}
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
              style={{ fontFamily: "var(--font-serif)", fontWeight: 300 }}
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
