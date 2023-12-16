<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form :inline="true" :model="queryParams" class="demo-form-inline">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="queryParams.name" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item label="角色标识" prop="code">
            <el-input v-model="queryParams.code" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="name" label="角色名称"> </el-table-column>
        <el-table-column prop="type" label="角色类型"> </el-table-column>
        <el-table-column prop="code" label="角色code"> </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.gmtCreate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="info" size="small">分配权限</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
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
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageRoleList } from '@/api/role'

/**
 * 列表内容
 */
const tableData = ref([])
/**
 * 总数
 */
const total = ref(0)

/**
 * 查询参数
 */
const queryParams = ref({
  name: undefined,
  code: undefined,
  pageNo: 1,
  pageSize: 10
})

// 获取数据的方法
const getListData = async () => {
  const result = await pageRoleList(queryParams)
  tableData.value = result.list
  total.value = result.total
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
  ElMessageBox.confirm('您确定删除' + row.name + '该角色信息', {
    type: 'warning'
  }).then(async () => {
    ElMessage.success('删除成功')
    // 重新渲染数据
    getListData()
  })
}
/**
 * 查询
 */
const onSubmit = () => {
  getListData()
}

/** 初始化 **/
onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped>
.user-manage-container {
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
