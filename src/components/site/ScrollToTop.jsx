import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * -----------
 * React Router v6 does NOT reset scroll position on navigation.
 * This component listens to pathname changes and immediately
 * scrolls the window back to (0, 0) so every new page always
 * starts at the top — not wherever the previous page left off.
 *
 * Usage: render it ONCE, anywhere inside <BrowserRouter>, ideally
 * just above <Routes> in App.jsx. It renders nothing visible.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use "instant" so there is no visible scroll animation —
    // the new page simply appears at the top immediately.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
