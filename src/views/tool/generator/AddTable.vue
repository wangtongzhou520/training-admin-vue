<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <!-- 搜索栏 -->
    <el-form :inline="true" :model="formData" border style="width: 100%">
      <el-form-item label="数据源" prop="dataSourceConfigId">
        <el-select v-model="formData.dataSourceConfigId" placeholder="请选择数据源">
          <el-option
            v-for="config in dataSourceConfigList"
            :key="config.id"
            :label="config.name"
            :value="config.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表名称" prop="tableName">
        <el-input
          v-model="formData.tableName"
          placeholder="请输入表名称"
          @keyup.enter="getList"
          width="50"
        />
      </el-form-item>
      <el-form-item label="表描述" prop="tableDesc">
        <el-input
          v-model="formData.tableDesc"
          placeholder="请输入表描述"
          @keyup.enter="getList"
          width="50"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList"> 搜索 </el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-row>
      <el-table
        ref="tableRef"
        :data="tableData"
        height="260px"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column :show-overflow-tooltip="true" label="表名称" prop="name" />
        <el-table-column :show-overflow-tooltip="true" label="表描述" prop="comment" />
      </el-table>
    </el-row>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">关闭</el-button>
        <el-button type="primary" @click="onConfirm">导入</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { getDataSourceConfigList } from '@/api/tool/dataSourceConfig'
import { getDatabaseTableList, addGenerator } from '@/api/tool/generator'
import { ElMessage } from 'element-plus'

const title = ref('新增数据源')

/**
 * 列表内容
 */
const tableData = ref([])

/**
 * 表格的Ref
 */
const tableRef = ref()

/**
 * 数据源配置表
 */
const dataSourceConfigList = ref([])

/**
 * 选中的表单
 */
const tableList = ref([])

/**
 * 表单内容
 */
const formData = reactive({
  dataSourceConfigId: -1,
  tableName: '',
  tableDesc: ''
})

/**
 * 打开回调
 */
const open = async () => {
  const dataSourceConfigResult = await getDataSourceConfigList()
  dataSourceConfigList.value = dataSourceConfigResult
  //初始化表单
  formData.dataSourceConfigId = dataSourceConfigList.value[0].id
  await getList()
}

/**
 * 选中
 */
const handleSelectionChange = (selection) => {
  tableList.value = selection.map((item) => item.name)
}
/**
 * 处理单个选择
 */
const handleRowClick = (row) => {
  unref(tableRef)?.toggleRowSelection(row)
}

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
const emits = defineEmits(['update:modelValue', 'addGeneratorAction'])

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
  await addGenerator({
    dataSourceConfigId: formData.dataSourceConfigId,
    tableNames: tableList.value
  })
  ElMessage.success('新增数据源成功')
  emits('update:modelValue', false)
  emits('addGeneratorAction')
}

//获取信息
const getList = async () => {
  const tableResult = await getDatabaseTableList(formData)
  tableData.value = tableResult
}
</script>

<style lang="scss" scoped></style>
