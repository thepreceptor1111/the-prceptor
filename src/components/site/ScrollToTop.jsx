import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenisContext } from "@/context/LenisContext";

/**
 * ScrollToTop
 * -----------
 * React Router v6 does NOT reset scroll position on navigation.
 * This component listens to pathname changes and jumps to the top
 * of the page on every route change — consistently, on all pages.
 *
 * ROOT CAUSE OF INCONSISTENCY:
 *   window.scrollTo() is intercepted by Lenis and silently ignored
 *   because Lenis manages its own internal scroll position. Any call
 *   to window.scrollTo while Lenis is active has no visible effect,
 *   which is why some pages appeared to load mid-scroll.
 *
 * FIX:
 *   Read the Lenis instance from LenisContext and call
 *   lenis.scrollTo(0, { immediate: true }) — this bypasses the
 *   browser scroll API and directly resets Lenis's internal position.
 *   Falls back to window.scrollTo for the brief window before Lenis
 *   mounts (e.g. first paint).
 *
 * Usage: rendered once in App.jsx, inside <BrowserRouter> and
 * <LenisProvider>, just above <Routes>. Renders nothing visible.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenisContext();

  useEffect(() => {
    const lenis = lenisRef?.current;

    if (lenis) {
      // immediate: true — snap to top with no scroll animation
      lenis.scrollTo(0, { immediate: true });
    } else {
      // Fallback: Lenis not yet initialised (first paint edge case)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, lenisRef]);

  return null;
}
