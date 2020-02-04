import {mainComponent} from '../core/mainComponent'
import {apiService} from '../services/api.service'
import {TransformService} from '../services/transform.service'
import {Loader} from '../components/loader.component'


export class Posts extends mainComponent {
    constructor (id) {
        super(id)
        
    }

    init(){
        this.$elem.addEventListener('click', addFavorites.bind(this))
    }
    async onShow(){
        const loader = new Loader('loader')
        loader.show()
        const data = await apiService.fetchPosts()
        const posts = TransformService.fbObjecttoArray(data)
        
        const html = posts.map(post => renderPosts(post))

        loader.hide()
        this.$elem.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onhide(){
        this.$elem.HTML = ''
    }

}

function renderPosts (post){
    const tag = post.type === 'news' 
    ?   '<li class="tag tag-blue tag-rounded">Новость</li>'
    :   '<li class="tag tag-yellow tag-rounded">Статья</li>'
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    const candidat = favorites.find(p => p.id === post.id) 
    let button = ''
    const changeButton = `<button class="button-round button-small buttonChange" data-change="change" data-id="${post.id}">Редактировать</button>`
    if(candidat){
         button = `<button class="button-round button-small button-danger" data-id="${post.id}">Удалить из избранного</button>`
    } else {
        button = `<button class="button-round button-small button-primary" data-id="${post.id}" data-name="${post.title}"> Сохранить в избранное</button>`
    }

    return `
        <div class="panel">
            <div class="panel-head">
                <p class="panel-title">${post.title}</p>
                <ul class="tags">
                ${tag}
                </ul>
            </div>
            <div class="panel-body">
                <p class="multi-line">${post.fulltext}.</p>
            </div>
            <div class="panel-footer w-panel-footer">
                <small>${post.data}</small>
                ${changeButton}
                ${button}
            </div>
        </div>
    `

}

function addFavorites(event) {
    const $button = event.target
    
    const id = $button.dataset.id
    const title = $button.dataset.name

    const change = $button.dataset.change
    
    
    if(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || []
        const candidat = favorites.find(p => p.id === id)
        
        if(candidat){
            $button.textContent = 'Сохранить в избранное'
            $button.classList.add('button-primary')
            $button.classList.remove('button-danger')
            favorites = favorites.filter(p =>p.id !== id)
        }else{
            $button.textContent = 'Удалить из избранного'
            $button.classList.remove('button-primary')
            $button.classList.add('button-danger')

            favorites.push({id, title})
            
        }

        localStorage.setItem('favorites', JSON.stringify(favorites))
        
    }

    if (change) {
        changePost(event)
    }
    
}

async function changePost(event) {
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active')
    })
    const active = document.getElementById('create-post')
    active.classList.add('active')
    const create = document.getElementById('create')
    create.classList.remove('hide')
    const posts = document.getElementById('posts')
    posts.classList.add('hide')

    const postId = event.target.dataset.id
    const post = await apiService.fetchPostsById(postId)

    let allInput = create.querySelectorAll('.form-change')
    allInput.forEach(elem => {
        if(elem.name == 'title'){
            elem.value = post['title']
        }
        if(elem.name == 'fulltext'){
            elem.value = post['fulltext']
        }

    })
}