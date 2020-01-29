import {mainComponent} from '../core/mainComponent'
import {apiService} from '../services/api.service'
import {Loader} from '../components/loader.component' 

export class Favorite extends mainComponent {
    constructor (id) {
        super(id)
    }

    init(){
        this.$elem.addEventListener('click', linkClick.bind(this))
    }


    onShow(){
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const  html = renderList(favorites)
        this.$elem.insertAdjacentHTML('afterbegin', html)
    }

    onhide(){
        this.$elem.innerHTML = ''
    }
}

async function linkClick (event) {
    event.preventDefault()
    if(event.target.classList.contains('js-link')) {
        const postId = event.target.dataset.id
        const loader = new Loader('loader')
        loader.show()
        const post = await apiService.fetchPostsById(postId)
        this.$elem.innerHTML = '' 
        loader.hide() 
        this.$elem.insertAdjacentHTML('afterbegin', renderPost(post))
        
    }
}


function renderList (list = []){
    if(list && list.length){
        return `
        <ul>
        ${list.map(i => `<li><a href = "#" class = "js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
        </ul>
        `
    }

    return `<p class = "center">Вы пока ничего не добавили</p>`
}

function renderPost (post){
    const tag = post.type === 'news' 
    ?   '<li class="tag tag-blue tag-rounded">Новость</li>'
    :   '<li class="tag tag-yellow tag-rounded">Статья</li>'

    let button = `<button class="button-round button-small button-danger" data-id="${post.id}">Удалить</button>`


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
                ${button}
            </div>
        </div>
    `

}