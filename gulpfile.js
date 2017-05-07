'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', () => {
    gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});