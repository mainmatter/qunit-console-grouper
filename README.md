🐟  qunit-console-grouper  🐟
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/qunit-console-grouper.svg
[npm-badge-url]: https://www.npmjs.com/package/qunit-console-grouper
[travis-badge]: https://img.shields.io/travis/com/simplabs/qunit-console-grouper/master.svg
[travis-badge-url]: https://travis-ci.com/simplabs/qunit-console-grouper

[QUnit](https://qunitjs.com/) plugin that groups console messages by test

![Screenshot of qunit-console-grouper](docs/screenshot.png)


🚀  Install
------------------------------------------------------------------------------

### npm

```bash
npm install --save-dev qunit-console-grouper
```

or using [`yarn`](https://yarnpkg.com/):

```bash
yarn add --dev qunit-console-grouper
```

### Ember projects using `ember-qunit` v5.x and above

Import and run the `setup` function in your `test-helper.js` file:

```js
// tests/test-helper.js
import * as QUnit from 'qunit';
import * as ConsoleGrouper from 'qunit-console-grouper';

//...

ConsoleGrouper.setup(QUnit);

setApplication(Application.create(config.APP));

start();
```

### Ember projects using `ember-qunit` v4.x and below

`qunit-console-grouper` will automatically start itself. No extra setup
required :tada:.

### `<script>` Tag

Load `qunit-console-grouper.js` *after* `qunit.js`:

```html
<script src="https://unpkg.com/qunitjs/qunit/qunit.js"></script>
<script src="https://unpkg.com/qunit-console-grouper/lib/qunit-console-grouper.js"></script>
```


📃  License
------------------------------------------------------------------------------

qunit-console-grouper is developed by and &copy;
[simplabs GmbH](http://simplabs.com) and contributors. It is released under the
[MIT License](https://github.com/simplabs/qunit-console-grouper/blob/master/LICENSE.md).
