//公共接口模块

import http from './http'

/**
 * 示例
 * @param {*} xx 
 * @returns
 */
export function XXXapi(data) {
  return http({
    url: '/common/getStatus',
    method: 'post',
    data: data
  })
}

