import type { DirectiveBinding } from 'vue'
import { useUserStore } from '@/stores/user'

function checkPermission(el: HTMLElement, binding: DirectiveBinding): void {
  const userStore = useUserStore()

  // 获取绑定的值，此处为权限
  const { value } = binding
  // 获取所有的功能指令
  const points = userStore.userInfo?.permissions || []
  // 当传入的指令集为数组时
  if (value && value instanceof Array) {
    // 匹配对应的指令
    const hasPermission = points.some((point: string) => {
      return value.includes(point)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    throw new Error('v-permission value is ["admin","editor"]')
  }
}

export default {
  // 在绑定元素的父组件被挂载后调用
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    checkPermission(el, binding)
  },
  // 在包含组件的 VNode 及其子组件的 VNode 更新后调用
  updated(el: HTMLElement, binding: DirectiveBinding): void {
    checkPermission(el, binding)
  }
}
