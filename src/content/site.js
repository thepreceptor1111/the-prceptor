// CMS-ready content configuration.
// Replace these constants with calls to your CMS (Sanity, Contentful, etc.) when ready.

export const siteConfig = {
  name: "The Preceptor",
  tagline: "Modern guidance, written in the stars.",
  description:
    "Cinematic, deeply personal astrology consultations for high-intention seekers — clarity in love, career, and life's defining chapters.",
  email: "hello@thepreceptor.com",
  social: {
    instagram: "https://instagram.com/thepreceptor",
    youtube: "https://youtube.com/@thepreceptor",
    linkedin: "https://linkedin.com/company/thepreceptor",
  },
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/qna", label: "Q&A" },
  { to: "/shop", label: "Shop" },
  { to: "/contact", label: "Contact" },
];

export const footerLinks = {
  explore: [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/qna", label: "Q&A" },
    { to: "/book", label: "Book a Session" },
    { to: "/shop", label: "Shop" },
  ],
  legal: [
    { to: "/privacy", label: "Privacy Policy" },
    { to: "/terms", label: "Terms & Conditions" },
    { to: "/contact", label: "Contact" },
  ],
};
