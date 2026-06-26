/**
 * constants.js — single source of truth for all site content.
 */

export const SITE = {
  name: "The Preceptor",
  tagline: "Premium Astrology Consultations",
  description:
    "Cinematic astrology consultations and spiritual guidance for high-intention clients in the US and across the world.",
  url: "https://thepreceptor.com",
  email: "hello@thepreceptor.com",
  phone: "+1 (555) 000-0000",
  whatsapp: "https://wa.me/15550000000",
  calLink: "https://cal.com/preceptor",
  social: {
    instagram: "https://instagram.com/thepreceptor",
    twitter: "https://twitter.com/thepreceptor",
    youtube: "https://youtube.com/@thepreceptor",
    facebook: "https://facebook.com/thepreceptor",
  },
};

/**
 * OFFER CONFIG
 * Set OFFER_END_DATE to the exact UTC timestamp when the $180 offer expires.
 * After that date the timer disappears and originalPrice is still shown struck-through
 * (so the card still looks correct until you remove originalPrice from each service).
 *
 * Format: ISO 8601 — "YYYY-MM-DDTHH:MM:SSZ"
 */
export const OFFER_END_DATE = "2026-07-17T23:59:59Z"; // 30-day offer window

export const SERVICES = [
  {
    slug: "general-birth-chart",
    title: "General Birth Chart Reading",
    badge: "Quick Session",
    desc: "A focused overview of your natal chart — your core personality, life themes, key strengths, and the fundamental blueprint the cosmos wrote for you at birth.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Star",
  },
  {
    slug: "detailed-birth-chart",
    title: "Detailed Birth Chart Reading",
    badge: "In-Depth",
    desc: "A cinematic, comprehensive decode of your entire natal sky — purpose, gifts, shadow, life arc, and the deeper story encoded in every house and planet.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "BookOpen",
  },
  {
    slug: "relationship-guidance",
    title: "Relationship Guidance",
    badge: "Quick Session",
    desc: "Targeted guidance on your current relationship dynamic — understanding patterns, timing, and what the chart reveals about love in your life right now.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Heart",
  },
  {
    slug: "partner-compatibility",
    title: "Partner Compatibility",
    badge: "Mid-Level · In-Depth",
    desc: "A synastry and composite chart reading for two individuals — revealing the strengths, challenges, karmic threads, and long-term potential of the relationship.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "HeartHandshake",
  },
  {
    slug: "marriage-consultation",
    title: "Marriage Consultation",
    badge: "In-Depth",
    desc: "An exhaustive study of two charts across every dimension of compatibility — emotional, physical, karmic, and practical. The most thorough relationship reading offered.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Rings",
  },
  {
    slug: "career-consultation",
    title: "Career Consultation",
    badge: "Mid-Level · In-Depth",
    desc: "Strategic career direction aligned with your dharma and chart placements. The in-depth session identifies multiple aligned career paths with a personalised roadmap for each.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Briefcase",
  },
  {
    slug: "saturn-seven-half",
    title: "Saturn's Seven and a Half Guidance",
    badge: "Vedic · Sade Sati",
    desc: "Specialised guidance for the Sade Sati — when Saturn transits the 12th, natal, or 2nd sign from your Moon. Understand the purpose, navigate the pressure, and emerge stronger.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Saturn",
  },
  {
    slug: "later-life-reading",
    title: "Later Life Reading",
    badge: "Predictive",
    desc: "A forward-looking reading of who you are becoming — what life looks and feels like as you step beyond your 20s or enter the post-marriage chapter of your journey.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Hourglass",
  },
  {
    slug: "mahadasha-guidance",
    title: "Mahadasha Guidance",
    badge: "Planetary Period",
    desc: "Deep guidance on your current planetary time period — what the ruling planet demands of you, what it promises, and how to move with its energy rather than against it.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Orbit",
  },
  {
    slug: "current-situation",
    title: "Current Situation Guidance",
    badge: "Quick · Mid-Level",
    desc: "For moments when you need clarity now. A focused, real-time reading of your current transits and circumstances — practical, grounded, and immediately applicable.",
    duration: "60 min",
    price: "$180",
    originalPrice: "$200",
    icon: "Compass",
  },
];

/** First 5 services shown on the home page (was 4) */
export const HOME_SERVICES = SERVICES.slice(0, 5);

export const TESTIMONIALS = [
  {
    name: "Amelia R.",
    country: "New York, USA",
    text: "The most precise reading I've ever had. It felt like sitting with a wise friend who could see decades ahead.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    country: "London, UK",
    text: "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed.",
    rating: 5,
  },
  {
    name: "Priya S.",
    country: "Toronto, CA",
    text: "A truly luxurious experience. Insightful, grounded and deeply transformative. I have referred half of my friends.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    country: "Los Angeles, USA",
    text: "I've worked with multiple astrologers. None compare. The clarity I received reshaped my next career move.",
    rating: 5,
  },
  {
    name: "Lina M.",
    country: "Berlin, DE",
    text: "Every word landed. The session was poetic, precise and quietly powerful.",
    rating: 5,
  },
];

export const ACHIEVEMENTS = [
  { value: "12+", label: "Years of Practice" },
  { value: "8,400", label: "Sessions Delivered" },
  { value: "47", label: "Countries Served" },
  { value: "4.98", label: "Average Rating" },
];

export const FAQS = [
  {
    q: "How does an online astrology consultation work?",
    a: "Sessions are conducted over a private video call. You receive a calendar invite and an intake form before the session.",
  },
  {
    q: "What details are required to book?",
    a: "Your full date of birth, exact time of birth, and place of birth — plus the questions on your mind.",
  },
  {
    q: "How long is a session?",
    a: "Every session is 60 minutes — focused, private, and deeply personal.",
  },
  {
    q: "Can international clients book sessions?",
    a: "Absolutely. We serve clients across all timezones with white-glove scheduling.",
  },
  {
    q: "Are sessions private and confidential?",
    a: "Yes. Every conversation is held in complete confidence.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Reschedules are accepted up to 24 hours before the session. Cancellations within 24 hours are subject to a 50% fee.",
  },
];

export const ASTROLOGER = {
  name: "The Preceptor",
  yearsExperience: 12,
  bio: "For over twelve years, The Preceptor has guided executives, artists, and seekers through life's most pivotal chapters — translating classical Vedic and Western astrology into language that is grounded, modern, and quietly powerful.",
  philosophy:
    "Our philosophy is simple: the stars do not predict your fate — they reveal your design. We help you read it.",
};
