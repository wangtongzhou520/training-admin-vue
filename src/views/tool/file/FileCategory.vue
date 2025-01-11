<template>
  <div class="header">
    <el-tree
      ref="treeRef"
      :data="fileCategoryData"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :props="defaultProps"
      default-expand-all
      highlight-current
      node-key="id"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup>
import { tranListToTreeData, defaultProps } from '@/utils/tree.js'
import { ElTree } from 'element-plus'
import { fileCategoryList } from '@/api/tool/file'

const categoryName = ref('')
const fileCategoryData = ref([])
const treeRef = ref([])

/** 获得文件分类树 */
const getTree = async () => {
  const queryParams = reactive({
    name: undefined,
    visible: undefined
  })
  const result = await fileCategoryList(queryParams)
  fileCategoryData.value = tranListToTreeData(result)
}

/** 基于名字过滤 */
const filterNode = (name, data) => {
  if (!name) return true
  return data.name.includes(name)
}

/** 处理部门被点击 */
const handleNodeClick = async (row) => {
  emits('node-click', row)
}
const emits = defineEmits(['node-click'])

/** 监听deptName */
watch(categoryName, (val) => {
  treeRef.value.filter(val)
})

/** 初始化 */
onMounted(async () => {
  await getTree()
})
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 22px;
  text-align: left;
}
</style>
