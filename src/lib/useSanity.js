/**
 * useSanity — generic React hook for fetching from Sanity.
 *
 * Features:
 *  - 5-minute TTL cache: same query is not re-fetched within 5 min
 *  - Never throws — always falls back to `fallback` on error
 *  - Shows `loading: true` only on first fetch (avoids layout shift on refetch)
 *  - Exposes `fromCMS: boolean` so components can show a subtle indicator
 *
 * FIX 5: useHomePageData — fetches ALL home-page data in ONE Sanity request,
 * eliminating 3 extra CORS preflights and ~400ms of serial round-trips.
 */
import { useState, useEffect } from 'react';
import { safeFetch } from './sanityClient';
import { HOME_PAGE_QUERY } from './sanityQueries';

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

// Module-level cache — { data, fromCMS, fetchedAt }
const QUERY_CACHE = new Map();

function getCached(query) {
  const entry = QUERY_CACHE.get(query);
  if (!entry) return null;
  const isStale = Date.now() - entry.fetchedAt > CACHE_TTL_MS;
  if (isStale) {
    QUERY_CACHE.delete(query);
    return null;
  }
  return entry;
}

export function useSanity(query, fallback) {
  const cached = getCached(query);

  const [data, setData]       = useState(cached?.data ?? fallback);
  const [loading, setLoading] = useState(!cached);
  const [fromCMS, setFromCMS] = useState(cached?.fromCMS ?? false);

  useEffect(() => {
    if (getCached(query)) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      const result = await safeFetch(query, fallback);
      if (!cancelled) {
        const isCMS = result !== fallback;
        QUERY_CACHE.set(query, { data: result, fromCMS: isCMS, fetchedAt: Date.now() });
        setData(result);
        setFromCMS(isCMS);
        setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { data, loading, fromCMS };
}

/**
 * useHomePageData — batched hook for the home route.
 *
 * Returns { services, testimonials, faqs, siteSettings, loading } in one fetch
 * instead of 4 separate useSanity calls. This collapses 4 CORS preflights and
 * 4 sequential Sanity round-trips into a single parallel request.
 *
 * Fallback values are passed in so the page renders immediately with static data
 * while Sanity loads, preventing a blank flash.
 */
export function useHomePageData({ fallbackServices, fallbackTestimonials, fallbackFaqs, fallbackSettings } = {}) {
  const fallback = {
    services:     fallbackServices     ?? [],
    testimonials: fallbackTestimonials ?? [],
    faqs:         fallbackFaqs         ?? [],
    siteSettings: fallbackSettings     ?? null,
  };

  const { data, loading, fromCMS } = useSanity(HOME_PAGE_QUERY, fallback);

  return {
    services:     data?.services     ?? fallback.services,
    testimonials: data?.testimonials ?? fallback.testimonials,
    faqs:         data?.faqs         ?? fallback.faqs,
    siteSettings: data?.siteSettings ?? fallback.siteSettings,
    loading,
    fromCMS,
  };
}
