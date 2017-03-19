import $ from './globals';


function checkSticky() {

    var $stickyItems = $( '.js-sticky' ),
        resizeTimer;

    function checkStuck( $item, scrollPos ){

        if( scrollPos >= $item.stickyPos && !$item.stuck ){
            $item.addClass( 'stuck' );
            $item.trigger( 'stuck' );
            $item.stuck = true;
        } else if( scrollPos < $item.stickyPos && $item.stuck ) {
            $item.removeClass( 'stuck' );
            $item.trigger( 'unstuck' );
            $item.stuck = false;
        }

    }

    function updateValues( $item ){

        var offset  = +$item.css( 'top' ).split( 'px' )[0], // get top value used, make sure it is a number
            topPos  = $item.offset().top, // get top position (even if it is stuck, it preserves offset)
            stuckAt = topPos - offset; // where the element will actually stick

        $item.stickyPos = stuckAt;

    }

    $stickyItems.each(function( e ){

        var $item = $( this );

        $item.stuck = false;    // default to unstuck
        updateValues( $item );  // update vars

        $( window ).on( 'load', function( e ){
            checkStuck( $item, e.currentTarget.scrollY );
        });

        $( window ).on( 'scroll', function( e ){
            checkStuck( $item, e.currentTarget.scrollY );
        });

        $( window ).on( 'resize', function( e ){
            clearTimeout( resizeTimer );
            resizeTimer = setTimeout(function(){

                updateValues( $item );
                checkStuck( $item, e.currentTarget.scrollY );

            }, 100 );
        });

    });

}

checkSticky();
