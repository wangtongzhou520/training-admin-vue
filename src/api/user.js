import request from '@/utils/request'

export const getUserInfo = (params) => {
  return request({
    url: '/sys/getUserInfo',
    method: 'GET',
    params
  })
}

export const pageUserInfo = (data) => {
  return request({
    url: '/sys/user/page',
    method: 'POST',
    data
  })
}
