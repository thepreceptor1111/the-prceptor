import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLenisContext } from '@/context/LenisContext';

export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    const lenis = new Lenis({
      // ─── SCROLL FREEZE FIX ───────────────────────────────────────────
      // autoResize: true in Lenis 1.3.x only observes document.documentElement
      // (the viewport). It does NOT fire when lazy React sections resolve and
      // grow document.body. The ResizeObserver on document.body below is the
      // real fix — it calls lenis.resize() on any content height change.
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

    // ─── BODY RESIZE OBSERVER ─────────────────────────────────────────
    // Watches document.body height directly. Fires whenever any content
    // grows the page — lazy Suspense resolves, images load, accordions
    // open. Ensures Lenis.limit always matches the real scrollable range.
    const bodyResizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    bodyResizeObserver.observe(document.body);

    // ─── RAF LOOP — deferred until page is interactive ────────────────
    //
    // PERF FIX: Previously the rAF loop started immediately on mount,
    // running concurrently with React hydration + JS parsing. This caused
    // ALL 20 long tasks in Lighthouse to be "Unattributable" (25s of
    // main-thread blocking) — the rAF tick was firing every ~16ms and
    // forcing style recalc + composite work on top of already-busy parsing.
    //
    // Fix: delay the first tick until window 'load' fires (all scripts
    // parsed, all lazy chunks evaluated). After that, the rAF loop runs
    // at full 60fps with nothing competing on the main thread.
    // Lenis is still CREATED now so context/refs are immediately available.
    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    function startRaf() {
      rafId = requestAnimationFrame(raf);
    }

    if (document.readyState === 'complete') {
      // Already loaded (e.g. HMR re-mount in dev) — start immediately
      startRaf();
    } else {
      // Page still loading — wait for all scripts + lazy chunks to finish
      window.addEventListener('load', startRaf, { once: true });
    }

    return () => {
      window.removeEventListener('load', startRaf);
      if (rafId) cancelAnimationFrame(rafId);
      bodyResizeObserver.disconnect();
      lenis.destroy();
      if (lenisRef) lenisRef.current = null;
    };
  }, []);
}
