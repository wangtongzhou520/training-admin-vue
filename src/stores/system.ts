import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import variables from '@/styles/variables.module.scss'
import { TAGS_VIEW } from '@/constant'
import type { TagView } from '@/types/store'

export const systemUseStore = defineStore(
  'system',
  () => {
    const sidebarOpened = ref<boolean>(true)

    // 视图标签
    const tagsViewList: Ref<TagView[]> = ref([])

    // 增加视图标签
    const addTagsViewList = (tag: TagView) => {
      const isFind = tagsViewList.value.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        tagsViewList.value.push(tag)
      }
    }

    // 删除视图标签
    const removeTagsView = (type: string, index: number) => {
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
     * 删除某个视图标签
     */
    const delView = (tag: TagView) => {
      const index = tagsViewList.value.findIndex((item) => item.path === tag.path)
      if (index > -1) {
        tagsViewList.value.splice(index, 1)
      }
    }

    const triggerSidebarOpened = (state: boolean) => {
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
      storage: localStorage,
      paths: ['tagsViewList']
    } as any
  }
)
