'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const prop = require('./package.json');
const minify = require('gulp-minify-css');
const $ = require('gulp-load-plugins')();
const head =
    '/*\r\n* Cirrus Reset ' +
    prop.version +
    `\r\n* Stanley Lim, Copyright ${new Date().getFullYear()}\r\n* https://github.com/Cirrus-UI/Cirrus-Reset\r\n*/\r\n`;

gulp.task('compile', () => {
    return gulp
        .src(['./src/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe($.concat('reset.css'))
        .pipe($.header(head))
        .pipe($.size())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('compile:watch', () => {
    gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task(
    'minify',
    gulp.series('compile', () => {
        return gulp
            .src(['./dist/reset.css'])
            .pipe(
                minify(
                    {
                        level: {
                            1: {
                                all: true,
                                normalizeUrls: false,
                            },
                            2: {
                                all: false,
                                removeDuplicateRules: true,
                                reduceNonAdjacentRules: true,
                                removeDuplicateFontRules: true,
                                removeDuplicateMediaBlocks: true,
                                mergeAdjacentRules: true,
                                mergeIntoShorthands: true,
                                mergeMedia: true,
                                mergeNonAdjacentRules: true,
                                mergeSemantically: false,
                                removeEmpty: true,
                            },
                        },
                    },
                    (details) => {
                        console.log(details.name + ': ' + details.stats.originalSize);
                        console.log(details.name + '-min: ' + details.stats.minifiedSize);
                    }
                )
            )
            .pipe($.header(head))
            .pipe($.size())
            .pipe($.concat('reset.min.css'))
            .pipe(gulp.dest('./dist/'));
    })
);

gulp.task('default', gulp.series('minify'));
