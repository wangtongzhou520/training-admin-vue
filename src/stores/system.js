import { ref } from 'vue'
import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'

export const systemUseStore = defineStore('system', () => {
  const sidebarOpened = ref(true)
  const triggerSidebarOpened = (state) => {
    sidebarOpened.value = !state
  }
  const userStyle = variables
  return { sidebarOpened, triggerSidebarOpened, userStyle }
})
