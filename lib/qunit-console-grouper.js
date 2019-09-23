/* global QUnit */

QUnit.on('suiteStart', function({ name }) {
  console.group(`Test Suite: ${name}`);
});

QUnit.on('suiteEnd', function() {
  console.groupEnd();
});

QUnit.on('testStart', function({ name }) {
  console.group(`Test: ${name}`);
});

QUnit.on('testEnd', function() {
  console.groupEnd();
});
