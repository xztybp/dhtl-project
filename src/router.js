// 导入路由模块
import Router from 'vue-router'
// 导入路由组件
import Login from './views/login/login.vue'
import Index from '@home/index.vue'
import Main from '@home/routers/main.vue'
import Page1 from '@home/routers/page1.vue'
import Page2 from '@home/routers/page2.vue'
let router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '/', name: 'Main', component: Main },
        { path: 'main', name: 'main', component: Main },
        { path: 'page1', name: 'page1', component: Page2 },
        { path: 'page2', name: 'page2', component: Page1 }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  console.log(from)
  console.log(next)
  // 在lint中 判等必须使用全等
  if (to.path !== '/login') {
    let userInfnfo = localStorage.getItem('userInfo')
    if (!userInfnfo) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
