import Cookies from 'js-cookie';

class CookieWarning {

    constructor( ) {
        this.dismissButton =         document.querySelector('.js-cookie-dismiss');
        this.messageContainer =      document.querySelector('.js-cookie-message');
        this.cookieName =            'gnhs-cookie';
        this.cookieValue =           'agree to cookies';
        this.cookieDuration =        365;
        this.activeClass =           'active';
        this.inactiveClass =         'inactive';

        this.checkCookie();
        this.bindEvents();
    }

    checkCookie() {
        // If cookie doesn't exists
        if( !Cookies.get(this.cookieName) ){
            this.messageContainer.classList.add( this.activeClass );
        }
    }

    applyCookie(event) {
        // prevent default link action
        event.preventDefault();
        // Add classes
        this.messageContainer.classList.remove( this.activeClass );
        this.messageContainer.classList.add( this.inactiveClass );
        // Set cookie
        Cookies.set(this.cookieName, this.cookieValue, { expires: this.cookieDuration });
    }

    bindEvents() {
        // Bind dismiss functionality
        this.dismissButton.addEventListener( 'click', (event) => this.applyCookie(event) );
    }

}

export default CookieWarning;
