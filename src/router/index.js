import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/Index.vue'

/**
 * 私有的路由信息 需要权限控制的信息
 */
const privateRoutes = [
  {
    path: '/system',
    redirect: '/user/manage',
    component: layout,
    meta: {
      title: '系统管理',
      icon: 'personnel'
    },
    children: [
      {
        path: '/user/manage',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'personnel'
        }
      }
    ]
  }
]

/**
 * 公开的路由表信息
 */
const publicRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index')
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
        path: '/404',
        name: '404',
        component: () => import('@/views/404')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...publicRoutes, ...privateRoutes]
})

export default router
