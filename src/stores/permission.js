import { ref } from 'vue'
import { defineStore } from 'pinia'
import { publicRoutes } from '@/router'
import layout from '@/layout/Index.vue'

const modules = import.meta.glob('/src/views/**/**.vue')

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref(publicRoutes)

  const setRoutes = (newRoutes) => {
    // 永远在静态路由的基础上增加新路由
    routes.value = [...publicRoutes, ...newRoutes]
  }

  const filterRouters = (menus) => {
    let filterRoute = []
    menus.forEach((menu) => {
      let childRoutes = []
      if (menu.children && menu.children.length >= 0) {
        childRoutes = createSubRoutes(menu.children)
      }
      filterRoute.push({
        name: menu.name,
        path: menu.path,
        meta: { title: menu.name, icon: menu.icon },
        component: layout,
        children: childRoutes
      })
    })
    setRoutes(filterRoute)
    return filterRoute
  }

  //动态创建子路由
  const createSubRoutes = (children) => {
    const childRoutes = []
    children.forEach((child) => {
      childRoutes.push({
        name: child.name,
        path: child.path,
        meta: { title: child.name, icon: child.icon },
        component: modules[`/src/views${child.component}.vue`]
      })
    })
    return childRoutes
  }
  return { routes, filterRouters }
})
