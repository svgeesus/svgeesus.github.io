

await Inspire.importsLoaded;
await Inspire.plugins.loaded.prism.loaded;

Prism.hooks.add("before-all-elements-highlight", function(env) {
	env.elements = env.elements.filter(e => !e.matches(".prism-ignore, .prism-ignore *"));
});