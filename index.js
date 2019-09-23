/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'qunit-console-grouper',

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
