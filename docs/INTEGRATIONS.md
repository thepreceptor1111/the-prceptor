# Integration Guide

## Phase 1: Sanity CMS

### Setup
1. Go to [sanity.io](https://sanity.io) → create a new project
2. Note your `Project ID` and `Dataset` (usually `production`)
3. Add to `.env.local`:
   ```
   VITE_SANITY_PROJECT_ID=abc123
   VITE_SANITY_DATASET=production
   VITE_SANITY_API_VERSION=2024-01-01
   ```
4. Install the client:
   ```bash
   npm install @sanity/client
   ```
5. Create `src/lib/sanity.js`:
   ```js
   import { createClient } from '@sanity/client'

   export const sanityClient = createClient({
     projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
     dataset: import.meta.env.VITE_SANITY_DATASET,
     apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
     useCdn: true,
   })

   export async function getServices() {
     return sanityClient.fetch(`*[_type == "service"] | order(order asc)`)
   }

   export async function getTestimonials() {
     return sanityClient.fetch(`*[_type == "testimonial"] | order(_createdAt desc)`)
   }
   ```

---

## Phase 2: Cal.com

### Setup
1. Create account at [cal.com](https://cal.com)
2. Create an event type (e.g., "Astrology Consultation — 60 min")
3. Note your username and event slug
4. Add to `.env.local`:
   ```
   VITE_CALCOM_USERNAME=your_username
   VITE_CALCOM_EVENT_SLUG=astrology-consultation
   ```
5. Add to `index.html` `<head>`:
   ```html
   <script src="https://app.cal.com/embed/embed.js"></script>
   ```
6. In `StepCalEmbed.jsx`, replace the placeholder with:
   ```jsx
   useEffect(() => {
     if (window.Cal) {
       Cal('inline', {
         elementOrSelector: '#cal-embed',
         calLink: `${CALCOM_USERNAME}/${CALCOM_EVENT}`,
         layout: 'month_view',
       })
     }
   }, [])
   ```
