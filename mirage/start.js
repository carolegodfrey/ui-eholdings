/* global require */

import Mirage, { camelize } from 'mirage-server';
import baseConfig from './config';
import '../tests/force-fetch-polyfill';

const environment = process.env.NODE_ENV;
const moduleTypes = ['scenarios', 'factories', 'fixtures', 'models', 'serializers', 'identity-managers'];

let allModules = moduleTypes.reduce((memo, name) => {
  memo[camelize(name)] = {};
  return memo;
}, {});

// require all files within this directory recursively and build a hash
// of modules based on it's moduleType (parent directory) to load with Mirage.
const req = require.context('./', true, /\.js$/);
req.keys().forEach((modulePath) => {
  const moduleParts = modulePath.split('/');
  const moduleType = moduleParts[1];
  const moduleName = moduleParts[2];

  if (moduleName && allModules[moduleType]) {
    const moduleKey = camelize(moduleName.replace('.js', ''));
    allModules[moduleType][moduleKey] = req(modulePath).default;
  }
});

let { scenarios, ...modules } = allModules;

export default function startMirage(...scenarioNames) {
  // console.log("scenarios = ", scenarios);
  // console.log("Object.keys(modules.scenarios) = ", Object.keys(modules.scenarios));
  // // filter all of the scenarios by the passed scenario names
  // let scenarioNames = Object.keys(modules.scenarios).filter(scenario => scenarios.includes(scenario));
  // console.log("scenarioNames = ", scenarioNames);
  // modules.scenarios = scenarioNames.reduce((object, key) => ({...object, [key]: modules.scenarios[key]}), {});
  // console.log("modules.scenarios = ", modules.scenarios);


  let options = Object.assign(modules, { environment, baseConfig });
  let server = new Mirage(options);

  scenarioNames.forEach((scenario) => {
    if (scenarios[scenario]) {
      scenarios[scenario](server);
    }
  });

  return server;
}
