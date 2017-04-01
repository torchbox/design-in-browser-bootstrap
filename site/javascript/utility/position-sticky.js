import $ from '../globals';

/*
    UNDER DEVELOPMENT
    areYouStuck?;
    Fire events when an element with `position: sticky;` is stuck/unstuck
    Add CSS classes to elements that are stuck/unstuck
*/
function positionSticky( $elems, $context ) {

    if( !$elems ){
        console.error( 'positionSticky requires $elem' );
        return false;
    }

    var $stickyItems        = $elems,
        $scrollContainer    = $context ? $context : $( window ), // traditionally; $( window )
        resizeTimer, loadTimer;

    function checkStuck( $item, scrollPos ){

        var itemPos = $item.offset().top - $context[0].getBoundingClientRect().top;
        // console.log( 'update values', itemPos );

        if( itemPos === 0 && !$item.stuck ){
            $item.addClass( 'stuck' );
            $item.trigger( 'stuck' );
            $item.stuck = true;
        } else if( itemPos != 0 && $item.stuck ) {
            $item.removeClass( 'stuck' );
            $item.trigger( 'unstuck' );
            $item.stuck = false;
        }

    }

    $stickyItems.each(function(){

        var $item = $( this );

        $item.stuck = false; // default to unstuck

        $scrollContainer.on( 'load', function( e ){
            checkStuck( $item, e.currentTarget.scrollTop );
        });

        // Passive event listener here!
        $scrollContainer.on( 'scroll', function( e ){
            checkStuck( $item, e.currentTarget.scrollTop );
        });

        $( window ).on( 'resize', function( e ){
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout(function(){
                checkStuck( $item, e.currentTarget.scrollTop );
            }, 100 );
        });

    });

}

export default positionSticky;
