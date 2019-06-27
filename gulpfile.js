const gulp = require('gulp'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    eslint = require('gulp-eslint'),
    browsersync = require('browser-sync').create();

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/'
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function clean() {
  return del(['./dist/']);
}

function js(){
  return gulp
    .src(['./src/scripts/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'))
    .pipe(browsersync.reload({ stream:true }));
}

function html() {
    return gulp.src(__dirname+'/src/*.html')
      .pipe(gulp.dest('dist'))
      .pipe(browsersync.reload({ stream:true }));
};

function gulpSass() {
  return gulp
    .src('./src/sass/**/*.sass')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browsersync.reload({ stream:true }));
}

function images() {
  return gulp
    .src('./src/img/**/*')
    .pipe(newer('./dist/img'))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false,
              collapseGroups: true
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest('./dist/img'))
    .pipe(browsersync.reload({ stream:true }));
}

function jslibs(){
  return gulp.src(['./src/scripts/libs/*.js'])
    .pipe(gulp.dest('./dist/scripts/libs/'));
}

function watchFiles() {
  gulp.watch('./src/sass/**/*.sass', gulpSass).on('change', browsersync.reload);
  gulp.watch('./src/scripts/libs/*.js', jslibs);
  gulp.watch('./src/scripts/**/*', js);
  gulp.watch('./src/*.html', html).on('change', browsersync.reload);
  gulp.watch('./src/img/**/*', images);
}

gulp.task('watch', gulp.parallel(watchFiles, browserSync));
gulp.task('build', gulp.series(clean, js, jslibs, html, gulpSass, images));