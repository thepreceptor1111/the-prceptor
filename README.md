# The Preceptor — Premium Astrology Consultation Platform

React JavaScript clone of [astral-oracle-alchemy](https://github.com/ayushtiwari18/astral-oracle-alchemy) — same design, modular JS architecture, with incremental Sanity CMS and Cal.com integration.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 (JavaScript, not TypeScript) |
| Build Tool | Vite 6 |
| Routing | TanStack Router v1 (file-based) |
| Styling | CSS Variables + custom design system |
| CMS | Sanity (Phase 1) |
| Booking | Cal.com Embed (Phase 2) |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/archijain23/the-preceptor.git
cd the-preceptor

# 2. Install
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your keys

# 4. Run
npm run dev
```

Visit `http://localhost:5173`

## Project Structure

```
the-preceptor/
├── src/
│   ├── components/
│   │   ├── site/        # Nav, Footer, Logo
│   │   ├── home/        # HeroSection, ServicesSection, TestimonialsSection, BookingCTA
│   │   ├── booking/     # BookingWizard + 4 step components
│   │   └── contact/     # ContactForm
│   ├── routes/          # TanStack file-based routes (.jsx)
│   ├── content/         # Static data: site.js, services.js, testimonials.js
│   ├── styles/          # global.css (design tokens + all component styles)
│   ├── lib/             # (Phase 1) sanity.js client
│   └── main.jsx         # App entry point
├── docs/
│   ├── ROADMAP.md       # Phase-by-phase feature plan
│   └── INTEGRATIONS.md  # Sanity + Cal.com setup guide
├── .env.example
├── vite.config.js
└── package.json
```

## Roadmap

- **Phase 0** ✅ — Foundation: React JS scaffold, all pages, design system, booking wizard UI
- **Phase 1** 🔜 — Sanity CMS: live content for services, testimonials, shop, blog
- **Phase 2** 🔜 — Cal.com: real calendar booking in wizard step 3
- **Phase 3** 🔜 — Email (Resend) + Google Analytics
- **Phase 4** 🔜 — SEO, performance, structured data

See [`docs/ROADMAP.md`](./docs/ROADMAP.md) and [`docs/INTEGRATIONS.md`](./docs/INTEGRATIONS.md) for detailed steps.
