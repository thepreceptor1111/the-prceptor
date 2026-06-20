/**
 * src/content/seo.js
 * Central SEO configuration for The Preceptor.
 */

export const SITE = {
  name:        "The Preceptor",
  handle:      "thepreceptorglobal",
  tagline:     "For those who seek clarity.",
  description: "Modern guidance, written in the stars.",
  domain:      "https://www.thepreceptorglobal.com",
  email:       "thepreceptor1111@gmail.com",
  ogImage:     "https://www.thepreceptorglobal.com/og-image.webp",
  social: {
    instagram: "https://www.instagram.com/thepreceptor1111",
    reddit:    "https://www.reddit.com/user/ThePreceptor1111/",
  },
  twitterHandle: "@thepreceptorglobal",
};

export const PAGE_SEO = {
  home: {
    title:       "The Preceptor — Best Vedic Astrologer Online USA | Birth Chart & Spiritual Readings",
    description: "The Preceptor Global — trusted Vedic astrology readings online for clients across the USA. Book a private birth chart, career, relationship or spiritual guidance consultation today.",
    canonical:   `${SITE.domain}/`,
    keywords:    "The Preceptor, The Preceptor Global, Vedic astrology reading online USA, best Vedic astrologer in USA, astrologer in USA, astrology USA, birth chart reading astrologer, personalized astrology guidance, book astrology consultation online, accurate astrology reading online US, astrologer in California, spiritual guidance astrology consultation",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "The Preceptor Global",
      "alternateName": "The Preceptor",
      "url": "https://www.thepreceptorglobal.com",
      "image": "https://www.thepreceptorglobal.com/og-image.webp",
      "description": "Premium Vedic astrology consultations online for clients across the USA and worldwide. Birth chart readings, relationship guidance, career astrology, Mahadasha and spiritual consultations.",
      "priceRange": "$$",
      "areaServed": [
        { "@type": "Country", "name": "United States" },
        { "@type": "AdministrativeArea", "name": "California" }
      ],
      "serviceType": [
        "Vedic Astrology Reading",
        "Birth Chart Reading",
        "Relationship Astrology",
        "Career Astrology",
        "Spiritual Guidance",
        "Mahadasha Guidance",
        "Sade Sati Consultation"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Astrology Consultation Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "General Birth Chart Reading" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Detailed Birth Chart Reading" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partner Compatibility" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marriage Consultation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Career Consultation" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mahadasha Guidance" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saturn\'s Seven and a Half Guidance" } }
        ]
      },
      "sameAs": [
        "https://www.instagram.com/thepreceptor1111",
        "https://www.reddit.com/user/ThePreceptor1111/"
      ]
    },
  },

  about: {
    title:       "About The Preceptor — Professional Vedic Astrologer Online USA",
    description: "Meet The Preceptor — a professional Vedic astrologer with 12+ years of experience and a Psychology background. Offering personalized astrology guidance and spiritual consultations online across the USA.",
    canonical:   `${SITE.domain}/about`,
    keywords:    "The Preceptor Global, professional astrologer near me online, best Vedic astrologer in USA, personalized astrology guidance, spiritual guidance astrology consultation, Vedic astrology reading online USA, astrologer in USA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "The Preceptor",
      "jobTitle": "Vedic Astrologer",
      "url": "https://www.thepreceptorglobal.com/about",
      "image": "https://www.thepreceptorglobal.com/og-image.webp",
      "description": "Professional Vedic astrologer with 12+ years of experience and a Psychology background. Specialising in birth chart readings, relationship astrology, career guidance and spiritual consultations.",
      "knowsAbout": ["Vedic Astrology", "Western Astrology", "Birth Chart Reading", "Synastry", "Mahadasha", "Sade Sati", "Spiritual Guidance"],
      "sameAs": [
        "https://www.instagram.com/thepreceptor1111",
        "https://www.reddit.com/user/ThePreceptor1111/"
      ]
    },
  },

  book: {
    title:       "Book Astrology Consultation Online — The Preceptor | USA",
    description: "Book a paid astrology reading with The Preceptor — professional Vedic astrologer online USA. Private 60-min sessions for birth chart, relationship, career & spiritual guidance. All US timezones.",
    canonical:   `${SITE.domain}/book`,
    keywords:    "book astrology consultation online, paid astrology reading USA, professional astrologer near me online, book astrology session USA, Vedic astrology reading online USA, accurate astrology reading online US, astrologer in California",
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Book Astrology Consultation — The Preceptor",
      "url": "https://www.thepreceptorglobal.com/book",
      "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
      "areaServed": { "@type": "Country", "name": "United States" },
      "description": "Private 60-minute Vedic astrology consultations online. Birth chart, career, relationship, marriage, Mahadasha and spiritual guidance sessions available for clients across the USA.",
      "offers": {
        "@type": "Offer",
        "price": "180",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      }
    },
  },

  services: {
    title:       "Astrology Services — The Preceptor | Birth Chart, Relationship & Spiritual Readings USA",
    description: "Explore all astrology services by The Preceptor: Vedic birth chart reading, deep astrology reading session, spouse astrology, marriage consultation, career guidance, Mahadasha & Sade Sati — all online.",
    canonical:   `${SITE.domain}/services`,
    keywords:    "birth chart reading astrologer, deep astrology reading session, spiritual guidance astrology consultation, spouse astrology, Vedic astrology reading online USA, marriage astrology consultation, career astrology reading, Mahadasha guidance, Sade Sati consultation, astrology USA, accurate astrology reading online US",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Astrology Consultation Services — The Preceptor",
      "url": "https://www.thepreceptorglobal.com/services",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "General Birth Chart Reading",          "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 2, "name": "Detailed Birth Chart Reading",         "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 3, "name": "Relationship Guidance",               "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 4, "name": "Partner Compatibility (Spouse Astrology)", "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 5, "name": "Marriage Consultation",               "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 6, "name": "Career Consultation",                 "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 7, "name": "Saturn's Seven and a Half Guidance",  "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 8, "name": "Later Life Reading",                  "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 9, "name": "Mahadasha Guidance",                  "url": "https://www.thepreceptorglobal.com/book" },
        { "@type": "ListItem", "position": 10, "name": "Current Situation Guidance",         "url": "https://www.thepreceptorglobal.com/book" }
      ]
    },
  },

  testimonials: {
    title:       "Client Reviews — The Preceptor | Trusted Astrologer Online USA",
    description: "Real reviews from clients across the USA and worldwide. Discover why The Preceptor is rated as one of the best Vedic astrologers online for accurate, personalized astrology readings.",
    canonical:   `${SITE.domain}/testimonials`,
    keywords:    "The Preceptor reviews, best Vedic astrologer in USA reviews, accurate astrology reading online US, trusted astrologer online USA, The Preceptor Global reviews",
    schema: {
      "@context": "https://schema.org",
      "@type": "ReviewPage",
      "name": "Client Reviews — The Preceptor",
      "url": "https://www.thepreceptorglobal.com/testimonials",
      "about": { "@type": "ProfessionalService", "name": "The Preceptor Global" }
    },
  },

  contact: {
    title:       "Contact The Preceptor — Book Astrology Consultation Online USA",
    description: "Get in touch with The Preceptor for astrology consultations, session enquiries or spiritual guidance. Professional Vedic astrologer serving clients across the USA. Response within 24 hours.",
    canonical:   `${SITE.domain}/contact`,
    keywords:    "contact The Preceptor, book astrology consultation online, astrologer in USA, professional astrologer near me online, The Preceptor Global contact",
  },

  qna: {
    title:       "Astrology Q&A — The Preceptor | Vedic Astrology Questions Answered",
    description: "Answers to the most common Vedic astrology questions — birth chart readings, relationship synastry, Mahadasha, Sade Sati, session formats and what to expect from The Preceptor consultations.",
    canonical:   `${SITE.domain}/qna`,
    keywords:    "astrology FAQ USA, Vedic astrology questions, birth chart reading FAQ, what is Mahadasha, what is Sade Sati, astrology consultation questions, The Preceptor FAQ",
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Astrology Q&A — The Preceptor",
      "url": "https://www.thepreceptorglobal.com/qna"
    },
  },

  shop: {
    title:       "Shop — The Preceptor | Astrology Resources Coming Soon",
    description: "The Preceptor shop is coming soon — curated astrology resources, guides, and tools for high-intention seekers.",
    canonical:   `${SITE.domain}/shop`,
    keywords:    "astrology shop, astrology resources online, The Preceptor shop",
  },

  privacy: {
    title:       "Privacy Policy — The Preceptor Global",
    description: "How The Preceptor collects, uses, and protects your personal information when you book an astrology consultation or visit thepreceptorglobal.com.",
    canonical:   `${SITE.domain}/privacy`,
    keywords:    "The Preceptor privacy policy",
  },

  terms: {
    title:       "Terms & Conditions — The Preceptor Global",
    description: "Terms of service governing astrology consultations, bookings, payments, and use of The Preceptor website.",
    canonical:   `${SITE.domain}/terms`,
    keywords:    "The Preceptor terms of service",
  },

  notFound: {
    title:       "Page Not Found — The Preceptor",
    description: "Return to The Preceptor homepage for premium Vedic astrology consultations and spiritual guidance online USA.",
    canonical:   `${SITE.domain}/`,
    keywords:    "",
  },
};
