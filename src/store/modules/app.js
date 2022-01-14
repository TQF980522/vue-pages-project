import VueCookies from 'vue-cookies'
import Fingerprint2 from 'fingerprintjs2'
const state = {
  isTopbarBlock: true, // 顶部栏是否显示
  currentRoute: 'index.html',
  fingerprintId: null
}

const mutations = {
  UPDATE_TOPBAR_BLOCK(state, payload) {
    state.isTopbarBlock = payload
  },
  UPDATE_CURRENT_ROUTER(state, payload) {
    state.currentRoute = payload
  },
  SET_FINGERPRINT_ID(state, payload) {
    state.fingerprintId = payload
  }
}

const actions = {
  getFingerprintId({ commit, state }) {
    Fingerprint2.get((components) => {
      const values = components.map((component, index) => {
        if (index === 0) {
          // 把微信浏览器里UA的wifi或4G等网络替换成空,不然切换网络会ID不一样 fee45449-6e1a-6537-58b6-1007d9db0258
          return component.value.replace(/\bNetType\/\w+\b/, '')
        }
        return component.value
      })
      let murmur = Fingerprint2.x64hash128(values.join(''), 31)
      let murmurArr = murmur.split('')
      let step = 8
      let count = 4
      for (let i = 0; i < murmurArr.length; i++) {
        if (i == step && count != 0) {
          murmurArr.splice(i, 0, '-')
          step = step + 5
          count = count - 1
        }
      }
      murmur = murmurArr.join('')
      commit('SET_FINGERPRINT_ID', murmur)
      VueCookies.set('fingerprintId', murmur)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
