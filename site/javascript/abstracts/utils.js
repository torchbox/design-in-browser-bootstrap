import $ from '../globals';

// Not sure where this should go, works fine here! Maybe put it in globals, or globales extenstions?
// http://stackoverflow.com/a/18621161
$.fn.removeClassRegex = function(regex) {
    return $(this).removeClass(function(index, classes) {
        return classes.split(/\s+/).filter(function(c) {
            return regex.test(c);
        }).join(' ');
    });
};

function animateElement( $elem, className, delay, duration, unload, callback ){

    var name        = 'anim--' + className,
        setup       = 32, // 2 Frames to setup
        start       = setup + delay,
        animations  = [];

    // Remove any existing animation classes on the element
    $elem.removeClassRegex(/^anim--/);
    // Add transition setup properties
    $elem.addClass( name + '-setup' );
    // Remove any CSS unload optimisations
    $elem.removeClass( 'unload' );

    // Setup transition properties
    var setTransitionProps = window.setTimeout(function setTransitionProps(){
        $elem.addClass( name + '-transition' );
    }, setup/2 );

    // Start the animation
    var startAnimation = window.setTimeout(function startAnimation(){
        $elem.addClass( name );
        $elem.removeClass( name + '-setup' );
    }, start );
    
    // Animation completed
    var endAnimation = window.setTimeout(function endAnimation(){
        // Animation Complete

        // We don't want to the opportunity to stop the animation anymore
        $elem.removeData( 'animating' );
        // Data attr for removing animations
        // Or not... doesn't seem to work as well
        $elem.data( 'animated', name ); 
        // Remove transition property
        $elem.removeClass( name + '-transition' );

        // Hook for CSS optimisations
        if( unload ){
            $elem.addClass( 'unload' );
        }
        
        if( callback ){
            callback();
        }
    }, duration + start );

    // Get and clear any old timeouts
    if( $elem.data( 'animating' ) ){

        animations = $elem.data( 'animating' );
        for (var i=0; i<animations.length; i++) {
            clearTimeout(animations[i]);
        }

    } 

    // We are officially animating now, rest of it is callbacks
    $elem.data( 'animating', [ setTransitionProps, startAnimation, endAnimation ] );

}

/*
    areYouStuck();
    Fire events for when an element with `position: sticky;` is stuck/unstuck
    Adds CSS classes to elements that are stuck/unstuck

    Elements must be given the class '.sticky' to be observed
*/
function checkSticky() {

    var $stickyItems        = $( '.sticky' ),
        $scrollContainer    = $( 'main' ), // traditionally; $( window )
        resizeTimer;

    function checkStuck( $item, scrollPos ){

        console.log( 'check stuck', scrollPos, $item.stickyPos, $item.stuck );

        if( scrollPos > $item.stickyPos && !$item.stuck ){
            $item.addClass( 'stuck' );
            $item.trigger( 'stuck' );
            $item.stuck = true;
        } else if( scrollPos <= $item.stickyPos && $item.stuck ) {
            $item.removeClass( 'stuck' );
            $item.trigger( 'unstuck' );
            $item.stuck = false;
        }

    }

    function updateValues( $item ){

        var offset  = +$item.css( 'top' ).split( 'px' )[0], // get top value used, make sure it is a number
            topPos  = $item.offset().top, // get top position (even if it is stuck, it preserves offset)
            stuckAt = topPos - offset; // where the element will actually stick

        // console.log( 'update values', offset, topPos, stuckAt );

        $item.stickyPos = stuckAt;

    }

    $stickyItems.each(function(){

        var $item = $( this );

        $item.stuck = false;    // default to unstuck
        updateValues( $item );  // update vars

        $scrollContainer.on( 'load', function( e ){
            checkStuck( $item, e.currentTarget.scrollTop );
        });

        $scrollContainer.on( 'scroll', function( e ){
            checkStuck( $item, e.currentTarget.scrollTop );
        });

        $scrollContainer.on( 'resize', function( e ){
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout(function(){

                updateValues( $item );
                checkStuck( $item, e.currentTarget.scrollTop );

            }, 100 );
        });

    });

}

export { animateElement, checkSticky };
