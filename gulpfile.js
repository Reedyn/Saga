/* jshint node: true */
var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload;
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    minifycss = require('gulp-minify-css');
    rename = require('gulp-rename');

gulp.task('styles', function() {
    gulp.src(['sass/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(rename({
        basename: 'style'
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css/'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles'], function() {  
    browsersync({
        logPrefix: "Saga for Ghost",
        port: 3000
    });
    
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch('*.hbs').on('change', reload);
    gulp.watch('assets/**/*.js').on('change', reload);
    
});

gulp.task('tidy', function() {
    gulp.src(['sass/*.scss'])
        .pipe(csscomb());
    
});
          
gulp.task('default', ['serve']);