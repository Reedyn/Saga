/* jshint node: true */

var gulp = require('gulp'),
    browsersync = require('browser-sync'),
    reload = browsersync.reload,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    zip = require('gulp-zip'),
    sassGlob = require('gulp-sass-glob'),
    plumber = require('gulp-plumber');

gulp.task('styles', function() {
    gulp.src(['sass/main.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(rename({
            basename: 'style'
        }))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('assets/css/'))
        .pipe(sourcemaps.write())
        .pipe(minifycss())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('assets/css/'))
        .pipe(reload({stream: true}));
});

gulp.task('serve', ['styles'], function() {  
    browsersync({
        logPrefix: "Saga for Ghost",
        port: 3000
    });
    
    gulp.watch('sass/**/*.scss', ['styles']);
    gulp.watch(['./*.hbs','./partials/*.hbs']).on('change', reload);
    gulp.watch('assets/**/*.js').on('change', reload);
    
});

gulp.task('create-package', ['styles'], function(){
    var pjson = require('./package.json'),
        version = pjson.version;
    gulp.src(['assets/**/*', '**/*.hbs', 'package.json', 'LICENSE'])
        .pipe(zip('Saga-v'+version+'.zip'))
        .pipe(gulp.dest('./')
    );
});
          
gulp.task('default', ['serve']);