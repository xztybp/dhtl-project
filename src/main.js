import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import axios from 'axios'
import router from './router.js'
import store from './store'
import ElementUI from 'element-ui'
import JSONbigint from 'json-bigint'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import VueFroala from 'vue-froala-wysiwyg'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/reset.css'
Vue.use(VueFroala)
Vue.use(Router)
Vue.use(ElementUI)
// 设置 axios 的拦截器
// 请求拦截器：发送请求之前执行
axios.interceptors.request.use(function (config) {
  /*  console.log(config) */
  // 判断是用户是否登录
  let userInfo = JSON.parse(localStorage.getItem('userInfo'))
  /* console.log(userInfo) */
  if (userInfo) {
    // 在请求头中添加 token
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 改变响应数据:由于在js中数值类型可识别位数有限制,所以需要JSONbigint 插件进行转换
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONbigint.parse(data)
  } catch (err) {
    console.log(err)
    return data
  }
}]
// 设置响应拦截器
axios.interceptors.response.use(function (response) {
  // 当服务器响应信息回来时执行
  // 响应拦截器如果要返回信息，必须 return response
  return response.data.data
}, function (error) {
  // 当响应的状态码 >= 400 时执行   4~~ 客户端错误 5~~ 服务器错误
  return Promise.reject(error)
})
Vue.prototype.$axios = axios
// 设置基地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
