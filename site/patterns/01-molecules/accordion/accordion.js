import $ from '~/site/javascript/globals';

class Accordion {

    constructor( ) {
        this.bindEvents();
    }

    toggleAccordion(eventObject) {

        // Find current target
        var $toggle = $( eventObject.currentTarget );

        // Check for items already open and remove open class, but not the one clicked
        $('.js-accordion__toggle').not($toggle).parent().removeClass('open');

        // Toggle class to parent of clicked item
        $toggle.parent().toggleClass('open');

    }

    bindEvents() {
        $('.js-accordion__toggle').on('click', (eventObject) => this.toggleAccordion(eventObject) );
    }

}

$('.js-accordion').each(function() {
    new Accordion(this);
});
