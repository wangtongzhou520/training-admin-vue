<template>
  <el-drawer ref="formRef" :model-value="modelValue" :title="title" @close="closed" @open="open"     direction="rtl"
  size="30%">
    <el-form :model="formData" label-width="80px">
      <el-form-item label="课程分类">
        <el-tree-select
          v-model="formData.categoryId"
          :data="categoryTree"
          :default-expanded-keys="[0]"
          :props="defaultProps"
          check-strictly
          node-key="id"
        />
      </el-form-item>
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="formData.courseName" placeholder="请输入课程名称" />
      </el-form-item>
      <el-form-item label="封面图" prop="thumbnailUrl">
        <el-image
          v-if="formData.thumbnailUrl"
          :src="formData.thumbnailUrl"
          fit="cover"
          style="width: 100px; height: 100px; margin-bottom: 10px;"
        />
        <el-button type="primary" @click="openFileDialog">更换封面图</el-button>
        <ImageSelect
      v-model="fileManagementVisible"
      @select="handleImageSelected"
    />
      </el-form-item>
      <el-form-item label="发布" prop="isPublished">
        <el-checkbox-group v-model="formData.isPublished">
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
  </el-drawer>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { tranListToTreeData, defaultProps } from '@/utils/tree.js'
import { addCourse, modifyCourse } from '@/api/course/course'
import { categoryList } from '@/api/course/category'
import { ElMessage } from 'element-plus'

/**
 * 控制文件管理弹窗的显示
 */
const fileManagementVisible = ref(false)


/**
 * 标题
 */
const title = ref('新增课程')

/**
 * 分类
 */
 const categoryTree = ref([])

/**
 * 表单内容
 */
const formData = reactive({
  id:undefined,
  courseName:undefined,
  description:undefined,
  categoryId:undefined,
  thumbnailUrl:undefined,
  isPublished:undefined,
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
 * 打开文件管理弹窗
 */
 const openFileDialog = () => {
  fileManagementVisible.value = true
}

/**
 * 处理选中的图片
 */
const handleImageSelected = (url) => {
  console.log('Selected Image URL:', url)
  // 可以在这里处理选中的图片URL，例如将其存储在某个变量中
}

/**
 * 打开回调
 */
const open = async () => {
  categoryTree.value = []
  getCategoryTree()
  //初始化表单
  formData.id=props.selectRow.id
  formData.courseName=props.selectRow.courseName
  formData.description=props.selectRow.description
  formData.categoryId=props.selectRow.categoryId
  formData.thumbnailUrl=props.selectRow.thumbnailUrl
  formData.isPublished=props.selectRow.isPublished
  title.value = formData.id !== undefined ? '编辑课程' : '新增课程'
}
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
    await modifyCourse(formData)
    ElMessage.success('新增成功')
  } else {
    await addCourse(formData)
    ElMessage.success('编辑成功')
  }
  emits('update:modelValue', false)
  emits('success')
}


</script>

<style lang="scss" scoped></style>
