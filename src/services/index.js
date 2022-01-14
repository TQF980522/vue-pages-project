
import http from './http'
import qs from 'qs';
// 示例接口
export function uploadFile(data) {
  return http({
    url: '/xxx',
    method: 'post',
    data: data
  })
}