import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import markdownItAnchor from "markdown-it-anchor";

// .eleventy.js
export default config => {
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

	let md = markdownIt({
		html: true,
		linkify: true,
		typographer: true,
	})
	.disable("code")
	.use(markdownItFootnote)
	.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.headerLink(),
		level: 2,
	})
	;
	config.setLibrary("md", md);

	config.addFilter("md", function (content = "") {
		return md.render(content);
	});


	return {
		templateFormats: ["md", "njk"],
		dir: {
			output: "."
		}
	};
};
