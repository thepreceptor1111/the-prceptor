// tests/smoke.spec.js
import { test, expect } from '@playwright/test';

const BASE_URL = process.env.TEST_URL || 'https://www.thepreceptorglobal.com';

// Default title baked into index.html — helmet replaces this after hydration
const DEFAULT_TITLE = 'the preceptor — vedic astrology readings & spiritual consultations online';

const PAGES = [
  { path: '/',             title: 'the preceptor',  description: 'vedic astrology' },
  { path: '/services',     title: 'services',        description: 'astrology' },
  { path: '/about',        title: 'about',           description: 'astrologer' },
  { path: '/book',         title: 'book',            description: 'reading' },
  { path: '/contact',      title: 'contact',         description: 'the preceptor' },
  { path: '/testimonials', title: 'testimonials',    description: 'stories' },
  { path: '/qna',          title: 'q',               description: 'astrology' },
];

// ── Smoke: every page loads with 200 ───────────────────────────────────────
for (const pg of PAGES) {
  test(`[smoke] ${pg.path} loads without error`, async ({ page }) => {
    const res = await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'domcontentloaded' });
    expect(res?.status()).toBe(200);
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('NOT_FOUND');
    expect(body).not.toContain('404: NOT_FOUND');
  });
}

// ── Reload: direct navigation must not 404 ─────────────────────────────────
for (const pg of PAGES) {
  test(`[reload] ${pg.path} survives direct navigation`, async ({ page }) => {
    const res = await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' });
    expect(res?.status()).toBe(200);
    const body = await page.locator('body').innerText();
    expect(body).not.toContain('NOT_FOUND');
  });
}

// ── SEO: title + meta description + canonical ──────────────────────────────
for (const pg of PAGES) {
  test(`[seo] ${pg.path} has title, meta description and canonical`, async ({ page }) => {
    await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' });

    // Wait for react-helmet-async to replace the default index.html title
    await page.waitForFunction(
      (defaultTitle) => document.title.toLowerCase() !== defaultTitle,
      DEFAULT_TITLE,
      { timeout: 10_000 }
    );

    // Title check
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    expect(title.toLowerCase()).toContain(pg.title.toLowerCase());

    // Target helmet-managed meta description (data-rh="true") to avoid
    // conflict with the static one baked into index.html
    const metaDesc = await page
      .locator('meta[data-rh="true"][name="description"]')
      .getAttribute('content');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.length).toBeGreaterThan(50);
    expect(metaDesc.toLowerCase()).toContain(pg.description.toLowerCase());

    // Target helmet-managed canonical
    const canonical = await page
      .locator('link[data-rh="true"][rel="canonical"]')
      .getAttribute('href');
    expect(canonical).toMatch(/^https:\/\//);
  });
}

// ── Sitemap + Robots ────────────────────────────────────────────────────────
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

// ── JSON-LD on homepage ─────────────────────────────────────────────────────
test('[seo] homepage has JSON-LD structured data', async ({ page }) => {
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  const count = await page.locator('script[type="application/ld+json"]').count();
  expect(count).toBeGreaterThan(0);
});
