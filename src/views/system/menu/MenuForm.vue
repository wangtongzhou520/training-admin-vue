<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="formData.parentId"
          :data="menuTree"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="formData.type">
          <el-radio-button :label="1">目录</el-radio-button>
          <el-radio-button :label="2">菜单</el-radio-button>
          <el-radio-button :label="3">按钮</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.type !== 3" label="访问地址" prop="path">
        <el-input v-model="formData.path" clearable placeholder="请输入访问地址" />
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="组件地址" prop="component">
        <el-input v-model="formData.component" clearable placeholder="user/index" />
      </el-form-item>
      <el-form-item v-if="formData.type === 2" label="组件名字" prop="componentName">
        <el-input v-model="formData.componentName" clearable placeholder="user" />
      </el-form-item>
      <el-form-item v-if="formData.type !== 1" label="权限标识" prop="permission">
        <el-input v-model="formData.permission" clearable placeholder="请输入权限标识" />
      </el-form-item>
      <el-form-item label="显示排序" prop="sort">
        <el-input-number v-model="formData.sort" :min="0" clearable controls-position="right" />
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
import { tranListToTreeData, defaultProps } from '@/utils/tree'
import { menuList, addMenu, modifyMenu } from '@/api/menu'
import { ElMessage } from 'element-plus'

/**
 * 菜单树
 */
const menuTree = ref([])

/**
 * 标题
 */
const title = ref('新增菜单')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  parentId: -1,
  name: '',
  permission: '',
  path: '',
  component: '',
  componentName: '',
  type: -1,
  sort: -1
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

const emits = defineEmits(['update:modelValue', 'menuAction'])

/**
 * 打开回调
 */
const open = async () => {
  menuTree.value = []
  getMeanTree()
  //初始化表单
  formData.id = props.selectRow.id
  formData.parentId = props.selectRow.parentId
  formData.name = props.selectRow.name
  formData.permission = props.selectRow.permission
  formData.path = props.selectRow.path
  formData.component = props.selectRow.component
  formData.componentName = props.selectRow.componentName
  formData.componentName = props.selectRow.componentName
  formData.type = props.selectRow.type
  formData.sort = props.selectRow.sort
  title.value = formData.id !== undefined ? '编辑菜单' : '新增菜单'
}

/**
 * 获取菜单列表
 */
const getMeanTree = async () => {
  const queryParams = {
    name: undefined,
    visible: undefined
  }
  const result = await menuList(queryParams)
  const menu = { id: 0, name: '根目录', children: [] }
  menu.children = tranListToTreeData(result)
  menuTree.value.push(menu)
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
    await modifyMenu(formData)
    ElMessage.success('编辑菜单成功')
  } else {
    await addMenu(formData)
    ElMessage.success('新增菜单成功')
  }
  emits('update:modelValue', false)
  emits('menuAction')
}

// /** 初始化 **/
// onMounted(() => {
//   getMeanTree()
// })
</script>

<style lang="scss" scoped></style>
