/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'qunit-console-grouper',

  init() {
    this._super.init.apply(this, arguments);

    const VersionChecker = require('ember-cli-version-checker');
    const checker = new VersionChecker(this.project);
    this._supportOlderEmberQUnit = !checker.for('ember-qunit').gte('5.0.0-alpha.1');
  },

  // isEnabled() {
  //   // support `QUNIT_CONSOLE_GROUPER` environment variable: true/false
  //   if (process.env.QUNIT_CONSOLE_GROUPER) {
  //     return process.env.QUNIT_CONSOLE_GROUPER === 'true';
  //   }
  //
  //   if (process.env.EMBER_CLI_TEST_COMMAND === 'true') {
  //     // disable this addon for `ember test`, but not `ember test --server`
  //     return (
  //       process.argv.includes('--server') ||
  //       process.argv.includes('-server') ||
  //       process.argv.includes('--serve') ||
  //       process.argv.includes('-serve') ||
  //       process.argv.includes('-s')
  //     );
  //   }
  //
  //   return true;
  // },

  // included() {
  //   this._super.included.apply(this, arguments);
  //
  //   if (this._supportOlderEmberQUnit) {
  //     this.import('vendor/qunit-console-grouper.js', { type: 'test' });
  //   }
  // },
  //
  // treeForVendor() {
  //   if (this._supportOlderEmberQUnit) {
  //     return new Funnel(`${__dirname}/lib`, {
  //       files: ['qunit-console-grouper.js'],
  //     });
  //   }
  // },

  // treeForAddonTestSupport() {
  //   if (!this._supportOlderEmberQUnit) {
  //     // this differs from ember-cli's default treeForAddonTestSupport in that it
  //     // makes our test support modules available at `qunit-console-grouper` **not**
  //     // `qunit-console-grouper/test-support`
  //     let scopedInputTree = new Funnel(`${__dirname}/addon-test-support`, {
  //       destDir: this.name,
  //     });
  //
  //     // in order to take advantage of ember-auto-import, we **must** use
  //     // `preprocessJs` (because it instruments JS files looking for imports
  //     // via the preprocessor registry)
  //     //
  //     // this also properly transpiles our files based on the consuming applications
  //     // targets (through ember-cli-babel)
  //     return this.preprocessJs(scopedInputTree, '/', this.name, {
  //       annotation: `qunit-console-grouper - treeForAddonTestSupport`,
  //       registry: this.registry,
  //     });
  //   }
  // },
};
