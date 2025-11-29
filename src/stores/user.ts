import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/login'
import { getUserPermission } from '@/api/permission'
import { TOKEN } from '@/constant'
import { removeAllItem } from '@/utils/storage'
import router from '@/router'
import type { UserInfo } from '@/types/store'

export const useUserStore = defineStore(
  'user',
  () => {
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)
    const userId = ref<string | null>(null)
    const userInfo: Ref<UserInfo | null> = ref(null)

    const getToken = async (username: string, password: string) => {
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
      userInfo.value = null
      removeAllItem()
      router.push('login')
    }

    return {
      accessToken,
      refreshToken,
      userId,
      getToken,
      userInfo,
      logout,
      getUserInfo
    }
  },
  {
    persist: {
      key: TOKEN,
      storage: localStorage
    } as any
  }
)
