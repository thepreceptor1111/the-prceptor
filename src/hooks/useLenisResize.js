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
 *
 * Note: the ResizeObserver on document.body in useLenis.js also covers
 * this automatically — this hook is a belt-and-suspenders backup.
 */
export function useLenisResize() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef?.current?.resize();
    });
    return () => cancelAnimationFrame(id);
  }, []);
}
