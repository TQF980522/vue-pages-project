/*
 * @Author: TANQIFENG
 * @Date: 2020-09-20 12:56:29
 * @LastEditTime: 2020-12-13 18:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /113GM/vue.config.js
 */
const port = process.env.port || process.env.npm_config_port || 8081 // dev port
const path = require('path')
const utils = require('./build/utils')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/pages/',//线上地址根据后端来配，如果域名后就直接是路由 则配置为 '/' ,其他自行拼接
module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  lintOnSave: false, // process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 打包后代码压缩加密,true为打开.false为关闭
  filenameHashing: false, // 打包后文件名哈希值,true为打开.false为关闭
  pages: utils.setPages(),
  devServer: {
    port: port,
    open: true,
    // host: '', // 指定使用一个 host。默认是 localhost
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_API_BASE_URL]: {
        target: `https://127.0.0.1/`, // 本地调试 自行修改 若配置了env.dev 中的VUE_APP_API_BASE_URL 该配置无效
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_API_BASE_URL]: ''
        }
      }
    },
    historyApiFallback: {
      rewrites: [
        { from: new RegExp(BASE_URL + 'index'), to: BASE_URL + 'index.html' },
      ]
    }
  },

  chainWebpack(config) {
    config.module.rules.delete('svg') // 重点:删除默认配置中处理svg,
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('assets', resolve('./src/assets'))
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
