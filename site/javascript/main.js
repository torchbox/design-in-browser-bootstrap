
/*
	Example of importing and using classes
*/

import MobileMenu from './components/MobileMenu';

let mobileNavigation = new MobileMenu({
    target      : '#app__nav',
    inSpeed     : 900,
    outSpeed    : 900
});

console.log( 'hello', mobileNavigation );


/*
	Example of importing and using functions
*/

import $ from './globals';
import positionSticky from './utility/position-sticky';

positionSticky( $('.cards__title'), $( '.app__page > .content' ) );

$('.cards__title').on( 'stuck', function( e ){
	console.log( 'ON, Demonstrate custom events on elements', e );
});

$('.cards__title').on( 'unstuck', function( e ){
	console.log( 'OFF, Demonstrate custom events on elements', e );
});
