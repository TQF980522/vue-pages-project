import Cookies from 'vue-cookies'

const AccessToken = 'AccessToken'
const LoginToken = 'LoginToken'

export function getAccessToken() {
  return Cookies.get(AccessToken)
}

export function setAccessToken(token) {
  return Cookies.set(AccessToken, token)
}

export function removeAccessToken() {
  return Cookies.remove(AccessToken)
}

//获取用户token
export function getLoginToken() {
  return Cookies.get(LoginToken)
}

export function setLoginToken(token) {
  return Cookies.set(LoginToken, token)
}

export function removeLoginToken() {
  return Cookies.remove(LoginToken)
}