import { defineType, defineField } from 'sanity';

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',

  fields: [
    // ── Identity ────────────────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Client Name (or handle)',
      type: 'string',
      description: 'Full name, first name, or anonymous handle e.g. "Priya S." or "@starseeker92"',
      validation: (R) => R.required(),
    }),

    // "location" is the canonical field; "country" is kept as a legacy alias
    // so old documents with the "country" field don't show the unknown-field warning.
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Mumbai, India  ·  London, UK',
    }),
    defineField({
      name: 'country',
      title: 'Country (legacy — use Location above)',
      type: 'string',
      hidden: true, // hidden in Studio UI but stored without warnings
    }),

    defineField({
      name: 'service',
      title: 'Service Taken',
      type: 'string',
      description: 'Optional — which service did this client book?',
    }),

    // ── Screenshot image ─────────────────────────────────────────────────────
    defineField({
      name: 'screenshotImage',
      title: 'Screenshot / Chat Image',
      type: 'image',
      description:
        'Upload the WhatsApp, Instagram DM, or chat screenshot. If an image is uploaded the card will display it — text review becomes optional.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text (for accessibility)',
          type: 'string',
          initialValue: 'Client testimonial screenshot',
        }),
      ],
    }),

    // ── Text review (optional when image is present) ──────────────────────
    defineField({
      name: 'review',
      title: 'Review Text',
      type: 'text',
      rows: 4,
      description: 'Required only when no screenshot image is uploaded.',
    }),
    // Legacy field alias so old docs with field name "text" don\'t warn
    defineField({
      name: 'text',
      title: 'Review Text (legacy — use Review above)',
      type: 'text',
      hidden: true,
    }),

    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      initialValue: 5,
      validation: (R) => R.min(1).max(5).integer(),
    }),

    defineField({
      name: 'avatarInitial',
      title: 'Avatar Initial',
      type: 'string',
      description: 'Single letter shown as avatar fallback when no image e.g. "P"',
      validation: (R) => R.max(1),
    }),

    // ── Display order (legacy alias kept so old docs don\'t warn) ─────────
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower = shown first. Leave blank to use creation order.',
    }),

    defineField({
      name: 'featured',
      title: 'Feature in carousel?',
      type: 'boolean',
      initialValue: false,
      description: 'Tick to include this testimonial in the top carousel slot.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      media: 'screenshotImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ?? 'No location set',
        media,
      };
    },
  },
});
