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

export default animateElement;
