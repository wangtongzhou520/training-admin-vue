/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'element-plus/dist/locale/zh-cn.mjs' {
  const locale: any
  export default locale
}

declare module 'element-plus/dist/locale/en.mjs' {
  const locale: any
  export default locale
}

declare module 'element-plus' {
  export const ElMessage: any
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 添加更多环境变量类型...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
