import request from '@/utils/request'


/**
 * 分页
 */
export const pageCourseList = (data) => {
  return request({
    url: '/course/page',
    method: 'GET',
    params: data
  })
}

/**
 * 新增
 */
export const addCourse = (data) => {
  return request({
    url: '/course/add',
    method: 'POST',
    data
  })
}

/**
 * 修改
 */
export const modifyCourse = (data) => {
  return request({
    url: '/course/modify',
    method: 'PUT',
    data
  })
}

/**
 * 删除角色
 */
export const deleteCourse = (id) => {
  return request({
    url: `/course/delete/${id}`,
    method: 'DELETE'
  })
}