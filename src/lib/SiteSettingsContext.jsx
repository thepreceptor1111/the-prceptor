/**
 * SiteSettingsContext — fetches siteSettings ONCE at app root.
 * Every component calls useSiteSettings() and reads from this context.
 *
 * Key fix: context value is memoised so its object reference only
 * changes when data/loading actually change — prevents all lazy-loaded
 * section consumers from re-rendering on every SiteSettingsProvider tick.
 */
import { createContext, useContext, useMemo } from 'react';
import { useSanity } from '@/lib/useSanity';
import { SITE_SETTINGS_QUERY } from '@/lib/sanityQueries';

// Stable default — lazy chunks that read context before Provider mounts
// (e.g. during SSR or extreme edge cases) get a safe empty object,
// not null/undefined, so optional chaining still works.
const DEFAULT_VALUE = { settings: null, loading: false };

const SiteSettingsContext = createContext(DEFAULT_VALUE);

export function SiteSettingsProvider({ children }) {
  const { data, loading } = useSanity(SITE_SETTINGS_QUERY, null);

  // Memoised — new object reference ONLY when data or loading changes.
  // This stops all context consumers re-rendering on unrelated renders.
  const value = useMemo(
    () => ({ settings: data, loading }),
    [data, loading]
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
