import {mainComponent} from '../core/mainComponent'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'

export class Posts extends mainComponent {
    constructor (id) {
        super(id)
    }

    async onShow(){
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjecttoArray(data)

        
    }
}