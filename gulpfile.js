var gulp = require('gulp'),
  consolidate = require('gulp-consolidate'),
  iconfont = require('gulp-iconfont');

gulp.task('default', function() {
  return gulp
    .src('src/svg/**/*.svg')
    .pipe(
      iconfont({
        fontName: 'open-scouts',
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
      })
    )
    .on('glyphs', function(glyphs, options) {
      gulp
        .src('src/open-scouts-iconos-fonts.css')
        .pipe(
          consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime()
          })
        )
        .pipe(gulp.dest('dist/css/'));

      gulp
        .src('src/index.html')
        .pipe(
          consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName
          })
        )
        .pipe(gulp.dest('dist')); // el index lo muevo a doc, que es donde levanta la page de github
    })
    .pipe(gulp.dest('dist/fonts'));
});
