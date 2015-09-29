var gulp         = require('gulp');
var handleErrors = require('../util/handleErrors');
var fonts       = require('../config').fonts;

gulp.task('fonts', function () {
	return gulp.src(fonts.src)
		.on('error', handleErrors)
		.pipe(gulp.dest(fonts.dest));
});