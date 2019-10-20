// 导入路由模块
import Router from 'vue-router'
// 导入加载进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 导入路由组件
import Login from './views/login/login.vue'
import Index from '@home/index.vue'
import Main from '@home/routers/main.vue'
import publish from '@home/routers/article-publish.vue'
import ArList from '@home/routers/article-list.vue'
import CoList from '@home/routers/comment-list.vue'
import MaList from '@home/routers/material-list.vue'
import MaData from '@home/routers/material-data.vue'
import FaIndex from '@home/routers/fans-index.vue'
import FaInfo from '@home/routers/fans-info.vue'
import FaList from '@home/routers/fans-list.vue'
import UsCenter from '@home/routers/user-center.vue'
NProgress.configure({ easing: 'ease', speed: 200 })
let router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '/', name: 'Main', component: Main },
        { path: '/article/publish', name: 'publish', component: publish },
        { path: '/article/list', name: 'ArLish', component: ArList },
        { path: '/comment/list', name: 'CoLish', component: CoList },
        { path: '/material/list', name: 'MaList', component: MaList },
        { path: '/material/data', name: 'MaData', component: MaData },
        { path: '/fans/index', name: 'FaIndex', component: FaIndex },
        { path: '/fans/info', name: 'FaInfo', component: FaInfo },
        { path: '/fans/list', name: 'FaList', component: FaList },
        { path: '/user/center', name: 'UsCenter', component: UsCenter }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 在lint中 判等必须使用全等
  if (to.path !== '/login') {
    /*   console.log(to)
                                              console.log(from) */
    let userInfnfo = localStorage.getItem('userInfo')
    if (!userInfnfo) {
      router.push('/login')
    } else {
      NProgress.start()
      next()
    }
  } else {
    next()
  }
})
router.afterEach((to, from, next) => {
  NProgress.done()
})
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
