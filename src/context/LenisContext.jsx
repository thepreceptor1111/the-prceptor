import { createContext, useContext, useRef } from 'react';

/**
 * LenisContext
 * Provides the Lenis instance to any component in the tree.
 * Used by lazy-loaded sections to call lenis.resize() after mount,
 * so Lenis recalculates document.scrollHeight when real content
 * replaces Suspense placeholders.
 */
export const LenisContext = createContext(null);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);

  // DIAGNOSTIC — confirms when the context ref object is created
  console.log('[LenisContext] context ref created — lenisRef.current is:', lenisRef.current);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

/** Returns the mutable ref — set .current in useLenis, read in useLenisResize */
export function useLenisContext() {
  return useContext(LenisContext);
}
