<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="分类ID" prop="categoryId">
        <el-input v-model="formData.categoryId" placeholder="请输入分类ID" />
      </el-form-item>
      <el-form-item label="文件名" prop="name">
        <el-input v-model="formData.name" placeholder="请输入文件名" />
      </el-form-item>
      <el-form-item label="文件路径" prop="path">
        <el-input v-model="formData.path" placeholder="请输入文件路径" />
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="formData.url" placeholder="请输入url" />
      </el-form-item>
      <el-form-item label="文件后缀" prop="suffix">
        <el-input v-model="formData.suffix" placeholder="请输入文件后缀" />
      </el-form-item>
      <el-form-item label="文件类型,1文件0图片2视频" prop="type">
        <el-select v-model="formData.type" placeholder="请选择文件类型,1文件0图片2视频">
          <el-option label="请选择字典生成" value="" />
        </el-select>
      </el-form-item>
      <el-form-item label="文件大小" prop="size">
        <el-input v-model="formData.size" placeholder="请输入文件大小" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <!-- <el-form-item label="创建者" prop="createOperator">
        <el-input v-model="formData.createOperator" placeholder="请输入创建者" />
      </el-form-item>
      <el-form-item label="修改者" prop="modifiedOperator">
        <el-input v-model="formData.modifiedOperator" placeholder="请输入修改者" />
      </el-form-item>
      <el-form-item label="创建时间" prop="gmtCreate">
        <el-date-picker
          v-model="formData.gmtCreate"
          type="date"
          value-format="x"
          placeholder="选择创建时间"
        />
      </el-form-item>
      <el-form-item label="修改时间" prop="gmtModified">
        <el-date-picker
          v-model="formData.gmtModified"
          type="date"
          value-format="x"
          placeholder="选择修改时间"
        />
      </el-form-item> -->
      <el-form-item label="删除状态" prop="deleteState">
        <el-checkbox-group v-model="formData.deleteState">
          <el-radio label="1">请选择字典生成</el-radio>
        </el-checkbox-group>
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
import { addFile, modifyFile } from '@/api/tool/file'
import { ElMessage } from 'element-plus'

/**
 * 标题
 */
const title = ref('新增文件')

/**
 * 表单内容
 */
const formData = reactive({
  id: undefined,
  categoryId: undefined,
  name: undefined,
  path: undefined,
  url: undefined,
  suffix: undefined,
  type: undefined,
  size: undefined,
  remark: undefined,
  createOperator: undefined,
  modifiedOperator: undefined,
  gmtCreate: undefined,
  gmtModified: undefined,
  deleteState: undefined
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
  formData.id = props.selectRow.id
  formData.categoryId = props.selectRow.categoryId
  formData.name = props.selectRow.name
  formData.path = props.selectRow.path
  formData.url = props.selectRow.url
  formData.suffix = props.selectRow.suffix
  formData.type = props.selectRow.type
  formData.size = props.selectRow.size
  formData.remark = props.selectRow.remark
  formData.createOperator = props.selectRow.createOperator
  formData.modifiedOperator = props.selectRow.modifiedOperator
  formData.gmtCreate = props.selectRow.gmtCreate
  formData.gmtModified = props.selectRow.gmtModified
  formData.deleteState = props.selectRow.deleteState
  title.value = formData.id !== undefined ? '编辑文件' : '新增文件'
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
  } else {
    await addFile(formData)
    ElMessage.success('编辑成功')
  }
  emits('update:modelValue', false)
  emits('success')
}
</script>

<style lang="scss" scoped></style>
