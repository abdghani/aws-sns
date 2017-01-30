var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var files = [
                'views/main/index.js',
                'public/js/constant/appConfig.js',
                'public/js/route.js',
                'public/js/factory/ajaxfac.js',
                'views/about/about.js',
                'views/access/access.js',
                'views/api/api.js',
                'views/home/home.js',
                'views/implementation/implementation.js',
                'views/demo/demo.js'
];

gulp.task('bundle-js',function(){
        gulp.src(files)
        .pipe(concat('mainjs.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./'));
});

gulp.task('watch',function(){
    gulp.watch('public/**/*.js',['bundle-js']);
    gulp.watch('public/**/*.js',['bundle-js']);
    gulp.watch('views/**/*.js',['bundle-js']);
});

gulp.task('default', ['bundle-js','watch']);