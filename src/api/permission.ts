import request from '@/utils/request'

/**
 * 查询用户的角色列表
 */
export const userRoleList = (id: any): Promise<any> => {
  return request({
    url: `/sys/permission/listRoles?userId=${id}`,
    method: 'GET'
  })
}

/**
 * 为用户分配角色
 */
export const addUserRole = (data: any): Promise<any> => {
  return request({
    url: `/sys/permission/addUserRole`,
    method: 'POST',
    data
  })
}

/**
 * 查询角色拥有的菜单列表
 */
export const roleMenuList = (id: any): Promise<any> => {
  return request({
    url: `/sys/permission/listMenus?roleId=${id}`,
    method: 'GET'
  })
}

/**
 * 为角色分配菜单
 */
export const addRoleMenu = (data: any): Promise<any> => {
  return request({
    url: `/sys/permission/addRoleMenu`,
    method: 'POST',
    data
  })
}

/**
 * 获取用户权限信息
 *
 * @returns
 */
export const getUserPermission = (): Promise<any> => {
  return request({
    url: `/sys/auth/getUserPermission`,
    method: 'GET'
  })
}
