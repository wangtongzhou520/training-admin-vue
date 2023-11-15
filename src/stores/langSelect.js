import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import zh from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

export const langSelectStore = defineStore('langStore', () => {
  const i18n = useI18n()

  const language = ref(i18n.locale)

  const locale = computed(() => {
    if (language.value == 'en') {
      return en
    } else {
      return zh
    }
  })

  const changeLanguage = (val) => {
    language.value = val
    i18n.locale.value = val
  }

  return { language, locale, changeLanguage }
})
