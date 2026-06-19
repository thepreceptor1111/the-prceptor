# Sanity CMS Setup Guide

This project uses [Sanity](https://sanity.io) as its headless CMS.
The frontend fetches live data via `@sanity/client` with a static fallback
so the site works even before Sanity is connected.

---

## 1. Create a Sanity Project

```bash
npm install
npx sanity init --env
```

When prompted:
- **Project name:** The Preceptor
- **Dataset:** `production`
- **Output path:** `.` (current directory — we already have `sanity.config.js`)

This will give you a **Project ID** (looks like `abc12def`).

---

## 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Project ID:

```bash
cp .env.example .env.local
```

```env
VITE_SANITY_PROJECT_ID=abc12def
VITE_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=abc12def
SANITY_STUDIO_DATASET=production
```

---

## 3. Add CORS Origin in Sanity Dashboard

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to **API → CORS Origins**
4. Add your frontend URL:
   - `http://localhost:5173` (local dev)
   - `https://yourdomain.com` (production)

---

## 4. Run the Studio

```bash
# Run Studio alongside the frontend
npm run studio
```

The Sanity Studio opens at `http://localhost:3333`.

Or deploy the Studio to Sanity’s cloud (free):
```bash
npm run studio:deploy
```
You’ll get a URL like `https://the-preceptor.sanity.studio`.

---

## 5. Populate Content

In the Studio, create documents in this order:

### ⚙️ Site Settings (singleton)
- Fill in contact email, social links, tagline

### ⏰ Offer Config (singleton)
- Set **Offer End Date** (the countdown timer reads this)
- Set **Current Price** (`$180`) and **Original Price** (`$200`)
- Set **Session Duration** (`60 min`)

### ✨ Services (10 documents)
Create all 10 services in order. Toggle **Show on Home Page** on the
first 4 you want featured on the home page.

### 💬 Testimonials, ❓ FAQs, 🏆 Achievements
Add as many as needed. Use the **Order** field to control display sequence.

---

## 6. How the Fallback Works

While Sanity is not configured (no `VITE_SANITY_PROJECT_ID` in `.env.local`),
the site serves content from `src/utils/constants.js` automatically.

Once the env var is set, the `useSanityData` hook fetches live from Sanity.
If Sanity is down or returns empty, it falls back to the static constants.

---

## Schema Files

| File | CMS Document | Controls |
|---|---|---|
| `service.js` | Service | All 10 service cards |
| `testimonial.js` | Testimonial | Testimonials carousel |
| `faq.js` | FAQ | FAQ accordion |
| `achievement.js` | Achievement | Stats strip |
| `siteSettings.js` | Site Settings | Email, social, tagline |
| `offerConfig.js` | Offer Config | Countdown timer + prices |

---

## Deploying to Vercel

Add environment variables in Vercel dashboard:
- `VITE_SANITY_PROJECT_ID`
- `VITE_SANITY_DATASET`

The Studio can be deployed separately via `npm run studio:deploy`.
