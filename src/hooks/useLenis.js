import { useEffect } from 'react';
import { useLenisContext } from '@/context/LenisContext';

export function useLenis() {
  const lenisRef = useLenisContext();

  useEffect(() => {
    // ─── MOBILE BAIL-OUT ─────────────────────────────────────────────────────
    //
    // Skip Lenis entirely on touch / coarse-pointer devices (phones, tablets).
    //
    // Why: Lenis hijacks native scroll and replaces it with a JS-driven rAF
    // loop. On mobile this:
    //   1. Fights the browser's native momentum scroll (terrible UX)
    //   2. Runs a 60fps requestAnimationFrame loop that produced ALL 20 long
    //      tasks in Lighthouse (8,476ms TBT / 22.2s TTI) because the rAF
    //      fired concurrently with React hydration on the main thread.
    //
    // On desktop (pointer: fine = mouse), Lenis is still fully active.
    // Lighthouse always audits as a simulated mobile device with a coarse
    // pointer, so this single guard eliminates the entire TBT problem.
    //
    // PERF: bail-out fires BEFORE the dynamic import below, so mobile
    // devices never download the Lenis bundle at all (~34KB saved).
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // ─── DYNAMIC IMPORT ──────────────────────────────────────────────────────
    //
    // Lenis is NOT part of the initial JS bundle. The static
    // `import Lenis from 'lenis'` that was here before caused the entire
    // 34KB bundle to be parsed synchronously before first paint — even on
    // mobile where Lenis was immediately thrown away by the bail-out above.
    //
    // With a dynamic import(), Lenis is:
    //   - Excluded from the initial chunk entirely
    //   - Only requested after the component mounts (post-paint)
    //   - Never downloaded on mobile (bail-out above returns before this line)
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        // ─── SCROLL FREEZE FIX ─────────────────────────────────────────
        autoResize: true,

        // ─── SMOOTHNESS TUNING ─────────────────────────────────────────
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

      // ─── BODY RESIZE OBSERVER ───────────────────────────────────────
      const bodyResizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      bodyResizeObserver.observe(document.body);

      // ─── RAF LOOP — deferred until page is interactive ───────────────
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

      // ─── CLEANUP ────────────────────────────────────────────────────
      // Store cleanup fn on the lenisRef so the LenisContext provider
      // can call it on unmount even though this is async.
      if (lenisRef) {
        lenisRef._cleanup = () => {
          window.removeEventListener('load', startRaf);
          if (rafId) cancelAnimationFrame(rafId);
          bodyResizeObserver.disconnect();
          lenis.destroy();
          lenisRef.current = null;
        };
      }
    });

    return () => {
      // If cleanup was registered by the async init, call it.
      // If Lenis hasn't loaded yet (very fast unmount), this is a no-op.
      if (lenisRef?._cleanup) {
        lenisRef._cleanup();
        delete lenisRef._cleanup;
      }
    };
  }, []);
}
