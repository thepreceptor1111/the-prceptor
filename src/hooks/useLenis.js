import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLenisContext } from '@/context/LenisContext';

/**
 * Initialises Lenis smooth scroll and stores the instance in LenisContext
 * so lazy-loaded sections can call lenis.resize() after their content mounts.
 *
 * Root-cause fix for scroll freeze:
 * Lenis caches document.scrollHeight on init. Lazy Suspense sections replace
 * 400px placeholders with real content AFTER init — scrollHeight grows but
 * Lenis never recalculates. Each lazy section calls useLenisResize() on mount
 * to trigger lenis.resize() and correct the cached height.
 */
export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Store instance in context ref so lazy sections can call resize()
    if (lenisRef) lenisRef.current = lenis;

    let innerRafId = null;

    function raf(time) {
      lenis.raf(time);
      innerRafId = requestAnimationFrame(raf);
    }

    innerRafId = requestAnimationFrame(raf);

    return () => {
      if (innerRafId) cancelAnimationFrame(innerRafId);
      lenis.destroy();
      if (lenisRef) lenisRef.current = null;
    };
  }, []);
}
