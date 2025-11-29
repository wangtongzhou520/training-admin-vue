import request from '@/utils/request'


/**
 * 分页
 */
export const pageCategoryList = (data: any): Promise<any> => {
  return request({
    url: '/course/category/page',
    method: 'GET',
    params: data
  })
}

/**
 * 新增
 */
export const addCategory = (data: any): Promise<any> => {
  return request({
    url: '/course/category/add',
    method: 'POST',
    data
  })
}

/**
 * 修改
 */
export const modifyCategory = (data: any): Promise<any> => {
  return request({
    url: '/course/category/modify',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteCategory = (id: any): Promise<any> => {
  return request({
    url: `/course/category/delete/${id}`,
    method: 'DELETE'
  })
}


/**
 * 获取分类树
 *
 * @param {} data
 * @returns
 */
export const categoryList = (data: any): Promise<any> => {
  return request({
    url: '/course/category/categoryList',
    method: 'POST',
    data
  })
}