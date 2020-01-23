import {mainComponent} from '../core/mainComponent'

export class Navigation extends mainComponent {
    constructor(id) {
        super(id)
    } 

    init() {
        this.$elem.addEventListener('click', tabsChange.bind(this))
    }
}

function tabsChange(event) {
    event.preventDefault()
    if(event.target.classList.contains('tab')){
            document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active')
        })
        event.target.classList.add('active')

    }
}