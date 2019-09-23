module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'error',
  },
  overrides: [
    // prod files
    {
      files: ['lib/*.js'],
      parserOptions: {
        ecmaVersion: 5,
        sourceType: 'script',
      },
    },

    // node files
    {
      files: [
        '.eslintrc.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'tests/dummy/config/**/*.js',
      ],
      excludedFiles: ['tests/dummy/app/**'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
    },

    // Jest test files
    {
      files: ['*.test.js'],
      parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'script',
      },
      env: {
        browser: false,
        jest: true,
        node: true,
      },
    },
  ],
};
