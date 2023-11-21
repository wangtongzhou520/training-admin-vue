<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <project-card class="user-card"></project-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane label="功能" name="feature">
              <feature />
            </el-tab-pane>
            <el-tab-pane label="关于" name="author">
              <author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
const activeName = ref('feature')
</script>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
