import { ref } from 'vue'
import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'
import { TAGS_VIEW } from '@/constant'

export const systemUseStore = defineStore(
  'system',
  () => {
    const sidebarOpened = ref(true)

    //视图标签
    const tagsViewList = ref([])
    //增加视图标签
    const addTagsViewList = (tag) => {
      const isFind = tagsViewList.value.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        tagsViewList.value.push(tag)
      }
    }

    const triggerSidebarOpened = (state) => {
      sidebarOpened.value = !state
    }
    const userStyle = variables
    return { sidebarOpened, triggerSidebarOpened, userStyle, tagsViewList, addTagsViewList }
  },
  {
    persist: {
      key: TAGS_VIEW,
      enabled: true,
      storage: localStorage,
      paths: ['tagsViewList']
    }
  }
)
