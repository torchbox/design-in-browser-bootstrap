var gulp        = require('gulp');
var browserSync = require('browser-sync');
var config      = require('../config').browserSync;

gulp.task('browserSync', function() {
    return browserSync(config);
});