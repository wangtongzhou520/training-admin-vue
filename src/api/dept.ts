import request from '@/utils/request'

/**
 * 获取部门树
 *
 * @param {} data
 * @returns
 */
export const deptList = (data: any): Promise<any> => {
  return request({
    url: '/sys/deptList',
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
export const addDept = (data: any): Promise<any> => {
  return request({
    url: '/sys/dept',
    method: 'POST',
    data
  })
}

/**
 * 修改部门
 *
 * @param {} data
 * @returns
 */
export const modifyDept = (data: any): Promise<any> => {
  return request({
    url: '/sys/dept',
    method: 'PUT',
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteDept = (id: any): Promise<any> => {
  return request({
    url: `/sys/dept/${id}`,
    method: 'DELETE'
  })
}
