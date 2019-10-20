import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {}
  },
  mutations: {
    getUserInfo (state, value) {
      // 只要子组件一调用这个方法就给state重新赋值
      state.userInfo = value
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
      /*  console.log(this.state.userInfo) */
      /* console.log(this.userInfo) */ // undefined
      /* console.log(state === this.state) */ // 默认值为state  true
    },
    changeUserInfo (state, value) {
      state.userInfo.name = value.name
      state.userInfo.intro = value.intro
      state.userInfo.id = value.id
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    changeUserImg (state, value) {
      state.userInfo.photo = value.photo
      localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
    }
  }
})
