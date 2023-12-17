<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色标识" prop="code">
        <el-input v-model="formData.code" placeholder="请输入角色标识" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <!-- <el-select v-model="formData.status" clearable placeholder="请选择状态">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.COMMON_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select> -->
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输备注" type="textarea" />
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
import { addRole, modifyRole } from '@/api/role'
import { ElMessage } from 'element-plus'

// /**
//  * 所有部门信息
//  */
// const allDeptList = ref([])
const title = ref('新增角色')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  name: '',
  code: '',
  type: -1,
  remark: ''
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
const emits = defineEmits(['update:modelValue', 'roleAction'])

/**
 * 打开回调
 */
const open = async () => {
  //初始化表单
  formData.id = props.selectRow.id
  formData.name = props.selectRow.name
  formData.code = props.selectRow.code
  formData.type = 0
  formData.remark = props.selectRow.remark
  title.value = formData.id !== undefined ? '编辑角色' : '新增角色'
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
    await modifyRole(formData)
    ElMessage.success('新增角色成功')
  } else {
    await addRole(formData)
    ElMessage.success('编辑角色成功')
  }
  emits('update:modelValue', false)
  emits('roleAction')
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
