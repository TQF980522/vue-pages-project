import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// 引入模块
import app from './modules/app'
import user from './modules/user'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user
  },
  getters,
  plugins: [createPersistedState()]
})

export default store
