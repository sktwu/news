import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY = "toutiao-user"

export default new Vuex.Store({
  state: {
    // 当前用户的登录状态(token等数据)
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      // 将数据放到本地存储，进行持久化操作
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
