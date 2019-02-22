// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const cssnano = require('gulp-cssnano');
// const autoprefixer = require('gulp-autoprefixer');
// const babel = require('gulp-babel');
// const uglify = require('gulp-uglify');
// const nodemon = require('gulp-nodemon');
// const del = require('del');
// const webpack = require('webpack');
// // const webpackConfig = require('./webpack.config.js');


// gulp.task('start', function () {
//   nodemon({
//     script: 'index.js', 
//     ext: 'js html', 
//     env: { 'NODE_ENV': 'development' }
//   })
// });

// gulp.task('styles', function() {
//   return gulp.src('public/scss/**/*.scss')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(cssnano())
//   .pipe(autoprefixer({
//     browsers: ['> 0.5%', 'last 2 versions', 'safari 8']
//   }))
//   .pipe(gulp.dest(function(file) {
//     return 'public/css';
//   }));
// });

// gulp.task('scripts', function() {
//   return gulp.src('public/es6/*.js')
//   .pipe(babel({
//     presets: ['es2015']
//   }))
//   .pipe(uglify())
//   .pipe(gulp.dest(function(file) {
//     return 'public/js';
//   }));
// });


// gulp.task('build', ['clean'], build);

// function build(done) {
//   webpack(webpackConfig, (err, stats) => {
//     if (err) {
//       console.log('[webpack]', err);
//     }
//     else {
//       console.log('[webpack]', stats.toString({
//         chunks: false,
//         version: false,
//         hash: false
//       }));
//     }

//     done();
//   });
// }

// gulp.task('clean', () => del(['public/js/search-volume-calculator-us/*'], { force: true }));

//Search Volume Calculator task
// gulp.task('svc',['start'], function() {
//   gulp.watch('public/assets/scss/**/*.scss',['styles']);
//   gulp.watch('public/assets/es6/*.js',['scripts']);
//   gulp.watch('public/assets/es6/search-volume-calculator-us/*.jsx', ['build'], build);
// });

//Watch task
// gulp.task('default',['start'], function() {
//   gulp.watch('public/scss/**/*.scss',['styles']);
//   gulp.watch('public/es6/*.js',['scripts']);
//   gulp.watch('public/es6/*/*.jsx',['jsxScripts']);
// });





// 'use strict' ;

// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const browserSync = require('browser-sync');
// const connect = require('gulp-connect-php');
// const autoprefixer = require('gulp-autoprefixer');
// // const uglify = require('gulp-uglify');
// const uglify = require('gulp-uglify-es').default;
// const htmlmin = require('gulp-htmlmin');
// const nodemon = require('gulp-nodemon');


// gulp.task('start', function () {
//     nodemon({
//       script: 'index.js', 
//       ext: 'js html', 
//       env: { 'NODE_ENV': 'development' }
//     })
//   });


// // Set the browser that you want to support
// const autoprefixerBrowsers = [
//     'ie >= 10',
//     'ie_mob >= 10',
//     'ff >= 30',
//     'chrome >= 34',
//     'safari >= 7',
//     'opera >= 23',
//     'ios >= 7',
//     'android >= 4.4',
//     'bb >= 10'
//   ];

// gulp.task('sass', function() {
//     return gulp.src('./scss/*.scss')
//         .pipe(sass())
//         .pipe(autoprefixer({
//             browsers: ['last 2 versions'],
//             cascade: false
//     }))
//     .pipe(autoprefixer({browsers: autoprefixerBrowsers}))
//     // Minify the file
//     .pipe(htmlmin({
//         collapseWhitespace: true,
//         removeComments: true
//       }))
//     .pipe(gulp.dest('./css'))
//     .pipe(browserSync.reload({
//         stream: true
//     }))
// });

// gulp.task('browserSync', function () {
//     connect.server({}, function (){
//         browserSync({
//             proxy: '127.0.0.1:8000/',
//             options: {
//                 reloadDelay: 250
//             },
//             notify: false
//         });
//     });
// });

// gulp.task('watch', ['browserSync', 'sass'], function() {
//     gulp.watch('./scss/*.scss', ['sass']);
//     gulp.watch('**/*.php').on('change', function () {
//         browserSync.reload();
//     });
// });

// // Gulp task to minify JavaScript files
// gulp.task('scripts', function() {
//     return gulp.src('./es6/*.js')
//     // Minify the file
//     .pipe(uglify())
//     // Output
//     .pipe(gulp.dest('./js'))
// });

// gulp.task('default', ['start', 'browserSync', 'sass','scripts', 'watch']);



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