import request from '@/utils/request'

export const getUserInfo = (params) => {
  return request({
    url: '/sys/getUserInfo',
    method: 'GET',
    params
  })
}
