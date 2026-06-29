import { lazy, Suspense } from "react";
import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import qnaImg from "@/assets/qna-section.webp?format=webp&quality=80";
import { useHomePageData } from "@/lib/useSanity";

// FIX 4: HeroSection stays EAGER — it is the LCP element, must paint immediately.
import { HeroSection } from "@/components/home/HeroSection";

// All below-fold sections are LAZY
const AboutSection        = lazy(() => import("@/components/home/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection     = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const AchievementsSection = lazy(() => import("@/components/home/AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ExperienceSection   = lazy(() => import("@/components/home/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const FaqSection          = lazy(() => import("@/components/home/FaqSection").then(m => ({ default: m.FaqSection })));
const CtaSection          = lazy(() => import("@/components/home/CtaSection").then(m => ({ default: m.CtaSection })));

// Minimal inline fallback — pre-reserves height to prevent CLS while section loads.
// cta is intentionally 0px — it sits directly above footer and a ghost div
// would create visible blank space before footer appears.
const SECTION_MIN_HEIGHTS = {
  about:        '640px',
  services:     '720px',
  achievements: '320px',
  testimonials: '560px',
  experience:   '480px',
  faq:          '400px',
  cta:          '0px',   // fix: was 320px — caused ghost blank space above footer
};

function SectionFallback({ minHeight = '400px' }) {
  return <div style={{ minHeight }} aria-hidden="true" />;
}

export default function Home() {
  const { services, testimonials, faqs, loading } = useHomePageData();

  return (
    <>
      <SEO {...PAGE_SEO.home} />

      {/* Hero renders immediately — no Suspense wrapper, no data dependency */}
      <HeroSection />

      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.about} />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.services} />}>
        <ServicesSection initialServices={services} servicesLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.achievements} />}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.testimonials} />}>
        <TestimonialsSection initialTestimonials={testimonials} testimonialsLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.experience} />}>
        <ExperienceSection qnaImg={qnaImg} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.faq} />}>
        <FaqSection initialFaqs={faqs} faqsLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.cta} />}>
        <CtaSection />
      </Suspense>
    </>
  );
}
