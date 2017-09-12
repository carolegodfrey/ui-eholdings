const path = require('path');
const webpack = require('webpack');

// Start with the base stripes webpack config.
// we'll need to make some changes in order to get
// karma-webpack to load properly.
const webpackConfig = require('@folio/stripes-core/webpack.config.cli.dev');

// This is not a separate platform, so we need to stub out our own
// stripes config. Whenever code in the application, or in stripes
// itself does `import 'stripes-loader'`, it will find our test
// config.
//
// Note that stripes has its own rules for handling the
// `stripes-loader` package, so we have to remove its custom rule above.
webpackConfig.resolve.alias['stripes-loader'] = path.resolve(__dirname, 'tests/stripes.config.js');

// The webpack config provided by stripes-core, contains the `stripes-loader` module which uses
// itself as a loader. We turn this off by finding the rule and
// removing it from the webpack config, so that our own shim for the
// `stripes-loader` module does not get overriden.
// see `@folio/stripes-loader`
// see `@folio/stripes-core/webpack.config.base.js`
webpackConfig.module.rules = webpackConfig.module.rules.filter(rule => {
  return !rule.use || !rule.use.some(use => use.loader === '@folio/stripes-loader');
});

// make sure that the NODE_ENV is available in browser code.
webpackConfig.plugins.push(new webpack.EnvironmentPlugin({
  NODE_ENV: 'test'
}));

module.exports = function(config) {
  let configuration = {
    frameworks: ['mocha'],
    reporters: ['mocha', 'BrowserStack'],
    port: 9876,

    browsers: ['Chrome'],

    browserStack: {
      username: 'elrickryan1',
      accessKey: process.env.BROWSERSTACK
    },

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      },
      bs_firefox_mac: {
        base: 'BrowserStack',
        browser: 'firefox',
        browser_version: '54.0',
        os: 'OS X',
        os_version: 'Sierra'
      },
      bs_safari_mac: {
        base: 'BrowserStack',
        browser: 'safari',
        browser_version: '10.1',
        os: 'OS X',
        os_version: 'Sierra'
      },
      bs_ie11_windows: {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: "7"
      },
      bs_ieEdge_windows: {
        base: 'BrowserStack',
        browser: 'edge',
        browser_version: '15.0',
        os: "Windows",
        os_version: "10"
      },
      bs_samsungGS5_android: {
        base: 'BrowserStack',
        browser: 'android',
        browser_version: null,
        device: 'Samsung Galaxy S5',
        os: 'android',
        os_version: '4.4'
      },
      bs_googleNexus6_android: {
        base: 'BrowserStack',
        browser: 'android',
        browser_version: null,
        device: 'Google Nexus 6',
        os: 'android',
        os_version: '5.0'
      },
      bs_iPhone6_ios: {
        base: 'BrowserStack',
        browser: 'iphone',
        browser_version: null,
        device: 'iPhone 6S',
        os: 'ios',
        os_version: '9.1'
      },
      bs_iPadAir2_ios: {
        base: 'BrowserStack',
        browser: 'ipad',
        browser_version: null,
        device: 'iPad Air 2',
        os: 'ios',
        os_version: '9.1'
      }
    },

    files: [
      { pattern: 'tests/index.js', watched: false }
    ],

    preprocessors: {
      'tests/index.js': ['webpack']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "errors-only"
    },

    mochaReporter: {
      showDiff: true
    },

    plugins: [
      'karma-browserstack-launcher',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-webpack',
      'karma-mocha-reporter'
    ]
  };

  if (process.env.TRAVIS) {
    configuration.browsers = [
      'Chrome_travis_ci',
      'bs_ie11_windows',
      'bs_firefox_mac',
      'bs_safari_mac',
      'bs_ieEdge_windows',
      'bs_samsungGS5_android',
      'bs_googleNexus6_android',
      'bs_iPhone6_ios',
      'bs_iPadAir2_ios',
    ];
  }

  config.set(configuration);
};
