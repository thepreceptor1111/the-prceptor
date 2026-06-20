// Plain tagged-template literals work fine for GROQ — no extra package needed.
// The groq tag only provides syntax highlighting in editors; it is not required at runtime.

const groq = (strings, ...values) =>
  strings.reduce((acc, str, i) => acc + str + (values[i] ?? ""), "");

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
// There are two siteSettings documents in the dataset — the correct one
// has _id == "siteSettings" (created by the Studio singleton setup).
// The old empty document (cd046535...) was created first and would always
// be returned by *[_type == "siteSettings"][0], causing all fields to be null.
export const SITE_SETTINGS_QUERY = groq`
  *[_id == "siteSettings"][0]
`;
