import Siema from 'siema';

class Carousel {
    constructor() {
        this.carousel = new Siema();
        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
        this.bindEvents();
    }

    runCarouselControls() {

        // Button navigation
        this.prev.addEventListener('click', () => this.carousel.prev());
        this.next.addEventListener('click', () => this.carousel.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {

            // Left arrow key
            if (e.keyCode === 37) {
                this.carousel.prev()
            }

            // Right arrow key
            else if (e.keyCode === 39) {
                this.carousel.next()
            }
        });
    }

    bindEvents() {
        this.runCarousel();
        this.runCarouselControls();
    }
}

new Carousel();
