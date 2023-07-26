import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { state, message, data } = response.data
    //   要根据success的成功与否决定下面的操作
    if (state) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(message)
    }
  },
  (error) => {
    // TODO: 将来处理 token 超时问题
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
