import $ from '../globals';

// Support passive event listeners?
// http://stackoverflow.com/questions/37721782/what-are-passive-event-listeners
// Snippet from: https://github.com/Modernizr/Modernizr/pull/1982/files
function supportsPassive(){
    var supportsPassiveOption = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassiveOption = true;
            }
        });
        window.addEventListener('test', null, opts);
    } catch (e) {
        // 
    }
    return supportsPassiveOption;
}


/*
    UNDER DEVELOPMENT
    areYouStuck?;
    Fire events when an element with `position: sticky;` is stuck/unstuck
    Add CSS classes to elements that are stuck/unstuck

    // IMPORTANT NOTE: If the scroll parent is animating, Javascript cannot seem to calculate the offset parent correctly
    // This could be remedied in a few ways, the most ideal is probably via events
    // The easiest and simplest solution is to delay the scroll response time to animate once the ui may have finished resizing
*/
function positionSticky( $elems, $context, responseTime ) {

    if( !$elems ){
        console.error( 'positionSticky requires $elem' );
        return false;
    }

    let $stickyItems        = $elems,
        $scrollContainer    = $context ? $context : $( window ),    // traditionally; $( window )
        response            = responseTime ? responseTime : 55,     // 
        resizeTimer;

    function checkStuck( $item ){

        console.warn( 'RAF' );

        let itemPos = $item.offset().top - $context.offset().top;
        // let itemPos = $item.offset().top - $context.offset().top;
        if( !$item.lastPos ){
            $item.lastPos = itemPos;
        }

        console.log( 'update values', $item.text().trim(), itemPos, $item.lastPos );

        if( itemPos === 0 && !$item.stuck ){
            $item.addClass( 'stuck' );
            $item.trigger( 'stuck' );
            $item.stuck = true;
        } else if( itemPos != 0 && $item.stuck ) {
            $item.removeClass( 'stuck' );
            $item.trigger( 'unstuck' );
            $item.stuck = false;
        }

        $item.lastPos = itemPos;

    }

    $stickyItems.each(function(){

        let $item = $( this );
        let scrollTimer;

        $item.stuck     = false; // default to unstuck
        $item.lastPos   = 0;

        function onScroll() {

            // Handle scroll inertia 
            if(scrollTimer) {
                clearTimeout(scrollTimer);
            }
            scrollTimer=setTimeout(() => {
                requestAnimationFrame( () => checkStuck( $item ) );
            }, response );

        }

        $scrollContainer.on( 'load', () => requestAnimationFrame( () => checkStuck( $item ) ) );

        $scrollContainer[0].addEventListener( 'scroll', onScroll, supportsPassive ? { passive: true } : false );

        $( window ).on( 'resize', function( e ){
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout(function(){
                requestAnimationFrame( () => checkStuck( $item ) );
            }, 100 );
        });

    });

}

export default positionSticky;
