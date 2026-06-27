import { useSiteSettings } from "@/lib/useSiteSettings";
import { OFFER_END_DATE } from "@/utils/constants";
import { useState, useEffect } from "react";

/**
 * useOfferActive()
 *
 * Returns `true` while the offer deadline is in the future,
 * `false` once it has passed.
 *
 * Single source of truth consumed by:
 *   - OfferTimer     — decides whether to show countdown or expired pill
 *   - ServiceCard    — decides whether to show originalPrice strikethrough
 *   - ServicesPage   — same
 *
 * Reactivate the offer any time by updating `offerDeadline` in
 * Sanity Studio → siteSettings — no code deploy needed.
 */
export function useOfferActive() {
  const { settings } = useSiteSettings();
  const deadline = settings?.offerDeadline ?? OFFER_END_DATE;

  const [active, setActive] = useState(() => new Date(deadline) > Date.now());

  useEffect(() => {
    // Sync immediately whenever deadline changes (e.g. Sanity live preview)
    setActive(new Date(deadline) > Date.now());

    // Re-check every second so the UI flips the moment the offer expires
    const id = setInterval(
      () => setActive(new Date(deadline) > Date.now()),
      1_000
    );
    return () => clearInterval(id);
  }, [deadline]);

  return active;
}
