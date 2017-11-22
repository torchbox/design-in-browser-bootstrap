import Siema from 'siema';

class Carousel {

    constructor() {

        // Set carousel elements
        this.carouselName = '.carousel';
        this.prev = document.querySelector('.carousel__prev');
        this.next = document.querySelector('.carousel__next');
        this.paginationContainer = document.querySelector('.carousel__pagination');
        this.paginationButton = 'carousel__button';
        this.duration = 500;

        this.bindEvents();
    }

    runCarousel() {

        /*
            Carousel library
            https://github.com/pawelgrzybek/siema#options

            Browser support: IE 10+
        */

        this.carousel = new Siema({
            selector: this.carouselName,
            duration: this.duration,
            easing: 'cubic-bezier(0.65, 0.05, 0.35, 1)'
        });
    }

    addCarouselControls() {

        // Button navigation
        this.prev.addEventListener('click', () => this.carousel.prev());
        this.next.addEventListener('click', () => this.carousel.next());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {

            // Left arrow
            if (e.keyCode === 37) {
                this.carousel.prev()
            }

            // Right arrow
            else if (e.keyCode === 39) {
                this.carousel.next()
            }
        });
    }

    addCarouselPagination() {
        let pagination = this.paginationContainer;
        let paginationButton = this.paginationButton;

        Siema.prototype.addPagination = function() {
            for (let i = 0; i < this.innerElements.length; i++) {
                let button = document.createElement('button');
                button.className = paginationButton;
                button.textContent = i;
                button.addEventListener('click', () => this.goTo(i));
                pagination.appendChild(button);
            }
        }

        this.carousel.addPagination();
    }

    bindEvents() {
        this.runCarousel();
        this.addCarouselControls();
        this.addCarouselPagination();
    }
}

new Carousel();
