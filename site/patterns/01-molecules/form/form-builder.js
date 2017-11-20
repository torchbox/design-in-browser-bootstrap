import Pikaday from 'pikaday';

/*
    Datepicker library
    https://github.com/dbushell/Pikaday

    Browser support: IE 7+
    
    Useful configuration options:

        Set a date format
        `format: 'DD-MM-YYYY'`

        Set a theme wrapper class
        `theme: custom-theme-classname`

        Set a custom container
        `container: document.getElementById('container')`

        Callbacks
        `onSelect: function() {}`
*/

class FormBuilder {
    constructor() {
        let picker = new Pikaday({ 
            field: document.getElementById('datepicker')
        });
    }
}

new FormBuilder();
