import { lazy, Suspense } from "react";
import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import qnaImg from "@/assets/qna-section.jpg?format=webp&quality=80";

// HeroSection is EAGER — it is the LCP element, must paint immediately
import { HeroSection } from "@/components/home/HeroSection";

// All below-fold sections are LAZY — browser fetches them after hero paints
const AboutSection        = lazy(() => import("@/components/home/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection     = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const AchievementsSection = lazy(() => import("@/components/home/AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ExperienceSection   = lazy(() => import("@/components/home/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const FaqSection          = lazy(() => import("@/components/home/FaqSection").then(m => ({ default: m.FaqSection })));
const CtaSection          = lazy(() => import("@/components/home/CtaSection").then(m => ({ default: m.CtaSection })));

// Minimal inline fallback — no layout shift, no spinner flash
function SectionFallback() {
  return <div style={{ minHeight: '400px' }} aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <SEO {...PAGE_SEO.home} />

      {/* Hero renders immediately — no Suspense wrapper */}
      <HeroSection />

      {/* Below-fold sections load after hero paints */}
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <TestimonialsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection qnaImg={qnaImg} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FaqSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CtaSection />
      </Suspense>
    </>
  );
}
