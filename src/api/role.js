import request from '@/utils/request'

/**
 * 分页
 */
export const pageRoleList = (data) => {
  return request({
    url: '/sys/role/page',
    method: 'POST',
    data
  })
}

/**
 * 所有的角色信息
 *
 * @returns
 */
export const roleList = () => {
  return request({
    url: '/sys/role/all',
    method: 'GET'
  })
}

/**
 * 新增用户
 *
 * @param {} data
 * @returns
 */
export const addRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 * 新增用户
 *
 * @param {} data
 * @returns
 */
export const modifyRole = (data) => {
  return request({
    url: '/sys/role',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}
