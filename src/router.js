// 导入路由模块
import Router from 'vue-router'
// 导入路由组件
import Login from './views/login/login.vue'
import header from '@home/header.vue'
import Left from '@home/left.vue'
import Main from '@home/main.vue'
export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/index', components: { 'default': Left, 'header': header, 'main': Main } }
  ]
})
