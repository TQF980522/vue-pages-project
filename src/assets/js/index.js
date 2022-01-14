import Validate from './validate.js'

import Navigator from './navigator.js'
import publicComponentsInstall from '@/components/publicComponentsInstall'
import elementComponentsInstall from '@/components/elementComponentsInstall'
// svgIcon
import '@/assets/icons/index'
// 全局通用样式
import '@/assets/css/main.less'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css' // 使用的是swiper版本号为6.0以下的
// import 'swiper/swiper-bundle.css'; //swiper版本号为6.0以上的的css的引入方式
import _ from 'lodash'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
// vue-cookies
import VueCookies from 'vue-cookies'
//动画库
import animated from 'animate.css'
//上传
import uploader from 'vue-simple-uploader'
//复制
import VueClipboard from 'vue-clipboard2'
//注册全局meta修改
import Meta from 'vue-meta'
//图片裁剪
import VueCropper from 'vue-cropper'

//路由鉴权
import '@/permission.js' // permission control

export default (Vue) => {
  // 如果是非线上环境，不加载 VConsole
  if (process.env.NODE_ENV !== 'production') {
    // var VConsole = require('vconsole/dist/vconsole.min.js')
    // var vConsole = new VConsole()
    Vue.config.performance = true
  }
  Validate
  Vue.$openRouter = Vue.prototype.$openRouter = Navigator.openRouter
  Vue.use(publicComponentsInstall)
  Vue.use(elementComponentsInstall)
  Vue.use(VueAwesomeSwiper)
  Vue.prototype._ = _
  Vue.use(preview, {
    maxSpreadZoom: 1, // 控制预览图最大的倍数，默认是2倍，我这里改成了原图
    fullscreenEl: false, // 控制是否显示右上角全屏按钮
    closeEl: true, // 控制是否显示右上角关闭按钮
    tapToClose: true, // 点击滑动区域应关闭图库
    shareEl: false, // 控制是否显示分享按钮
    zoomEl: false, // 控制是否显示放大缩小按钮
    counterEl: true, // 控制是否显示左上角图片数量按钮
    arrowEl: false, // 控制如图的左右箭头（pc浏览器模拟手机时）
    tapToToggleControls: true, // 点击应切换控件的可见性
    clickToCloseNonZoomable: true // 点击图片应关闭图库，仅当图像小于视口的大小时
  })
  Vue.use(VueCookies)
  Vue.use(animated)
  Vue.use(uploader)
  Vue.use(VueClipboard)
  Vue.use(Meta)
  Vue.use(VueCropper)
  Vue.prototype.$cookies = VueCookies
}
