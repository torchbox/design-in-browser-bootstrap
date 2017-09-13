/*
	Example of importing and using classes
*/
import AnimatedHeader from './components/AnimatedHeader';
import MobileNavigation from './components/MobileNavigation';

let appNav = new MobileNavigation({
    target      : '#app__nav',
    inSpeed     : 900,
    outSpeed    : 900
});

let appHeader = new AnimatedHeader({
    elementSelector	: '.app__header--animated',
    scrollSelector 	: '.app__page > .content',
    inSpeed     : 500,
    outSpeed    : 700
});


console.log( 'hello', appHeader, appNav );


/*
	Example of using jquery, importing functions from seperate files and running them
	TODO: Seperate and improve example
*/

import $ from './globals';
import positionSticky from './utility/position-sticky';

positionSticky(
	$('.cards--sticky .cards__title'),
	$( '.app__page > .content' ),
	55
);

// $('.cards__title').on( 'stuck', function( e ){
// 	console.log( 'ON, Demonstrate custom events on elements', e );
// });

// $('.cards__title').on( 'unstuck', function( e ){
// 	console.log( 'OFF, Demonstrate custom events on elements', e );
// });


/*
	Example of importing node module
*/

import FastClick from 'fastclick';

let fastclick = new FastClick(document.body);

/*
    EU Cookie Warning
    https://ico.org.uk/for-organisations/guide-to-pecr/cookies-and-similar-technologies/
*/
import CookieWarning from './components/EuCookie';
new CookieWarning();
