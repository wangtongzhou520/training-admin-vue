<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form :inline="true" :model="queryParams" class="demo-form-inline">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model="queryParams.userName" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item label="电话" prop="telephone">
            <el-input v-model="queryParams.telephone" clearable placeholder="请输入菜单名称" />
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
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="telephone" label="电话"> </el-table-column>
        <el-table-column label="头像" align="center">
          <template v-slot="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="mini">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag>其他</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="gmtCreate" label="创建时间">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.gmtCreate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowRoleClick(row)">查看</el-button>
            <el-button type="info" size="small" @click="onAddRoleClick(row)">分配角色</el-button>
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
    <roles-dialog v-model="roleDialogVisible" :selectRow="selectRow"></roles-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageUserInfo, deleteUser } from '@/api/user'
import RolesDialog from '../user/UserAssignRoleForm.vue'

/**
 * 分页列表
 */
const tableData = ref([])
/**
 * 总数
 */
const total = ref(0)

/**
 * 查询参数
 */
const queryParams = reactive({
  userName: undefined,
  telephone: undefined,
  pageNo: 1,
  pageSize: 10
})

// 获取数据的方法
const getListData = async () => {
  const result = await pageUserInfo(queryParams)
  tableData.value = result.list
  total.value = result.total
}

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
  ElMessageBox.confirm('您确定删除' + row.username + '该用户信息', {
    type: 'warning'
  }).then(async () => {
    await deleteUser(row.id)
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

/**
 * 查看角色
 */
const roleDialogVisible = ref(false)
const selectRow = ref({})
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectRow.value = row
}

/**
 * 添加角色
 */
const onAddRoleClick = (row) => {
  roleDialogVisible.value = true
  selectRow.value = row
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
  :deep(.avatar) {
    width: 60px;
    height: 60px;
    border-radius: 50%;
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
