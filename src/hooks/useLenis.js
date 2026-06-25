import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initialises Lenis smooth scroll on mount and tears it down on unmount.
 *
 * Bug fix: the previous implementation only cancelled the outer rafId.
 * The inner requestAnimationFrame call inside raf() was never cancelled,
 * so every remount (React strict mode, hot reload) spawned an orphaned
 * RAF loop that fought the new one — causing scroll stutter and bounce.
 *
 * Fix: track innerRafId and cancel it in the cleanup function alongside
 * the outer rafId and lenis.destroy().
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

    let innerRafId = null;

    function raf(time) {
      lenis.raf(time);
      innerRafId = requestAnimationFrame(raf);
    }

    innerRafId = requestAnimationFrame(raf);

    return () => {
      // Cancel both the current scheduled frame AND the lenis instance.
      // Without cancelling innerRafId the loop keeps running after unmount.
      if (innerRafId) cancelAnimationFrame(innerRafId);
      lenis.destroy();
    };
  }, []);
}
