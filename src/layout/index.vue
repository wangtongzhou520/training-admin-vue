<template>
  <div class="app-wrapper" :class="[systemStore.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <Sidebar class="sidebar-container" :style="{ backgroundColor: variables.menuBg }" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <Navbar />
      </div>
      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.module.scss'
import { systemUseStore } from '@/stores/system'

const systemStore = systemUseStore()
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.module.scss';
@import '@/styles/variables.module.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: $sideBarDuration;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
