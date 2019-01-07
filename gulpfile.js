
'use strict';
 
var gulp = require('gulp');
var scss = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var browserSync =  require('browser-sync').create();
const reload = browserSync.reload;


 
scss.compiler = require('node-sass');
gulp.task('scss', function () {
  return gulp.src('./app/scss/*.scss')
    .pipe(scss().on('error', scss.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('minifycss', function () {
  gulp.src('./app/css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/css/'));
});


gulp.task('run',['scss','minifycss']);

gulp.task('watch',function(){
  gulp.watch('./app/scss/*.scss',['scss']);
  gulp.watch('./app/css/*.css',['minifycss']);
});

gulp.task('serve',['run','watch'],function(){
  browserSync.init({
    server: "./app"
  });
  gulp.watch("./app/*.html").on('change', browserSync.reload);
  gulp.watch('./app/scss/*.{scss,css}').on('change', browserSync.reload);
  gulp.watch('./app/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
