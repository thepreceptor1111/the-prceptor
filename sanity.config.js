import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { serviceSchema }      from './studio/schemas/service.js';
import { testimonialSchema }  from './studio/schemas/testimonial.js';
import { faqSchema }          from './studio/schemas/faq.js';
import { siteSettingsSchema } from './studio/schemas/siteSettings.js';

export default defineConfig({
  name: 'the-preceptor',
  title: 'The Preceptor',

  projectId: '9w7fo0ix',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.singleton('siteSettings', 'Site Settings', siteSettingsSchema.name),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('faq').title('FAQs'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: [
      serviceSchema,
      testimonialSchema,
      faqSchema,
      siteSettingsSchema,
    ],
  },
});
