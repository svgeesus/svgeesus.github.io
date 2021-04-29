const gulp = require("gulp");
const rename = require("gulp-rename");
const postcss = require('gulp-postcss');

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
	gulp.watch(["**/*.src.css"], gulp.series("css"));
});

gulp.task("default", gulp.parallel("css"));
