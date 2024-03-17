import request from '@/utils/request'

/**
 * 分页
 */
export const pageGenerator = (data) => {
  return request({
    url: '/tool/generator/page',
    method: 'POST',
    data
  })
}

/**
 * 生成
 *
 * @param {} data
 * @returns
 */
export const addGenerator = (data) => {
  return request({
    url: '/tool/generator',
    method: 'POST',
    data
  })
}

/**
 * 修改
 *
 * @param {} data
 * @returns
 */
export const modifyGenerator = (data) => {
  return request({
    url: '/tool/generator',
    method: 'PUT',
    data
  })
}

/**
 * 删除
 */
export const deleteGenerator = (id) => {
  return request({
    url: `/tool/generator/${id}`,
    method: 'DELETE'
  })
}

/**
 * 获取详情
 */
export const getDatabaseTableDetail = (id) => {
  return request({
    url: `/tool/generator/detail/${id}`,
    method: 'GET'
  })
}

/**
 * 获得表定义
 *
 * @param {} data
 * @returns
 */
export const getDatabaseTableList = (data) => {
  return request({
    url: `/tool/generator/table/list`,
    method: 'GET',
    params: data
  })
}
