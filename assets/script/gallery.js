function Gallery(gallery) {
	if (!gallery) {
		throw new Error('No gallery found!');
	}
	this.gallery = gallery;
	//select element we need
	this.images = Array.from(gallery.querySelectorAll('img'));
	this.modal = document.querySelector('.modal');
	this.prevBtn = this.modal.querySelector('.prev');
	this.nextBtn = this.modal.querySelector('.next');

	//bind our method to the instance when we need it
	this.showNextImage = this.showNextImage.bind(this); //bind aloows us to explicity suply what will be equal to
	this.showPrevImage = this.showPrevImage.bind(this);
	this.handleKeyUp = this.handleKeyUp.bind(this);

	this.images.forEach((image) => image.addEventListener('click', (e) => this.showImage(e.currentTarget)));
	this.images.forEach((image) =>
		image.addEventListener('keyup', (e) => {
			if (e.key === 'Enter') this.showImage(e.currentTarget);
		})
	);
}

Gallery.prototype.openModal = function() {
	//1 check if it is already open
	if (this.modal.matches('.open')) {
		console.info('modal already open');
		return; //stop form runnning
	}
	this.modal.classList.add('open');

	//event listeners only when modal is open
	this.modal.addEventListener('click', this.handleClickOutside);
	window.addEventListener('keyup', this.handleKeyUp);
	this.nextBtn.addEventListener('click', this.showNextImage);
	this.prevBtn.addEventListener('click', this.showPrevImage);
};

Gallery.prototype.closeModal = function() {
	this.modal.classList.remove('open');
	this.modal.removeEventListener('click', this.handleClickOutside);
	window.removeEventListener('keyup', this.handleKeyUp);
	this.nextBtn.removeEventListener('click', this.showNextImage);
	this.prevBtn.removeEventListener('click', this.showPrevImage);
};

Gallery.prototype.handleClickOutside = function(e) {
	if (e.target === e.currentTarget) {
		this.closeModal();
	}
};

Gallery.prototype.handleKeyUp = function(e) {
	if (e.key === 'Escape') return this.closeModal(); //return powoduje zatrzymanie funkcji w przypadku wywołania kalwisza escape itp

	if (e.key === 'ArrowRight') return this.showNextImage();

	if (e.key === 'ArrowLeft') return this.showPrevImage();
};
Gallery.prototype.showNextImage = function() {
	this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
};
Gallery.prototype.showPrevImage = function() {
	this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
};
Gallery.prototype.showImage = function(el) {
	if (!el) {
		console.log('no image to show');
		return;
	}
	//update the modal with this unfo
	console.log(el);
	this.modal.querySelector('img').src = el.src;
	this.modal.querySelector('h2').textContent = el.title;
	this.modal.querySelector('figure p').textContent = el.dataset.description;
	this.currentImage = el;
	this.openModal();
};

//use it on the page

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));

console.log(gallery1, gallery2);
