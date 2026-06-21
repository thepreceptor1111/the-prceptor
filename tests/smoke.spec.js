// tests/smoke.spec.js
// Smoke + SEO tests for The Preceptor
// Verifies every page loads + has correct meta tags

import { test, expect } from '@playwright/test';

const BASE_URL = process.env.TEST_URL || 'https://www.thepreceptorglobal.com';

const PAGES = [
  {
    path: '/',
    title: 'The Preceptor',
    description: 'Vedic astrology',
  },
  {
    path: '/services',
    title: 'Services',
    description: 'astrology services',
  },
  {
    path: '/about',
    title: 'About',
    description: 'astrologer',
  },
  {
    path: '/book',
    title: 'Book',
    description: 'consultation',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'The Preceptor',
  },
  {
    path: '/testimonials',
    title: 'Testimonials',
    description: 'reviews',
  },
  {
    path: '/qna',
    title: 'Q',
    description: 'astrology',
  },
];

// ── Smoke Tests: every page must load with 200 ──────────────────────────────
for (const page of PAGES) {
  test(`[smoke] ${page.path} loads without error`, async ({ page: p }) => {
    const res = await p.goto(`${BASE_URL}${page.path}`, {
      waitUntil: 'domcontentloaded',
    });
    // Must return 200
    expect(res?.status()).toBe(200);
    // Must not show Vercel 404 screen
    const bodyText = await p.locator('body').innerText();
    expect(bodyText).not.toContain('NOT_FOUND');
    expect(bodyText).not.toContain('404');
  });
}

// ── Reload Test: SPA routes must survive hard reload ────────────────────────
for (const page of PAGES) {
  test(`[reload] ${page.path} survives direct navigation`, async ({ page: p }) => {
    // Navigate directly (simulates reload / typing URL in address bar)
    const res = await p.goto(`${BASE_URL}${page.path}`, {
      waitUntil: 'networkidle',
    });
    expect(res?.status()).toBe(200);
    const bodyText = await p.locator('body').innerText();
    expect(bodyText).not.toContain('NOT_FOUND');
  });
}

// ── SEO Tests: every page must have title + meta description ────────────────
for (const page of PAGES) {
  test(`[seo] ${page.path} has correct title and meta description`, async ({ page: p }) => {
    await p.goto(`${BASE_URL}${page.path}`, { waitUntil: 'domcontentloaded' });

    // Title must exist and contain expected keyword
    const title = await p.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.toLowerCase()).toContain(page.title.toLowerCase());

    // Meta description must exist and contain expected keyword
    const metaDesc = await p
      .locator('meta[name="description"]')
      .getAttribute('content');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc!.length).toBeGreaterThan(50);
    expect(metaDesc!.toLowerCase()).toContain(page.description.toLowerCase());

    // Canonical must exist and be absolute URL
    const canonical = await p
      .locator('link[rel="canonical"]')
      .getAttribute('href');
    expect(canonical).toMatch(/^https:\/\//);
  });
}

// ── Sitemap + Robots reachable ───────────────────────────────────────────────
test('[seo] sitemap.xml is reachable and valid XML', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/sitemap.xml`);
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('<urlset');
  expect(body).toContain('thepreceptorglobal.com');
});

test('[seo] robots.txt is reachable', async ({ request }) => {
  const res = await request.get(`${BASE_URL}/robots.txt`);
  expect(res.status()).toBe(200);
  const body = await res.text();
  expect(body).toContain('Sitemap');
});

// ── JSON-LD structured data present on homepage ─────────────────────────────
test('[seo] homepage has JSON-LD structured data', async ({ page: p }) => {
  await p.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded' });
  const jsonLd = await p.locator('script[type="application/ld+json"]').count();
  expect(jsonLd).toBeGreaterThan(0);
});
