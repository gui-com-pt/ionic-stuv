var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var changed = require("gulp-changed");
var rename = require("gulp-rename");
var concat = require('gulp-concat');
var concurrent = require('concurrent-transform');
var sass = require('gulp-sass');
var imageResize = require('gulp-image-resize');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');

var imgSizes = [100, 250, 680, 1200];
var paths = {
  sass: ['./scss/**/*.scss'],
  appModules: [
  './src/*.mdl.js',
  './src/**/*.mdl.js',
  './src/**/**/*.mdl.js',
  './src/**/**/**/*.mdl.js',
  './src/**/**/**/**/*.mdl.js',
  './src/*.js',
  './src/**/*.js',
  './src/**/**/*.js',
  './src/**/**/**/*.js',
  './src/**/**/**/**/*.js'
],
templates: ['./src/*.html', './src/**/*.html', './src/**/**/*.html', './src/**/**/**/*.html', './src/**/**/**/**/*.html'],
angularDep: ['./www/lib/angular-i18n/angular-locale_pt.js'],
coreDep: [
  './www/lib/geolib/dist/geolib.js ',
  './www/lib/underscore/underscore.js',
  './www/lib/moment/moment.js',
  './www/lib/angular-moment/angular-moment.js',
  './www/lib/moment/locale/pt.js',
  './www/lib/moment-timezone/moment-timezone.js',
  './www/lib/ngCordova/dist/ng-cordova.js',
  './www/lib/leaflet/dist/leaflet.js',
  './www/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
  './www/lib/pi-angular/dist/pi-angular.js',
  './www/lib/angular-resource/angular-resource.js',
  './www/lib/angular-facebook/lib/angular-facebook.js',
  './www/lib/angular-facebook/lib/angular-facebook-phonegap.js',
  './www/lib/angular-simple-logger/dist/angular-simple-logger.js',
  './www/lib/ng-file-upload-shim/ng-file-upload-shim.js',
  './www/lib/ng-file-upload/ng-file-upload.js',
  './www/lib/angular-translate/angular-translate.js',
  './www/lib/ionic-rating/ionic-rating.js',
  './www/lib/angularjs-google-places/dist/angularjs-google-places.min.js',
  './www/lib/pouchdb/dist/pouchdb.js',
  './www/lib/pouchdb-authentication/dist/pouchdb.authentication.js',
  './www/lib/angular-pouchdb/angular-pouchdb.js'
]
};

gulp.task('templates', function () {
    gulp.src(paths.templates)
        .pipe(templateCache())
        .pipe(gulp.dest('./www/js'));
});

gulp.task('scripts', function(){
   
   gulp.src(paths.appModules)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./www/js'));

    gulp.src(['./www/lib/pi-angular/dist/pi-angular.js'])
      .pipe(concat('pi-angular.js'))
      .pipe(gulp.dest('./www/js'));

    /*
    gulp.src(paths.angularDep)
      .pipe(concat('angular.js'))
      .pipe(gulp.dest('./www/js'));
      */
  
});


gulp.task('dependencies', function(){
   gulp.src(paths.coreDep)
       .pipe(concat('dependencies.js'))
       .pipe(gulp.dest('./www/js'));
});


gulp.task('sass', function(done) {
  gulp.src('./scss/index.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('images', function() {
  for(var i = 0; i < imgSizes.length; i++) {
    var size = imgSizes[i];
    gulp.src('www/img/*.{png,jpg,jpeg}')
      .pipe(changed('www/img'))
      .pipe(concurrent(imageResize({ 
        width : size,
        crop : true
      })))
      .pipe(rename(function(path) { path.basename += '_'+size; }))
      .pipe(gulp.dest('www/img'));
  }
});

gulp.task('dev', function(){
  
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.appModules, ['scripts']);
  gulp.watch(paths.angularDep, ['scripts']);
  gulp.watch(paths.coreDep, ['dependencies']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('default', ['scripts', 'dependencies', 'templates', 'sass']);