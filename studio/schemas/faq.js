import { defineType, defineField } from 'sanity';

export const faqSchema = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Sessions',          value: 'sessions' },
          { title: 'Astrology',         value: 'astrology' },
          { title: 'Logistics',         value: 'logistics' },
          { title: 'Types of Readings', value: 'readings' },
        ],
      },
      initialValue: 'sessions',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = shown first',
      validation: (R) => R.required().integer().positive(),
    }),
    defineField({
      name: 'featured',
      title: 'Show on Home page?',
      type: 'boolean',
      initialValue: false,
      description: 'Tick to include this FAQ in the home page FAQ section. Leave unticked to show only on the full /qna page.',
    }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'question', subtitle: 'category', featured: 'featured' },
    prepare({ title, subtitle, featured }) {
      return {
        title,
        subtitle: `${subtitle ?? ''}${featured ? ' ★ Home' : ''}`,
      };
    },
  },
});
