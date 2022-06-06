

var topics = $("#topics ul");
console.log(topics);
$$("section > header.slide").forEach(function(slide) {
	var li = document.createElement("li");
	li.style.backgroundImage = slide.style.backgroundImage;
	li.textContent = $("h1", slide).textContent;
	topics.appendChild(li);
});