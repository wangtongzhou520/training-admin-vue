// src/utils/registerComponents.js
import { createApp } from 'vue'
import { app } from '@/main'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function changeFileNameToComponentName(fileName) {
  // 去除文件扩展名并转换为驼峰命名法
  const componentName = fileName.replace(/\.\w+$/, '')
  return componentName.split('-').map(capitalizeFirstLetter).join('')
}

async function registerComponents() {
  const modules = import.meta.glob('@/components/**/*.vue')
  for (const path in modules) {
    const componentConfig = await modules[path]()
    const componentName = changeFileNameToComponentName(path.replace(/^\/@\/components\/|\.vue$/g, ''))
    app.component(componentName, componentConfig.default || componentConfig)
  }
}

// 注册 @/components 目录下的所有组件
registerComponents()