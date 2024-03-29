import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/Index.vue'

/**
//  * 私有的路由信息 需要权限控制的信息
//  */
// export const privateRoutes = [
//   // {
//   //   path: '/system',
//   //   redirect: '/user/manage',
//   //   component: layout,
//   //   meta: {
//   //     title: '系统管理',
//   //     icon: 'personnel'
//   //   },
//   //   children: [
//   //     {
//   //       path: '/user/manage',
//   //       component: () => import('@/views/system/user/index.vue'),
//   //       meta: {
//   //         title: '用户管理',
//   //         icon: 'personnel'
//   //       }
//   //     },
//   //     {
//   //       path: '/role/manage',
//   //       component: () => import('@/views/system/role/index.vue'),
//   //       meta: {
//   //         title: '角色管理',
//   //         icon: 'role'
//   //       }
//   //     },
//   //     {
//   //       path: '/menu/manage',
//   //       component: () => import('@/views/system/menu/index.vue'),
//   //       meta: {
//   //         title: '菜单管理',
//   //         icon: 'permission'
//   //       }
//   //     }
//   //   ]
//   // }
// ]

/**
 * 公开的路由表信息
 */
export const publicRoutes = [
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
        component: () => import('@/views/404')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: publicRoutes
})

export default router
