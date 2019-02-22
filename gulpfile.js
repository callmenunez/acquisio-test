const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');


gulp.task('start', function () {
  nodemon({
    script: 'index.js',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('styles', function() {
    return gulp.src('./scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(autoprefixer({
      browsers: ['> 0.5%', 'last 2 versions', 'safari 8']
    }))
    .pipe(gulp.dest(function() {
      return './public/css';
    }));
});

gulp.task('scripts', function() {
    return gulp.src('/public/es6/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(function() {
      return '/public/js';
    }));
});

//Watch task
gulp.task('default',['start'], function() {
  gulp.watch('./scss/*.scss',['styles']);
  gulp.watch('./public/es6/*.js',['scripts']);
});