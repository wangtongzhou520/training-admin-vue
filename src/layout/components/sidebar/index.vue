<template>
  <div class="">
    <div class="logo-container">
      <el-avatar
        :size="44"
        shape="square"
        src="https://hbimg.b0.upaiyun.com/b62a5a535b427278bcb4e91e496f4c4a8693c6d94594f-hg4ynd_fw658"
      />
      <h1 class="logo-title" v-if="systemStore.sidebarOpened">后台管理</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue'
import { systemUseStore } from '@/stores/system'
const systemStore = systemUseStore()
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
