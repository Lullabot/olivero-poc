const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

/**
 * CSS Compilation
 */
gulp.task('css', () => {
  const postcss = require('gulp-postcss');
  const nested = require('postcss-nested');
  const calc = require('postcss-calc');
  const atImport = require('postcss-import');
  const perfectionist = require('perfectionist');
  const postcssCustomMedia = require('postcss-custom-media');

   return gulp.src('./src/style.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      atImport(),       // Import all @import statements.
      nested(),         // Process nested media queries and selectors.
      postcssCustomMedia(),
      calc(),           // Combine similar units that are referenced in the CSS calc() function.
      perfectionist({   // Format CSS so it's easier to understand and troubleshoot.
        indentSize: 2
      })
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'))
});

function watchFiles() {
  gulp.watch(['./src/**/*.css'], css);
}

const css = gulp.series(['css']);

exports.watch = gulp.series(watchFiles);;
