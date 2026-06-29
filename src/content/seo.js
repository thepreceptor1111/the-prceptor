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
      "description": "Premium Vedic astrology consultations online for clients across the USA and worldwide. Birth chart readings, relationship guidance, career astrology, Mahadasha and spiritual consultations. 6,000+ sessions delivered across 27+ countries.",
      "priceRange": "$$",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.98",
        "bestRating": "5",
        "ratingCount": "6000"
      },
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
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Quick Personal Insights" }, "price": "75", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "General Birth Chart Reading" }, "price": "123", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Detailed Birth Chart Reading" }, "price": "186", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Relationship Guidance" }, "price": "90", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Partner Compatibility" }, "price": "132", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Career Consultation" }, "price": "195", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Marriage Consultation" }, "price": "195", "priceCurrency": "USD" },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Saturn's Seven and a Half Guidance" }, "price": "132", "priceCurrency": "USD" }
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
    description: "Meet The Preceptor — a professional Vedic astrologer with nearly 7 years of experience and a Psychology Honours degree. 6,000+ sessions across 27+ countries. Offering personalized astrology guidance online worldwide.",
    canonical:   `${SITE.domain}/about`,
    keywords:    "The Preceptor Global, professional astrologer near me online, best Vedic astrologer in USA, personalized astrology guidance, spiritual guidance astrology consultation, Vedic astrology reading online USA, astrologer in USA",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "The Preceptor",
      "jobTitle": "Vedic Astrologer",
      "url": "https://www.thepreceptorglobal.com/about",
      "image": "https://www.thepreceptorglobal.com/og-image.webp",
      "description": "Professional Vedic astrologer with nearly 7 years of dedicated study and a Bachelor's degree with Honours in Psychology. Specialising in birth chart readings, relationship astrology, career guidance and spiritual consultations. 6,000+ sessions delivered across 27+ countries with a 4.98 average rating.",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "educationalLevel": "Bachelor's with Honours",
        "name": "Bachelor's Degree with Honours in Psychology"
      },
      "knowsAbout": [
        "Vedic Astrology",
        "Jyotish",
        "Western Astrology",
        "Birth Chart Reading",
        "Synastry",
        "Composite Charts",
        "Mahadasha",
        "Antardasha",
        "Sade Sati",
        "Nakshatras",
        "Navamsha (D9)",
        "Divisional Charts",
        "Transits",
        "Vedic Mythology",
        "Psychological Astrology"
      ],
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
      "description": "Private 1-on-1 Vedic astrology consultations online. Birth chart, career, relationship, marriage, Mahadasha and spiritual guidance sessions available for clients across the USA and worldwide. All sessions include a follow-up Q&A window.",
      "offers": {
        "@type": "Offer",
        "price": "75",
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
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Astrology Consultation Services — The Preceptor",
        "url": "https://www.thepreceptorglobal.com/services",
        "numberOfItems": 12,
        "itemListElement": [
          { "@type": "ListItem", "position": 1,  "name": "Quick Personal Insights",                        "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 2,  "name": "General Birth Chart Reading",                    "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 3,  "name": "Detailed Birth Chart Reading",                   "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 4,  "name": "Relationship Guidance",                          "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 5,  "name": "Partner Compatibility (Synastry)",               "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 6,  "name": "Career Consultation",                            "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 7,  "name": "Marriage Consultation",                          "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 8,  "name": "Current Situation Guidance",                     "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 9,  "name": "Later Life Reading",                             "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 10, "name": "Mahadasha Guidance",                             "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 11, "name": "Saturn's Seven and a Half Guidance",             "url": "https://www.thepreceptorglobal.com/book" },
          { "@type": "ListItem", "position": 12, "name": "Birth Time Rectification (D9 chart)",            "url": "https://www.thepreceptorglobal.com/book" }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Quick Personal Insights",
        "description": "A fast, focused glimpse into your birth chart revealing stunning predictions and jaw-dropping truths about you. Uncover your core personality, hidden patterns, and life direction. Quick, sharp, and surprisingly revealing.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "75", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "General Birth Chart Reading",
        "description": "A general yet focused overview of your natal chart — your core personality, life themes, key strengths, and the fundamental blueprint the cosmos wrote for you at birth.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "123", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Detailed Birth Chart Reading",
        "description": "A profound exploration of your soul's purpose through extensive chart analysis and two dedicated sessions with a follow-up. Uncovering deeper life patterns, karmic lessons, hidden potentials, and the forces shaping your path.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "186", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Relationship Guidance",
        "description": "Targeted guidance on your current relationship dynamic — understanding patterns, timing, and what the chart reveals about love in your life right now. Or getting your partner's chart read.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "90", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Partner Compatibility",
        "description": "A synastry and composite chart reading for two individuals — assessing the strengths, challenges, karmic threads, and long-term potential of your relationship.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "132", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Career Consultation",
        "description": "Strategic career direction aligned with your real interests and astrological chart placements. Identifies multiple aligned career paths with a personalized roadmap for each.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "195", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Marriage Consultation",
        "description": "An exhaustive study of two charts across every dimension of compatibility — emotional, physical, karmic, and practical. The most thorough relationship reading offered.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "195", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Current Situation Guidance",
        "description": "For moments when you need clarity now. A focused, real-time reading of your current state of mind and circumstances — practical, grounded, and immediately applicable.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "81", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Later Life Reading",
        "description": "A forward-looking reading of who you are becoming — what life looks and feels like as you step beyond your 20s or enter the post-marriage chapter of your journey.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "186", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Mahadasha Guidance",
        "description": "Deep guidance on your current planetary time period — what the ruling planet demands of you, what it promises, and how to move with its energy rather than against it.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "123", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Saturn's Seven and a Half Guidance (Sade Sati)",
        "description": "Specialized guidance for when Saturn transits the 12th, natal, or 2nd sign from your Moon. Understand the purpose, navigate the pressure, and emerge stronger.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "132", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Birth Time Rectification (D9 Navamsha)",
        "description": "Refine your birth time through a detailed analysis of life events using the D9 Navamsha chart. Ascertain your most accurate birth time for deeper astrological insights and greater accuracy.",
        "url": "https://www.thepreceptorglobal.com/services",
        "provider": { "@type": "ProfessionalService", "name": "The Preceptor Global" },
        "offers": { "@type": "Offer", "price": "240", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
      }
    ],
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
      "about": {
        "@type": "ProfessionalService",
        "name": "The Preceptor Global",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.98",
          "bestRating": "5",
          "ratingCount": "6000"
        }
      },
      "review": [
        {
          "@type": "Review",
          "reviewBody": "I was skeptical going in, but this session genuinely changed how I see myself. He didn't just describe my chart — he explained why I behave the way I do in relationships and why I've always felt out of place in group settings. It felt like someone finally gave me a manual for my own life.",
          "author": { "@type": "Person", "name": "Priya S." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "reviewBody": "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed.",
          "author": { "@type": "Person", "name": "Daniel K." },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        },
        {
          "@type": "Review",
          "reviewBody": "Everything was so on point, wanted to know more but the session time was over haha, I'll definitely get the detailed one next time :)",
          "author": { "@type": "Person", "name": "Emilia" },
          "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
        }
      ]
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
      "url": "https://www.thepreceptorglobal.com/qna",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does an online astrology consultation work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "After booking, you receive a confirmation with a video call link. The session is private and 1-on-1 with The Preceptor. A brief preliminary discussion precedes the full chart analysis. All sessions include a follow-up Q&A via email within a 48-hour window."
          }
        },
        {
          "@type": "Question",
          "name": "How long is a session?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Session lengths vary by service: Quick Personal Insights is 60 minutes; General Birth Chart Reading is 90 minutes with one follow-up; Detailed Birth Chart Reading is two 120-minute sessions with a follow-up. All session formats are listed on the Services page."
          }
        },
        {
          "@type": "Question",
          "name": "Can international clients book sessions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All sessions are conducted online and are timezone-aware. The Preceptor serves clients worldwide — across 27+ countries including the USA, UK, India, Poland, Australia, and more."
          }
        },
        {
          "@type": "Question",
          "name": "Are sessions private and confidential?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. All consultations are completely private and confidential. What is shared in a session stays between the client and The Preceptor."
          }
        },
        {
          "@type": "Question",
          "name": "Which system of astrology is used?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Vedic Astrology, also known as Jyotish, is the primary system used. The Preceptor's approach blends Vedic Jyotish with psychological cause-and-effect reasoning for deeper, more precise insights."
          }
        },
        {
          "@type": "Question",
          "name": "What details are required to book a session?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You will need to provide your full name, date of birth, exact time of birth, and place of birth. An accurate birth time is important for precise chart analysis."
          }
        },
        {
          "@type": "Question",
          "name": "What is Mahadasha in Vedic astrology?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Mahadasha is a major planetary time period in the Vimshottari dasha system of Vedic astrology. Each planet rules a Mahadasha of a specific duration (e.g., Saturn rules 19 years, Jupiter 16 years). Your current Mahadasha planet significantly shapes the themes, opportunities, and challenges of that life period."
          }
        },
        {
          "@type": "Question",
          "name": "What is Sade Sati?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sade Sati, or Saturn's Seven and a Half, refers to the approximately 7.5-year period when Saturn transits through the 12th, 1st (natal), and 2nd house from the Moon sign. It is often associated with tests, restructuring, and deep transformation. The Preceptor offers specialized guidance for navigating this period."
          }
        },
        {
          "@type": "Question",
          "name": "What is your cancellation policy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For cancellations or rescheduling, please reach out directly at thepreceptor1111@gmail.com. All enquiries receive a response within 24 hours."
          }
        },
        {
          "@type": "Question",
          "name": "Is Vedic astrology different from Western astrology?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Vedic astrology (Jyotish) uses the sidereal zodiac, which accounts for the precession of the equinoxes, placing planets in slightly different signs compared to the tropical zodiac used by Western astrology. Vedic astrology also incorporates nakshatras (lunar mansions), dashas (planetary time periods), and divisional charts like the Navamsha (D9) for deeper analysis."
          }
        }
      ]
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
