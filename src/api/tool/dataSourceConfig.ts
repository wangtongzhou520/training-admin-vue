import request from '@/utils/request'

/**
 * 分页
 */
export const pageDataSourceConfigList = (data: any): Promise<any> => {
  return request({
    url: '/tool/dataSourceConfig/page',
    method: 'POST',
    data
  })
}

/**
 * 新增数据源
 *
 * @param {} data
 * @returns
 */
export const addDataSourceConfig = (data: any): Promise<any> => {
  return request({
    url: '/tool/dataSourceConfig',
    method: 'POST',
    data
  })
}

/**
 * 修改数据源
 *
 * @param {} data
 * @returns
 */
export const modifyDataSourceConfig = (data: any): Promise<any> => {
  return request({
    url: '/tool/dataSourceConfig',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteDataSourceConfig = (id: any): Promise<any> => {
  return request({
    url: `/tool/dataSourceConfig/${id}`,
    method: 'DELETE'
  })
}

/**
 * 删除角色
 */
export const getDataSourceConfigList = (): Promise<any> => {
  return request({
    url: `/tool/dataSourceConfig/list`,
    method: 'GET'
  })
}
