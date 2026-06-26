import { useEffect } from 'react';
import { useLenisContext } from '@/context/LenisContext';

/**
 * useLenisResize
 * Call this at the top of every lazy-loaded section component.
 *
 * When a Suspense boundary resolves, the section's real content replaces
 * a minHeight:400px placeholder. document.scrollHeight grows, but Lenis
 * still has the old cached value — causing scroll to freeze at that point.
 *
 * This hook calls lenis.resize() after the section mounts + after the
 * next paint (rAF) so Lenis always has the correct scroll range.
 */
export function useLenisResize() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    // rAF ensures the DOM has fully painted before we measure
    const id = requestAnimationFrame(() => {
      const lenis = lenisRef?.current;

      // DIAGNOSTIC — is lenisRef.current populated when resize() is called?
      if (!lenis) {
        console.warn(
          '[useLenisResize] ❌ lenisRef.current is NULL — resize() was SKIPPED.',
          'Race condition confirmed: Lenis useEffect has not run yet when this section mounted.',
          '| scrollHeight at this moment:', document.body.scrollHeight
        );
      } else {
        const limitBefore = lenis.limit;
        lenis.resize();
        console.log(
          '[useLenisResize] ✅ resize() called successfully.',
          '| limit BEFORE:', limitBefore,
          '| limit AFTER:', lenis.limit,
          '| scrollHeight:', document.body.scrollHeight,
          '| limit matches scrollHeight - viewport?', lenis.limit === document.body.scrollHeight - window.innerHeight
        );
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);
}
