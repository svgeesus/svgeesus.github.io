const gulp = require("gulp");
const rename = require("gulp-rename");
const fileinclude = require("gulp-file-include");

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

gulp.task("watch", function() {
	//gulp.watch(["**/*.src.css"], ["css"]);
	gulp.watch(["**/*.tpl.html", "./templates/*.html"], ["html"]);
});

gulp.task("default", ["html"]);
