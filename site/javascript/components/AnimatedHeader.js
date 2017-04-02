import $ from '../globals';
import Headroom from '../vendor/headroom';
import animateElement from '../utility/animate-element';


class AnimatedHeader {

    constructor(opts) {

        // Provide defaults for passed options
        let {
            elementSelector : elementSelector   = '.app__header',
            scrollSelector  : scrollSelector    = window,
            openClass       : openClass         = 'open',
            closeClass      : closeClass        = 'close',
            inSpeed         : inSpeed           = 600,
            outSpeed        : outSpeed          = 600
        } = (opts) ? opts : {};

        // Bind our options to the object
        this.$element           = $( elementSelector );
        this.scrollContainer    = $( scrollSelector )[0];
        this.openClass          = openClass;
        this.closeClass         = closeClass;
        this.inSpeed            = inSpeed;
        this.outSpeed           = outSpeed;

        // Simple state
        this.state  = {
            open : true,
            busy : false
        };

        // Start the things...
        this.init();
    }

    show() {

        if( this.state.open ){
            return false;
        }

        this.state.open = true;

        animateElement( this.$element, this.openClass, 0, this.inSpeed, false, () => {
            this.state.busy = false;
        });
    }

    hide() {

        if( !this.state.open ){
            return false;
        }

        this.state.open = false;

        animateElement( this.$element, this.closeClass, 0, this.outSpeed, true, () => {
            this.state.busy = false;
        });
    }

    onPin() {
        this.show();
    }
    onUnpin() {
        this.hide();
    }
    onTop() {
        this.show();
    }
    onNotTop() {
        this.hide();
    }
    onBottom() {}
    onNotBottom() {}

    init(){
        
        let elem = $('.app__header')[0];
        let options = {
            scroller : this.scrollContainer,
            offset : 200,
            tolerance : {
                up      : 10,
                down    : 20
            },
            classes : {
                initial     : '',
                pinned      : 'app__header--pinned',
                unpinned    : 'app__header--unpinned',
                top         : 'app__header--top',
                notTop      : 'app__header--not-top',
                bottom      : 'app__header--bottom',
                notBottom   : 'app__header--not-bottom'
            },
            // : ]
            onPin       : () => this.onPin(),
            onUnpin     : () => this.onUnpin(),
            onTop       : () => this.onTop(),
            onNotTop    : () => this.onNotTop(),
            onBottom    : () => this.onBottom(),
            onNotBottom : () => this.onNotBottom()
        };
        let headroom = new Headroom( elem, options );
        headroom.init( );
    }

}

export default AnimatedHeader;
