import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLenisContext } from '@/context/LenisContext';

export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    const lenis = new Lenis({
      // ─── SCROLL FREEZE FIX ───────────────────────────────────────────
      // autoResize: true in Lenis 1.3.x only observes the wrapper element
      // (document.documentElement when wrapper=window). It fires on viewport
      // resize — NOT on content height growth from lazy sections resolving.
      // The ResizeObserver on document.body below is the real fix for that.
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

    // DIAGNOSTIC — confirms Lenis init state and initial limit
    console.log(
      '[useLenis] ✅ Lenis initialized.',
      '| Initial limit:', lenis.limit,
      '| scrollHeight:', document.body.scrollHeight,
      '| lenisRef.current set:', !!lenisRef?.current
    );

    // ─── THE ACTUAL FIX ──────────────────────────────────────────────
    // autoResize: true does NOT catch lazy React sections growing the page
    // height after mount (it only watches viewport resize). We observe
    // document.body directly — this fires any time content height changes:
    // lazy Suspense resolves, image loads, accordion opens, anything.
    const bodyResizeObserver = new ResizeObserver(() => {
      const limitBefore = lenis.limit;
      lenis.resize();
      // DIAGNOSTIC — shows ResizeObserver firing and limit updating in real time
      console.log(
        '[useLenis] 📐 body ResizeObserver fired — lenis.resize() called.',
        '| limit BEFORE:', limitBefore,
        '| limit AFTER:', lenis.limit,
        '| scrollHeight:', document.body.scrollHeight
      );
    });
    bodyResizeObserver.observe(document.body);

    // ─── RAF LOOP ────────────────────────────────────────────────────
    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      bodyResizeObserver.disconnect();
      lenis.destroy();
      if (lenisRef) lenisRef.current = null;
    };
  }, []);
}
