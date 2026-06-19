import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSiteSettings } from "@/lib/useSiteSettings";

export function AchievementsSection() {
  const { settings } = useSiteSettings();

  const sectionLabel   = settings?.achievementsSectionLabel   ?? "Recognition";
  const sectionHeading = settings?.achievementsSectionHeading ?? "A practice built on trust.";

  const achievements = [
    settings?.stat1 ?? { value: "12+",   label: "Years of Practice" },
    settings?.stat2 ?? { value: "8,400", label: "Sessions Delivered" },
    settings?.stat3 ?? { value: "47",    label: "Countries Served" },
    settings?.stat4 ?? { value: "4.98",  label: "Average Rating" },
  ];

  return (
    <section className="py-32 bg-cosmic-deep relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none section-glow-achievements" aria-hidden />
      <div className="absolute inset-0 bg-hero opacity-50" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[50%] bg-[radial-gradient(ellipse_at_top,oklch(0.82_0.12_85_/_0.1),transparent_65%)] blur-3xl" />
      </div>
      <div className="cosmic-stars absolute inset-0 pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{sectionHeading}</h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-2xl p-8 text-center hover:shadow-gold transition relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,oklch(0.82_0.12_85_/_0.08),transparent_50%)] opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <Award className="w-6 h-6 text-gold mx-auto" />
                  <p className="mt-4 font-serif text-4xl md:text-5xl bg-gradient-gold">{a.value}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{a.label}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
