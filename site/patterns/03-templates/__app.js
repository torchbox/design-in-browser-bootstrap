/*
	This file is an example of how ES6 classes can be used inline
    next to the relevant markup and styling

	Please review and consider the approach and ensure it works 
	for your project if you plan on copying and pasting this 
	file and layout.
*/

import $ from "~/site/javascript/globals";

class App {
    constructor(node) {

    	// Class specific variables
        this.$node = $(node);
        this.$appNavigation = this.$node.find(".app__navigation");
        this.openClass = "open";

        // State
        this.state = {
            menu: {
                open: false
            }
        };

        // Bind events
        this.bindEvents();
    }

    menuOpen() {
        this.$appNavigation.addClass(this.openClass);
        this.state.menu.open = true;
    }

    menuCose() {
        this.$appNavigation.removeClass(this.openClass);
        this.state.menu.open = false;
    }

    menuToggle() {
        if (this.state.menu.open) {
            this.menuCose();
        } else {
            this.menuOpen();
        }
    }

    bindEvents() {
        $(window).on("app:MobileMenuLink:toggle", () => {
            this.menuToggle();
        });
    }
}

$(".app").each(function(){
    new App(this);
});
