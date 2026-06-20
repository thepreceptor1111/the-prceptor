/**
 * SiteSettingsContext — fetches siteSettings ONCE at app root.
 * Every component calls useSiteSettings() and reads from this context.
 * Eliminates the duplicate Sanity requests that were firing per-section.
 */
import { createContext, useContext } from 'react';
import { useSanity } from '@/lib/useSanity';
import { SITE_SETTINGS_QUERY } from '@/lib/sanityQueries';

const SiteSettingsContext = createContext(null);

export function SiteSettingsProvider({ children }) {
  const { data, loading } = useSanity(SITE_SETTINGS_QUERY, null);
  return (
    <SiteSettingsContext.Provider value={{ settings: data, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
