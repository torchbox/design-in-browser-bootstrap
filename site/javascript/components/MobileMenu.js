import $ from '../globals';
import animateElement from '../utility/animate-element';

class MobileMenu {

    constructor(opts) {

        // Provide defaults for passed options
        let {
            target      : target        = '#js-mobile-menu--target',
            openClass   : openClass     = 'open',
            closeClass  : closeClass    = 'close',
            inSpeed     : inSpeed       = 600,
            outSpeed    : outSpeed      = 600
        } = (opts) ? opts:{};

        // Bind our options to the object
        this.$target    = $( target );
        this.$anchor    = $( 'a[href*="'+target+'"]' );
        this.openClass  = openClass;
        this.closeClass = closeClass;
        this.inSpeed    = inSpeed;
        this.outSpeed   = outSpeed;

        // Simple state
        this.state  = {
            open : false,
            busy : false
        };

        // Start the things...
        this.init();
    }
    openMenu(){
        // Set busy state
        this.state.busy = true;
        // Animate element
        animateElement( this.$target, this.openClass, 0, this.inSpeed, false, () => {
            this.state.open = true;
            this.state.busy = false;
        });
        // Animate anchors
        // animateElement( this.$anchors, this.openClass, 0, this.inSpeed );
    }
    closeMenu() {
        // Set busy state
        this.state.busy = true;
        // Animate element
        animateElement( this.$target, this.closeClass, 0, this.outSpeed, true, () => {
            this.state.open = false;
            this.state.busy = false;
        });
    }
    toggle() {

        if( this.state.busy ){
            return false;
        }

        if( this.state.open ){
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    _onClick(event) {
        event.preventDefault();
        this.toggle();
    }
    bindEvents() {
        // window.addEventListener('scroll', () => this.watch());
        this.$anchor.on('click', ( e ) => this._onClick( e ));
    }
    init(){
        // Test for elements?
        // Bind events
        this.bindEvents();
    }
}

export default MobileMenu;
