import SEO from "@/components/site/SEO";
import { PAGE_SEO, SITE } from "@/content/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollText, ArrowLeft, Mail } from "lucide-react";

// Last updated date — update whenever terms content changes.
const LAST_UPDATED = "June 16, 2026";

const SECTIONS = [
  {
    id: "acceptance",
    heading: "Acceptance of Terms",
    body: [
      "By accessing thepreceptorglobal.com or booking a consultation with The Preceptor, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our website or services.",
      "These terms apply to all visitors, clients, and users of The Preceptor website and consultation services.",
    ],
  },
  {
    id: "services",
    heading: "Nature of Services",
    body: [
      "The Preceptor offers private astrology consultation services including, but not limited to: Vedic birth chart readings, Western astrology readings, relationship synastry, career guidance, Kundli analysis, tarot readings, and spiritual consultations.",
      "All consultations are provided for entertainment, personal insight, and spiritual guidance purposes only. Astrology readings do not constitute medical, legal, financial, or psychological advice. You should not make life decisions based solely on the content of a reading.",
      "The Preceptor does not guarantee any specific outcome, result, or change in circumstances as a result of a consultation.",
    ],
  },
  {
    id: "booking",
    heading: "Booking & Scheduling",
    body: [
      "Consultations are booked through the online scheduling system (Cal.com). A booking is confirmed only once you have received a written confirmation email.",
      "You are responsible for providing accurate birth information (date, time, and place of birth) at the time of booking. Inaccurate birth data may affect the quality of your reading; The Preceptor is not liable for readings based on incorrect information provided by the client.",
      "By booking a session, you confirm that you are 18 years of age or older, or that you have obtained parental or guardian consent.",
    ],
  },
  {
    id: "rescheduling",
    heading: "Rescheduling & Cancellations",
    body: [
      "You may reschedule your appointment up to 24 hours before the scheduled session time at no charge, using the link provided in your confirmation email.",
      "Cancellations made less than 24 hours before the session may not be eligible for a refund. Cancellations made more than 24 hours in advance will be refunded in full.",
      "If The Preceptor needs to cancel or reschedule a session, you will be notified as soon as possible and offered a full refund or alternative time slot.",
      "No-shows (failing to attend without prior notice) are not eligible for refunds or rescheduling.",
    ],
  },
  {
    id: "payments",
    heading: "Payments & Refunds",
    body: [
      "All consultation fees are stated clearly at the time of booking. Prices are in USD unless otherwise specified. We accept payment in USD, GBP, EUR, and INR via our payment processor.",
      "Payment is required in full at the time of booking to secure your appointment slot.",
      "Refunds are issued for cancellations made more than 24 hours before the session. Refunds are not available after a session has been delivered, except in cases of demonstrable technical failure on our part that prevented the session from taking place.",
      "All payment processing is handled by third-party processors. The Preceptor does not store your payment card information.",
    ],
  },
  {
    id: "confidentiality",
    heading: "Confidentiality",
    body: [
      "All information shared during a consultation — including personal circumstances, relationships, and birth data — is treated as strictly confidential.",
      "Session recordings (if provided) are shared exclusively with the client. We will never share, publish, or use session content for marketing purposes without your explicit written consent.",
      "Client testimonials shared on the website are done so with the client's express consent.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "Intellectual Property",
    body: [
      "All content on thepreceptorglobal.com — including text, design, graphics, the brand name \u201cThe Preceptor\u201d, and all written interpretations provided in consultations — is the intellectual property of The Preceptor and is protected by applicable copyright law.",
      "You may not reproduce, republish, redistribute, or sell any content from this website or from your private consultation without prior written permission.",
      "Personal use of your own reading content (sharing insights privately, keeping notes for yourself) is encouraged and permitted.",
    ],
  },
  {
    id: "disclaimer",
    heading: "Disclaimer of Warranties",
    body: [
      "The Preceptor website and services are provided on an \u201cas is\u201d basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of our services.",
      "Astrology is an interpretive and symbolic discipline. Readings reflect the practitioner's interpretation of celestial patterns and their potential correlations with human experience. They are not predictions of fixed future events.",
      "The Preceptor is not responsible for any decisions made by clients based on the content of their readings.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, The Preceptor shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of our website or services, including but not limited to loss of income, loss of opportunity, or emotional distress.",
      "Our total liability in connection with any consultation shall not exceed the amount paid for that specific consultation.",
    ],
  },
  {
    id: "links",
    heading: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites (such as Instagram, Reddit, or Cal.com). These links are provided for convenience only. The Preceptor is not responsible for the content or privacy practices of external websites.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing Law",
    body: [
      "These Terms & Conditions shall be governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the appropriate courts.",
      "If any provision of these terms is found to be unenforceable, the remaining provisions shall continue to apply in full.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to These Terms",
    body: [
      `We reserve the right to modify these Terms & Conditions at any time. Changes become effective upon posting to this page. The "Last Updated" date at the top of this page will reflect the most recent revision. Continued use of our services after changes are posted constitutes your acceptance of the updated terms.`,
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    body: [
      `Questions about these Terms & Conditions may be directed to ${SITE.email}. We will respond within 5 business days.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SEO {...PAGE_SEO.terms} />

      <div className="relative min-h-screen">
        {/* Hero band */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 starfield" />
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
                       w-[70%] h-[500px] opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.55 0.10 265 / 0.5) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card
                         text-xs uppercase tracking-[0.25em] text-gold"
            >
              <ScrollText className="w-3.5 h-3.5" /> Legal
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Terms &amp; Conditions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-muted-foreground"
            >
              Last updated: {LAST_UPDATED}
            </motion.p>
          </div>
        </section>

        {/* Body */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10">

            {/* Intro card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-6 md:p-8 mb-14 border border-gold/20"
            >
              <p className="text-muted-foreground leading-relaxed">
                These Terms &amp; Conditions govern your use of{" "}
                <strong className="text-foreground">thepreceptorglobal.com</strong> and all
                consultation services offered by The Preceptor. Please read them
                carefully. By booking a session or browsing the website, you agree
                to be bound by these terms.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              {SECTIONS.map((section, i) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: i * 0.04,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <h2
                    className="text-xl md:text-2xl mb-5 text-foreground"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {i + 1}. {section.heading}
                  </h2>
                  {section.body.map((para, j) => (
                    <p key={j} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                  <div className="mt-8 h-px bg-gradient-to-r from-gold/20 via-transparent to-transparent" />
                </motion.div>
              ))}
            </div>

            {/* Footer nav */}
            <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-border/60">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </Link>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <Link to="/privacy" className="hover:text-gold transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/contact" className="hover:text-gold transition-colors">
                  Contact Us
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> {SITE.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
