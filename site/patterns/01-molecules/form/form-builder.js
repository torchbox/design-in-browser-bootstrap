import Pikaday from 'pikaday';

/*
    Datepicker library
    https://github.com/dbushell/Pikaday
    
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
    constructor(node) {
        let picker = new Pikaday({ 
            field: document.getElementById('datepicker')
        });
    }
}

new FormBuilder();
