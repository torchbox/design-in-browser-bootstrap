var gulp        = require('gulp');
var browserSync = require('browser-sync');
var swig        = require('gulp-swig');
var config      = require('../config').markup;
var reload      = browserSync.reload;

gulp.task('markup', function() {
    return gulp.src(config.src)
        .pipe(swig({defaults: { cache: false }}))
        .pipe(gulp.dest(config.dest))
        .on("end", reload);
});