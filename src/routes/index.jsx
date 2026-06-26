import { lazy, Suspense } from "react";
import SEO from "@/components/site/SEO";
import { PAGE_SEO } from "@/content/seo";
import qnaImg from "@/assets/qna-section.jpg?format=webp&quality=80";
import { useHomePageData } from "@/lib/useSanity";

// FIX 4: HeroSection stays EAGER — it is the LCP element, must paint immediately.
// It reads from SiteSettingsContext (pre-populated by SiteSettingsProvider in App),
// so it paints with real CMS data on first render — no double-fetch.
import { HeroSection } from "@/components/home/HeroSection";

// All below-fold sections are LAZY — browser fetches them after hero paints.
const AboutSection        = lazy(() => import("@/components/home/AboutSection").then(m => ({ default: m.AboutSection })));
const ServicesSection     = lazy(() => import("@/components/home/ServicesSection").then(m => ({ default: m.ServicesSection })));
const AchievementsSection = lazy(() => import("@/components/home/AchievementsSection").then(m => ({ default: m.AchievementsSection })));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection").then(m => ({ default: m.TestimonialsSection })));
const ExperienceSection   = lazy(() => import("@/components/home/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const FaqSection          = lazy(() => import("@/components/home/FaqSection").then(m => ({ default: m.FaqSection })));
const CtaSection          = lazy(() => import("@/components/home/CtaSection").then(m => ({ default: m.CtaSection })));

// Minimal inline fallback — pre-reserves height to prevent CLS while section loads.
// Heights are conservative estimates matching real section heights.
const SECTION_MIN_HEIGHTS = {
  about:        '640px',
  services:     '720px',
  achievements: '320px',
  testimonials: '560px',
  experience:   '480px',
  faq:          '400px',
  cta:          '320px',
};

function SectionFallback({ minHeight = '400px' }) {
  return <div style={{ minHeight }} aria-hidden="true" />;
}

export default function Home() {
  // FIX 5: ONE batched Sanity fetch for all 4 homepage data types.
  // Previously each section (ServicesSection, TestimonialsSection, FaqSection)
  // called useSanity independently, firing 4 separate fetches each with its own
  // CORS preflight. This collapses all of that into a single round-trip.
  const { services, testimonials, faqs, loading } = useHomePageData();

  return (
    <>
      <SEO {...PAGE_SEO.home} />

      {/* Hero renders immediately — no Suspense wrapper, no data dependency */}
      <HeroSection />

      {/* Below-fold sections: lazy-loaded + pre-sized fallbacks prevent CLS */}
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.about} />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.services} />}>
        {/* Pass pre-fetched services data so ServicesSection doesn't re-fetch */}
        <ServicesSection initialServices={services} servicesLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.achievements} />}>
        <AchievementsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.testimonials} />}>
        {/* Pass pre-fetched testimonials so TestimonialsSection doesn't re-fetch */}
        <TestimonialsSection initialTestimonials={testimonials} testimonialsLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.experience} />}>
        <ExperienceSection qnaImg={qnaImg} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.faq} />}>
        {/* Pass pre-fetched FAQs so FaqSection doesn't re-fetch */}
        <FaqSection initialFaqs={faqs} faqsLoading={loading} />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight={SECTION_MIN_HEIGHTS.cta} />}>
        <CtaSection />
      </Suspense>
    </>
  );
}
