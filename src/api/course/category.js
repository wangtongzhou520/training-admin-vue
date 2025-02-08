import request from '@/utils/request'


/**
 * 分页
 */
export const pageCategoryList = (data) => {
  return request({
    url: '/course/category/page',
    method: 'GET',
    params: data
  })
}

/**
 * 新增
 */
export const addCategory = (data) => {
  return request({
    url: '/course/category/add',
    method: 'POST',
    data
  })
}

/**
 * 修改
 */
export const modifyCategory = (data) => {
  return request({
    url: '/course/category/modify',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteCategory = (id) => {
  return request({
    url: `/course/category/delete/id`,
    method: 'DELETE'
  })
}