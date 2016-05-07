
var gulp  = require("gulp");
var copy = require("gulp-copy");

var wysieFiles = ["../wysie/wysie.min.js", "../wysie/wysie.css"];

gulp.task("update", function() {
	var files = "wysie permissions storage node unit expression functions scope primitive primitive.imgur collection prettyprint debug storage.dropbox storage.github"
	            .split(" ").map(path => "src/" + path + ".js");
	files.unshift("../bliss/bliss.js");
	files.unshift("../stretchy/stretchy.js");

	return gulp.src(wysieFiles).pipe(copy("."));
});

gulp.task("watch", function() {
	gulp.watch(wysieFiles, ["update"]);
});

gulp.task("default", ["update"]);
