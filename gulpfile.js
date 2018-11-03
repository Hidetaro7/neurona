const fs = require("fs-extra");
const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const sassGlob = require("gulp-sass-glob");
const moduleImporter = require("sass-module-importer");
const pug = require("gulp-pug");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const cssnext = require("postcss-cssnext");
const scss = require("postcss-scss");
const stylefmt = require("stylefmt");
const imagemin = require("gulp-imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const reload = browserSync.reload;
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const pugPath = "./src/pug/**/*.pug";
const htmlPath = "./public/**/*.html";
const ignorePugPath = "!./src/pug/**/_*.pug";
const imgPath = "./src/img/**";
const sassPath = "./src/scss/**/*.scss";
const jsPath = "./src/js/**/*.js";

// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

gulp.task("templates", () => {
  const YOUR_LOCALS = {
    message: "BrowserSync"
  };
});
gulp.task("html-watch", ["templates"], reload);

/**
 * Compile pug files into HTML
 */

/* gulp.task('templates', () => {
	const YOUR_LOCALS = {
		message: 'This app is powered by gulp.pug recipe for BrowserSync'
	};

	return gulp
		.src([pugPath, ignorePugPath])
		.pipe(plumber())
		.pipe(pug({
			locals: YOUR_LOCALS,
			pretty: true,
			basedir: './src/pug/'
		}))
		.pipe(gulp.dest('./public/'));
}); */

/**
 * Important!!
 * Separate task for the reaction to `.pug` files
 */
//gulp.task('pug-watch', ['templates'], reload);

/**
 * task for image optimization
 */
gulp.task("imagemin", () => {
  fs.removeSync("./public/img");
  return gulp
    .src(imgPath)
    .pipe(plumber())
    .pipe(
      imagemin([
        mozjpeg({ quality: 85, progressive: true }),
        pngquant({ quality: "70-85" }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: true }]
        })
      ])
    )
    .pipe(gulp.dest("./public/img/"));
});

/**
 * Sass task for automatically formats
 */
gulp.task("stylefmt", () => {
  return gulp
    .src(sassPath)
    .pipe(plumber())
    .pipe(
      postcss([stylefmt]),
      { syntax: scss }
    )
    .pipe(gulp.dest("./src/scss"));
});

/**
 * Sass task for live injecting into all browsers
 */
gulp.task("sass", ["stylefmt"], () => {
  const processors = [cssnext()];
  return gulp
    .src(sassPath)
    .pipe(plumber())
    .pipe(sassGlob())
    .pipe(sass({ importer: moduleImporter() }))
    .on("error", sass.logError)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(postcss(processors))
    .pipe(gulp.dest("./public/css"))
    .pipe(reload({ stream: true }));
});

gulp.task("bundle", () => {
  // ☆ webpackStreamの第2引数にwebpackを渡す☆
  return webpackStream(webpackConfig, webpack)
    .on("error", function handleError() {
      this.emit("end"); // Recover from errors
    })
    .pipe(gulp.dest(""));
});

/**
 * Serve and watch the scss/pug files for changes
 */
gulp.task("default", ["bundle", "sass", "templates"], function() {
  browserSync({ server: "./public" });
  gulp.watch(sassPath, ["sass"]);
  gulp.watch(htmlPath, ["html-watch"]);
  gulp.watch(jsPath, ["bundle"]);
});
