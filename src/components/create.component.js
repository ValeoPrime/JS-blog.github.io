import {mainComponent} from '../core/mainComponent'
import {Form} from '../core/form'
import {Validators} from '../core/validators'
import { apiService} from '../services/api.service'


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
 
 

async function mySendForm(event) {
    event.preventDefault()
    if(this.Form.isValid()){
        const formData = {
            type: this.$elem.type.value, 
            fulltext: this.$elem.fulltext.value,
            title: this.$elem.title.value,
            data: new Date().toLocaleDateString()
        }

        await apiService.createPost(formData)

        
        this.Form.clear()

        alert('Запись сохранена в БД')
    } 
    

}