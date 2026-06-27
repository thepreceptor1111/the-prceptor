import { defineType, defineField } from 'sanity';

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'sessionTier',
      title: 'Session Tier',
      type: 'string',
      description: 'Groups this service under a tier heading on the Services section.',
      options: {
        list: [
          { title: '⚡ Quick Guidance — Short Session',  value: 'quick' },
          { title: '🌟 Mid Level Guidance',              value: 'mid' },
          { title: '🔮 In-depth Guidance',               value: 'indepth' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Badge / Tagline',
      type: 'string',
      description: 'Short label shown on the card e.g. "Quick Session", "In-Depth"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Lucide icon name: Star, BookOpen, Heart, Briefcase, Moon, Sparkles, Compass',
      initialValue: 'Star',
    }),
    defineField({
      name: 'price',
      title: 'Price (number, USD)',
      type: 'number',
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (optional — shows as struck-through)',
      type: 'number',
    }),
    defineField({
      name: 'sessionDuration',
      title: 'Session Duration',
      type: 'string',
      initialValue: '60 min',
    }),
    defineField({
      name: 'deliveryFormat',
      title: 'Delivery Format',
      type: 'string',
      initialValue: 'Video call',
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Popular?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isSoldOut',
      title: 'Mark as Sold Out?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'features',
      title: 'Feature Bullets',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Optional bullet points shown on the full services page',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first within its tier. Use 1, 2, 3 …',
      validation: (R) => R.required().integer().positive(),
    }),

    // ── Deprecated fields ──────────────────────────────────────────────────
    // These were renamed: badge → tagline, duration → sessionDuration.
    // Kept here as hidden so Sanity does not show "Unknown fields" warnings
    // for documents that still carry the old values in the dataset.
    defineField({
      name: 'badge',
      title: 'Badge (deprecated — use Badge / Tagline above)',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'duration',
      title: 'Duration (deprecated — use Session Duration above)',
      type: 'string',
      hidden: true,
    }),
  ],
  orderings: [
    { title: 'Tier then Order', name: 'tierOrder', by: [{ field: 'sessionTier', direction: 'asc' }, { field: 'order', direction: 'asc' }] },
    { title: 'Display Order',  name: 'orderAsc',  by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'sessionTier', order: 'order' },
    prepare({ title, subtitle, order }) {
      const tierLabel = { quick: '⚡ Quick', mid: '🌟 Mid', indepth: '🔮 In-depth' };
      return { title: `${order ? `${order}. ` : ''}${title}`, subtitle: tierLabel[subtitle] ?? subtitle };
    },
  },
});
