<template>
  <el-config-provider :locale="langSelect.language">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup>
import { ElConfigProvider } from 'element-plus'
import { langSelectStore } from '@/stores/langSelect'
const langSelect = langSelectStore()
</script>

<style scoped></style>
