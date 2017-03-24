import Point from './point';

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y);
        this.color = color;
    }
    toString() {
        return super.toString() + ' in ' + this.color;
    }
}

const cp = new ColorPoint(25, 8, 'green');

console.log( 'hello', cp );

// test importing node modules

import leftPad from 'left-pad';

console.log( 'leftPad', leftPad('foo', 5) );


// Import jQuery as a CommonJS module from ./vendor/ (via globals.js)
// and then import an old jQuery plugin that's NOT defined as a proper module.
// jQuery has to be imported in a separete file to ensure that
// the global jQuery object that the jquery-test-plugin references exist.
// https://github.com/rollup/rollup/issues/592#issuecomment-205783255

import jQuery from './globals';

console.log( 'jQuery', jQuery('body') );

import './vendor/jquery-test-plugin';

console.log( 'testPlugin', jQuery.testPlugin );


// someGlobalVariable is specified in .eslintrc, so there shouldn't be a warning about it
console.log(someGlobalVariable);
