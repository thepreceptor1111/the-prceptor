import { useEffect } from "react";
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
  const stat1        = settings?.stat1 ?? { value: "6+",   label: "Years of practice" };
  const stat4        = settings?.stat4 ?? { value: "4.98\u2605", label: "Average rating" };

  const imageSrc = settings?.aboutImage?.asset?.url ?? aboutImg;
  const imageAlt = settings?.aboutImage?.alt ?? "The Preceptor \u2014 astrologer portrait";

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal delay={0.1}>
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <div className="absolute inset-0 rounded-3xl ring-1 ring-gold/20 pointer-events-none z-10" />
              <img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                decoding="async"
                width={640}
                height={720}
                className="w-full h-full object-cover"
                style={{ maxHeight: "600px" }}
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent pointer-events-none z-10" />
            </div>
          </Reveal>

          <Reveal>
            <h2
              className="text-4xl md:text-5xl leading-[1.08]"
              style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
            >
              <span className="block">{heading1}</span>
              <span className="block bg-gradient-gold">{heading2Gold}</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">{paragraph1}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{paragraph2}</p>
            <div className="mt-10 flex gap-10">
              <div>
                <p className="font-serif text-4xl bg-gradient-gold">{stat1.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat1.label}</p>
              </div>
              <div>
                <p className="font-serif text-4xl bg-gradient-gold">{stat4.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{stat4.label}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
