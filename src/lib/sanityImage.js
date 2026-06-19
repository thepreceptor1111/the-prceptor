/**
 * sanityImage — build an optimised Sanity CDN image URL.
 *
 * Sanity's image pipeline supports free transforms via query params:
 *   ?w=   — resize to max width (keeps aspect ratio)
 *   ?q=   — JPEG/WebP quality 0-100
 *   ?auto=format — serve WebP/AVIF to browsers that support it
 *   ?fit=max — never upscale
 *
 * Usage:
 *   sanityImage(url, { w: 900, q: 80 })
 *   => "https://cdn.sanity.io/.../image.jpg?w=900&q=80&auto=format&fit=max"
 */
export function sanityImage(url, { w = 900, q = 80 } = {}) {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set('w', String(w));
    u.searchParams.set('q', String(q));
    u.searchParams.set('auto', 'format');   // WebP / AVIF auto-negotiation
    u.searchParams.set('fit', 'max');       // never upscale
    return u.toString();
  } catch {
    return url; // fallback: return as-is if URL is malformed
  }
}

/** Preload an image URL into the browser cache (fire-and-forget). */
export function preloadImage(url) {
  if (!url || typeof window === 'undefined') return;
  const img = new window.Image();
  img.src = url;
}
