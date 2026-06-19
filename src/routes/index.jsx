import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import qnaImg from "@/assets/qna-section.jpg?format=webp&quality=80";

import { HeroSection }         from "@/components/home/HeroSection";
import { AboutSection }        from "@/components/home/AboutSection";
import { ServicesSection }     from "@/components/home/ServicesSection";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ExperienceSection }   from "@/components/home/ExperienceSection";
import { FaqSection }          from "@/components/home/FaqSection";
import { CtaSection }          from "@/components/home/CtaSection";

export default function Home() {
  return (
    <>
      <SEO {...PAGE_SEO.home} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <AchievementsSection />
      <TestimonialsSection />
      <ExperienceSection qnaImg={qnaImg} />
      <FaqSection />
      <CtaSection />
    </>
  );
}
