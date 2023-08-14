<template>
  <el-menu
    :collapse="!systemStore.sidebarOpened"
    :default-active="activeMenu"
    :active-text-color="systemStore.userStyle.ActiveText"
    :background-color="systemStore.userStyle.menuBg"
    :text-color="systemStore.userStyle.menuText"
    router
  >
    <sidebar-item v-for="item in menus" :key="item.path" :route="item"></sidebar-item>
  </el-menu>

  <!-- <el-icon><i-ep-location /></el-icon> -->
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filterRouters, getMenus } from '@/utils/route.js'
import SidebarItem from './SidebarItem.vue'
import { systemUseStore } from '@/stores/system'

const router = useRouter()
const systemStore = systemUseStore()

const menus = computed(() => {
  const fRoutes = filterRouters(router.getRoutes())
  return getMenus(fRoutes)
})

// 默认菜单
const route = useRoute()
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>

<style lang="scss" scoped></style>
