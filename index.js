/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'qunit-console-grouper',

  isEnabled() {
    // support `QUNIT_CONSOLE_GROUPER` environment variable: true/false
    if (process.env.QUNIT_CONSOLE_GROUPER) {
      return process.env.QUNIT_CONSOLE_GROUPER === 'true';
    }

    if (process.env.EMBER_CLI_TEST_COMMAND === 'true') {
      // disable this addon for `ember test`, but not `ember test --server`
      return (
        process.argv.includes('--server') ||
        process.argv.includes('-server') ||
        process.argv.includes('--serve') ||
        process.argv.includes('-serve') ||
        process.argv.includes('-s')
      );
    }

    return true;
  },

  included() {
    this._super.included.apply(this, arguments);
    this.import('vendor/qunit-console-grouper.js', { type: 'test' });
  },

  treeForVendor() {
    return new Funnel(`${__dirname}/lib`, {
      files: ['qunit-console-grouper.js'],
    });
  },
};
