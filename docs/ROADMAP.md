# The Preceptor — Roadmap

## Phase 0 — Foundation (✅ Done)
- [x] React JS project scaffold (Vite + TanStack Router)
- [x] All pages created: Home, About, Services, Book, Testimonials, Shop, Contact
- [x] Modular component structure
- [x] Design system (CSS variables, gold/celestial palette, Cormorant + Satoshi fonts)
- [x] 6-step Booking Wizard UI
- [x] Contact form UI
- [x] Static content files (services, testimonials, site config)

## Phase 1 — Sanity CMS Integration
- [ ] Create Sanity project at sanity.io
- [ ] Define schemas: `service`, `testimonial`, `blogPost`, `shopProduct`
- [ ] Install `@sanity/client` in this project
- [ ] Create `src/lib/sanity.js` with client setup
- [ ] Replace static content in `src/content/` with live Sanity queries
- [ ] Add Sanity Studio (`/studio` route or separate deployment)
- [ ] Set `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` in `.env.local`

## Phase 2 — Cal.com Booking
- [ ] Create Cal.com account and event types
- [ ] Add Cal.com embed script to `index.html`
- [ ] Activate `StepCalEmbed.jsx` with real `Cal()` inline embed
- [ ] Set `VITE_CALCOM_USERNAME` and `VITE_CALCOM_EVENT_SLUG` in `.env.local`
- [ ] Test booking flow end-to-end

## Phase 3 — Email + Analytics
- [ ] Set up Resend account
- [ ] Add booking confirmation emails
- [ ] Add admin notification emails
- [ ] Set up Google Analytics 4
- [ ] Add conversion tracking for booking completions

## Phase 4 — SEO & Performance
- [ ] Add meta tags per page (React Helmet or TanStack Router meta)
- [ ] Add structured data (JSON-LD: Person, Service, Review)
- [ ] Create sitemap.xml
- [ ] Performance audit (Lighthouse)
- [ ] Image optimisation
