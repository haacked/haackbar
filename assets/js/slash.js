Haack.ready(function() {
	var images = document.querySelectorAll('.post-content img')
	images.forEach(function(img) {
		var title = img.title
		var parent = img.parentElement

		if (title && title != '') {
			var element = img
			if (parent.tagName == 'A') {
				element = parent;
			}
			element.insertAdjacentHTML('afterend', '<span class="caption">' + title + '</span>');
		}
	})
})
