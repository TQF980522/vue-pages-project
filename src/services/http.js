/*
 * @Author: TQF
 * @Date: 2020-05-04 21:27:02
 * @LastEditTime: 2020-05-08
 * @LastEditors: TQF
 * @Description:
 */
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

import { getAccessToken, removeAccessToken } from "@/utils/auth";
import md5 from 'js-md5';
// import VueCookies from 'vue-cookies'
// import router from '@/router'
// axios.defaults.timeout = 5 * 60 * 60
let timestamp = parseInt(new Date().getTime() / 1000)
let timestampStr = timestamp.toString()
let access_token = store && store.getters.access_token
axios.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  'AccessToken': getAccessToken() || access_token
  // Timestamp: timestamp,//当前时间戳（秒）
  // Signature: md5(timestampStr + md5(timestampStr))
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  // withCredentials: true, // send cookies when cross-domain requests
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // please modify it according to the actual situation
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 网络请求成功
    if (response.status === 200) {
      const res = response.data
      // if the custom code is not 20000, it is judged as an error.
      if (res.code === 0) {
        let { status } = res.data
        if (!status && status == 0) {
          console.warn('access_token失效')
          removeAccessToken() //清除cookie 缓存的access_token
          store.commit('user/UPDATE_ACCESS_TOKEN', null)
          //token失效 重新获取token
          store.dispatch('user/AccessToken').then(res => {
            if (res) {
              window.location.reload();
            }
          })
        }
        return res
      } else {
        return res
      }
    } else {
      // 网络请求报错
      switch (response.status) {
        case 404:
          Message({
            message: '找不到资源',
            type: 'error',
            duration: 5 * 1000,
            customClass: 'qytx__toast-error'
          })
          break
        case 500:
          Message({
            message: '服务器内部错误',
            type: 'error',
            duration: 5 * 1000,
            customClass: 'qytx__toast-error'
          })
          break
        default:
          Message({
            message: response.statusText,
            type: 'error',
            duration: 5 * 1000,
            customClass: 'qytx__toast-error'
          })
          break
      }
    }
  },
  error => {
    Message({
      message: '服务器内部错误',
      type: 'error',
      duration: 5 * 1000,
      customClass: 'qytx__toast-error'
    })
    return Promise.reject(error)
  }
)

export default service
