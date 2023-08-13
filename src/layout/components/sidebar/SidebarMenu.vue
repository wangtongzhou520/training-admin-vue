<template>
  <el-menu
    :collapse="!systemStore.sidebarOpened"
    :default-active="activeMenu"
    :active-text-color="useStore.style.ActiveText"
    :background-color="useStore.style.menuBg"
    :text-color="useStore.style.menuText"
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
import { useUserStore } from '@/stores/user'
import { systemUseStore } from '@/stores/system'

const router = useRouter()
const useStore = useUserStore()
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
