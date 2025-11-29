import request from '@/utils/request'

export const getUserInfo = (id: any): Promise<any> => {
  return request({
    url: `/sys/getUserInfo?id=${id}`,
    method: 'GET'
  })
}

/**
 * 分页
 */
export const pageUserInfo = (data: any): Promise<any> => {
  return request({
    url: '/sys/user/page',
    method: 'POST',
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = (id: any): Promise<any> => {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

/**
 * 新增用户
 */
export const addUser = (data: any): Promise<any> => {
  return request({
    url: `/sys/user`,
    method: 'POST',
    data
  })
}

/**
 * 修改用户
 */
export const modifyUser = (data: any): Promise<any> => {
  return request({
    url: `/sys/user`,
    method: 'PUT',
    data
  })
}
