import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLenisContext } from '@/context/LenisContext';

export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    const lenis = new Lenis({
      // ─── SCROLL FREEZE FIX ───────────────────────────────────────────
      // autoResize: true attaches Lenis's own ResizeObserver to the scroll
      // container. Any time the DOM height changes (lazy section resolves,
      // accordion opens, image loads) Lenis automatically recalculates its
      // cached scrollHeight. Eliminates the hard ceiling at scrollY 5888.
      autoResize: true,

      // ─── SMOOTHNESS TUNING ───────────────────────────────────────────
      lerp: 0.08,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
      infinite: false,
    });

    if (lenisRef) lenisRef.current = lenis;

    // DIAGNOSTIC — log Lenis init state immediately after creation
    console.log(
      '[useLenis] ✅ Lenis initialized.',
      '| Initial limit:', lenis.limit,
      '| scrollHeight:', document.body.scrollHeight,
      '| lenisRef.current set:', !!lenisRef?.current
    );

    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.destroy();
      if (lenisRef) lenisRef.current = null;
    };
  }, []);
}
