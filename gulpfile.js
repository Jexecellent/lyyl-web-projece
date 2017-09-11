const gulp = require('gulp');
const stylus = require('gulp-stylus');
const base64 = require('gulp-base64');


gulp.task('cssmin', () => {
  return gulp.src('./public/src/css/*.styl')
        .pipe(stylus({
          compress:true
        }))
        .pipe(base64({
          baseDir:'public/static/css',
          extensions:['png','svg',/\.jpg#datauri$/i],
          maxImageSize:8*1024,
          debug:true
        }))
        .pipe(gulp.dest('./public/static/css'))
});

gulp.task('watch', () => {
  gulp.watch('./public/src/css/*.styl', ['cssmin'])
  .on('change', (e) => {
    console.log(`File Change Deceted ${e.path} : ${e.type}`);
  })
})


gulp.task('default', ['cssmin']);