module.exports = config => {
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

	return {
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		}
	};
};
