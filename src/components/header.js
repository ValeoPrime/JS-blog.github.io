import {mainComponent} from '../core/mainComponent'

export class Header extends mainComponent {
    constructor(id){
        super(id)
    }

    init(){
        const button = document.querySelector('.promo-button-js')
        button.addEventListener('click', hidePromo.bind(this))
    }
}

function hidePromo() {
    this.hide()
}