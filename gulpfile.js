const gulp = require("gulp");
const rename = require("gulp-rename");
const fileinclude = require("gulp-file-include");
const postcss = require('gulp-postcss');

gulp.task("html", function() {
	return gulp.src(["**/*.tpl.html"])
		.pipe(fileinclude({
			basepath: "templates/"
		}).on("error", function(error) {
			console.error(error);
		}))
		.pipe(rename({ extname: "" }))
		.pipe(rename({ extname: ".html" }))
		.pipe(gulp.dest("."))
});

gulp.task('css', function () {
	return gulp.src(["**/*.src.css", "!node_modules/**"])
		.pipe(postcss([
			require('postcss-nesting')(),
			require("postcss-selector-matches")({
				lineBreak: true
			}),
			require('autoprefixer')({
				browsers: ["last 3 years"]
			}),
			require("postcss-custom-properties")({
				preserve: true,
				warnings: false
			})
		]))
		.pipe(rename({ extname: "" }))
		.pipe(rename({ extname: ".css" }))
		.pipe(gulp.dest('.'));
});

gulp.task("watch", function() {
	gulp.watch(["**/*.src.css"], ["css"]);
	gulp.watch(["**/*.tpl.html", "./templates/*.html"], ["html"]);
});

gulp.task("default", ["html", "css"]);
