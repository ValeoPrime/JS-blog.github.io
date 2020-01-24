export class mainComponent {
    constructor(id){
        this.$elem = document.getElementById(id)
        this.init()
    }

    init(){}

    show(){
        this.$elem.classList.remove('hide')
    }

    hide(){
        this.$elem.classList.add('hide')
    }
}