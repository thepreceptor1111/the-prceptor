import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

const EFFECTIVE_DATE = "June 30, 2026";
const SITE_URL       = "https://www.thepreceptorglobal.com";

// ── Inline SVG icons — no lucide-react dependency ──────────────────────
function ScrollTextIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" />
      <path d="M19 17V5a2 2 0 0 0-2-2H4" />
      <path d="M15 8h-5" /><path d="M15 12h-5" />
    </svg>
  );
}
function StarIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function CreditCardIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="22" height="16" x="1" y="4" rx="2" ry="2" />
      <line x1="1" x2="23" y1="10" y2="10" />
    </svg>
  );
}
function RefreshCwIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
function AlertTriangleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" /><path d="M12 17h.01" />
    </svg>
  );
}
function Globe2Icon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
function MailIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function ShieldIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function FileTextIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />
    </svg>
  );
}
function ScaleIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}
function BanknoteIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="22" height="16" x="1" y="4" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms &amp; Conditions — The Preceptor</title>
        <meta name="description" content="Terms and conditions governing use of The Preceptor's website and astrological consultation services." />
        <link rel="canonical" href={`${SITE_URL}/terms`} />
      </Helmet>

      <div className="relative min-h-screen">
        {/* Hero */}
        <section className="relative pt-40 pb-20 md:pt-52 md:pb-28">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 starfield" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ opacity: [0.25, 0.50, 0.25] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[55%] aspect-square rounded-full
                         bg-[radial-gradient(circle,oklch(0.82_0.12_85_/_0.14),transparent_65%)] blur-3xl"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

          <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card
                               text-xs uppercase tracking-[0.25em] text-gold">
                <ScrollTextIcon className="w-3 h-3" /> Terms &amp; Conditions
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              {/* FIX: added fluid clamp() size to match all other page heroes */}
              <h1
                className="mt-8 text-balance"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
              >
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
                Effective {EFFECTIVE_DATE} &middot; Last reviewed June 2026
              </p>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-14">

            {/* 1 */}
            <TermsSection icon={FileTextIcon} title="1. Acceptance of Terms" delay={0}>
              <p>By accessing or using this website or booking a consultation, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use the site or our services. These terms apply to all visitors, clients, and others who access or use our services.</p>
            </TermsSection>

            {/* 2 */}
            <TermsSection icon={StarIcon} title="2. Nature of Services" delay={0.04}>
              <p>
                The Preceptor offers private astrology consultation services including, but not limited
                to, Vedic birth chart readings, relationship synastry, career guidance, and spiritual
                consultations. All consultations are provided for{" "}
                <strong className="text-foreground font-medium">entertainment, personal insight, and spiritual guidance purposes only</strong>.
              </p>
              <p>Astrology readings do not constitute medical, legal, financial, or psychological advice. You should not make life decisions based solely on the content of a reading.</p>
              <p>The Preceptor does not guarantee any specific outcome, result, or change in circumstances as a result of a consultation. By booking a session, you acknowledge that you are engaging with astrology as a form of personal reflection and spiritual inquiry, and that outcomes or interpretations are subject to your own free will and judgment.</p>
            </TermsSection>

            {/* 3 */}
            <TermsSection icon={CreditCardIcon} title="3. Booking &amp; Scheduling" delay={0.08}>
              <p>Sessions are booked through our integrated scheduling platform (Cal.com). A booking is confirmed only once you have received a written confirmation email. By completing a booking you also agree to Cal.com&apos;s Terms of Service in addition to these terms.</p>
              <TermsList items={[
                "Payment is due at the time of booking unless otherwise agreed in writing.",
                "Session fees are displayed on the booking page and are subject to change. Any fee change will not apply to sessions already confirmed.",
                "All prices are listed in USD unless otherwise stated.",
              ]} />
              <p>
                You are responsible for providing accurate birth information (date, time, and place of
                birth) at the time of booking. Inaccurate birth data may affect the quality of your
                reading. The Preceptor is not liable for readings based on incorrect information
                provided by the client.
              </p>
              <p>
                By booking a session, you confirm that you are 18 years of age or older, or that you
                have obtained parental or guardian consent.
              </p>
              <p>
                You will be sent a confirmation email containing a Cal Video link to briefly discuss
                your expectations with The Preceptor prior to the session. This preliminary discussion
                is limited to a maximum of 10 minutes and is intended solely for clarification
                purposes.
              </p>
            </TermsSection>

            {/* 4 */}
            <TermsSection icon={RefreshCwIcon} title="4. Rescheduling &amp; Cancellations" delay={0.12}>
              <p>We understand that life is unpredictable. Our policy is designed to be fair to both parties:</p>
              <TermsList items={[
                "You may reschedule your appointment up to 24 hours before the scheduled session time at no charge, using the link provided in your confirmation email.",
                "Cancellations made less than 24 hours before a scheduled session will generally not be accepted. However, exceptions may be made in cases of genuine emergency, provided that the client notifies us by email as soon as reasonably possible.",
                "In the event of a no-show (failure to attend without prior notice), the client may submit a rescheduling request with an explanation. Any rescheduling shall be at The Preceptor's discretion. No refunds will be issued for missed sessions.",
                "If The Preceptor needs to cancel or reschedule due to unforeseen circumstances, you will be notified by email as soon as possible and offered an alternative time slot.",
              ]} />
              <p>To reschedule or cancel, use the link in your booking confirmation email or contact us directly.</p>
            </TermsSection>

            {/* 5 */}
            <TermsSection icon={BanknoteIcon} title="5. Payments &amp; Refunds" delay={0.16}>
              <p>All consultation fees are stated clearly at the time of booking. Prices are in USD unless otherwise specified. We accept payment in USD, GBP, EUR, INR, and all other major currencies via our payment processors.</p>
              <TermsList items={[
                "Payment is required in full at the time of booking to secure your appointment slot.",
                "We primarily accept payments via Remitly. Other payment methods available through Cal.com may also be accepted.",
                "Refunds will not be provided if you decide to cancel a booking or no longer wish to proceed with a scheduled session.",
                "If you are unable to attend, you may request a rescheduling by providing prior notice via email in accordance with our cancellation policy. Rescheduling requests will be accommodated where reasonably possible.",
                "Except as expressly stated in these Terms, no refunds will be issued under any circumstances.",
                "The Preceptor does not store your payment card information. All payment processing is handled by third-party processors.",
              ]} />
            </TermsSection>

            {/* 6 */}
            <TermsSection icon={ShieldIcon} title="6. Confidentiality" delay={0.20}>
              <p>All information shared during a consultation — including personal circumstances, relationships, and birth data — is treated as strictly confidential. We will never share, publish, or use session content for marketing purposes without your explicit written consent.</p>
              <p>Client testimonials shared on the website are done so with the client&apos;s express consent, or where the client&apos;s identity has been anonymized to protect their privacy.</p>
              <p>We ask that clients extend the same courtesy. Summaries shared for your personal reference are for your private use only and may not be published or redistributed without our prior written permission.</p>
            </TermsSection>

            {/* 7 */}
            <TermsSection icon={AlertTriangleIcon} title="7. Disclaimer of Warranties" delay={0.24}>
              <p>The Preceptor website and services are provided on an &ldquo;as is&rdquo; basis. We make no warranties, express or implied, regarding the accuracy, completeness, reliability, or fitness for a particular purpose of our services.</p>
              <p>Astrology is an interpretive and symbolic discipline. Readings reflect the practitioner&apos;s analysis and interpretation of astrological factors and their potential correlations with human experience. Such readings are not guarantees, promises, or predictions of fixed future events. Clients remain solely responsible for their personal decisions, actions, and outcomes.</p>
            </TermsSection>

            {/* 8 */}
            <TermsSection icon={AlertTriangleIcon} title="8. Limitation of Liability" delay={0.28}>
              <p>To the fullest extent permitted by applicable law, The Preceptor shall not be liable for any indirect, incidental, consequential, punitive, or other damages — including but not limited to loss of income, loss of opportunity, emotional distress, or other consequences arising from:</p>
              <TermsList items={[
                "Decisions made in reliance on astrological guidance received during a session",
                "Technical issues with third-party scheduling or communication platforms",
                "Any inaccuracies arising from incorrect birth information provided by the client",
                "Force majeure/unforeseeable events beyond our reasonable control",
              ]} />
              <p>In any event, The Preceptor&apos;s total liability in connection with any consultation or service shall not exceed the amount paid by the client for that specific consultation.</p>
            </TermsSection>

            {/* 9 */}
            <TermsSection icon={Globe2Icon} title="9. Intellectual Property" delay={0.32}>
              <p>All content on this website — including text, design, imagery, the brand name &ldquo;The Preceptor,&rdquo; session frameworks, and written interpretations provided in consultations — is the intellectual property of The Preceptor and is protected by applicable copyright law. You may not reproduce, republish, redistribute, or sell any content from this website or from your private consultation without prior written permission.</p>
              <p>Personal use of your own reading content — sharing insights privately, keeping notes for yourself — is encouraged and permitted.</p>
            </TermsSection>

            {/* 10 */}
            <TermsSection icon={Globe2Icon} title="10. Governing Law" delay={0.36}>
              <p>These Terms &amp; Conditions are governed by and construed in accordance with applicable law. Any disputes arising from or related to these terms or our services shall first be attempted to be resolved through good-faith communication. If unresolved, disputes will be submitted to the jurisdiction of the relevant courts.</p>
            </TermsSection>

            {/* 11 */}
            <TermsSection icon={ScaleIcon} title="11. Modifications" delay={0.40}>
              <p>We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted on this page with an updated &ldquo;Last reviewed&rdquo; date. Your continued use of the website or services after any changes constitutes acceptance of the revised terms. We recommend reviewing this page periodically.</p>
            </TermsSection>

            {/* 12 */}
            <TermsSection icon={MailIcon} title="12. Contact" delay={0.44}>
              <p>For any questions about these terms or our services, please contact us:</p>
              <a
                href={`mailto:${siteConfig.email}?subject=Terms%20Inquiry`}
                className="inline-flex items-center gap-2 mt-3 text-gold hover:text-gold/80 transition-colors text-sm"
              >
                <MailIcon className="w-4 h-4" /> {siteConfig.email}
              </a>
            </TermsSection>

            {/* Bottom CTA */}
            <Reveal delay={0.48}>
              <div className="glass-card rounded-3xl p-8 text-center">
                <ScrollTextIcon className="w-8 h-8 text-gold mx-auto block" />
                <h3 className="mt-4 mb-0 text-xl">Ready to begin?</h3>
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
          <h2 className="mb-0 text-xl md:text-2xl" style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)" }}>{title}</h2>
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
