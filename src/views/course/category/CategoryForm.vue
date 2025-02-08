<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-form :model="formData" label-width="80px">
            <el-form-item label="分类名称" prop="categoryName">
        <el-input v-model="formData.categoryName" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item label="父菜单ID" prop="parentId">
        <el-input v-model="formData.parentId" placeholder="请输入父菜单ID" />
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="formData.sort" placeholder="请输入排序序号" />
      </el-form-item>
      <el-form-item label="创建人" prop="createOperator">
        <el-input v-model="formData.createOperator" placeholder="请输入创建人" />
      </el-form-item>
      <el-form-item label="修改人" prop="modifiedOperator">
        <el-input v-model="formData.modifiedOperator" placeholder="请输入修改人" />
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
      </el-form-item>
      <el-form-item label="删除状态（0：未删除，1：已删除）" prop="deleteState">
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
import { addCategory, modifyCategory } from '@/api/course/category'
import { ElMessage } from 'element-plus'

/**
 * 标题
 */
const title = ref('新增课程分类')

/**
 * 表单内容
 */
const formData = reactive({
  id:undefined,
  categoryName:undefined,
  parentId:undefined,
  sort:undefined,
  createOperator:undefined,
  modifiedOperator:undefined,
  gmtCreate:undefined,
  gmtModified:undefined,
  deleteState:undefined,
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
  formData.categoryName=props.selectRow.categoryName
  formData.parentId=props.selectRow.parentId
  formData.sort=props.selectRow.sort
  formData.createOperator=props.selectRow.createOperator
  formData.modifiedOperator=props.selectRow.modifiedOperator
  formData.gmtCreate=props.selectRow.gmtCreate
  formData.gmtModified=props.selectRow.gmtModified
  formData.deleteState=props.selectRow.deleteState
  title.value = formData.id !== undefined ? '编辑课程分类' : '新增课程分类'
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
