<template>
  <el-table ref="formRef" :data="formData">
    <el-table-column
      :show-overflow-tooltip="true"
      label="字段列名"
      min-width="10%"
      prop="columnName"
    />
    <el-table-column label="字段描述" min-width="10%">
      <template #default="scope">
        <el-input v-model="scope.row.columnComment" />
      </template>
    </el-table-column>
    <el-table-column
      :show-overflow-tooltip="true"
      label="数据库类型"
      min-width="10%"
      prop="dataType"
    />
    <el-table-column label="Java类型" min-width="11%">
      <template #default="scope">
        <el-select v-model="scope.row.javaType">
          <el-option label="Long" value="Long" />
          <el-option label="String" value="String" />
          <el-option label="Integer" value="Integer" />
          <el-option label="Double" value="Double" />
          <el-option label="BigDecimal" value="BigDecimal" />
          <el-option label="LocalDateTime" value="LocalDateTime" />
          <el-option label="Boolean" value="Boolean" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="java属性" min-width="10%">
      <template #default="scope">
        <el-input v-model="scope.row.javaField" />
      </template>
    </el-table-column>
    <el-table-column label="插入" min-width="4%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.addField" false-label="false" true-label="true" />
      </template>
    </el-table-column>
    <el-table-column label="编辑" min-width="4%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.modifyField" false-label="false" true-label="true" />
      </template>
    </el-table-column>
    <el-table-column label="列表" min-width="4%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.queryField" false-label="false" true-label="true" />
      </template>
    </el-table-column>
    <el-table-column label="查询" min-width="4%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.queryResultField" false-label="false" true-label="true" />
      </template>
    </el-table-column>
    <el-table-column label="查询方式" min-width="10%">
      <template #default="scope">
        <el-select v-model="scope.row.queryConditionField">
          <el-option label="=" value="=" />
          <el-option label="!=" value="!=" />
          <el-option label=">" value=">" />
          <el-option label=">=" value=">=" />
          <el-option label="<" value="<>" />
          <el-option label="<=" value="<=" />
          <el-option label="LIKE" value="LIKE" />
          <el-option label="BETWEEN" value="BETWEEN" />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="允许空" min-width="5%">
      <template #default="scope">
        <el-checkbox v-model="scope.row.nullable" false-label="false" true-label="true" />
      </template>
    </el-table-column>
    <el-table-column label="显示类型" min-width="12%">
      <template #default="scope">
        <el-select v-model="scope.row.htmlType">
          <el-option label="文本框" value="input" />
          <el-option label="文本域" value="textarea" />
          <el-option label="下拉框" value="select" />
          <el-option label="单选框" value="radio" />
          <el-option label="复选框" value="checkbox" />
          <el-option label="日期控件" value="datetime" />
          <el-option label="图片上传" value="imageUpload" />
          <el-option label="文件上传" value="fileUpload" />
          <el-option label="富文本控件" value="editor" />
        </el-select>
      </template>
    </el-table-column>
    <!-- <el-table-column label="字典类型" min-width="12%"> -->
    <!-- <template #default="scope">
          <el-select v-model="scope.row.dictType" clearable filterable placeholder="请选择">
            <el-option
              v-for="dict in dictOptions"
              :key="dict.id"
              :label="dict.name"
              :value="dict.type"
            />
          </el-select>
        </template> -->
    <!-- </el-table-column> -->
    <el-table-column label="示例" min-width="10%">
      <template #default="scope">
        <el-input v-model="scope.row.example" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'

const formRef = ref()
const formData = ref([])

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
})

watch(
  () => props.columns,
  (columns) => {
    if (!columns) return
    formData.value = columns
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
