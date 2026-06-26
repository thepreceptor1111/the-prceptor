# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.js >> [seo] /contact has title, meta description and canonical
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
    - generic [ref=e19]:
      - generic [ref=e23]:
        - generic [ref=e25]:
          - img [ref=e26]
          - text: Private Consultation
        - heading "Begin your journey toward clarity." [level=1] [ref=e29]:
          - text: Begin your journey
          - text: toward clarity.
        - paragraph [ref=e31]: A quiet conversation can shift the trajectory of a decade. Share what's on your mind — we respond personally within 24 hours.
        - generic [ref=e33]:
          - generic [ref=e34]:
            - img [ref=e35]
            - text: 24h response
          - generic [ref=e38]:
            - img [ref=e39]
            - text: All timezones
          - generic [ref=e44]:
            - img [ref=e45]
            - text: Strictly confidential
        - img "The Preceptor — Private Consultation" [ref=e50]
      - generic [ref=e52]:
        - generic [ref=e53]:
          - generic [ref=e54]:
            - text: — Direct Channels
            - heading "A private line to the studio." [level=2] [ref=e55]
            - paragraph [ref=e56]: Whether you're booking a session, planning a partnership, or seeking press — the inbox below reaches us personally.
          - list [ref=e58]:
            - listitem [ref=e59]:
              - img [ref=e61]
              - generic [ref=e64]:
                - paragraph [ref=e65]: Email
                - link "thepreceptor1111@gmail.com" [ref=e66] [cursor=pointer]:
                  - /url: mailto:thepreceptor1111@gmail.com
            - listitem [ref=e67]:
              - img [ref=e69]
              - generic [ref=e72]:
                - paragraph [ref=e73]: Studio
                - paragraph [ref=e74]: Worldwide · Online consultations
          - generic [ref=e76]:
            - paragraph [ref=e77]: Follow the practice
            - generic [ref=e78]:
              - link "Instagram" [ref=e79] [cursor=pointer]:
                - /url: https://instagram.com/thepreceptor
                - img [ref=e80]
              - link "YouTube" [ref=e83] [cursor=pointer]:
                - /url: https://youtube.com/@thepreceptor
                - img [ref=e84]
              - link "LinkedIn" [ref=e87] [cursor=pointer]:
                - /url: https://linkedin.com/company/thepreceptor
                - img [ref=e88]
        - generic [ref=e93]:
          - generic [ref=e94]:
            - generic [ref=e95]:
              - generic [ref=e96]: Full Name
              - textbox "Full Name" [ref=e97]:
                - /placeholder: Your name
            - generic [ref=e98]:
              - generic [ref=e99]: Email
              - textbox "Email" [ref=e100]:
                - /placeholder: you@email.com
            - generic [ref=e101]:
              - generic [ref=e102]: Country (optional)
              - textbox "Country (optional)" [ref=e103]:
                - /placeholder: United States
            - generic [ref=e104]:
              - generic [ref=e105]: Consultation Type
              - generic [ref=e106]:
                - combobox "Consultation Type" [ref=e107]:
                  - option "Select a focus (optional)" [selected]
                  - option "Birth Chart Reading"
                  - option "Career Guidance"
                  - option "Relationship Consultation"
                  - option "Tarot Reading"
                  - option "Spiritual Consultation"
                  - option "Kundli Analysis"
                  - option "Not sure yet"
                - img
            - generic [ref=e108]:
              - generic [ref=e109]: Subject
              - textbox "Subject" [ref=e110]:
                - /placeholder: What can we help you with?
            - generic [ref=e111]:
              - generic [ref=e112]: Your Message
              - textbox "Your Message" [ref=e113]:
                - /placeholder: Share what's on your mind…
          - generic [ref=e114]:
            - paragraph [ref=e115]: Your details remain strictly confidential. Used only to respond to your inquiry.
            - button "Send Message" [ref=e116]:
              - text: Send Message
              - img [ref=e117]
      - generic [ref=e121]:
        - generic [ref=e122]:
          - text: — Reassurance
          - heading "A few things worth knowing." [level=2] [ref=e123]
        - generic [ref=e124]:
          - generic [ref=e126]:
            - button "How quickly will I receive a response?" [ref=e127]:
              - generic [ref=e128]: How quickly will I receive a response?
              - img [ref=e129]
            - paragraph [ref=e132]: Within 24 hours on business days. Urgent inquiries from international clients are prioritized across timezones.
          - generic [ref=e134]:
            - button "Are conversations confidential?" [ref=e135]:
              - generic [ref=e136]: Are conversations confidential?
              - img [ref=e137]
            - paragraph [ref=e139]: Always. Every exchange is treated with the discretion of a private practice. Recordings are shared only with you.
          - generic [ref=e141]:
            - button "Do you accept international clients?" [ref=e142]:
              - generic [ref=e143]: Do you accept international clients?
              - img [ref=e144]
            - paragraph [ref=e146]: Yes — we serve seekers across 47 countries with white-glove scheduling and timezone-aware sessions.
        - link "Or skip ahead — book a session" [ref=e149] [cursor=pointer]:
          - /url: /book
          - text: Or skip ahead — book a session
          - img [ref=e150]
  - contentinfo [ref=e152]:
    - generic [ref=e154]:
      - generic [ref=e155]:
        - link "✦ The Preceptor" [ref=e156] [cursor=pointer]:
          - /url: /
          - generic [ref=e157]: ✦
          - generic [ref=e158]: The Preceptor
        - paragraph [ref=e159]: A modern sanctuary for spiritual clarity. Premium astrology consultations for high-intention seekers across the United States and around the world.
        - generic [ref=e160]:
          - link "Instagram" [ref=e161] [cursor=pointer]:
            - /url: https://instagram.com/thepreceptor
            - img [ref=e162]
          - link "Email" [ref=e165] [cursor=pointer]:
            - /url: mailto:thepreceptor1111@gmail.com
            - img [ref=e166]
      - generic [ref=e169]:
        - paragraph [ref=e170]: Explore
        - list [ref=e171]:
          - listitem [ref=e172]:
            - link "Home" [ref=e173] [cursor=pointer]:
              - /url: /
          - listitem [ref=e174]:
            - link "About" [ref=e175] [cursor=pointer]:
              - /url: /about
          - listitem [ref=e176]:
            - link "Services" [ref=e177] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e178]:
            - link "Testimonials" [ref=e179] [cursor=pointer]:
              - /url: /testimonials
          - listitem [ref=e180]:
            - link "Q&A" [ref=e181] [cursor=pointer]:
              - /url: /qna
          - listitem [ref=e182]:
            - link "Book a Session" [ref=e183] [cursor=pointer]:
              - /url: /book
          - listitem [ref=e184]:
            - link "Shop" [ref=e185] [cursor=pointer]:
              - /url: /shop
      - generic [ref=e186]:
        - paragraph [ref=e187]: Contact
        - list [ref=e188]:
          - listitem [ref=e189]:
            - img [ref=e190]
            - link "thepreceptor1111@gmail.com" [ref=e193] [cursor=pointer]:
              - /url: mailto:thepreceptor1111@gmail.com
          - listitem [ref=e194]:
            - img [ref=e195]
            - text: Worldwide · Private online sessions
    - generic [ref=e199]:
      - paragraph [ref=e200]: © 2026 The Preceptor. All rights reserved.
      - generic [ref=e201]:
        - link "Privacy Policy" [ref=e202] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e203] [cursor=pointer]:
          - /url: /terms
        - link "Contact" [ref=e204] [cursor=pointer]:
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