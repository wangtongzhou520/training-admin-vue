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
    //删除视图标签
    const removeTagsView = (type, index) => {
      if (type === 'index') {
        tagsViewList.value.splice(index, 1)
        return
      } else if (type === 'other') {
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
        tagsViewList.value.splice(0, index)
      } else if (type === 'right') {
        tagsViewList.value.splice(index + 1, tagsViewList.value.length - index + 1)
      }
    }

    /**
     * 删除摸个视图标签
     */
    const delView = (tag) => {
      let index = tagsViewList.value.findIndex((item) => item.path === tag.path)
      if (index > -1) {
        tagsViewList.value.splice(index, 1)
      }
    }

    const triggerSidebarOpened = (state) => {
      sidebarOpened.value = !state
    }
    const userStyle = variables
    return {
      sidebarOpened,
      triggerSidebarOpened,
      userStyle,
      tagsViewList,
      addTagsViewList,
      delView,
      removeTagsView
    }
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
