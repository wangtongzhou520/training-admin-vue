<template>
  <div v-loading="formLoading">
    <el-tabs v-model="activeName">
      <el-tab-pane label="表信息" name="table">
        <TableInfoForm ref="tableInfoRef" :table="formData.table" />
      </el-tab-pane>
      <el-tab-pane label="字段信息" name="column">
        <ColumInfoForm ref="columInfoRef" :columns="formData.columns" />
      </el-tab-pane>
    </el-tabs>
    <el-form>
      <el-form-item style="float: right">
        <el-button :loading="formLoading" type="primary" @click="submitForm">保存</el-button>
        <el-button @click="close">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ColumInfoForm from './components/ColumInfoForm.vue'
import TableInfoForm from './components/TableInfoForm.vue'
import { getDatabaseTableDetail, modifyGenerator } from '@/api/tool/generator'
import { useRouter } from 'vue-router'
import { systemUseStore } from '@/stores/system'
import { ElMessage } from 'element-plus'

/**
 * 路由
 */
const { push, currentRoute } = useRouter()
/**
 * 参数
 */
const router = useRouter()

/**
 * 激活窗口
 */
const activeName = ref('column')

/**
 * 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
 */
const formLoading = ref(false)

const tableInfoRef = ref()
const columInfoRef = ref()

const systemStore = systemUseStore()

const formData = reactive({
  table: {},
  columns: []
})

const getDetail = async () => {
  const id = router.currentRoute.value.query.id
  if (!id) {
    return
  }
  formLoading.value = true
  try {
    const result = await getDatabaseTableDetail(id)
    formData.table = result.generatorTable
    formData.columns = result.generatorColumns
  } finally {
    formLoading.value = false
  }
}

/**
 * 提交
 */
const submitForm = async () => {
  // 提交请求
  await modifyGenerator(formData)
  ElMessage.success('修改列成功')
  close()
}

/**
 * 关闭
 */
const close = () => {
  systemStore.delView(unref(currentRoute))
  push('/tool/generator/index')
}

/**
 * 初始化
 */
onMounted(() => {
  getDetail()
})
</script>

<style lang="scss" scoped></style>
