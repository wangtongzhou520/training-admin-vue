import request from '@/utils/request'

export const getUserInfo = (params) => {
  return request({
    url: '/sys/getUserInfo',
    method: 'GET',
    params
  })
}

/**
 * 分页
 */
export const pageUserInfo = (data) => {
  return request({
    url: '/sys/user/page',
    method: 'POST',
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}
