/**
 * src/content/seo.js
 * ─────────────────────────────────────────────────────────────
 * Central SEO configuration for The Preceptor.
 * All public-facing metadata lives here — one place to update.
 *
 * PRIVATE DATA NOTE:
 *   Owner identity, phone number, and India-origin details are
 *   intentionally excluded. The brand is presented as a global,
 *   location-neutral premium service.
 * ─────────────────────────────────────────────────────────────
 */

export const SITE = {
  name:        "The Preceptor",
  handle:      "thepreceptorglobal",
  tagline:     "For those who seek clarity.",
  description: "Modern guidance, written in the stars.",
  domain:      "https://thepreceptorglobal.com",
  email:       "thepreceptor1111@gmail.com",

  /** Absolute URL of the 1200×630 OG social card image. */
  ogImage: "https://thepreceptorglobal.com/og-image.webp",

  social: {
    instagram: "https://www.instagram.com/thepreceptor1111",
    reddit:    "https://www.reddit.com/user/ThePreceptor1111/",
  },

  /** twitter:site handle — used in Twitter card meta */
  twitterHandle: "@thepreceptorglobal",
};

/**
 * Per-page SEO metadata.
 * title     — browser tab + og:title + twitter:title
 * description — meta description + og:description + twitter:description
 *              Keep between 120–160 characters.
 * canonical — absolute canonical URL (no trailing slash except homepage)
 * keywords  — comma-separated; used for reference / future schema only;
 *              Google ignores the keywords meta tag but it's kept for
 *              internal documentation purposes.
 */
export const PAGE_SEO = {
  home: {
    title:       "The Preceptor — Vedic Astrology Readings & Spiritual Consultations Online",
    description: "Book a private Vedic astrology consultation online with The Preceptor — 7 years of experience, Psychology honors graduate. Birth chart readings, career & relationship clarity for seekers across the USA.",
    canonical:   `${SITE.domain}/`,
    keywords:    "vedic astrology reading online USA, birth chart reading, astrology consultation online, personalized astrology guidance, the preceptor, the preceptor global, best vedic astrologer USA, astrologer in California",
  },

  about: {
    title:       "About — The Preceptor | Vedic Astrology & Spiritual Guidance",
    description: "Meet The Preceptor — a Psychology honors graduate with 7 years of dedicated Vedic and Western astrology practice. Blending astrological knowledge with psychological insight for deeply accurate readings.",
    canonical:   `${SITE.domain}/about`,
    keywords:    "the preceptor global, vedic astrologer online, spiritual guidance astrology, professional astrologer, best vedic astrologer USA, astrologer 7 years experience",
  },

  book: {
    title:       "Book a Session — The Preceptor | Astrology Consultation Online",
    description: "Reserve your private astrology session with The Preceptor. Vedic birth chart readings, relationship synastry, career guidance & spiritual consultations — available across all US timezones.",
    canonical:   `${SITE.domain}/book`,
    keywords:    "book astrology consultation online, paid astrology reading USA, professional astrologer near me online, astrology session booking, vedic astrology reading online USA",
  },

  services: {
    title:       "Services — The Preceptor | Birth Chart, Synastry & Spiritual Readings",
    description: "Explore all astrology services: Vedic birth chart (Kundli), relationship synastry, marriage guidance, career astrology, Sade Sati, Mahadasha, tarot readings & spiritual consultations — all online.",
    canonical:   `${SITE.domain}/services`,
    keywords:    "birth chart reading astrologer, synastry astrology USA, kundli analysis online, tarot reading online, marriage astrology consultation, career astrology reading, deep astrology reading session, sade sati consultation",
  },

  testimonials: {
    title:       "Client Reviews — The Preceptor | Trusted Astrology Consultations",
    description: "Read what clients across the USA and 18+ countries say about their astrology sessions with The Preceptor. Accurate, insightful, and deeply personal readings.",
    canonical:   `${SITE.domain}/testimonials`,
    keywords:    "the preceptor reviews, astrology consultation reviews, best vedic astrologer reviews USA, accurate astrology reading online",
  },

  contact: {
    title:       "Contact — The Preceptor | Get in Touch",
    description: "Reach out to The Preceptor for questions, collaborations, or to learn more about available astrology consultations and spiritual guidance sessions. Response within 24 hours.",
    canonical:   `${SITE.domain}/contact`,
    keywords:    "contact the preceptor, astrology consultation enquiry, book astrologer online USA",
  },

  qna: {
    title:       "Q&A — The Preceptor | Astrology Questions Answered",
    description: "Frequently asked questions about Vedic astrology, birth chart readings, relationship synastry, session formats, and what to expect from a consultation with The Preceptor.",
    canonical:   `${SITE.domain}/qna`,
    keywords:    "astrology faq, vedic astrology questions USA, birth chart reading faq, astrology consultation questions, what to expect astrology reading",
  },

  shop: {
    title:       "Shop — The Preceptor | Astrology Resources (Coming Soon)",
    description: "The Preceptor shop is coming soon — curated astrology resources, guides, and tools for high-intention seekers. Join the waitlist for early access.",
    canonical:   `${SITE.domain}/shop`,
    keywords:    "astrology shop, astrology resources online, the preceptor shop",
  },

  privacy: {
    title:       "Privacy Policy — The Preceptor",
    description: "How The Preceptor collects, uses, and protects your personal information when you book an astrology consultation or visit thepreceptorglobal.com.",
    canonical:   `${SITE.domain}/privacy`,
    keywords:    "the preceptor privacy policy, data protection astrology consultation",
  },

  terms: {
    title:       "Terms & Conditions — The Preceptor",
    description: "Terms of service governing astrology consultations, bookings, payments, and use of The Preceptor website and services.",
    canonical:   `${SITE.domain}/terms`,
    keywords:    "the preceptor terms of service, astrology consultation terms, booking policy",
  },

  notFound: {
    title:       "Page Not Found — The Preceptor",
    description: "The page you're looking for doesn't exist. Return to The Preceptor homepage for premium astrology consultations and spiritual guidance.",
    canonical:   `${SITE.domain}/`,
    keywords:    "",
  },
};
