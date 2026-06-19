import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scroll on mount and tears it down on unmount.
 *
 * Tuning guide:
 *   lerp            — interpolation factor each rAF tick.
 *                     0.05 = very slow/floaty (Awwwards-style)
 *                     0.12 = fast & silky (current setting)
 *                     0.20 = snappy, close to native
 *   wheelMultiplier — how far one wheel tick scrolls.
 *                     1.0 = default, 1.1 = slightly faster
 *   smoothTouch     — keep false; native touch scroll is already good on mobile.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
