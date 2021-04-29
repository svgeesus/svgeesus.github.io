module.exports = config => {
	let data = {
		"layout": "page.njk",
		"permalink": "{{ page.filePathStem }}.html"
	};

	for (let p in data) {
		config.addGlobalData(p, data[p]);
	}

	return {
		dir: {
			input: "*.njk",
			output: "."
		}
	};
};
