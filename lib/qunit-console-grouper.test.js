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
  global.QUnit.testStart({ fullName: ['Global Test'] });
  console.log('test');
  global.QUnit.testEnd({ fullName: ['Global Test'] });

  global.QUnit.suiteStart({ fullName: ['Suit up!'] });

  global.QUnit.testStart({ fullName: ['Suit up!', 'Suite Test'] });
  console.log('test123');
  global.QUnit.testEnd({ fullName: ['Suit up!', 'Suite Test'] });

  global.QUnit.suiteStart({ fullName: ['Suit up!', 'Child Suite'] });
  global.QUnit.testStart({ fullName: ['Suit up!', 'Child Suite', 'another test'] });
  console.log('42');
  global.QUnit.testEnd({ fullName: ['Suit up!', 'Child Suite', 'another test'] });
  global.QUnit.suiteEnd({ fullName: ['Suit up!', 'Child Suite'] });

  global.QUnit.suiteEnd({ fullName: ['Suit up!'] });

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

test('can handle out-of-order testing', () => {
  global.QUnit.suiteStart({ fullName: ['sA'] });

  global.QUnit.testStart({ fullName: ['sA', 't1'] });
  global.QUnit.testEnd({ fullName: ['sA', 't1'] });

  global.QUnit.suiteStart({ fullName: ['sB'] });
  global.QUnit.testStart({ fullName: ['sB', 't1'] });
  global.QUnit.testEnd({ fullName: ['sB', 't1'] });
  global.QUnit.testStart({ fullName: ['sB', 't2'] });
  global.QUnit.testEnd({ fullName: ['sB', 't2'] });
  global.QUnit.suiteEnd({ fullName: ['sB'] });

  global.QUnit.testStart({ fullName: ['sA', 't2'] });
  global.QUnit.testEnd({ fullName: ['sA', 't2'] });

  global.QUnit.suiteEnd({ fullName: ['sA'] });

  expect(console.messages).toEqual([
    'group|Test Suite: sA',
    'group|Test: t1',
    'groupEnd',
    'groupEnd',
    'group|Test Suite: sB',
    'group|Test: t1',
    'groupEnd',
    'group|Test: t2',
    'groupEnd',
    'groupEnd',
    'group|Test Suite: sA',
    'group|Test: t2',
    'groupEnd',
    'groupEnd',
  ]);
});
