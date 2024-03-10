<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="120px">
      <el-form-item label="数据源名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="数据源连接" prop="url">
        <el-input v-model="formData.url" placeholder="请输入数据源连接" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formData.password" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">关闭</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { addDataSourceConfig, modifyDataSourceConfig } from '@/api/tool/dataSourceConfig'
import { ElMessage } from 'element-plus'

// /**
//  * 所有部门信息
//  */
// const allDeptList = ref([])

const title = ref('新增数据源')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  name: '',
  url: '',
  username: '',
  password: ''
})

/**
 * 父传子的参数
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  selectRow: {
    type: Object,
    required: true
  }
})
const emits = defineEmits(['update:modelValue', 'dataSourceConfigAction'])

/**
 * 打开回调
 */
const open = async () => {
  //初始化表单
  formData.id = props.selectRow.id
  formData.name = props.selectRow.name
  formData.url = props.selectRow.url
  formData.username = props.selectRow.username
  formData.password = props.selectRow.password
  title.value = formData.id !== undefined ? '编辑数据源' : '新增数据源'
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

/**
 * 确定
 */
const onConfirm = async () => {
  if (formData.id !== undefined) {
    await modifyDataSourceConfig(formData)
    ElMessage.success('新增数据源成功')
  } else {
    await addDataSourceConfig(formData)
    ElMessage.success('编辑数据源成功')
  }
  emits('update:modelValue', false)
  emits('dataSourceConfigAction')
}

// // 获取部门信息
// const getListData = async () => {
//   allDeptList.value = await deptList()
// }

// /** 初始化 **/
// onMounted(() => {
//   getListData()
// })
</script>

<style lang="scss" scoped></style>
