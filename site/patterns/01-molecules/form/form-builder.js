import Pikaday from 'pikaday';

class Datepicker {
    constructor(node) {
        this.bindEvents();
    }

    bindEvents() {
        let picker = new Pikaday({ 
            field: document.getElementById('datepicker') 
        });
    }
}

new Datepicker();
