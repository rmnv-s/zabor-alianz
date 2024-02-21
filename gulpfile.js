const { src, dest, watch, parallel, series } = require("gulp");
const sass = require("gulp-dart-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify-es").default;

const del = require("del");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
    port: 8080,
    browser: "Arc",
    notify: false,
  });
}

function scripts() {
  return (
    src(["node_modules/jquery/dist/jquery.js", "src/js/script.js"])
      .pipe(concat("script.min.js"))
      // .pipe(concat('script.js'))
      .pipe(uglify())
      .pipe(dest("src/js"))
      .pipe(browserSync.stream())
  );
}

function styles() {
  return (
    src("src/scss/main.scss")
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(concat("main.min.css"))

      // .pipe(sass({ outputStyle: "expanded" }))
      // .pipe(concat("main.css"))

      .pipe(
        autoprefixer({
          overrideBrowserslist: ["last 10 version "],
          cascade: true,
          grid: true,
        })
      )
      .pipe(dest("src/css"))
      .pipe(browserSync.stream())
  );
}

function images() {
  return src("src/img/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("build/img"));
}

function source() {
  return src(
    [
      "src/css/main.min.css",
      "src/fonts/**/*",
      "src/js/script.min.js",
      "src/*html",
    ],
    { base: "src" }
  ).pipe(dest("build"));
}

function watching() {
  watch(["src/scss/**/*.scss"], styles);
  watch(["src/js/**/*.js", "!src/js/script.min.js"], scripts);
  // watch(['src/js/script.min.js'], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function cleanSrc() {
  return del("./build");
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;

exports.images = images;
exports.cleanDist = cleanSrc;

exports.build = series(cleanSrc, images, source, scripts);
exports.default = parallel(scripts, browsersync, watching);
