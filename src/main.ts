import { createApp } from 'vue'
import type { App as AppInstance } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import svg from '@/components/svg/index.vue'
import 'element-plus/dist/index.css'
import './permission'
import i18n from '@/i18n'
import installFilter from '@/filter'
import installDirective from '@/directives'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import '@/utils/registerComponents' // 引入自动注册组件的脚本

const app: AppInstance = createApp(App)
installFilter(app)
installDirective(app)

const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)

/**
 * 此处用来解决刷新页面以后无权限问题
 */
const userStore = useUserStore()
const permissionStore = usePermissionStore()
const result = userStore.userInfo
if (result != null) {
  const routes = permissionStore.filterRouters(result.menus)
  routes.forEach((item) => {
    router.addRoute(item)
  })
}

app.use(router)
app.use(i18n)
app.component('svg-icon', svg)

app.mount('#app')

export { app }
