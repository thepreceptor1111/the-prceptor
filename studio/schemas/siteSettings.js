import { defineType, defineField } from 'sanity';

// ─── reusable stat object ────────────────────────────────────────────────────
const statField = (name, title, defaultValue, defaultLabel) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'value', title: 'Value', type: 'string', description: `e.g. "${defaultValue}"` }),
      defineField({ name: 'label', title: 'Label', type: 'string', description: `e.g. "${defaultLabel}"` }),
    ],
  });

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general',      title: '⚙️  General' },
    { name: 'hero',         title: '🌟  Hero' },
    { name: 'about',        title: '👤  About' },
    { name: 'stats',        title: '📊  Stats (site-wide)' },
    { name: 'services',     title: '🔮  Services Section' },
    { name: 'achievements', title: '🏆  Achievements Section' },
    { name: 'testimonials', title: '💬  Testimonials Section' },
    { name: 'experience',   title: '✨  Experience Section' },
    { name: 'faq',          title: '❓  FAQ Section' },
    { name: 'offer',        title: '⏱️  Offer Timer' },
  ],
  fields: [
    // ── GENERAL ──────────────────────────────────────────────────────────────
    defineField({ name: 'siteName',        title: 'Site Name',          type: 'string', group: 'general' }),
    defineField({ name: 'tagline',         title: 'Tagline',            type: 'string', group: 'general' }),
    defineField({ name: 'email',           title: 'Email',              type: 'string', group: 'general' }),
    defineField({ name: 'phone',           title: 'Phone',              type: 'string', group: 'general' }),
    defineField({ name: 'instagramUrl',    title: 'Instagram URL',      type: 'url',    group: 'general' }),
    defineField({ name: 'redditUrl',       title: 'Reddit URL',         type: 'url',    group: 'general' }),
    defineField({ name: 'calcomUsername',  title: 'Cal.com Username',   type: 'string', group: 'general' }),
    defineField({ name: 'calcomEventType', title: 'Cal.com Event Type', type: 'string', group: 'general' }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'string',
      description: 'Leave blank to hide the banner',
      group: 'general',
    }),

    // ── HERO ─────────────────────────────────────────────────────────────────
    defineField({ name: 'heroBadgeText',    title: 'Badge Text',           type: 'string', group: 'hero', description: 'e.g. "Premium Astrology"' }),
    defineField({ name: 'heroHeading1',     title: 'Heading — Line 1',     type: 'string', group: 'hero', description: 'e.g. "Modern guidance,"' }),
    defineField({ name: 'heroHeading2Gold', title: 'Heading — Line 2 (gold)', type: 'string', group: 'hero', description: 'e.g. "written in the stars."' }),
    defineField({ name: 'heroBodyCopy',     title: 'Body Copy',            type: 'text',   group: 'hero', rows: 3 }),
    defineField({ name: 'heroCta1Label',    title: 'CTA Button 1 Label',   type: 'string', group: 'hero', description: 'e.g. "Book a Session"' }),
    defineField({ name: 'heroCta2Label',    title: 'CTA Button 2 Label',   type: 'string', group: 'hero', description: 'e.g. "Explore Services"' }),

    // ── ABOUT ────────────────────────────────────────────────────────────────
    defineField({ name: 'aboutHeading1',     title: 'Heading — Line 1',        type: 'string', group: 'about', description: 'e.g. "A modern astrologer"' }),
    defineField({ name: 'aboutHeading2Gold', title: 'Heading — Line 2 (gold)', type: 'string', group: 'about', description: 'e.g. "for a modern world."' }),
    defineField({ name: 'aboutParagraph1',   title: 'Paragraph 1',             type: 'text',   group: 'about', rows: 4 }),
    defineField({ name: 'aboutParagraph2',   title: 'Paragraph 2',             type: 'text',   group: 'about', rows: 3 }),

    // ── STATS (used across Hero, About & Achievements) ───────────────────────
    statField('stat1', 'Stat 1 — Years',     '12+',   'Years of Practice'),
    statField('stat2', 'Stat 2 — Sessions',  '8,400', 'Sessions Delivered'),
    statField('stat3', 'Stat 3 — Countries', '47',    'Countries Served'),
    statField('stat4', 'Stat 4 — Rating',    '4.98',  'Average Rating'),
    // add group manually since defineField wrapper doesn't spread extra keys well
    // groups are set inline below:

    // ── SERVICES SECTION HEADER ───────────────────────────────────────────────
    defineField({ name: 'servicesSectionLabel',   title: 'Section Label',   type: 'string', group: 'services',     description: 'e.g. "Services"' }),
    defineField({ name: 'servicesSectionHeading', title: 'Section Heading', type: 'string', group: 'services',     description: 'e.g. "Consultations crafted with intention."' }),
    defineField({ name: 'servicesSectionSubtitle',title: 'Section Subtitle (leave blank to hide)', type: 'string', group: 'services' }),

    // ── ACHIEVEMENTS SECTION HEADER ───────────────────────────────────────────
    defineField({ name: 'achievementsSectionLabel',   title: 'Section Label',   type: 'string', group: 'achievements', description: 'e.g. "Recognition"' }),
    defineField({ name: 'achievementsSectionHeading', title: 'Section Heading', type: 'string', group: 'achievements', description: 'e.g. "A practice built on trust."' }),

    // ── TESTIMONIALS SECTION HEADER ───────────────────────────────────────────
    defineField({ name: 'testimonialsSectionLabel',   title: 'Section Label',   type: 'string', group: 'testimonials', description: 'e.g. "Testimonials"' }),
    defineField({ name: 'testimonialsSectionHeading', title: 'Section Heading', type: 'string', group: 'testimonials', description: 'e.g. "Voices from across the world."' }),

    // ── EXPERIENCE SECTION ────────────────────────────────────────────────────
    defineField({ name: 'experienceSectionLabel',   title: 'Section Label',   type: 'string', group: 'experience', description: 'e.g. "The Experience"' }),
    defineField({ name: 'experienceSectionHeading', title: 'Section Heading', type: 'string', group: 'experience', description: 'e.g. "What makes The Preceptor different?"' }),
    defineField({
      name: 'experienceItems',
      title: 'Feature Cards',
      type: 'array',
      group: 'experience',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Card Title', type: 'string' }),
            defineField({ name: 'desc',  title: 'Card Description', type: 'text', rows: 2 }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Award',     value: 'Award' },
                  { title: 'Sparkles', value: 'Sparkles' },
                  { title: 'Star',     value: 'Star' },
                  { title: 'Moon',     value: 'Moon' },
                  { title: 'Compass',  value: 'Compass' },
                  { title: 'BookOpen', value: 'BookOpen' },
                  { title: 'Heart',    value: 'Heart' },
                  { title: 'Briefcase',value: 'Briefcase' },
                ],
              },
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'desc' },
          },
        },
      ],
    }),

    // ── FAQ SECTION HEADER ────────────────────────────────────────────────────
    defineField({ name: 'faqSectionLabel',   title: 'Section Label',   type: 'string', group: 'faq', description: 'e.g. "FAQ"' }),
    defineField({ name: 'faqSectionHeading', title: 'Section Heading', type: 'string', group: 'faq', description: 'e.g. "Common questions."' }),

    // ── OFFER TIMER ───────────────────────────────────────────────────────────
    defineField({
      name: 'offerDeadline',
      title: 'Offer Deadline',
      type: 'datetime',
      group: 'offer',
      description: 'The exact date & time the countdown timer expires (UTC). Controls ALL timers across the site.',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15 },
    }),
  ],
  preview: {
    select: { title: 'siteName' },
    prepare({ title }) { return { title: title ?? 'Site Settings' }; },
  },
});
