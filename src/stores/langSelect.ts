import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export const langSelectStore = defineStore('langStore', () => {
  const i18n = useI18n()

  const language = ref<any>(zhCn)

  const changeLanguage = (val: any) => {
    language.value = val
    i18n.locale.value = val.name as string
  }

  return { language, changeLanguage }
})
