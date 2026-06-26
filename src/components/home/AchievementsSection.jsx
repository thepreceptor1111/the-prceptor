import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { useLenisResize } from "@/hooks/useLenisResize";
import { ACHIEVEMENTS } from "@/utils/constants";

export function AchievementsSection() {
  useLenisResize();

  const { settings } = useSiteSettings();
  const sectionLabel   = settings?.achievementsSectionLabel   ?? "Achievements";
  const sectionHeading = settings?.achievementsSectionHeading ?? "By the numbers.";
  const achievements   = settings?.achievements ?? ACHIEVEMENTS;

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute inset-0 section-glow-achievements" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4">{sectionHeading}</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((a, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="glass-card rounded-2xl p-8 text-center">
                <p className="font-serif text-5xl bg-gradient-gold">{a.value}</p>
                <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{a.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
