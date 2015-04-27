var gulp         = require('gulp');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').styles;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version', 'Android > 2', 'iOS > 4'] }))
    .pipe(gulp.dest(config.dest));
});
