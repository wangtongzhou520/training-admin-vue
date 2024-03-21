<template>
  <div>
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
import { getDatabaseTableDetail } from '@/api/tool/generator'
import { useRoute, useRouter } from 'vue-router'

/**
 * 路由
 */
const { push, currentRoute } = useRouter()
/**
 * 参数
 */
const { query } = useRoute()

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

const formData = reactive({
  table: {},
  columns: []
})

const getDetail = async () => {
  const id = query.id
  if (!id) {
    return
  }
  formLoading.value = true
  try {
    const result = await getDatabaseTableDetail(id)
    formData.table = result.generatorTable
    formData.columns = result.generatorColumns
    console.log(result.generatorColumns)
  } finally {
    formLoading.value = false
  }
}

/**
 * 提交
 */
const submitForm = async () => {
  // // 参数校验
  // if (!unref(formData)) return
  // await unref(basicInfoRef)?.validate()
  // await unref(generateInfoRef)?.validate()
  // try {
  //   // 提交请求
  //   await CodegenApi.updateCodegenTable(formData.value)
  //   message.success(t('common.updateSuccess'))
  //   close()
  // } catch {}
}

/**
 * 关闭
 */
const close = () => {
  // delView(unref(currentRoute))
  // push('/infra/codegen')
}

/**
 * 初始化
 */
onMounted(() => {
  getDetail()
})
</script>

<style lang="scss" scoped></style>
