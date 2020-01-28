export class mainComponent {
    constructor(id){
        this.$elem = document.getElementById(id)
        this.init()
    }

    init(){}

    onShow(){}

    onhide(){}

    show(){
        this.$elem.classList.remove('hide')
        this.onShow()
    }

    hide(){
        this.$elem.classList.add('hide')
        this.onhide()
    }
}