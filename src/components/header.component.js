import {mainComponent} from '../core/mainComponent'

export class Header extends mainComponent {
    constructor(id){
        super(id)
    }

    init(){
        if(localStorage.getItem('Visit')){
            this.hide()
            const section = document.querySelector('.js-section')
            section.classList.remove('hide')
        }
        const button = document.querySelector('.promo-button-js')
        button.addEventListener('click', hidePromo.bind(this))
    }
}

function hidePromo() {
    localStorage.setItem('Visit', true)
    this.hide()
    const section = document.querySelector('.js-section')
    section.classList.remove('hide')
}