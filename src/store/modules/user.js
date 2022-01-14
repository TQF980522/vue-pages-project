/* 模块B */
import { 
  getAccessToken, 
  setAccessToken, 
  removeAccessToken, 
  setLoginToken, 
  removeLoginToken 
} from '@/utils/auth'
// import { login, loginout, accesstoken } from '@/services/index' //接口模拟（index文件中login...等已经删除），需要自行重新书写
const state = {
  access_token: '',
  login_token: '',
  user_info: null,
  is_read: false,
}

const mutations = {
  UPDATE_ACCESS_TOKEN(state, payload) {
    state.access_token = payload
  },
  UPDATE_LOGIN_TOKEN(state, payload) {
    state.login_token = payload
  },
  UPDATE_USER_INFO(state, payload) {
    state.user_info = payload
  },
  UPDATE_READ(state, payload) {
    state.is_read = payload
  }
}

const actions = {
  //获取鉴权token
  AccessToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      // accesstoken().then(res => {
      //   if (res.code == 1) {
      //     setAccessToken(res.data.token)
      //     commit('UPDATE_ACCESS_TOKEN', res.data.token)
      //     resolve(res.data.token)
      //   }
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  Login({ commit }, data) {
    const mobile = data.phone.trim()
    const password = data.password
    return new Promise((resolve, reject) => {
      // login({ mobile, password }).then(res => {
      //   setLoginToken(res.data.logintoken)
      //   let user_info = {}
      //   user_info.mobile = res.data.mobile
      //   user_info.nickname = res.data.nickname
      //   commit('UPDATE_USER_INFO', user_info)
      //   commit('UPDATE_LOGIN_TOKEN', res.data.logintoken)
      //   resolve(res)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  LoginOut({ commit }) {
    return new Promise((resolve, reject) => {
      // loginout().then(res => {
      //   removeAccessToken() //清除access_token
      //   removeLoginToken() //清除login_token
      //   commit('UPDATE_ACCESS_TOKEN', undefined)
      //   commit('UPDATE_USER_INFO', null)
      //   commit('UPDATE_LOGIN_TOKEN', undefined)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
