# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> [seo] /testimonials has title, meta description and canonical
- Location: tests/smoke.spec.js:42:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.getAttribute: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('link[data-rh="true"][rel="canonical"]')

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "✦ The Preceptor" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e7]: ✦
        - generic [ref=e8]: The Preceptor
      - navigation "Primary navigation" [ref=e9]:
        - link "Home" [ref=e10] [cursor=pointer]:
          - /url: /
          - text: Home
        - link "About" [ref=e11] [cursor=pointer]:
          - /url: /about
          - text: About
        - link "Services" [ref=e12] [cursor=pointer]:
          - /url: /services
          - text: Services
        - link "Testimonials" [ref=e13] [cursor=pointer]:
          - /url: /testimonials
          - text: Testimonials
        - link "Q&A" [ref=e14] [cursor=pointer]:
          - /url: /qna
          - text: Q&A
        - link "Shop" [ref=e15] [cursor=pointer]:
          - /url: /shop
          - text: Shop
        - link "Contact" [ref=e16] [cursor=pointer]:
          - /url: /contact
          - text: Contact
      - link "Book a Session" [ref=e17] [cursor=pointer]:
        - /url: /book
  - main [ref=e18]:
    - generic [ref=e20]:
      - generic [ref=e21]:
        - text: Testimonials
        - heading "Voices from across the world." [level=1] [ref=e22]
        - paragraph [ref=e23]: Trust earned, one consultation at a time.
      - generic [ref=e24]:
        - generic [ref=e25]:
          - text: Featured Stories
          - heading "Standout reviews." [level=2] [ref=e26]
        - generic [ref=e29]:
          - img "Demo" [ref=e32]
          - generic [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35]: P
              - generic [ref=e36]:
                - paragraph [ref=e37]: Priya S
                - paragraph [ref=e38]: Mumbai, India
            - generic [ref=e39]:
              - button "Previous" [ref=e40]:
                - img [ref=e41]
              - generic [ref=e43]:
                - button "Review 1" [ref=e44]
                - button "Review 2" [ref=e45]
                - button "Review 3" [ref=e46]
                - button "Review 4" [ref=e47]
              - button "Next" [ref=e48]:
                - img [ref=e49]
      - generic [ref=e51]:
        - generic [ref=e52]:
          - text: More stories
          - heading "More voices from clients." [level=2] [ref=e53]
        - generic [ref=e57]:
          - img [ref=e58]
          - paragraph [ref=e61]: “Calm, confident, and breathtakingly accurate. The Preceptor gave me a map I didn't know I needed.”
          - generic [ref=e62]:
            - img [ref=e63]
            - img [ref=e65]
            - img [ref=e67]
            - img [ref=e69]
            - img [ref=e71]
          - generic [ref=e74]:
            - paragraph [ref=e75]: Daniel K.
            - paragraph [ref=e76]: London, UK
      - generic [ref=e78]:
        - text: Video Stories
        - heading "Hear it in their words." [level=2] [ref=e79]
      - generic [ref=e80]:
        - img [ref=e83] [cursor=pointer]
        - img [ref=e88] [cursor=pointer]
        - img [ref=e93] [cursor=pointer]
  - contentinfo [ref=e96]:
    - generic [ref=e98]:
      - generic [ref=e99]:
        - link "✦ The Preceptor" [ref=e100] [cursor=pointer]:
          - /url: /
          - generic [ref=e101]: ✦
          - generic [ref=e102]: The Preceptor
        - paragraph [ref=e103]: A modern sanctuary for spiritual clarity. Premium astrology consultations for high-intention seekers across the United States and around the world.
        - generic [ref=e104]:
          - link "Instagram" [ref=e105] [cursor=pointer]:
            - /url: https://instagram.com/thepreceptor
            - img [ref=e106]
          - link "Email" [ref=e109] [cursor=pointer]:
            - /url: mailto:thepreceptor1111@gmail.com
            - img [ref=e110]
      - generic [ref=e113]:
        - paragraph [ref=e114]: Explore
        - list [ref=e115]:
          - listitem [ref=e116]:
            - link "Home" [ref=e117] [cursor=pointer]:
              - /url: /
          - listitem [ref=e118]:
            - link "About" [ref=e119] [cursor=pointer]:
              - /url: /about
          - listitem [ref=e120]:
            - link "Services" [ref=e121] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e122]:
            - link "Testimonials" [ref=e123] [cursor=pointer]:
              - /url: /testimonials
          - listitem [ref=e124]:
            - link "Q&A" [ref=e125] [cursor=pointer]:
              - /url: /qna
          - listitem [ref=e126]:
            - link "Book a Session" [ref=e127] [cursor=pointer]:
              - /url: /book
          - listitem [ref=e128]:
            - link "Shop" [ref=e129] [cursor=pointer]:
              - /url: /shop
      - generic [ref=e130]:
        - paragraph [ref=e131]: Contact
        - list [ref=e132]:
          - listitem [ref=e133]:
            - img [ref=e134]
            - link "thepreceptor1111@gmail.com" [ref=e137] [cursor=pointer]:
              - /url: mailto:thepreceptor1111@gmail.com
          - listitem [ref=e138]:
            - img [ref=e139]
            - text: Worldwide · Private online sessions
    - generic [ref=e143]:
      - paragraph [ref=e144]: © 2026 The Preceptor. All rights reserved.
      - generic [ref=e145]:
        - link "Privacy Policy" [ref=e146] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e147] [cursor=pointer]:
          - /url: /terms
        - link "Contact" [ref=e148] [cursor=pointer]:
          - /url: /contact
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
     |        ^ Error: locator.getAttribute: Test timeout of 30000ms exceeded.
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