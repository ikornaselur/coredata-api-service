module.exports = function (config) {
    config.set({
        basePath: '../..',
        frameworks: ['jasmine'],
        files: [
            // Angular libraries
            'lib/angular.js',
            'lib/angular-mocks.js',

            // Application files
            'js/app.js',
            'js/services/*.js',

            // Test files
            'tests/specs/*.js'
        ],
        preprocessors: {
            'js/*.js': ['coverage']
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
    })
}
