import {Header} from './components/header.component'
import {Navigation} from './components/navigation.component'
import {Favorite} from './components/favorite.component'
import {Posts} from './components/posts.component'
import {Create} from './components/create.component'


new Header('header')
const nav = new Navigation('navigation')

const favor = new Favorite('favorite')
const posts = new Posts('posts')
const create = new Create('create')

nav.registerTabs([
    {name: 'create', component: create}, //name должен совпадать с дата атрибутом элемента в dom дереве
    {name: 'posts', component: posts},
    {name: 'favor', component: favor}
])

    




