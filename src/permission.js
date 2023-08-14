import router from './router'
import { useUserStore } from '@/stores/user'

const whiteList = ['/login']

//路由前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (userStore.accessToken !== null) {
    //待补充 检查token是否过期 以及刷新token 等逻辑
    if (to.path === '/login') {
      next('/')
    } else {
      const result = await userStore.userInfo(userStore.userId)
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
