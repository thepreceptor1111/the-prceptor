import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ErrorBoundary from "./components/site/ErrorBoundary";
import Nav from "./components/site/Nav";
import Footer from "./components/site/Footer";
import TorchCursor from "./components/site/TorchCursor";
import ScrollToTop from "./components/site/ScrollToTop";
import AdminPortal from "./components/site/AdminPortal";
import { SITE } from "./content/seo";
import { useLenis } from "./hooks/useLenis";

// Home is imported eagerly — entry page, must never flash on first visit
import Home from "./routes/index";

const About        = lazy(() => import("./routes/about"));
const Book         = lazy(() => import("./routes/book"));
const Contact      = lazy(() => import("./routes/contact"));
const Services     = lazy(() => import("./routes/services"));
const Testimonials = lazy(() => import("./routes/testimonials"));
const Shop         = lazy(() => import("./routes/shop"));
const QnA          = lazy(() => import("./routes/qna"));
const Privacy      = lazy(() => import("./routes/privacy"));
const Terms        = lazy(() => import("./routes/terms"));
const NotFound     = lazy(() => import("./routes/not-found"));
const Admin        = lazy(() => import("./routes/admin"));

function CosmicLoader() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        color: "var(--color-gold, #c9a84c)",
      }}
      aria-label="Loading page"
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ fontSize: "2rem" }}
        aria-hidden="true"
      >
        ✦
      </motion.span>
      <span
        style={{
          fontSize: "0.75rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--color-muted-foreground, #6b6778)",
        }}
      >
        Loading
      </span>
    </div>
  );
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "The Preceptor",
  alternateName: "The Preceptor Global",
  url: SITE.domain,
  logo: `${SITE.domain}/favicon.svg`,
  image: SITE.ogImage,
  description:
    "Premium Vedic astrology consultations and spiritual guidance for high-intention seekers worldwide. Birth chart readings, career guidance, relationship synastry, tarot and Kundli analysis.",
  slogan: "For those who seek clarity.",
  email: SITE.email,
  priceRange: "$$",
  areaServed: "Worldwide",
  availableLanguage: [{ "@type": "Language", name: "English" }],
  serviceType: [
    "Vedic Astrology Reading",
    "Birth Chart Reading",
    "Relationship Synastry",
    "Career Guidance Astrology",
    "Tarot Reading",
    "Kundli Analysis",
    "Spiritual Consultation",
  ],
  sameAs: [SITE.social.instagram, SITE.social.reddit],
  currenciesAccepted: "USD, INR, GBP, EUR",
  paymentAccepted: "Online payment",
};

export default function App() {
  const location = useLocation();
  const isAdmin  = location.pathname.startsWith("/command-center");

  // Initialise Lenis smooth scroll — replaces CSS scroll-behavior: smooth
  useLenis();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(orgSchema)}
          </script>
        </Helmet>

        <div id="cosmic-bg"    aria-hidden="true" />
        <div id="cosmic-grain" aria-hidden="true" />

        <TorchCursor />
        <ScrollToTop />

        {/* Secret keyboard shortcut portal — Shift+Shift+P — invisible until triggered */}
        {!isAdmin && <AdminPortal />}

        {!isAdmin && <Nav />}

        <main className={isAdmin ? "flex-1" : "flex-1 pt-20"}>
          <Suspense fallback={<CosmicLoader />}>
            <Routes>
              <Route path="/"               element={<Home />} />
              <Route path="/about"          element={<About />} />
              <Route path="/book"           element={<Book />} />
              <Route path="/contact"        element={<Contact />} />
              <Route path="/services"       element={<Services />} />
              <Route path="/testimonials"   element={<Testimonials />} />
              <Route path="/shop"           element={<Shop />} />
              <Route path="/qna"            element={<QnA />} />
              <Route path="/privacy"        element={<Privacy />} />
              <Route path="/terms"          element={<Terms />} />
              <Route path="/command-center" element={<Admin />} />
              <Route path="*"               element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {!isAdmin && <Footer />}
      </div>
    </ErrorBoundary>
  );
}
