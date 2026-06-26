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
      - button "Open menu" [ref=e9]:
        - img [ref=e11]
        - img [ref=e13]
  - main [ref=e16]:
    - generic [ref=e17]:
      - generic [ref=e21]:
        - generic [ref=e23]:
          - img [ref=e24]
          - text: Private Consultation
        - heading "Begin your journey toward clarity." [level=1] [ref=e27]:
          - text: Begin your journey
          - text: toward clarity.
        - paragraph [ref=e29]: A quiet conversation can shift the trajectory of a decade. Share what's on your mind — we respond personally within 24 hours.
        - generic [ref=e31]:
          - generic [ref=e32]:
            - img [ref=e33]
            - text: 24h response
          - generic [ref=e36]:
            - img [ref=e37]
            - text: All timezones
          - generic [ref=e42]:
            - img [ref=e43]
            - text: Strictly confidential
        - img "The Preceptor — Private Consultation" [ref=e48]
      - generic [ref=e50]:
        - generic [ref=e51]:
          - generic [ref=e52]:
            - text: — Direct Channels
            - heading "A private line to the studio." [level=2] [ref=e53]
            - paragraph [ref=e54]: Whether you're booking a session, planning a partnership, or seeking press — the inbox below reaches us personally.
          - list [ref=e56]:
            - listitem [ref=e57]:
              - img [ref=e59]
              - generic [ref=e62]:
                - paragraph [ref=e63]: Email
                - link "thepreceptor1111@gmail.com" [ref=e64] [cursor=pointer]:
                  - /url: mailto:thepreceptor1111@gmail.com
            - listitem [ref=e65]:
              - img [ref=e67]
              - generic [ref=e70]:
                - paragraph [ref=e71]: Studio
                - paragraph [ref=e72]: Worldwide · Online consultations
          - generic [ref=e74]:
            - paragraph [ref=e75]: Follow the practice
            - generic [ref=e76]:
              - link "Instagram" [ref=e77] [cursor=pointer]:
                - /url: https://instagram.com/thepreceptor
                - img [ref=e78]
              - link "YouTube" [ref=e81] [cursor=pointer]:
                - /url: https://youtube.com/@thepreceptor
                - img [ref=e82]
              - link "LinkedIn" [ref=e85] [cursor=pointer]:
                - /url: https://linkedin.com/company/thepreceptor
                - img [ref=e86]
        - generic [ref=e91]:
          - generic [ref=e92]:
            - generic [ref=e93]:
              - generic [ref=e94]: Full Name
              - textbox "Full Name" [ref=e95]:
                - /placeholder: Your name
            - generic [ref=e96]:
              - generic [ref=e97]: Email
              - textbox "Email" [ref=e98]:
                - /placeholder: you@email.com
            - generic [ref=e99]:
              - generic [ref=e100]: Country (optional)
              - textbox "Country (optional)" [ref=e101]:
                - /placeholder: United States
            - generic [ref=e102]:
              - generic [ref=e103]: Consultation Type
              - generic [ref=e104]:
                - combobox "Consultation Type" [ref=e105]:
                  - option "Select a focus (optional)" [selected]
                  - option "Birth Chart Reading"
                  - option "Career Guidance"
                  - option "Relationship Consultation"
                  - option "Tarot Reading"
                  - option "Spiritual Consultation"
                  - option "Kundli Analysis"
                  - option "Not sure yet"
                - img
            - generic [ref=e106]:
              - generic [ref=e107]: Subject
              - textbox "Subject" [ref=e108]:
                - /placeholder: What can we help you with?
            - generic [ref=e109]:
              - generic [ref=e110]: Your Message
              - textbox "Your Message" [ref=e111]:
                - /placeholder: Share what's on your mind…
          - generic [ref=e112]:
            - paragraph [ref=e113]: Your details remain strictly confidential. Used only to respond to your inquiry.
            - button "Send Message" [ref=e114]:
              - text: Send Message
              - img [ref=e115]
      - generic [ref=e119]:
        - generic [ref=e120]:
          - text: — Reassurance
          - heading "A few things worth knowing." [level=2] [ref=e121]
        - generic [ref=e122]:
          - generic [ref=e124]:
            - button "How quickly will I receive a response?" [ref=e125]:
              - generic [ref=e126]: How quickly will I receive a response?
              - img [ref=e127]
            - paragraph [ref=e130]: Within 24 hours on business days. Urgent inquiries from international clients are prioritized across timezones.
          - generic [ref=e132]:
            - button "Are conversations confidential?" [ref=e133]:
              - generic [ref=e134]: Are conversations confidential?
              - img [ref=e135]
            - paragraph [ref=e137]: Always. Every exchange is treated with the discretion of a private practice. Recordings are shared only with you.
          - generic [ref=e139]:
            - button "Do you accept international clients?" [ref=e140]:
              - generic [ref=e141]: Do you accept international clients?
              - img [ref=e142]
            - paragraph [ref=e144]: Yes — we serve seekers across 47 countries with white-glove scheduling and timezone-aware sessions.
        - link "Or skip ahead — book a session" [ref=e147] [cursor=pointer]:
          - /url: /book
          - text: Or skip ahead — book a session
          - img [ref=e148]
  - contentinfo [ref=e150]:
    - generic [ref=e152]:
      - generic [ref=e153]:
        - link "✦ The Preceptor" [ref=e154] [cursor=pointer]:
          - /url: /
          - generic [ref=e155]: ✦
          - generic [ref=e156]: The Preceptor
        - paragraph [ref=e157]: A modern sanctuary for spiritual clarity. Premium astrology consultations for high-intention seekers across the United States and around the world.
        - generic [ref=e158]:
          - link "Instagram" [ref=e159] [cursor=pointer]:
            - /url: https://instagram.com/thepreceptor
            - img [ref=e160]
          - link "Email" [ref=e163] [cursor=pointer]:
            - /url: mailto:thepreceptor1111@gmail.com
            - img [ref=e164]
      - generic [ref=e167]:
        - paragraph [ref=e168]: Explore
        - list [ref=e169]:
          - listitem [ref=e170]:
            - link "Home" [ref=e171] [cursor=pointer]:
              - /url: /
          - listitem [ref=e172]:
            - link "About" [ref=e173] [cursor=pointer]:
              - /url: /about
          - listitem [ref=e174]:
            - link "Services" [ref=e175] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e176]:
            - link "Testimonials" [ref=e177] [cursor=pointer]:
              - /url: /testimonials
          - listitem [ref=e178]:
            - link "Q&A" [ref=e179] [cursor=pointer]:
              - /url: /qna
          - listitem [ref=e180]:
            - link "Book a Session" [ref=e181] [cursor=pointer]:
              - /url: /book
          - listitem [ref=e182]:
            - link "Shop" [ref=e183] [cursor=pointer]:
              - /url: /shop
      - generic [ref=e184]:
        - paragraph [ref=e185]: Contact
        - list [ref=e186]:
          - listitem [ref=e187]:
            - img [ref=e188]
            - link "thepreceptor1111@gmail.com" [ref=e191] [cursor=pointer]:
              - /url: mailto:thepreceptor1111@gmail.com
          - listitem [ref=e192]:
            - img [ref=e193]
            - text: Worldwide · Private online sessions
    - generic [ref=e197]:
      - paragraph [ref=e198]: © 2026 The Preceptor. All rights reserved.
      - generic [ref=e199]:
        - link "Privacy Policy" [ref=e200] [cursor=pointer]:
          - /url: /privacy
        - link "Terms & Conditions" [ref=e201] [cursor=pointer]:
          - /url: /terms
        - link "Contact" [ref=e202] [cursor=pointer]:
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