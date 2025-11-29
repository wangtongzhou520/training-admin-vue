<template>
  <el-dialog ref="formRef" :model-value="modelValue" title="分配权限" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="角色名称" prop="name">
        <el-tag>{{ formData.name }}</el-tag>
      </el-form-item>
      <el-form-item label="角色标识" prop="code">
        <el-tag>{{ formData.code }}</el-tag>
      </el-form-item>
      <el-form-item label="菜单权限">
        <el-card class="cardHeight">
          <template #header>
            全选/全不选:
            <el-switch
              v-model="treeNodeAll"
              active-text="是"
              inactive-text="否"
              inline-prompt
              @change="handleCheckedTreeNodeAll"
            />
            全部展开/折叠:
            <el-switch
              v-model="menuExpand"
              active-text="展开"
              inactive-text="折叠"
              inline-prompt
              @change="handleCheckedTreeExpand"
            />
          </template>
          <el-tree
            ref="treeRef"
            :data="menuData"
            :props="defaultProps"
            :default-checked-keys="formData.menuIds"
            empty-text="加载中，请稍候"
            node-key="id"
            show-checkbox
          />
        </el-card>
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
import { defineProps, defineEmits, reactive } from 'vue'
import { menuList } from '@/api/menu'
import { roleMenuList, addRoleMenu } from '@/api/permission'
import { tranListToTreeData, defaultProps } from '@/utils/tree'
import { ElMessage } from 'element-plus'

/**
 * 菜单列表
 */
const menuData = ref([])

/**
 * 树
 */
const treeRef = ref([])

/**
 * 全选/全不选
 */
const treeNodeAll = ref(false)

/**
 * 展开/折叠
 */
const menuExpand = ref(false)

/**
 * 表单内容
 */
const formData = reactive({
  roleId: -1,
  name: '',
  code: '',
  menuIds: []
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

const emits = defineEmits(['update:modelValue', 'roleAssignMenuAction'])

/**
 * 打开回调
 */
const open = async () => {
  //初始化表单
  formData.roleId = props.selectRow.id
  formData.name = props.selectRow.name
  formData.code = props.selectRow.code
  //初始化已经菜单列表
  formData.menuIds = await roleMenuList(props.selectRow.id)
}

/**
 * 获取菜单列表
 */
const getMeanData = async () => {
  const queryParams = {
    name: undefined,
    visible: undefined
  }
  const result = await menuList(queryParams)
  menuData.value = tranListToTreeData(result)
}

/**
 * 确定
 */
const onConfirm = async () => {
  formData.menuIds = treeRef.value.getCheckedKeys()
  await addRoleMenu(formData)
  emits('update:modelValue', false)
  ElMessage.success('添加权限成功')
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}

/**
 * 全选/全不选
 */
const handleCheckedTreeNodeAll = () => {
  treeRef.value.setCheckedNodes(treeNodeAll.value ? menuData.value : [])
}

/**
 * 展开/折叠全部
 */
const handleCheckedTreeExpand = () => {
  const nodes = treeRef.value?.store.nodesMap
  for (let node in nodes) {
    if (nodes[node].expanded === menuExpand.value) {
      continue
    }
    nodes[node].expanded = menuExpand.value
  }
}

/**
 * 初始化
 */
onMounted(() => {
  getMeanData()
})
</script>

<style lang="scss" scoped>
.cardHeight {
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
}
</style>
