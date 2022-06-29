// .eleventy.js
const markdownIt = require("markdown-it");


module.exports = config => {

	const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

	config.addPlugin(syntaxHighlight);


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
		console.log(content)
		return markdownIt({ html: true }).render(content);
	});

	return {
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		}
	};
};
