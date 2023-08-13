<template>
  <!-- el图标 -->
  <el-icon v-if="icon.includes('i-ep')">
    <component :is="icon" />
  </el-icon>
  <!-- 导入图标 -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <span>{{ title }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
