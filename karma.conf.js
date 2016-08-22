// Karma configuration
// Generated on Tue Aug 09 2016 15:48:23 GMT+0300 (Jordan Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './node_modules/angular/angular.js',                             // angular
        './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
        './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
        'client/www/lib/ionic/js/ionic.bundle.js',
        'client/www/lib/collide/collide.js',
        'client/www/lib/ionic-tinder-cards-2/ionic.tdcards2.js',
        'client/www/lib/ionic-material/dist/ionic.material.min.js',
        'client/www/lib/ion-md-input/js/ion-md-input.min.js',
        'client/www/lib/auth0-lock/build/auth0-lock.js',
        'client/www/lib/auth0-angular/build/auth0-angular.js',
        'client/www/lib/a0-angular-storage/dist/angular-storage.js',
        'client/www/lib/angular-jwt/dist/angular-jwt.js',
        'client/www/lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js',
        'client/www/lib/pubnub/web/pubnub.min.js',
        
        'client/www/js/*.js',
        'client/www/spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'client/www/js/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],


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


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}