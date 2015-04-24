'use strict';

var gulp = require('gulp'),
  shell = require('gulp-shell');

gulp.task('up', function() {
  return gulp.src('')
    .pipe(shell([
      'pm2 kill',
      'rm -rf logs && mkdir logs',
      'pm2 startOrRestart pm2-dev.json',
      'pm2 logs'
    ]));
});

gulp.task('test', function() {
  return gulp.src('')
    .pipe(shell([
      'npm test'
    ]));
});
