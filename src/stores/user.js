import { login } from '@/api/login'
import { getUserPermission } from '@/api/permission'
import { defineStore } from 'pinia'
import { TOKEN } from '@/constant'
import { ref } from 'vue'
import { removeAllItem } from '@/utils/storage'
import router from '@/router'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref(null)
    const refreshToken = ref(null)
    const userId = ref(null)
    const userInfo = ref(null)
    const getToken = async (username, password) => {
      const result = await login({
        username,
        password
      })
      refreshToken.value = result.refreshToken
      accessToken.value = result.accessToken
      userId.value = result.userId
    }
    const getUserInfo = async () => {
      userInfo.value = await getUserPermission()
      return userInfo.value
    }
    const logout = () => {
      accessToken.value = null
      refreshToken.value = null
      removeAllItem()
      //TODO 待补充权限部分内容
      router.push('login')
    }
    return { accessToken, refreshToken, userId, getToken, userInfo, logout, getUserInfo }
  },
  {
    persist: {
      key: TOKEN,
      enabled: true,
      storage: localStorage
    }
  }
)

// export const useUserStore = defineStore('user',
//   {
//     state: () => ({

//     }),
//     actions: {
//       async login(username, password) {
//         const { state, data } = await login({
//           username,
//           password
//         })
//         if (state) {
//         }
//       }
//     }
//   },
//   {
//     persist: {
//       key: TOKEN,

//     }
//   }
// )
