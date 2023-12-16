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
