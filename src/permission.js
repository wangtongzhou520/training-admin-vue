import router from './router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

const whiteList = ['/login']

//路由前置守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (userStore.accessToken !== null) {
    //待补充 检查token是否过期 以及刷新token 等逻辑
    if (to.path === '/login') {
      next('/')
    } else {
      if (userStore.userInfo == null) {
        const result = await userStore.getUserInfo()
        const routes = permissionStore.filterRouters(result.menus)
        routes.forEach((item) => {
          router.addRoute(item)
        })
        return next(to.path)
      } else {
        console.log(router.getRoutes())
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

// // 构建路由配置
// const routes = menuItems.map((menuItem) => {
//   const { id, name, path, children } = menuItem
//   const childRoutes = createSubRoutes(menuItem)
//   return {
//     name: menu.name,
//     path: menu.path,
//     meta: { title: menu.name, icon: menu.icon },
//     children: childRoutes,
//     component: () => loadView[`../views${menu.component}.vue`]
//   }
// })
