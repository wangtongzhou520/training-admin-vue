<template>
  <div class="container">
      <el-card class="header">
          <el-form :inline="true" :model="queryParams">
                            <el-form-item label="分类名称" prop="categoryName">
                <el-input
                  v-model="queryParams.categoryName"
                  placeholder="请输入分类名称"
                  clearable
                  class="!w-240px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="父菜单ID" prop="parentId">
                <el-input
                  v-model="queryParams.parentId"
                  placeholder="请输入父菜单ID"
                  clearable
                  class="!w-240px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="排序序号" prop="sort">
                <el-input
                  v-model="queryParams.sort"
                  placeholder="请输入排序序号"
                  clearable
                  class="!w-240px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="创建人" prop="createOperator">
                <el-input
                  v-model="queryParams.createOperator"
                  placeholder="请输入创建人"
                  clearable
                  class="!w-240px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="修改人" prop="modifiedOperator">
                <el-input
                  v-model="queryParams.modifiedOperator"
                  placeholder="请输入修改人"
                  clearable
                  class="!w-240px"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="gmtCreate">
                <el-date-picker
                  v-model="queryParams.gmtCreate"
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="选择创建时间"
                  clearable
                  class="!w-240px"
                />
              </el-form-item>
              <el-form-item label="修改时间" prop="gmtModified">
                <el-date-picker
                  v-model="queryParams.gmtModified"
                  value-format="YYYY-MM-DD"
                  type="date"
                  placeholder="选择修改时间"
                  clearable
                  class="!w-240px"
                />
              </el-form-item>
              <el-form-item label="删除状态（0：未删除，1：已删除）" prop="deleteState">
                <el-select
                  v-model="queryParams.deleteState"
                  placeholder="请选择删除状态（0：未删除，1：已删除）"
                  clearable
                  class="!w-240px"
                >
                  <el-option label="请选择字典生成" value="" />
                </el-select>
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
              <el-table-column label="分类ID" align="center" prop="id" />
              <el-table-column label="分类名称" align="center" prop="categoryName" />
              <el-table-column label="父菜单ID" align="center" prop="parentId" />
              <el-table-column label="排序序号" align="center" prop="sort" />
              <el-table-column label="创建人" align="center" prop="createOperator" />
              <el-table-column label="修改人" align="center" prop="modifiedOperator" />
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
              <el-table-column label="删除状态（0：未删除，1：已删除）" align="center" prop="deleteState" />
            <el-table-column label="操作" align="center">
              <el-button
                type="info"
                size="small"
                @click="handleModify(row)"
                v-permission="['course:category:role-menu']"
              >编辑角色</el-button>
              <el-button
                link
                type="danger"
                @click="handleDelete(row)"
                v-hasPermi="['course:category:delete']"
              >删除</el-button>
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
      <CategoryDialog
        v-model="categoryFormVisible"
        :selectRow="selectRow"
        @success="getListData()"
      />
  </div>
</template>


<script setup>
import { ref, reactive } from 'vue'
import CategoryDialog from '../course/CategoryFrom.vue'
import { pageCategoryList, deleteCategory } from '@/api/course/category'

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
  categoryName:undefined,
  parentId:undefined,
  sort:undefined,
  createOperator:undefined,
  modifiedOperator:undefined,
  gmtCreate:undefined,
  gmtCreate:[],
  gmtModified:undefined,
  gmtModified:[],
  deleteState:undefined,
  pageNo: 1,
  pageSize: 10
})

/**
* 获取数据
*/
const getListData = async () => {
  const result = await pageCategoryList(queryParams)
  tableData.value = result.list
  total.value = result.total
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