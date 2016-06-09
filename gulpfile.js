var gulp  = require("gulp");
var copy  = require("gulp-copy");

gulp.task("update", function() {
	gulp.src(["../wysie/wysie.min.js", "../wysie/wysie.min.js.map"]).pipe(gulp.dest("."));
	gulp.src(["../wysie/wysie.css"]).pipe(gulp.dest("css"));
});

gulp.task("watch", function() {
	gulp.watch(["../wysie/wysie.min.js", "../wysie/wysie.css"], ["update"]);
});

gulp.task("default", ["update"]);
