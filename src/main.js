import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/index.scss'
import 'virtual:svg-icons-register'
import svg from '@/components/svg/index.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('svg-icon', svg)

app.mount('#app')
