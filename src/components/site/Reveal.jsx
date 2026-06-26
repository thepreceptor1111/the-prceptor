import { useEffect, useRef, useState } from 'react';

/**
 * Reveal — fade-in-up on scroll into view.
 * Uses IntersectionObserver + CSS transition only.
 * NO framer-motion dependency — keeps motion bundle out of critical path.
 */
export function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
      onWheel={(e) => {
        // DIAGNOSTIC — is this invisible Reveal div intercepting wheel events?
        // If you see these logs while the page is FROZEN and [FaqSection] logs
        // are SILENT, this div is confirmed as the scroll trap.
        if (!visible) {
          console.warn(
            '[Reveal] 🚨 INVISIBLE div received wheel event — SCROLL TRAP CONFIRMED.',
            '| visible:', visible,
            '| scrollY:', window.scrollY,
            '| defaultPrevented:', e.defaultPrevented,
            '| element rect:', ref.current?.getBoundingClientRect()
          );
        } else {
          console.log(
            '[Reveal] ✅ visible div received wheel event (normal).',
            '| scrollY:', window.scrollY
          );
        }
      }}
    >
      {children}
    </div>
  );
}

export default Reveal;
