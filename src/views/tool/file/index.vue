<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <el-card>
          <FileCategoryTree @node-click="handleFileCategoryClick" />
        </el-card>
      </el-col>
      <el-col :span="20" :xs="24">
        <div class="user-manage-container">
          <el-card class="header">
            <el-form :inline="true" :model="queryParams" class="-mb-15px" label-width="68px">
              <el-form-item label="文件名" prop="name">
                <el-input v-model="queryParams.name" clearable placeholder="请输入文件名" />
              </el-form-item>
              <el-form-item label="文件类型" prop="suffix">
                <el-input v-model="queryParams.suffix" clearable placeholder="请输入文件类型" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="handleCreate">新增</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card>
            <el-table :data="tableData"  border style="width: 100%">
        <el-table-column label="#" type="index" />
        <!-- <el-table-column label="编号" align="center" prop="id" /> -->
        <el-table-column label="分类" align="center" prop="categoryId" />
        <el-table-column label="文件名" align="center" prop="name" />
        <el-table-column label="文件路径" align="center" prop="path" />
        <el-table-column label="url" align="center" prop="url" />
        <!-- <el-table-column label="文件后缀" align="center" prop="suffix" /> -->
        <el-table-column label="文件类型" align="center" prop="type" />
        <el-table-column label="文件大小" align="center" prop="size" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="删除状态" align="center" prop="deleteState" />
        <el-table-column label="操作" align="center">
          <el-button
            type="info"
            size="small"
            @click="handleModify(row)"
            v-permission="['tool:file:role-menu']"
            >编辑角色</el-button
          >
          <el-button link type="danger" @click="handleDelete(row)"
            >删除</el-button>
        </el-table-column>
      </el-table>
      <file-dialog
        v-model="fileFormVisible"
        :selectRow="selectRow"
        @fileAction="getListData()"
        ></file-dialog>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageFileList, deleteFile } from '@/api/tool/file'
import FileDialog from '../file/FileForm.vue'
import FileCategoryTree from '../file/FileCategory.vue'

/**
 * 列表内容
 */
const tableData = ref([])
/**
 * 总数
 */
const total = ref(0)

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
  pageSize: 10
})

/**
 * 获取数据
 */
const getListData = async () => {
  const result = await pageFileList(queryParams)
  tableData.value = result.list
  total.value = result.total
}


/** 分类点击 */
const handleFileCategoryClick = async (row) => {
  queryParams.categoryId = row.id
  await getListData()
}

/**
 * 编辑
 */
const fileFormVisible = ref(false)
const handleModify = (row) => {
  fileFormVisible.value = true
  selectRow.value = row
}

/**
 * 新增
 */
const handleCreate = () => {
  fileFormVisible.value = true
  selectRow.value = {categoryId: queryParams.categoryId}
}

// 分页相关
/**
 * size 改变触发
 */
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

/**
 * 删除
 */
const handleDelete = (row) => {
  ElMessageBox.confirm('您确定删除吗', {
    type: 'warning'
  }).then(async () => {
    await deleteFile(row.id)
    ElMessage.success('删除成功')
    // 重新渲染数据
    getListData()
  })
}

/**
 * 查询
 */
const handleQuery = () => {
  getListData()
}

/**
 * 初始化
 */
onMounted(() => {
  getListData()
})
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
