var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');

var paths = {
  sass: ['./scss/**/*.scss'],
  templateCache: ['./www/templates/**/*.html'],
  ng_annotate: ['./www/js/*.js'],
  useref: ['./www/*.html']
};

gulp.task('templatecache', function(done){
  gulp.src('./www/templates/**/*.html')
  .pipe(templateCache({standalone:true}))
  .pipe(gulp.dest('./www/js'))
  .on('end', done);
});
 
gulp.task('ng_annotate', function (done) {
  gulp.src('./www/js/*.js')
  .pipe(ngAnnotate({single_quotes: true}))
  .pipe(gulp.dest('./www/dist/dist_js/app'))
  .on('end', done);
});
 
gulp.task('useref', function (done) {
  var assets = useref.assets();
  gulp.src('./www/*.html')
  .pipe(assets)
  .pipe(assets.restore())
  .pipe(useref())
  .pipe(gulp.dest('./www/dist'))
  .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.templatecache, ['templatecache']);
  gulp.watch(paths.ng_annotate, ['ng_annotate']);
  gulp.watch(paths.useref, ['useref']);
});

gulp.task('default', ['sass', 'templatecache', 'ng_annotate', 'useref']);

