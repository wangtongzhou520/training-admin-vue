<template>
  <el-dialog
    ref="dialogRef"
    :model-value="modelValue"
    title="文件管理"
    @close="closed"
    @open="open"
    width="80%"
  >
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card>
          <FileCategoryTree @node-click="handleFileCategoryClick" />
        </el-card>
      </el-col>
      <!-- 右侧图片区域 -->
      <el-col :span="20">
      <!-- 新增顶部上传按钮 -->
    <div class="upload-header">
      <el-button 
        type="primary" 
        @click="handleCreate"
        class="upload-btn"
      >
        <span>上传文件</span>
      </el-button>
    </div>
        <el-row :gutter="15"> <!-- 调整内部间距 -->
          <el-col 
            v-for="item in tableData" 
            :key="item.id"
            :span="3"   
            class="image-col" 
          >
            <el-card 
              :class="{ selected: selectedImageId === item.id }"
              @click="handleSelect(item)"
              class="fixed-card"
            >
              <el-image
                :src="item.url"
                fit="cover"
                class="responsive-image"
              />
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
  <UploadFile
              v-model="uploadFileVisible"
              :selectRow="selectRow"
              @fileAction="getListData()"
            ></UploadFile>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageFileList } from '@/api/tool/file'

/**
 * 父传子的参数
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

/**
 * 选中的图片ID
 */
 const selectedImageId = ref(null)

const emits = defineEmits(['update:modelValue', 'select'])

/**
 * 列表内容
 */
const tableData = ref([])

/**
 * 选中的数据
 */
const selectRow = ref({})

/**
 * 查询参数
 */
const queryParams = reactive({
  name: undefined,
  suffix: undefined,
  categoryId: undefined,
  pageNo: 1,
  pageSize: 10,
})

/**
 * 获取数据
 */
const getListData = async () => {
  const result = await pageFileList(queryParams)
  tableData.value = result.list
}

/** 分类点击 */
const handleFileCategoryClick = async (row) => {
  queryParams.categoryId = row.id
  await getListData()
}

/**
 * 选中图片
 */
 const handleSelect = (item) => {
  selectedImageId.value = item.id
 }


 


/**
 * 新增
 */
const uploadFileVisible = ref(false)

const handleCreate = () => {
  if (queryParams.categoryId === undefined) {
    ElMessage.error('请选择分类')
    return
  }
  uploadFileVisible.value = true
  selectRow.value = { categoryId: queryParams.categoryId }
}

/**
 * 选中图片
 */
const handleImageSelect = (url) => {
  console.log('Selected Image URL:', url)
  // 可以在这里处理选中的图片URL，例如将其存储在某个变量中
  selectRow.value.thumbnailUrl = url
  emits('select', url)
}

/**
 * 查询
 */
const handleQuery = () => {
  getListData()
}

/**
 * 打开回调
 */
const open = async () => {
  getListData()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.upload-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding-right: 7px; // 与图片列对齐

  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 25px;
    border-radius: 4px;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
    }

    .el-icon {
      font-size: 16px;
    }
  }
}
.container {
  .header {
    margin-bottom: 22px;
    text-align: left;
  }
  :deep(.el-tag) {
    margin-right: 6px;
  }
  .pagination {
    margin-top: 20px;
    text-align: center;
    justify-content: center;
  }
}
.image-container {
  // 消除栅格容器的默认边距
  margin-left: -7px !important;
  margin-right: -7px !important;
}

.image-col {
  // 调整卡片间距
  padding-left: 7px !important;
  padding-right: 7px !important;
  margin-bottom: 14px;

  .fixed-card {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%; /* 1:1 宽高比 */
    overflow: hidden;
    border-radius: 8px;
    transition: all 0.3s ease;

    // 重置卡片内部样式
    :deep(.el-card__body) {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 0;
    }

    .responsive-image {
      width: 100%;
      height: 100%;
      object-fit: cover; /* 确保图片覆盖整个容器 */
    }

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    &.selected {
      border: 2px solid #409EFF;
      box-shadow: 0 0 12px rgba(64, 158, 255, 0.3);
    }
  }
}
</style>