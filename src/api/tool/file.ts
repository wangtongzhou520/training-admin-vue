import request from '@/utils/request'

/**
 * 分页
 */
export const pageFileList = (data: any): Promise<any> => {
  return request({
    url: '/tool/file/page',
    method: 'GET',
    params: data
  })
}

/**
 * 新增
 */
export const addFile = (data: any): Promise<any> => {
  return request({
    url: '/tool/file/add',
    method: 'POST',
    data
  })
}

/**
 * 修改
 */
export const modifyFile = (data: any): Promise<any> => {
  return request({
    url: '/tool/file/modify',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteFile = (id: any): Promise<any> => {
  return request({
    url: `/tool/file/delete/${id}`,
    method: 'DELETE'
  })
}




/**
 * 获取文件分类
 *
 * @param {} data
 * @returns
 */
export const fileCategoryList = (data: any): Promise<any> => {
  return request({
    url: '/tool/file-category/fileCategoryList',
    method: 'POST',
    data
  })
}

/**
 * 新增文件分类
 *
 * @param {} data
 * @returns
 */
export const addFileCategory = (data: any): Promise<any> => {
  return request({
    url: '/tool/file-category',
    method: 'POST',
    data
  })
}

/**
 * 修改文件分类
 *
 * @param {} data
 * @returns
 */
export const modifyFileCategory = (data: any): Promise<any> => {
  return request({
    url: '/tool/file-category',
    method: 'PUT',
    data
  })
}

/**
 * 删除指定数据 
 */
export const deleteFileCategory = (id: any): Promise<any> => {
  return request({
    url: `/tool/file-category/${id}`,
    method: 'DELETE'
  })
}
