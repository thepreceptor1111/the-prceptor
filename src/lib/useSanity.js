/**
 * useSanity — generic React hook for fetching from Sanity.
 *
 * Features:
 *  - 5-minute TTL cache: same query is not re-fetched within 5 min,
 *    but WILL re-fetch after that so fresh Sanity publishes always show up.
 *  - Never throws — always falls back to `fallback` on error
 *  - Shows `loading: true` only on first fetch (avoids layout shift on refetch)
 *  - Exposes `fromCMS: boolean` so components can show a subtle indicator
 *
 * Usage:
 *   const { data, loading } = useSanity(SERVICES_QUERY, FALLBACK_SERVICES);
 */
import { useState, useEffect } from 'react';
import { safeFetch } from './sanityClient';

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
    // Valid non-stale cache — skip the network.
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
