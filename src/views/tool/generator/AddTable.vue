<template>
  <el-dialog ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open">
    <!-- 搜索栏 -->
    <el-form ref="queryFormRef" :inline="true" :model="queryParams" label-width="68px">
      <el-form-item label="数据源" prop="dataSourceConfigId">
        <el-select
          v-model="queryParams.dataSourceConfigId"
          class="!w-240px"
          placeholder="请选择数据源"
        >
          <el-option
            v-for="config in dataSourceConfigList"
            :key="config.id"
            :label="config.name"
            :value="config.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="表名称" prop="name">
        <el-input
          v-model="queryParams.name"
          class="!w-240px"
          clearable
          placeholder="请输入表名称"
          @keyup.enter="getList"
        />
      </el-form-item>
      <el-form-item label="表描述" prop="comment">
        <el-input
          v-model="queryParams.comment"
          class="!w-240px"
          clearable
          placeholder="请输入表描述"
          @keyup.enter="getList"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="getList">
          <Icon class="mr-5px" icon="ep:search" />
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon class="mr-5px" icon="ep:refresh" />
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-row>
      <el-table
        ref="tableRef"
        v-loading="dbTableLoading"
        :data="dbTableList"
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
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { addDataSourceConfig, modifyDataSourceConfig } from '@/api/tool/dataSourceConfig'
import { ElMessage } from 'element-plus'

const title = ref('新增数据源')
/**
 * 表单内容
 */
const formData = reactive({
  id: -1,
  name: '',
  url: '',
  username: '',
  password: ''
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
const emits = defineEmits(['update:modelValue', 'dataSourceConfigAction'])

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
    await modifyDataSourceConfig(formData)
    ElMessage.success('新增数据源成功')
  } else {
    await addDataSourceConfig(formData)
    ElMessage.success('编辑数据源成功')
  }
  emits('update:modelValue', false)
  emits('dataSourceConfigAction')
}

// // 获取部门信息
// const getListData = async () => {
//   allDeptList.value = await deptList()
// }

// /** 初始化 **/
// onMounted(() => {
//   getListData()
// })
</script>

<style lang="scss" scoped></style>
