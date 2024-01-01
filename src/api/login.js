import request from '@/utils/request'

export const login = (data) => {
  return request({
    url: '/sys/auth/login',
    method: 'POST',
    data
  })
}
