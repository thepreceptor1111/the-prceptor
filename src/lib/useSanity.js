/**
 * useSanity — generic React hook for fetching from Sanity.
 *
 * Features:
 *  - Module-level in-memory cache: same query is NEVER re-fetched within
 *    the same browser session. Instant on back-navigation.
 *  - Never throws — always falls back to `fallback` on error
 *  - Shows `loading: true` only on first fetch (avoids layout shift on refetch)
 *  - Exposes `fromCMS: boolean` so components can show a subtle indicator
 *
 * Usage:
 *   const { data, loading } = useSanity(SERVICES_QUERY, FALLBACK_SERVICES);
 */
import { useState, useEffect } from 'react';
import { safeFetch } from './sanityClient';

// Module-level cache — survives re-renders and page navigations within the SPA.
// Key: query string  Value: { data, fromCMS }
const QUERY_CACHE = new Map();

export function useSanity(query, fallback) {
  // Seed state from cache immediately so there is ZERO loading flash on
  // back-navigation or when the same query is used on multiple pages.
  const cached = QUERY_CACHE.get(query);

  const [data, setData]       = useState(cached?.data ?? fallback);
  const [loading, setLoading] = useState(!cached);   // already cached → no loading
  const [fromCMS, setFromCMS] = useState(cached?.fromCMS ?? false);

  useEffect(() => {
    // Already have a cached result — skip the network entirely.
    if (QUERY_CACHE.has(query)) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      const result = await safeFetch(query, fallback);
      if (!cancelled) {
        const isCMS = result !== fallback;
        QUERY_CACHE.set(query, { data: result, fromCMS: isCMS });
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
