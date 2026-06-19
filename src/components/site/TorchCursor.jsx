import { useEffect, useRef } from "react";

export default function TorchCursor() {
  const overlayRef = useRef(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const SIZE  = 350;
    const INNER = "oklch(0.72 0.18 78 / 0.20)";
    const MID   = "oklch(0.55 0.14 75 / 0.18)";
    const OUTER = "oklch(0.34 0.10 65 / 0.08)";
    const EDGE  = "transparent";

    function render() {
      const { x, y } = posRef.current;
      el.style.background = [
        `radial-gradient(${SIZE}px circle at ${x}px ${y}px,`,
        `  ${INNER} 0%,`,
        `  ${MID}   25%,`,
        `  ${OUTER} 55%,`,
        `  ${EDGE}  72%)`,
      ].join("\n");
      rafRef.current = null;
    }

    function schedule() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    function onMouseMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        el.style.opacity = "1";
      }
      schedule();
    }

    function onTouchMove(e) {
      const t = e.touches[0];
      if (!t) return;
      posRef.current = { x: t.clientX, y: t.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        el.style.opacity = "1";
      }
      schedule();
    }

    function onMouseLeave() {
      activeRef.current = false;
      el.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.6s ease",
        mixBlendMode: "screen",
        willChange: "background",
      }}
    />
  );
}
