<template>
  <div class="container">
      <el-card class="header">
          <el-form :inline="true" :model="queryParams">
            <el-form-item label="分类名称" prop="name">
                <el-input
                  v-model="queryParams.name"
                  placeholder="请输入分类名称"
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
        <el-table         
        :data="tableData"
        border
        style="width: 100%"
        :default-expand-all="isExpandAll"
        row-key="id">
              <el-table-column label="分类名称" prop="name" />
              <el-table-column label="排序序号"  prop="sort" />
            <el-table-column label="操作">
              <template #default="{ row }">
              <el-button
                type="info"
                size="small"
                @click="handleModify(row)"
              >编辑角色</el-button>
              <el-button
                link
                type="danger"
                @click="handleDelete(row)"
              >删除</el-button>
            </template>
            </el-table-column>
        </el-table>
      </el-card>
      <CategoryDialog
        v-model="categoryFormVisible"
        :selectRow="selectRow"
        @success="getListData()"
      />
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import CategoryDialog from '../category/CategoryForm.vue'
import { categoryList, deleteCategory } from '@/api/course/category'
import { tranListToTreeData } from '@/utils/tree.js'


/**
* 列表内容
*/
const tableData = ref([])

/**
 * 是否展开
 */
 const isExpandAll = ref(true)

/**
* 选中的数据
*/
const selectRow = ref({})
/**
* 查询参数
*/
const queryParams = reactive({
  categoryName:undefined,
})

/**
* 获取数据
*/
const getListData = async () => {
  const result = await categoryList(queryParams)
  tableData.value = tranListToTreeData(result)
}

/**
* 编辑
*/
const categoryFormVisible = ref(false)
const handleModify = (row) => {
  categoryFormVisible.value = true
  selectRow.value = row
}

/**
* 新增
*/
const handleCreate = () => {
  categoryFormVisible.value = true
  selectRow.value = {}
}




/**
* 删除
*/
const handleDelete = (row) => {
  ElMessageBox.confirm('您确定删除吗', {
      type: 'warning'
  }).then(async () => {
      await deleteCategory(row.id)
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