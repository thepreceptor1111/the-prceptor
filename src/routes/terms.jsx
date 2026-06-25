import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ScrollText, Star, CreditCard, RefreshCw, AlertTriangle, Globe2, Mail, Shield, FileText, Scale } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

const EFFECTIVE_DATE = "June 1, 2025";
const SITE_URL       = "https://www.thepreceptorglobal.com";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions — The Preceptor</title>
        <meta name="description" content="Terms and conditions governing use of The Preceptor's website and astrological consultation services." />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
      </Helmet>

      <div className="relative min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 starfield" />
          <motion.div
            animate={{ opacity: [0.25, 0.50, 0.25] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[55%] aspect-square rounded-full
                       bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.14),transparent_65%)] blur-3xl pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card
                               text-xs uppercase tracking-[0.25em] text-gold">
                <ScrollText className="w-3 h-3" /> Terms & Conditions
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 text-balance">
                Clear terms,
                <span className="display-italic text-gold"> honestly stated.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 lead mx-auto">
                These terms govern your use of this website and the purchase of astrological
                consultation services from The Preceptor.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-4 text-xs text-muted-foreground tracking-wide">
                Effective {EFFECTIVE_DATE} · Last reviewed June 2025
              </p>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-14">

            <TermsSection icon={FileText} title="1. Acceptance of Terms" delay={0}>
              <p>By accessing or using this website or booking a consultation, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site or our services. These terms apply to all visitors, clients, and others who access or use our services.</p>
            </TermsSection>

            <TermsSection icon={Star} title="2. Nature of Services" delay={0.04}>
              <p>The Preceptor offers private Vedic and Western astrological consultation services. All consultations are provided for <strong className="text-foreground font-medium">informational, spiritual, and personal guidance purposes only</strong>.</p>
              <p>Astrological readings are not a substitute for professional advice in the fields of medicine, law, finance, psychology, or any other regulated profession. You should not make major life decisions based solely on astrological guidance.</p>
              <p>By booking a session, you acknowledge that you are engaging with astrology as a form of personal reflection and spiritual inquiry, and that outcomes or interpretations are subject to your own free will and judgment.</p>
            </TermsSection>

            <TermsSection icon={CreditCard} title="3. Booking & Payment" delay={0.08}>
              <p>Sessions are booked through our integrated scheduling platform (Cal.com). By completing a booking you agree to Cal.com's Terms of Service in addition to these terms.</p>
              <TermsList items={[
                "Payment is due at the time of booking unless otherwise agreed in writing.",
                "Session fees are displayed on the booking page and are subject to change. Any fee change will not apply to sessions already confirmed.",
                "Accepted payment methods are those available through our booking platform at the time of booking.",
                "All prices are listed in USD unless otherwise stated.",
              ]} />
            </TermsSection>

            <TermsSection icon={RefreshCw} title="4. Rescheduling & Cancellations" delay={0.12}>
              <p>We understand that life is unpredictable. Our policy is designed to be fair to both parties:</p>
              <TermsList items={[
                "Rescheduling is permitted up to 24 hours before your session at no charge.",
                "Cancellations made more than 24 hours before the session are eligible for a full refund.",
                "Cancellations made within 24 hours of the session are non-refundable.",
                "No-shows (failure to attend without notice) are non-refundable.",
                "If The Preceptor needs to cancel or reschedule, you will receive a full refund or a priority rebooking slot, at your preference.",
              ]} />
              <p>To reschedule or cancel, use the link in your booking confirmation email or contact us directly.</p>
            </TermsSection>

            <TermsSection icon={Shield} title="5. Confidentiality" delay={0.16}>
              <p>The Preceptor treats all client information — including birth details, personal circumstances, and consultation content — with strict confidence. This information will never be shared, published, or discussed with any third party without your explicit written consent.</p>
              <p>We ask that clients extend the same courtesy. Session recordings, transcripts, or summaries shared for your personal reference are for your private use only and may not be published or redistributed without our prior written permission.</p>
            </TermsSection>

            <TermsSection icon={AlertTriangle} title="6. Disclaimer of Liability" delay={0.20}>
              <p>To the fullest extent permitted by applicable law, The Preceptor shall not be liable for any direct, indirect, incidental, or consequential damages arising from:</p>
              <TermsList items={[
                "Decisions made in reliance on astrological guidance received during a session",
                "Technical issues with third-party scheduling or communication platforms",
                "Any inaccuracies arising from incorrect birth information provided by the client",
                "Force majeure events beyond our reasonable control",
              ]} />
              <p>Our total liability to you for any claim arising from these terms or a session shall not exceed the fee paid for that session.</p>
            </TermsSection>

            <TermsSection icon={Globe2} title="7. Intellectual Property" delay={0.24}>
              <p>All content on this website — including text, design, imagery, session frameworks, and written materials — is the intellectual property of The Preceptor and is protected by copyright. You may not reproduce, distribute, or create derivative works from any content without prior written permission.</p>
              <p>Session recordings or notes provided to you after a consultation are licensed for your personal, non-commercial use only.</p>
            </TermsSection>

            <TermsSection icon={Globe2} title="8. Governing Law" delay={0.28}>
              <p>These Terms & Conditions are governed by and construed in accordance with applicable law. Any disputes arising from or related to these terms or our services shall first be attempted to be resolved through good-faith communication. If unresolved, disputes will be submitted to the jurisdiction of the relevant courts.</p>
            </TermsSection>

            <TermsSection icon={Scale} title="9. Modifications" delay={0.32}>
              <p>We reserve the right to update these Terms & Conditions at any time. Changes will be posted on this page with an updated “Last reviewed” date. Your continued use of the website or services after any changes constitutes acceptance of the revised terms. We recommend reviewing this page periodically.</p>
            </TermsSection>

            <TermsSection icon={Mail} title="10. Contact" delay={0.36}>
              <p>For any questions about these terms or our services, please contact us:</p>
              <a
                href={`mailto:${siteConfig.email}?subject=Terms%20Inquiry`}
                className="inline-flex items-center gap-2 mt-3 text-gold hover:text-gold/80 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> {siteConfig.email}
              </a>
            </TermsSection>

            {/* Bottom CTA */}
            <Reveal delay={0.40}>
              <div className="glass-card rounded-3xl p-8 text-center">
                <ScrollText className="w-8 h-8 text-gold mx-auto" />
                <h3 className="mt-4 text-xl">Ready to begin?</h3>
                <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
                  Book a private consultation and experience astrology as a tool for genuine clarity.
                </p>
                <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
                  <a href="/book" className="btn-primary">Book a Session</a>
                  <a href="/contact" className="btn-secondary">Ask a Question</a>
                </div>
              </div>
            </Reveal>

          </div>
        </section>
      </div>
    </>
  );
}

function TermsSection({ icon: Icon, title, delay, children }) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card rounded-2xl p-7 md:p-9">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "oklch(0.82 0.12 85 / 0.12)", border: "1px solid oklch(0.82 0.12 85 / 0.25)" }}
          >
            <Icon className="w-4 h-4 text-gold" />
          </span>
          <h2 className="text-xl md:text-2xl" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>{title}</h2>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function TermsList({ items }) {
  return (
    <ul className="space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
