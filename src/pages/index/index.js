import Vue from 'vue'
import App from './index.vue'
import router from '@/router'
import store from '@/store/'
import entryConfig from '@/assets/js/index'

// 调用公共方法加载配置
entryConfig(Vue)

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
