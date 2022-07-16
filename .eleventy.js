// .eleventy.js



module.exports = config => {

	const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

	config.addPlugin(syntaxHighlight);

	const markdownIt = require("markdown-it");
	const markdownItFootnote = require("markdown-it-footnote");

	let options = {
		html: true, // Enable HTML tags in source
		linkify: true // Autoconvert URL-like text to links
	};

	// configure the library with options
	let markdownLib =  markdownIt(options).use(markdownItFootnote);
	// set the library to process markdown files
	config.setLibrary("md", markdownLib);


	let data = {
		"layout": "page.njk",
		"permalink": "{{ page.filePathStem }}.html"
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	config.setDataDeepMerge(true);

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: "<!-- more -->"
	});

	config.addFilter("md", function (content = "") {
		return markdownIt({ html: true }).render(content);
	});

	return {
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		}
	};
};
