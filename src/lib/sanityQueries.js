// Plain tagged-template literals work fine for GROQ — no extra package needed.
const groq = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");

// ─────────────────────────────────────────────────────────────────────────────
// FIX 5: Batch all 4 homepage queries into ONE network round-trip.
// Previously each section (Services, Testimonials, FAQs, SiteSettings) made
// its own fetch + CORS preflight = 4 × (preflight + fetch) = ~800ms wasted.
// This single GROQ query returns everything the home page needs in one request,
// eliminating 3 extra preflights and 3 extra round-trips (~400ms saved).
// ─────────────────────────────────────────────────────────────────────────────
export const HOME_PAGE_QUERY = groq`
  {
    "siteSettings": *[_id == "siteSettings"][0],
    "services": *[_type == "service"] | order(order asc) {
      _id,
      title,
      slug,
      tagline,
      description,
      icon,
      price,
      originalPrice,
      sessionDuration,
      deliveryFormat,
      isPopular,
      isSoldOut,
      features,
      sessionTier,
      order
    },
    "testimonials": *[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt asc) {
      _id,
      name,
      "location": coalesce(location, country),
      "review":   coalesce(review, text),
      rating,
      service,
      avatarInitial,
      featured,
      screenshotImage {
        asset->{ url },
        alt
      }
    },
    "faqs": *[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order
    }
  }
`;

// ─── Individual queries kept for non-home pages (Services page, Q&A page, etc.) ──
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(coalesce(order, 9999) asc, _createdAt asc) {
    _id,
    name,
    "location": coalesce(location, country),
    "review":   coalesce(review, text),
    rating,
    service,
    avatarInitial,
    featured,
    screenshotImage {
      asset->{ url },
      alt
    }
  }
`;

export const SERVICES_QUERY = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    tagline,
    description,
    icon,
    price,
    originalPrice,
    sessionDuration,
    deliveryFormat,
    isPopular,
    isSoldOut,
    features,
    sessionTier,
    order
  }
`;

export const FAQ_QUERY = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

// IMPORTANT: Query by _id == "siteSettings" not _type.
export const SITE_SETTINGS_QUERY = groq`
  *[_id == "siteSettings"][0]
`;
