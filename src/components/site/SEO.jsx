/**
 * src/components/site/SEO.jsx
 * Reusable SEO head component with JSON-LD structured data support.
 */
import { Helmet } from "react-helmet-async";
import { SITE } from "@/content/seo";

export default function SEO({
  title       = SITE.name,
  description = SITE.description,
  canonical   = SITE.domain,
  ogImage     = SITE.ogImage,
  ogType      = "website",
  robots      = "index, follow",
  keywords    = "",
  schema      = null,
}) {
  const fullTitle = title.includes(SITE.name) ? title : `${title} — ${SITE.name}`;

  return (
    <Helmet>
      {/* ── Primary ──────────────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"    content={description} />
      <meta name="robots"         content={robots} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical"       href={canonical} />

      {/* ── Open Graph ─────────────────────────────────── */}
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt"   content={`${SITE.name} — ${SITE.tagline}`} />
      <meta property="og:site_name"   content={SITE.name} />
      <meta property="og:locale"      content="en_US" />

      {/* ── Twitter / X Card ────────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={SITE.twitterHandle} />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
      <meta name="twitter:image:alt"   content={`${SITE.name} — ${SITE.tagline}`} />

      {/* ── JSON-LD Structured Data ───────────────────────── */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
