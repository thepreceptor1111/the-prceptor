# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> [seo] /testimonials has title, meta description and canonical
- Location: tests/smoke.spec.js:42:3

# Error details

```
Error: locator.getAttribute: Test ended.
Call log:
  - waiting for locator('link[data-rh="true"][rel="canonical"]')

```

# Test source

```ts
  1  | // tests/smoke.spec.js
  2  | import { test, expect } from '@playwright/test';
  3  | 
  4  | const BASE_URL = process.env.TEST_URL || 'https://www.thepreceptorglobal.com';
  5  | 
  6  | // Default title baked into index.html — helmet replaces this after hydration
  7  | const DEFAULT_TITLE = 'the preceptor — vedic astrology readings & spiritual consultations online';
  8  | 
  9  | const PAGES = [
  10 |   { path: '/',             title: 'the preceptor',  description: 'vedic astrology' },
  11 |   { path: '/services',     title: 'services',        description: 'astrology' },
  12 |   { path: '/about',        title: 'about',           description: 'astrologer' },
  13 |   { path: '/book',         title: 'book',            description: 'reading' },
  14 |   { path: '/contact',      title: 'contact',         description: 'the preceptor' },
  15 |   { path: '/testimonials', title: 'testimonials',    description: 'stories' },
  16 |   { path: '/qna',          title: 'q',               description: 'astrology' },
  17 | ];
  18 | 
  19 | // ── Smoke: every page loads with 200 ───────────────────────────────────────
  20 | for (const pg of PAGES) {
  21 |   test(`[smoke] ${pg.path} loads without error`, async ({ page }) => {
  22 |     const res = await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'domcontentloaded' });
  23 |     expect(res?.status()).toBe(200);
  24 |     const body = await page.locator('body').innerText();
  25 |     expect(body).not.toContain('NOT_FOUND');
  26 |     expect(body).not.toContain('404: NOT_FOUND');
  27 |   });
  28 | }
  29 | 
  30 | // ── Reload: direct navigation must not 404 ─────────────────────────────────
  31 | for (const pg of PAGES) {
  32 |   test(`[reload] ${pg.path} survives direct navigation`, async ({ page }) => {
  33 |     const res = await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' });
  34 |     expect(res?.status()).toBe(200);
  35 |     const body = await page.locator('body').innerText();
  36 |     expect(body).not.toContain('NOT_FOUND');
  37 |   });
  38 | }
  39 | 
  40 | // ── SEO: title + meta description + canonical ──────────────────────────────
  41 | for (const pg of PAGES) {
  42 |   test(`[seo] ${pg.path} has title, meta description and canonical`, async ({ page }) => {
  43 |     await page.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'networkidle' });
  44 | 
  45 |     // Wait for react-helmet-async to replace the default index.html title
  46 |     await page.waitForFunction(
  47 |       (defaultTitle) => document.title.toLowerCase() !== defaultTitle,
  48 |       DEFAULT_TITLE,
  49 |       { timeout: 10_000 }
  50 |     );
  51 | 
  52 |     // Title check
  53 |     const title = await page.title();
  54 |     expect(title.length).toBeGreaterThan(10);
  55 |     expect(title.toLowerCase()).toContain(pg.title.toLowerCase());
  56 | 
  57 |     // Target helmet-managed meta description (data-rh="true") to avoid
  58 |     // conflict with the static one baked into index.html
  59 |     const metaDesc = await page
  60 |       .locator('meta[data-rh="true"][name="description"]')
  61 |       .getAttribute('content');
  62 |     expect(metaDesc).not.toBeNull();
  63 |     expect(metaDesc.length).toBeGreaterThan(50);
  64 |     expect(metaDesc.toLowerCase()).toContain(pg.description.toLowerCase());
  65 | 
  66 |     // Target helmet-managed canonical
  67 |     const canonical = await page
  68 |       .locator('link[data-rh="true"][rel="canonical"]')
> 69 |       .getAttribute('href');
     |        ^ Error: locator.getAttribute: Test ended.
  70 |     expect(canonical).toMatch(/^https:\/\//);
  71 |   });
  72 | }
  73 | 
  74 | // ── Sitemap + Robots ────────────────────────────────────────────────────────
  75 | test('[seo] sitemap.xml is reachable and valid XML', async ({ request }) => {
  76 |   const res = await request.get(`${BASE_URL}/sitemap.xml`);
  77 |   expect(res.status()).toBe(200);
  78 |   const body = await res.text();
  79 |   expect(body).toContain('<urlset');
  80 |   expect(body).toContain('thepreceptorglobal.com');
  81 | });
  82 | 
  83 | test('[seo] robots.txt is reachable', async ({ request }) => {
  84 |   const res = await request.get(`${BASE_URL}/robots.txt`);
  85 |   expect(res.status()).toBe(200);
  86 |   const body = await res.text();
  87 |   expect(body).toContain('Sitemap');
  88 | });
  89 | 
  90 | // ── JSON-LD on homepage ─────────────────────────────────────────────────────
  91 | test('[seo] homepage has JSON-LD structured data', async ({ page }) => {
  92 |   await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  93 |   const count = await page.locator('script[type="application/ld+json"]').count();
  94 |   expect(count).toBeGreaterThan(0);
  95 | });
  96 | 
```