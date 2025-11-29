import path from 'path-browserify'
import type { RouteRecordRaw } from 'vue-router'

/**
 * 返回带有子路由的列表
 */
const getChildrenRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []
  routes.forEach((route) => {
    if (route.children && route.children.length > 0) {
      result.push(...route.children)
    }
  })
  return result
}

/**
 * 过滤路由
 *
 * @param routes 路由表
 * @returns 过滤后的路由表
 */
export const filterRouters = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const childrenRoutes = getChildrenRoutes(routes)
  // 过滤掉一级路由作为子路由的情况
  return routes.filter((route) => {
    return !childrenRoutes.find((childrenRoute) => {
      return childrenRoute.path === route.path
    })
  })
}

/**
 * 判断数据是否为空值
 */
function isNull(data: any): boolean {
  if (!data) return true
  if (JSON.stringify(data) === '{}') return true
  if (JSON.stringify(data) === '[]') return true
  return false
}

interface MenuItem {
  path: string
  meta?: {
    icon?: string
    title?: string
    hidden?: boolean
  }
  children?: MenuItem[]
  [key: string]: any
}

/**
 * 获取菜单列表
 *
 * @param routes 过滤后的路由
 * @param basePath 基础路径
 * @returns 菜单列表
 */
export function getMenus(routes: RouteRecordRaw[], basePath: string = ''): MenuItem[] {
  const result: MenuItem[] = []
  // 遍历路由表
  routes.forEach((item) => {
    // 不存在 children && 不存在 meta 直接 return
    if (isNull(item.meta) && isNull(item.children)) return
    // 存在 children 不存在 meta，进入迭代
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...getMenus(item.children as RouteRecordRaw[]))
      return
    }
    // 合并 path 作为跳转路径
    const routePath = path.resolve(basePath, item.path)
    // 路由分离之后，存在同名父路由的情况，需要单独处理
    let route = result.find((item) => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }

      // icon 与 title 必须全部存在
      if (route.meta?.icon && route.meta?.title && !route.meta?.hidden) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }

    // 存在 children 进入迭代到children
    if (item.children) {
      route.children!.push(...getMenus(item.children as RouteRecordRaw[], route.path))
    }
  })
  return result
}
