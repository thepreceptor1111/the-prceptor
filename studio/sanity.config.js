import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { serviceSchema }      from './schemas/service.js';
import { testimonialSchema }  from './schemas/testimonial.js';
import { faqSchema }          from './schemas/faq.js';
import { siteSettingsSchema } from './schemas/siteSettings.js';

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
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),
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
