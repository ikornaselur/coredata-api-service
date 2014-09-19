module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        file: [
            // Angular libraries
            
            // Application files
            'js/app.js',
            'js/*.js',

            // Test files
            'tests/*.js'
        ],
        preprocessors: {
            'js/*.js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                {type: 'cobertura', dir: 'coverage/cobertura'},
                {type: 'html', dir: 'coverage/html'}
            ]
        },
        reporters: ['dots', 'coverage', 'junit'],
        junitReporter: {
            outputFile: 'results/junit-result.xml'
        },
        port: 9876,
        runnerPort: 9910,
        color: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true
    })
}
