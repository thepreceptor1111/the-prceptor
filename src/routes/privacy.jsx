import SEO from "@/components/site/SEO";
import { PAGE_SEO, SITE } from "@/content/seo";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowLeft, Mail } from "lucide-react";

// Last updated date — update this string whenever policy content changes.
const LAST_UPDATED = "June 16, 2026";

const SECTIONS = [
  {
    id: "information-collected",
    heading: "Information We Collect",
    body: [
      "When you book a consultation, we collect the information you voluntarily provide: your name, email address, date of birth, place of birth, and any details you share about the purpose of your session. This information is necessary to prepare your personalised reading.",
      "When you contact us via the website enquiry form, we collect your name, email address, and the content of your message.",
      "We do not collect payment card details directly. All payments are processed through third-party processors (Cal.com / Stripe) that operate under their own privacy policies.",
      "We may collect basic technical information automatically — such as your browser type, device, IP address, and pages visited — through standard web analytics tools (e.g. Google Analytics) to help us understand how the website is used and to improve it.",
    ],
  },
  {
    id: "how-we-use",
    heading: "How We Use Your Information",
    body: [
      "To schedule, prepare, and deliver your astrology consultation.",
      "To communicate with you about your booking — confirmation emails, reminders, and post-session follow-ups.",
      "To respond to enquiries submitted through the contact form.",
      "To send the waitlist notification email for the Shop, if you opted in.",
      "To analyse aggregated, anonymised website usage to improve content and performance.",
      "We never sell, rent, or trade your personal information to third parties. We do not use your birth data or session content for any purpose other than delivering your consultation.",
    ],
  },
  {
    id: "data-retention",
    heading: "Data Retention",
    body: [
      "Booking records and session notes are retained for up to 2 years to allow you to reference or continue your work with us. You may request deletion at any time by emailing us.",
      "Contact form enquiries are kept for 12 months unless you ask us to remove them sooner.",
      "Waitlist email addresses are held until the Shop launches or you unsubscribe, whichever comes first.",
    ],
  },
  {
    id: "sharing",
    heading: "Sharing & Disclosure",
    body: [
      "Your personal information is never sold or shared for marketing purposes.",
      "We use a small number of trusted third-party services to operate the website: Cal.com for booking scheduling, Google Analytics for anonymised usage data, and email hosting to send confirmations. Each of these processors handles data in accordance with their own privacy policies.",
      "We may disclose information if required by law or to protect the rights, property, or safety of The Preceptor or others.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies",
    body: [
      "The Preceptor website uses minimal cookies. Functional cookies are used to maintain your session when navigating the site. Analytics cookies (Google Analytics) collect anonymised data about how visitors use the site — no personally identifiable information is stored in these cookies.",
      "You may disable cookies in your browser settings. Disabling cookies will not prevent you from using any part of this website.",
    ],
  },
  {
    id: "your-rights",
    heading: "Your Rights",
    body: [
      "You have the right to access the personal information we hold about you, request corrections, request deletion, and withdraw consent for any processing based on consent at any time.",
      "To exercise any of these rights, please email us at the address below. We will respond within 30 days.",
      "If you are located in the European Economic Area or the United Kingdom, you also have the right to lodge a complaint with your local data protection authority.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "We take reasonable technical and organisational measures to protect your personal information from unauthorised access, loss, or misuse. All data is transmitted over encrypted HTTPS connections.",
      "No method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    heading: "Children's Privacy",
    body: [
      "Our services are intended for adults aged 18 and over. We do not knowingly collect personal information from children under 18. If you believe a child has provided us with their information, please contact us and we will delete it promptly.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to This Policy",
    body: [
      `We may update this Privacy Policy from time to time. When we do, we will revise the "Last Updated" date at the top of this page. We encourage you to review this policy periodically. Continued use of our website after changes are posted constitutes acceptance of the updated policy.`,
    ],
  },
  {
    id: "contact",
    heading: "Contact Us",
    body: [
      `If you have any questions about this Privacy Policy or how we handle your data, please email us at ${SITE.email}. We take privacy enquiries seriously and will respond personally within 5 business days.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SEO {...PAGE_SEO.privacy} />

      <div className="relative min-h-screen">
        {/* Hero band */}
        <section className="relative overflow-hidden pt-36 pb-20 md:pt-48 md:pb-28">
          <div className="absolute inset-0 bg-hero" />
          <div className="absolute inset-0 starfield" />
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
                       w-[70%] h-[500px] opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(0.55 0.12 85 / 0.5) 0%, transparent 65%)",
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
              <ShieldCheck className="w-3.5 h-3.5" /> Legal
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-4xl md:text-6xl leading-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Privacy Policy
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
                The Preceptor (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
                policy explains what personal information we collect when you use
                &nbsp;<strong className="text-foreground">thepreceptorglobal.com</strong>, how we use
                it, and your rights. By using our website or booking a consultation,
                you agree to the practices described below.
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
                <Link to="/terms" className="hover:text-gold transition-colors">
                  Terms &amp; Conditions
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
