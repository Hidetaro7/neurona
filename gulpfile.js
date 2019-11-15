// nodebrew v8.11.4

var gulp = require("gulp");

// Pug
var pug = require("gulp-pug");
var fs = require("fs");
//var data = require("gulp-data");
var htmlbeautify = require("gulp-html-beautify");
var path = require("path");

// CSS
var scss = require("gulp-sass");
var csscomb = require("gulp-csscomb");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var assets = require("postcss-assets");
var pleeease = require("gulp-pleeease");
const sassGlob = require("gulp-sass-glob");

// JS
//var uglify = require('gulp-uglify');

// Image
var imagemin = require("gulp-imagemin");

// Utility
var cache = require("gulp-cached");
var changed = require("gulp-changed");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var runSequence = require("run-sequence");
var rimraf = require("rimraf");

// 開発用ディレクトリ
var dev = {
  root: "src/",
  pug: ["src/pug/**/*.pug", "!src/**/_*.pug", "!src/pug/{,**/}*のコピー.pug"],
  data: "src/_data/",
  css: "src/**/*.scss",
  jsWatch: "src/**/*.js",
  image: "src/assets/img/{,**/}*.{png,jpg,gif,svg}",
  imageWatch: "src/assets/img/{,**/}*"
};

// テスト用ディレクトリ
var dest = {
  root: "public/",
  html: "public/",
  css: "public/css/",
  image: "public/img/",
  js: "public/js"
};

// .pugをコンパイル
gulp.task("pug", function() {
  return (
    gulp
      .src(["src/pug/**/*.pug", "!src/**/_*.pug", "!src/{,**/}*のコピー.pug"])
      .pipe(
        plumber({
          errorHandler: notify.onError("Error:  <%= error.message %>")
        })
      )
      //.pipe(cache('html'))
      .pipe(
        pug({
          basedir: "dev",
          pretty: true
        })
      )
      .pipe(
        htmlbeautify({
          indent_size: 2
        })
      )
      .pipe(gulp.dest(dest.root))
      .pipe(browserSync.reload({ stream: true }))
  );
});

// scssをコンパイル
gulp.task("scss", function() {
  return gulp
    .src(dev.css)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error:  <%= error.message %>")
      })
    )
    .pipe(sassGlob())
    .pipe(scss())
    .pipe(csscomb())
    .pipe(
      postcss([
        assets({
          basePath: "public/",
          loadPaths: ["img/"],
          relative: "/" // img/とcss/の相対的な位置
        })
      ])
    ) // cssでの画像のパス
    .pipe(
      postcss([
        autoprefixer({
          browsers: ["last 2 version"]
        })
      ])
    )
    .pipe(
      pleeease({
        minifier: false
        //mqpacker: true
      })
    )
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({ stream: true }));
});

// JS
gulp.task("js", function() {
  return gulp
    .src(dev.jsWatch)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error:  <%= error.message %>")
      })
    )
    .pipe(gulp.dest(dest.root))
    .pipe(browserSync.reload({ stream: true }));
});

// 画像
gulp.task("image", function() {
  return gulp
    .src(dev.image)
    .pipe(changed(dest.image))
    .pipe(
      plumber({
        errorHandler: function(err) {
          console.log(err.messageFormatted);
          this.emit("end");
        }
      })
    )
    .pipe(
      imagemin({
        progressive: true,
        optimizationLevel: 7
      })
    )
    .pipe(gulp.dest(dest.image))
    .pipe(browserSync.reload({ stream: true }));
});

// browser-sync
gulp.task("server", function() {
  browserSync({
    server: {
      baseDir: dest.root
    },
    notify: true,
    scrollRestoreTechnique: "cookie"
  });
});

// ファイルを監視
gulp.task("watch", ["build"], function() {
  //  gulp.watch("src/{,**/}*.html",['html']);
  gulp.watch("src/pug/{,**/}*.pug", ["pug"]);
  gulp.watch(dev.css, ["scss"]);
  gulp.watch(dev.jsWatch, ["js"]);
  gulp.watch(dev.image, ["image"]);
});

// 開発に使用するタスク
// `gulp`タスクにbrowser-syncを追加
// ローカルサーバーを起動し、リアルタイムに更新を反映
gulp.task("default", function() {
  runSequence("watch", "server");
});

// 出力用のディレクトリを削除
gulp.task("clean:dest", function(cb) {
  return rimraf(dest.root, cb);
});

// 一連のタスクを処理
gulp.task("build", function() {
  runSequence(["pug", "scss", "js", "image"]);
});

// htdocsを削除してからビルド
gulp.task("public", ["clean:dest"], function() {
  runSequence(["pug", "scss", "js", "image"]);
});
