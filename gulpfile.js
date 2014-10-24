var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    karma = require('karma').server;

// JSHint task
gulp.task('lint', function () {
  gulp.src(['./app/js/**/*.js', './tests/config/*.js', './tests/specs/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

// Browserify task
gulp.task('dist', function () {
  gulp.src(['./app/js/app.js'])
  .pipe(browserify({
    insertGlobals: false,
    debug: false
  }))
  .pipe(concat('coredata-api-service.js'))
  .pipe(gulp.dest('dist'));
});

// Unit test task
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/tests/config/karma.unit.js',
    singleRun: true
  }, done);
});

gulp.task('watch', ['lint'], function () {
  gulp.watch([
    './app/js/app.js', 
    './app/js/**/*.js', 
    './tests/config/*.js', 
    './tests/specs/*.js'
  ], [
    'test',
    'lint',
    'dist'
  ]);
});

gulp.task('lint-watch', ['lint'], function () {
  gulp.watch([
    './app/js/app.js', 
    './app/js/**/*.js', 
    './tests/config/*.js', 
    './tests/specs/*.js'
  ], [
    'lint'
  ]);
});
gulp.task('default', ['test', 'lint', 'dist']);
