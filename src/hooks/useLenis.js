import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLenisContext } from '@/context/LenisContext';

export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    // ─── MOBILE BAIL-OUT ────────────────────────────────────────────────────────────────────
    //
    // Skip Lenis entirely on touch / coarse-pointer devices (phones, tablets).
    //
    // Why: Lenis hijacks native scroll and replaces it with a JS-driven rAF
    // loop. On mobile this:
    //   1. Fights the browser’s native momentum scroll (terrible UX)
    //   2. Runs a 60fps requestAnimationFrame loop that produced ALL 20 long
    //      tasks in Lighthouse (8,476ms TBT / 22.2s TTI) because the rAF
    //      fired concurrently with React hydration on the main thread.
    //
    // On desktop (pointer: fine = mouse), Lenis is still fully active.
    // Lighthouse always audits as a simulated mobile device with a coarse
    // pointer, so this single guard eliminates the entire TBT problem.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lenis = new Lenis({
      // ─── SCROLL FREEZE FIX ───────────────────────────────────────────
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
    const bodyResizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    bodyResizeObserver.observe(document.body);

    // ─── RAF LOOP — deferred until page is interactive ────────────────
    //
    // PERF FIX: delay the first tick until window 'load' fires (all scripts
    // parsed, all lazy chunks evaluated). After that, the rAF loop runs
    // at full 60fps with nothing competing on the main thread.
    let rafId = null;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    function startRaf() {
      rafId = requestAnimationFrame(raf);
    }

    if (document.readyState === 'complete') {
      startRaf();
    } else {
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
