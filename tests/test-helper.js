import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';

import { dependencySatisfies, importSync } from '@embroider/macros';

import Application from '../app';
import config from '../config/environment';

if (dependencySatisfies('ember-qunit', '>= 5.0.0-beta.1')) {
  // const ConsoleGrouper = importSync('qunit-console-grouper');
  //
  // ConsoleGrouper.setup(QUnit);
}

setApplication(Application.create(config.APP));

start();
