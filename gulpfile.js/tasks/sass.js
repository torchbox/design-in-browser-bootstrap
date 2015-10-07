var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var config       = require('../config').sass;


gulp.task('sass', function () {
  return gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});