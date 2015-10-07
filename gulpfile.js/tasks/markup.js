var gulp        = require('gulp');
var browserSync = require('browser-sync');
var swig        = require('gulp-swig');
var config      = require('../config').markup;

gulp.task('markup', function() {
    return gulp.src(config.src + '*.html')
        .pipe(swig({defaults: { cache: false }}))
        .pipe(gulp.dest(dist))
        .pipe(browserSync.reload({stream:true}));
});