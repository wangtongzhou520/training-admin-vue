<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="筛选分类">
        <el-tree-select
          v-model="formData.categoryId"
          :data="fileCategoryTree"
          :props="defaultProps"
          check-strictly
          node-key="id"
          placeholder="请选择筛选分类"
        />
      </el-form-item>
      <!-- <el-form-item label="分类ID" prop="categoryId">
        <el-input v-model="formData.categoryId" placeholder="请输入分类ID" />
      </el-form-item> -->
      <el-form-item label="文件名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入文件名称" />
      </el-form-item>
      <el-form-item label="文件路径" prop="path">
        <el-input v-model="formData.path" placeholder="请输入文件路径" />
      </el-form-item>
      <el-form-item label="文件URL" prop="url">
        <el-input v-model="formData.url" placeholder="请输入文件URL" />
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
import { modifyFile } from '@/api/tool/file'
import { tranListToTreeData, defaultProps } from '@/utils/tree.js'
import { fileCategoryList } from '@/api/tool/file'
import { ElMessage } from 'element-plus'

/**
 * 标题
 */
const title = ref('编辑文件')

/**
 * 分类树
 */
const fileCategoryTree = ref([])

/**
 * 表单内容
 */
const formData = reactive({
  id:undefined,
  categoryId:undefined,
  name:undefined,
  path:undefined,
  url:undefined
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
  //初始化表单
  formData.id=props.selectRow.id
  formData.categoryId=props.selectRow.categoryId
  formData.name=props.selectRow.name
  formData.path=props.selectRow.path
  formData.url = props.selectRow.url

  getCategoryTree()
}

const getCategoryTree = async () => {
  const result = await fileCategoryList({
    id: undefined,
  })
  fileCategoryTree.value = tranListToTreeData(result)
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
    await modifyFile(formData)
    ElMessage.success('新增成功')
  }
  emits('update:modelValue', false)
  emits('success')
}
</script>

<style lang="scss" scoped></style>
