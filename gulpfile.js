'use strict'
var gulp = require('gulp');
var sass = require('gulp-sass');
var prop = require('./package.json');
var $ = require('gulp-load-plugins')();
var head = '\/*\r\n* Cirrus Reset ' + prop.version + '\r\n* Stanley Lim, Copyright 2017\r\n* https://spiderpig86.github.io/Cirrus-Reset\r\n*/\r\n';

gulp.task('sass', () => {
    return gulp.src([
        './sass/base.scss',
        './sass/fix.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe($.concat('reset.css'))
        .pipe($.header(head))
        .pipe($.size())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass:watch', () => {
    gulp.watch('./sass/**/*.scss', ['sass']);
});