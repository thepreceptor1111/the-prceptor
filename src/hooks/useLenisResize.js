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
 * PERF FIX: Guard the rAF behind readyState. During initial page load,
 * firing an rAF from every section component adds competing work on top
 * of script parsing and React hydration. If the page is still loading,
 * wait for 'load' before calling resize — by then Lenis will have started
 * its own loop anyway and the body ResizeObserver will handle it.
 */
export function useLenisResize() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    let id = null;

    function doResize() {
      id = requestAnimationFrame(() => {
        lenisRef?.current?.resize();
      });
    }

    if (document.readyState === 'complete') {
      // Page fully loaded — safe to resize immediately
      doResize();
    } else {
      // Still loading — defer until load so we don't compete with parsing
      window.addEventListener('load', doResize, { once: true });
    }

    return () => {
      window.removeEventListener('load', doResize);
      if (id !== null) cancelAnimationFrame(id);
    };
  }, []);
}
