import $ from '../globals';

/*
    UNDER DEVELOPMENT
    areYouStuck();
    Fire events for when an element with `position: sticky;` is stuck/unstuck
    Adds CSS classes to elements that are stuck/unstuck

    Elements must be given the class '.sticky' to be observed
*/
function positionSticky( $elems, $context ) {

    if( !$elems ){
        console.error( 'checkSticky requires $elem' );
        return false;
    }

    var $stickyItems        = $elems,
        $scrollContainer    = $context ? $context : $( window ), // traditionally; $( window )
        resizeTimer, loadTimer;

    function checkStuck( $item, scrollPos ){

        console.log( 'check stuck', $item.find( '.text__section-heading' ).text(), $item.stickyPos, scrollPos, $item.stuck );

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

        var stuckOffset     = +$item.css( 'top' ).split( 'px' )[0], // get top value used, make sure it is a number
            containerRect   = $context[0].getBoundingClientRect(),
            itemRect        = $item[0].getBoundingClientRect(),
            topPos          = itemRect.top - containerRect.top,
            stuckAt         = topPos - stuckOffset; // where the elementr509,m /'will actually stick

        console.log( 'update values', containerRect, itemRect, topPos, stuckAt );

        $item.stickyPos = stuckAt;

    }

    $stickyItems.each(function(){

        var $item = $( this );

        $item.stuck = false;    // default to unstuck
        requestAnimationFrame( () => updateValues( $item ) );

        // setInterval( () => updateValues( $item ), 1000 );

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

                console.log( ' :: resize called' );
                requestAnimationFrame( () => updateValues( $item ) );
                // checkStuck( $item, e.currentTarget.scrollTop );

            }, 100 );
        });

        // $context.find( 'img' ).on( 'load', function( e ){
        //     console.log( ' :: load fired' );
        //     clearTimeout( loadTimer );
        //     loadTimer = setTimeout(function(){

        //         console.log( ' :: load called' );
        //         requestAnimationFrame( () => updateValues( $item ) );

        //     }, 100 );
        // });

    });

}

export default positionSticky;
