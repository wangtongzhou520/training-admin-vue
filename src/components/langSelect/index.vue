<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <el-tooltip content="国际化" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh"> 中文 </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en"> English </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { defineProps, computed } from 'vue'
import { langSelectStore } from '@/stores/langSelect'
import { ElMessage } from 'element-plus'

defineProps({
  effect: {
    type: String,
    default: 'dark',
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['dark', 'light'].indexOf(value) !== -1
    }
  }
})
// 切换语言的方法
const i18n = useI18n()
const langStore = langSelectStore()
const language = computed(() => langStore.language)

const handleSetLanguage = (lang) => {
  i18n.locale.value = lang
  langStore.changeLanguage(lang)
  ElMessage.success('更新成功')
}
</script>

<style lang="scss" scoped></style>
