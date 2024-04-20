<template>
  <el-dialog
    ref="formRef"
    :model-value="modelValue"
    title="代码预览"
    class="app-codegen-preview-container"
    @close="closed"
    @open="open"
    width="80%"
  >
    <el-row class="row-con">
      <el-col :span="8">
        <el-card
          v-loading="loading"
          class="card"
          element-loading-text="生成文件目录中..."
          shadow="hover"
        >
          <el-scrollbar>
            <el-tree
              ref="treeRef"
              :data="preview.fileTree"
              :expand-on-click-node="false"
              default-expand-all
              highlight-current
              node-key="id"
              @node-click="handleNodeClick"
            />
          </el-scrollbar>
        </el-card>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="15">
        <el-card
          v-loading="loading"
          class="card"
          element-loading-text="加载代码中..."
          shadow="hover"
        >
          <el-tabs v-model="preview.activeName">
            <el-tab-pane
              v-for="item in previewCodegen"
              :key="item.filePath"
              :label="item.filePath.substring(item.filePath.lastIndexOf('/') + 1)"
              :name="item.filePath"
            >
              <CodeHighlight :code="item.code" :language="item.language" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import CodeHighlight from './components/CodeHighlight.vue'
import { tranListToTreeData2 } from '@/utils/tree.js'
import { getPreviewCode } from '@/api/tool/generator'

// 加载中的状态
const loading = ref(false)

// 代码
const previewCodegen = ref([])

const preview = reactive({
  fileTree: [], // 文件树
  activeName: '' // 激活的文件名
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

const emits = defineEmits(['update:modelValue'])

/**
 * 打开回调
 */
const open = async () => {
  try {
    loading.value = true
    const data = await getPreviewCode({ tableId: props.selectRow.id })
    data.forEach((item) => {
      var languageValue = item.filePath.substring(item.filePath.lastIndexOf('.') + 1)
      if (languageValue == 'vue') {
        languageValue = 'javascript'
      }
      previewCodegen.value.push({
        language: languageValue,
        code: item.code,
        filePath: item.filePath
      })
    })
    // 处理文件
    let file = handleFiles(data)
    preview.fileTree = tranListToTreeData2(file, 'id', 'parentId', 'children', '/')
    // 点击首个文件
    preview.activeName = data[0].filePath
  } finally {
    loading.value = false
  }
}

/**
 * 文件处理
 *
 * @param {} datas
 */
const handleFiles = (datas) => {
  let exists = {} // key：file 的 id；value：true
  let files = []
  // 遍历每个元素
  for (const data of datas) {
    let paths = data.filePath.split('/')
    let fullPath = '' // 从头开始的路径，用于生成 id
    // 特殊处理 java 文件
    if (paths[paths.length - 1].indexOf('.java') >= 0) {
      let newPaths = []
      for (let i = 0; i < paths.length; i++) {
        let path = paths[i]
        if (path !== 'java') {
          newPaths.push(path)
          continue
        }
        newPaths.push(path)
        // 特殊处理中间的 package，进行合并
        let tmp = ''
        while (i < paths.length) {
          path = paths[i + 1]
          if (
            path === 'controller' ||
            path === 'convert' ||
            path === 'dto' ||
            path === 'enums' ||
            path === 'service' ||
            path === 'vo' || // 下面三个，主要是兜底。可能考虑到有人改了包结构
            path === 'mapper' ||
            path === 'constant' ||
            path === 'entity'
          ) {
            break
          }
          tmp = tmp ? tmp + '.' + path : path
          i++
        }
        if (tmp) {
          newPaths.push(tmp)
        }
      }
      paths = newPaths
    }
    // 遍历每个 path， 拼接成树
    for (let i = 0; i < paths.length; i++) {
      // 已经添加到 files 中，则跳过
      let oldFullPath = fullPath
      // 下面的 replaceAll 的原因，是因为上面包处理了，导致和 tabs 不匹配，所以 replaceAll 下
      fullPath = fullPath.length === 0 ? paths[i] : fullPath.replaceAll('.', '/') + '/' + paths[i]
      if (exists[fullPath]) {
        continue
      }
      // 添加到 files 中
      exists[fullPath] = true
      files.push({
        id: fullPath,
        label: paths[i],
        parentId: oldFullPath || '/' // "/" 为根节点
      })
    }
  }
  return files
}

/**
 * 点击文件
 */
const handleNodeClick = async (data, node) => {
  if (node && !node.isLeaf) {
    return false
  }
  preview.activeName = data.id
}

/**
 * 关闭
 */
const closed = () => {
  preview.activeName = ''
  previewCodegen.value = []
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped>
.app-codegen-preview-container {
  .el-scrollbar .el-scrollbar__wrap .el-scrollbar__view {
    display: inline-block;
    white-space: nowrap;
  }
}
.row-con {
  display: flex;
  flex-flow: row wrap;
}
.row-con .card {
  height: 100%;
}
</style>
