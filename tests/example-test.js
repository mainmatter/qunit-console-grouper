import { module, test } from 'qunit';

module('first suite', function () {
  test('test', function (assert) {
    assert.ok(true);
  });
});

module('second suite', function () {
  test('test', function (assert) {
    assert.ok(true);
  });
});

module('foo', function () {
  test('bar', function (assert) {
    console.log('baz');
    assert.ok(true);
  });

  test('42', function (assert) {
    assert.ok(true);
  });

  test('41', function (assert) {
    assert.ok(true);
  });
});
