function initializeQUnitConsoleGrouper(QUnit) {
  QUnit.on('suiteStart', function (suiteInfo) {
    start(suiteInfo.fullName, false);
  });

  QUnit.on('suiteEnd', function () {
    end();
  });

  QUnit.on('testStart', function (testInfo) {
    start(testInfo.fullName, true);
  });

  QUnit.on('testEnd', function () {
    end();
  });

  var current_groups = [];

  function start(fullName, isTest) {
    var maxMatching = Math.min(current_groups.length, fullName.length);
    var numMatching = 0;
    while (numMatching <= maxMatching) {
      if (current_groups[numMatching] === fullName[numMatching]) {
        numMatching += 1;
      } else {
        break;
      }
    }

    while (current_groups.length > numMatching) {
      console.groupEnd();
      current_groups.pop();
    }

    for (var i = numMatching; current_groups.length < fullName.length; i++) {
      var name = fullName[i];
      var groupName = 'Test Suite: ' + name;
      if (isTest && i === fullName.length - 1) {
        groupName = 'Test: ' + name;
      }

      console.group(groupName);
      current_groups.push(name);
    }
  }

  function end() {
    console.groupEnd();
    current_groups.pop();
  }
}

if (window.QUnit) {
  // if the QUnit global exists we initialize immediately
  initializeQUnitConsoleGrouper(window.QUnit);
} else {
  // if the global is not yet available we try to initialize on the next tick
  setTimeout(function () {
    if (window.QUnit) {
      initializeQUnitConsoleGrouper(window.QUnit);
    } else {
      // and if it's still not available we should a warning on the console instead
      console.warn(
        'Failed to automatically start qunit-console-grouper because the QUnit global is missing.'
      );
    }
  }, 0);
}
