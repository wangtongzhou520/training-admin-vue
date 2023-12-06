<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary">导入数据</el-button>
        <el-button type="success"> 导出数据 </el-button>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-expand-all="isExpandAll"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="type" label="菜单类型"> </el-table-column>
        <el-table-column prop="permission" label="permission"> </el-table-column>
        <!-- <el-table-column prop="gmtCreate" label="创建时间">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.gmtCreate) }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="info" size="small">分配权限</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { menuList } from '@/api/menu'
import { tranListToTreeData } from '@/utils/tree.js'

const tableData = ref([])
const isExpandAll = ref(false)

// 获取数据的方法
const getListData = async () => {
  const result = await menuList({
    name: null
  })
  tableData.value = tranListToTreeData(result)
}
getListData()

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
}
</style>
