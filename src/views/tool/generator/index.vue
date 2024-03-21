<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-form :inline="true" :model="queryParams" class="demo-form-inline">
          <el-form-item label="表名称" prop="tableName">
            <el-input v-model="queryParams.tableName" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item label="表描述" prop="tableComment">
            <el-input v-model="queryParams.tableComment" clearable placeholder="请输入菜单名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleAdd">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column align="center" label="数据源" prop="dataSourceConfigName">
        </el-table-column>
        <el-table-column align="center" label="表名称" prop="tableName" width="200" />
        <el-table-column
          :show-overflow-tooltip="true"
          align="center"
          label="表描述"
          prop="tableComment"
        />
        <el-table-column align="center" label="实体" prop="className" />
        <el-table-column prop="gmtCreate" label="创建时间">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.gmtCreate) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="info" size="small" @click="handleUpdate(row)">编辑角色</el-button>
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
    <AddTableDialog
      v-model="addTableFormVisible"
      :selectRow="selectRow"
      @addGeneratorAction="getListData()"
    ></AddTableDialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageGenerator, deleteGenerator } from '@/api/tool/generator'
import AddTableDialog from '../generator/AddTable.vue'
import { useRouter } from 'vue-router'

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

const router = useRouter()

/**
 * 查询参数
 */
const queryParams = reactive({
  name: undefined,
  pageNo: 1,
  pageSize: 10
})

// 获取数据的方法
const getListData = async () => {
  const result = await pageGenerator(queryParams)
  tableData.value = result.list
  total.value = result.total
}

/**
 * 编辑角色
 */
const handleUpdate = (row) => {
  router.push('/generator/edit?id=' + row.id)
}

/**
 * 新增角色
 */
const addTableFormVisible = ref(false)

const handleAdd = () => {
  addTableFormVisible.value = true
  selectRow.value = row
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
    await deleteGenerator(row.id)
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
