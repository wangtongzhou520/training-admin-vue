import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import layout from '@/layout/Index.vue'

/**
 * 公开的路由表信息
 */
export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'personnel'
        }
      },
      {
        path: '/generator/edit',
        component: () => import('@/views/tool/generator/EditTable.vue'),
        meta: {
          noCache: true,
          hidden: true,
          icon: 'edittable',
          title: '修改生成配置'
        }
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
