const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

/**
 * JS Compilation
 */
gulp.task('js', () => {
  const babel = require('gulp-babel');
  // const eslint = require('gulp-eslint');

  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    // .pipe(eslint())
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

/**
 * CSS Compilation
 */
gulp.task('css', () => {
  const autoprefixer = require('autoprefixer')
  const postcss = require('gulp-postcss');
  const nested = require('postcss-nested');
  const calc = require('postcss-calc');
  const atImport = require('postcss-import');
  const perfectionist = require('perfectionist');
  const postcssCustomMedia = require('postcss-custom-media');
  const postcssCustomProperties = require('postcss-custom-properties');


   return gulp.src('./src/css/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      atImport(),
      nested(),
      postcssCustomMedia(),
      // postcssCustomProperties({
      //   preserve: false
      // }),
      // calc(),
      autoprefixer({
        grid: 'no-autoplace'
      }),
      perfectionist({
        indentSize: 2
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

function watchFiles() {
  gulp.watch(['./src/css/**/*.css'], css);
  gulp.watch(['./src/js/**/*.js'], js);
}

const css = gulp.series(['css']);
const js = gulp.series(['js']);
const build = gulp.series(gulp.parallel(css, js));

exports.watch = gulp.series(watchFiles);
exports.build = build;
