<template>
  <el-dialog  :model-value="modelValue" :title="title" @close="closed" @open="open">
    <el-upload
    ref="formRef"
    class="upload-demo"
    drag
    action="http://localhost:8888/tool/file/upload"
    multiple
    :limit="1"
    :headers="uploadHeaders"
    :on-success="handleSuccess"
    :on-error="handleError"
    :data="additionalData"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <el-button  type="primary" @click="submitFileForm">确 定</el-button>
      <el-button>取 消</el-button>
    </template>
  </el-upload>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue'
import { addFile } from '@/api/tool/file'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

/**
 * 标题
 */
const title = ref('新增文件')
const uploadRef = ref()
const fileList = ref([]) // 文件列表
const userStore = useUserStore()
const uploadHeaders = ref({
    Authorization: 'Bearer ' + userStore.accessToken,
  }) // 上传 Header 头

// 定义 additionalData 对象
const additionalData = ref({
  categoryId: null
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

const emits = defineEmits(['update:modelValue', 'fileAction'])

const submitFileForm = () => {
  if (fileList.value.length == 0) {
    ElMessage.error('请上传文件')
    return
  }
  unref(uploadRef)?.submit()
}


/**
 * 打开回调
 */
const open = async () => {
  uploadRef.value?.clearFiles()
  additionalData.value.categoryId = props.selectRow.categoryId
}

const closed = () => {
  uploadRef.value?.clearFiles()
  emits('update:modelValue', false)
}

/**
 * 失败
 */
const handleError = () => {
  emits('update:modelValue', false)
}

/**
 * 成功
 */
const handleSuccess = async () => {

  unref(uploadRef)?.clearFiles()

  emits('update:modelValue', false)
  emits('fileAction')
}
</script>

<style lang="scss" scoped></style>
