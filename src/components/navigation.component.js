import {mainComponent} from '../core/mainComponent'

export class Navigation extends mainComponent {
    constructor(id) {
        super(id)

        this.tabs = []
    } 

    init() {
        this.$elem.addEventListener('click', tabsChange.bind(this))
    }

    registerTabs(tabs) {
        this.tabs = tabs
    }


}

function tabsChange(event) {
    event.preventDefault()
    if(event.target.classList.contains('tab')){
            document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active')
        })
        event.target.classList.add('active')

        const activeTab = this.tabs.find(tab => tab.name === event.target.dataset.name)
        this.tabs.forEach(tab => tab.component.hide())
        activeTab.component.show()
       
       
    }
}