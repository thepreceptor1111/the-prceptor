'use strict';
const { defineCliConfig } = require('@sanity/cli');
module.exports = defineCliConfig({
  api: {
    projectId: '9w7fo0ix',
    dataset: 'production',
  },
  studioHost: 'thepreceptor',
});
