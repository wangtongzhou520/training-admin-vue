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
