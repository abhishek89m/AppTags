/**
 * @file Gulpfile - Gulp configurations and tasks
 * @author Abhishek Mukherjee
 */

var gulp = require('gulp'),
  browserify = require('browserify'),
  stringify = require('stringify'),
  source = require('vinyl-source-stream'),
  server = require('gulp-develop-server'),
  path = require('path'),
  less = require('gulp-less'),
  minify = require('gulp-minify-css');

// run server
gulp.task('server:start', function () {
  server.listen({ path: './server.js' });
});

// restart server if app.js changed
gulp.task('server:restart', function () {
  gulp.watch(['./server.js'], server.restart);
});

gulp.task('copy', function () {
  gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('browserify', function () {

  var bundler = new browserify({
    entries: ['./src/app.js'],
    debug: true,
    transform: [stringify(['.html'])]
  });

  return bundler.bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('less', function () {
  return gulp.src('./src/styles.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(minify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['copy', 'less', 'server:start', 'browserify'], function () {

  gulp.watch('src/index.html', function () {
    gulp.run('copy');
  });

  gulp.watch('src/styles.less', function () {
    gulp.run('less');
  });

  gulp.watch('src/*.*', function () {
    gulp.run('browserify');
  });
});