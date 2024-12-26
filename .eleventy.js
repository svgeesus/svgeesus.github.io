import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

// .eleventy.js
export default config => {
	config.addPlugin(syntaxHighlight);

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
