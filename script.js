/*
* When prev button is clicked, add class, '.for-prev' to '.stand-by-image', else, remove.
*/
const standByImages = document.querySelectorAll('.stand-by-image');
const state = {
	currentDirection: 'next',
	x0: null,
}

document.querySelectorAll('label.arrow-btn').forEach((btn, i) => {
	btn.addEventListener('click', e => {
		if (btn.className.includes('prev')) {
			// Prev button clicked
			console.log('prev clicked');
			addClassToStandByImages();
			if (state.currentDirection !== 'prev') {
				flipIdPosition(btn.getAttribute('for'), Math.floor(i / 2), 'prev');
			}
			
		} else {
			// Next button clicked
			console.log('next clicked');
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

/*
* Swipe events
*/
const gallery = document.querySelector('.gallery-container');

gallery.addEventListener('touchstart', handleSwipeStart, false);
gallery.addEventListener('mousedown', handleSwipeStart, false);
gallery.addEventListener('touchend', handleSwipeEnd, false);
gallery.addEventListener('mouseup', handleSwipeEnd, false)

function unifiedE(e) {
	return e.changedTouches ? e.changedTouches[0] : e;
}

function handleSwipeStart(e) {
	state.x0 = unifiedE(e).clientX;
}

function handleSwipeEnd(e) {
	const endX = unifiedE(e).clientX;
	const deltaX = endX - state.x0;
	console.log('delta: ', deltaX);
	if (Math.abs(deltaX) > 30) {
		if (deltaX > 0) {
			// trigger prev button
			toggleSwipe('prev');
		} else {
			// trigger next button
			toggleSwipe('next');
		}
	}
}

function toggleSwipe(direction) {
	if (direction === 'prev') {
		const targetPrevBtn = document.querySelector('.gallery input[type=radio]:checked ~ .prev-btn');
		//document.getElementById(targetPrevBtn.getAttribute('for')).checked = true;
		targetPrevBtn.click();
	} else if (direction === 'next') {
		const targetNextBtn = document.querySelector('.gallery input[type=radio]:checked ~ .next-btn');
		//document.getElementById(targetNextBtn.getAttribute('for')).checked = true;
		targetNextBtn.click();
	}
}


