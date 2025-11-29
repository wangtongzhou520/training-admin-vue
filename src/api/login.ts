import request from '@/utils/request'

export const login = (data: any): Promise<any> => {
  return request({
    url: '/sys/auth/login',
    method: 'POST',
    data
  })
}
