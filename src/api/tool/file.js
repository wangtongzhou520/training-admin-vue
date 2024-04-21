import request from '@/utils/request'

/**
 * 分页
 */
export const pageFileList = (data) => {
  return request({
    url: '/tool/file/page',
    method: 'POST',
    data
  })
}

/**
 * 新增
 */
export const addFile = (data) => {
  return request({
    url: '/tool/file/add',
    method: 'POST',
    data
  })
}

/**
 * 修改
 */
export const modifyFile = (data) => {
  return request({
    url: '/tool/file/modify',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteFile = (id) => {
  return request({
    url: `/tool/file/delete/id`,
    method: 'DELETE'
  })
}
