<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="上级分类">
        <el-tree-select
          v-model="formData.parentId"
          :data="categoryTree"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序序号" />
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
import { categoryList,addCategory, modifyCategory } from '@/api/course/category'
import { ElMessage } from 'element-plus'

/**
 * 分类
 */
const categoryTree = ref([])

/**
 * 新增课程分类
 */
const title = ref('新增课程分类')

/**
 * 表单内容
 */
const formData = reactive({
  id:-1,
  name:'',
  parentId:-1,
  sort:-1,
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

const emits = defineEmits(['update:modelValue', 'success'])

/**
 * 打开回调
 */
const open = async () => {
  categoryTree.value = []
  getCategoryTree()
  console.log(props.selectRow)
  //初始化表单
  formData.id=props.selectRow.id
  formData.name=props.selectRow.name
  formData.parentId=props.selectRow.parentId
  formData.sort=props.selectRow.sort
  title.value = formData.id !== undefined ? '编辑课程分类' : '新增课程分类'
}

/**
 * 获取部门树
 */
 const getCategoryTree = async () => {
  const queryParams = {
    name: undefined,
    deleteState: undefined
  }
  const result = await categoryList(queryParams)
  const category = { id: 0, name: '顶级菜单', children: [] }
  category.children = tranListToTreeData(result)
  categoryTree.value.push(category)
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
    await modifyCategory(formData)
    ElMessage.success('新增成功')
  } else {
    await addCategory(formData)
    ElMessage.success('编辑成功')
  }
  emits('update:modelValue', false)
  emits('success')
}


</script>

<style lang="scss" scoped></style>
