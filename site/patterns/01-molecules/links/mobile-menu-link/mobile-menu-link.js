/*
    This file is an example of how ES6 classes can be used inline
    next to the relevant markup and styling

    Please review and consider the approach and ensure it works 
    for your project if you plan on copying and pasting this 
    file and layout.
*/

import $ from "~/site/javascript/globals";

class MobileMenuLink {
    constructor(node) {
        this.$node = $(node);
        this.bindEvents();
    }

    bindEvents() {
        this.$node.on("click", e => {
            e.preventDefault();
            $(window).trigger("app:MobileMenuLink:toggle");
        });
    }
}

$(".mobile-menu-link").each(function(){
    new MobileMenuLink(this);
});
