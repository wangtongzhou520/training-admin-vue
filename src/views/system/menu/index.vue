<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form ref="queryFormRef" :inline="true" :model="queryParams" class="demo-form-inline">
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="queryParams.name" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item label="状态" prop="visible">
            <el-input v-model="queryParams.visible" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onAddMenuClick">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :default-expand-all="isExpandAll"
        row-key="id"
      >
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <!-- <el-table-column prop="type" label="菜单类型"> </el-table-column> -->
        <el-table-column prop="path" label="路由地址"> </el-table-column>
        <el-table-column prop="component" label="组件路径"> </el-table-column>
        <el-table-column prop="componentName" label="组件名称"> </el-table-column>
        <el-table-column prop="permission" label="权限标识"> </el-table-column>
        <el-table-column prop="sort" label="排序顺序"> </el-table-column>
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="info" size="small" @click="onMenuModifyClick(row)">编辑权限</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <menu-dialog
        v-model="menuFormVisible"
        :selectRow="selectRow"
        @menuAction="getListData()"
      ></menu-dialog>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { menuList } from '@/api/menu'
import { tranListToTreeData } from '@/utils/tree.js'
import MenuDialog from '../menu/MenuForm.vue'

/**
 * 返回结果
 */
const tableData = ref([])
/**
 * 是否展开
 */
const isExpandAll = ref(false)
/**
 * 选中的数据
 */
const selectRow = ref({})

/**
 * 查询参数
 */
const queryParams = reactive({
  name: undefined,
  visible: undefined
})

// 获取数据的方法
const getListData = async () => {
  const result = await menuList(queryParams)
  tableData.value = tranListToTreeData(result)
  console.log(tableData.value)
}

/**
 * 删除
 */
const handleDelete = (row) => {
  ElMessageBox.confirm('您确定删除' + row.name + '该菜单信息', {
    type: 'warning'
  }).then(async () => {
    ElMessage.success('删除成功')
    // 重新渲染数据
    getListData()
  })
}

/**
 * 编辑菜单
 */
const menuFormVisible = ref(false)
const onMenuModifyClick = (row) => {
  menuFormVisible.value = true
  selectRow.value = row
}

/**
 * 新增菜单
 */
const onAddMenuClick = () => {
  menuFormVisible.value = true
  selectRow.value = {}
}

/**
 * 查询
 */
const onSearch = () => {
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
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }
}
</style>
