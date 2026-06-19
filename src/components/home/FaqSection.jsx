import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/utils/constants";
import { useSanity } from "@/lib/useSanity";
import { useSiteSettings } from "@/lib/useSiteSettings";
import { FAQ_QUERY } from "@/lib/sanityQueries";

function normalise(f) {
  return { q: f.question ?? f.q, a: f.answer ?? f.a };
}

export function FaqSection() {
  const { data: cmsFaqs } = useSanity(FAQ_QUERY, null);
  const { settings } = useSiteSettings();

  const sectionLabel   = settings?.faqSectionLabel   ?? "FAQ";
  const sectionHeading = settings?.faqSectionHeading ?? "Common questions.";

  const faqs = cmsFaqs ? cmsFaqs.map(normalise) : FAQS;
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
              <div className="glass-card rounded-2xl overflow-hidden">
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
                    <ChevronDown className="w-5 h-5" />
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
