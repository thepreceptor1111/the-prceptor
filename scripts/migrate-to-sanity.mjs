/**
 * migrate-to-sanity.mjs
 * Seeds all hardcoded site content into Sanity.
 *
 * Usage:
 *   node scripts/migrate-to-sanity.mjs
 *
 * Requirements:
 *   SANITY_PROJECT_ID  — from sanity.config.js (or sanity manage)
 *   SANITY_DATASET     — usually "production"
 *   SANITY_TOKEN       — write token from sanity.io/manage → API → Tokens
 *
 * Set them in .env.local or pass inline:
 *   SANITY_PROJECT_ID=xxx SANITY_DATASET=production SANITY_TOKEN=sk... node scripts/migrate-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

// Load .env.local from project root
dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env.local") });

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET    = process.env.SANITY_DATASET ?? "production";
const TOKEN      = process.env.SANITY_TOKEN;

if (!PROJECT_ID || !TOKEN) {
  console.error("❌  Missing env vars. Set SANITY_PROJECT_ID and SANITY_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

// ─── CONTENT ────────────────────────────────────────────────────────────────

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",

  // General
  siteName:        "The Preceptor",
  tagline:         "Modern guidance, written in the stars.",
  email:           "hello@thepreceptor.com",
  phone:           "+1 (555) 000-0000",
  instagramUrl:    "https://instagram.com/thepreceptor",
  calcomUsername:  "preceptor",
  calcomEventType: "60min",

  // Hero
  heroBadgeText:    "Premium Astrology",
  heroHeading1:     "Modern guidance,",
  heroHeading2Gold: "written in the stars.",
  heroBodyCopy:     "Cinematic, deeply personal astrology consultations for high-intention seekers — designed for clarity in love, career, and life's defining chapters.",
  heroCta1Label:    "Book a Session",
  heroCta2Label:    "Explore Services",

  // About
  aboutHeading1:     "A modern astrologer",
  aboutHeading2Gold: "for a modern world.",
  aboutParagraph1:   "For over twelve years, The Preceptor has guided executives, artists, and seekers through life's most pivotal chapters — translating classical Vedic and Western astrology into language that is grounded, modern, and quietly powerful.",
  aboutParagraph2:   "Our philosophy is simple: the stars do not predict your fate — they reveal your design. We help you read it.",

  // Stats
  stat1: { value: "12+",   label: "Years of Practice" },
  stat2: { value: "8,400", label: "Sessions Delivered" },
  stat3: { value: "47",    label: "Countries Served" },
  stat4: { value: "4.98",  label: "Average Rating" },

  // Services section header
  servicesSectionLabel:    "Services",
  servicesSectionHeading:  "Consultations crafted with intention.",
  servicesSectionSubtitle: "",

  // Achievements section header
  achievementsSectionLabel:   "Recognition",
  achievementsSectionHeading: "A practice built on trust.",

  // Testimonials section header
  testimonialsSectionLabel:   "Testimonials",
  testimonialsSectionHeading: "Voices from across the world.",

  // Experience section
  experienceSectionLabel:   "The Experience",
  experienceSectionHeading: "What makes The Preceptor different?",
  experienceItems: [
    { _key: "exp1", icon: "Award",    title: "12 Years of Practice", desc: "Refined over thousands of sessions across Vedic, Western, and symbolic traditions." },
    { _key: "exp2", icon: "Sparkles", title: "No Templates",         desc: "Every reading is original. Every session is built around you." },
    { _key: "exp3", icon: "Star",     title: "Global Clientele",     desc: "Trusted by founders, artists, healers, and seekers across 18+ countries." },
  ],

  // FAQ section header
  faqSectionLabel:   "FAQ",
  faqSectionHeading: "Common questions.",

  // Offer timer — 30-day window from original constant
  offerDeadline: "2026-07-17T23:59:59Z",
};

const services = [
  { slug: "general-birth-chart",  title: "General Birth Chart Reading",          badge: "Quick Session",          desc: "A focused overview of your natal chart — your core personality, life themes, key strengths, and the fundamental blueprint the cosmos wrote for you at birth.",                                                                          duration: "60 min", price: "$180", originalPrice: "$200", icon: "Star",       order: 1 },
  { slug: "detailed-birth-chart", title: "Detailed Birth Chart Reading",          badge: "In-Depth",               desc: "A cinematic, comprehensive decode of your entire natal sky — purpose, gifts, shadow, life arc, and the deeper story encoded in every house and planet.",                                                                            duration: "60 min", price: "$180", originalPrice: "$200", icon: "BookOpen",   order: 2 },
  { slug: "relationship-guidance",title: "Relationship Guidance",                 badge: "Quick Session",          desc: "Targeted guidance on your current relationship dynamic — understanding patterns, timing, and what the chart reveals about love in your life right now.",                                                                             duration: "60 min", price: "$180", originalPrice: "$200", icon: "Heart",      order: 3 },
  { slug: "partner-compatibility", title: "Partner Compatibility",                badge: "Mid-Level · In-Depth",   desc: "A synastry and composite chart reading for two individuals — revealing the strengths, challenges, karmic threads, and long-term potential of the relationship.",                                                                    duration: "60 min", price: "$180", originalPrice: "$200", icon: "Heart",      order: 4 },
  { slug: "marriage-consultation", title: "Marriage Consultation",                badge: "In-Depth",               desc: "An exhaustive study of two charts across every dimension of compatibility — emotional, physical, karmic, and practical. The most thorough relationship reading offered.",                                                            duration: "60 min", price: "$180", originalPrice: "$200", icon: "Heart",      order: 5 },
  { slug: "career-consultation",   title: "Career Consultation",                  badge: "Mid-Level · In-Depth",   desc: "Strategic career direction aligned with your dharma and chart placements. The in-depth session identifies multiple aligned career paths with a personalised roadmap for each.",                                                       duration: "60 min", price: "$180", originalPrice: "$200", icon: "Briefcase",  order: 6 },
  { slug: "saturn-seven-half",     title: "Saturn's Seven and a Half Guidance",   badge: "Vedic · Sade Sati",      desc: "Specialised guidance for the Sade Sati — when Saturn transits the 12th, natal, or 2nd sign from your Moon. Understand the purpose, navigate the pressure, and emerge stronger.",                                                   duration: "60 min", price: "$180", originalPrice: "$200", icon: "Moon",       order: 7 },
  { slug: "later-life-reading",    title: "Later Life Reading",                   badge: "Predictive",             desc: "A forward-looking reading of who you are becoming — what life looks and feels like as you step beyond your 20s or enter the post-marriage chapter of your journey.",                                                                 duration: "60 min", price: "$180", originalPrice: "$200", icon: "Compass",    order: 8 },
  { slug: "mahadasha-guidance",    title: "Mahadasha Guidance",                   badge: "Planetary Period",       desc: "Deep guidance on your current planetary time period — what the ruling planet demands of you, what it promises, and how to move with its energy rather than against it.",                                                               duration: "60 min", price: "$180", originalPrice: "$200", icon: "Star",       order: 9 },
  { slug: "current-situation",     title: "Current Situation Guidance",           badge: "Quick · Mid-Level",      desc: "For moments when you need clarity now. A focused, real-time reading of your current transits and circumstances — practical, grounded, and immediately applicable.",                                                                  duration: "60 min", price: "$180", originalPrice: "$200", icon: "Compass",    order: 10 },
];

const testimonials = [
  { name: "Amelia R.",  country: "New York, USA",     rating: 5, text: "The most precise reading I've ever had. It felt like sitting with a wise friend who could see decades ahead." },
  { name: "Daniel K.",  country: "London, UK",        rating: 5, text: "Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed." },
  { name: "Priya S.",   country: "Toronto, CA",       rating: 5, text: "A truly luxurious experience. Insightful, grounded and deeply transformative. I have referred half of my friends." },
  { name: "Marcus T.",  country: "Los Angeles, USA",  rating: 5, text: "I've worked with multiple astrologers. None compare. The clarity I received reshaped my next career move." },
  { name: "Lina M.",    country: "Berlin, DE",        rating: 5, text: "Every word landed. The session was poetic, precise and quietly powerful." },
];

const faqs = [
  { question: "How does an online astrology consultation work?",  answer: "Sessions are conducted over a private video call. You receive a calendar invite, an intake form, and a recording afterwards.",                                               order: 1 },
  { question: "What details are required to book?",               answer: "Your full date of birth, exact time of birth, and place of birth — plus the questions on your mind.",                                                                             order: 2 },
  { question: "How long is a session?",                           answer: "Every session is 60 minutes — focused, private, and deeply personal.",                                                                                                            order: 3 },
  { question: "Can international clients book sessions?",         answer: "Absolutely. We serve clients across all timezones with white-glove scheduling.",                                                                                                  order: 4 },
  { question: "Are sessions private and confidential?",           answer: "Yes. Every conversation is held in complete confidence. Recordings are shared only with you.",                                                                                    order: 5 },
  { question: "What is your cancellation policy?",                answer: "Reschedules are accepted up to 24 hours before the session. Cancellations within 24 hours are subject to a 50% fee.",                                                            order: 6 },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function slugId(type, slug) {
  return `${type}-${slug}`;
}

async function upsert(doc) {
  try {
    await client.createOrReplace(doc);
    console.log(`  ✅  ${doc._type} → ${doc._id}`);
  } catch (err) {
    console.error(`  ❌  ${doc._type} → ${doc._id}:`, err.message);
  }
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

async function run() {
  console.log(`\n🚀  Migrating to Sanity (project: ${PROJECT_ID}, dataset: ${DATASET})\n`);

  // 1. Site Settings (singleton)
  console.log("📋  Site Settings");
  await upsert(siteSettings);

  // 2. Services
  console.log("\n🔮  Services");
  for (const s of services) {
    await upsert({
      _id:           slugId("service", s.slug),
      _type:         "service",
      slug:          { _type: "slug", current: s.slug },
      title:         s.title,
      badge:         s.badge,
      description:   s.desc,
      duration:      s.duration,
      price:         s.price,
      originalPrice: s.originalPrice,
      icon:          s.icon,
      order:         s.order,
      isSoldOut:     false,
      isPopular:     s.order === 1,
    });
  }

  // 3. Testimonials
  console.log("\n💬  Testimonials");
  for (const [i, t] of testimonials.entries()) {
    await upsert({
      _id:     slugId("testimonial", t.name.toLowerCase().replace(/[^a-z0-9]/g, "-")),
      _type:   "testimonial",
      name:    t.name,
      country: t.country,
      rating:  t.rating,
      text:    t.text,
      order:   i + 1,
    });
  }

  // 4. FAQs
  console.log("\n❓  FAQs");
  for (const [i, f] of faqs.entries()) {
    await upsert({
      _id:      `faq-${i + 1}`,
      _type:    "faq",
      question: f.question,
      answer:   f.answer,
      order:    f.order,
    });
  }

  console.log("\n✨  Migration complete! Open Sanity Studio and publish the documents.\n");
}

run().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
