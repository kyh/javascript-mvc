var gulp       = require('gulp'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    watchify   = require('watchify'),
    watching   = false;

gulp.task('enable-watch-mode', function() { watching = true; });
gulp.task('watchify', ['enable-watch-mode', 'browserify']);

gulp.task('browserify', function() {
  return browserify({ entries: ['js/app.js'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['watchify']);

gulp.task('default', ['browserify']);