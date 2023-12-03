import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'

import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'

export const langSelectStore = defineStore('langStore', () => {
  const i18n = useI18n()

  const language = ref(zhCn)

  const changeLanguage = (val) => {
    language.value = val
    i18n.locale.value = val
  }

  return { language, changeLanguage }
})
