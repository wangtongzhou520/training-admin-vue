<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名称">
            <el-input v-model="formData.username" placeholder="请输入用户名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部门" prop="deptId">
            <el-tree-select
              v-model="formData.deptId"
              :data="deptData"
              :props="defaultProps"
              check-strictly
              node-key="id"
              placeholder="请选择归属部门"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="电话">
            <el-input v-model="formData.telephone" placeholder="请输入手机号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱">
            <el-input v-model="formData.mail" placeholder="请输入邮箱" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input v-model="formData.remark" placeholder="请输入内容" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
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
import { addUser, modifyUser } from '@/api/user'
import { deptList } from '@/api/dept'
import { ElMessage } from 'element-plus'
import { tranListToTreeData, defaultProps } from '@/utils/tree'

/**
 * 部门
 */
const deptData = ref([])

const title = ref('新增用户')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  username: '',
  deptId: -1,
  telephone: '',
  password: '123456',
  mail: '',
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
const emits = defineEmits(['update:modelValue', 'userAction'])

/**
 * 打开回调
 */
const open = async () => {
  //初始化表单
  formData.id = props.selectRow.id
  formData.username = props.selectRow.username
  formData.telephone = props.selectRow.telephone
  formData.mail = props.selectRow.mail
  formData.deptId = props.selectRow.deptId
  formData.remark = props.selectRow.remark
  title.value = formData.id !== undefined ? '编辑用户' : '新增用户'
  getListData()
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
    await modifyUser(formData)
    ElMessage.success('编辑用户成功')
  } else {
    await addUser(formData)
    ElMessage.success('新增用户成功')
  }
  emits('update:modelValue', false)
  emits('userAction')
}

// 获取部门信息
const getListData = async () => {
  const result = await deptList({
    name: undefined,
    visible: undefined
  })
  deptData.value = tranListToTreeData(result)
}

// /** 初始化 **/
// onMounted(() => {
//   getListData()
// })
</script>

<style lang="scss" scoped></style>
