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
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      token,
      // IMPORTANT: useCdn MUST be false when a token is present.
      // Sanity's CDN (cdn.sanity.io) strips auth headers — the token
      // never reaches the API, so every authenticated fetch silently
      // fails and safeFetch returns the fallback (static) data.
      // With useCdn:false, requests go directly to api.sanity.io
      // where the Authorization header is honoured correctly.
      useCdn: false,
      apiVersion: '2024-01-01',
      perspective: 'published',
      // FIX 6: ignoreBrowserTokenWarning suppresses the noisy console
      // warning about using a token in the browser. The token is
      // read-only (Viewer role) so there is no security concern.
      // The duplicate OPTIONS preflights are standard CORS browser
      // behaviour for cross-origin requests with Authorization headers
      // and cannot be eliminated in JS — but adding preconnect in
      // index.html (Fix 4) removes the DNS/TCP cost from those preflights.
      ignoreBrowserTokenWarning: true,
    })
  : null;

/**
 * Safe fetch helper — always resolves, never throws.
 */
export async function safeFetch(query, fallback) {
  if (!sanityClient) {
    console.warn('[Sanity] client not initialised — VITE_SANITY_PROJECT_ID missing. Using fallback data.');
    return fallback;
  }
  try {
    const result = await sanityClient.fetch(query);
    if (result === null || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (err) {
    console.warn('[Sanity] fetch error — using fallback data', err.message);
    return fallback;
  }
}
