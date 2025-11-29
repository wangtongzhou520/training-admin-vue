import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

interface ResponseData<T = any> {
  state: boolean
  message: string
  data: T
}

const service: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.accessToken !== null) {
      config.headers['Authorization'] = 'Bearer ' + userStore.accessToken
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const { state, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (state) {
      return data
    } else {
      // 业务错误
      ElMessage.error(message) // 提示错误消息
      return Promise.reject(message)
    }
  },
  (error) => {
    const userStore = useUserStore()
    // 401 token过期
    if (error.response && error.response.data && error.response.data.code === 401) {
      userStore.logout()
    }
    // 提示错误信息
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
