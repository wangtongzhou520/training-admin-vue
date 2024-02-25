import request from '@/utils/request'

/**
 * 获取菜单列表
 *
 * @param {} data
 * @returns
 */
export const menuList = (data) => {
  return request({
    url: '/sys/menu/list',
    method: 'POST',
    data
  })
}

/**
 * 新增菜单
 *
 * @param {} data
 * @returns
 */
export const addMenu = (data) => {
  return request({
    url: '/sys/menu',
    method: 'POST',
    data
  })
}

/**
 * 编辑菜单
 *
 * @param {} data
 * @returns
 */
export const modifyMenu = (data) => {
  return request({
    url: '/sys/menu',
    method: 'PUT',
    data
  })
}

/**
 * 删除菜单
 */
export const deleteMenu = (id) => {
  return request({
    url: `/sys/menu/${id}`,
    method: 'DELETE'
  })
}
