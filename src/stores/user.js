import { login } from '@/api/login'
import { defineStore } from 'pinia'
import { TOKEN } from '@/constant'

export const useUserStore = defineStore(
  'user',
  () => {
    console.log(TOKEN)
    const accessToken = ref({})
    const refreshToken = ref({})
    const getToken = async (username, password) => {
      const result = await login({
        username,
        password
      })
      refreshToken.value = result.refreshToken
      accessToken.value = result.accessToken
    }
    return { accessToken, refreshToken, getToken }
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
