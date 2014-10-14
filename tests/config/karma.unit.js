'use strict';

module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine', 'browserify'],
        files: [
            // Angular libraries
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',

            // Application files
            'app/js/app.js',
            'app/js/services/*.js',

            // Test files
            'tests/specs/*.js'
        ],
        preprocessors: {
            'app/js/**/*.js': ['coverage', 'browserify'],
        },
        coverageReporter: {
            reporters: [
                {type: 'cobertura', dir: 'tests/coverage/cobertura'},
                {type: 'html', dir: 'tests/coverage/html'}
            ]
        },
        reporters: ['dots', 'coverage', 'junit'],
        junitReporter: {
            outputFile: 'tests/results/junit-result.xml'
        },
        port: 9876,
        runnerPort: 9910,
        color: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
