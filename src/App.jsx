import React, { lazy, Suspense, useState, useEffect, useTransition } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ErrorBoundary from "./components/site/ErrorBoundary";
import ScrollToTop from "./components/site/ScrollToTop";
import { SITE } from "./content/seo";
import { useLenis } from "./hooks/useLenis";
import { SiteSettingsProvider } from "./lib/SiteSettingsContext";
import { LenisProvider } from "./context/LenisContext";

// ── Critical-path: lazy-load ALL heavy shell components ───────────────────────
// Nav, Footer, TorchCursor and AdminPortal were previously eager imports.
// Each one (especially Nav → framer-motion 114KB gzip) was blocking the first
// paint. Lazy-loading them lets the route content paint immediately.
const Nav         = lazy(() => import("./components/site/Nav"));
const Footer      = lazy(() => import("./components/site/Footer"));
const TorchCursor = lazy(() => import("./components/site/TorchCursor"));
const AdminPortal = lazy(() => import("./components/site/AdminPortal"));

// ── Route-level code splitting ────────────────────────────────────────────────
const Home         = lazy(() => import("./routes/index"));
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

// ── Minimal inline skeleton shown while route JS loads ────────────────────────
// Rendered immediately from the initial bundle — zero extra dependencies.
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
      <span
        aria-hidden="true"
        style={{
          fontSize: "2rem",
          display: "inline-block",
          animation: "cosmicPulse 1.8s ease-in-out infinite",
        }}
      >
        ✦
      </span>
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
      <style>{`
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50%       { opacity: 1;   transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

// ── Null shell: used as Suspense fallback for decorative components ────────────
// TorchCursor/AdminPortal are non-blocking UI niceties — show nothing while
// they load rather than a spinner.
const NullShell = () => null;

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

// Inner component so useLenis can access LenisContext
function AppInner() {
  const location = useLocation();
  const isAdmin  = location.pathname.startsWith("/command-center");
  const isHome   = location.pathname === "/";

  // ── Deferred shell mount ────────────────────────────────────────────────────
  // shellReady flips to true after the first paint (via useEffect).
  // This ensures Nav/Footer/TorchCursor/AdminPortal lazy chunks are only
  // requested AFTER the route content has started rendering, keeping them
  // off the critical path entirely.
  const [shellReady, setShellReady] = useState(false);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Schedule shell mount as a low-priority transition — React 18 will
    // yield to the browser paint before processing this update.
    startTransition(() => setShellReady(true));
  }, []);

  useLenis();

  return (
    <ErrorBoundary>
      <SiteSettingsProvider>
        <div className="min-h-screen flex flex-col">
          <Helmet>
            <script type="application/ld+json">
              {JSON.stringify(orgSchema)}
            </script>
          </Helmet>

          <div id="cosmic-bg"    aria-hidden="true" />
          <div id="cosmic-grain" aria-hidden="true" />

          {/*
            Decorative chrome — loaded only after first paint.
            TorchCursor and AdminPortal are non-critical; NullShell
            fallback means zero layout shift while they load.
          */}
          {shellReady && (
            <>
              <Suspense fallback={<NullShell />}>
                <TorchCursor />
              </Suspense>
              <ScrollToTop />
              {!isAdmin && (
                <Suspense fallback={<NullShell />}>
                  <AdminPortal />
                </Suspense>
              )}
            </>
          )}

          {/*
            Nav: deferred but shown immediately via Suspense.
            The fallback is a minimal height-placeholder that reserves
            the 80px header space so content doesn't jump when Nav mounts.
          */}
          {!isAdmin && (
            <Suspense
              fallback={
                <div
                  style={{ height: "80px", flexShrink: 0 }}
                  aria-hidden="true"
                />
              }
            >
              <Nav />
            </Suspense>
          )}

          <main className={isAdmin ? "flex-1" : isHome ? "flex-1" : "flex-1 pt-20"}>
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

          {!isAdmin && (
            <Suspense fallback={<NullShell />}>
              <Footer />
            </Suspense>
          )}
        </div>
      </SiteSettingsProvider>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <LenisProvider>
      <AppInner />
    </LenisProvider>
  );
}
