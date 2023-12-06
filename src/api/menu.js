import request from '@/utils/request'

export const menuList = (data) => {
  return request({
    url: '/sys/menu/list',
    method: 'POST',
    data
  })
}
