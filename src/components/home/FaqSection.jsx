import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { FAQ_QUERY } from "@/lib/sanityQueries";
import { useLenisResize } from "@/hooks/useLenisResize";

// ── Inline SVG icon — removes lucide-react dependency ────────────────────
function ChevronDownIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const HOME_FAQ_LIMIT = 5;

function normalise(f) {
  return { q: f.question ?? f.q, a: f.answer ?? f.a };
}

export function FaqSection() {
  useLenisResize();

  const { data: cmsFaqs } = useSanity(FAQ_QUERY, null);
  const { settings } = useSiteSettings();

  const sectionLabel   = settings?.faqSectionLabel   ?? "FAQ";
  const sectionHeading = settings?.faqSectionHeading ?? "Common questions.";

  const allFaqs = cmsFaqs ? cmsFaqs.map(normalise) : FAQS;
  const faqs = allFaqs.slice(0, HOME_FAQ_LIMIT);
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 lg:py-32 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-gold">{sectionLabel}</span>
          <h2 className="mt-4 text-4xl md:text-5xl">{sectionHeading}</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="glass-card rounded-2xl">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-sm md:text-base">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 text-gold"
                  >
                    <ChevronDownIcon className="w-5 h-5" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
