<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="上级部门">
        <el-tree-select
          v-model="formData.parentId"
          :data="deptTree"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="显示排序" prop="seq">
        <el-input-number v-model="formData.seq" :min="0" clearable controls-position="right" />
      </el-form-item>
      <el-form-item label="负责人" prop="manageId">
        <el-select
          v-model="formData.manageId"
          filterable
          remote
          value-key="id"
          :remote-method="searchUserName"
          :loading="searchUserNameLoading"
          style="width: 240px"
        >
          <el-option
            v-for="item in userList"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
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
import { tranListToTreeData, defaultProps } from '@/utils/tree.js'
import { deptList, addDept, modifyDept } from '@/api/dept'
import { pageUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'

/**
 * 搜索
 */
const searchUserNameLoading = ref(true)

/**
 * 用户列表
 */
const userList = ref([])

/**
 * 部门树
 */
const deptTree = ref([])

/**
 * 标题
 */
const title = ref('新增部门')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  parentId: -1,
  name: '',
  seq: -1,
  remark: '',
  manageId: ''
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

const emits = defineEmits(['update:modelValue', 'deptAction'])

/**
 * 打开回调
 */
const open = async () => {
  deptTree.value = []
  getDeptTree()
  //初始化表单
  formData.id = props.selectRow.id
  formData.parentId = props.selectRow.parentId
  formData.name = props.selectRow.name
  formData.seq = props.selectRow.seq
  formData.manageId = props.selectRow.manageId
  formData.remark = props.selectRow.remark
  title.value = formData.id !== undefined ? '编辑部门' : '新增部门'
  const queryParams = {
    id: formData.manageId,
    pageNo: 1,
    pageSize: 10
  }
  const result = await pageUserInfo(queryParams)
  userList.value = result.list
}

/**
 * 获取部门树
 */
const getDeptTree = async () => {
  const queryParams = {
    name: undefined,
    deleteState: undefined
  }
  const result = await deptList(queryParams)
  const dept = { id: 0, name: '顶级菜单', children: [] }
  dept.children = tranListToTreeData(result)
  deptTree.value.push(dept)
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
    await modifyDept(formData)
    ElMessage.success('编辑部门成功')
  } else {
    await addDept(formData)
    ElMessage.success('新增部门成功')
  }
  emits('update:modelValue', false)
  emits('deptAction')
}

const searchUserName = async (query) => {
  searchUserNameLoading.value = true
  userList.value = []
  const queryParams = {
    userName: query,
    pageNo: 1,
    pageSize: 10
  }
  console.log(query)
  const result = await pageUserInfo(queryParams)
  searchUserNameLoading.value = false
  userList.value = result.list
}

// /** 初始化 **/
// onMounted(() => {
//   getMeanTree()
// })
</script>

<style lang="scss" scoped></style>
