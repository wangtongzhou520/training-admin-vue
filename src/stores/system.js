import { ref } from 'vue'
import { defineStore } from 'pinia'

export const systemUseStore = defineStore('system', () => {
  const sidebarOpened = ref(true)
  const triggerSidebarOpened = (state) => {
    sidebarOpened.value = !state
  }
  return { sidebarOpened, triggerSidebarOpened }
})
