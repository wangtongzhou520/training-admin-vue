<template>
  <div class="multi-image-display">
    <el-row :gutter="20">
      <el-col :span="8" v-for="item in images" :key="item.id">
        <el-card :class="{ selected: selectedImageId === item.id }" 
        @click="handleSelect(item)">
          <el-image
            :src="item.url"
            fit="cover"
            style="width: 100%; height: 200px;"
          />
          <!-- <div class="image-info">
            <p><strong>文件名:</strong> {{ item.name }}</p>
            <p><strong>文件类型:</strong> {{ item.type }}</p>
            <p><strong>文件大小:</strong> {{ item.size }} KB</p>
          </div> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

/**
 * 父传子的参数
 */
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
})

const emits = defineEmits(['select'])

/**
 * 选中的图片ID
 */
const selectedImageId = ref(null)

/**
 * 选中图片
 */
const handleSelect = (item) => {
  selectedImageId.value = item.id
  emits('select', item.url)
}
</script>

<style lang="scss" scoped>
.multi-image-display {
  .el-card {
    margin-bottom: 20px;
    cursor: pointer;
    &.selected {
      border: 2px solid #409EFF;
    }
  }
  .image-info {
    margin-top: 10px;
    p {
      margin: 5px 0;
    }
  }
}
</style>