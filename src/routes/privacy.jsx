import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, Database, Globe2, Mail, FileText, Sparkles } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

const EFFECTIVE_DATE = "June 1, 2025";
const SITE_URL       = "https://www.thepreceptorglobal.com";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — The Preceptor</title>
        <meta name="description" content="How The Preceptor collects, uses, and protects your personal information. Your privacy is treated with the same discretion as your consultation." />
        <link rel="canonical" href={`${SITE_URL}/privacy`} />
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
                <Lock className="w-3 h-3" /> Privacy Policy
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-8 text-balance">
                Your privacy is
                <span className="display-italic text-gold"> sacred.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 lead mx-auto">
                We handle your personal information with the same discretion and care
                we bring to every private consultation.
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

            <PolicySection
              icon={Database}
              title="1. Information We Collect"
              delay={0}
            >
              <p>We collect information you provide directly when you fill out a contact or booking form, book a session through our scheduling system, or correspond with us by email. This includes:</p>
              <PolicyList items={[
                "Full name and email address",
                "Country and city of residence (for timezone scheduling)",
                "Date and time of birth (required for astrological chart preparation)",
                "The nature of your consultation inquiry",
                "Any additional details you voluntarily share in your message",
              ]} />
              <p>We do not use tracking pixels, behavioral ad networks, or any third-party analytics beyond what is strictly necessary to operate the website.</p>
            </PolicySection>

            <PolicySection
              icon={Eye}
              title="2. How We Use Your Information"
              delay={0.04}
            >
              <p>Your information is used solely to:</p>
              <PolicyList items={[
                "Respond to your inquiry and schedule your consultation",
                "Prepare your astrological chart and session materials in advance",
                "Send confirmation emails and session reminders via our scheduling platform (Cal.com)",
                "Improve the quality and relevance of our services",
              ]} />
              <p>We do not sell, rent, or trade your personal information to any third party. Ever.</p>
            </PolicySection>

            <PolicySection
              icon={Globe2}
              title="3. Third-Party Services"
              delay={0.08}
            >
              <p>To operate this website and its booking system, we use the following third-party platforms. Each processes your data only as necessary to provide its service:</p>
              <PolicyList items={[
                "Cal.com — session scheduling and calendar management. Subject to Cal.com's Privacy Policy.",
                "Google Calendar — calendar conflict checking and meeting link generation (Cal Video).",
                "Sanity.io — content management for public site content only. No personal client data is stored there.",
                "Cloudflare Workers — site hosting and edge delivery. No personal data is logged.",
              ]} />
              <p>We do not integrate any advertising networks, social login systems, or data broker services.</p>
            </PolicySection>

            <PolicySection
              icon={Lock}
              title="4. Data Security"
              delay={0.12}
            >
              <p>All data in transit is encrypted via HTTPS/TLS. Sensitive session details (birth time, birth date) are retained only for as long as necessary to prepare and deliver your consultation. We do not store payment information — all transactions are handled directly by Cal.com's payment processor.</p>
              <p>Access to client records is strictly limited to The Preceptor and is never shared with employees, contractors, or other practitioners.</p>
            </PolicySection>

            <PolicySection
              icon={ShieldCheck}
              title="5. Your Rights"
              delay={0.16}
            >
              <p>You have the right to request access to the personal information we hold about you, correct any inaccurate information, request deletion of your data, and withdraw consent for future communications at any time. To exercise any of these rights, contact us at:</p>
              <a
                href={`mailto:${siteConfig.email}?subject=Privacy%20Request`}
                className="inline-flex items-center gap-2 mt-3 text-gold hover:text-gold/80 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> {siteConfig.email}
              </a>
              <p className="mt-4">We will respond to all privacy requests within 30 days.</p>
            </PolicySection>

            <PolicySection
              icon={FileText}
              title="6. Cookies"
              delay={0.20}
            >
              <p>This website uses only essential session cookies required for the booking embed to function. We do not use advertising cookies, retargeting cookies, or third-party tracking cookies. No cookie consent banner is displayed because no non-essential cookies are set.</p>
            </PolicySection>

            <PolicySection
              icon={Sparkles}
              title="7. Children's Privacy"
              delay={0.24}
            >
              <p>Our services are intended for adults aged 18 and over. We do not knowingly collect personal information from anyone under 18. If you believe a minor has submitted information to us, please contact us immediately and we will delete it.</p>
            </PolicySection>

            <PolicySection
              icon={Globe2}
              title="8. International Clients"
              delay={0.28}
            >
              <p>We serve clients worldwide. By submitting your information, you consent to its processing in accordance with this Privacy Policy, regardless of where you are located. We apply the same high standard of care to all client data irrespective of jurisdiction.</p>
            </PolicySection>

            <PolicySection
              icon={FileText}
              title="9. Changes to This Policy"
              delay={0.32}
            >
              <p>We may update this Privacy Policy from time to time. When we do, the “Last reviewed” date at the top of this page will be updated. Continued use of the website after any change constitutes acceptance of the revised policy. We will not reduce your rights under this policy without your explicit consent.</p>
            </PolicySection>

            {/* Contact card */}
            <Reveal delay={0.36}>
              <div className="glass-card rounded-3xl p-8 text-center">
                <Lock className="w-8 h-8 text-gold mx-auto" />
                <h3 className="mt-4 text-xl">Questions about your privacy?</h3>
                <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
                  We take every privacy inquiry personally. Reach us directly and we’ll respond within 24 hours.
                </p>
                <a
                  href={`mailto:${siteConfig.email}?subject=Privacy%20Inquiry`}
                  className="inline-flex items-center gap-2 mt-6 btn-primary"
                >
                  <Mail className="w-4 h-4" /> Contact Us
                </a>
              </div>
            </Reveal>

          </div>
        </section>
      </div>
    </>
  );
}

function PolicySection({ icon: Icon, title, delay, children }) {
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
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed prose-luxe">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

function PolicyList({ items }) {
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
