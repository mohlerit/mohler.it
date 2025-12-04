const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const { exec } = require('child_process');

// Tailwind CSS build
function buildCss(cb) {
    exec('npx tailwindcss -i ./src/css/tailwind.css -o ./dist/css/style.css --minify', (err, stdout, stderr) => {
        if (err) console.error(stderr);
        cb();
    });
}

// Minify JS
function buildJs() {
    return gulp.src('./src/js/script.js')
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js'));
}

// BrowserSync server
function serve(cb) {
    browserSync.init({
        proxy: 'mohlerit.local'
    });
    cb();
}

// Reload browser
function reload(cb) {
    browserSync.reload();
    cb();
}

// Watch files
function watchFiles() {
    gulp.watch('./*.html', gulp.series(buildCss, reload));
    gulp.watch('./src/css/**/*.css', gulp.series(buildCss, reload));
    gulp.watch('./src/js/**/*.js', gulp.series(buildJs, reload));
}

// Default task
exports.default = gulp.series(buildCss, buildJs, serve, watchFiles);
exports.build = gulp.series(buildCss, buildJs);
