import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import Reveal from "@/components/site/Reveal";
import { siteConfig } from "@/content/site";

const EFFECTIVE_DATE = "June 1, 2025";
const SITE_URL       = "https://www.thepreceptorglobal.com";

// ── Inline SVG icons — no lucide-react dependency ──────────────────────
function ShieldCheckIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function LockIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function EyeIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function DatabaseIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
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
function SparklesIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  );
}
function ArchiveIcon({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true">
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <path d="M10 12h4" />
    </svg>
  );
}

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
                <LockIcon className="w-3 h-3" /> Privacy Policy
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              {/* FIX: added fluid clamp() size to match services.jsx / about.jsx / contact.jsx hero headings */}
              <h1
                className="mt-8 text-balance"
                style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 400 }}
              >
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
                Effective {EFFECTIVE_DATE} &middot; Last reviewed June 2025
              </p>
            </Reveal>
          </div>
        </section>

        {/* Content */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-6 lg:px-10 space-y-14">

            {/* 1 */}
            <PolicySection icon={DatabaseIcon} title="1. Information We Collect" delay={0}>
              <p>
                When you book a consultation, we collect the information you voluntarily provide — your
                name, email address, date of birth, time of birth, place of birth, and any details you
                share about the purpose of your session. This information is necessary to prepare your
                personalised reading.
              </p>
              <p>
                We do not use tracking pixels, behavioral ad networks, or any third-party analytics
                beyond what is strictly necessary to operate the website.
              </p>
              <p>
                We do not collect payment card details directly. All payments are processed through
                third-party processors (Cal.com, Remitly) that operate under their own privacy policies.
              </p>
            </PolicySection>

            {/* 2 */}
            <PolicySection icon={EyeIcon} title="2. How We Use Your Information" delay={0.04}>
              <p>Your information is used solely to:</p>
              <PolicyList items={[
                "Respond to your inquiry and schedule your consultation",
                "Prepare your astrological chart and session materials in advance",
                "Communicate with you about your booking — confirmation emails, reminders, and post-session follow-ups",
                "Send confirmation emails and session reminders via our scheduling platform (Cal.com)",
                "Improve the quality and relevance of our services",
              ]} />
              <p>
                We never sell, rent, or trade your personal information to third parties. We do not use
                your birth data or session content for any purpose other than delivering your
                consultation. However, with your express consent, your data may be used for research
                purposes or for the study of astrological patterns and observations, while being kept
                strictly confidential and anonymized to protect your identity.
              </p>
            </PolicySection>

            {/* 3 */}
            <PolicySection icon={ArchiveIcon} title="3. Data Retention" delay={0.06}>
              <p>
                We retain client data — including birth details, consultation records, and session
                content — only for as long as reasonably necessary to provide our services and fulfil
                the purpose for which the data was collected.
              </p>
              <p>
                We never sell, rent, or trade your personal information to third parties. We do not use
                your birth data or session content for any purpose other than delivering your
                consultation. However, with your express consent, your data may be used for research
                purposes or for the study of astrological patterns and observations, while being kept
                strictly confidential and anonymized to protect your identity.
              </p>
            </PolicySection>

            {/* 4 */}
            <PolicySection icon={Globe2Icon} title="4. Third-Party Services" delay={0.08}>
              <p>To operate this website and its booking system, we use the following third-party platforms. Each processes your data only as necessary to provide its service:</p>
              <PolicyList items={[
                "Cal.com — session scheduling and calendar management. Subject to Cal.com's Privacy Policy.",
                "Remitly — payment processing for international transactions. Subject to Remitly's Privacy Policy.",
                "Google Calendar — calendar conflict checking and meeting link generation (Cal Video).",
                "Sanity.io — content management for public site content only. No personal client data is stored there.",
                "Cloudflare Workers — site hosting and edge delivery. No personal data is logged.",
              ]} />
              <p>We do not integrate any advertising networks, social login systems, or data broker services.</p>
            </PolicySection>

            {/* 5 */}
            <PolicySection icon={LockIcon} title="5. Data Security" delay={0.12}>
              <p>All data in transit is encrypted via HTTPS/TLS. Sensitive session details (birth time, birth date) are retained only for as long as necessary to prepare and deliver your consultation. We do not store payment information — all transactions are handled directly by Cal.com and Remitly.</p>
              <p>Access to client records is strictly limited to The Preceptor and is never shared with employees, contractors, or other practitioners.</p>
            </PolicySection>

            {/* 6 */}
            <PolicySection icon={ShieldCheckIcon} title="6. Your Rights" delay={0.16}>
              <p>You have the right to request access to the personal information we hold about you, correct any inaccurate information, request deletion of your data, and withdraw consent for future communications at any time. To exercise any of these rights, contact us at:</p>
              <a
                href={`mailto:${siteConfig.email}?subject=Privacy%20Request`}
                className="inline-flex items-center gap-2 mt-3 text-gold hover:text-gold/80 transition-colors text-sm"
              >
                <MailIcon className="w-4 h-4" /> {siteConfig.email}
              </a>
              <p className="mt-4">We will respond to all privacy requests within 30 days.</p>
            </PolicySection>

            {/* 7 */}
            <PolicySection icon={FileTextIcon} title="7. Cookies" delay={0.20}>
              <p>This website uses only essential session cookies required for the booking embed to function. We do not use advertising cookies, retargeting cookies, or third-party tracking cookies. No cookie consent banner is displayed because no non-essential cookies are set.</p>
            </PolicySection>

            {/* 8 */}
            <PolicySection icon={SparklesIcon} title="8. Children&apos;s Privacy" delay={0.24}>
              <p>
                Our services are mainly intended for individuals aged 18 and over. However, individuals
                aged 16 or over may use our services only with the express consent of a parent or legal
                guardian. By requesting or participating in a session, the parent or legal guardian
                confirms that they have reviewed and approved the minor&apos;s use of services.
              </p>
              <p>
                If you believe someone under 16 has submitted information to us without parental consent,
                please contact us immediately and we will delete it.
              </p>
            </PolicySection>

            {/* 9 */}
            <PolicySection icon={Globe2Icon} title="9. International Clients" delay={0.28}>
              <p>We serve clients worldwide. By submitting your information, you consent to its processing in accordance with this Privacy Policy, regardless of where you are located. We apply the same high standard of care to all client data irrespective of jurisdiction.</p>
            </PolicySection>

            {/* 10 */}
            <PolicySection icon={FileTextIcon} title="10. Changes to This Policy" delay={0.32}>
              <p>We may update this Privacy Policy from time to time. When we do, the &ldquo;Last reviewed&rdquo; date at the top of this page will be updated. Continued use of the website after any change constitutes acceptance of the revised policy. We will not reduce your rights under this policy without your explicit consent.</p>
            </PolicySection>

            {/* Contact card */}
            <Reveal delay={0.36}>
              <div className="glass-card rounded-3xl p-8 text-center">
                <LockIcon className="w-8 h-8 text-gold mx-auto" />
                <h3 className="mt-4 text-xl">Questions about your privacy?</h3>
                <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
                  We take every privacy inquiry personally. Reach us directly and we&apos;ll respond within 24 hours.
                </p>
                <a
                  href={`mailto:${siteConfig.email}?subject=Privacy%20Inquiry`}
                  className="inline-flex items-center gap-2 mt-6 btn-primary"
                >
                  <MailIcon className="w-4 h-4" /> Contact Us
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
