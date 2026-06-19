/**
 * useSiteSettings — fetches the siteSettings singleton from Sanity.
 * Returns { settings, loading } where settings is the raw CMS object
 * (or null while loading / on error).
 */
import { useSanity } from '@/lib/useSanity';
import { SITE_SETTINGS_QUERY } from '@/lib/sanityQueries';

export function useSiteSettings() {
  const { data, loading } = useSanity(SITE_SETTINGS_QUERY, null);
  return { settings: data, loading };
}
