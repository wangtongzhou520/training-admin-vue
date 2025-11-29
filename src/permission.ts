import router from './router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

const whiteList: string[] = ['/login']

// 路由前置守卫
router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  if (userStore.accessToken !== null) {
    // 待补充 检查token是否过期 以及刷新token 等逻辑
    if (to.path === '/login') {
      next('/')
    } else {
      if (userStore.userInfo == null) {
        const result = await userStore.getUserInfo()
        if (result) {
          const routes = permissionStore.filterRouters(result.menus)
          routes.forEach((item) => {
            router.addRoute(item)
          })
        }
        return next(to.path)
      } else {
        next()
      }
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
