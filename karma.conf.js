var webpackConf = require('./webpack_config/webpack.config.spec');
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [{ pattern: './src/test.ts'}],
    preprocessors: { './src/test.ts': ['webpack', 'sourcemap'] },
    webpack: {
      module: webpackConf.module,
      resolve: webpackConf.resolve
    },
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only'
    },
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
   

    reporters: ['spec', 'coverage-istanbul'],
    specReporter: {
      maxLogLines: 5, // limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressFailed: false, // do not print information about failed tests
      suppressPassed: false, // do not print information about passed tests
      suppressSkipped: true, // do not print information about skipped tests
      showSpecTiming: true // print the time elapsed for each spec
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcov', 'text-summary'],
      dir: './test-coverage', // coverage results needs to be saved under coverage/
      fixWebpackSourcePaths: true,
      query: {
        esModules: true
      }
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_Error,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
