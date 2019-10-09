import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Axios from 'axios'
import router from './router.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
Vue.use(Router)
Vue.use(ElementUI)
Vue.prototype.$axios = Axios
// 设置基地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
