<template>
  <div class="container">
    <el-card class="header">
      <el-form :inline="true" :model="queryParams">
        <el-form-item label="分类ID" prop="categoryId">
          <el-input
            v-model="queryParams.categoryId"
            placeholder="请输入分类ID"
            clearable
            class="!w-240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文件名" prop="name">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入文件名"
            clearable
            class="!w-240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文件路径" prop="path">
          <el-input
            v-model="queryParams.path"
            placeholder="请输入文件路径"
            clearable
            class="!w-240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="url" prop="url">
          <el-input v-model="queryParams.url" placeholder="请输入url" clearable class="!w-240px">
          </el-input>
        </el-form-item>
        <el-form-item label="文件后缀" prop="suffix">
          <el-input
            v-model="queryParams.suffix"
            placeholder="请输入文件后缀"
            clearable
            class="!w-240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="文件类型,1文件0图片2视频" prop="type">
          <el-select
            v-model="queryParams.type"
            placeholder="请选择文件类型,1文件0图片2视频"
            clearable
            class="!w-240px"
          >
            <el-option label="请选择字典生成" value="" />
          </el-select>
        </el-form-item>
        <el-form-item label="文件大小" prop="size">
          <el-input
            v-model="queryParams.size"
            placeholder="请输入文件大小"
            clearable
            class="!w-240px"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleCreate">新增</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="tableData" v-loading="loading" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column label="编号" align="center" prop="id" />
        <el-table-column label="分类ID" align="center" prop="categoryId" />
        <el-table-column label="文件名" align="center" prop="name" />
        <el-table-column label="文件路径" align="center" prop="path" />
        <el-table-column label="url" align="center" prop="url" />
        <el-table-column label="文件后缀" align="center" prop="suffix" />
        <el-table-column label="文件类型,1文件0图片2视频" align="center" prop="type" />
        <el-table-column label="文件大小" align="center" prop="size" />
        <el-table-column label="备注" align="center" prop="remark" />
        <el-table-column label="创建者" align="center" prop="createOperator" />
        <el-table-column label="修改者" align="center" prop="modifiedOperator" />
        <el-table-column
          label="创建时间"
          align="center"
          prop="gmtCreate"
          :formatter="dateFormatter"
          width="180px"
        />
        <el-table-column
          label="修改时间"
          align="center"
          prop="gmtModified"
          :formatter="dateFormatter"
          width="180px"
        />
        <el-table-column label="删除状态" align="center" prop="deleteState" />
        <el-table-column label="操作" align="center">
          <el-button
            type="info"
            size="small"
            @click="handleModify(row)"
            v-permission="['tool:file:role-menu']"
            >编辑角色</el-button
          >
          <el-button link type="danger" @click="handleDelete(row)" v-hasPermi="['tool:file:delete']"
            >删除</el-button
          >
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        v-model:current-page="queryParams.pageNo"
        v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-card>
    <FileDialog v-model="fileFormVisible" :selectRow="selectRow" @success="getListData()" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import FileDialog from '../file/FileFrom.vue'
import { pageFileList, deleteFile } from '@/api/file'

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
  categoryId: undefined,
  name: undefined,
  path: undefined,
  url: undefined,
  suffix: undefined,
  type: undefined,
  size: undefined,
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
  selectRow.value = {}
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
