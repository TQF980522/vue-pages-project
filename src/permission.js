import router from '@/router'
import store from '@/store'
import { getLoginToken } from '@/utils/auth'
import Navigator from '@/assets/js/navigator.js'

const whiteList = [ '/', '/index.html']

router.beforeEach((to, from, next) => {
  console.log('用户是否登录?', getLoginToken() ? '已登录' : '未登录')
  if (getLoginToken()) {
    /* has token*/
    if (to.path === '/login.html') {
      Navigator.openRouter({
        path: '/', // 跳转地址
      })
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      let redirect = to.fullPath && to.fullPath.match(/(\w+)\.html/g);
      Navigator.openRouter({
        name: 'login.html', // 跳转地址
        query: {
          redirect: redirect && redirect[0]
        }
      })
    }
  }
})

router.afterEach(() => {
})
