/* eslint-env node */
/* global exports */
const { src, dest, parallel, watch } = require('gulp');
const browsersync = require('browser-sync').create();
const reload = browsersync.reload;
const sass = require('gulp-dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifycss = require('gulp-clean-css');
const rename = require('gulp-rename');
const sassGlob = require('gulp-sass-glob');
const csscomb = require('gulp-csscomb');
const plumber = require('gulp-plumber');

function css() {
    'use strict';
    return src('sass/main.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({ grid: true }))
        .pipe(csscomb())
        .pipe(sourcemaps.write())
        .pipe(dest('assets/css/'))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('assets/css/'))
        .pipe(reload({stream: true}));
}

function newCss() {
    'use strict';
    return src('sass/inverted-triangle.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer({ grid: true }))
        .pipe(csscomb())
        .pipe(sourcemaps.write())
        .pipe(dest('assets/css/'))
        .pipe(minifycss())
        .pipe(sourcemaps.write())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest('assets/css/'))
        .pipe(reload({stream: true}));
}

function serve() {
    'use strict';
    browsersync.init({
        logPrefix: 'Saga for Ghost',
        port: 3000
    });

    watch('sass/**/*.scss', css);
    watch(['./*.hbs', './partials/*.hbs'], () => {
        reload();
    });
    watch('assets/**/*.js', () => {
        reload();
    });
}

function newServe() {
    'use strict';
    browsersync.init({
        logPrefix: 'Saga for Ghost',
        port: 3000
    });

    watch('sass/**/*.scss', newCss);
    watch(['./*.hbs', './partials/*.hbs'], () => {
        reload();
    });
    watch('assets/**/*.js', () => {
        reload();
    });
}

exports.css = css;
exports.newcss = newCss;
exports.server = serve;
exports.default = parallel(css, serve);
exports.newdefault = parallel(newCss, newServe);
