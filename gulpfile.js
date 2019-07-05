const { watch, src, dest, parallel, series } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const del = require('del');


function bsServer() {
	browserSync({
	  server: {
		baseDir: 'app'
	  },
	  notify: false,
	  // tunnel: true,
	  // tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	}); 
  }

  function html() {
	return src('app/*.html')
	  .pipe(browserSync.reload({ stream: true }))
  }

function css() {
return src('app/sass/**/*.sass')
	.pipe(sass())
	.pipe(rename({basename: "style", suffix: '.min'}))
	.pipe(autoprefixer({cascade: false}))
	.pipe(minifyCSS())
	.pipe(dest('app/css'))
	.pipe(browserSync.stream())
}

function js() {
	return src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/owl.carousel/owl.carousel.min.js',
		'app/libs/PageScroll2id/jquery.malihu.PageScroll2id.min.js',
		'app/libs/mmenu/jquery.mmenu.all.min.js',
		'app/js/common.js', // Always at the end
	])
	  .pipe(concat('script.min.js'))
	  .pipe(uglify())
	  .pipe(dest('app/js'))
	  .pipe(browserSync.reload({ stream: true }))
}

function imgMin() {
	return src('app/img/**/*')
	.pipe(imagemin())
	.pipe(dest('dist/img'));
}

function watching() {
	watch('app/sass/**/*.sass', css);
	watch(['app/js/common.js'], js);
	watch('app/*.html', html);
}

async function remove() {
  return await del.sync('dist');
}

function moveCss() {
  return src('app/css/*.css')
  .pipe(dest('dist/css'))
}

function moveJs() {
  return src('app/js/script.min.js')
  .pipe(dest('dist/js'))
}

function moveHtml() {
  return src('app/*.html')
    .pipe(dest('dist/'))
}

function moveFonts() {
	return src('app/fonts/**/*')
	  .pipe(dest('dist/fonts'))
  }

exports.js = js;
exports.css = css;
exports.moveHtml = moveHtml;
exports.moveFonts = moveFonts;
exports.remove = remove;
exports.moveCss = moveCss;
exports.moveJs = moveJs;
exports.build = series(remove, moveHtml, moveCss, moveJs, moveFonts, imgMin);
exports.default = parallel(bsServer, css, js, watching);
