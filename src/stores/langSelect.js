import { defineStore } from 'pinia'

export const langSelectStore = defineStore('langSelect', () => {
  const language = ref('zh')
  return { language }
})
