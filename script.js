/*
* When prev button is clicked, add class, '.for-prev' to '.stand-by-image', else, remove.
*/
const standByImages = document.querySelectorAll('.stand-by-image');
const state = {
	currentDirection: 'next',
}

document.querySelectorAll('label.arrow-btn').forEach((btn, i) => {
	btn.addEventListener('click', e => {
		if (btn.className.includes('prev')) {
			// Prev button clicked
			addClassToStandByImages();
			if (state.currentDirection !== 'prev') {
				flipIdPosition(btn.getAttribute('for'), Math.floor(i / 2), 'prev');
			}
			
		} else {
			// Next button clicked
			removeClassToStandByImages();
			if (state.currentDirection !== 'next') {
				flipIdPosition(btn.getAttribute('for'), Math.floor(i / 2), 'next');
			}
		}

	}, false);
});

function addClassToStandByImages() {
	standByImages.forEach(image => {
		image.classList.add('for-prev');
	});
}

function removeClassToStandByImages() {
	standByImages.forEach(image => {
		image.classList.remove('for-prev');
	});
}

function flipIdPosition(id, currentIndex, direction) {
	const targetRadioButton = document.getElementById(id);
	const predecessorImage = standByImages[currentIndex];
	targetRadioButton.classList.add('in-transit');
	predecessorImage.classList.add('predecessor-image');
	state.currentDirection = direction;
	setTimeout(() => {
		targetRadioButton.classList.remove('in-transit');
	});
	setTimeout(() => {
		predecessorImage.classList.remove('predecessor-image');
	}, 500);
}

