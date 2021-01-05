'use strict';

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: 'ember-qunit-4',
        npm: {
          devDependencies: {
            'ember-qunit': '^4',
          },
        },
      },
      {
        name: 'ember-qunit-5',
        npm: {
          devDependencies: {
            'ember-qunit': '^5',
            '@ember/test-helpers': '^2',
            qunit: '^2',
          },
        },
      },
    ],
  };
};
