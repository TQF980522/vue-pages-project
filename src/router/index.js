import Vue from 'vue'
import Router from 'vue-router'
// 首页
const Index = resolve => {
  require.ensure(['@/pages/index/index.vue'], () => {
    resolve(require('@/pages/index/index.vue'))
  })
}

Vue.use(Router)

const base = `${process.env.BASE_URL}`

const router = new Router({
  mode: 'history',
  base: base,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: { title: '首页' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title // 设置页面 title
  }
  /* if (to.name === 'home') {
        // 拦截并跳转至 page2 单页
        Vue.$openRouter({
            name: 'page2'
        });
    }*/
  next()
})

export default router
