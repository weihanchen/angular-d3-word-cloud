var banner = require('gulp-banner'),
   concat = require('gulp-concat'),
   gulp = require('gulp'),
   ngAnnotate = require('gulp-ng-annotate'),
   pkg = require('./package.json'),
   uglify = require('gulp-uglify');
var comment = '/*\n' +
   ' * <%= pkg.name %> <%= pkg.version %>\n' +
   ' * <%= pkg.description %>\n' +
   ' * <%= pkg.homepage %>\n' +
   ' *\n' +
   ' * Released under the <%= pkg.license %> license.\n' +
   '*/\n\n';

gulp.task('js', function() {
   return gulp.src(['node_modules/jquery/dist/jquery.min.js'
   , 'node_modules/angular/angular.min.js', 'node_modules/d3/build/d3.min.js'
   , 'node_modules/d3-cloud/build/d3.layout.cloud.js', 'node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js'])
      .pipe(gulp.dest('docs/js/plugins'));
});
gulp.task('css', function() {
   return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css', 'node_modules/angular-bootstrap-colorpicker/css/colorpicker.min.css']).pipe(gulp.dest('docs/css/plugins'));
});
gulp.task('fonts', function() {
   return gulp.src(['node_modules/font-awesome/fonts/*']).pipe(gulp.dest('docs/css/fonts'));
});
gulp.task('toDist', function() {
   return gulp.src(['src/angular-word-cloud.js'])
      .pipe(banner(comment, {
         pkg: pkg
      }))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs/dist'))
      .pipe(concat('angular-word-cloud.min.js')).pipe(ngAnnotate()).pipe(uglify({
         mangle: true
      }))
      .pipe(banner(comment, {
         pkg: pkg
      }))
      .pipe(gulp.dest('dist'))
      .pipe(gulp.dest('docs/dist'));
});

gulp.task('default', ['js', 'css', 'fonts', 'toDist']);
