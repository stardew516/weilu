//加载插件
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    miniCss = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    baseurl = 'src/';

// 语法检查
gulp.task('jshint', function () {
 return gulp.src(baseurl + 'js/module/*.js')
     .pipe(jshint());
});

//sass编译
gulp.task('makeSass', function () {
    return sass(baseurl + 'statics/css/sass/**/*.scss', {
            sourcemap: true,
            style: 'compressed'
        })
        .on('error',sass.logError)
        .pipe(sourcemaps.write('maps',{
            includeContent: false,
            sourceRoot: 'source'
        }))
        .pipe(gulp.dest(baseurl + 'statics/css/sass/'))
});

gulp.task('watchSass', function () {
    gulp.watch(baseurl + 'statics/css/sass/**/*.scss', ['makeSass']); //当所有sass文件发生改变时，调用makeSass任务
});

// 监视文件的变化
gulp.task('watch', function () {
 gulp.watch(baseurl + '*.js', ['jshint']);
});

// 注册缺省任务
gulp.task('default', ['jshint', 'watch','watchSass']);