/**
 * Sanity CMS — lightweight read-only client.
 *
 * All three values come from environment variables so the token
 * is never committed to the repository.
 *
 * Local:      .env.local  (git-ignored)
 * Production: set in Vercel → Settings → Environment Variables
 *
 * Required env vars:
 *   VITE_SANITY_PROJECT_ID  — e.g. 9w7fo0ix
 *   VITE_SANITY_DATASET     — e.g. production
 *   VITE_SANITY_TOKEN       — Viewer (read-only) token from sanity.io/manage
 */
import { createClient } from '@sanity/client';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset   = import.meta.env.VITE_SANITY_DATASET ?? 'production';
const token     = import.meta.env.VITE_SANITY_TOKEN;

// Only create the client if the project ID is present.
// This prevents the app from crashing in environments where
// the env vars have not been set yet.
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      token,
      useCdn: true,        // use Sanity's CDN for fast cached reads
      apiVersion: '2024-01-01',
    })
  : null;

/**
 * Safe fetch helper — always resolves, never throws.
 *
 * Usage:
 *   const data = await safeFetch(SERVICES_QUERY, fallbackData);
 *
 * @param {string}  query    - GROQ query string
 * @param {*}       fallback - value returned if client is missing or fetch fails
 * @returns {Promise<*>}
 */
export async function safeFetch(query, fallback) {
  if (!sanityClient) {
    console.warn('[Sanity] client not initialised — VITE_SANITY_PROJECT_ID missing. Using fallback data.');
    return fallback;
  }
  try {
    const result = await sanityClient.fetch(query);
    // Sanity returns null/empty array when a document type has no documents yet.
    // Treat that the same as a missing result and use the fallback.
    if (result === null || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (err) {
    console.warn('[Sanity] fetch error — using fallback data', err.message);
    return fallback;
  }
}
