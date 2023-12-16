<template>
  <el-dialog header="分配角色" :model-value="modelValue" @close="closed" @open="open">
    <el-form ref="formRef" :model="formData" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="formData.username" :disabled="true" />
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="formData.roleIds" multiple placeholder="请选择角色">
          <el-option
            v-for="item in allRoleList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
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
import { roleList } from '@/api/role'
import { userRoleList, addUserRole } from '@/api/permission'

/**
 * 所有角色
 */
const allRoleList = ref([])

/**
 * 表单内容
 */
const formData = reactive({
  userId: -1,
  username: '',
  roleIds: []
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
const emits = defineEmits(['update:modelValue'])

/**
 * 确定
 */
const onConfirm = async () => {
  await addUserRole(formData)
  emits('update:modelValue', false)
}

/**
 * 打开回调
 */
const open = async () => {
  //初始化表单
  formData.userId = props.selectRow.id
  formData.username = props.selectRow.username
  formData.roleIds = await userRoleList(props.selectRow.id)
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 获取所有角色数据的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}

/** 初始化 **/
onMounted(() => {
  getListData()
})
</script>

<style lang="scss" scoped></style>
