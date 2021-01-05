

/*
* When prev button is clicked, add class, '.for-prev' to '.stand-by-image', else, remove.
*/
const standByImages = document.querySelectorAll('.stand-by-image');
const state = {
	currentDirection: 'next',
}

document.querySelectorAll('label.arrow-btn').forEach((btn, i) => {
	btn.addEventListener('click', e => {
		console.log('button classname', btn.className);
		if (btn.className.includes('prev')) {
			addClassToStandByImages();
			if (state.currentDirection !== 'prev') {
				console.log('switch to prev');
				// transformX the next image by -100%
				console.log('A index; ', btn.getAttribute('for'));
				flipIdPosition(btn.getAttribute('for'), 'prev');
			}
			
		} else {
			removeClassToStandByImages();
			if (state.currentDirection !== 'next') {
				console.log('switch to next');
				// transformX the next image by 100%
				console.log('B index: ', btn.getAttribute('for'));
				flipIdPosition(btn.getAttribute('for'), 'next');
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

function flipIdPosition(id, direction) {
	const targetRadioButton = document.getElementById(id);
	targetRadioButton.classList.add('in-transit');
	state.currentDirection = direction;
	setTimeout(() => {
		targetRadioButton.classList.remove('in-transit');
	}, 500)
}

function toggleTransitionClass(direction) {
	standByImages.forEach(image => {
		image.classList.add('flipping-direction');
		setTimeout(() => {
			image.classList.remove('flipping-direction');
			state.currentDirection = direction;
		}, 500);
	});
}
