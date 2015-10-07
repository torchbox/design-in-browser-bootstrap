var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var config       = require('../config').sass;

gulp.task('sass', function () {
    return gulp.src(config.src)
        .pipe(sass(config.settings).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
});