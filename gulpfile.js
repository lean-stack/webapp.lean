
var gulp = require('gulp');

// load plugins into $
var $ = require('gulp-load-plugins')();

gulp.task('styles', function(){

  return gulp.src('src/styles/app.scss')
    .pipe($.sass())
    .pipe($.autoprefixer())
    .pipe(gulp.dest('src/styles'))
    .pipe($.size())
    .pipe($.notify("Styles preprocessing complete."));
});

gulp.task('scripts', function(){

  var browserify = require('browserify');
  var source     = require('vinyl-source-stream');

  browserify(['./src/scripts/app.js'])
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('src/scripts'))
    .pipe($.notify("Script bundling complete."));
});

gulp.task('build', ['styles','scripts']);

gulp.task('default', ['build']);

gulp.task('dist', ['build'], function () {

  $.notify({onLast: true});
  var assets = $.useref.assets();

  return gulp.src('src/*.html')

      .pipe(assets)
      .pipe($.if('*.css',$.csso()))
      .pipe($.if('*.js',$.uglify()))
      .pipe(assets.restore())

      .pipe($.useref())
      .pipe(gulp.dest('dist'))
      .pipe($.size())
      .pipe($.notify({onLast: true, message: "Dist build complete."}));
});

// Task is not involved in build task.
// Won't work with no bower depencies.
gulp.task('wiredep', function(){

  var wiredep = require('wiredep').stream;
  return gulp.src('src/index.html')
    .pipe(wiredep())
    .pipe(gulp.dest('src'));

});
