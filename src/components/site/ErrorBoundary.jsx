import React from "react";
import { motion } from "framer-motion";

/**
 * ErrorBoundary — catches unhandled React render errors.
 *
 * Wrap the app root with this component. If any child component
 * throws during render, this shows a premium fallback screen
 * instead of a blank page.
 *
 * Usage (in main.jsx or App.jsx):
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log to console for debugging — replace with Sentry/LogRocket later
    console.error("[ErrorBoundary] Uncaught error:", error);
    console.error("[ErrorBoundary] Component stack:", info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg, #0a0a0f)",
          color: "var(--color-foreground, #e8e0d0)",
          fontFamily: "var(--font-sans, sans-serif)",
          textAlign: "center",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cosmic background gradient */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.28 0.10 255 / 0.30), transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
          {/* Animated gold star */}
          <motion.span
            animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
            style={{
              display: "block",
              fontSize: "3.5rem",
              marginBottom: "1.5rem",
              color: "var(--color-gold, #c9a84c)",
            }}
          >
            ✦
          </motion.span>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-serif, serif)",
              fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
              fontWeight: 400,
              marginBottom: "1rem",
              color: "var(--color-foreground, #e8e0d0)",
            }}
          >
            Something went wrong.
          </h1>

          {/* Description */}
          <p
            style={{
              color: "var(--color-muted-foreground, #9a9080)",
              fontSize: "1rem",
              lineHeight: 1.7,
              marginBottom: "2.5rem",
              maxWidth: "38ch",
              marginInline: "auto",
            }}
          >
            An unexpected error occurred. Try refreshing — if the problem
            persists, please reach out at{" "}
            <a
              href="mailto:thepreceptor1111@gmail.com"
              style={{ color: "var(--color-gold, #c9a84c)", textDecoration: "none" }}
            >
              thepreceptor1111@gmail.com
            </a>
            .
          </p>

          {/* CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              onClick={this.handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                background: "var(--color-primary, oklch(0.55 0.18 85))",
                color: "var(--color-primary-foreground, #0a0a0f)",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: "0.9rem",
                fontWeight: 500,
              }}
            >
              ↺ Try Again
            </button>

            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "1px solid var(--color-gold, #c9a84c)",
                color: "var(--color-gold, #c9a84c)",
                textDecoration: "none",
                fontSize: "0.9rem",
                fontWeight: 500,
                fontFamily: "var(--font-sans, sans-serif)",
              }}
            >
              ⌂ Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
