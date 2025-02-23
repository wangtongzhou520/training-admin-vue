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
      <el-col :span="4" :xs="24">
        <el-card>
          <FileCategoryTree @node-click="handleFileCategoryClick" />
        </el-card>
      </el-col>
      <el-col :span="20" :xs="24">
        <div class="user-manage-container">
          <el-card>
            <MultiImageDisplay
              :images="tableData"
              @select="handleImageSelect"
            />
            <!-- <uploadFile-dialog
              v-model="uploadFileVisible"
              :selectRow="selectRow"
              @fileAction="getListData()"
            ></uploadFile-dialog> -->
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageFileList } from '@/api/tool/file'
// import UploadFileDialog from '../file/UploadFile.vue'

/**
 * 父传子的参数
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

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
</style>