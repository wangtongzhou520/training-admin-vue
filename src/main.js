import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import svg from '@/components/svg/index.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersist)
app.use(pinia)
app.use(router)
app.component('svg-icon', svg)

app.mount('#app')
