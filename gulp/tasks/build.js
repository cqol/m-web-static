var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var config = require('../config');

gulp.task('clean', del.bind(null, [config.dir.tmp, config.dir.dist]));

gulp.task('build', function(cb) {
  runSequence('clean', ['htmls', 'minifyImages', 'minifyCss', 'uglifyJs'], cb);
});
