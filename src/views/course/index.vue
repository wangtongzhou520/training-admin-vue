<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4" :xs="24">
        <el-card>
          <CourseCategoryTree @node-click="handleCourseCategoryClick" />
        </el-card>
      </el-col>
      <el-col :span="20" :xs="24">
        <div class="user-manage-container">
          <el-card class="header">
            <el-form :inline="true" :model="queryParams" class="-mb-15px" label-width="68px">
              <el-form-item label="课程名称" prop="courseName">
                  <el-input
                    v-model="queryParams.courseName"
                    placeholder="请输入课程名称"
                    clearable
                    class="!w-240px"
                  >
                  </el-input>
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
        <el-table-column label="课程名称" align="center" prop="courseName" />
        <el-table-column label="课程描述" align="center" prop="description" />
        <el-table-column label="是否发布" align="center" prop="isPublished" />
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-button type="info" size="small" @click="handleModify(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
        <CourseForm-drawer
        v-model="courseFormVisible"
        :selectRow="selectRow"
        @success="getListData()"
        ></CourseForm-drawer>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { pageCourseList, deleteCourse } from '@/api/course/course'
import CourseCategoryTree from '../course/CourseCategory.vue'
import CourseFormDrawer from '../course/CourseForm.vue'


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
  categoryId: undefined,
  pageNo: 1,
  pageSize: 10
})

/**
 * 获取数据
 */
const getListData = async () => {
  const result = await pageCourseList(queryParams)
  tableData.value = result.list
  total.value = result.total
}


/** 分类点击 */
const handleCourseCategoryClick = async (row) => {
  queryParams.categoryId = row.id
  await getListData()
}

/**
 * 编辑
 */
const courseFormVisible = ref(false)

const handleModify = (row) => {
  courseFormVisible.value = true
  selectRow.value = row
}

/**
 * 新增
 */
const handleCreate = () => {
  if (queryParams.categoryId === undefined) {
    ElMessage.error('请选择分类')
    return
  }
  courseFormVisible.value = true
  selectRow.value = {categoryId: queryParams.categoryId}
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
  ElMessageBox.confirm('您确定删除吗', {
    type: 'warning'
  }).then(async () => {
    await deleteCourse(row.id)
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
