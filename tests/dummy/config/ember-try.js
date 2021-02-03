'use strict';

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-qunit-4',
        npm: {
          devDependencies: {
            '@ember/test-helpers': null,
            'ember-qunit': '^4',
            qunit: null,
          },
        },
      },
      {
        name: 'ember-qunit-5',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '^2',
            'ember-qunit': '^5',
            qunit: '^2',
          },
        },
      },
    ],
  };
};
