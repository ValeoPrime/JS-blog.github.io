import {mainComponent} from '../core/mainComponent'
import {Form} from '../core/form'
import {Validators} from '../core/validators'

export class Create extends mainComponent {
    constructor (id) {
        super(id)

        
    }

    init (){
        
        this.$elem.addEventListener('submit', mySendForm.bind(this))
        
        this.Form = new Form(this.$elem, {
            title:[Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        })
        
    }
    
}
 
 

function mySendForm(event) {
    event.preventDefault()
    if(this.Form.isValid()){
        const formData = {
            type: this.$elem.type.value, 
            fulltext: this.$elem.fulltext.value,
            title: this.$elem.title.value
        }
        console.log(formData);
        this.Form.clear()
    } 
    

}