'use strict';

module.exports = function(config) {
   var configuration = {

      // base path that will be used to resolve all patterns (eg. files, exclude)
      basePath: '',

      // frameworks to use
      // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],


      // list of files / patterns to load in the browser
      files: [
         //libraries
         'node_modules/jquery/dist/jquery.min.js',
         'node_modules/angular/angular.min.js',
         'node_modules/angular-mocks/angular-mocks.js',
         'node_modules/d3/build/d3.min.js',
         'node_modules/d3-cloud/build/d3.layout.cloud.js',
         //our directive
         'src/angular-word-cloud.js',
         //tests
         'test/*.spec.js'
      ],

      preprocessors: {
         'src/*.js': ['coverage']
      },

      coverageReporter: {
         type: 'lcov',
         dir: 'coverage/'
      },

      // test results reporter to use
      // possible values: 'dots', 'progress'
      // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: ['mocha', 'coverage'],

      mochaReporter: {
         output: 'full'
      },


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // start these browsers
      // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
      browsers: ['PhantomJS'],

      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,

      // run with travis ci
      // customLaunchers: {
      //    Chrome_travis_ci: {
      //       base: 'Chrome',
      //       flags: ['--no-sandbox']
      //    }
      // },

      // Continuous Integration mode
      // if true, Karma captures browsers, runs the tests and exits
      singleRun: true,

      // Concurrency level
      // how many browser should be started simultaneous
      concurrency: Infinity
   };
   if (process.env.TRAVIS) {
      configuration.reporters.push('coveralls');
   }
   config.set(configuration);
};
