import Siema from 'siema';

class Carousel {
    constructor() {
        this.runCarousel();
    }

    runCarousel() {
        const carousel = new Siema();
        document.querySelector('.prev').addEventListener('click', () => carousel.prev());
        document.querySelector('.next').addEventListener('click', () => carousel.next());
    }
}

new Carousel();
