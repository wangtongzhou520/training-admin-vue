import request from '@/utils/request'

/**
 * 查询用户的角色列表
 */
export const userRoleList = (id) => {
  return request({
    url: `/sys/permission/listRoles?userId=${id}`,
    method: 'GET'
  })
}

/**
 * 为用户分配权限
 */
export const addUserRole = (data) => {
  console.log(data)
  return request({
    url: `/sys/permission/addUserRole`,
    method: 'POST',
    data
  })
}
