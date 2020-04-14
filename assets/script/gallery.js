function Gallery(gallery) {
	if (!gallery) {
		throw new Error('No gallery found!');
	}

	//select element we need
	const images = Array.from(gallery.querySelectorAll('img'));
	const modal = document.querySelector('.modal');
	const prevBtn = modal.querySelector('.prev');
	const nextBtn = modal.querySelector('.next');
	let currentImage;

	function openModal() {
		//1 check if it is already open
		if (modal.matches('.open')) {
			console.info('modal already open');
			return; //stop form runnning
		}
		modal.classList.add('open');

		//event listeners only when modal is open
		modal.addEventListener('click', handleClickOutside);
		window.addEventListener('keyup', handleKeyUp);
		nextBtn.addEventListener('click', showNextImage);
		prevBtn.addEventListener('click', showPrevImage);
	}

	function closeModal() {
		modal.classList.remove('open');
		modal.removeEventListener('click', handleClickOutside);
		window.removeEventListener('keyup', handleKeyUp);
		nextBtn.removeEventListener('click', showNextImage);
		prevBtn.removeEventListener('click', showPrevImage);
	}

	function handleClickOutside(e) {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	}

	function handleKeyUp(e) {
		if (e.key === 'Escape') return closeModal(); //return powoduje zatrzymanie funkcji w przypadku wywołania kalwisza escape itp

		if (e.key === 'ArrowRight') return showNextImage();

		if (e.key === 'ArrowLeft') return showPrevImage();
	}
	function showNextImage() {
		showImage(currentImage.nextElementSibling || gallery.firstElementChild);
	}
	function showPrevImage() {
		showImage(currentImage.previousElementSibling || gallery.lastElementChild);
	}
	function showImage(el) {
		if (!el) {
			console.log('no image to show');
			return;
		}
		//update the modal with this unfo
		console.log(el);
		modal.querySelector('img').src = el.src;
		modal.querySelector('h2').textContent = el.title;
		modal.querySelector('figure p').textContent = el.dataset.description;
		currentImage = el;
		openModal();
	}

	images.forEach((image) => image.addEventListener('click', (e) => showImage(e.currentTarget)));
	images.forEach((image) =>
		image.addEventListener('keyup', (e) => {
			if (e.key === 'Enter') showImage(e.currentTarget);
		})
	);
	nextBtn.addEventListener('click', showNextImage);
	prevBtn.addEventListener('click', showPrevImage);
}

//use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
