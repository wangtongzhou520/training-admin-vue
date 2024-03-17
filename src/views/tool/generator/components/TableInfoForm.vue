<template>
  <div>
    <el-form :model="formData" border style="width: 100%">
      <el-row>
        <el-col :span="12">
          <el-form-item label="模块名" prop="moduleName">
            <el-input v-model="formData.moduleName" placeholder="请输入模块名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业务名" prop="businessName">
            <el-input v-model="formData.businessName" placeholder="请输入业务名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="表名称" prop="tableName">
            <el-input v-model="formData.tableName" placeholder="请输入表名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="表描述" prop="tableComment">
            <el-input v-model="formData.tableComment" placeholder="请输入表描述" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类名称" prop="className">
            <el-input v-model="formData.className" placeholder="请输入类名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="类描述" prop="author">
            <el-input v-model="formData.classComment" placeholder="请输入类描述" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="作者" prop="author">
            <el-input v-model="formData.author" placeholder="请输入类名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formData.remark" :rows="3" type="textarea" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const formRef = ref()
const formData = ref({
  moduleName: '',
  businessName: '',
  tableName: '',
  tableComment: '',
  className: '',
  classComment: '',
  author: '',
  remark: ''
})

const props = defineProps({
  table: {
    type: Object,
    default: () => null
  }
})

watch(
  () => props.table,
  (table) => {
    if (!table) return
    formData.value = table
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
