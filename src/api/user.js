import request from '@/utils/request'

export const getUserInfo = (id) => {
  return request({
    url: `/sys/getUserInfo?id=${id}`,
    method: 'GET'
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

/**
 * 新增用户
 */
export const addUser = (data) => {
  return request({
    url: `/sys/user`,
    method: 'POST',
    data
  })
}

/**
 * 修改用户
 */
export const modifyUser = (data) => {
  return request({
    url: `/sys/user`,
    method: 'PUT',
    data
  })
}
