<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="上级分类">
        <el-tree-select
          v-model="formData.parentId"
          :data="fileCategoryTree"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" clearable placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="显示排序" prop="seq">
        <el-input-number v-model="formData.seq" :min="0" clearable controls-position="right" />
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
import { fileCategoryList, addFileCategory, modifyFileCategory } from '@/api/tool/file'
import { ElMessage } from 'element-plus'

/**
 * 分类树
 */
const fileCategoryTree = ref([])

/**
 * 标题
 */
const title = ref('新增分类')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  parentId: -1,
  name: '',
  seq: -1,
  remark: '',
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

const emits = defineEmits(['update:modelValue', 'fileCategoryAction'])

/**
 * 打开回调
 */
const open = async () => {
  fileCategoryTree.value = []
  getFileCategoryTree()
  //初始化表单
  formData.id = props.selectRow.id
  formData.parentId = props.selectRow.parentId
  formData.name = props.selectRow.name
  formData.seq = props.selectRow.seq
  formData.remark = props.selectRow.remark
  title.value = formData.id !== undefined ? '编辑分类' : '新增分类'
}

/**
 * 获取分类
 */
const getFileCategoryTree = async () => {
  const queryParams = {
    name: undefined
  }
  const result = await fileCategoryList(queryParams)
  const fileCategory = { id: 0, name: '顶级菜单', children: [] }
  fileCategory.children = tranListToTreeData(result)
  fileCategoryTree.value.push(fileCategory)
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
    await modifyFileCategory(formData)
    ElMessage.success('编辑分类成功')
  } else {
    await addFileCategory(formData)
    ElMessage.success('新增分类成功')
  }
  emits('update:modelValue', false)
  emits('fileCategoryAction')
}

</script>

<style lang="scss" scoped></style>
