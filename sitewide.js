function $$(selector, context) {
	return Array.from((context || document).querySelectorAll(selector));
}

// Highlight current menu item
function isCurrentURL(url) {
	return (!url.hash || url.hash == location.hash)
		&& url.pathname.replace(/\/$/, "") == location.pathname.replace(/\/$/, "");
}

function highlightCurrentItem() {
	$$("nav a").forEach(function(a) {
		a[(isCurrentURL(a)? "set" : "remove") + "Attribute"]("aria-current", "page");
	});
}

highlightCurrentItem();
addEventListener("hashchange", highlightCurrentItem);
