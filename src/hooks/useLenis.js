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
      // lerp: interpolation factor per frame (0–1).
      // 0.12 was too snappy — felt like brake + accelerate.
      // 0.08 gives longer inertia tail — buttery glide like Linear/Stripe.
      lerp: 0.08,

      // duration works with easing below. 1.4s total scroll animation.
      duration: 1.4,

      // Custom easing: slow start → fast middle → soft deceleration landing.
      // This is what makes scroll feel "cinematic" vs "mechanical".
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

      smoothWheel: true,
      smoothTouch: false,

      // wheelMultiplier: how far each wheel tick scrolls.
      // 1.1 was overshooting — caused the jerky feeling.
      // 0.9 is gentler per tick, the easing curve handles the glide.
      wheelMultiplier: 0.9,

      // touchMultiplier: mobile swipe distance per pixel of finger movement.
      // 1.8 feels natural on mobile — not too slow, not too fast.
      touchMultiplier: 1.8,

      infinite: false,
    });

    if (lenisRef) lenisRef.current = lenis;

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
