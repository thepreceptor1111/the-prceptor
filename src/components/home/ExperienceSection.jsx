import { Award, Sparkles, Star, Moon, Compass, BookOpen, Heart, Briefcase } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";

const ICON_MAP = { Award, Sparkles, Star, Moon, Compass, BookOpen, Heart, Briefcase };

const DEFAULT_ITEMS = [
  { icon: "Award",    title: "12 Years of Practice", desc: "Refined over thousands of sessions across Vedic, Western, and symbolic traditions." },
  { icon: "Sparkles", title: "No Templates",         desc: "Every reading is original. Every session is built around you." },
  { icon: "Star",     title: "Global Clientele",     desc: "Trusted by founders, artists, healers, and seekers across 18+ countries." },
];

export function ExperienceSection({ qnaImg }) {
  const { settings } = useSiteSettings();

  const sectionLabel   = settings?.experienceSectionLabel   ?? "The Experience";
  const sectionHeading = settings?.experienceSectionHeading ?? "What makes The Preceptor different?";
  const items          = (settings?.experienceItems?.length ? settings.experienceItems : DEFAULT_ITEMS);

  return (
    <section className="relative py-24 lg:py-32" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal delay={0.05}>
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 id="experience-heading" className="mt-4 text-4xl md:text-5xl">
            {sectionHeading}
          </h2>
          <div className="mt-8 space-y-5">
            {items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Star;
              return (
                <Reveal key={item.title} delay={0.08 + i * 0.07}>
                  <div className="flex items-start gap-5 glass-card rounded-2xl p-5">
                    <div className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
        {qnaImg && (
          <Reveal delay={0.1}>
            <div className="aspect-square rounded-2xl overflow-hidden gold-border shadow-elegant">
              <img src={qnaImg} alt="A private astrology consultation session — calm, focused, world-class"
                width={1200} height={1200} loading="lazy" decoding="async"
                className="w-full h-full object-cover" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
