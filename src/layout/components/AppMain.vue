<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { systemUseStore } from '@/stores/system'
import { useRouter } from 'vue-router'
import { isTags } from '@/utils/tags'

const router = useRouter()

/**
 * 生成 title
 */
const getTitle = (to) => {
  let title = ''
  if (!to.meta) {
    // 处理无 meta 的路由
    const pathArr = to.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = to.meta.title
  }
  return title
}

/**
 * 监听路由变化
 */
const systemUse = systemUseStore()
watch(
  () => router.currentRoute.value,
  (newValue) => {
    if (!isTags(newValue.path)) return
    const { fullPath, meta, name, params, path, query } = newValue
    systemUse.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(newValue)
    })
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px - 43px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 104px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
