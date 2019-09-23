class MockConsole {
  constructor() {
    this.messages = [];
  }

  log(message) {
    this.messages.push(`log|${message}`);
  }

  group(name) {
    this.messages.push(`group|${name}`);
  }

  groupEnd() {
    this.messages.push(`groupEnd`);
  }
}

class MockQUnit {
  constructor() {
    this.suiteStart = null;
    this.suiteEnd = null;
    this.testStart = null;
    this.testEnd = null;
  }

  on(eventName, callback) {
    this[eventName] = callback;
  }
}

let originalConsole;
beforeEach(() => {
  originalConsole = global.console;

  global.console = new MockConsole();
  global.QUnit = new MockQUnit();

  jest.resetModules();
  jest.requireActual('./qunit-console-grouper');
});

afterEach(() => {
  global.console = originalConsole;
  delete global.QUnit;
});

test('calls `console.group/groupEnd()` correctly', () => {
  global.QUnit.testStart({ name: 'Global Test' });
  console.log('test');
  global.QUnit.testEnd({ name: 'Global Test' });

  global.QUnit.suiteStart({ name: 'Suit up!' });

  global.QUnit.testStart({ name: 'Suite Test' });
  console.log('test123');
  global.QUnit.testEnd({ name: 'Suite Test' });

  global.QUnit.suiteStart({ name: 'Child Suite' });
  global.QUnit.testStart({ name: 'another test' });
  console.log('42');
  global.QUnit.testEnd({ name: 'another test' });
  global.QUnit.suiteEnd({ name: 'Child Suite' });

  global.QUnit.suiteEnd({ name: 'Suit up!' });

  expect(console.messages).toEqual([
    'group|Test: Global Test',
    'log|test',
    'groupEnd',
    'group|Test Suite: Suit up!',
    'group|Test: Suite Test',
    'log|test123',
    'groupEnd',
    'group|Test Suite: Child Suite',
    'group|Test: another test',
    'log|42',
    'groupEnd',
    'groupEnd',
    'groupEnd',
  ]);
});
